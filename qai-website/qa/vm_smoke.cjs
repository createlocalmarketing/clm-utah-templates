const fs=require('fs'),path=require('path'),vm=require('vm');
const base=path.resolve(__dirname,'..');
const files=fs.readdirSync(base).filter(x=>x.endsWith('.html')).sort();
const errors=[],metrics=[];
const dataSource=fs.readFileSync(path.join(base,'site-data.js'),'utf8');
const siteSource=fs.readFileSync(path.join(base,'site.js'),'utf8');
for(const file of files){
  const root={innerHTML:''};
  const document={body:{dataset:{page:path.basename(file,'.html')}},addEventListener(){},querySelector(selector){return selector==='#app'?root:null}};
  const window={scrollY:0,scrollTo(){}};
  const context={window,document,localStorage:{getItem(){return null},setItem(){}},setTimeout,clearTimeout,Date,console,URL,Blob};
  vm.createContext(context);
  try{
    vm.runInContext(dataSource,context,{timeout:1500,filename:'site-data.js'});
    vm.runInContext(siteSource,context,{timeout:1500,filename:'site.js'});
    const html=root.innerHTML;
    const h1=[...html.matchAll(/<h1\b/g)].length;
    const img=[...html.matchAll(/<img\b/g)].length;
    const anchors=[...html.matchAll(/href="\.\/([^"?#]+)"/g)].map(m=>m[1]);
    for(const a of anchors){if(!fs.existsSync(path.join(base,a)))errors.push(`${file}: broken internal link ${a}`)}
    if(h1!==1)errors.push(`${file}: expected exactly one heading, got ${h1}`);
    if(img===0)errors.push(`${file}: no images in rendered page`);
    if(html.length<3500)errors.push(`${file}: page seems too short (${html.length})`);
    metrics.push({page:file,h1,images:img,internal_links:anchors.length,html_length:html.length});
  }catch(error){errors.push(`${file}: ${error.stack||error}`)}
}
const report={routes:files.length,exceptions:errors,pass:errors.length===0,metrics,browser_visual_qa:'NOT RUN (Chromium blocked by environment policy)'};
fs.writeFileSync(path.join(__dirname,'VM_SMOKE_REPORT.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({routes:report.routes,pass:report.pass,errors:errors.slice(0,15),sample:metrics.slice(0,3)},null,2));
if(errors.length)process.exit(1);
