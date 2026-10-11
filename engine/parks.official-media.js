(function runtime(){
'use strict';
const registry={
zion:[
{id:"a1940f19-eceb-4e27-bf62-19d8d5914b35",title:"Zion Wilderness: Family Time",type:"NPS Educational Film",duration:"2:32",source:"https://www.nps.gov/media/video/view.htm?id=a1940f19-eceb-4e27-bf62-19d8d5914b35",status:"Official NPS embed; derivative usage separate"},
{id:"25BC4472-17FB-4CC4-A4E4-AAB1CBB8E407",title:"Zion in 2023",type:"NPS Park Story",duration:"0:42",source:"https://www.nps.gov/media/video/view.htm?id=25BC4472-17FB-4CC4-A4E4-AAB1CBB8E407",status:"Official NPS video; verify embedded stream and rights"}
],
yellowstone:[
{id:"4D22CDC8-155D-451F-6712CC6A99529123",title:"Fountain Geyser — Minute Out In It",type:"Natural sound NPS film",duration:"1:10",source:"https://www.nps.gov/media/video/view.htm?id=8EB6716F-D62C-4D5A-9641-1F88AACA5ACA",status:"NPS credited; no separate derivative rights assumed"},
{id:"E82D72F0-9923-4976-B5EA-953E19E2F606",title:"Managing a Bear Jam",type:"NPS Safety Story",duration:"1:25",source:"https://www.nps.gov/media/video/view.htm?id=E82D72F0-9923-4976-B5EA-953E19E2F606",status:"Original NPS educational video"}
],
glacier:[
{id:"940EAF81-A5FD-40C3-840B-FD349B59C83A",title:"What Connects Us to Wilderness?",type:"NPS Park Story",duration:"0:27",source:"https://www.nps.gov/media/video/view.htm?id=940EAF81-A5FD-40C3-840B-FD349B59C83A",status:"Original NPS embed"},
{id:"E24D28BA-5842-4FAE-939A-D84EEED3B954",title:"Going-to-the-Sun Road — Historical Film",type:"NPS Historical Film",duration:"Historical",source:"https://www.nps.gov/media/video/view.htm?id=E24D28BA-5842-4FAE-939A-D84EEED3B954",status:"Original NPS embed"}
],
yosemite:[
{id:"01964B37-C8B7-8B9D-A2DB28BD3EBDF07E",title:"Yosemite Stock Footage 2009",type:"NPS Public Domain Scenic Footage",duration:"3:16",source:"https://www.nps.gov/media/video/view.htm?id=01964B37-C8B7-8B9D-A2DB28BD3EBDF07E",status:"NPS page explicitly states public domain"},
{id:"688A1D99-F099-496D-853E-99204739DA7F",title:"Spirit of Yosemite",type:"Official Park Film",duration:"23:14",source:"https://www.nps.gov/media/video/view.htm?id=688A1D99-F099-496D-853E-99204739DA7F",status:"Official embed only; derivative rights not assumed"}
],
"great-smoky-mountains":[
{id:"B4C11937-A079-7BD4-E85FB8BB80F0EBEF",title:"Nature and Science in the Great Smoky Mountains",type:"Official NPS Biodiversity Story",duration:"",source:"https://www.nps.gov/grsm/learn/nature/index.htm",status:"Official NPS embed, verify on-site playback"},
{id:"C3212667-1DD8-B71C-074E43F75566F68F",title:"Parks as Classrooms",type:"NPS Educational Film",duration:"",source:"https://www.nps.gov/media/video/view.htm?id=C3212667-1DD8-B71C-074E43F75566F68F",status:"Original NPS embed"}
]};
const safe=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function tile(v){return `<article class="npg-official-film"><div class="npg-filmframe"><iframe src="https://www.nps.gov/media/video/embed.htm?id=${encodeURIComponent(v.id)}" title="${safe(v.title)} — official National Park Service video" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen; picture-in-picture"></iframe></div><div class="npg-film-caption"><span class="eyebrow">${safe(v.type)}</span><h3>${safe(v.title)}</h3><p class="tiny">${safe(v.status)}</p><a href="${safe(v.source)}" rel="noopener" target="_blank">Source and copyright details ↗</a></div></article>`}
function insert(p){const el=document.getElementById('parkVideos');if(!el)return;const a=registry[p?.slug]||[];if(!a.length){el.innerHTML='<div class="notice">Official video feeds are awaiting source import for this park. No fabricated or licensed footage preview appears here.</div>';return}el.outerHTML=`<section class="section tint"><div class="wrap"><div class="headsection"><div><span class="eyebrow">REAL OFFICIAL PARK FILMS</span><h2>Watch ${safe(p.short)} in motion</h2></div><p>Play official-source National Park Service films. This is separate from the commissioned original 80-second documentary, which remains unrendered.</p></div><div class="grid g2">${a.map(tile).join('')}</div></div></section>`}
function videoPage(){const parks=window.CLM_PARKS?.parks||[];const featured=window.CLM_PARKS?.featuredSlugs||[];return `<section class="section"><div class="wrap"><div class="headsection"><div><span class="eyebrow">OFFICIAL NPS MEDIA</span><h2>Films from featured parks</h2></div><p>Authentic moving footage with exact agency source links; our proprietary films are a separate production deliverable.</p></div><div class="grid g2">${featured.flatMap(id=>(registry[id]||[]).slice(0,1).map(v=>({...v,park:parks.find(p=>p.slug===id)?.short||id}))).map(v=>`<div>${tile(v)}<p class="tiny">Park: ${safe(v.park)}</p></div>`).join('')}</div></div></section>`}
window.NPG_OFFICIAL_MEDIA={registry,insert,videoPage};
})();