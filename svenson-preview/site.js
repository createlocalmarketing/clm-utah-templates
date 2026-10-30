(()=> {
  const base=location.origin+'/clm-utah-templates/svenson-preview';
  const sharedStyle=document.querySelector('link[rel="stylesheet"][href*="site.css"]');if(sharedStyle)sharedStyle.href=base+'/site.css?svenson-redesign-20261030b';
  const svensonStyle=document.createElement('style');
  svensonStyle.textContent=`
    body .slide-copy h1,body .pagehead h1,body .page-intro h2,body .topic-feature-copy h2{font-family:Georgia,'Times New Roman',serif!important;font-weight:500!important;letter-spacing:-.035em!important;line-height:1.02!important}
    body .slide-copy h1{font-size:clamp(42px,4.8vw,64px)!important;color:#0b3443!important}
    body .button{font-family:Lato,Arial,sans-serif!important;font-weight:800!important;letter-spacing:.075em!important;border-radius:2px!important;padding:14px 20px!important}
    body .button:not(.secondary){background:#e76d40!important;border-color:#e76d40!important;color:#fff!important}
    body .actions .button.secondary{background:transparent!important;border:1px solid #647b80!important;color:#183037!important}
    body .hero .actions .button.secondary{border-color:#ffffffa8!important;color:#fff!important;background:#ffffff0d!important}
    .utility{background:#373b3f!important;border-bottom:2px solid #168c91!important}
    .hero .slide-media,.directory-page .hero .slide-media{background:transparent!important}
    .hero .slide-media img,.directory-page .hero .slide-media img{width:100%!important;height:100%!important;min-height:0!important;object-fit:cover!important;object-position:center center!important;transform:none!important;background:transparent!important}
    .nav-panel .card img,.nav-cardgrid .card img,.directory-page main .card img{object-fit:cover!important;object-position:center center!important;transform:none!important;background:transparent!important}
  `;
  document.head.appendChild(svensonStyle);
  const iconParts={
    info:['circle:12,12,9','path:M12 11v5M12 7h.01'],
    pin:['path:M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z','circle:12,10,2.5'],
    calendar:['rect:3,5,18,16,2','path:M16 3v4M8 3v4M3 10h18'],
    clock:['circle:12,12,9','path:M12 7v5l3 2'],
    weather:['path:M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z','path:M8 21l-1 1m6-1-1 1m6-1-1 1'],
    phone:['path:M6 3h3l2 5-2 2a15 15 0 0 0 5 5l2-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z'],
    business:['path:M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4'],
    tag:['path:M20 13 12 21 3 12V4h8l9 9Z','circle:7.5,8,1'],
    shop:['path:M4 8h16l-1 13H5L4 8Z','path:M8 9V6a4 4 0 0 1 8 0v3'],
    globe:['circle:12,12,9','path:M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18']
  };
  function svg(kind){
    const ns='http://www.w3.org/2000/svg',s=document.createElementNS(ns,'svg');
    s.setAttribute('viewBox','0 0 24 24');s.setAttribute('aria-hidden','true');s.setAttribute('focusable','false');
    iconParts[kind].forEach(part=>{
      if(part.startsWith('circle:')){
        const [cx,cy,r]=part.slice(7).split(','),e=document.createElementNS(ns,'circle');
        e.setAttribute('cx',cx);e.setAttribute('cy',cy);e.setAttribute('r',r);s.append(e);
      }else if(part.startsWith('rect:')){
        const [x,y,width,height,rx]=part.slice(5).split(','),e=document.createElementNS(ns,'rect');
        e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('width',width);e.setAttribute('height',height);e.setAttribute('rx',rx);s.append(e);
      }else{
        const e=document.createElementNS(ns,'path');e.setAttribute('d',part.slice(5));s.append(e);
      }
    });
    return s
  }
  function link(href,label,kind,cls='',external=false){
    const a=document.createElement('a');a.href=href;a.className='utility-item '+cls;
    if(external)a.rel='noopener';
    a.append(svg(kind));const text=document.createElement('span');text.textContent=label;if(kind==='weather')text.id='ketchikan-weather';a.append(text);return a
  }
  function value(id,label,kind){
    const node=document.createElement('span');node.className='utility-item';node.append(svg(kind));
    const text=document.createElement('span');text.id=id;text.textContent=label;node.append(text);return node
  }
  function updateClock(){
    const now=new Date(),zone='America/Juneau';
    const d=document.getElementById('ketchikan-date'),t=document.getElementById('ketchikan-time');
    if(d)d.textContent=new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'short',day:'numeric'}).format(now);
    if(t)t.textContent=new Intl.DateTimeFormat('en-US',{timeZone:zone,hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(now)
  }
  const weatherText={0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Cloudy',45:'Fog',48:'Freezing fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Rain showers',81:'Showers',82:'Heavy showers',95:'Thunderstorm'};
  async function updateWeather(){
    const node=document.getElementById('ketchikan-weather');if(!node)return;
    try{
      const url='https://api.open-meteo.com/v1/forecast?latitude=55.3422&longitude=-131.6461&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FAnchorage';
      const response=await fetch(url,{cache:'no-store'});if(!response.ok)throw new Error('weather');
      const data=await response.json(),temp=Math.round(data.current.temperature_2m),description=weatherText[data.current.weather_code]||'Current conditions';
      node.textContent=`${temp}°F · ${description}`;node.parentElement.setAttribute('aria-label',`Ketchikan current weather: ${temp} degrees Fahrenheit, ${description}`);
    }catch(error){node.textContent='Weather unavailable';node.parentElement.setAttribute('aria-label','Ketchikan current weather unavailable')}
  }
  function utilityBar(){
    const wrap=document.querySelector('.utility .wrap');if(!wrap)return;
    const map='https://maps.google.com/?q=708+North+Point+Higgins+Road,+Ketchikan,+AK+99901';
    const meta=document.createElement('div');meta.className='meta utility-items';meta.style.cssText='width:auto;max-width:100%;min-width:0;display:flex;flex:1 1 auto;flex-wrap:wrap;justify-content:flex-start;align-items:center;gap:7px 12px;box-sizing:border-box;white-space:normal';wrap.style.cssText='width:100%;max-width:none;min-height:0;display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;padding:8px clamp(14px,2vw,32px);gap:5px 12px;box-sizing:border-box';
    meta.append(
      link('https://www.svensonsportfishing.com/','About Svenson','info'),
      link(map,'Ketchikan, AK','pin','',true),
      value('ketchikan-date','Ketchikan date','calendar'),
      value('ketchikan-time','Ketchikan local time','clock'),
      link('https://forecast.weather.gov/MapClick.php?lat=55.3422&lon=-131.6461','Loading Ketchikan weather…','weather','',true),
      link('tel:+19076177465','(907) 617-7465','phone'),
      link(map,'708 N Point Higgins Rd','pin','utility-address',true),
      link(base+'/directory/submit-a-business/index.html','List Your Business','business'),
      link(base+'/deals/index.html','Deals / Offers','tag','utility-deals'),
      link(base+'/shop/index.html','Shop','shop')
    );
    const language=document.createElement('details');language.className='utility-item utility-language';
    const trigger=document.createElement('summary');trigger.className='language-trigger';trigger.setAttribute('aria-label','Choose language');
    const flagSvg=(code)=>({
      us:'<svg viewBox="0 0 24 24" aria-hidden="true"><defs><clipPath id="flag-us"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#flag-us)"><path fill="#fff" d="M0 0h24v24H0z"/><path fill="#b22234" d="M0 2h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z"/><path fill="#3c3b6e" d="M0 0h11v12H0z"/><path fill="#fff" d="m2 2 .4 1.1L3.5 3H2.4l-.4 1-.4-1H.5l.9-.7L1 2zm4 0 .4 1.1L7.5 3H6.4L6 4l-.4-1H4.5l.9-.7L5 2zm4 0 .4 1.1L11.5 3h-1.1L10 4l-.4-1H8.5l.9-.7L9 2zM4 5l.4 1.1L5.5 6H4.4L4 7l-.4-1H2.5l.9-.7L3 5zm4 0 .4 1.1L9.5 6H8.4L8 7l-.4-1H6.5l.9-.7L7 5z"/></g><circle cx="12" cy="12" r="10" fill="none" stroke="#dbe3e2" stroke-width="1.5"/></svg>',
      es:'<svg viewBox="0 0 24 24"><defs><clipPath id="flag-es"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#flag-es)"><path fill="#aa151b" d="M0 0h24v24H0z"/><path fill="#f1bf00" d="M0 6h24v12H0z"/></g><circle cx="12" cy="12" r="10" fill="none" stroke="#dbe3e2" stroke-width="1.5"/></svg>',
      fr:'<svg viewBox="0 0 24 24"><defs><clipPath id="flag-fr"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#flag-fr)"><path fill="#fff" d="M0 0h24v24H0z"/><path fill="#002395" d="M0 0h8v24H0z"/><path fill="#ed2939" d="M16 0h8v24h-8z"/></g><circle cx="12" cy="12" r="10" fill="none" stroke="#dbe3e2" stroke-width="1.5"/></svg>',
      de:'<svg viewBox="0 0 24 24"><defs><clipPath id="flag-de"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#flag-de)"><path fill="#000" d="M0 0h24v8H0z"/><path fill="#dd0000" d="M0 8h24v8H0z"/><path fill="#ffce00" d="M0 16h24v8H0z"/></g><circle cx="12" cy="12" r="10" fill="none" stroke="#dbe3e2" stroke-width="1.5"/></svg>',
      ja:'<svg viewBox="0 0 24 24"><defs><clipPath id="flag-ja"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#flag-ja)"><path fill="#fff" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="5.5" fill="#bc002d"/></g><circle cx="12" cy="12" r="10" fill="none" stroke="#dbe3e2" stroke-width="1.5"/></svg>'
    })[code];
    const flag=document.createElement('span');flag.className='language-flag';flag.setAttribute('aria-hidden','true');flag.innerHTML=flagSvg('us');trigger.append(flag);language.append(trigger);
    const menu=document.createElement('div');menu.className='language-menu';menu.setAttribute('aria-label','Language options');
    const title=document.createElement('strong');title.textContent='Choose a language';menu.append(title);
    [['us','English','Current language',true],['es','Español','Coming soon',false],['fr','Français','Coming soon',false],['de','Deutsch','Coming soon',false],['ja','日本語','Coming soon',false]].forEach(([code,name,status,current])=>{const row=document.createElement('div');row.className='language-choice'+(current?' current':'');const mark=document.createElement('span');mark.className='language-choice-flag';mark.innerHTML=flagSvg(code);const label=document.createElement('span');label.className='language-choice-name';label.textContent=name;const state=document.createElement('span');state.className='language-choice-state';state.textContent=status;row.append(mark,label,state);menu.append(row)});
    language.append(menu);meta.append(language);
    wrap.replaceChildren(meta);updateClock();setInterval(updateClock,60000);updateWeather();setInterval(updateWeather,600000)
  }
  const brandLogo=document.querySelector('header .brand');if(brandLogo){brandLogo.querySelector('span')?.remove();const mark=brandLogo.querySelector('img');if(mark){mark.src=base+'/assets/svenson-logo-v2.png';mark.alt='Svenson Sportfishing'}}
  const navwrap=document.querySelector('header .nav'),oldnav=navwrap?.querySelector('nav.navlinks:not(.navlinks-left):not(.navlinks-right)'),brand=navwrap?.querySelector('.brand');
  if(navwrap&&oldnav&&brand){const items=[...oldnav.children],left=document.createElement('nav'),right=document.createElement('nav'),book=navwrap.querySelector(':scope > .button');left.className='navlinks navlinks-left';right.className='navlinks navlinks-right';left.append(...items.slice(0,2));right.append(...items.slice(2));if(book)right.append(book);brand.before(left);brand.after(right);oldnav.remove()}
  utilityBar();
  document.querySelectorAll('a[href^="'+base+'"]').forEach(a=>{const u=new URL(a.href);if(u.pathname.endsWith('/')){u.pathname+='index.html';a.href=u.toString()}});
  const mobile=document.querySelector('.mobile-menu'),links=[...document.querySelectorAll('.navlinks')];
  if(mobile&&links.length)mobile.addEventListener('click',()=>{const open=links.some(x=>x.classList.contains('mobile-open'));links.forEach(x=>x.classList.toggle('mobile-open',!open));mobile.setAttribute('aria-expanded',String(!open))});
  document.querySelectorAll('.nav-dropdown').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.nav-dropdown').forEach(x=>{if(x!==d)x.open=false})}));
  function buildTopicHero(){
    if(document.querySelector('.hero .carousel'))return;
    const pagehead=document.querySelector('.pagehead'),pageTitle=pagehead&&pagehead.querySelector('h1');
    const cards=[...document.querySelectorAll('main article.card,main .listing-card')].filter(card=>card.querySelector('img')&&card.querySelector('h3,h2'));
    if(!pagehead||!pageTitle||cards.length<2)return;
    const hero=document.createElement('section');hero.className='hero topic-hero';
    const video=document.createElement('video');video.autoplay=true;video.muted=true;video.loop=true;video.playsInline=true;video.setAttribute('aria-hidden','true');video.poster=base+'/assets/hero-poster.webp';
    const source=document.createElement('source');source.src=base+'/assets/svenson-hero-background.mp4';source.type='video/mp4';video.appendChild(source);hero.appendChild(video);
    const wrap=document.createElement('div');wrap.className='wrap';const carousel=document.createElement('div');carousel.className='carousel';
    const media=document.createElement('div');media.className='slide-media';
    const copyFirst=()=>{
      const c=document.createElement('div');c.className='slide-copy';c.setAttribute('data-slide-copy','');
      const label=pagehead.querySelector('.eyebrow');if(label){const e=document.createElement('div');e.className='eyebrow';e.textContent=label.textContent.trim();c.appendChild(e)}
      c.appendChild(pageTitle);
      const answer=pagehead.querySelector('.answer'),candidateSub=pagehead.querySelector('p:not(.trust)');
      let subText=(candidateSub?.textContent.trim()||'').replace(/^Quick answer:\s*/i,'').trim();
      if(!subText||subText.toLowerCase()===pageTitle.textContent.trim().toLowerCase())subText=answer?.textContent.replace(/^Quick answer:\s*/i,'').trim()||'Explore this topic using the local details below.';
      subText=subText.split(/[.;]\s+/)[0].trim();
      if(subText.length>92)subText=subText.slice(0,89).replace(/\s+\S*$/,'')+'…';
      const sub=document.createElement('h2');sub.className='slide-subtitle';sub.textContent=subText;c.appendChild(sub);
      const firstDesc=cards[0].querySelector('.cardcopy p,.listing-copy p,p');
      const desc=document.createElement('p');desc.textContent=firstDesc?.textContent.trim()||'Browse this guide and confirm current details with the listed business or official source.';c.appendChild(desc);
      const sourceLink=cards[0].querySelector('a.button,a[href]'),actions=document.createElement('div');actions.className='actions';const button=document.createElement('a');button.className='button';button.href=sourceLink?.href||base+'/site-map/index.html';button.textContent=sourceLink?.textContent.trim()||'Explore this guide';actions.appendChild(button);c.appendChild(actions);return c
    };
    const copyCard=(card)=>{
      const c=document.createElement('div');c.className='slide-copy';c.setAttribute('data-slide-copy','');
      const label=card.querySelector('.eyebrow');if(label){const e=document.createElement('div');e.className='eyebrow';e.textContent=label.textContent.trim();c.appendChild(e)}
      const title=card.querySelector('h3,h2'),h=document.createElement('h2');h.textContent=title?.textContent.trim()||'Explore this guide';c.appendChild(h);
      const subtitle=card.querySelector('.sub'),sub=document.createElement('p');sub.className='slide-subtitle';sub.textContent=subtitle?.textContent.trim()||'Local details and planning information';c.appendChild(sub);
      const para=card.querySelector('.cardcopy p:not(.sub),.listing-copy p:not(.sub),p:not(.sub)'),desc=document.createElement('p');desc.textContent=para?.textContent.trim()||'Review the details and confirm current information directly with the provider.';c.appendChild(desc);
      const sourceLink=card.querySelector('a.button,a[href]'),actions=document.createElement('div');actions.className='actions';const button=document.createElement('a');button.className='button';button.href=sourceLink?.href||base+'/site-map/index.html';button.textContent=sourceLink?.textContent.trim()||'Explore details';actions.appendChild(button);c.appendChild(actions);return c
    };
    const picks=cards.slice(0,3);
    picks.forEach((card,i)=>{
      const sourceImage=card.querySelector('img'),frame=document.createElement('div');frame.setAttribute('data-slide','');if(i)frame.hidden=true;
      const img=document.createElement('img');img.src=sourceImage.currentSrc||sourceImage.src;img.alt=sourceImage.alt||pageTitle.textContent.trim();img.loading=i?'lazy':'eager';frame.appendChild(img);media.appendChild(frame);
      carousel.appendChild(i?copyCard(cards[i-1]):copyFirst());
    });
    carousel.insertBefore(media,carousel.firstChild);wrap.appendChild(carousel);hero.appendChild(wrap);
    const controls=document.createElement('div');controls.className='carousel-ctrl';
    const prev=document.createElement('button');prev.type='button';prev.setAttribute('data-prev','');prev.setAttribute('aria-label','Previous slide');prev.textContent='‹';controls.appendChild(prev);
    const dots=document.createElement('span');dots.className='dots';
    picks.forEach((_,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Slide '+(i+1));if(!i){dot.className='active';dot.setAttribute('aria-current','true')}dots.appendChild(dot)});
    controls.appendChild(dots);const next=document.createElement('button');next.type='button';next.setAttribute('data-next','');next.setAttribute('aria-label','Next slide');next.textContent='›';controls.appendChild(next);hero.appendChild(controls);
    pagehead.parentNode.insertBefore(hero,pagehead);
    const breadcrumb=pagehead.querySelector('.breadcrumb');
    if(breadcrumb){breadcrumb.classList.add('wrap','topic-breadcrumb');hero.after(breadcrumb)}
    pagehead.remove();
  }
  buildTopicHero();
  document.querySelectorAll('.carousel').forEach(carousel=>{const slides=carousel.querySelectorAll('.slide-media [data-slide]'),dots=carousel.closest('.hero')?.querySelector('.carousel-ctrl .dots');if(!dots)return;while(dots.children.length>slides.length)dots.lastElementChild.remove();while(dots.children.length<slides.length){const dot=document.createElement('button');dot.type='button';dots.appendChild(dot)}[...dots.children].forEach((dot,i)=>{dot.setAttribute('aria-label','Slide '+(i+1));dot.type='button'})});
  const slides=[...document.querySelectorAll('.carousel [data-slide]')],copySlides=[...document.querySelectorAll('.carousel [data-slide-copy]')],dots=[...document.querySelectorAll('.carousel-ctrl .dots button')];let cur=0;
  function show(i){if(!slides.length)return;cur=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.hidden=n!==cur);copySlides.forEach((s,n)=>s.hidden=n!==cur);dots.forEach((b,n)=>{b.classList.toggle('active',n===cur);if(n===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')})}
  document.querySelectorAll('[data-prev]').forEach(b=>b.onclick=()=>show(cur-1));document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>show(cur+1));dots.forEach((b,n)=>b.onclick=()=>show(n));
  const q=document.getElementById('directory-search'),cat=document.getElementById('directory-category'),cards=[...document.querySelectorAll('.listing-card')],empty=document.getElementById('directory-empty');
  function filter(){let shown=0;cards.forEach(c=>{const matchText=!q||c.dataset.search.toLowerCase().includes(q.value.toLowerCase()),matchCat=!cat||!cat.value||c.dataset.category.split(' / ')[0]===cat.value;c.hidden=!(matchText&&matchCat);if(!c.hidden)shown++});if(empty)empty.hidden=shown>0}
  if(q)q.addEventListener('input',filter);if(cat)cat.addEventListener('change',filter)
})();