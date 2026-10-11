(function zionPhotoExperience(){
  "use strict";
  const A=window.ParkPagesA, MEDIA=window.NPG_ZION_MEDIA||[],BRIEFS=window.NPG_ZION_DEPTH_BRIEFS||{};
  if(!A||!MEDIA.length)return;
  const byId=Object.fromEntries(MEDIA.map(x=>[x.id,x]));
  const all=MEDIA.filter(x=>x.location==="Zion National Park");
  const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const nameMedia=name=>{
    const n=String(name).toLowerCase();
    if(n.includes("patriarch"))return byId.patriarchs;
    if(n.includes("narrows"))return byId["narrows-hikers"];
    if(n.includes("par'us")||n.includes("pa’rus"))return byId.parus;
    if(n.includes("riverside"))return byId.riverside;
    if(n.includes("shuttle"))return byId.shuttle;
    if(n.includes("visitor center"))return byId["zion-center"];
    if(n.includes("watchman") && n.includes("camp"))return byId["watchman-camp"];
    if(n.includes("watchman"))return byId["watchman-river"];
    if(n.includes("canyon overlook"))return byId.canyon;
    if(n.includes("angels landing"))return byId.angels;
    if(n.includes("emerald"))return byId.emerald;
    return null;
  };
  const media=(m,css="")=>`<img class="${css}" src="${escape(m.src)}" alt="${escape(m.alt)}" loading="lazy" decoding="async" onerror="this.classList.add('npg-photo-load-failure')" />`;
  function makeCarousel(root,brief){
    const section=root.querySelector(".npg-depth-v2-hero");
    if(!section)return;
    const candidates=brief.actions.slice(0,5).map((x,i)=>{
      const specific=nameMedia(x[0]);
      const used=new Set();
      return {title:x[0],desc:x[1],url:x[2],photo:specific||all[(i+brief.slug.length)%all.length],context:specific?"IDENTIFIED ZION DESTINATION":"ZION GATEWAY SCENERY — NOT A PROPERTY PHOTO"};
    });
    const scenes=candidates.map((x,i)=>{
      if(i===0)x.photo=byId[({"hikes-trails":"angels","iconic-photo-spots":"canyon",hotels:"watchman-river",restaurants:"panorama",campgrounds:"watchman-camp","shuttles-parking":"shuttle","gear-rentals":"narrows-hikers","tour-guides":"canyon"})[brief.slug]]||x.photo;
      return x;
    });
    // Each carousel image unique in this page wherever the media catalog permits.
    const seen=new Set();scenes.forEach((entry,i)=>{
      if(seen.has(entry.photo.id)){entry.photo=all.find((m,k)=>!seen.has(m.id) && k>=(i+3)%all.length)||all.find(m=>!seen.has(m.id))||entry.photo;entry.context="ZION PARK SCENERY — CONTEXTUAL IMAGE"}
      seen.add(entry.photo.id);
    });
    section.classList.add("npg-visual-carousel");
    section.innerHTML=`<div class="npg-photo-story-deck" role="region" aria-roledescription="carousel" aria-label="${escape(brief.label)} — five park photo stories" tabindex="0">
      ${scenes.map((s,i)=>`<article class="npg-photo-story-slide ${i===0?"is-active":""}" data-npg-story-index="${i}" aria-roledescription="slide" aria-label="${i+1} of ${scenes.length}" ${i?"aria-hidden=\"true\" inert":""}>
        <figure class="npg-photo-story-image">${media(s.photo)}<figcaption><span>${escape(s.context)}</span><a href="${escape(s.photo.source)}" target="_blank" rel="noopener noreferrer" tabindex="${i?'-1':'0'}">Photo credit ↗</a></figcaption></figure>
        <div class="npg-photo-story-copy"><span class="npg-zion-depth-kicker">ZION NATIONAL PARK · ${escape(brief.label.toUpperCase())} · ${String(i+1).padStart(2,"0")} / 05</span>
        ${i===0?`<h1>${escape(brief.title)}</h1>`:`<h2>${escape(s.title)}</h2>`}
        <p class="npg-photo-story-dek">${escape(i===0?brief.dek:s.desc)}</p>
        <p class="npg-photo-story-note">${escape(i===0?"Explore named trails, places and locally relevant options below.":brief.dek)}</p>
        <div class="npg-photo-story-actions"><button class="btn gold" type="button" data-npg-story-jump="npg-depth-places">Discover locations <span aria-hidden="true">↘</span></button><a class="btn alt" href="${escape(s.url||brief.source)}" target="_blank" rel="noopener noreferrer">Visitor details ↗</a></div>
        </div></article>`).join("")}
      <div class="npg-photo-story-nav"><div class="npg-photo-story-buttons"><button type="button" data-npg-slide-step="-1" aria-label="Previous photo story">‹</button><button type="button" data-npg-slide-step="1" aria-label="Next photo story">›</button></div><div class="npg-photo-story-pagination" role="tablist" aria-label="Choose photo story">${scenes.map((s,i)=>`<button type="button" class="${i===0?"is-active":""}" data-npg-slide-to="${i}" role="tab" aria-selected="${i===0?"true":"false"}" aria-label="Slide ${i+1}: ${escape(s.title)}" tabindex="${i===0?"0":"-1"}"></button>`).join("")}</div><span class="npg-photo-story-count" aria-live="polite">01 / 05</span></div>
      </div>`;
    const slider=section.querySelector(".npg-photo-story-deck"),slides=[...slider.querySelectorAll(".npg-photo-story-slide")],dots=[...slider.querySelectorAll("[data-npg-slide-to]")];
    let active=0,touchStart=null;
    function go(target){
      active=(target+slides.length)%slides.length;
      slides.forEach((slide,i)=>{const on=i===active;slide.classList.toggle("is-active",on);slide.setAttribute("aria-hidden",String(!on));if(on)slide.removeAttribute("inert");else slide.setAttribute("inert","");});
      dots.forEach((dot,i)=>{const on=i===active;dot.classList.toggle("is-active",on);dot.setAttribute("aria-selected",String(on));dot.tabIndex=on?0:-1});
      slider.querySelector(".npg-photo-story-count").textContent=String(active+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    }
    slider.querySelectorAll("[data-npg-slide-step]").forEach(btn=>btn.addEventListener("click",()=>go(active+Number(btn.dataset.npgSlideStep))));
    dots.forEach(btn=>btn.addEventListener("click",()=>go(Number(btn.dataset.npgSlideTo))));
    slider.addEventListener("keydown",event=>{if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();go(active+(event.key==="ArrowRight"?1:-1))}});
    slider.addEventListener("touchstart",e=>{touchStart=e.touches?.[0]?.clientX??null},{passive:true});
    slider.addEventListener("touchend",e=>{if(touchStart===null)return;const dx=(e.changedTouches?.[0]?.clientX??touchStart)-touchStart;if(Math.abs(dx)>55)go(active+(dx<0?1:-1));touchStart=null},{passive:true});
    slider.querySelectorAll("[data-npg-story-jump]").forEach(btn=>btn.addEventListener("click",()=>document.getElementById(btn.dataset.npgStoryJump)?.scrollIntoView({behavior:window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches?"auto":"smooth"})));
  }
  function enrich(root,brief){
    const mediaFor=(n,offset=0)=>all[((n+offset+brief.slug.length)*3)%all.length]||all[0];
    const factImages=[...root.querySelectorAll(".npg-depth-v2-fact")];
    factImages.forEach((card,i)=>{
      const m=mediaFor(i,5);
      card.insertAdjacentHTML("afterbegin",`<div class="npg-v3-fact-photo">${media(m)}<span>REAL ZION SCENERY · IMAGE RIGHTS REVIEW</span></div>`);
      const tag=card.querySelector(".npg-zion-depth-kicker");if(tag)tag.textContent="VISITOR INSIGHT "+String(i+1).padStart(2,"0");
    });
    root.querySelectorAll(".npg-depth-v2-destination").forEach((card,i)=>{
      const n=card.querySelector("h3")?.textContent||"";
      const m=nameMedia(n)||mediaFor(i,10);
      const top=card.querySelector(".npg-depth-v2-destination-top");
      if(top){top.innerHTML=`${media(m)}<span class="npg-v3-place-image-label">${nameMedia(n)?"IDENTIFIED VIEWPOINT":"REGIONAL SCENERY — NOT BUSINESS PHOTO"}</span>`}
    });
    root.querySelectorAll(".npg-depth-v2-rail-track article").forEach((card,i)=>{
      const m=nameMedia(card.querySelector("h4")?.textContent||"")||mediaFor(i,16);
      card.insertAdjacentHTML("afterbegin",`<div class="npg-v3-rail-photo">${media(m)}<span>${nameMedia(card.querySelector("h4")?.textContent||"")?"LOCATION VIEW":"ZION AREA — NOT BUSINESS PHOTO"}</span></div>`);
    });
    root.querySelectorAll(".npg-depth-v2-steps article").forEach((card,i)=>{
      const m=mediaFor(i,19);
      card.insertAdjacentHTML("afterbegin",`<div class="npg-v3-step-photo">${media(m)}</div>`);
    });
    const heads={
      "npg-depth-answer":"Plan the experience you actually want",
      "npg-depth-decisions":`${brief.label}: what matters before you go`,
      "npg-depth-places":`${brief.label} worth knowing`,
      "npg-depth-pathway":"Go beyond the obvious",
      "npg-depth-plan":"Turn inspiration into a real plan",
      "npg-depth-logistics":"Explore safely and confidently",
      "npg-depth-related":"Keep exploring Zion"
    };
    Object.entries(heads).forEach(([id,title])=>{const h=root.querySelector("#"+id+" .npg-depth-v2-section-head h2");if(h)h.textContent=title});
    const safety=root.querySelector("#npg-depth-logistics .npg-depth-v2-safety");
    if(safety){
      const second=safety.children[1];
      if(second){const m=mediaFor(12,9);second.innerHTML=`<figure class="npg-v3-safety-photo">${media(m)}<figcaption>Check NPS trail and access conditions before departure.</figcaption></figure>`}
    }
    const warning=root.querySelector(".npg-depth-v2-warning");
    if(warning){warning.innerHTML=`<span><strong>Preview only.</strong> Verify park conditions and business details before traveling. <a href="https://www.nps.gov/zion/planyourvisit/conditions.htm" target="_blank" rel="noopener">NPS current conditions ↗</a></span>`;}
    const prov=root.querySelector(".npg-depth-v2-provenance");
    if(prov){prov.classList.add("npg-v3-provenance-small")}
  }
  const original=A.topicPage;
  A.topicPage=(p,t,sub)=>{
    original(p,t,sub);
    const root=document.querySelector(".npg-depth-v2");
    const brief=BRIEFS[sub];
    if(p?.slug!=="zion"||!brief||brief.family!==t?.id||!root)return;
    makeCarousel(root,brief);enrich(root,brief);
  };
  window.NPG_ZION_VISUAL_REVISION={enabled:true,catalogCount:MEDIA.length,version:"2026-10-11"};
})();
