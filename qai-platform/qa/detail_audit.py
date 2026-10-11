from pathlib import Path
import subprocess,json,csv
p=Path(__file__).resolve().parent.parent
q=p/'qa'
js='const fs=require("fs"),vm=require("vm"),w={};vm.runInNewContext(fs.readFileSync(process.argv[1],"utf8"),{window:w});console.log(JSON.stringify({db:w.QData.seed(),sites:w.QData.sites}))'
d=json.loads(subprocess.run(['node','-e',js,str(p/'data.js')],capture_output=True,text=True,check=True).stdout)
# Canonical record→module connections implemented in renderDetail, not speculative design pages.
map_to={'tasks':['tasks','board'],'contacts':['contacts'],'meetings':['meetings'],'events':['events','calendar'],'messages':['inbox','sms'],'calls':['calls','callanalytics'],'leads':['leads','pipeline','transactions'],'campaigns':['campaigns'],'offers':['deals']}
rows=[]
for surface,fn in [('desktop','index.html'),('iphone','mobile.html')]:
 for collection,modules in map_to.items():
  for x in d['db'][collection]:
   for mod in modules:
    rows.append(dict(surface=surface,workspace=x['workspace'],collection=collection,module=mod,item_id=x['id'],item_title=x.get('title') or x.get('name') or x.get('subject') or x.get('contact') or x.get('id'),url=f'{fn}?w={x["workspace"]}&m={mod}&item={x["id"]}',render_test='UNTESTED',click_test='UNTESTED',correct_record='UNTESTED',actions_test='UNTESTED',visual_review='UNREVIEWED',data_integrity='UNVERIFIED',security_tenant='UNVERIFIED',owner_signoff='UNAPPROVED',note='Seeded demo record, not live customer data'))
 for x in d['sites']:
  for mod in ['websites','mcp']:
   rows.append(dict(surface=surface,workspace=x['workspace'],collection='sites',module=mod,item_id=x['name'],item_title=x['name'],url=f'{fn}?w={x["workspace"]}&m={mod}&item={x["name"]}',render_test='UNTESTED',click_test='UNTESTED',correct_record='UNTESTED',actions_test='UNTESTED',visual_review='UNREVIEWED',data_integrity='UNVERIFIED',security_tenant='UNVERIFIED',owner_signoff='UNAPPROVED',note='Domain metadata, live site/ownership integration not verified'))
with (q/'DETAIL_FLOW_AUDIT.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
print('Total detail routes',len(rows),'surface x collection',len(rows)//2,'Seed records',dict((k,len(v)) for k,v in d['db'].items() if isinstance(v,list)))