(function enableSiteVisuals(){
"use strict";
const U=window.ParkUI,A=window.ParkPagesA,E=window.ParkPagesD,M=window.NPG_ZION_MEDIA||[];
if(!U||!A||!M.length)return;
const esc=U.esc,ind=Object.fromEntries(M.map(m=>[m.id,m])),photos=M.filter(m=>m.location==="Zion National Park");
const h=s=>Array.from(s).reduce((x,ch)=>(x*31+ch.charCodeAt(0))>>>0,123);
const choose=(route,i,used)=>{
 const n=photos.length;
 for(let j=0;j<n;j++){const m=photos[(h(route)+i*7+j)%n];if(!used.has(m.id)){used.add(m.id);return m}}
 return photos[(h(route)+i)%n];
};
const photo=(m,descriptor="",cls="")=>m?`<div class="npg-photo-context ${cls}"><img loading="lazy" decoding="async" src="${esc(m.src)}" alt="${esc(m.alt)}" onerror="this.classList.add('npg-photo-failed')"><span>${esc(descriptor||"Zion National Park · context photo")}</span></div>`:"";
function carousel(section,park,title,source){
 const used=new Set(),choices=Array.from({length:5},(_,i)=>choose(title,i,used));
 const copy=section.querySelector(".npg-topic-hero-content");
 if(!copy)return;
 const kicker=copy.querySelector(".eyebrow")?.textContent||"ZION VISITOR GUIDE";
 const deck=choices.map((m,i)=>`<div class="npg-generic-slide ${i===0?"active":""}" aria-hidden="${i>0}" ${i?"inert":""}>
 <figure class="npg-generic-photo"><img src="${esc(m.src)}" loading="${i?"lazy":"eager"}" alt="${esc(m.alt)}" decoding="async"><figcaption><span>${esc(m.place)} · Zion scenery (not merchant photography)</span><a href="${esc(m.source)}" target="_blank" rel="noopener">Photo source ↗</a></figcaption></figure>
 <div class="npg-generic-copy"><span class="eyebrow">${esc(kicker)} · 0${i+1}/05</span>${i===0?`<h1>${esc(title)}</h1>`:`<h2>${esc(m.place)} and the Zion experience</h2>`}<p>${esc(i===0?"Explore practical visitor guidance, named places and trip decisions in this destination guide.":"Discover the places and perspectives that make Zion unforgettable. Explore visitor guidance and local options below.")}</p><div class="npg-generic-cta"><button type="button" data-npg-down="true" class="btn gold">Explore this guide ↓</button><a class="btn alt" href="${esc(source)}" target="_blank" rel="noopener noreferrer">NPS information ↗</a></div></div></div>`).join("");
 section.innerHTML=`<div class="npg-generic-carousel" aria-roledescription="carousel" aria-label="${esc(title)}">${deck}<div class="npg-generic-pager"><button type="button" data-step="-1" aria-label="Previous photograph">‹</button><span aria-live="polite" data-current>01 / 05</span><button type="button" data-step="1" aria-label="Next photograph">›</button></div></div>`;
 const parent=section.querySelector(".npg-generic-carousel"),slides=[...parent.querySelectorAll(".npg-generic-slide")];
 let current=0,startX=null;
 const to=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,j)=>{s.classList.toggle("active",current===j);s.setAttribute("aria-hidden",String(current!==j));if(current===j)s.removeAttribute("inert");else s.setAttribute("inert","")});parent.querySelector("[data-current]").textContent=String(current+1).padStart(2,"0")+" / 05"};
 parent.querySelectorAll("[data-step]").forEach(b=>b.addEventListener("click",()=>to(current+Number(b.dataset.step))));
 parent.querySelectorAll("[data-npg-down]").forEach(b=>b.addEventListener("click",()=>section.nextElementSibling?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})));
 parent.tabIndex=0;
 parent.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();to(current+(e.key==="ArrowRight"?1:-1))}});
 parent.addEventListener("touchstart",e=>{startX=e.touches[0].clientX},{passive:true});
 parent.addEventListener("touchend",e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>50)to(current+(dx<0?1:-1));startX=null},{passive:true});
}
function enrich(p,route){
 if(p.slug!=="zion")return;
 const doc=document.querySelector(".npg-topic-complete")||document.querySelector(".npg-park-complete")||document;
 const used=new Set();
 const hero=doc.querySelector(".npg-topic-hero");
 if(hero)carousel(hero,p,document.title.replace(/ \\|.*$/,""),p.source);
 const groups=[
 [".npg-topic-editorial","Visitor insight · scenic context"],
 [".npg-topic-related","Explore this Zion category"],
 [".npg-depth-card .npg-depth-img","Zion park imagery · category context"],
 [".npg-trail-art","Zion trail · location context"],
 [".npg-merchant-gallery .npg-reading","Zion scenery · NOT a business property photo"],
 [".npg-depth-row .npg-reading","Zion scenery · editorial context"],
 [".group","Zion scenery · category guide"],
 [".npg-reading","Zion scenery · editorial context"]
 ];
 const visited=new Set();
 for(const [selector,desc] of groups){
  const nodes=[...doc.querySelectorAll(selector)];
  nodes.forEach((node,i)=>{
    if(visited.has(node)||node.querySelector(".npg-photo-context"))return;
    visited.add(node);
    const m=choose(route,i+visited.size,used);
    if(!m)return;
    const inner=photo(m,desc,"npg-injected-visual");
    if(node.matches(".npg-depth-card .npg-depth-img")){
      node.innerHTML=inner;
    }else if(node.matches(".npg-trail-art")){
      node.innerHTML=inner;
    }else node.insertAdjacentHTML("afterbegin",inner);
    node.classList.add("npg-has-photo");
  });
 }
}
const origTopic=A.topicPage;
A.topicPage=(p,t,sub)=>{origTopic(p,t,sub);if(!document.querySelector(".npg-depth-v2"))enrich(p,["topic",p.slug,t.id,sub||""].join(":"))};
const origPark=A.parkPage;
A.parkPage=(p)=>{origPark(p);enrich(p,"park:"+p.slug)};
if(E&&typeof E.category==="function"){
 const o=E.category;E.category=(p,k,s)=>{o(p,k,s);enrich(p,"category:"+p.slug+":"+k+":"+s)};
}
if(E&&typeof E.childIndex==="function"){
 const o=E.childIndex;E.childIndex=(p,k)=>{o(p,k);enrich(p,"index:"+p.slug+":"+k)};
}
window.NPG_ALL_PAGE_VISUALS={initialized:true,photoCandidates:photos.length};
})();
