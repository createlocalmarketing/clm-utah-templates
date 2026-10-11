const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const srcData=fs.readFileSync(path.join(root,'site-data.js'),'utf8'),src=fs.readFileSync(path.join(root,'site.js'),'utf8');
const checks=[];
function instance(p){
 let elements={'#app':{innerHTML:''},'.workflow-demo':{innerHTML:''},'.demo-frame':{outerHTML:''},'#toast':{textContent:'',className:''}};let handlers={};
 const doc={body:{dataset:{page:p}},addEventListener(n,cb){handlers[n]=cb},querySelector(n){return elements[n]||null}};
 const ctx={window:{scrollY:0,scrollTo(){}},document:doc,localStorage:{getItem(){return null},setItem(){}},setTimeout,clearTimeout,Date,console,URL,Blob};vm.createContext(ctx);vm.runInContext(srcData,ctx,{timeout:2500});vm.runInContext(src,ctx,{timeout:2500});
 return {elements,handlers,click(action,id){handlers.click({target:{closest:()=>({dataset:{action,id}})}})}};
}
const home=instance('index');
checks.push({test:'render_home',pass:home.elements['#app'].innerHTML.includes('Every business.')});
home.click('step','2');checks.push({test:'workflow_stepper',pass:home.elements['.workflow-demo'].innerHTML.includes('Decide together')});
home.click('tourbusiness','');checks.push({test:'workspace_switcher',pass:home.elements['.demo-frame'].outerHTML.includes('Dental & healthcare marketing')});
const pricing=instance('pricing');pricing.click('plans','false');checks.push({test:'pricing_package_toggle',pass:pricing.elements['#app'].innerHTML.includes('Starter')});
const mobile=instance('index');mobile.click('menu','');checks.push({test:'mobile_navigation_markup',pass:mobile.elements['#app'].innerHTML.includes('mobile-menu')});
const results={tests:checks,total:checks.length,passed:checks.filter(x=>x.pass).length,limitations:'Code-level view model tests. Browser and CSS layout acceptance remain unverified.'};fs.writeFileSync(path.join(__dirname,'INTERACTION_TEST_REPORT.json'),JSON.stringify(results,null,2));console.log(results);if(results.passed!==results.total)process.exit(1)
