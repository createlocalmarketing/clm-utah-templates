/* National Parks CLM vertical hash router — URL-addressable page templates */
(function(){
"use strict";
const U=window.ParkUI,A=window.ParkPagesA,B=window.ParkPagesB,C=window.ParkPagesC,E=window.ParkPagesD;
if(!U||!A||!B||!C||!E)throw Error("Park modules not loaded");
const D=U.D;
function render(){const route=(location.hash||"#/").slice(2).split("?")[0],p=route.split("/").filter(Boolean);
try{
if(p.length===0)A.home();
else if(p[0]==="parks")U.zion?A.parkPage(D.parks.find(x=>x.slug==="zion")):U.layout(U.header("All National Parks","PARK DIRECTORY","63 NPS-designated parks; source-only park profiles remain unpublished until researched and reviewed.")+U.section("EXPLORE PARKS","All 63 national parks","Five parks have partial initial research; other national park profiles require original sources and media before approval.",U.parks.map(U.parkCard).join(""),5));
else if(p[0]==="park"&&p[1]){const one=D.parks.find(x=>x.slug===p[1]);if(!one)C.notFound();else if(p[2]==="topic"){const t=D.taxonomy.find(x=>x.id===p[3]);if(t)A.topicPage(one,t,p[4]);else C.notFound()}else if(["businesses","news","events","shop"].includes(p[2])){if(p[3])E.category(one,p[2],p[3]);else E.childIndex(one,p[2])}else A.parkPage(one)}
else if(p[0]==="trail"){let t=D.parks.flatMap(x=>x.trails).find(x=>x.id===p[1]);t?A.trailPage(t):C.notFound()}
else if(p[0]==="directory")B.directory();
else if(p[0]==="business"){let b=D.merchants.find(x=>x.id===p[1]);b?B.business(b):C.notFound()}
else if(p[0]==="shop")B.shop();
else if(p[0]==="product"){let x=D.products.find(x=>x.slug===p[1]);x?B.product(x):C.notFound()}
else if(p[0]==="cart")B.cart();
else if(p[0]==="passport"||p[0]==="rewards")C.passport();
else if(p[0]==="trip-builder")B.tripBuilder();
else if(p[0]==="news")C.news();
else if(p[0]==="article"){let n=D.news.find(x=>x.id===p[1]);n?C.article(n):C.notFound()}
else if(p[0]==="events")C.events();
else if(p[0]==="safety")C.safety();
else if(p[0]==="videos")C.videos();
else if(p[0]==="about")C.about();
else if(p[0]==="sources")C.sources();
else C.notFound();
}catch(e){console.error("Parks route error",e);document.getElementById("app").innerHTML='<main style="padding:35px;font-family:sans-serif"><h1>Unable to render this page</h1><p>Review browser console for build errors.</p><a href="#/">Return home</a></main>'}
window.scrollTo(0,0);
}
window.addEventListener("hashchange",render);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();
window.CLM_PARKS_ROUTER={render,version:"3.0",get routeCount(){return 2+D.parks.length*(1+D.taxonomy.reduce((sum,t)=>sum+1+t.children.length,0))+D.parks.reduce((sum,p)=>sum+p.trails.length,0)+D.products.length+D.merchants.length+D.news.length+13}};
})();