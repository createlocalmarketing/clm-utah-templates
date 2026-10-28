(()=> {
  const base=location.origin+'/clm-utah-templates/svenson-preview';
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
    a.append(svg(kind));const text=document.createElement('span');text.textContent=label;a.append(text);return a
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
  function utilityBar(){
    const wrap=document.querySelector('.utility .wrap');if(!wrap)return;
    const map='https://maps.google.com/?q=708+North+Point+Higgins+Road,+Ketchikan,+AK+99901';
    const meta=document.createElement('div');meta.className='meta utility-items';
    meta.append(
      link('https://www.svensonsportfishing.com/','About Svenson','info'),
      link(map,'Ketchikan, AK','pin','',true),
      value('ketchikan-date','Ketchikan date','calendar'),
      value('ketchikan-time','Ketchikan local time','clock'),
      link('https://forecast.weather.gov/MapClick.php?lat=55.3422&lon=-131.6461','Ketchikan Weather / NWS','weather','',true),
      link('tel:+19076177465','(907) 617-7465','phone'),
      link(map,'708 N Point Higgins Rd','pin','utility-address',true),
      link(base+'/directory/submit-a-business/index.html','List Your Business','business'),
      link(base+'/deals/index.html','Deals / Offers','tag','utility-deals'),
      link(base+'/shop/index.html','Shop','shop')
    );
    const language=document.createElement('label');language.className='utility-item utility-language';language.append(svg('globe'));
    const lang=document.createElement('span');lang.textContent='Language';language.append(lang);
    const select=document.createElement('select');select.setAttribute('aria-label','Language selector');const en=document.createElement('option');en.value='en';en.textContent='English';select.append(en);language.append(select);meta.append(language);
    wrap.replaceChildren(meta);updateClock();setInterval(updateClock,60000)
  }
  const navwrap=document.querySelector('header .nav'),oldnav=navwrap?.querySelector('nav.navlinks:not(.navlinks-left):not(.navlinks-right)'),brand=navwrap?.querySelector('.brand');
  if(navwrap&&oldnav&&brand){const items=[...oldnav.children],left=document.createElement('nav'),right=document.createElement('nav'),book=navwrap.querySelector(':scope > .button');left.className='navlinks navlinks-left';right.className='navlinks navlinks-right';left.append(...items.slice(0,2));right.append(...items.slice(2));if(book)right.append(book);brand.before(left);brand.after(right);oldnav.remove()}
  utilityBar();
  document.querySelectorAll('a[href^="'+base+'"]').forEach(a=>{const u=new URL(a.href);if(u.pathname.endsWith('/')){u.pathname+='index.html';a.href=u.toString()}});
  const mobile=document.querySelector('.mobile-menu'),links=[...document.querySelectorAll('.navlinks')];
  if(mobile&&links.length)mobile.addEventListener('click',()=>{const open=links.some(x=>x.classList.contains('mobile-open'));links.forEach(x=>x.classList.toggle('mobile-open',!open));mobile.setAttribute('aria-expanded',String(!open))});
  document.querySelectorAll('.nav-dropdown').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.nav-dropdown').forEach(x=>{if(x!==d)x.open=false})}));
  const slides=[...document.querySelectorAll('.carousel [data-slide]')],copySlides=[...document.querySelectorAll('.carousel [data-slide-copy]')],dots=[...document.querySelectorAll('.carousel-ctrl .dots button')];let cur=0;
  function show(i){if(!slides.length)return;cur=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.hidden=n!==cur);copySlides.forEach((s,n)=>s.hidden=n!==cur);dots.forEach((b,n)=>{b.classList.toggle('active',n===cur);if(n===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')})}
  document.querySelectorAll('[data-prev]').forEach(b=>b.onclick=()=>show(cur-1));document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>show(cur+1));dots.forEach((b,n)=>b.onclick=()=>show(n));
  const q=document.getElementById('directory-search'),cat=document.getElementById('directory-category'),cards=[...document.querySelectorAll('.listing-card')],empty=document.getElementById('directory-empty');
  function filter(){let shown=0;cards.forEach(c=>{const matchText=!q||c.dataset.search.toLowerCase().includes(q.value.toLowerCase()),matchCat=!cat||!cat.value||c.dataset.category.split(' / ')[0]===cat.value;c.hidden=!(matchText&&matchCat);if(!c.hidden)shown++});if(empty)empty.hidden=shown>0}
  if(q)q.addEventListener('input',filter);if(cat)cat.addEventListener('change',filter)
})();