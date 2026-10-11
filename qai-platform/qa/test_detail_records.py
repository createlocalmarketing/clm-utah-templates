from pathlib import Path
import json,csv,subprocess,re,time
from playwright.sync_api import sync_playwright
p=Path(__file__).resolve().parent.parent
q=p/'qa'
rows=list(csv.DictReader((q/'DETAIL_FLOW_AUDIT.csv').open()))
s=(p/'index.html').read_text()
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
start=time.time();fail=[];counts={'desktop':0,'iphone':0};errors_count={'desktop':0,'iphone':0}
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
 for surface,name in [('desktop','index.html'),('iphone','mobile.html')]:
  page=b.new_page(viewport={'width':1440,'height':900});errs=[]
  page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(document(name),wait_until='domcontentloaded',timeout=15000)
  part=[x for x in rows if x['surface']==surface]
  for i,r in enumerate(part):
   n0=len(errs)
   try:
    data=page.evaluate('''({w,m,id})=>{
      const a=document.createElement('button');a.dataset.action='navigate-to';a.dataset.id=m;a.dataset.workspace=w;document.body.appendChild(a);a.click();a.remove();
      const b=document.createElement('button');b.dataset.action='open-item';b.dataset.module=m;b.dataset.id=id;document.body.appendChild(b);b.click();b.remove();
      const head=document.querySelector('.content .page-header h1, .phone-scroll .phone-detail h2, .phone-scroll .phone-title h2, .phone-scroll .phone-detail h3');
      return {heading:head?.textContent?.trim()||'',text:document.querySelector('.content,.phone-scroll')?.textContent?.slice(0,220)||''};
    }''',{'w':r['workspace'],'m':r['module'],'id':r['item_id']})
    if len(errs)>n0:raise RuntimeError('JS: '+errs[-1][:130])
    if 'Record not found' in data['heading'] or 'Record not found' in data['text']:raise RuntimeError('Record not found')
    if r['surface']=='desktop' and not data['heading']:raise RuntimeError('Detail heading missing')
    r['render_test']='PASS';r['click_test']='PASS';r['correct_record']='PASS' if r['item_title'].lower() in data['heading'].lower() else 'NEEDS_REVIEW'
    counts[surface]+=1
   except Exception as e:
    r['render_test']='FAIL';r['click_test']='FAIL';r['correct_record']='UNVERIFIED';fail.append({'surface':surface,'workspace':r['workspace'],'module':r['module'],'id':r['item_id'],'error':str(e)[:160]})
   if (i+1)%350==0:print('PROGRESS',surface,i+1,len(part),'passed',counts[surface],'failed',len(fail),flush=True)
  errors_count[surface]=len(errs)
  page.close()
 b.close()
with (q/'DETAIL_FLOW_AUDIT.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
result={'date':'2026-10-10','total_detail_route_cases':len(rows),'opened_records':counts,'failed_record_routes':len(fail),'failures':fail[:100],'known_limitations':['click/navigation only; no record edit, messaging, storage, cross-session, permissions or final human sign-off','mobile detail screens need dedicated UX inspection','actual businesses CRM and communications not connected'],'duration_seconds':round(time.time()-start,1)}
(q/'DETAIL_TEST_REPORT.json').write_text(json.dumps(result,indent=2))
print('FINAL',json.dumps({k:v for k,v in result.items() if k!='failures'}),flush=True)
if fail:print('FAILED_SAMPLES',json.dumps(fail[:12]),flush=True)