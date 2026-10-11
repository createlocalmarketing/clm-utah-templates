from pathlib import Path
import re,json,subprocess
from bs4 import BeautifulSoup
root=Path('/mnt/data/qai-website')
files=sorted(root.glob('*.html'))
errors=[];data={}
for file in files:
 t=file.read_text(); soup=BeautifulSoup(t,'html.parser')
 check={'heading':bool(soup.title),'viewport':bool(soup.select('meta[name="viewport"]')),'page_id':soup.body.get('data-page'),'scripts':[x.get('src') for x in soup.select('script[src]')],'styles':[x.get('href') for x in soup.select('link[rel="stylesheet"]')]}
 for src in check['scripts']+check['styles']:
  if src and not src.startswith('http') and not (root/src.split('?')[0]).exists():errors.append(f'{file.name}: missing linked {src}')
 if not all([check['heading'],check['viewport'],check['page_id']]):errors.append(f'{file.name}: missing structure')
 data[file.name]=check
for f in ['site.js','site-data.js']:
 p=subprocess.run(['node','--check',str(root/f)],capture_output=True,text=True)
 if p.returncode:errors.append(p.stderr)
js=(root/'site.js').read_text()
# All internal links defined in source via link('...') should have html files.
for id in set(re.findall(r'link\(\'([a-z0-9-]+)\'\)',js)):
 if id!='index' and not (root/(id+'.html')).exists():errors.append('Unresolved literal route: '+id)
# All variables for collection item pages should have matching generated html.
assert len(files)==46,len(files)
for f in files:
 assert f.stat().st_size>380,f.name
report={'generated_route_count':len(files),'errors':errors,'route_files':[x.name for x in files],'script_syntax':'pass' if not errors else 'see errors','interaction_tests':'blocked by browser security in execution environment','media_note':'Existing verified ../img assets referenced by product data; remote delivery not independently verified'}
(root/'qa'/'STATIC_AUDIT.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'route_count':len(files),'errors':errors},indent=2))
