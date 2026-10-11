#!/usr/bin/env node
/**
 * CLM first-party SEO image ingestion from explicitly public-domain/CC0 media candidates.
 * Used by draft GitHub PR workflow; never automatically publishes into approved WordPress.
 * Seo file names and alt/rights metadata trace every image to its page and source.
 *
 * node tools/national-parks/import-approved-image-candidates.mjs
 */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve,join} from 'node:path';
const manifest=JSON.parse(await readFile(resolve('nationalparksguide.co/content/approved-source-photo-candidates.json'),'utf8'));
if(!Array.isArray(manifest.assets)||manifest.assets.length<10)throw Error('Missing reviewed park-specific image candidates');
const output=resolve('nationalparksguide.co/assets/photos');
await mkdir(output,{recursive:true});
const report={generatedAt:new Date().toISOString(),status:'PRELAUNCH_MEDIA_QA_PENDING',assets:[],problems:[]};
const eligible=new Set(['CC0','Public domain','NPS public domain']);
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
for(const item of manifest.assets){
 const row={id:item.id,filename:item.filename,source:item.source,license:item.license,alt:item.alt,route:item.route,status:'SOURCE_ONLY'};
 try{
  if(!eligible.has(item.license))throw Error('Use rights-reviewed CC0/US public domain only: '+item.license);
  if(!/^[a-z0-9-]+\.jpg$/.test(item.filename))throw Error('Invalid descriptive SEO filename');
  const url=new URL(item.src);
  if(url.protocol!=='https:'||url.hostname!=='commons.wikimedia.org')throw Error('Only authorized Wikimedia Commons source files can be ingested');
  let response=null;
  for(let retry=0;retry<3;retry++){
   response=await fetch(url,{headers:{'User-Agent':'CLM-NationalParksGuide-AssetResearch/0.1 (editorial media audit; see https://nationalparksguide.co)'},
    signal:AbortSignal.timeout(18000)});
   if(response.ok)break;
   if(response.status!==429&&response.status<500)break;
   await sleep(1500*(retry+1));
  }
  if(!response||!response.ok)throw Error('Source media HTTP '+response?.status);
  const buffer=Buffer.from(await response.arrayBuffer());
  if(buffer.length>20_000_000||buffer.length<15000)throw Error('Unexpected image filesize '+buffer.length);
  if(!(buffer[0]===0xff&&buffer[1]===0xd8&&buffer[2]===0xff))throw Error('Source did not return an actual JPEG image');
  await writeFile(join(output,item.filename),buffer);
  row.status='INGESTED_MEDIA_RIGHTS_FINAL_QA_PENDING';row.bytes=buffer.length;row.src='assets/photos/'+item.filename;
 }catch(e){row.status='FAILED_IMPORT';row.reason=String(e.message||e).slice(0,280);report.problems.push({id:item.id,reason:row.reason})}
 report.assets.push(row);
 await sleep(400);
}
await writeFile(join(output,'MEDIA-SOURCE-AND-RIGHTS-LEDGER.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({downloaded:report.assets.filter(x=>x.status==='INGESTED_MEDIA_RIGHTS_FINAL_QA_PENDING').length,total:report.assets.length,problems:report.problems},null,2));
if(report.problems.length)process.exitCode=2; // a partial asset set MUST NOT get approved as complete
