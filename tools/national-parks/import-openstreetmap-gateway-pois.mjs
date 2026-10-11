#!/usr/bin/env node
/**
 * First-party OSM/ODbL business intake for ALL 63 NPS parks.
 * Only runs against operator-approved self-hosted/licensed Overpass provider.
 * Inputs: 63-park independently VERIFIED entrance coordinates.
 * Never claim exhaustive 25-mile business coverage from one source.
 * Example:
 *   OVERPASS_URL=https://your-overpass.example/api/interpreter OSM_ODBL_COMPLIANCE_REVIEWED=yes
 *   node tools/national-parks/import-openstreetmap-gateway-pois.mjs private/entrances.json private/merchant-feed.json
 */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
const endpoint=process.env.OVERPASS_URL;
if(!endpoint||!endpoint.startsWith('https://')||process.env.OSM_ODBL_COMPLIANCE_REVIEWED!=='yes')
 throw Error('Requires approved OVERPASS_URL and OSM_ODBL_COMPLIANCE_REVIEWED=yes');
const input=process.argv[2],output=process.argv[3];
if(!input||!output)throw Error('Missing reviewed entrance input or merchant output');
const entrances=JSON.parse(await readFile(resolve(input),'utf8')).entrances;
if(!Array.isArray(entrances)||new Set(entrances.map(x=>x.park_id)).size!==63)throw Error('Must provide source-reviewed entrances for all 63 parks');
const taxonomy={
 'tourism:hotel':'hotels','tourism:motel':'motels','tourism:guest_house':'nightly-rentals','tourism:camp_site':'campgrounds','tourism:caravan_site':'campgrounds','tourism:chalet':'nightly-rentals','tourism:apartment':'nightly-rentals','tourism:museum':'museums','tourism:gallery':'art-galleries','tourism:attraction':'family-activities',
 'amenity:restaurant':'restaurants','amenity:cafe':'coffee-breakfast','amenity:fast_food':'restaurants','amenity:pharmacy':'pharmacies','amenity:fuel':'gas-stations','amenity:bus_station':'transportation','amenity:bicycle_rental':'bicycle-rentals',
 'shop:supermarket':'grocery-stores','shop:convenience':'convenience-stores','shop:sports':'sporting-goods','shop:outdoor':'camping-supplies','shop:gift':'retail-souvenirs','shop:art':'art-galleries','shop:bicycle':'bicycle-rentals','office:travel_agent':'tour-guides','tourism:information':'visitors-centers'
};
const keys=['tourism','amenity','shop','office'],seen=new Map();
function coord(e){return Number.isFinite(e.lat)&&Number.isFinite(e.lon)?e:e.center&&Number.isFinite(e.center.lat)?e.center:null}
async function query(a){
 if(a.verified!==true||!a.source_url||!Number.isFinite(a.lat)||!Number.isFinite(a.lon))throw Error('Entrance lacks source/geo review: '+a.park_id);
 const filters=keys.flatMap(k=>['node','way','relation'].map(t=>t+'(around:40300,'+a.lat+','+a.lon+')["'+k+'"];')).join('');
 const q='[out:json][timeout:120];('+filters+');out center tags;';
 const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','User-Agent':'CLM-NPG-OSM-ODbL-Licensed-Importer'},body:'data='+encodeURIComponent(q),signal:AbortSignal.timeout(125000)});
 if(!response.ok)throw Error('Provider HTTP '+response.status+' for '+a.park_id);
 const data=await response.json();if(!Array.isArray(data.elements))throw Error('Invalid provider payload');return data.elements;
}
for(const a of entrances){
 const elements=await query(a);
 for(const e of elements){
  const tags=e.tags||{},c=coord(e);if(!c||!tags.name)continue;
  const cat=[...new Set(Object.entries(tags).map(([k,v])=>taxonomy[k+':'+v]).filter(Boolean))];if(!cat.length)continue;
  const id='osm:'+e.type+':'+e.id;
  const rec=seen.get(id)||{provider:'openstreetmap',provider_id:e.type+'-'+e.id,name:tags.name,lat:c.lat,lon:c.lon,city:tags['addr:city']||'',state:tags['addr:state']||'',address:[tags['addr:housenumber'],tags['addr:street'],tags['addr:city'],tags['addr:state']].filter(Boolean).join(', '),
   categories:[],source_url:'https://www.openstreetmap.org/'+e.type+'/'+e.id,
   source_license:'ODbL 1.0 — https://opendatacommons.org/licenses/odbl/1-0/',
   source_attribution:'© OpenStreetMap contributors — https://www.openstreetmap.org/copyright',
   data_rights_approved:true,source_terms:'Requires ODbL attribution and share-alike analysis',
   observed_at:new Date().toISOString(),photos_rights_approved:false,
   website:tags.website||tags['contact:website']||'',phone:tags.phone||tags['contact:phone']||'',opening_hours:tags.opening_hours||'',
   coverage:'OSM contributor-source seeds; NOT exhaustive, current or merchant verified'};
  rec.categories=[...new Set([...rec.categories,...cat])];seen.set(id,rec);
 }
 console.log(a.park_id+': '+elements.length+' source features, '+seen.size+' eligible unique merchants');
 await new Promise(done=>setTimeout(done,Number(process.env.OVERPASS_SPACING_MS||1500)));
}
await mkdir(dirname(resolve(output)),{recursive:true});
await writeFile(resolve(output),JSON.stringify({businesses:[...seen.values()],source:'OpenStreetMap/ODbL, not complete 25-mile coverage',retrievedAt:new Date().toISOString()},null,2)+'\n');
console.log('ODbL merchant feed ready for separate 63-park geospatial QA and owner verification');
