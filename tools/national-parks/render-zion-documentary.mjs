#!/usr/bin/env node
/**
 * CLM proprietary Zion film encoder. Requires REAL licensed footage, original licensed narrator
 * and original score WAV. Not a still-photo animatic, not a YouTube clip downloader.
 *
 * node tools/national-parks/render-zion-documentary.mjs ./private/zion-film-assets.json ./private/output/
 *
 * Manifest fields:
 * {project:"CLM-ZION-80S",segments:[
 *  {file:"/absolute/path/scenic-clip.mp4",in:0,duration:9,rights:"CLEARED",
 *   sourceUrl:"https://npgallery.nps.gov/AssetDetail/...",licenseEvidence:"..."},
 * ...8 segments],narration:"/path/original-narrator.wav",score:"/path/original-score.wav"}
 *
 * Original performance must NOT impersonate Ken Burns, Morgan Freeman, James Earl Jones or any
 * particular individual. The score must be an original composition, never the theme of 1883.
 */
import {readFile,mkdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
const input=process.argv[2],dest=resolve(process.argv[3]||'./private/renders');
if(!input)throw Error('Usage: render-zion-documentary.mjs <licensed-manifest.json> <output-dir>');
const m=JSON.parse(await readFile(resolve(input),'utf8'));
const timings=[9,11,11,11,11,11,10,6],seconds=80;
if(m.project!=='CLM-ZION-80S'||!Array.isArray(m.segments)||m.segments.length!==8)
 throw Error('Expected exactly 8 licensed scene inputs and CLM-ZION-80S project');
const sum=m.segments.reduce((n,s)=>n+Number(s.duration),0);
if(Math.abs(sum-seconds)>.001||m.segments.some((s,i)=>Number(s.duration)!==timings[i]))
 throw Error('Cut list must be exactly 80.0 seconds and match approved 8-scene timing');
for(const [i,s] of m.segments.entries()){
 if(s.rights!=='CLEARED'||!s.sourceUrl||!s.licenseEvidence||!s.file)throw Error('Uncleared or missing video license in scene '+i);
 const file=resolve(s.file);const st=await stat(file);if(st.size<10000)throw Error('Unusable real video footage '+file);
 if(!/\.(mp4|mov|mkv)$/i.test(file))throw Error('Scene '+i+' is not a moving-footage master');
}
for(const k of ['narration','score']){
 if(!m[k]||!m[k+'_rights']||m[k+'_rights']!=='ORIGINAL_CLEARED')throw Error('Missing independently cleared original '+k);
 await stat(resolve(m[k]));
}
const run=(exe,args)=>{const r=spawnSync(exe,args,{encoding:'utf8',maxBuffer:8e6});if(r.status!==0)throw Error(exe+' failed:\n'+String(r.stderr||'').slice(-2700));return r.stdout};
function probe(file){const raw=run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file]);return JSON.parse(raw)}
for(const s of m.segments){const d=probe(resolve(s.file));if(!d.streams.some(x=>x.codec_type==='video'))throw Error('Real moving video stream required: '+s.file);if(Number(d.format.duration||0)<Number(s.in||0)+s.duration)throw Error('Video source shorter than cut for '+s.file)}
await mkdir(dest,{recursive:true});
function render(portrait=false){
 const width=portrait?1080:1920,height=portrait?1920:1080;
 const inputs=m.segments.flatMap(s=>['-ss',String(Number(s.in||0)),'-t',String(s.duration),'-i',resolve(s.file)]);
 inputs.push('-i',resolve(m.narration),'-i',resolve(m.score));
 const filters=[];
 for(let i=0;i<8;i++){
  // Use source-specific real footage; centered crop is subject to separate human art-direction QC.
  filters.push('['+i+':v]fps=30,scale='+width+':'+height+':force_original_aspect_ratio=increase,crop='+width+':'+height+',setsar=1,trim=duration='+timings[i]+',setpts=PTS-STARTPTS,format=yuv420p[v'+i+']');
 }
 filters.push(Array.from({length:8},(_,i)=>'[v'+i+']').join('')+'concat=n=8:v=1:a=0[cut]');
 filters.push('[cut]fade=t=in:st=0:d=1,fade=t=out:st=78:d=2[v]');
 // Documentary-quality mix requires real ears-on QC; score deliberately underneath narration,
 // rather than automatically overpowering spoken history.
 filters.push('[8:a]aresample=48000,apad,atrim=duration=80,volume=1.0,asetpts=PTS-STARTPTS[voice]');
 filters.push('[9:a]aresample=48000,apad,atrim=duration=80,volume=0.33,asetpts=PTS-STARTPTS,afade=t=out:st=76:d=4[music]');
 filters.push('[voice][music]amix=inputs=2:duration=first:dropout_transition=0,alimiter=limit=0.92,aresample=48000[a]');
 const out=join(dest,portrait?'discover-zion-80s-vertical.mp4':'discover-zion-80s-landscape.mp4');
 run('ffmpeg',['-hide_banner','-y',...inputs,'-filter_complex',filters.join(';'),'-map','[v]','-map','[a]','-c:v','libx264','-preset','slow','-crf','19','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','256k','-movflags','+faststart','-t','80',out]);
 const p=probe(out);if(Math.abs(Number(p.format.duration||0)-80)>1.1)throw Error('Rendered output duration incorrect');
 return {file:out,duration:Number(p.format.duration),rights:'source manifest gated; final visual/listening QC pending'};
}
console.log(JSON.stringify({project:m.project,outputs:[render(false),render(true)],sourceRightsChecked:8},null,2));
