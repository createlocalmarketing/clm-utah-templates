/* CLM template engine — core: data, geo resolver, area-of-influence pulls, layout, router */
(function () {
  const B = window.CLM_BRANDS[window.CLM_BRAND];
  const R = window.CLM_RADIUS;
  const E = (window.CLM = { V: '6', B, R, D: null, G: null, idx: {}, pages: {}, ui: {} });
  document.body.classList.add(B.bodyClass);

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => (n >= 1e6 ? '$' + (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M' : n >= 1e3 ? '$' + Math.round(n / 1e3) + 'K' : '$' + Math.round(n));
  const money0 = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const int = (n) => Math.round(n).toLocaleString('en-US');
  const img = (n) => '../img/' + String(n || 'tile_cities').replace(/\.(png|jpe?g|webp)$/i, '') + '.webp';
  const bg = (n) => `style="background-image:url('${img(n)}')"`;
  const miles = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin(((c - a) * r) / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2; return 7917.6 * Math.asin(Math.sqrt(x)); };
  const fmtDate = (s, o = { month: 'short', day: 'numeric' }) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', o);
  const ago = (s) => { const d = Math.round((new Date('2026-10-04T12:00:00') - new Date(s + 'T12:00:00')) / 864e5); return d <= 0 ? 'Today' : d === 1 ? 'Yesterday' : d + 'd ago'; };
  const initials = (n) => n.split(' ').map((x) => x[0]).join('').slice(0, 2);
  const slugTitle = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  Object.assign(E, { esc, money, money0, int, img, bg, miles, fmtDate, ago, initials, slugTitle });

  const inScope = (county) => !B.scope || county == null || B.scope.includes(county);
  E.inScope = inScope;
  E.dirOf = (k) => window.CLM_FULL ? CLM_BRANDS[k].domain : k;

  /* ---------- data load + indexes ---------- */
  E.load = async () => {
    const [g, d] = await Promise.all([fetch('../data/geo.json?v=' + E.V).then((r) => r.json()), fetch('../data/content.json?v=' + E.V).then((r) => r.json())]);
    E.G = g; E.D = d;
    const ix = E.idx;
    ix.county = Object.fromEntries(g.counties.map((c) => [c.slug, c]));
    ix.city = Object.fromEntries(g.cities.map((c) => [c.slug, c]));
    ix.hood = Object.fromEntries(g.hoods.map((h) => [h.slug, h]));
    ix.region = Object.fromEntries(g.regions.map((r) => [r.slug, r]));
    ix.cat = Object.fromEntries(g.categories.map((c) => [c.slug, c]));
    ix.vert = Object.fromEntries(g.verticals.map((v) => [v.slug, v]));
    for (const k of ['listings', 'businesses', 'providers', 'schools', 'news', 'events', 'deals', 'jobs', 'classifieds', 'market', 'activities'])
      ix[k] = Object.fromEntries(d[k].map((x) => [x.id, x]));
    ix.hoodsByCity = {}; g.hoods.forEach((h) => (ix.hoodsByCity[h.city] ||= []).push(h));
    ix.citiesByCounty = {}; g.cities.forEach((c) => (ix.citiesByCounty[c.county] ||= []).push(c));
    Object.values(ix.citiesByCounty).forEach((a) => a.sort((x, y) => y.pop - x.pop));
    ix.regionOf = {}; g.regions.forEach((r) => r.counties.forEach((c) => (ix.regionOf[c] = r.slug)));
    // brand-scoped lists
    E.counties = g.counties.filter((c) => inScope(c.slug)).sort((a, b) => b.pop - a.pop);
    E.cities = g.cities.filter((c) => inScope(c.county)).sort((a, b) => b.pop - a.pop);
    E.regions = g.regions.map((r) => ({ ...r, counties: r.counties.filter(inScope) })).filter((r) => r.counties.length);
  };

  /* ---------- geo context ---------- */
  // Every page resolves to a geo context. Templates never hardcode places — they ask ctx for content.
  E.ctx = (level, slug) => {
    const ix = E.idx;
    if (level === 'region' && ix.region[slug]) {
      const r = ix.region[slug]; const cs = r.counties.filter(inScope).map((c) => ix.county[c]);
      return { level, slug, name: r.name, node: r, counties: cs.map((c) => c.slug), lat: avg(cs, 'lat'), lon: avg(cs, 'lon') };
    }
    if (level === 'county' && ix.county[slug] && inScope(slug)) {
      const c = ix.county[slug]; return { level, slug, name: c.name, node: c, counties: [slug], lat: c.lat, lon: c.lon };
    }
    if (level === 'city' && ix.city[slug] && inScope(ix.city[slug].county)) {
      const c = ix.city[slug]; return { level, slug, name: c.name, node: c, city: slug, county: c.county, counties: [c.county], lat: c.lat, lon: c.lon };
    }
    if (level === 'hood' && ix.hood[slug]) {
      const h = ix.hood[slug], c = ix.city[h.city]; if (!inScope(c.county)) return E.ctx('state');
      return { level, slug, name: h.name, node: h, hood: slug, city: c.slug, county: c.county, counties: [c.county], lat: h.lat || c.lat, lon: h.lon || c.lon };
    }
    const cs = E.counties;
    const p = B.primaryCity && ix.city[B.primaryCity];
    return { level: 'state', slug: null, name: B.areaName, counties: cs.map((c) => c.slug), lat: p ? p.lat : 39.32, lon: p ? p.lon : -111.09 };
  };
  const avg = (a, k) => a.reduce((s, x) => s + x[k], 0) / (a.length || 1);
  E.parseG = (g) => { if (!g) return E.ctx('state'); const [l, s] = g.split(':'); return E.ctx(l, s); };
  E.gKey = (ctx) => (ctx.level === 'state' ? '' : ctx.level + ':' + ctx.slug);

  /* ---------- area-of-influence pull ---------- */
  // type: listings|businesses|providers|schools|news|events|deals|jobs|classifieds|market|activities
  E.pull = (type, ctx, o = {}) => {
    let a = E.D[type].filter((x) => inScope(x.county) && (!o.where || o.where(x)));
    const local = ctx.level === 'city' || ctx.level === 'hood';
    const rad = o.radius ?? R[type] ?? 25;
    if (!local) {
      a = a.filter((x) => x.county == null ? (type === 'news' && ctx.level === 'state') : ctx.counties.includes(x.county) || (x.serves && x.serves.some((s) => ctx.counties.includes(s))));
      a.forEach((x) => { x._d = null; x._near = false; x._lbl = x.city ? E.idx.city[x.city]?.name : x.county ? E.idx.county[x.county]?.name : 'Statewide'; });
    } else {
      a = a.filter((x) => {
        const same = ctx.hood ? x.hood === ctx.hood || (!o.strictHood && x.city === ctx.city) : x.city === ctx.city;
        const d = x.lat ? miles(ctx.lat, ctx.lon, x.lat, x.lon) : 999;
        x._d = same ? 0 : d; x._near = !same;
        if (same) { x._lbl = 'In ' + (ctx.hood && x.hood === ctx.hood ? ctx.name : E.idx.city[ctx.city].name); return true; }
        if (o.exact) return false;
        if (x.serves && x.serves.includes(ctx.county)) { x._lbl = 'Serves ' + E.idx.city[ctx.city].name; x._d = Math.min(d, 40); x._serves = true; return true; }
        if (d <= rad) { x._lbl = x.city ? E.idx.city[x.city].name + ' · ' + Math.round(d) + ' mi' : Math.round(d) + ' mi from ' + E.idx.city[ctx.city].name; return true; }
        return false;
      });
    }
    const key = o.sort || ({ news: 'date', events: 'soon', jobs: 'posted', classifieds: 'posted', listings: 'smartbuy', businesses: 'rating', providers: 'rating', deals: 'sold', schools: 'rating', market: 'none', activities: 'none' }[type]);
    const primary = B.primaryCity;
    a.sort((x, y) => {
      if (local && (x._d ?? 0) !== (y._d ?? 0) && !o.ignoreDist) {
        const bx = Math.floor((x._d ?? 0) / 5), by = Math.floor((y._d ?? 0) / 5); // distance bands of 5 mi
        if (bx !== by) return bx - by;
      }
      // brand emphasis: on broad pages the primary city's news/events lead (e.g. Park City on PCH)
      if (!local && primary && (type === 'news' || type === 'events')) { const px = x.city === primary, py = y.city === primary; if (px !== py) return px ? -1 : 1; }
      if (key === 'date') return y.date.localeCompare(x.date);
      if (key === 'soon') return x.date.localeCompare(y.date);
      if (key === 'posted') return y.posted.localeCompare(x.posted);
      if (key === 'none') return (x._d ?? 0) - (y._d ?? 0);
      if (key === 'price') return x.price - y.price;
      if (key === 'price-desc') return y.price - x.price;
      return (y[key] ?? 0) - (x[key] ?? 0) || (y.reviews ?? 0) - (x.reviews ?? 0);
    });
    if (type === 'businesses' || type === 'providers') {
      // featured/verified float within band — but never above closer results
      a.sort((x, y) => (local ? Math.floor((x._d ?? 0) / 5) - Math.floor((y._d ?? 0) / 5) : 0) || (y.featured ? 1 : 0) - (x.featured ? 1 : 0));
    }
    return o.limit ? a.slice(0, o.limit) : a;
  };

  /* ---------- link + URL helpers ---------- */
  const L = (E.L = {
    geo: (ctx) => ctx.level === 'state' ? '#/' + (B.scope ? '' : 'state') : '#/' + ctx.level + '/' + ctx.slug,
    county: (s) => '#/county/' + s, city: (s) => '#/city/' + s, hood: (s) => '#/hood/' + s, region: (s) => '#/region/' + s,
    list: (t, ctx, q = {}) => { const p = new URLSearchParams(q); const g = ctx ? E.gKey(ctx) : ''; if (g) p.set('g', g); const s = p.toString(); return '#/' + t + (s ? '?' + s : ''); },
  });
  E.cityName = (s) => E.idx.city[s]?.name || '';
  E.countyName = (s) => E.idx.county[s]?.name || '';
  // production subdirectory URL per brand (no subdomains)
  E.prodUrl = (ctx, tail = '') => {
    const cs = ctx.county || (ctx.level === 'county' ? ctx.slug : null);
    let p = B.urlBase;
    if (!B.scope && ctx.level !== 'state') p += '/' + (E.idx.regionOf[cs] || ctx.slug);
    if (ctx.level === 'region' && B.scope) p += '/' + ctx.slug;
    if (cs) p += '/' + cs + '-county';
    if (ctx.city) p += '/' + ctx.city;
    if (ctx.hood) p += '/' + ctx.hood;
    return 'https://' + B.domain + (p || '') + '/' + (tail ? tail + '/' : '');
  };
  E.chain = (ctx) => {
    const out = [[B.areaShort === 'Utah' ? 'Utah' : B.areaShort, '#/']];
    const cs = ctx.county || (ctx.level === 'county' ? ctx.slug : null);
    if (!B.scope && (cs || ctx.level === 'region')) { const r = ctx.level === 'region' ? ctx.node : E.idx.region[E.idx.regionOf[cs]]; out.push([r.name, L.region(r.slug)]); }
    if (cs) out.push([E.countyName(cs), L.county(cs)]);
    if (ctx.city) out.push([E.cityName(ctx.city), L.city(ctx.city)]);
    if (ctx.hood) out.push([ctx.name, L.hood(ctx.hood)]);
    return out;
  };
  // pass-through: same page on the sister brand (only if the geo is in that brand's scope)
  E.passThrough = (hash) => {
    const m = hash.match(/(county|city|hood)[:/]([a-z0-9-]+)/);
    const cs = !m ? null : m[1] === 'county' ? m[2] : m[1] === 'city' ? E.idx.city[m[2]]?.county : E.idx.city[E.idx.hood[m[2]]?.city]?.county;
    const others = Object.values(window.CLM_BRANDS).filter((OB) => OB.key !== B.key && (!OB.scope || !cs || OB.scope.includes(cs)));
    if (!others.length) return '';
    return `<span class="passthru">Same template on ${others.map((OB) => `<a href="../${window.CLM_FULL ? OB.domain : OB.key}/index.html${hash || '#/'}">${OB.short}</a>`).join(' · ')}</span>`;
  };


  E.heroFor = (ctx) => {
    const c = ctx.city, k = ctx.county || (ctx.level === 'county' ? ctx.slug : null);
    const byCity = { 'park-city': 'hero_park_city', 'heber-city': 'hero_heber_city', midway: 'hero_wasatch_county', 'st-george': 'st-george-redrock', ivins: 'sg-ivins-hero', springdale: 'iur-zion-canyon', 'salt-lake-city': 'iur-saltlake-wasatch', 'cottonwood-heights': 'iur-cottonwood-heights-hero', 'garden-city': 'iur-listing-bearlake' };
    const byCounty = { summit: 'park-city-main-street', wasatch: 'hero_wasatch_county', washington: 'st-george-redrock', 'salt-lake': 'iur-saltlake-wasatch', morgan: 'hero_morgan_county', rich: 'hero_rich_county', duchesne: 'hero_duchesne_county', utah: 'iur-hero-editorial', davis: 'iur-saltlake-wasatch', kane: 'iur-zion-canyon', iron: 'iur-zion-canyon' };
    if (ctx.level === 'hood') return byCity[c] === 'hero_park_city' ? 'deer-valley-twilight' : byCity[c] || byCounty[k] || 'tile_neighborhoods';
    return byCity[c] || byCounty[k] || (ctx.level === 'state' ? B.heroImg : ctx.level === 'region' ? 'tile_counties' : 'tile_cities');
  };
  E.bizImg = (b) => ({ 'real-estate-financial': 'tile_agents', 'construction-home-services': 'gen-contractors', 'lodging-property-management': 'tile_nightly_rentals', 'food-beverage': ['iur-rest-allonda', 'iur-rest-bandits', 'iur-rest-handle', 'iur-rest-urbanhill'][parseInt(b.id.slice(1)) % 4], 'retail-rentals': 'gen-marketplace', 'medical-wellness': 'tile_businesses', 'schools-education': 'tile_schools', 'attractions-tours-activities': 'gen-events' }[b.vertical] || 'tile_businesses');
  E.bizImg2 = (b) => ['mortgage-lender', 'mortgage-broker', 'credit-union', 'title-company'].includes(b.cat) ? 'gen-lenders' : ['home-builder', 'custom-home-builder'].includes(b.cat) ? 'gen-new_construction' : E.bizImg(b);

  /* ---------- layout ---------- */
  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16l-1 12H5zM8 8a4 4 0 018 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  };
  E.ICON = ICON;
  const logo = () => `<a class="logo" href="#/" aria-label="${esc(B.name)} home"><span class="logo-mark">${B.mark}</span><span class="logo-word">${esc(B.word[0])} <em>${esc(B.word[1])}</em></span></a>`;
  const drawer = () => {
    const top = B.scope ? E.cities.slice(0, 10) : E.cities.slice(0, 8);
    return `<div class="drawer" id="drawer"><div class="drawer-bg" data-close></div><nav class="drawer-panel" aria-label="All sections">
      <div class="row between">${logo()}<button class="btn btn-ghost btn-sm" data-close>Close</button></div>
      <h4>Buy &amp; sell</h4><a href="#/homes">Search MLS homes</a><a href="#/new-construction">New construction</a><a href="#/land">Land for sale</a><a href="#/fsbo">For sale by owner</a><a href="#/sell">List my home (FSBO tiers)</a><a href="#/mortgage">Mortgage calculators</a><a href="#/compare">City vs city</a><a href="#/relocation">Relocation</a>
      <h4>Places</h4>${B.scope ? E.counties.map((c) => `<a href="${L.county(c.slug)}">${esc(c.name)}</a>`).join('') : `<a href="#/state">All 29 counties</a><a href="#/cities">All cities</a>`}${top.map((c) => `<a href="${L.city(c.slug)}">${esc(c.name)}</a>`).join('')}<a href="#/neighborhoods">All neighborhoods</a><a href="#/schools">Schools</a>
      <h4>Directory</h4><a href="#/directory">Business directory</a><a href="#/realtors">Realtor directory</a><a href="#/lenders">Lender directory</a><a href="#/contractors">Contractors &amp; quotes</a>
      <h4>Community</h4><a href="#/news">Real Estate News</a><a href="#/events">Events</a><a href="#/things-to-do">Things to do</a><a href="#/deals">Deals</a><a href="#/marketplace">Shop local marketplace</a><a href="#/classifieds">Classifieds</a><a href="#/jobs">Jobs</a>
      <h4>Review</h4><a href="#/templates">All page templates</a><a href="../index.html">Network launcher</a>
    </nav></div>`;
  };
  E.shell = (inner, o = {}) => {
    const h = location.hash || '#/';
    const crumbs = o.ctx ? E.chain(o.ctx) : [[B.areaShort, '#/']];
    if (o.crumb) crumbs.push([o.crumb, '']);
    return `<div class="ribbon"><b>Template preview.</b> Geography and county stats come from the CLM master database. Listings, businesses, people, news, events, deals and prices are labeled sample records.</div>
    <div class="util"><div class="wrap"><div class="util-live"><span class="dot"></span>Live MLS feed · ${esc(B.mls)} · Updated 4 minutes ago</div>
      <div class="util-links"><a href="#/saved">Save Search</a><a href="#/signin">Sign In</a><a class="hl" href="#/sell">List My Home</a></div></div></div>
    <header class="hdr"><div class="wrap">${logo()}
      <nav class="nav" aria-label="Primary">${B.nav.map(([u, t]) => `<a href="${u}" class="${h.startsWith(u) && u !== '#/' ? 'on' : ''}">${t}</a>`).join('')}</nav>
      <div class="hdr-cta"><a class="btn btn-ghost btn-sm" href="#/templates">Templates</a><a class="btn btn-dark btn-sm" href="#/contact">Talk to an agent</a><button class="menu-btn" data-open aria-label="Open menu">${ICON.menu}</button></div></div></header>
    <div class="crumbs"><div class="wrap"><ol>${crumbs.map(([t, u]) => `<li>${u ? `<a href="${u}">${esc(t)}</a>` : esc(t)}</li>`).join('')}</ol>
      <div class="row"><span class="prod-url" title="Production URL (subdirectory)">${esc(o.prod || (o.ctx ? E.prodUrl(o.ctx, o.tail) : 'https://' + B.domain + '/'))}</span>${E.passThrough(h)}</div></div></div>
    <main id="main">${inner}</main>
    ${E.footer()}
    <nav class="tabbar" aria-label="Quick">
      <a href="#/" class="${h === '#/' ? 'on' : ''}">${ICON.home}Home</a><a href="#/homes" class="${h.startsWith('#/homes') ? 'on' : ''}">${ICON.search}Homes</a>
      <a href="#/events" class="${h.startsWith('#/event') ? 'on' : ''}">${ICON.cal}Events</a><a href="#/marketplace" class="${h.startsWith('#/market') ? 'on' : ''}">${ICON.shop}Shop</a><a href="#" data-open>${ICON.menu}More</a></nav>
    ${drawer()}`;
  };
  E.footer = () => `<footer class="foot"><div class="wrap"><div class="foot-grid">
    <div>${logo().replace('class="logo"', 'class="logo" style="color:#fff"')}<p class="mt16" style="max-width:36ch">${esc(B.lede)}</p><p class="mt16 note">MLS data courtesy of ${esc(B.mls)}. Equal Housing Opportunity.</p></div>
    <div><h5>Buy</h5><a href="#/homes">Search MLS</a><a href="#/new-construction">New construction</a><a href="#/land">Land</a><a href="#/fsbo">FSBO homes</a><a href="#/mortgage">Mortgage calculators</a></div>
    <div><h5>Sell</h5><a href="#/sell">List my home</a><a href="#/realtors">Find a Realtor</a><a href="#/market-data">Market data</a><a href="#/contractors">Pre-sale contractors</a></div>
    <div><h5>Local</h5><a href="#/directory">Directory</a><a href="#/events">Events</a><a href="#/deals">Deals</a><a href="#/marketplace">Marketplace</a><a href="#/jobs">Jobs</a><a href="#/classifieds">Classifieds</a></div>
    <div><h5>Explore</h5><a href="#/news">Real Estate News</a><a href="#/schools">Schools</a><a href="#/compare">City vs city</a><a href="#/relocation">Relocation</a><a href="#/templates">Page templates</a></div></div>
    <div class="netbar"><span>CLM Utah network</span>${Object.values(window.CLM_BRANDS).map((OB) => `<a href="../${E.dirOf(OB.key)}/index.html#/">${OB.name}</a>`).join('')}</div></div></footer>`;

  /* ---------- shared UI pieces ---------- */
  const U = E.ui;
  U.sec = (o, body) => `<section class="sec ${o.tint ? 'tint' : ''} ${o.dark ? 'dark' : ''}" ${o.id ? `id="${o.id}"` : ''}><div class="wrap">
    ${o.title ? `<div class="sec-head"><div>${o.eyebrow ? `<p class="sec-eyebrow">${o.eyebrow}</p>` : ''}<h2 class="sec-title">${o.title}</h2>${o.sub ? `<p class="sec-sub">${o.sub}</p>` : ''}</div>${o.more ? `<a class="more" href="${o.more[0]}">${o.more[1]} →</a>` : ''}</div>` : ''}${body}</div></section>`;
  U.hero = (o) => `<section class="hero ${o.sm ? 'sm' : ''}"><div class="hero-bg" ${bg(o.img)}></div><div class="wrap hero-in">
    ${o.eyebrow ? `<p class="eyebrow">${o.eyebrow}</p>` : ''}<h1>${o.h1}${o.em ? `<em>${o.em}</em>` : ''}</h1>${o.lede ? `<p class="lede">${o.lede}</p>` : ''}
    ${o.stats ? `<div class="hero-stats">${o.stats.map(([b, t]) => `<span class="hstat"><b>${b}</b>${t}</span>`).join('')}</div>` : ''}${o.after || ''}</div></section>`;
  U.search = (ctx, ph) => `<form class="search" data-act="search" role="search"><label class="sr" for="q">Search</label><input id="q" name="q" placeholder="${esc(ph || 'City, neighborhood, address or MLS #')}" autocomplete="off">
    <select name="t" aria-label="Search type"><option value="homes">Homes</option><option value="directory">Businesses</option><option value="realtors">Realtors</option><option value="events">Events</option><option value="marketplace">Marketplace</option></select>
    <input type="hidden" name="g" value="${ctx ? E.gKey(ctx) : ''}"><button class="btn btn-accent">Search</button></form>`;
  U.near = (x) => (x._lbl ? `<span class="tag ${x._near ? 'dist' : 'acc'}">${esc(x._lbl)}</span>` : '');
  U.listing = (l) => `<a class="card" href="#/listing/${l.id}"><div class="card-img" ${bg(l.img)}><span class="badge ${l.smartbuy >= 85 ? 'sb' : ''}">${l.smartbuy >= 85 ? 'SmartBuy ' + l.smartbuy : esc(l.fsbo ? 'For sale by owner' : l.status)}</span><span class="badge r">${l.type === 'Land' ? 'Land' : l.type === 'New Construction' ? 'New build' : l.type}</span></div>
    <div class="card-b"><div class="price tnum">${money0(l.price)}</div><div class="card-m tnum">${l.type === 'Land' ? l.acres + ' acres' : `${l.beds} bd · ${l.baths} ba · ${int(l.sqft)} sqft`}</div>
    <div class="card-t">${esc(l.addr)}</div><div class="card-m">${esc(l.hood ? E.idx.hood[l.hood].name + ', ' : '')}${esc(E.cityName(l.city))}</div>
    <div class="card-f"><span>${l.fsbo ? 'Owner listing' : l.mls + ' #' + l.mlsno}</span>${U.near(l)}</div></div></a>`;
  U.biz = (b) => `<a class="card" href="#/business/${b.id}"><div class="card-img wide" ${bg(E.bizImg2(b))}>${b.featured ? '<span class="badge sb">Featured</span>' : ''}${b.verified ? '<span class="badge r">Verified</span>' : ''}</div>
    <div class="card-b"><div class="card-t">${esc(b.name)}</div><div class="card-m">${esc(E.idx.cat[b.cat].name)} · ${esc(E.cityName(b.city))}</div>
    <div class="card-f"><span class="stars">★ ${b.rating} <span class="muted">(${b.reviews})</span></span>${U.near(b)}</div></div></a>`;
  U.pro = (p) => `<a class="card hov" href="#/pro/${p.id}"><div class="card-b"><div class="row"><div class="av">${initials(p.name)}</div><div><div class="card-t">${esc(p.name)}</div><div class="card-m">${esc(p.role)} · ${esc(E.idx.businesses[p.biz].name)}</div></div></div>
    <div class="row mt8">${p.specialties.slice(0, 3).map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
    <div class="card-f"><span class="stars">★ ${p.rating} <span class="muted">(${p.reviews} portable reviews)</span></span>${U.near(p)}</div></div></a>`;
  U.news = (n, big) => `<a class="card" href="#/article/${n.id}"><div class="card-img ${big ? 'wide' : ''}" ${bg(newsImg(n))}><span class="badge">${esc(slugTitle(n.cat))}</span></div><div class="card-b"><p class="kicker">${esc(n.city ? E.cityName(n.city) : n.county ? E.countyName(n.county) : 'Statewide')} · ${ago(n.date)}</p><div class="card-t" ${big ? 'style="font-size:1.35rem"' : ''}>${esc(n.title)}</div>${big ? `<p class="card-m">${esc(n.dek)}</p>` : ''}<div class="card-f"><span>${n.read} min read</span>${U.near(n)}</div></div></a>`;
  U.newsRow = (n) => `<a class="news-row" href="#/article/${n.id}"><div class="mini-img" ${bg(newsImg(n))}></div><div><p class="kicker">${esc(slugTitle(n.cat))} · ${ago(n.date)}</p><div class="card-t">${esc(n.title)}</div><div class="mt8">${U.near(n)}</div></div></a>`;
  const newsImg = (n) => ({ market: 'tile_market_data', development: 'gen-new_construction', schools: 'tile_schools', lifestyle: 'tile_events', business: 'tile_businesses', local: 'tile_real_estate_news', relocation: 'tile_relocation' }[n.cat] || 'tile_real_estate_news');
  E.newsImg = newsImg;
  U.event = (e) => { const d = new Date(e.date + 'T12:00:00'); return `<a class="card" href="#/event/${e.id}"><div class="card-img wide" ${bg(evImg(e))}><span class="badge" style="text-align:center;line-height:1.1"><b style="font-size:15px;display:block">${d.getDate()}</b>${d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span><span class="badge r">${esc(e.price)}</span></div>
    <div class="card-b"><p class="kicker">${d.toLocaleDateString('en-US', { weekday: 'short' })} · ${esc(e.time)}</p><div class="card-t">${esc(e.title)}</div><div class="card-m">${esc(e.venue)}</div><div class="card-f"><span>${int(e.going)} interested</span>${U.near(e)}</div></div></a>`; };
  const evImg = (e) => ({ concerts: 'gen-events', skiing: 'deer-valley-expanded', boating: 'park-city-summer', 'Open House Tour': 'home-sage', 'Home Buyer Workshop': 'gen-mortgage', 'Farmers Market': 'gen-marketplace', 'Food Truck Night': 'gen-deals', 'Art Walk': 'park-city-historic', 'Trail Run 10K': 'park-city-summer', 'Ski Swap': 'tile_nightly_rentals', 'Holiday Lights Festival': 'park-city-main', 'Chamber Mixer': 'gen-jobs' }[e.kind] || 'tile_events');
  E.evImg = evImg;
  U.deal = (d) => { const b = E.idx.businesses[d.biz]; return `<a class="card" href="#/deal/${d.id}"><div class="card-img wide" ${bg(E.bizImg2(b))}><span class="badge sb">${d.pct}% off</span></div><div class="card-b"><div class="card-t">${esc(d.title)}</div><div class="card-m">${esc(b.name)}</div><div class="card-f"><span><b class="tnum" style="color:var(--ink)">$${d.price}</b> · ${int(d.sold)} claimed</span>${U.near(d)}</div></div></a>`; };
  U.job = (j) => { const b = E.idx.businesses[j.biz]; return `<a class="mini" href="#/job/${j.id}"><div class="av" style="border-radius:12px">${initials(b.name)}</div><div style="min-width:0;flex:1"><div class="card-t">${esc(j.title)}</div><div class="card-m">${esc(b.name)} · ${esc(j.type)} · <span class="tnum">${esc(j.pay)}</span></div><div class="mt8 row">${U.near(j)}<span class="tag">${ago(j.posted)}</span></div></div></a>`; };
  U.item = (m) => `<a class="card" href="#/item/${m.id}"><div class="card-img ${parseInt(m.id.slice(1)) % 3 === 0 ? 'tall' : 'sq'}" ${bg(m.seller_type === 'business' ? E.bizImg(E.idx.businesses[m.seller]) : 'tile_classifieds')}></div><div class="card-b"><div class="price tnum" style="font-size:1.05rem">${money0(m.price)}</div><div class="card-t" style="font-weight:500">${esc(m.title)}</div><div class="card-m">${esc(m.seller_type === 'business' ? E.idx.businesses[m.seller].name : m.seller_name)}</div><div class="card-f">${U.near(m)}${m.ship ? '<span class="tag ok">Ships</span>' : '<span class="tag">Pickup</span>'}</div></div></a>`;
  U.classified = (c) => `<a class="card" href="#/classified/${c.id}"><div class="card-img sq" ${bg('tile_classifieds')}><span class="badge">${esc(c.cat)}</span></div><div class="card-b"><div class="price tnum" style="font-size:1.05rem">${money0(c.price)}</div><div class="card-t" style="font-weight:500">${esc(c.title)}</div><div class="card-f"><span>${ago(c.posted)}</span>${U.near(c)}</div></div></a>`;
  U.school = (s) => `<a class="mini" href="#/school/${s.id}"><div class="av" style="background:${s.rating >= 8 ? '#e8f4ec' : 'var(--surface-2)'};color:${s.rating >= 8 ? 'var(--ok)' : 'var(--ink)'}">${s.rating}<small style="font-size:9px">/10</small></div><div style="flex:1;min-width:0"><div class="card-t">${esc(s.name)}</div><div class="card-m">${esc(s.level)} · ${esc(s.district)}</div><div class="mt8">${U.near(s)}</div></div></a>`;
  U.activity = (a) => `<div class="mini"><div class="mini-img" ${bg((a.county === 'washington' ? { boating: 'st-george-redrock', hiking: 'iur-zion-canyon', golf: 'st-george-luxury' } : a.county === 'rich' ? { boating: 'iur-listing-bearlake' } : a.county === 'summit' || a.county === 'wasatch' ? {} : { boating: 'iur-saltlake-wasatch', skiing: 'iur-cottonwood-heights-hero', hiking: 'iur-saltlake-wasatch', sightseeing: 'iur-saltlake-wasatch' })[a.kind] || { boating: 'park-city-summer', skiing: 'deer-valley-expanded', hiking: 'park-city-summer', golf: 'promontory-hero', sightseeing: 'park-city-historic', concerts: 'gen-events', dining: 'park-city-main-street' }[a.kind])}></div><div style="min-width:0"><div class="card-t">${esc(a.name)}</div><div class="card-m">${esc(a.blurb)}</div><div class="mt8">${U.near(a)}</div></div></div>`;
  U.links = (arr) => arr.length > 10 ? `<div class="link-list clamp">${arr.join('')}</div><button class="btn btn-ghost btn-sm show-all" onclick="this.previousElementSibling.classList.remove('clamp');this.remove()">Show all ${arr.length}</button>` : `<div class="link-list">${arr.join('')}</div>`;
  U.empty = (t, s) => `<div class="empty"><b>${t}</b>${s || ''}</div>`;
  U.geoPicker = (ctx, base, extra = {}) => {
    const opts = [`<option value="">All of ${esc(B.areaName)}</option>`]
      .concat(E.counties.map((c) => `<option value="county:${c.slug}" ${ctx.level === 'county' && ctx.slug === c.slug ? 'selected' : ''}>${esc(c.name)}</option>`))
      .concat(E.cities.filter((c) => c.pop > (B.scope ? 0 : 2500)).sort((a, b) => a.name.localeCompare(b.name)).map((c) => `<option value="city:${c.slug}" ${ctx.city === c.slug && ctx.level === 'city' ? 'selected' : ''}>${esc(c.name)}</option>`));
    return `<label class="field" style="margin:0;min-width:220px"><span class="sr">Location</span><select data-geo="${base}" data-extra='${esc(JSON.stringify(extra))}'>${opts.join('')}</select></label>`;
  };
  U.rates = () => { const r = E.D.rates; return `<div class="g g3">${[['30-yr fixed', r['30yr']], ['15-yr fixed', r['15yr']], ['Jumbo 30-yr', r.jumbo], ['FHA 30-yr', r.fha], ['VA 30-yr', r.va], ['7/6 ARM', r.arm]].map(([t, v]) => `<div class="kpi"><small>${t}</small><b>${v.toFixed(2)}%</b><i>sample rate · lender rotation</i></div>`).join('')}</div>`; };
  U.faq = (qs) => qs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('');
  U.agentCard = () => { const a = B.featuredAgent; return `<div class="panel"><p class="sec-eyebrow">Featured Realtor</p><div class="row"><div class="av lg" ${bg(a.img)} style="background-size:cover"></div><div><h3 style="margin:0">${a.name}</h3><p class="card-m">${a.team}</p></div></div><a class="btn btn-dark btn-block mt16" href="#/contact">Ask ${a.name.split(' ')[0]} a question</a><p class="note mt8">Lead routing: Lawson Team. Sponsored placements show only with an active agreement.</p></div>`; };

  /* ---------- router ---------- */
  E.route = () => {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    const q = Object.fromEntries(new URLSearchParams(qs || ''));
    const page = E.pages[parts[0] || 'home'] || E.pages.notfound;
    let out;
    try { out = page(parts.slice(1), q); } catch (err) { console.error(err); out = E.shell(U.sec({ title: 'Something went wrong' }, `<p class="muted">${esc(err.message)}</p>`)); }
    const app = document.getElementById('app');
    app.innerHTML = out.html || out;
    document.title = (out.title ? out.title + ' | ' : '') + B.name;
    window.scrollTo(0, 0);
    out.after && out.after();
  };

  /* ---------- global events ---------- */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.show-all')) return;
    if (window.CLM_SOLO) { const a = e.target.closest('a[href]'); if (a && !a.matches('[data-open],[data-close]')) { e.preventDefault(); e.stopPropagation(); const t = document.getElementById('solo-toast'); if (t) { t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1600); } return; } }
    if (e.target.closest('[data-open]')) { e.preventDefault(); document.getElementById('drawer')?.classList.add('open'); }
    if (e.target.closest('[data-close]') || (e.target.closest('.drawer a') && !e.target.closest('[data-open]'))) document.getElementById('drawer')?.classList.remove('open');
  });
  document.addEventListener('change', (e) => {
    const s = e.target.closest('select[data-geo]');
    if (s) { const p = new URLSearchParams(JSON.parse(s.dataset.extra || '{}')); if (s.value) p.set('g', s.value); location.hash = '#/' + s.dataset.geo + (p.toString() ? '?' + p : ''); }
  });
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('form[data-act="search"]');
    if (f) {
      e.preventDefault(); const fd = new FormData(f); const term = (fd.get('q') || '').trim().toLowerCase(); let g = fd.get('g') || '';
      const city = E.cities.find((c) => c.name.toLowerCase() === term) || E.cities.find((c) => term && c.name.toLowerCase().startsWith(term));
      const hood = !city && E.G.hoods.find((h) => term && h.name.toLowerCase().includes(term) && inScope(E.idx.city[h.city].county));
      if (city) g = 'city:' + city.slug; else if (hood) g = 'hood:' + hood.slug;
      const t = fd.get('t') || 'homes';
      location.hash = '#/' + t + (g ? '?g=' + g : '');
    }
  });
  window.addEventListener('hashchange', E.route);
  E.boot = async () => { if (window.CLM_SOLO) { history.replaceState(null, '', location.pathname + location.search + window.CLM_SOLO); const t = document.createElement('div'); t.id = 'solo-toast'; t.textContent = 'Single-template view: links are disabled'; document.body.appendChild(t); }
     document.getElementById('app').innerHTML = '<div class="loading">Loading the master template…</div>'; await E.load(); E.route(); };
})();
