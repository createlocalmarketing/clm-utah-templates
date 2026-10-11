#!/usr/bin/env node
/*
CLM National Parks Guide — geographically accurate licensed POI processor.
Input: verified park entrance anchors and authorized merchant feed(s).
All 63 parks, each entrance's 25 mi radius, many-to-many merchant/park relationships.
Does NOT scrape Google Maps without permission, invent merchants, reuse protected photos,
or silently treat the gateway-town centroid as a legally verified park entrance.

node tools/national-parks/build-licensed-business-directory.mjs \
  --parks nationalparksguide.co/data/nps-63-canonical-entities.json \
  --entrances private/verified-entrances.json \
  --merchants private/licensed-business-feed.json \
  --out private/generated/
*/
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
function option(k,required=true){const i=process.argv.indexOf('--'+k);if(i>=0&&process.argv[i+1])return process.argv[i+1];if(required)throw Error('Missing --'+k);return null}
async function load(p){return JSON.parse(await readFile(resolve(p),'utf8'))}
const miles=(a,b)=>{const r=Math.PI/180,dlat=(b.lat-a.lat)*r,dlon=(b.lon-a.lon)*r;return 3958.7613*2*Math.asin(Math.min(1,Math.sqrt(Math.sin(dlat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dlon/2)**2)))};
const validPoint=x=>x&&Number.isFinite(x.lat)&&Number.isFinite(x.lon)&&x.lat>=-90&&x.lat<=90&&x.lon>=-180&&x.lon<=180;
const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const cats=new Set(['hotels','motels','campgrounds','nightly-rentals','restaurants','coffee-breakfast','grocery-stores','convenience-stores','gas-stations','pharmacies','tour-guides','tour-buses','transportation','rental-cars','bicycle-rentals','outdoor-vehicle-rentals','camping-supplies','sporting-goods','museums','historical-sites','photographers','art-galleries','retail-souvenirs','wellness','family-activities','visitors-centers']);
async function main(){
const parks=(await load(option('parks'))).parks;
if(!Array.isArray(parks)||parks.length!==63||new Set(parks.map(p=>p.id)).size!==63)throw Error('Expected all 63 uniquely identified national parks; refuse incomplete nationwide launch');
const anchors=(await load(option('entrances'))).entrances;
const imported=(await load(option('merchants'))).businesses;
if(!Array.isArray(anchors)||!Array.isArray(imported))throw Error('Entrances and businesses must both be arrays');
const out=resolve(option('out')); await mkdir(out,{recursive:true});
const approved=new Map(parks.map(p=>[p.id,[]]));const anchorErrors=[];
for(const a of anchors){if(!approved.has(a.park_id)){anchorErrors.push('Unrecognized park '+a.park_id);continue}
if(!validPoint(a)||a.verified!==true||!a.source_url||!a.verified_at){anchorErrors.push('Unverified/incomplete entrance '+a.park_id+'/'+(a.name||''));continue}
approved.get(a.park_id).push({name:a.name||'entrance',lat:a.lat,lon:a.lon,source:a.source_url,verified_at:a.verified_at})}
const canonical=new Map(),rejected=[];
for(const b of imported){
if(!validPoint(b)||!b.name||!b.source_url||!b.source_license||!b.observed_at||!Array.isArray(b.categories)){rejected.push({name:b.name||'',why:'missing geo/license/name/provenance/categories'});continue}
const matched=b.categories.filter(c=>cats.has(c));if(!matched.length){rejected.push({name:b.name,why:'no mapped in-scope tourism category'});continue}
if(b.source_license.toLowerCase()==='unknown'||b.data_rights_approved!==true){rejected.push({name:b.name,why:'source terms/export rights not approved'});continue}
const id=b.provider_id?norm(b.provider)+'-'+norm(b.provider_id):createHash('sha256').update(norm(b.name)+'|'+b.lat.toFixed(5)+'|'+b.lon.toFixed(5)).digest('hex').slice(0,22);
const entity=canonical.get(id)||{id,name:b.name,lat:b.lat,lon:b.lon,address:b.address||'',city:b.city||'',state:b.state||'',source_url:b.source_url,source_license:b.source_license,observed_at:b.observed_at,claim_status:'unclaimed',categories:[],parks:[],photos:[],review_display_status:'NO PROVEN LICENSE'};
entity.categories=[...new Set([...entity.categories,...matched])];
if(b.photos_rights_approved===true&&Array.isArray(b.photos))entity.photos=[...entity.photos,...b.photos.filter(p=>p.url&&p.credit&&p.license_url)];
canonical.set(id,entity);
}
for(const m of canonical.values())for(const p of parks){
const points=approved.get(p.id);if(!points.length)continue;
const d=Math.min(...points.map(a=>miles(a,m)));
if(d<=25){m.parks.push({park_id:p.id,straight_line_miles:Math.round(d*10)/10,scope:'within 25 miles of a verified listed entrance',distance_kind:'straight-line, not driving'});
}}
const byPark=parks.map(p=>{
const pts=approved.get(p.id),matches=[...canonical.values()].filter(m=>m.parks.some(x=>x.park_id===p.id));
const categories=Object.fromEntries([...cats].map(cat=>[cat,matches.filter(x=>x.categories.includes(cat)).length]));
return {park_id:p.id,name:p.name,anchor_count:pts.length,business_count:matches.length,categories,source_only:true,coverage_status:pts.length?'SEEDS IMPORTED / CATEGORY COMPLETENESS UNVERIFIED':'BLOCKED: NO VERIFIED PARK ENTRANCE',radius_miles:25,source_count:new Set(matches.map(x=>x.source_url)).size,verified_entrances:pts};
});
const meta={produced_at:new Date().toISOString(),notes:'This is an audited 25-mile radius importer. Zero or many imported merchants does not prove complete regional coverage without provider completeness evidence. No fabricated merchants, photos, reviews, prices, deals or source rights.',parks_checked:parks.length,verified_entrances:anchors.length-anchorErrors.length,raw_merchants:imported.length,accepted_entities:canonical.size,merchants_in_any_park:[...canonical.values()].filter(m=>m.parks.length).length,rejected_count:rejected.length,parks_missing_anchors:byPark.filter(p=>!p.anchor_count).length,full_coverage_verified:0};
await writeFile(join(out,'businesses.normalized.json'),JSON.stringify([...canonical.values()],null,2));
await writeFile(join(out,'park-25mi-coverage.json'),JSON.stringify({meta,parks:byPark,rejected,anchorErrors},null,2));
await writeFile(join(out,'review-required-summary.md'),['# NATIONAL PARKS GUIDE — 63-PARK BUSINESS INTAKE',...Object.entries(meta).map(([k,v])=>'- '+k+': '+v),'','## BLOCKED OR INCOMPLETE',...byPark.filter(p=>!p.anchor_count||!p.business_count).map(p=>'- [ ] '+p.name+': '+p.coverage_status+'; '+p.business_count+' source records')].join('\n')+'\n');
console.log(JSON.stringify(meta,null,2));
}
main().catch(e=>{console.error('NPG directory ingest FAILED: '+e.message);process.exitCode=1});
