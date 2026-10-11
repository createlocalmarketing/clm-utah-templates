/* CLM National Parks Guide — 63-park production page register. All routes are review targets, not completed SEO pages. */
(function(){
'use strict';
const D=window.CLM_PARKS;if(!D)throw Error('Load parks data and national registry first');
const page='https://createlocalmarketing.github.io/clm-utah-templates/nationalparksguide.co/index.html';
const zpage='https://createlocalmarketing.github.io/clm-utah-templates/utahzionnationalpark.com/index.html';
const app='https://createlocalmarketing.github.io/clm-utah-templates/nationalparksguide.co/app/index.html';
const issue='https://github.com/createlocalmarketing/clm-platform/issues/';
const items=[];
function clean(s){return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function add(domain,park,family,title,fragment,sitePath,owner,status='ROUTED — INCOMPLETE',contract='global',keyword='',searchIntent=''){
const parkSlug=park?.slug||'';
const base=domain==='ZION'?zpage:domain==='APP'?app:page;
const reviewUrl=fragment?base+'#/'+fragment:'';
const id=domain+':'+(parkSlug||'site')+':'+(family||'general')+':'+clean(title);
items.push({id,domain,park:park?.short||'All parks',parkSlug,family,title,reviewUrl,proposedProductionUrl:sitePath||'',status,contract,primaryKeywordCandidate:keyword||((park?park.short+' national park ':'')+title).trim(),searchIntent:searchIntent||'Research required',media:'unique truthful location-specific licensed media NOT verified',seo:'KeywordTool topic cluster/SERP/H1-H5/schema NOT accepted',sourceStatus:park?.contentStatus||'unresearched',issueUrl:issue+owner,owner,completion:false});
}
const national='https://nationalparksguide.co',zion='https://utahzionnationalpark.com';
const roots=[
['Home','', 'Homepage', '', '66'],['All National Parks','parks','Park Directory','parks','74'],['Local Business Directory','directory','Directory','businesses','75'],['Inside National Parks News','news','News','news','78'],['Verified Events Calendar','events','Events','events','78'],['Park Gift Shop','shop','Shop','shop','77'],['Adventure Passport','passport','Passport','passport','76'],['Trip Planner','trip-builder','Trip Planning','trip-builder','76'],['Visitor Safety / DisasterStrike','safety','Safety','safety','79'],['Discover Park Films','videos','Video Library','videos','68'],['About & Conservation','about','About','about','82'],['Sources, Editorial Standards & Corrections','sources','Sources','sources','72'],['Collector Cart','cart','Commerce','cart','77']
];
for(const [title,frag,fam,slug,owner] of roots)add('NATIONAL',null,fam,title,frag,national+(slug?'/'+slug+'/':'/'),Number(owner),'ROUTED — INCOMPLETE',fam);
for(const p of D.parks){
 add('NATIONAL',p,'Park Hub',p.name,'park/'+p.slug,national+'/parks/'+p.slug+'/',74,p.contentStatus==='seed_partial'?'ROUTED — SOURCE SEEDS':'ROUTED — RESEARCH REQUIRED','park',p.short+' national park','Park overview, planning, activities, stay, safety and local directory');
 for(const t of D.taxonomy){
 add('NATIONAL',p,'Topic Category',t.label,'park/'+p.slug+'/topic/'+t.id,national+'/parks/'+p.slug+'/'+t.id+'/',72,'ROUTED — ORIGINAL CONTENT MISSING','topic',p.short+' '+t.label,'Category-specific informational or commercial research');
 for(const [slug,label] of t.children)add('NATIONAL',p,'Topic Subcategory',label,'park/'+p.slug+'/topic/'+t.id+'/'+slug,national+'/parks/'+p.slug+'/'+t.id+'/'+slug+'/',72,'ROUTED — ORIGINAL CONTENT MISSING','topic',p.short+' '+label,'Category and subcategory long-tail intent');
 }
 for(const x of D.businessTaxonomy)add('NATIONAL',p,'Business Category',x.label,'park/'+p.slug+'/businesses/'+x.slug,national+'/parks/'+p.slug+'/local-businesses/'+x.slug+'/',75,'ROUTED — MERCHANT INGESTION PENDING','business_category',x.label+' near '+p.name,'Local provider and service comparison');
 for(const x of D.newsTaxonomy)add('NATIONAL',p,'News Category',x.label,'park/'+p.slug+'/news/'+x.slug,national+'/parks/'+p.slug+'/news/'+x.slug+'/',78,'ROUTED — ORIGINAL ARTICLES MISSING','news_category',p.short+' '+x.label,'Current sourced editorial');
 for(const x of D.eventTaxonomy)add('NATIONAL',p,'Event Category',x.label,'park/'+p.slug+'/events/'+x.slug,national+'/parks/'+p.slug+'/events/'+x.slug+'/',78,'ROUTED — VERIFIED EVENTS MISSING','event_category',p.short+' '+x.label,'Upcoming, annual, seasonal program');
 for(const x of D.productTaxonomy)add('NATIONAL',p,'Shop Category',x.label,'park/'+p.slug+'/shop/'+x.slug,national+'/parks/'+p.slug+'/souvenirs/'+x.slug+'/',77,'ROUTED — ACTUAL INVENTORY MISSING','shop_category',p.short+' '+x.label,'Commercial product intent');
 add('NATIONAL',p,'Park Business Index','Businesses within 25 miles','park/'+p.slug+'/businesses',national+'/parks/'+p.slug+'/local-businesses/',75,'ROUTED — NO COMPLETE 25-MILE DIRECTORY','business_category');
 add('NATIONAL',p,'Park News Index','News and articles','park/'+p.slug+'/news',national+'/parks/'+p.slug+'/news/',78,'ROUTED — ARTICLES MISSING','news_category');
 add('NATIONAL',p,'Park Events Index','Real upcoming events','park/'+p.slug+'/events',national+'/parks/'+p.slug+'/events/',78,'ROUTED — EVENTS MISSING','event_category');
 add('NATIONAL',p,'Park Shop Index','Park gift shop','park/'+p.slug+'/shop',national+'/parks/'+p.slug+'/souvenirs/',77,'ROUTED — MERCHANDISE MISSING','shop_category');
 add('NATIONAL',p,'Park Video','Discover '+p.short+' film','',national+'/parks/'+p.slug+'/discover-film/',68,'NOT BUILT — RIGHTS AND REAL FILM MISSING','video');
 add('NATIONAL',p,'25-mile Data Ingestion','Licensed merchant import + radius coverage','',national+'/parks/'+p.slug+'/coverage-report/',75,'NOT BUILT — NO VERIFIED COVERAGE','business_category');
 add('APP',p,'Native Park Microsite',p.short+' in the app','', 'nationalparksguide://parks/'+p.slug,76,'NOT BUILT — NATIVE APP SCREEN MISSING','app');
}
for(const p of D.parks){for(const t of p.trails)add('NATIONAL',p,'Trail Profile',t.name,'trail/'+t.id,national+'/parks/'+p.slug+'/trails/'+t.slug+'/',74,'ROUTED — PARTIAL TRAIL FACTS','trail',p.short+' '+t.name,'Trail information and safety');}
for(const m of D.merchants){const p=D.parks.find(x=>x.slug===m.park);add('NATIONAL',p,'Merchant Profile',m.name,'business/'+m.id,national+'/parks/'+p.slug+'/businesses/'+clean(m.name)+'/',75,'ROUTED — UNCLAIMED SOURCE SEED','merchant_profile',m.name,'Business brand/local search');}
for(const x of D.products){const p=D.parks.find(z=>z.slug===x.park);add('NATIONAL',p,'Product Detail',x.name,'product/'+x.slug,national+'/parks/'+p.slug+'/souvenirs/'+x.slug+'/',77,'ROUTED — CONCEPT ONLY, NOT SALEABLE','product',x.name,'Product intent');}
for(const x of D.news){const p=D.parks.find(z=>z.slug===x.park);add('NATIONAL',p,'News Brief',x.title,'article/'+x.id,national+'/parks/'+p.slug+'/news/'+x.id+'/',78,'ROUTED — SOURCE BRIEF ONLY','news_category');}
const zp=D.parks.find(p=>p.slug==='zion');
for(const x of items.filter(x=>x.domain==='NATIONAL'&&x.parkSlug==='zion')){
 if(!x.reviewUrl)continue;
 const fragment=x.reviewUrl.split('#/')[1];
 const path=(x.proposedProductionUrl||'').replace(/^https:\/\/nationalparksguide\.co\/parks\/zion\//,'');
 add('ZION',zp,'Zion Extraction / '+x.family,x.title,fragment,zion+'/'+path, x.owner,x.status,x.contract,x.primaryKeywordCandidate,'Dedicated original Zion/Springdale intent; avoid duplicate national copy');
}
for(const [title,frag,fam,slug,owner] of roots){add('ZION',zp,'Zion Global / '+fam,title,frag,zion+(slug?'/'+slug+'/':'/'),Number(owner),'ROUTED — INCOMPLETE',fam);}
const appScreens=['Discover/Search','Park Microsite','Weather','Trails and Offline Maps','Permits and Entrances','Park Fees and Parking','Dynamic Packing Checklist','Locally Owned Toggle','Merchant Discovery','External Booking','Traveler CRM','Trip Journal and Scrapbook','GPS Photo Challenge','Safe Trail Completion','Park Trivia','63-Park Passport','Digital Stamps','Photo Capture and Watermark','AI Reel Builder','16:9 Video Export','9:16 Video Export','Music and LUT Selection','Points Ledger','Offer Wallet','Merchant QR Redemption','Family Challenges','Couples Challenges','Solo Challenges','Weekly Highlights','UGC Story Archive','Offline Safety / DisasterStrike','Trusted Contact Check-In','Account and Consent','Location Data Delete','Favorites','Push and SMS Preferences'];
for(const title of appScreens)add('APP',null,'Native App Screen',title,'','nationalparksguide://app/'+clean(title),76,'NOT BUILT — NATIVE BACKEND MISSING','app',title,'In-app user functionality');
D.productionRegister=items;
window.CLM_NPG_PRODUCTION_REGISTER={items,generatedAt:'2026-10-10',contractPath:'PRODUCTION-PAGE-STANDARD.md',featured:D.featuredSlugs,counts:{total:items.length,parks:D.parks.length,featured:D.featuredParks.length,domains:[...new Set(items.map(x=>x.domain))]}};
})();