from pathlib import Path
from playwright.sync_api import sync_playwright
import csv,json,time,re,sys
p=Path(__file__).resolve().parent.parent
qa=p/'qa'; rows=list(csv.DictReader((qa/'ROUTE_AUDIT.csv').open()))
def document(name):
 html=(p/name).read_text()
 html=html.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">','')
 for x in ('styles.css','refinement.css'):
  body=re.sub(r'@import[^;]+;','',(p/x).read_text())
  html=re.sub(r'<link rel="stylesheet" href="'+re.escape(x)+r'(?:\?v=\d+)?">','<style>'+body+'</style>',html)
 for x in ('data.js','app.js'):
  html=html.replace('<script src="'+x+'"></script>','<script>'+(p/x).read_text()+'</script>')
 html=html.replace('</head>','<script>Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem:()=>null,setItem:()=>{}}});window.history.pushState=function(){};</script></head>')
 return html
beg=time.time();fail=[];count={'desktop':0,'iphone':0};num_errors={'desktop':0,'iphone':0}
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
 for surface,name in [('desktop','index.html'),('iphone','mobile.html')]:
  pg=browser.new_page(viewport={'width':1440,'height':900});errors=[]
  pg.on('pageerror',lambda e:errors.append(str(e)))
  pg.set_content(document(name),wait_until='domcontentloaded',timeout=15000)
  sample=[r for r in rows if r['surface']==surface]
  for i,r in enumerate(sample):
   old=len(errors)
   try:
    answer=pg.evaluate('''({workspace, module}) => {
      const b=document.createElement('button');b.dataset.action='navigate-to';b.dataset.workspace=workspace;b.dataset.id=module;
      document.body.appendChild(b);b.click();b.remove();
      const title=document.querySelector('.content .page-header h1, .content .xe-page h1, .phone-scroll .phone-title h2, .phone-scroll .phone-greeting h2, .phone-scroll .phone-qai-top h2, .phone-scroll .phone-hero h3, .phone-scroll .phone-list strong');
      const cnt=document.querySelector('.content,.phone-scroll');
      return {title:title?.textContent?.trim(),length:cnt?.textContent?.length||0,buttons:cnt?.querySelectorAll('button').length||0};
    }''',{'workspace':r['workspace_id'],'module':r['module_id']})
    if len(errors)>old:raise RuntimeError(errors[-1][:160])
    if answer['length']<50:raise RuntimeError('Screen essentially empty')
    if not answer['title'] and r['module_id'] not in ('notifications',):raise RuntimeError('Missing screen heading')
    r['functional_route']='PASS'
    r['js_error']='PASS'
    count[surface]+=1
   except Exception as e:
    r['functional_route']='FAIL'
    r['js_error']='FAIL_OR_UNVERIFIED'
    fail.append({'surface':surface,'workspace':r['workspace_id'],'module':r['module_id'],'reason':str(e)[:180]})
   if (i+1)%200==0:print('PROGRESS',surface,i+1,len(sample),'passed',count[surface],'failed',len(fail),flush=True)
  num_errors[surface]=len(errors)
  pg.close()
 browser.close()
with (qa/'ROUTE_AUDIT.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
report={'date':'2026-10-10','route_combinations':len(rows),'passed_rendering':count,'failed_rendering':len(fail),'failures':fail[:250],'unverified':['individual button action outcomes','individual visual screenshot review','font load/color contrast','photo asset request/sector fit','backend persistence','tenant isolation','human stakeholder approval'],'note':'In-memory Chromium routing smoke only; no live GitHub Pages end-to-end assertion','duration_seconds':round(time.time()-beg,1)}
(qa/'ROUTE_TEST_REPORT.json').write_text(json.dumps(report,indent=2))
print('FINAL',json.dumps({k:v for k,v in report.items() if k!='failures'}),flush=True)
if fail:print('SAMPLE_FAILED',json.dumps(fail[:12]))