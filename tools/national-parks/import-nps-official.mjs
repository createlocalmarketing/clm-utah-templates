#!/usr/bin/env node
/**
 * CLM / NPG OFFICIAL NPS CONTENT INGESTOR — proprietary first-party code.
 * Requires secret NPS_API_KEY in the execution environment; no credentials committed.
 * Source: https://www.nps.gov/subjects/developer/api-documentation.htm
 * National Park Service Data API: https://developer.nps.gov/api/v1/
 * Ingest: parks with image assets, event calendars, current alerts, campgrounds,
 * official news, visitor centers, things to do; preserve exact attribution/rights.
 * Run: NPS_API_KEY=*** node tools/national-parks/import-nps-official.mjs
 * The output is source-enriched content, NOT human-approved original editorial,
 * finished image licenses, complete accessibility, or current on-site directions.
 */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const input=resolve('nationalparksguide.co/data/nps-63-canonical-entities.json');
const dir=resolve('nationalparksguide.co/data/nps-import');
const key=process.env.NPS_API_KEY;
if(!key||key.length<15)throw Error('Missing NPS_API_KEY secret. See https://www.nps.gov/subjects/developer/get-started.htm');
const parks=(JSON.parse(await readFile(input,'utf8'))).parks;
if(parks.length!==63)throw Error('The nationwide 63-park registry must exist before importing');
const MAX_ITEMS=Number(process.env.NPS_MAX_ITEMS||100);
const safeText=v=>String(v??'').replace(/<script[\s\S]*?<\/script>/gi,'').trim();
const endpoints=[
['parks','parks'],['events','events'],['alerts','alerts'],['campgrounds','campgrounds'],
['newsreleases','newsreleases'],['articles','articles'],['visitorcenters','visitorcenters'],
['thingstodo','thingstodo']
];
let errorCount=0;
async function get(endpoint,code,extra={}){
 const url=new URL('https://developer.nps.gov/api/v1/'+endpoint);
 url.searchParams.set('parkCode',code);url.searchParams.set('limit',String(MAX_ITEMS));url.searchParams.set('start','0');
 for(const [k,v] of Object.entries(extra))url.searchParams.set(k,v);
 let attempt=0;
 while(attempt<3){attempt++;try{
  const signal=AbortSignal.timeout(22000);
  const res=await fetch(url,{headers:{'X-Api-Key':key,'Authorization':key,'User-Agent':'NationalParksGuide-Independent-Editorial/0.1'},signal});
  if(res.status===429||res.status>=500){await new Promise(ok=>setTimeout(ok,attempt*1200));continue}
  if(!res.ok)throw Error('NPS API '+endpoint+'/'+code+' HTTP '+res.status);
  const response=await res.json();
  if(!Array.isArray(response.data))throw Error('Invalid NPS API response shape '+endpoint);
  return {items:response.data,total:Number(response.total??response.data.length),url:url.origin+url.pathname+'?parkCode='+code,checkedAt:new Date().toISOString()};
 }catch(err){if(attempt>=3)throw err}}
 throw Error('NPS service rate limits exceeded');
}
function media(m){return {id:m.id||'',url:m.url||'',title:m.title||'',altText:m.altText||'',caption:m.caption||'',credit:m.credit||'',copyright:m.copyright||'',source:'NPS_API',rightsStatus:'REQUIRES_ASSET_BY_ASSET_REVIEW'}} // Do not assume public domain.
function normalize(kind,x,code){
 const base={id:String(x.id||x.url||x.title||''),parkCode:code,title:safeText(x.title||x.name||x.fullName),description:safeText(x.description||x.abstract||x.shortDescription||''),sourceUrl:x.url||x.link||'https://www.nps.gov/'+code+'/index.htm',retrievedAt:new Date().toISOString(),credit:x.credit||'',media:(Array.isArray(x.images)?x.images:[]).map(media)};
 switch(kind){
  case 'parks':return {...base,name:x.fullName||x.name,states:x.states||'',latitude:x.latitude||'',longitude:x.longitude||'',latLong:x.latLong||'',parkCode:x.parkCode||code,fees:x.entranceFees||[],passes:x.entrancePasses||[],operatingHours:x.operatingHours||[],directions:x.directionsInfo||'',directionsUrl:x.directionsUrl||'',weatherInfo:x.weatherInfo||'',designation:x.designation||'',activities:x.activities||[],contacts:x.contacts||{},topics:x.topics||[],entranceVerified:false};
  case 'events':return {...base,dates:x.date||x.dates||[],times:x.times||[],location:x.location||'',feeInfo:x.feeInfo||'',category:x.category||'',contact:x.contactName||'',recurrence:x.recurrenceDateStart||'',expirationDate:x.lastIndexedDate||'',verifyVenueAndOrganizer:true};
  case 'alerts':return {...base,category:x.category||'',lastIndexedDate:x.lastIndexedDate||'',updated:x.lastIndexedDate||'',alertStatus:'SOURCE_SNAPSHOT_NOT_LIVE'};
  case 'campgrounds':return {...base,latLong:x.latLong||'',reservationUrl:x.reservationUrl||'',reservationInfo:x.reservationInfo||'',fees:x.fees||[],amenities:x.amenities||{},accessibility:x.accessibility||{}};
  case 'visitorcenters':return {...base,latLong:x.latLong||'',hours:x.operatingHours||[],directions:x.directionsInfo||'',amenities:x.amenities||[]};
  case 'thingstodo':return {...base,shortDescription:x.shortDescription||'',duration:x.duration||'',season:x.seasonDescription||'',location:x.locationDescription||'',activities:x.activities||[],tags:x.tags||[],accessibility:x.accessibilityInformation||''};
  case 'newsreleases':return {...base,date:x.releaseDate||x.date||'',isNewsRelease:true};
  default:return base;
 }
}
await mkdir(dir,{recursive:true});
const outcome=[];
for(const p of parks){
 const data={parkId:p.id,code:p.code,npsSource:'https://www.nps.gov/'+p.code+'/index.htm',importedAt:new Date().toISOString(),feeds:{},warnings:[],approval:'NPS_SOURCE_IMPORTED_NOT_EDITORIALLY_APPROVED'};
 for(const [type,endpoint] of endpoints){
  try{const result=await get(endpoint,p.code,type==='parks'?{fields:'images,entranceFees,entrancePasses,operatingHours,activities,contacts,topics'}:{});
   data.feeds[type]={count:result.items.length,total:result.total,source:result.url,checkedAt:result.checkedAt,records:result.items.map(x=>normalize(type,x,p.code))};
  }catch(e){errorCount++;data.warnings.push(type+': '+String(e.message||e).slice(0,200));data.feeds[type]={records:[],source:'https://www.nps.gov/'+p.code+'/index.htm',error:'SOURCE_NOT_AVAILABLE'};
  }
 }
 await writeFile(join(dir,p.id+'.json'),JSON.stringify(data,null,2)+'\n');
 outcome.push({park:p.id,counts:Object.fromEntries(Object.entries(data.feeds).map(([k,v])=>[k,v.count||0])),errors:data.warnings});
 console.log('Park source import '+p.id+' '+Object.values(data.feeds).map(x=>x.count||0).join('/')+' issues='+data.warnings.length);
}
await writeFile(join(dir,'IMPORT-STATUS.json'),JSON.stringify({source:'NPS Official Data API',completedAt:new Date().toISOString(),parkCount:parks.length,feeds:endpoints.map(x=>x[0]),errorCount,results:outcome,notes:'Source facts may change. Every park/image/event needs rights, source, currency, editorial and user approval before indexable publication.'},null,2)+'\n');
if(errorCount)process.exitCode=2; // Partial failures are visible in GitHub Actions.
