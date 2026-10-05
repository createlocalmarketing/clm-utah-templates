/* CLM template engine — page-type templates. Every brand renders these same templates. */
(function () {
  const E = window.CLM, B = E.B, U = E.ui, L = E.L, P = E.pages;
  const { esc, money, money0, int, bg, ago, fmtDate, initials, slugTitle } = E;
  const page = (title, ctx, inner, o = {}) => ({ title: String(title).replace(/&amp;/g, '&'), html: E.shell(inner, { ctx, ...o }), after: o.after });
  const ctxName = (ctx) => (ctx.level === 'state' ? B.areaName : ctx.name);
  const median = (a) => { if (!a.length) return 0; const s = a.map((x) => x.price).sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  const countyOf = (ctx) => E.idx.county[ctx.county || (ctx.level === 'county' ? ctx.slug : B.primaryCounty || 'salt-lake')];
  const grid = (items, fn, cls = 'g g4') => (items.length ? `<div class="${cls}">${items.map(fn).join('')}</div>` : U.empty('Nothing in range yet', 'This block fills automatically as records are added for this area.'));
  const rail = (items, fn) => (items.length ? `<div class="rail">${items.map(fn).join('')}</div>` : U.empty('Nothing in range yet'));
  const listHead = (title, ctx, base, extra, right = '') => `<div class="row between" style="margin-bottom:20px"><div><h1 class="sec-title">${title}</h1><p class="sec-sub">${ctx.level === 'city' || ctx.level === 'hood' ? `Results in ${esc(ctx.name)} first, then everything within its area of influence, labeled by distance.` : `Showing all of ${esc(ctxName(ctx))}.`}</p></div><div class="row">${U.geoPicker(ctx, base, extra)}${right}</div></div>`;

  /* ---------- six ways to buy (SmartBuy paths) ---------- */
  const WAYS = [
    ['first-time', 'First-time buyer', (l, m) => l.type !== 'Land' && l.price <= m * 0.75],
    ['investor', 'Investor', (l) => ['Condo', 'Townhome'].includes(l.type)],
    ['luxury', 'Luxury', (l, m) => l.price >= m * 1.5 && l.type !== 'Land'],
    ['downsizer', 'Downsizer', (l) => l.type !== 'Land' && l.beds && l.beds <= 3],
    ['relocator', 'Relocator', (l) => l.smartbuy >= 80 && l.type !== 'Land'],
    ['cash-flow', 'Cash-flow / rental', (l) => ['Condo', 'Townhome'].includes(l.type) || (l.beds >= 4 && l.type === 'Single Family')],
  ];
  const sixWays = (ctx, ls) => {
    const m = median(ls) || countyOf(ctx).home;
    return `<div class="g g3">${WAYS.map(([k, t, f], i) => { const n = ls.filter((l) => f(l, m)); const img = ['home-sage', 'home-interior-1', 'st-regis-deer-valley', 'home-bradford', 'gen-mortgage', 'home-interior-2'][i];
      return `<a class="card" href="${L.list('homes', ctx, { w: k })}"><div class="card-img wide" ${bg(img)}><span class="badge sb">${n.length} homes</span></div><div class="card-b"><div class="card-t">${t}</div><div class="card-m">${n.length ? `From ${money(Math.min(...n.map((x) => x.price)))} · best SmartBuy ${Math.max(...n.map((x) => x.smartbuy))}` : 'Alerts available for this path'}</div></div></a>`; }).join('')}</div>`;
  };

  /* ---------- directory stack (by vertical) ---------- */
  const dirStack = (ctx) => {
    const all = E.pull('businesses', ctx);
    const vs = E.G.verticals.map((v) => [v, all.filter((b) => b.vertical === v.slug)]).filter(([, a]) => a.length);
    return `<div class="chips" style="margin-bottom:18px">${vs.map(([v, a]) => `<a class="chip" href="${L.list('directory', ctx, { v: v.slug })}">${esc(v.name)}<small>${a.length}</small></a>`).join('')}</div>${grid(all.slice(0, 8), U.biz)}`;
  };

  /* ---------- the geo hub: state / region / county / city share one template ---------- */
  const hub = (ctx) => {
    const lvl = ctx.level, isLocal = lvl === 'city', c = ctx.node;
    const county = countyOf(ctx);
    const ls = E.pull('listings', ctx, { exact: true });
    const news = E.pull('news', ctx), events = E.pull('events', ctx), acts = E.pull('activities', ctx, { radius: 60 });
    const schools = E.pull('schools', ctx), deals = E.pull('deals', ctx), jobs = E.pull('jobs', ctx), market = E.pull('market', ctx);
    const pros = E.pull('providers', ctx, { where: (p) => p.cat === 'real-estate-agency' });
    const childCities = lvl === 'city' ? [] : (lvl === 'state' ? [...E.cities] : E.cities.filter((x) => ctx.counties.includes(x.county)));
    if (B.primaryCity) childCities.sort((a, b) => (b.slug === B.primaryCity) - (a.slug === B.primaryCity));
    const hoods = lvl === 'city' ? (E.idx.hoodsByCity[ctx.slug] || []) : E.G.hoods.filter((h) => childCities.some((x) => x.slug === h.city));
    const name = ctxName(ctx);
    const pop = lvl === 'city' ? c.pop : lvl === 'state' ? E.counties.reduce((s, x) => s + x.pop, 0) : ctx.counties.reduce((s, k) => s + E.idx.county[k].pop, 0);
    const homeMed = lvl === 'city' ? median(ls) : lvl === 'county' ? c.home : 0;
    const isPrimary = B.primaryCity && ctx.slug === B.primaryCity;
    const stats = [[int(pop), ' residents'], [int(ls.length), ' sample listings'], ...(lvl === 'city' ? [[int(hoods.length), ' neighborhoods'], [c.zip, ' ZIP']] : [[int(childCities.length), ' cities'], [int(hoods.length), ' neighborhoods']]), ...(lvl === 'county' ? [[money(c.home), ' median home (DB)']] : [])];
    const eyebrow = lvl === 'state' ? (B.scope ? B.eyebrow : 'Utah · 29 counties') : lvl === 'region' ? 'Region · ' + ctx.counties.length + ' counties' : lvl === 'county' ? county.region + ' · county seat ' + esc(c.seat) : esc(E.countyName(c.county)) + ' · ' + esc(c.type);
    const h1 = lvl === 'state' ? B.headline[0] : lvl === 'city' ? (isPrimary ? 'Park City homes &amp; life' : esc(name) + ' homes &amp; life') : esc(name);
    const em = lvl === 'state' ? B.headline[1] : lvl === 'city' ? 'neighborhood by neighborhood.' : lvl === 'county' ? 'every city and neighborhood.' : 'county by county.';
    const lede = lvl === 'state' ? B.lede : lvl === 'city' ? `Every ${esc(name)} listing, neighborhood, school and local business — plus events, news and things to do across the surrounding area.` : esc(county.market || '') || `All homes, cities and local services across ${esc(name)}.`;

    const storyItems = [...news.slice(0, 4).map((n) => ['#/article/' + n.id, E.newsImg(n), slugTitle(n.cat), n.city ? E.cityName(n.city) : 'Utah']), ...events.slice(0, 4).map((e) => ['#/event/' + e.id, E.evImg(e), fmtDate(e.date), e.kind]), ...deals.slice(0, 2).map((d) => ['#/deal/' + d.id, 'gen-deals', d.pct + '% off', 'Deal'])];
    const chips = [['#homes', 'Homes', ls.length], ...(hoods.length ? [['#hoods', 'Neighborhoods', hoods.length]] : []), ...(childCities.length ? [['#cities', 'Cities', childCities.length]] : []), ['#ways', 'Ways to buy'], ['#market', 'Market data'], ['#news', 'News', news.length], ['#todo', 'Things to do', acts.length], ['#events', 'Events', events.length], ['#schools', 'Schools', schools.length], ['#directory', 'Businesses'], ['#deals', 'Deals', deals.length], ['#jobs', 'Jobs', jobs.length], ['#shop', 'Shop local'], ['#faq', 'FAQ']];
    const anchor = (id) => `href="javascript:void(0)" data-scroll="${id}"`;

    const aio = lvl === 'city'
      ? `${esc(name)} is ${/^[aeiou]/i.test(c.type) ? 'an' : 'a'} ${esc(c.type === 'CDP' ? 'census-designated place' : c.type.toLowerCase())} in ${esc(E.countyName(c.county))}, Utah, with about ${int(c.pop)} residents${c.income ? ` and a median household income of ${money0(c.income)}` : ''}. ${E.countyName(c.county)} has a median home price of ${money0(county.home)} (${county.yoy >= 0 ? '+' : ''}${county.yoy}% YoY) and homes average ${county.dom} days on market. ${hoods.length ? `This guide covers ${hoods.length} ${esc(name)} neighborhoods` : 'This guide covers the whole city'} plus schools, businesses and events within its area of influence.`
      : lvl === 'county' ? `${esc(name)} (seat: ${esc(c.seat)}) is home to about ${int(c.pop)} people across ${childCities.length} cities and towns. Median home price is ${money0(c.home)} (${c.yoy >= 0 ? '+' : ''}${c.yoy}% YoY), median rent ${money0(c.rent)}, and ${int(c.active)} active listings average ${c.dom} days on market.`
      : lvl === 'region' ? `The ${esc(name)} region spans ${ctx.counties.map(E.countyName).join(', ')} — ${int(pop)} residents in ${childCities.length} cities and towns.`
      : `${esc(B.name)} covers ${E.counties.length} ${E.counties.length === 1 ? 'county' : 'counties'}, ${E.cities.length} cities and towns and ${hoods.length} neighborhoods, drilling down ${B.scope ? 'county → city → neighborhood' : 'region → county → city → neighborhood'}.`;

    let html = U.hero({ img: E.heroFor(ctx), eyebrow, h1, em, lede, stats, after: U.search(ctx.level === 'state' ? null : ctx, lvl === 'state' ? undefined : `Search ${name} homes, streets, MLS #`) });
    html += `<div class="subnav"><div class="wrap"><div class="chips">${chips.map(([id, t, n]) => `<a class="chip" ${anchor(id.slice(1))}>${t}${n != null ? `<small>${n}</small>` : ''}</a>`).join('')}</div></div></div>`;
    html += `<div class="wrap"><div class="stories" aria-label="Latest stories">${storyItems.map(([u, im, t, s]) => `<a class="story" href="${u}"><div class="ring"><span ${bg(im)}></span></div><b>${esc(t)}</b>${esc(s)}</a>`).join('')}</div></div>`;
    html += U.sec({}, `<div class="aio"><b class="k">${lvl === 'city' ? 'About ' + esc(name) : 'Quick answer'}</b>${aio}</div>`);

    // drill-down
    if (lvl === 'state' && !B.scope) {
      html += U.sec({ id: 'cities', eyebrow: 'Drill down', title: 'Explore Utah by region', sub: 'Region → county → city → neighborhood. Every level is the same template with its own data.' },
        `<div class="g g4">${E.regions.map((r) => `<a class="tile" href="${L.region(r.slug)}" ${bg(E.heroFor(E.ctx('county', r.counties[0])))}><div><b>${esc(r.name)}</b><small>${r.counties.length} counties · ${E.cities.filter((x) => r.counties.includes(x.county)).length} cities</small></div></a>`).join('')}</div>
         <h3 class="mt40" style="margin-bottom:12px">All 29 counties</h3>${U.links(E.counties.map((k) => `<a href="${L.county(k.slug)}">${esc(k.name)}<span>${money(k.home)}</span></a>`))}`);
    } else if (lvl !== 'city') {
      const cs = lvl === 'state' ? E.counties : lvl === 'region' ? ctx.counties.map((k) => E.idx.county[k]) : [];
      if (cs.length) html += U.sec({ eyebrow: 'Counties', title: lvl === 'state' ? esc(E.counties.map((k) => k.name.replace(' County', '')).join(' & ')) + (E.counties.length > 1 ? ' counties' : ' County') : 'Counties in ' + esc(name) }, `<div class="g g${Math.min(4, Math.max(2, cs.length))}">${cs.map((k) => `<a class="tile" href="${L.county(k.slug)}" ${bg(E.heroFor(E.ctx('county', k.slug)))}><div><b>${esc(k.name)}</b><small>${money(k.home)} median · ${(E.idx.citiesByCounty[k.slug] || []).length} cities</small></div></a>`).join('')}</div>`);
      html += U.sec({ id: 'cities', tint: true, eyebrow: 'Cities & towns', title: 'Cities in ' + esc(name), more: ['#/cities' + (lvl === 'state' ? '' : '?g=' + E.gKey(ctx)), 'All cities'] },
        `<div class="g g4">${childCities.slice(0, 8).map((x) => `<a class="tile" href="${L.city(x.slug)}" ${bg(E.heroFor(E.ctx('city', x.slug)))}><div><b>${esc(x.name)}</b><small>${int(x.pop)} residents · ${(E.idx.hoodsByCity[x.slug] || []).length} neighborhoods</small></div></a>`).join('')}</div>
         ${childCities.length > 8 ? '<div class="mt24">' + U.links(childCities.slice(8).map((x) => `<a href="${L.city(x.slug)}">${esc(x.name)}<span>${esc(x.type)}</span></a>`)) + '</div>' : ''}`);
    }
    if (hoods.length) {
      const pri = B.primaryCity, lux = (h) => /luxury/i.test(h.tier || '');
      const hs = [...hoods].sort((a, b) => (b.city === pri) - (a.city === pri) || lux(b) - lux(a) || a.name.localeCompare(b.name));
      html += U.sec({ id: 'hoods', eyebrow: 'Neighborhoods', title: (lvl === 'city' ? 'Every ' + esc(name) + ' neighborhood' : 'Neighborhoods in ' + esc(name)), sub: lvl === 'city' ? 'Each neighborhood page pulls its own homes, schools, businesses and nearby events.' : '', more: [L.list('neighborhoods', ctx), 'All neighborhoods'] },
        `<div class="g g4">${hs.slice(0, 8).map((h) => { const n = E.D.listings.filter((l) => l.hood === h.slug).length; return `<a class="tile" href="${L.hood(h.slug)}" ${bg(['deer-valley-twilight', 'promontory-hero', 'park-city-historic', 'montage-deer-valley', 'home-pinnacle', 'iur-listing-heber', 'sg-ivins-hero', 'st-george-luxury'][h.name.length % 8])}><div><b>${esc(h.name)}</b><small>${esc(slugTitle(h.type || 'neighborhood'))}${h.tier ? ' · ' + esc(h.tier) : ''} · ${n} homes</small></div></a>`; }).join('')}</div>
         ${hs.length > 8 ? '<div class="mt24">' + U.links(hs.slice(8, 120).map((h) => `<a href="${L.hood(h.slug)}">${esc(h.name)}<span>${esc(lvl === 'city' ? h.tier || '' : E.cityName(h.city))}</span></a>`)) + '</div>' : ''}`);
    }
    // homes
    const lsNew = ls.filter((l) => l.type === 'New Construction'), lsLand = ls.filter((l) => l.type === 'Land'), lsF = ls.filter((l) => l.fsbo);
    html += U.sec({ id: 'homes', tint: true, eyebrow: 'Live MLS · ' + esc(B.mls), title: 'Homes for sale in ' + esc(name), sub: 'Sorted by SmartBuy score — our value signal that blends price per sqft, days on market and recent price moves.', more: [L.list('homes', ctx), 'Search all ' + ls.length + ' homes'] },
      `<div class="chips" style="margin-bottom:18px"><a class="chip on" href="${L.list('homes', ctx)}">All<small>${ls.length}</small></a><a class="chip" href="${L.list('new-construction', ctx)}">New construction<small>${lsNew.length}</small></a><a class="chip" href="${L.list('land', ctx)}">Land<small>${lsLand.length}</small></a><a class="chip" href="${L.list('fsbo', ctx)}">FSBO<small>${lsF.length}</small></a><a class="chip" href="${L.list('homes', ctx, { t: 'Condo' })}">Condos</a><a class="chip" href="${L.list('homes', ctx, { w: 'luxury' })}">Luxury</a></div>${grid(ls.slice(0, 8), U.listing)}`);
    html += U.sec({ id: 'ways', eyebrow: 'Smart Buys · ' + esc(name), title: 'Six ways to buy in ' + esc(name), sub: `Real buyer paths — first-time, investor, luxury, downsizer, relocator, cash-flow — anchored to ${esc(name)}'s median.` }, sixWays(ctx, ls));
    // market data
    const mk = lvl === 'state' ? null : county;
    html += U.sec({ id: 'market', tint: true, eyebrow: 'Market data', title: esc(name) + ' market snapshot', more: [L.list('market-data', ctx), 'Full market data'] },
      `<div class="kpis">${mk ? `<div class="kpi"><small>Median home (${esc(mk.name)})</small><b>${money0(mk.home)}</b><i>${mk.yoy >= 0 ? '+' : ''}${mk.yoy}% YoY · master DB</i></div><div class="kpi"><small>Days on market</small><b>${mk.dom}</b><i>county average · master DB</i></div><div class="kpi"><small>Active listings</small><b>${int(mk.active)}</b><i>county · master DB</i></div><div class="kpi"><small>Median rent</small><b>${money0(mk.rent)}</b><i>county · master DB</i></div>` : `<div class="kpi"><small>Counties</small><b>${E.counties.length}</b></div><div class="kpi"><small>Cities & towns</small><b>${E.cities.length}</b></div><div class="kpi"><small>Highest county median</small><b>${money(Math.max(...E.counties.map((x) => x.home)))}</b><i>${esc(E.counties.reduce((a, b) => (a.home > b.home ? a : b)).name)}</i></div><div class="kpi"><small>Active listings</small><b>${int(E.counties.reduce((s, x) => s + x.active, 0))}</b><i>all counties · master DB</i></div>`}</div>
       ${lvl === 'city' && homeMed ? `<p class="note mt16">${esc(name)} sample-listing median: ${money0(homeMed)} across ${ls.length} sample listings.</p>` : ''}
       <h3 class="mt40" style="margin-bottom:12px">Today's mortgage rates</h3>${U.rates()}<div class="row mt16"><a class="btn btn-dark" href="${L.list('mortgage', ctx)}">Run the numbers for ${esc(name)}</a><a class="btn btn-ghost" href="#/lenders${ctx.level !== 'state' ? '?g=' + E.gKey(ctx) : ''}">Compare lenders</a></div>`);
    // news
    if (news.length) html += U.sec({ id: 'news', eyebrow: 'Real Estate News', title: esc(name) + ' news', sub: isLocal ? `${esc(name)} stories first, then nearby towns within ${E.R.news} miles.` : B.primaryCity ? `${esc(E.cityName(B.primaryCity))} stories lead; every ${esc(B.areaName.split(' & ').pop().replace('the ', ''))} town follows.` : '', more: [L.list('news', ctx), 'All news'] },
      `<div class="news-lead">${U.news(news[0], true)}<div>${news.slice(1, 6).map(U.newsRow).join('')}</div></div>`);
    // things to do
    if (acts.length) { const kinds = [...new Set(acts.map((a) => a.kind))];
      html += U.sec({ id: 'todo', tint: true, eyebrow: 'Area of influence · 60 mi', title: 'Things to do near ' + esc(name), sub: `“Let's go boating in ${esc(name)}” means every lake within a drive — so this block pulls the whole surrounding area, ranked by distance.`, more: [L.list('things-to-do', ctx), 'All things to do'] },
        `<div class="chips" style="margin-bottom:18px">${kinds.map((k) => `<a class="chip" href="${L.list('things-to-do', ctx, { k })}">${esc(slugTitle(k))} near ${esc(name)}<small>${acts.filter((a) => a.kind === k).length}</small></a>`).join('')}</div><div class="g g3">${acts.slice(0, 6).map(U.activity).join('')}</div>`); }
    // events
    html += U.sec({ id: 'events', eyebrow: 'Events', title: 'Upcoming in and around ' + esc(name), more: [L.list('events', ctx), 'All events'] }, rail(events.slice(0, 10), U.event));
    // schools
    html += U.sec({ id: 'schools', tint: true, eyebrow: 'Schools', title: 'Schools serving ' + esc(name), sub: county && county.top_schools?.length ? 'Top-rated in ' + esc(county.name) + ' (master DB): ' + county.top_schools.map(esc).join(', ') + '.' : '', more: [L.list('schools', ctx), 'All schools'] },
      grid(schools.slice(0, 6), U.school, 'g g3'));
    // directory
    html += U.sec({ id: 'directory', eyebrow: 'Local directory', title: 'Businesses that serve ' + esc(name), sub: isLocal ? `Includes businesses based in nearby towns whose service area covers ${esc(name)}.` : '', more: [L.list('directory', ctx), 'Full directory'] }, dirStack(ctx));
    // pros
    html += U.sec({ tint: true, eyebrow: 'Realtors', title: 'Agents who work ' + esc(name), more: [L.list('realtors', ctx), 'Realtor directory'] },
      `<div class="split"><div>${grid(pros.slice(0, 4), U.pro, 'g g2')}</div><aside class="side">${U.agentCard()}</aside></div>`);
    // deals / jobs / shop
    html += U.sec({ id: 'deals', eyebrow: 'Deals', title: 'Local deals', more: [L.list('deals', ctx), 'All deals'] }, rail(deals.slice(0, 10), U.deal));
    html += U.sec({ id: 'shop', tint: true, eyebrow: 'Shop local marketplace', title: 'From ' + esc(name) + ' businesses &amp; neighbors', more: [L.list('marketplace', ctx), 'Open marketplace'] }, `<div class="masonry">${market.slice(0, 8).map(U.item).join('')}</div>`);
    html += U.sec({ id: 'jobs', eyebrow: 'Jobs', title: 'Hiring near ' + esc(name), more: [L.list('jobs', ctx), 'All jobs'] }, grid(jobs.slice(0, 6), U.job, 'g g3'));
    // compare + relocation + faq
    if (lvl === 'city') {
      const near = E.cities.filter((x) => x.slug !== c.slug && x.pop > 300).map((x) => [x, E.miles(c.lat, c.lon, x.lat, x.lon)]).sort((a, b) => a[1] - b[1]).slice(0, 6);
      html += U.sec({ tint: true, eyebrow: 'City vs city', title: 'Compare ' + esc(name) + ' with nearby cities' }, `<div class="g g3">${near.map(([x, d]) => `<a class="mini" href="#/compare/${c.slug}/${x.slug}"><div class="vs" style="grid-template-columns:auto 1fr;gap:12px"><div class="circle" style="width:44px;height:44px;font-size:12px">VS</div><div><div class="card-t">${esc(name)} vs ${esc(x.name)}</div><div class="card-m">${Math.round(d)} mi apart</div></div></div></a>`).join('')}</div>`);
    }
    html += U.sec({ dark: true, eyebrow: 'Relocation', title: 'Moving to ' + esc(name) + '?', sub: county ? `${esc(county.airport)} · ${county.slc_min} min to Salt Lake City · ${esc(county.highways)}` : 'Cost of living, schools, commute and neighborhoods in one guide.' },
      `<div class="row"><a class="btn btn-accent" href="${L.list('relocation', ctx)}">Open the ${esc(name)} relocation guide</a><a class="btn btn-ghost" style="color:#fff;border-color:#555" href="#/compare">Compare cities</a></div>`);
    const fq = lvl === 'city' ? [
      [`What is the median home price in ${name}?`, `The ${county.name} median is ${money0(county.home)} (${county.yoy >= 0 ? '+' : ''}${county.yoy}% year over year), per the CLM master database. City-level medians update from the live MLS feed.`],
      [`How many neighborhoods are in ${name}?`, `${hoods.length || 'No'} mapped neighborhoods, subdivisions and HOAs — each has its own page.`],
      [`What school district serves ${name}?`, schools[0] ? esc(schools[0].district) + '.' : 'See the schools section.'],
      [`How far is ${name} from Salt Lake City?`, `About ${county.slc_min} minutes by car; the nearest commercial airport is ${esc(county.airport)}.`],
    ] : [[`How many cities are in ${name}?`, `${childCities.length} cities, towns and census-designated places.`], [`What is the median home price?`, mk ? money0(mk.home) + ' (master DB).' : 'See each county page.']];
    html += U.sec({ id: 'faq', title: 'FAQ' }, U.faq(fq));
    html += U.sec({}, `<div class="eeat"><div class="av">IUR</div><div><b>Reviewed by the Inside Utah Real Estate desk</b><p class="card-m">Geography, county statistics and school districts from the CLM master database. Listing data from ${esc(B.mls)}.</p></div></div>`);
    return page(name + (lvl === 'city' ? ' Homes for Sale & Local Guide' : lvl === 'state' ? '' : ' Real Estate'), ctx, html, {
      after: () => document.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', () => { const t = document.getElementById(a.dataset.scroll); t && window.scrollTo({ top: t.offsetTop - 120, behavior: 'smooth' }); })),
    });
  };

  P.home = () => hub(E.ctx('state'));
  P.state = () => hub(E.ctx('state'));
  P.region = ([s]) => hub(E.ctx('region', s));
  P.county = ([s]) => hub(E.ctx('county', s));
  P.city = ([s]) => { const c = E.ctx('city', s); return c.level === 'city' ? hub(c) : P.notfound([], {}, `${E.cityName(s) || s} is outside ${B.areaName}.`, `<a class="btn btn-dark mt16" href="../${E.dirOf('utrd')}/index.html#/city/${s}">Open ${esc(E.cityName(s))} on Utah Real Estate Directory →</a>`); };

  /* ---------- neighborhood ---------- */
  P.hood = ([s]) => {
    const ctx = E.ctx('hood', s); if (ctx.level !== 'hood') return P.notfound([], {}, 'This neighborhood is outside ' + B.areaName + '.');
    const h = ctx.node, city = E.idx.city[h.city];
    const own = E.pull('listings', ctx, { exact: true, strictHood: true });
    const nearbyL = E.pull('listings', ctx, { where: (l) => l.hood !== h.slug, radius: E.R.listings_nearby }).slice(0, 8);
    const sib = (E.idx.hoodsByCity[h.city] || []).filter((x) => x.slug !== h.slug);
    let html = U.hero({ img: E.heroFor(ctx), eyebrow: esc(city.name) + ' · ' + esc(slugTitle(h.type || 'neighborhood')), h1: esc(h.name), em: 'homes, schools &amp; neighbors.', lede: esc(h.notes || `${h.name} is a ${slugTitle(h.type || 'neighborhood').toLowerCase()} in ${city.name}.`), stats: [[own.length, ' homes here'], [sib.length, ' sibling neighborhoods'], ...(h.tier ? [[esc(h.tier), ' tier']] : [])], sm: true });
    html += U.sec({}, `<div class="aio"><b class="k">About ${esc(h.name)}</b>${esc(h.name)} is in ${esc(city.name)}, ${esc(E.countyName(city.county))}. This page shows homes inside ${esc(h.name)} first, then the rest of ${esc(city.name)} and nearby — the same neighborhood template every CLM site uses.</div>`);
    html += U.sec({ tint: true, eyebrow: 'Homes in ' + esc(h.name), title: own.length ? own.length + ' homes in ' + esc(h.name) : 'No active listings in ' + esc(h.name), more: [L.list('homes', ctx), 'Search'] }, own.length ? grid(own, U.listing) : U.empty('Set an alert for ' + esc(h.name), '<a class="btn btn-dark mt16" href="#/saved">Save this search</a>'));
    html += U.sec({ eyebrow: 'Nearby', title: 'Homes near ' + esc(h.name) }, grid(nearbyL, U.listing));
    html += U.sec({ tint: true, title: 'Schools near ' + esc(h.name) }, grid(E.pull('schools', ctx).slice(0, 6), U.school, 'g g3'));
    html += U.sec({ title: 'Businesses near ' + esc(h.name) }, grid(E.pull('businesses', ctx).slice(0, 8), U.biz));
    html += U.sec({ tint: true, title: 'Events nearby' }, rail(E.pull('events', ctx).slice(0, 8), U.event));
    if (sib.length) html += U.sec({ title: 'Other ' + esc(city.name) + ' neighborhoods' }, `<div class="link-list">${sib.map((x) => `<a href="${L.hood(x.slug)}">${esc(x.name)}<span>${esc(x.tier || '')}</span></a>`).join('')}</div>`);
    return page(h.name + ', ' + city.name + ' Homes', ctx, html);
  };

  P.cities = (_, q) => {
    const ctx = E.parseG(q.g); const cs = E.cities.filter((c) => ctx.level === 'state' || ctx.counties.includes(c.county));
    const html = U.sec({}, listHead('Cities in ' + esc(ctxName(ctx)), ctx, 'cities') + `<div class="g g4">${cs.slice(0, 12).map((x) => `<a class="tile" href="${L.city(x.slug)}" ${bg(E.heroFor(E.ctx('city', x.slug)))}><div><b>${esc(x.name)}</b><small>${int(x.pop)} · ${esc(E.countyName(x.county))}</small></div></a>`).join('')}</div><div class="link-list mt24">${cs.slice(12).map((x) => `<a href="${L.city(x.slug)}">${esc(x.name)}<span>${esc(E.countyName(x.county))}</span></a>`).join('')}</div>`);
    return page('Cities', ctx, html, { crumb: 'Cities', tail: 'cities' });
  };
  P.counties = (_, q) => {
    const ctx = E.parseG(q.g); const ks = E.counties.filter((k) => ctx.level === 'state' || ctx.counties.includes(k.slug));
    const html = U.sec({}, listHead('Counties in ' + esc(ctxName(ctx)), ctx, 'counties') + `<div class="g g4">${ks.map((k) => `<a class="tile" href="${L.county(k.slug)}" ${bg(E.heroFor(E.ctx('county', k.slug)))}><div><b>${esc(k.name)}</b><small>${int(k.pop)} people · ${money0(k.home)} median</small></div></a>`).join('')}</div><p class="note mt16">County population and median home value from the CLM master database.</p>`);
    return page('Counties', ctx, html, { crumb: 'Counties', tail: 'counties' });
  };
  P.regions = () => {
    const rs = E.G.regions.filter((r) => r.counties.some((k) => E.inScope(k)));
    const html = U.sec({}, `<h1 class="sec-title">${esc(B.areaShort)} regions</h1><p class="sec-sub">Region → county → city → neighborhood drill-down.</p><div class="g g3 mt16">${rs.map((r) => `<div class="panel"><h3><a href="${L.region(r.slug)}">${esc(r.name)}</a></h3><p class="card-m">${r.counties.filter((k) => E.inScope(k)).map((k) => `<a href="${L.county(k)}">${esc(E.countyName(k))}</a>`).join(' · ')}</p></div>`).join('')}</div>`);
    return page('Regions', E.ctx('state'), html, { crumb: 'Regions', tail: 'regions' });
  };
  P.neighborhoods = (_, q) => {
    const ctx = E.parseG(q.g);
    const hs = E.G.hoods.filter((h) => { const c = E.idx.city[h.city]; return E.inScope(c.county) && (ctx.level === 'state' || (ctx.city ? h.city === ctx.city : ctx.counties.includes(c.county))); });
    const byCity = {}; hs.forEach((h) => (byCity[h.city] ||= []).push(h));
    const html = U.sec({}, listHead(int(hs.length) + ' neighborhoods in ' + esc(ctxName(ctx)), ctx, 'neighborhoods') + Object.entries(byCity).sort((a, b) => b[1].length - a[1].length).map(([c, a]) => `<h3 class="mt24" style="margin-bottom:8px"><a href="${L.city(c)}">${esc(E.cityName(c))}</a> <span class="muted" style="font-weight:400;font-size:.9rem">${a.length}</span></h3><div class="link-list">${a.map((h) => `<a href="${L.hood(h.slug)}">${esc(h.name)}<span>${esc(h.tier || '')}</span></a>`).join('')}</div>`).join(''));
    return page('Neighborhoods', ctx, html, { crumb: 'Neighborhoods', tail: 'neighborhoods' });
  };

  /* ---------- city vs city ---------- */
  P.compare = ([a, b]) => {
    const pool = E.cities.filter((c) => c.pop > 500).sort((x, y) => x.name.localeCompare(y.name));
    a = E.idx.city[a] && E.inScope(E.idx.city[a].county) ? a : B.primaryCity || 'salt-lake-city';
    b = E.idx.city[b] && E.inScope(E.idx.city[b].county) && b !== a ? b : B.scope ? 'heber-city' : 'st-george';
    const A = E.idx.city[a], Bc = E.idx.city[b], CA = E.idx.county[A.county], CB = E.idx.county[Bc.county];
    const la = E.D.listings.filter((l) => l.city === a), lb = E.D.listings.filter((l) => l.city === b);
    const sa = E.D.schools.filter((s) => s.city === a), sb = E.D.schools.filter((s) => s.city === b);
    const avgR = (s) => (s.length ? (s.reduce((t, x) => t + x.rating, 0) / s.length).toFixed(1) : '—');
    const rows = [
      ['Population', A.pop, Bc.pop, int, 'hi', 'master DB'], ['Median household income', A.income, Bc.income, money0, 'hi', 'master DB'],
      ['County median home price', CA.home, CB.home, money0, 'lo', 'master DB'], ['Price change YoY', CA.yoy, CB.yoy, (v) => v + '%', 'hi', 'master DB'],
      ['County median rent', CA.rent, CB.rent, money0, 'lo', 'master DB'], ['Days on market', CA.dom, CB.dom, int, 'lo', 'master DB'],
      ['5-yr population growth', CA.growth5, CB.growth5, (v) => v + '%', 'hi', 'master DB'], ['Unemployment', CA.unemp, CB.unemp, (v) => v + '%', 'lo', 'master DB'],
      ['College degree', CA.college, CB.college, (v) => v + '%', 'hi', 'master DB'], ['Drive to Salt Lake City', CA.slc_min, CB.slc_min, (v) => v + ' min', 'lo', 'master DB'],
      ['Neighborhoods mapped', (E.idx.hoodsByCity[a] || []).length, (E.idx.hoodsByCity[b] || []).length, int, 'hi', 'master DB'],
      ['Sample-listing median', median(la), median(lb), (v) => (v ? money0(v) : '—'), 'lo', 'sample'], ['Avg school rating', +avgR(sa) || 0, +avgR(sb) || 0, (v) => (v ? v + '/10' : '—'), 'hi', 'sample'],
    ];
    const sel = (id, v) => `<select class="cmp" data-side="${id}" style="padding:12px;border-radius:12px;border:1px solid var(--border);width:100%;font-weight:600">${pool.map((c) => `<option value="${c.slug}" ${c.slug === v ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>`;
    let html = U.hero({ img: 'gen-compare', eyebrow: 'City vs city', h1: esc(A.name) + ' vs ' + esc(Bc.name), em: 'side by side.', lede: `${Math.round(E.miles(A.lat, A.lon, Bc.lat, Bc.lon))} miles apart. Every row is pulled from the master database for each city and its county.`, sm: true });
    html += U.sec({}, `<div class="vs">${sel('a', a)}<div class="circle">VS</div>${sel('b', b)}</div>
      <div class="tbl-wrap mt24"><table><thead><tr><th>Metric</th><th class="n">${esc(A.name)}</th><th class="n">${esc(Bc.name)}</th><th>Source</th></tr></thead><tbody>${rows.map(([t, x, y, f, better, src]) => { const wa = x !== y && x && y && (better === 'hi' ? x > y : x < y), wb = x !== y && x && y && !wa; return `<tr><td>${t}</td><td class="n">${wa ? `<span class="win">${f(x)}</span>` : f(x)}</td><td class="n">${wb ? `<span class="win">${f(y)}</span>` : f(y)}</td><td><span class="tag ${src === 'sample' ? '' : 'acc'}">${src}</span></td></tr>`; }).join('')}</tbody></table></div>
      <p class="note mt8">Green marks the stronger value for a typical buyer. County figures apply to every city in that county.</p>`);
    html += U.sec({ tint: true }, `<div class="g g2 one-m">${[[A, la], [Bc, lb]].map(([c, l]) => `<div><div class="row between" style="margin-bottom:12px"><h3>Homes in ${esc(c.name)}</h3><a class="more" href="${L.city(c.slug)}">${esc(c.name)} hub →</a></div>${grid(l.slice(0, 2), U.listing, 'g g2')}</div>`).join('')}</div>`);
    const pop = B.scope ? [['park-city', 'heber-city'], ['park-city', 'midway'], ['heber-city', 'midway'], ['park-city', 'kamas'], ['snyderville', 'park-city'], ['coalville', 'kamas']] : [['salt-lake-city', 'park-city'], ['st-george', 'hurricane'], ['lehi', 'american-fork'], ['provo', 'orem'], ['draper', 'south-jordan'], ['ogden', 'layton'], ['st-george', 'ivins'], ['sandy', 'cottonwood-heights']];
    html += U.sec({ title: 'Popular comparisons' }, `<div class="link-list">${pop.filter(([x, y]) => E.idx.city[x] && E.idx.city[y]).map(([x, y]) => `<a href="#/compare/${x}/${y}">${esc(E.cityName(x))} vs ${esc(E.cityName(y))}<span>→</span></a>`).join('')}</div>`);
    return page(A.name + ' vs ' + Bc.name, E.ctx('city', a), html, { crumb: 'City vs city', prod: 'https://' + B.domain + B.urlBase + '/compare/' + a + '-vs-' + b + '/',
      after: () => document.querySelectorAll('select.cmp').forEach((s) => s.addEventListener('change', () => { const v = [...document.querySelectorAll('select.cmp')].map((x) => x.value); location.hash = '#/compare/' + v[0] + '/' + v[1]; })) });
  };

  /* ---------- schools ---------- */
  P.schools = (_, q) => {
    const ctx = E.parseG(q.g); const lvls = ['Elementary', 'Middle', 'High', 'Charter', 'University'];
    let s = E.pull('schools', ctx); if (q.l) s = s.filter((x) => x.level === q.l);
    const html = U.sec({}, listHead('Schools in ' + esc(ctxName(ctx)), ctx, 'schools', q.l ? { l: q.l } : {}) + `<div class="chips" style="margin-bottom:18px"><a class="chip ${!q.l ? 'on' : ''}" href="${L.list('schools', ctx)}">All</a>${lvls.map((l) => `<a class="chip ${q.l === l ? 'on' : ''}" href="${L.list('schools', ctx, { l })}">${l}</a>`).join('')}</div>` + grid(s.slice(0, 60), U.school, 'g g3') + `<p class="note mt16">School names in Park City, Wasatch, South/North Summit and St. George are real; ratings and enrollment are sample values pending the state data feed.</p>`);
    return page('Schools in ' + ctxName(ctx), ctx, html, { crumb: 'Schools', tail: 'schools' });
  };
  P.school = ([id]) => {
    const s = E.idx.schools[id]; if (!s) return P.notfound();
    const ctx = E.ctx('city', s.city); const homes = E.pull('listings', { ...ctx, lat: s.lat, lon: s.lon }, { radius: 5 }).slice(0, 8);
    let html = U.hero({ img: 'tile_schools', eyebrow: esc(s.level) + ' · ' + esc(s.district), h1: esc(s.name), lede: esc(E.cityName(s.city)) + ', Utah', stats: [[s.rating + '/10', ' rating (sample)'], [int(s.students), ' students'], [s.ratio + ':1', ' student–teacher']], sm: true });
    html += U.sec({}, `<div class="split"><div><h2 class="sec-title" style="margin-bottom:16px">Homes near ${esc(s.name)}</h2>${grid(homes, U.listing, 'g g2')}</div><aside class="side"><div class="panel"><h3>School facts</h3><div class="facts"><div><small>Level</small><b>${esc(s.level)}</b></div><div><small>District</small><b>${esc(s.district)}</b></div><div><small>Students</small><b>${int(s.students)}</b></div><div><small>Ratio</small><b>${s.ratio}:1</b></div></div><p class="note mt8">Boundaries and ratings will come from the district/state feed.</p></div>${U.agentCard()}</aside></div>`);
    return page(s.name, ctx, html, { crumb: s.name, tail: 'schools/' + s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
  };

  /* ---------- business directory / profiles ---------- */
  P.directory = (_, q) => {
    const ctx = E.parseG(q.g);
    let a = E.pull('businesses', ctx);
    const vs = E.G.verticals.map((v) => [v, a.filter((b) => b.vertical === v.slug).length]).filter(([, n]) => n);
    if (q.v) a = a.filter((b) => b.vertical === q.v); if (q.c) a = a.filter((b) => b.cat === q.c);
    const cats = [...new Set(a.map((b) => b.cat))];
    const title = (q.c ? E.idx.cat[q.c].name + 's' : q.v ? E.idx.vert[q.v].name : 'Local businesses') + ' in ' + esc(ctxName(ctx));
    const html = U.sec({}, listHead(title, ctx, 'directory', { ...(q.v ? { v: q.v } : {}), ...(q.c ? { c: q.c } : {}) }) +
      `<div class="chips"><a class="chip ${!q.v ? 'on' : ''}" href="${L.list('directory', ctx)}">All</a>${vs.map(([v, n]) => `<a class="chip ${q.v === v.slug ? 'on' : ''}" href="${L.list('directory', ctx, { v: v.slug })}">${esc(v.name)}<small>${n}</small></a>`).join('')}</div>
       ${q.v ? `<div class="chips mt8" style="margin-bottom:6px">${cats.map((c) => `<a class="chip ${q.c === c ? 'on' : ''}" href="${L.list('directory', ctx, { v: q.v, c })}">${esc(E.idx.cat[c].name)}</a>`).join('')}</div>` : ''}
       <p class="note mt16" style="margin-bottom:16px">${a.length} results · sponsored slots only render with a verified active agreement · <span class="tag">Sponsored slot available</span></p>` + grid(a.slice(0, 48), U.biz));
    return page(title.replace(/&amp;/g, '&'), ctx, html, { crumb: 'Directory', tail: 'directory' + (q.c ? '/' + q.c : '') });
  };
  P.business = ([id]) => {
    const b = E.idx.businesses[id]; if (!b || !E.inScope(b.county)) return P.notfound();
    const ctx = E.ctx('city', b.city); const pros = b.providers.map((p) => E.idx.providers[p]);
    const deals = E.D.deals.filter((d) => d.biz === id), jobs = E.D.jobs.filter((j) => j.biz === id), items = E.D.market.filter((m) => m.seller === id);
    const events = E.pull('events', ctx).slice(0, 4);
    let html = U.hero({ img: E.bizImg2(b), eyebrow: esc(E.idx.cat[b.cat].name) + ' · ' + esc(E.cityName(b.city)), h1: esc(b.name), lede: `Serving ${b.serves.map(E.countyName).join(', ')} · ${b.years} years in business`, stats: [['★ ' + b.rating, ` (${b.reviews} reviews)`], [b.price, ' price'], ...(b.verified ? [['✓', ' Verified']] : [])], sm: true });
    html += `<div class="subnav"><div class="wrap"><div class="chips">${['About', 'Team', 'Shop', 'Deals', 'Jobs', 'Reviews'].map((t) => `<a class="chip" href="javascript:void(0)" onclick="document.getElementById('b-${t.toLowerCase()}')?.scrollIntoView({behavior:'smooth'})">${t}</a>`).join('')}</div></div></div>`;
    html += U.sec({}, `<div class="split"><div>
      <div id="b-about"><h2 class="sec-title" style="font-size:1.6rem">About ${esc(b.name)}</h2><p class="muted mt8">${esc(b.name)} is a ${esc(E.idx.cat[b.cat].name.toLowerCase())} based in ${esc(E.cityName(b.city))}, serving ${b.serves.map(E.countyName).join(', ')}. This profile is the shared master record — it appears on every CLM site whose area covers its service area.</p></div>
      ${pros.length ? `<div id="b-team" class="mt40"><h3 style="margin-bottom:12px">Team · portable provider profiles</h3>${grid(pros, U.pro, 'g g2')}</div>` : ''}
      ${items.length ? `<div id="b-shop" class="mt40"><h3 style="margin-bottom:12px">Shop</h3>${grid(items, U.item, 'g g3')}</div>` : ''}
      ${deals.length ? `<div id="b-deals" class="mt40"><h3 style="margin-bottom:12px">Deals</h3>${grid(deals, U.deal, 'g g2')}</div>` : ''}
      ${jobs.length ? `<div id="b-jobs" class="mt40"><h3 style="margin-bottom:12px">Now hiring</h3>${grid(jobs, U.job, 'g g2')}</div>` : ''}
      <div id="b-reviews" class="mt40"><h3>Reviews</h3><p class="muted mt8">Practice reviews stay with ${esc(b.name)}; provider reviews travel with each person.</p><div class="kpis mt16"><div class="kpi"><small>Rating</small><b>★ ${b.rating}</b></div><div class="kpi"><small>Reviews</small><b>${b.reviews}</b></div><div class="kpi"><small>Response</small><b>~2 hrs</b><i>sample</i></div><div class="kpi"><small>Years</small><b>${b.years}</b></div></div></div>
      <div class="mt40"><h3 style="margin-bottom:12px">Events nearby</h3>${grid(events, U.event, 'g g2')}</div>
    </div><aside class="side"><div class="panel"><h3>Contact</h3><p class="card-m">${esc(b.addr)}</p><p class="card-m">${esc(b.hours)}</p><p class="card-m tnum">${esc(b.phone)} <span class="tag">sample</span></p><a class="btn btn-dark btn-block mt16" href="#/contractors">Request a quote</a><a class="btn btn-ghost btn-block mt8" href="#/claim">Claim this business</a></div>
      <div class="panel"><h3>Service area</h3>${b.serves.map((s) => `<a class="tag acc" style="margin:0 6px 6px 0" href="${L.county(s)}">${esc(E.countyName(s))}</a>`).join('')}</div></aside></div>`);
    return page(b.name, ctx, html, { crumb: b.name, tail: 'directory/' + b.cat + '/' + b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
  };
  P.pro = ([id]) => {
    const p = E.idx.providers[id]; if (!p) return P.notfound(); const b = E.idx.businesses[p.biz]; const ctx = E.ctx('city', p.city);
    const ls = p.cat === 'real-estate-agency' ? E.pull('listings', ctx).slice(0, 4) : [];
    let html = U.hero({ img: 'gen-provider', eyebrow: esc(p.role) + ' · ' + esc(b.name), h1: esc(p.name), lede: `${p.years} years · serves ${p.serves.map(E.countyName).join(', ')} · ${p.langs.join(', ')}`, stats: [['★ ' + p.rating, ` (${p.reviews} reviews)`], ...(p.deals ? [[p.deals, ' closed deals (sample)']] : [])], sm: true });
    html += U.sec({}, `<div class="split"><div>
      <h2 class="sec-title" style="font-size:1.6rem">Portable reputation</h2><p class="muted mt8">Reviews belong to ${esc(p.name.split(' ')[0])}, not the brokerage — they follow ${esc(p.name.split(' ')[0])} across practices and across every CLM site.</p>
      <div class="tbl-wrap mt16"><table><thead><tr><th>Practice</th><th>Period</th><th class="n">Reviews</th></tr></thead><tbody><tr><td>${esc(b.name)} (current)</td><td>Present</td><td class="n">${Math.round(p.reviews * (p.past_biz.length ? 0.6 : 1))}</td></tr>${p.past_biz.map((x) => `<tr><td>${esc(x)}</td><td>Previous</td><td class="n">${Math.round(p.reviews * 0.4)}</td></tr>`).join('')}</tbody></table></div>
      <h3 class="mt40" style="margin-bottom:10px">Specialties</h3><div class="row">${p.specialties.map((s) => `<span class="tag acc">${esc(s)}</span>`).join('')}</div>
      ${ls.length ? `<h3 class="mt40" style="margin-bottom:12px">Homes in ${esc(E.cityName(p.city))}</h3>${grid(ls, U.listing, 'g g2')}` : ''}
    </div><aside class="side"><div class="panel"><div class="row"><div class="av lg">${initials(p.name)}</div><div><h3 style="margin:0">${esc(p.name)}</h3><p class="card-m">${esc(p.role)}</p></div></div><a class="btn btn-dark btn-block mt16" href="#/contact">Message ${esc(p.name.split(' ')[0])}</a><a class="btn btn-ghost btn-block mt8" href="#/business/${b.id}">${esc(b.name)}</a><p class="note mt8">License numbers display only after verification against the Utah Division of Real Estate.</p></div></aside></div>`);
    return page(p.name + ', ' + p.role, ctx, html, { crumb: p.name, tail: 'pros/' + p.name.toLowerCase().replace(/ /g, '-') });
  };

  const proDir = (kind) => (_, q) => {
    const ctx = E.parseG(q.g);
    const cfg = { realtors: ['Realtors', ['real-estate-agency'], 'tile_agents', 'Agents who list and sell here — including those based nearby whose service area covers it.'], lenders: ['Mortgage lenders', ['mortgage-lender', 'mortgage-broker'], 'gen-lenders', 'Rotating lender placements. Compare loan officers who close in this area.'] }[kind];
    const ps = E.pull('providers', ctx, { where: (p) => cfg[1].includes(p.cat) });
    const bs = E.pull('businesses', ctx, { where: (b) => cfg[1].includes(b.cat) || (kind === 'lenders' && ['credit-union', 'title-company'].includes(b.cat)) });
    let html = U.hero({ img: cfg[2], eyebrow: 'Directory', h1: cfg[0] + ' in ' + esc(ctxName(ctx)), lede: cfg[3], sm: true, stats: [[ps.length, ' people'], [bs.length, ' companies']] });
    html += U.sec({}, listHead('', ctx, kind) + `<div class="split"><div>${kind === 'lenders' ? `<h3 style="margin-bottom:12px">Today's rates</h3>${U.rates()}<h3 class="mt40" style="margin-bottom:12px">Loan officers</h3>` : ''}${grid(ps.slice(0, 24), U.pro, 'g g2')}<h3 class="mt40" style="margin-bottom:12px">Companies</h3>${grid(bs.slice(0, 12), U.biz, 'g g3')}</div><aside class="side">${kind === 'realtors' ? U.agentCard() : `<div class="panel"><h3>Get pre-approved</h3><p class="card-m">One short form, up to 3 lenders from the rotation respond.</p><a class="btn btn-dark btn-block mt16" href="${L.list('mortgage', ctx)}">Run the numbers first</a></div>`}</aside></div>`);
    return page(cfg[0] + ' in ' + ctxName(ctx), ctx, html, { crumb: cfg[0], tail: kind });
  };
  P.realtors = proDir('realtors'); P.agents = P.realtors; P.lenders = proDir('lenders');

  /* ---------- contractors: Thumbtack-style request flow ---------- */
  P.contractors = (_, q) => {
    const ctx = E.parseG(q.g);
    const CATS = ['general-contractor', 'handyman', 'plumber', 'electrician', 'hvac-contractor', 'roofing-contractor', 'painter', 'landscaper', 'home-inspector', 'pest-control', 'custom-home-builder'];
    const bs = E.pull('businesses', ctx, { where: (b) => CATS.includes(b.cat) });
    let html = U.hero({ img: 'gen-contractors', eyebrow: 'Contractors &amp; home services', h1: 'Get quotes from local pros', em: 'in ' + esc(ctxName(ctx)) + '.', lede: 'Tell us about the job. Up to 4 matched pros who serve your address respond — compare quotes, reviews and availability.', sm: true });
    html += U.sec({}, `<div class="split"><div class="panel" id="wiz" style="padding:26px"></div><aside class="side"><div class="panel"><h3>How it works</h3><ol style="padding-left:18px;margin:0;color:var(--muted);font-size:.92rem;line-height:1.9"><li>Describe the project</li><li>We match pros whose service area covers you</li><li>Compare quotes and portable reviews</li><li>Hire, then review</li></ol></div></aside></div>`);
    html += U.sec({ tint: true }, listHead('Pros serving ' + esc(ctxName(ctx)), ctx, 'contractors') + `<div class="chips" style="margin-bottom:16px">${CATS.map((c) => `<a class="chip" href="${L.list('directory', ctx, { v: 'construction-home-services', c })}">${esc(E.idx.cat[c].name)}<small>${bs.filter((b) => b.cat === c).length}</small></a>`).join('')}</div>` + grid(bs.slice(0, 12), U.biz));
    const st = { step: 0, cat: null, scope: null, when: null, zip: ctx.node?.zip || '' };
    const render = () => {
      const w = document.getElementById('wiz'); if (!w) return;
      const steps = `<div class="steps">${[0, 1, 2, 3].map((i) => `<i class="${i <= st.step ? 'on' : ''}"></i>`).join('')}</div>`;
      const opt = (k, v, t) => `<button class="opt ${st[k] === v ? 'on' : ''}" data-k="${k}" data-v="${v}">${t}</button>`;
      if (st.step === 0) w.innerHTML = steps + `<h3>What do you need done?</h3><div class="opt-grid mt16">${CATS.map((c) => opt('cat', c, E.idx.cat[c].name)).join('')}</div>`;
      if (st.step === 1) w.innerHTML = steps + `<h3>How big is the job?</h3><div class="opt-grid mt16">${['Small repair', 'Half-day job', 'Multi-day project', 'Full remodel / build', 'Not sure — need advice'].map((x) => opt('scope', x, x)).join('')}</div>`;
      if (st.step === 2) w.innerHTML = steps + `<h3>When do you need it?</h3><div class="opt-grid mt16">${['ASAP', 'Within a week', 'Within a month', 'Flexible'].map((x) => opt('when', x, x)).join('')}</div>`;
      if (st.step === 3) w.innerHTML = steps + `<h3>Where is the job?</h3><div class="field mt16"><label for="zip">ZIP code</label><input id="zip" value="${esc(st.zip)}" inputmode="numeric" maxlength="5"></div><button class="btn btn-dark" data-go>See matched pros</button>`;
      if (st.step === 4) {
        const c = E.cities.find((x) => (x.zips || '').includes(st.zip)) || E.idx.city[ctx.city] || E.cities[0];
        const m = E.pull('businesses', E.ctx('city', c.slug), { where: (b) => b.cat === st.cat }).slice(0, 4);
        w.innerHTML = steps + `<h3>${m.length} ${esc(E.idx.cat[st.cat].name.toLowerCase())}${m.length === 1 ? '' : 's'} can help in ${esc(c.name)}</h3><p class="card-m mt8">${esc(st.scope)} · ${esc(st.when)} · ZIP ${esc(st.zip)}</p><div class="g g2 mt16">${m.map(U.biz).join('') || U.empty('No matches yet', 'We will notify you as pros join.')}</div><button class="btn btn-accent mt16" data-send>Send my request to ${m.length || 'all'} pros</button><button class="btn btn-ghost mt16" data-reset>Start over</button>`;
      }
      if (st.step === 5) w.innerHTML = `<h3>Request ready to send</h3><p class="muted mt8">In production this posts to the CLM lead router (per-lead billing to each pro). Nothing was sent from this preview.</p><button class="btn btn-ghost mt16" data-reset>New request</button>`;
    };
    return page('Contractors & quotes', ctx, html, { crumb: 'Contractors', tail: 'contractors', after: () => {
      render();
      document.getElementById('wiz').addEventListener('click', (e) => {
        const o = e.target.closest('[data-k]'); if (o) { st[o.dataset.k] = o.dataset.v; st.step++; render(); }
        if (e.target.closest('[data-go]')) { st.zip = document.getElementById('zip').value; st.step = 4; render(); }
        if (e.target.closest('[data-send]')) { st.step = 5; render(); }
        if (e.target.closest('[data-reset]')) { Object.assign(st, { step: 0, cat: null, scope: null, when: null }); render(); }
      });
    } });
  };

  /* ---------- homes / MLS search family ---------- */
  const homesPage = (preset) => (_, q) => {
    const ctx = E.parseG(q.g);
    let a = E.pull('listings', ctx, { exact: ctx.level !== 'hood', strictHood: ctx.level === 'hood' });
    const m = median(a) || countyOf(ctx).home;
    const t = preset.t || q.t;
    if (t) a = a.filter((l) => l.type === t);
    if (preset.fsbo) a = a.filter((l) => l.fsbo);
    if (preset.pred) a = a.filter(preset.pred);
    if (q.w) { const w = WAYS.find((x) => x[0] === q.w); if (w) a = a.filter((l) => w[2](l, m)); }
    if (q.min) a = a.filter((l) => l.price >= +q.min); if (q.max) a = a.filter((l) => l.price <= +q.max); if (q.bd) a = a.filter((l) => l.beds >= +q.bd);
    const s = q.s || 'smartbuy'; a.sort((x, y) => (s === 'price' ? x.price - y.price : s === 'price-desc' ? y.price - x.price : s === 'new' ? x.dom - y.dom : y.smartbuy - x.smartbuy));
    const near = ctx.level === 'city' ? E.pull('listings', ctx, { where: (l) => l.city !== ctx.city && (!t || l.type === t) && (!preset.fsbo || l.fsbo) && (!preset.pred || preset.pred(l)), radius: 15 }).slice(0, 8) : [];
    const base = preset.route; const keep = { ...q }; delete keep.g;
    const title = (preset.title || (t ? t + ' homes' : q.w ? WAYS.find((x) => x[0] === q.w)?.[1] + ' homes' : 'Homes for sale')) + ' in ' + esc(ctxName(ctx));
    const f = (k, opts) => `<select data-f="${k}" style="padding:9px 12px;border:1px solid var(--border);border-radius:999px;background:#fff">${opts.map(([v, tx]) => `<option value="${v}" ${String(q[k] || '') === String(v) ? 'selected' : ''}>${tx}</option>`).join('')}</select>`;
    let html = '';
    if (preset.hero) html += U.hero({ img: preset.hero, eyebrow: preset.eyebrow, h1: title, lede: preset.lede, sm: true });
    html += U.sec({}, (preset.hero ? '' : '') + listHead(preset.hero ? int(a.length) + ' results' : title, ctx, base, keep) +
      `<div class="row" style="margin-bottom:18px">${preset.t ? '' : f('t', [['', 'Any type'], ['Single Family', 'Single family'], ['Condo', 'Condo'], ['Townhome', 'Townhome'], ['Land', 'Land'], ['New Construction', 'New construction']])}
       ${f('w', [['', 'Any buyer path'], ...WAYS.map(([k, n]) => [k, n])])}${f('max', [['', 'Any price'], [500000, 'Under $500K'], [800000, 'Under $800K'], [1200000, 'Under $1.2M'], [2500000, 'Under $2.5M']])}${f('bd', [['', 'Any beds'], [2, '2+ beds'], [3, '3+ beds'], [4, '4+ beds'], [5, '5+ beds']])}${f('s', [['smartbuy', 'Sort: SmartBuy'], ['price', 'Price low–high'], ['price-desc', 'Price high–low'], ['new', 'Newest']])}
       <span class="note">${a.length} homes · ${esc(B.mls)}</span></div>` + (a.length ? grid(a.slice(0, 40), U.listing) : U.empty('No homes match', 'Widen the filters or save an alert.')));
    if (near.length) html += U.sec({ tint: true, eyebrow: 'Area of influence', title: 'Nearby homes outside ' + esc(ctx.name) }, grid(near, U.listing));
    if (preset.extra) html += preset.extra(ctx);
    return page(title.replace(/&amp;/g, '&'), ctx, html, { crumb: preset.crumb || 'Homes', tail: preset.tail || 'homes-for-sale', after: () => document.querySelectorAll('select[data-f]').forEach((sel) => sel.addEventListener('change', () => { const p = new URLSearchParams(location.hash.split('?')[1] || ''); sel.value ? p.set(sel.dataset.f, sel.value) : p.delete(sel.dataset.f); location.hash = '#/' + base + '?' + p; })) });
  };
  P.homes = homesPage({ route: 'homes' }); P.mls = P.homes;
  P['new-construction'] = homesPage({ route: 'new-construction', t: 'New Construction', title: 'New construction', hero: 'gen-new_construction', eyebrow: 'Builders &amp; new communities', lede: 'New builds and to-be-built homes, with the builders who serve this area.', crumb: 'New construction', tail: 'new-construction',
    extra: (ctx) => U.sec({}, `<h2 class="sec-title" style="margin-bottom:16px">Builders serving ${esc(ctxName(ctx))}</h2>` + grid(E.pull('businesses', ctx, { where: (b) => ['home-builder', 'custom-home-builder'].includes(b.cat) }).slice(0, 8), U.biz)) });
  P.land = homesPage({ route: 'land', t: 'Land', title: 'Land for sale', hero: 'gen-land', eyebrow: 'Lots &amp; acreage', lede: 'Buildable lots, acreage and ranch land — with excavators, builders and lenders who do land loans.', crumb: 'Land', tail: 'land-for-sale',
    extra: (ctx) => U.sec({}, `<h2 class="sec-title" style="margin-bottom:16px">Build team for ${esc(ctxName(ctx))}</h2>` + grid(E.pull('businesses', ctx, { where: (b) => ['custom-home-builder', 'general-contractor', 'mortgage-lender'].includes(b.cat) }).slice(0, 8), U.biz)) });
  P.fsbo = homesPage({ route: 'fsbo', fsbo: true, title: 'For sale by owner', hero: 'gen-fsbo', eyebrow: 'FSBO', lede: 'Homes listed directly by their owners. Contact the seller, or bring your own agent.', crumb: 'FSBO', tail: 'fsbo',
    extra: () => U.sec({ dark: true, eyebrow: 'Selling?', title: 'List your home free', sub: 'Free FSBO listing, flat-fee MLS, or full concierge.' }, `<a class="btn btn-accent" href="#/sell">Compare FSBO plans</a>`) });

  P.listing = ([id]) => {
    const l = E.idx.listings[id]; if (!l || !E.inScope(l.county)) return P.notfound();
    const ctx = l.hood ? E.ctx('hood', l.hood) : E.ctx('city', l.city); const c = E.idx.city[l.city];
    const sim = E.pull('listings', E.ctx('city', l.city), { where: (x) => x.id !== id && Math.abs(x.price - l.price) < l.price * 0.35, radius: 12 }).slice(0, 4);
    const sch = E.pull('schools', { ...ctx, lat: l.lat, lon: l.lon }).slice(0, 3);
    const pr = E.D.rates['30yr'] / 1200, loan = l.price * 0.8, pmt = (loan * pr) / (1 - Math.pow(1 + pr, -360));
    let html = `<div class="wrap" style="padding-top:20px"><div class="gallery"><div ${bg(l.img)}></div><div ${bg('home-interior-1')}></div><div ${bg('home-interior-2')}></div></div></div>`;
    html += U.sec({}, `<div class="split"><div>
      <div class="row"><span class="tag ${l.smartbuy >= 85 ? 'acc' : ''}">SmartBuy ${l.smartbuy}</span><span class="tag">${esc(l.status)}</span><span class="tag">${l.fsbo ? 'For sale by owner' : esc(l.mls) + ' #' + l.mlsno}</span><span class="tag">sample listing</span></div>
      <div class="price tnum mt16" style="font-size:2.4rem">${money0(l.price)}</div><h1 style="font-size:1.4rem;margin-top:6px">${esc(l.addr)}, ${esc(c.name)}, UT ${esc(c.zip)}</h1>
      <p class="muted mt8">${l.hood ? `<a href="${L.hood(l.hood)}">${esc(E.idx.hood[l.hood].name)}</a> · ` : ''}<a href="${L.city(c.slug)}">${esc(c.name)}</a> · <a href="${L.county(c.county)}">${esc(E.countyName(c.county))}</a></p>
      <div class="facts mt24" style="grid-template-columns:repeat(4,1fr)">${(l.type === 'Land' ? [['Acres', l.acres], ['Type', 'Land'], ['Days listed', l.dom], ['Price/acre', money(l.price / l.acres)]] : [['Beds', l.beds], ['Baths', l.baths], ['Sq ft', int(l.sqft)], ['Built', l.year], ['Type', l.type], ['Lot', l.acres + ' ac'], ['Days listed', l.dom], ['$/sq ft', '$' + Math.round(l.price / l.sqft)]]).map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join('')}</div>
      <h3 class="mt40">Monthly cost estimate</h3><p class="muted mt8">20% down at ${E.D.rates['30yr']}% (sample rate): about <b class="tnum" style="color:var(--ink)">${money0(pmt)}/mo</b> principal &amp; interest. <a class="acc" href="#/mortgage?price=${l.price}">Customize →</a></p>
      <h3 class="mt40" style="margin-bottom:12px">Nearby schools</h3><div class="g g3">${sch.map(U.school).join('')}</div>
      <h3 class="mt40" style="margin-bottom:12px">Similar homes nearby</h3>${grid(sim, U.listing, 'g g2')}
    </div><aside class="side"><div class="panel"><h3>Tour this home</h3><div class="field"><label>Name</label><input placeholder="Your name"></div><div class="field"><label>Phone or email</label><input placeholder="you@email.com"></div><button class="btn btn-dark btn-block">Request a tour</button><p class="note mt8">Routes to ${l.fsbo ? 'the owner' : 'the Lawson Team'}. Preview only — nothing is sent.</p></div>${U.agentCard()}</aside></div>`);
    return page(l.addr + ', ' + c.name, ctx, html, { crumb: l.addr, tail: 'homes-for-sale/' + l.addr.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + l.mlsno });
  };

  P.sell = () => {
    const tiers = [['List Your Home Free', '$0', ['Public FSBO listing', 'Up to 8 photos', 'Buyer contact form', 'Realtor fallback after 90 days (opt-out anytime)']],
      ['FSBO Plus MLS', '$399', ['Everything in Free', `Listed on ${B.mls.split(' · ').slice(0, 2).join(' / ')} via our broker-of-record`, 'Syndicated across the MLS IDX network', 'Up to 25 photos', 'Utah REPC templates', '6-month term']],
      ['FSBO Concierge', '$1,499', ['Everything in Plus MLS', 'Pro photos + 3D tour', 'CMA from our data warehouse', 'Priority placement', 'Buyer-inquiry triage', 'E-sign + closing coordination']],
      ['List With Our Top Realtor', 'Full service', [`Handoff to ${B.featuredAgent.name}`, B.featuredAgent.team, 'Traditional full-service listing', 'Pro-rated refund of Concierge']]];
    let html = U.hero({ img: 'gen-fsbo', eyebrow: 'Sell', h1: 'Sell your way.', em: 'From free FSBO to full service.', lede: 'Four plans on one platform. Your listing appears on every CLM site that covers your address.', sm: true });
    html += U.sec({}, `<div class="g g4">${tiers.map(([t, p, f], i) => `<div class="tier ${i === 1 ? 'hi' : ''}"><p class="sec-eyebrow">${i === 1 ? 'Most popular' : 'Tier ' + i}</p><h3>${t}</h3><div class="price">${p}</div><ul>${f.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn ${i === 1 ? 'btn-accent' : 'btn-ghost'} mt16" href="#/sell">Choose</a></div>`).join('')}</div><p class="note mt16">Plans and prices per the CLM FSBO product-tier spec. Checkout is not wired in this preview.</p>`);
    html += U.sec({ tint: true, title: 'Prep your home with local pros' }, grid(E.pull('businesses', E.ctx('state'), { where: (b) => ['home-inspector', 'painter', 'landscaper', 'handyman'].includes(b.cat) }).slice(0, 8), U.biz));
    return page('Sell your home', E.ctx('state'), html, { crumb: 'Sell', tail: 'sell' });
  };

  /* ---------- community feeds ---------- */
  const feed = (type, cfg) => (_, q) => {
    const ctx = E.parseG(q.g); let a = E.pull(type, ctx); if (cfg.filter) a = cfg.filter(a, q);
    const chips = cfg.chips ? cfg.chips(E.pull(type, ctx), q, ctx) : '';
    const html = (cfg.hero ? U.hero({ img: cfg.hero, eyebrow: cfg.eyebrow, h1: cfg.title + ' in ' + esc(ctxName(ctx)), lede: cfg.lede, sm: true }) : '') +
      U.sec({}, listHead(cfg.hero ? int(a.length) + ' results' : cfg.title + ' in ' + esc(ctxName(ctx)), ctx, cfg.route, cfg.keep ? cfg.keep(q) : {}, cfg.cta || '') + chips + (cfg.layout ? cfg.layout(a) : grid(a.slice(0, 48), cfg.card)) + (cfg.foot || ''));
    return page(cfg.title + ' in ' + ctxName(ctx), ctx, html, { crumb: cfg.title, tail: cfg.tail });
  };
  const kindChips = (key, route) => (all, q, ctx) => `<div class="chips" style="margin-bottom:18px"><a class="chip ${!q.k ? 'on' : ''}" href="${L.list(route, ctx)}">All</a>${[...new Set(all.map((x) => x[key]))].map((k) => `<a class="chip ${q.k === k ? 'on' : ''}" href="${L.list(route, ctx, { k })}">${esc(slugTitle(k))}<small>${all.filter((x) => x[key] === k).length}</small></a>`).join('')}</div>`;
  P.events = feed('events', { route: 'events', title: 'Events', hero: 'gen-events', eyebrow: 'Events', lede: 'Everything happening nearby — concerts, markets, open houses, workshops. Businesses and providers post here from their profiles.', card: U.event, tail: 'events',
    filter: (a, q) => (q.k ? a.filter((e) => e.kind === q.k) : a), keep: (q) => (q.k ? { k: q.k } : {}), chips: kindChips('kind', 'events'),
    layout: (a) => { const by = {}; a.forEach((e) => (by[e.date.slice(0, 7)] ||= []).push(e)); return Object.entries(by).sort().map(([m, es]) => `<h3 class="mt24" style="margin-bottom:12px">${new Date(m + '-15').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>${grid(es.slice(0, 16), U.event)}`).join(''); },
    cta: '<a class="btn btn-dark btn-sm" href="#/claim">Post an event</a>' });
  P.news = feed('news', { route: 'news', title: 'Real Estate News', card: (n) => U.news(n), tail: 'news', filter: (a, q) => (q.k ? a.filter((n) => n.cat === q.k) : a), keep: (q) => (q.k ? { k: q.k } : {}), chips: kindChips('cat', 'news'),
    layout: (a) => (a.length ? `<div class="news-lead">${U.news(a[0], true)}<div>${a.slice(1, 6).map(U.newsRow).join('')}</div></div><div class="g g4 mt40">${a.slice(6, 46).map((n) => U.news(n)).join('')}</div>` : U.empty('No stories yet')),
    foot: '<p class="note mt24">Stories originate on Inside Utah Real Estate and syndicate here as site-specific rewrites with canonical links.</p>' });
  P.deals = feed('deals', { route: 'deals', title: 'Deals', hero: 'gen-deals', eyebrow: 'Local deals', lede: 'Offers from directory businesses. Claim in a tap; redeem in store.', card: U.deal, tail: 'deals' });
  P.jobs = feed('jobs', { route: 'jobs', title: 'Jobs', hero: 'gen-jobs', eyebrow: 'Local jobs', lede: 'Openings posted by directory businesses, sorted by distance.', card: U.job, tail: 'jobs', layout: (a) => grid(a.slice(0, 60), U.job, 'g g3'), cta: '<a class="btn btn-dark btn-sm" href="#/claim">Post a job</a>' });
  P.classifieds = feed('classifieds', { route: 'classifieds', title: 'Classifieds', hero: 'tile_classifieds', eyebrow: 'Classifieds', lede: 'Neighbors buying and selling — vehicles, furniture, gear, rooms for rent.', card: U.classified, tail: 'classifieds',
    filter: (a, q) => (q.k ? a.filter((c) => c.cat === q.k) : a), keep: (q) => (q.k ? { k: q.k } : {}), chips: (all, q, ctx) => `<div class="chips" style="margin-bottom:18px"><a class="chip ${!q.k ? 'on' : ''}" href="${L.list('classifieds', ctx)}">All</a>${[...new Set(all.map((x) => x.cat))].map((k) => `<a class="chip ${q.k === k ? 'on' : ''}" href="${L.list('classifieds', ctx, { k })}">${esc(k)}</a>`).join('')}</div>`, cta: '<a class="btn btn-dark btn-sm" href="#/claim">Post an ad</a>' });
  P.marketplace = feed('market', { route: 'marketplace', title: 'Shop local', hero: 'gen-marketplace', eyebrow: 'Marketplace', lede: 'Products and services from every business and provider in the directory, plus neighbors selling locally. Pickup or ship.', card: U.item, tail: 'marketplace',
    filter: (a, q) => (q.k === 'business' ? a.filter((m) => m.seller_type === 'business') : q.k === 'person' ? a.filter((m) => m.seller_type === 'person') : a), keep: (q) => (q.k ? { k: q.k } : {}),
    chips: (all, q, ctx) => `<div class="chips" style="margin-bottom:18px"><a class="chip ${!q.k ? 'on' : ''}" href="${L.list('marketplace', ctx)}">All</a><a class="chip ${q.k === 'business' ? 'on' : ''}" href="${L.list('marketplace', ctx, { k: 'business' })}">From businesses</a><a class="chip ${q.k === 'person' ? 'on' : ''}" href="${L.list('marketplace', ctx, { k: 'person' })}">From neighbors</a></div>`,
    layout: (a) => `<div class="masonry">${a.slice(0, 48).map(U.item).join('')}</div>`, cta: '<a class="btn btn-dark btn-sm" href="#/claim">Sell something</a>' });
  P['things-to-do'] = (_, q) => {
    const ctx = E.parseG(q.g); let a = E.pull('activities', ctx, { radius: 60 }); const all = a; if (q.k) a = a.filter((x) => x.kind === q.k);
    const nm = esc(ctxName(ctx)); const t = q.k ? esc(slugTitle(q.k)) + ' near ' + nm : 'Things to do near ' + nm;
    const html = U.hero({ img: E.heroFor(ctx), eyebrow: 'Area of influence · up to 60 miles', h1: t, lede: `When someone says “${esc(q.k || 'skiing')} in ${nm},” they mean everything within a reasonable drive — not just inside city limits.`, sm: true }) +
      U.sec({}, listHead(int(a.length) + ' places', ctx, 'things-to-do', q.k ? { k: q.k } : {}) + `<div class="chips" style="margin-bottom:18px"><a class="chip ${!q.k ? 'on' : ''}" href="${L.list('things-to-do', ctx)}">All</a>${[...new Set(all.map((x) => x.kind))].map((k) => `<a class="chip ${q.k === k ? 'on' : ''}" href="${L.list('things-to-do', ctx, { k })}">${esc(slugTitle(k))}</a>`).join('')}</div>` + grid(a, U.activity, 'g g3') + '<p class="note mt16">Places are real; distances are straight-line from the selected location.</p>') +
      U.sec({ tint: true, title: 'Events near ' + nm }, rail(E.pull('events', ctx).slice(0, 10), U.event));
    return page(t, ctx, html, { crumb: 'Things to do', tail: 'things-to-do' + (q.k ? '/' + q.k : '') });
  };
  P.lifestyle = P['things-to-do'];

  /* detail pages */
  const detail = (type, fn) => ([id]) => { const x = E.idx[type][id]; if (!x || !E.inScope(x.county)) return P.notfound(); return fn(x, x.city ? E.ctx('city', x.city) : E.ctx('county', x.county)); };
  P.event = detail('events', (e, ctx) => {
    const d = new Date(e.date + 'T12:00:00');
    let html = U.hero({ img: E.evImg(e), eyebrow: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ' · ' + esc(e.time), h1: esc(e.title), lede: esc(e.venue) + (e.city ? ', ' + esc(E.cityName(e.city)) : ''), stats: [[esc(e.price), ' admission'], [int(e.going), ' interested']], sm: true });
    html += U.sec({}, `<div class="split"><div><h2 class="sec-title" style="font-size:1.5rem">About this event</h2><p class="muted mt8">${esc(e.kind)} at ${esc(e.venue)}. Hosts post events from their directory profile; they appear on every CLM site whose area includes the venue.</p>
      <h3 class="mt40" style="margin-bottom:12px">More events nearby</h3>${grid(E.pull('events', ctx).filter((x) => x.id !== e.id).slice(0, 4), U.event, 'g g2')}
      <h3 class="mt40" style="margin-bottom:12px">Eat &amp; drink nearby</h3>${grid(E.pull('businesses', ctx, { where: (b) => b.vertical === 'food-beverage' }).slice(0, 4), U.biz, 'g g2')}</div>
      <aside class="side"><div class="panel"><h3>${esc(e.price)}</h3><button class="btn btn-dark btn-block">I'm interested</button><button class="btn btn-ghost btn-block mt8">Add to calendar</button><p class="note mt8">Sample event.</p></div></aside></div>`);
    return page(e.title, ctx, html, { crumb: e.title, tail: 'events/' + e.id.toLowerCase() });
  });
  P.deal = detail('deals', (d, ctx) => { const b = E.idx.businesses[d.biz];
    const html = U.hero({ img: E.bizImg2(b), eyebrow: d.pct + '% off · ' + esc(b.name), h1: esc(d.title), lede: 'Ends ' + fmtDate(d.ends, { month: 'long', day: 'numeric' }) + ' · ' + int(d.sold) + ' claimed', sm: true }) +
      U.sec({}, `<div class="split"><div><h3 style="margin-bottom:12px">From ${esc(b.name)}</h3>${U.biz(b)}<h3 class="mt40" style="margin-bottom:12px">More deals nearby</h3>${grid(E.pull('deals', ctx).filter((x) => x.id !== d.id).slice(0, 4), U.deal, 'g g2')}</div><aside class="side"><div class="panel"><div class="price">$${d.price}</div><button class="btn btn-accent btn-block mt16">Claim deal</button><p class="note mt8">Sample deal — checkout not wired.</p></div></aside></div>`);
    return page(d.title, ctx, html, { crumb: 'Deal', tail: 'deals/' + d.id.toLowerCase() }); });
  P.job = detail('jobs', (j, ctx) => { const b = E.idx.businesses[j.biz];
    const html = U.hero({ img: 'gen-jobs', eyebrow: esc(j.type) + ' · ' + esc(j.pay), h1: esc(j.title), lede: esc(b.name) + ' · ' + esc(E.cityName(j.city)), sm: true }) +
      U.sec({}, `<div class="split"><div><h3>About the role</h3><p class="muted mt8">${esc(j.title)} at ${esc(b.name)}, a ${esc(E.idx.cat[b.cat].name.toLowerCase())} in ${esc(E.cityName(j.city))}. Posted ${ago(j.posted)}.</p><h3 class="mt40" style="margin-bottom:12px">Living near this job</h3>${grid(E.pull('listings', ctx, { exact: true }).slice(0, 4), U.listing, 'g g2')}</div><aside class="side"><div class="panel"><h3>${esc(j.pay)}</h3><button class="btn btn-dark btn-block">Apply</button><p class="note mt8">Sample job.</p></div>${U.biz(b)}</aside></div>`);
    return page(j.title, ctx, html, { crumb: 'Job', tail: 'jobs/' + j.id.toLowerCase() }); });
  P.item = detail('market', (m, ctx) => { const b = m.seller ? E.idx.businesses[m.seller] : null;
    const html = U.sec({}, `<div class="split"><div><div class="card-img" style="border-radius:20px;aspect-ratio:4/3" ${bg(b ? E.bizImg(b) : 'tile_classifieds')}></div><h3 class="mt40" style="margin-bottom:12px">More from shops nearby</h3><div class="masonry">${E.pull('market', ctx).filter((x) => x.id !== m.id).slice(0, 8).map(U.item).join('')}</div></div>
      <aside class="side"><div class="panel"><h1 style="font-size:1.4rem">${esc(m.title)}</h1><div class="price mt8">${money0(m.price)}</div><p class="card-m mt8">${m.pickup ? 'Local pickup' : ''}${m.ship ? ' · Ships' : ''} · ${esc(E.cityName(m.city))}</p><button class="btn btn-dark btn-block mt16">Message seller</button><button class="btn btn-ghost btn-block mt8">Save</button><p class="note mt8">Sample item.</p></div>${b ? U.biz(b) : `<div class="panel"><div class="row"><div class="av">${initials(m.seller_name)}</div><div><b>${esc(m.seller_name)}</b><p class="card-m">Neighbor seller</p></div></div></div>`}</aside></div>`);
    return page(m.title, ctx, html, { crumb: m.title, tail: 'marketplace/' + m.id.toLowerCase() }); });
  P.classified = detail('classifieds', (c, ctx) => {
    const html = U.sec({}, `<div class="split"><div><div class="card-img" style="border-radius:20px" ${bg('tile_classifieds')}></div><h3 class="mt40" style="margin-bottom:12px">More classifieds nearby</h3>${grid(E.pull('classifieds', ctx).filter((x) => x.id !== c.id).slice(0, 6), U.classified, 'g g3')}</div><aside class="side"><div class="panel"><span class="tag">${esc(c.cat)}</span><h1 style="font-size:1.4rem;margin-top:8px">${esc(c.title)}</h1><div class="price mt8">${money0(c.price)}</div><p class="card-m mt8">${esc(c.seller)} · ${esc(E.cityName(c.city))} · ${ago(c.posted)}</p><button class="btn btn-dark btn-block mt16">Message seller</button><p class="note mt8">Sample ad.</p></div></aside></div>`);
    return page(c.title, ctx, html, { crumb: 'Classified', tail: 'classifieds/' + c.id.toLowerCase() }); });
  P.article = detail('news', (n, ctx) => {
    const rel = E.pull('news', ctx).filter((x) => x.id !== n.id).slice(0, 4);
    const html = U.hero({ img: E.newsImg(n), eyebrow: esc(slugTitle(n.cat)) + ' · ' + fmtDate(n.date, { month: 'long', day: 'numeric', year: 'numeric' }), h1: esc(n.title), lede: esc(n.dek), sm: true }) +
      U.sec({}, `<div class="split"><article style="max-width:68ch;font-size:1.08rem;line-height:1.75"><p class="muted">By ${esc(n.author)} · ${n.read} min read · <span class="tag">sample story</span></p>
      <p class="mt24">This is the Real Estate News article template. In production the body is written once on Inside Utah Real Estate and syndicated to ${esc(B.name)} as a site-specific rewrite with a canonical link back to the origin.</p>
      <p class="mt16">Each article is geo-tagged to ${n.city ? esc(E.cityName(n.city)) : n.county ? esc(E.countyName(n.county)) : 'Utah'}, so it automatically appears in the news feed of that place and every nearby city within ${E.R.news} miles.</p>
      <h3 class="mt40" style="margin-bottom:12px">Homes mentioned nearby</h3>${grid(E.pull('listings', ctx, { exact: true }).slice(0, 2), U.listing, 'g g2')}</article>
      <aside class="side"><div class="panel"><h3>Related</h3>${rel.map(U.newsRow).join('')}</div>${U.agentCard()}</aside></div>`);
    return page(n.title, ctx, html, { crumb: 'News', tail: 'news/' + n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60) }); });

  /* ---------- mortgage calculators (working) ---------- */
  P.mortgage = (_, q) => {
    const ctx = E.parseG(q.g); const county = countyOf(ctx); const price = +q.price || (ctx.level === 'state' && !B.scope ? 550000 : county.home);
    const r = E.D.rates;
    const html = U.hero({ img: 'gen-mortgage', eyebrow: 'Mortgage calculators', h1: 'What will it cost', em: 'in ' + esc(ctxName(ctx)) + '?', lede: 'Payment, affordability, refinance and rent-vs-buy — pre-filled with the local median and today\'s sample rates.', sm: true }) +
      `<div class="subnav"><div class="wrap"><div class="pill-toggle" id="ctabs">${['Payment', 'Affordability', 'Refinance', 'Rent vs buy'].map((t, i) => `<button class="${i ? '' : 'on'}" data-t="${i}">${t}</button>`).join('')}</div></div></div>` +
      U.sec({}, `<div class="split"><div class="panel" id="calc" style="padding:26px"></div><aside class="side"><div class="calc-out" id="out"></div><div class="panel"><h3>Rates (sample)</h3><p class="card-m">30-yr ${r['30yr']}% · 15-yr ${r['15yr']}% · Jumbo ${r.jumbo}% · FHA ${r.fha}% · VA ${r.va}%</p><a class="btn btn-dark btn-block mt16" href="#/lenders${ctx.level !== 'state' ? '?g=' + E.gKey(ctx) : ''}">Compare lenders</a></div></aside></div>`) +
      U.sec({ tint: true, title: 'Lenders serving ' + esc(ctxName(ctx)) }, grid(E.pull('providers', ctx, { where: (p) => ['mortgage-lender', 'mortgage-broker'].includes(p.cat) }).slice(0, 4), U.pro));
    const pm = (P0, rate, yrs) => { const i = rate / 1200, n = yrs * 12; return i ? (P0 * i) / (1 - Math.pow(1 + i, -n)) : P0 / n; };
    const F = (id, label, v, min, max, step, fmt) => `<div class="field"><div class="range-row"><label for="${id}">${label}</label><b class="tnum" id="${id}-v"></b></div><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${v}" data-fmt="${fmt}"></div>`;
    const tabs = [
      () => F('price', 'Home price', price, 100000, 5000000, 5000, '$') + F('down', 'Down payment', 20, 0, 60, 1, '%') + F('rate', 'Interest rate', r['30yr'], 2, 10, 0.01, 'r') + F('term', 'Term (years)', 30, 10, 30, 5, 'y') + F('tax', 'Property tax (annual %)', 0.55, 0.3, 1.2, 0.01, 'r') + F('ins', 'Insurance ($/yr)', 1600, 400, 8000, 100, '$') + F('hoa', 'HOA ($/mo)', 0, 0, 1500, 25, '$'),
      () => F('inc', 'Household income ($/yr)', county.income || 95000, 30000, 600000, 1000, '$') + F('debt', 'Monthly debts', 600, 0, 6000, 50, '$') + F('dp', 'Cash for down payment', 80000, 0, 1500000, 5000, '$') + F('rate', 'Interest rate', r['30yr'], 2, 10, 0.01, 'r'),
      () => F('bal', 'Loan balance', 420000, 50000, 3000000, 5000, '$') + F('cur', 'Current rate', 7.25, 2, 10, 0.01, 'r') + F('rate', 'New rate', r['30yr'], 2, 10, 0.01, 'r') + F('cost', 'Closing costs', 6000, 0, 40000, 500, '$') + F('term', 'New term (years)', 30, 10, 30, 5, 'y'),
      () => F('price', 'Home price', price, 100000, 5000000, 5000, '$') + F('rent', 'Monthly rent', county.rent || 1800, 500, 15000, 50, '$') + F('rate', 'Interest rate', r['30yr'], 2, 10, 0.01, 'r') + F('apr', 'Home appreciation (%/yr)', 3, 0, 8, 0.5, 'r') + F('yrs', 'Years you will stay', 7, 1, 20, 1, 'y'),
    ];
    let t = 0;
    const calc = () => {
      const v = (id) => +(document.getElementById(id)?.value || 0);
      document.querySelectorAll('#calc input[type=range]').forEach((i) => { const f = i.dataset.fmt; document.getElementById(i.id + '-v').textContent = f === '$' ? money0(+i.value) : f === '%' ? i.value + '%' : f === 'r' ? (+i.value).toFixed(2) + '%' : i.value + ' yrs'; });
      const o = document.getElementById('out'); let h = '';
      if (t === 0) { const loan = v('price') * (1 - v('down') / 100), pi = pm(loan, v('rate'), v('term')), tx = (v('price') * v('tax')) / 1200, ins = v('ins') / 12, hoa = v('hoa'), tot = pi + tx + ins + hoa;
        h = `<small>Estimated monthly payment</small><b class="tnum">${money0(tot)}</b><div class="bar mt16"><i style="width:${(pi / tot) * 100}%;background:var(--accent)"></i><i style="width:${(tx / tot) * 100}%;background:#8fb3c9"></i><i style="width:${(ins / tot) * 100}%;background:#9ec79a"></i><i style="width:${(hoa / tot) * 100}%;background:#d9a5c4"></i></div><p class="mt16" style="font-size:.9rem;line-height:1.9">Principal &amp; interest ${money0(pi)}<br>Property tax ${money0(tx)}<br>Insurance ${money0(ins)}<br>HOA ${money0(hoa)}<br><small>Loan amount ${money0(loan)}</small></p>`; }
      if (t === 1) { const maxPmt = Math.max(0, (v('inc') / 12) * 0.43 - v('debt')), i = v('rate') / 1200, n = 360, loan = (maxPmt * 0.82 * (1 - Math.pow(1 + i, -n))) / i, max = loan + v('dp');
        h = `<small>You can likely afford up to</small><b class="tnum">${money(max)}</b><p class="mt16" style="font-size:.9rem;line-height:1.9">Max housing payment ${money0(maxPmt)}/mo (43% DTI)<br>Loan ${money0(loan)} + down ${money0(v('dp'))}<br>${esc(county.name)} median ${money0(county.home)} — ${max >= county.home ? 'within reach' : money0(county.home - max) + ' short'}</p>`; }
      if (t === 2) { const a = pm(v('bal'), v('cur'), 30), b = pm(v('bal'), v('rate'), v('term')), save = a - b, be = save > 0 ? Math.ceil(v('cost') / save) : null;
        h = `<small>Monthly savings</small><b class="tnum">${money0(save)}</b><p class="mt16" style="font-size:.9rem;line-height:1.9">Current P&amp;I ${money0(a)}<br>New P&amp;I ${money0(b)}<br>${be ? 'Break-even in ' + be + ' months' : 'No break-even at these numbers'}</p>`; }
      if (t === 3) { const loan = v('price') * 0.8, pi = pm(loan, v('rate'), 30), own = pi + (v('price') * 0.0075) / 12, yrs = v('yrs'), eq = v('price') * Math.pow(1 + v('apr') / 100, yrs) - v('price'), rentTot = v('rent') * 12 * yrs * 1.03, ownTot = own * 12 * yrs - eq;
        h = `<small>Over ${yrs} years, ${ownTot < rentTot ? 'buying' : 'renting'} wins by</small><b class="tnum">${money(Math.abs(rentTot - ownTot))}</b><p class="mt16" style="font-size:.9rem;line-height:1.9">Own: ${money0(own)}/mo, ${money(eq)} appreciation<br>Rent: ${money0(v('rent'))}/mo (+3%/yr)</p>`; }
      o.innerHTML = h + '<p class="note mt8" style="color:#aaa">Estimates only. Not a loan offer.</p>';
    };
    const draw = () => { document.getElementById('calc').innerHTML = tabs[t](); calc(); };
    return page('Mortgage calculators', ctx, html, { crumb: 'Mortgage', tail: 'mortgage-calculator', after: () => {
      draw(); document.getElementById('calc').addEventListener('input', calc);
      document.getElementById('ctabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; t = +b.dataset.t; document.querySelectorAll('#ctabs button').forEach((x) => x.classList.toggle('on', x === b)); draw(); });
    } });
  };
  P['mortgage-calculator'] = P.mortgage;

  /* ---------- market data ---------- */
  P['market-data'] = (_, q) => {
    const ctx = E.parseG(q.g); const cs = ctx.level === 'state' ? E.counties : ctx.counties.map((k) => E.idx.county[k]);
    const cities = E.cities.filter((c) => cs.some((k) => k.slug === c.county)).slice(0, 40);
    const html = U.hero({ img: 'tile_market_data', eyebrow: 'Market data', h1: esc(ctxName(ctx)) + ' housing market', lede: 'County figures from the CLM master database; city rows add sample-listing medians until the MLS stats feed is connected.', sm: true }) +
      U.sec({}, listHead('', ctx, 'market-data') + `<div class="tbl-wrap"><table><thead><tr><th>County</th><th class="n">Median home</th><th class="n">YoY</th><th class="n">DOM</th><th class="n">Active</th><th class="n">Median rent</th><th class="n">Income</th></tr></thead><tbody>${[...cs].sort((a, b) => b.home - a.home).map((c) => `<tr><td><a href="${L.county(c.slug)}"><b>${esc(c.name)}</b></a></td><td class="n">${money0(c.home)}</td><td class="n">${c.yoy}%</td><td class="n">${c.dom}</td><td class="n">${int(c.active)}</td><td class="n">${money0(c.rent)}</td><td class="n">${money0(c.income)}</td></tr>`).join('')}</tbody></table></div><p class="note mt8">Source: CLM master database (13_county_data).</p>
      <h3 class="mt40" style="margin-bottom:12px">Cities</h3><div class="tbl-wrap"><table><thead><tr><th>City</th><th>County</th><th class="n">Population</th><th class="n">Median income</th><th class="n">Sample listings</th><th class="n">Sample median</th></tr></thead><tbody>${cities.map((c) => { const l = E.D.listings.filter((x) => x.city === c.slug); return `<tr><td><a href="${L.city(c.slug)}"><b>${esc(c.name)}</b></a></td><td>${esc(E.countyName(c.county))}</td><td class="n">${int(c.pop)}</td><td class="n">${c.income ? money0(c.income) : '—'}</td><td class="n">${l.length}</td><td class="n">${l.length ? money0(median(l)) : '—'}</td></tr>`; }).join('')}</tbody></table></div>`);
    return page('Market data', ctx, html, { crumb: 'Market data', tail: 'market-data' });
  };
  P.market = P['market-data'];

  /* ---------- relocation ---------- */
  P.relocation = (_, q) => {
    const ctx = E.parseG(q.g || (B.primaryCity ? 'city:' + B.primaryCity : 'city:salt-lake-city')); const county = countyOf(ctx);
    const states = ['California', 'Washington', 'Oregon', 'Arizona', 'Nevada', 'Texas', 'Colorado', 'Idaho', 'New York', 'Illinois', 'Florida', 'New Jersey'];
    const from = q.from || 'California'; const nm = esc(ctxName(ctx));
    const html = U.hero({ img: 'tile_relocation', eyebrow: 'Relocation', h1: 'Moving from ' + esc(from), em: 'to ' + nm + '.', lede: 'Neighborhoods, schools, commute, climate and the people who help you land — for this exact place.', sm: true }) +
      U.sec({}, `<div class="row" style="margin-bottom:22px"><label class="field" style="margin:0"><span class="sr">From</span><select id="from">${states.map((s) => `<option ${s === from ? 'selected' : ''}>${s}</option>`).join('')}</select></label><span class="muted">to</span>${U.geoPicker(ctx, 'relocation', { from })}</div>
      <div class="kpis"><div class="kpi"><small>Median home (${esc(county.name)})</small><b>${money0(county.home)}</b></div><div class="kpi"><small>Median rent</small><b>${money0(county.rent)}</b></div><div class="kpi"><small>Drive to SLC</small><b>${county.slc_min} min</b></div><div class="kpi"><small>Elevation</small><b>${int(county.elev[0])}–${int(county.elev[1])} ft</b></div></div>
      <div class="g g2 mt24 one-m"><div class="panel"><h3>Climate</h3><p class="card-m">${esc(county.climate)}</p></div><div class="panel"><h3>Getting around</h3><p class="card-m">${esc(county.airport)} · ${esc(county.highways)}</p></div><div class="panel"><h3>Economy</h3><p class="card-m">Top industries: ${county.industries.map(esc).join(', ')} · unemployment ${county.unemp}%</p></div><div class="panel"><h3>Utilities &amp; internet</h3><p class="card-m">${esc(county.electric)} · ${esc(county.isps)}</p></div></div><p class="note mt8">County facts from the CLM master database.</p>`) +
      U.sec({ tint: true, title: 'Homes for relocators in ' + nm }, grid(E.pull('listings', ctx, { exact: ctx.level !== 'county' }).filter((l) => l.type !== 'Land').slice(0, 4), U.listing)) +
      U.sec({ title: 'Movers, lenders and agents' }, grid(E.pull('businesses', ctx, { where: (b) => ['real-estate-agency', 'mortgage-lender', 'property-management-company', 'title-company'].includes(b.cat) }).slice(0, 8), U.biz));
    return page('Moving from ' + from + ' to ' + ctxName(ctx), ctx, html, { crumb: 'Relocation', tail: 'relocation/from-' + from.toLowerCase().replace(/ /g, '-'),
      after: () => document.getElementById('from').addEventListener('change', (e) => { const p = new URLSearchParams(location.hash.split('?')[1] || ''); p.set('from', e.target.value); location.hash = '#/relocation?' + p; }) });
  };

  /* ---------- templates index (review surface) ---------- */
  P.templates = () => {
    const pc = B.primaryCity || 'salt-lake-city', ph = (E.idx.hoodsByCity[pc] || [])[0]?.slug, pb = E.pull('businesses', E.ctx('city', pc))[0], pp = E.pull('providers', E.ctx('city', pc))[0];
    const pl = E.pull('listings', E.ctx('city', pc), { exact: true })[0], ev = E.pull('events', E.ctx('city', pc))[0], nw = E.pull('news', E.ctx('city', pc))[0];
    const T = [
      ['Geo', [['Home / state hub', '#/'], ...(B.scope ? [] : [['Region hub', '#/region/wasatch-back']]), ['County hub', '#/county/' + (B.primaryCounty || 'salt-lake')], ['City hub', '#/city/' + pc], ['Neighborhood', '#/hood/' + ph], ['All cities', '#/cities'], ['All neighborhoods', '#/neighborhoods'], ['City vs city', '#/compare'], ['Relocation', '#/relocation'], ['Things to do (area of influence)', '#/things-to-do?g=city:' + pc + '&k=boating']]],
      ['Homes', [['MLS search', '#/homes?g=city:' + pc], ['Listing detail', '#/listing/' + pl?.id], ['New construction', '#/new-construction'], ['Land for sale', '#/land'], ['FSBO listings', '#/fsbo'], ['Sell / FSBO tiers', '#/sell'], ['Market data', '#/market-data'], ['Mortgage calculators', '#/mortgage?g=city:' + pc]]],
      ['Directory', [['Business directory', '#/directory?g=city:' + pc], ['Business profile', '#/business/' + pb?.id], ['Provider profile (portable reviews)', '#/pro/' + pp?.id], ['Realtor directory', '#/realtors?g=city:' + pc], ['Lender directory', '#/lenders?g=city:' + pc], ['Contractors + quote request', '#/contractors?g=city:' + pc], ['Schools', '#/schools?g=city:' + pc], ['School detail', '#/school/' + E.pull('schools', E.ctx('city', pc))[0]?.id]]],
      ['Community', [['Real Estate News', '#/news'], ['Article', '#/article/' + nw?.id], ['Events', '#/events?g=city:' + pc], ['Event detail', '#/event/' + ev?.id], ['Deals', '#/deals'], ['Deal detail', '#/deal/' + E.pull('deals', E.ctx('city', pc))[0]?.id], ['Marketplace', '#/marketplace'], ['Marketplace item', '#/item/' + E.pull('market', E.ctx('city', pc))[0]?.id], ['Classifieds', '#/classifieds'], ['Classified detail', '#/classified/' + E.pull('classifieds', E.ctx('city', pc))[0]?.id], ['Jobs', '#/jobs'], ['Job detail', '#/job/' + E.pull('jobs', E.ctx('city', pc))[0]?.id]]],
    ];
    const html = U.hero({ img: B.heroAlt, eyebrow: 'Master template library', h1: 'Every page type,', em: B.name + ' theme.', lede: 'One master template per page type. Each domain applies its own theme and geographic scope, and pulls content for its area. Use “Same template on…” in the breadcrumb bar to compare brands.', sm: true }) +
      T.map(([g, items], i) => U.sec({ tint: i % 2 === 1, eyebrow: g, title: g + ' templates' }, `<div class="g g4 tpl-grid">${items.map(([t, u]) => `<a href="${u}"><b>${t}</b><code>${esc(u)}</code></a>`).join('')}</div>`)).join('') +
      U.sec({ dark: true, title: 'Brand config driving this site' }, `<pre style="white-space:pre-wrap;color:#ddd;font-size:13px">${esc(JSON.stringify({ domain: B.domain, scope: B.scope || 'all 29 counties', primaryCity: B.primaryCity, urlPattern: B.scope ? '/{county}-county/{city}/{neighborhood}/' : '/utah/{region}/{county}-county/{city}/{neighborhood}/', radiusMiles: E.R }, null, 2))}</pre>`);
    return page('Template library', E.ctx('state'), html, { crumb: 'Templates' });
  };

  const simple = (t, msg) => () => page(t, E.ctx('state'), U.sec({}, `<div class="panel" style="max-width:560px;margin:0 auto"><h1 class="sec-title" style="font-size:1.6rem">${t}</h1><p class="muted mt8">${msg}</p><div class="field mt16"><label>Email</label><input placeholder="you@email.com"></div><button class="btn btn-dark">Continue</button><p class="note mt8">Preview only — nothing is submitted.</p></div>`), { crumb: t });
  P.signin = simple('Sign in', 'Saved homes, searches and alerts sync across every CLM site.');
  P.saved = simple('Save this search', 'Get new listings that match, the moment they hit the MLS.');
  P.contact = simple('Talk to an agent', `Your question routes to ${B.featuredAgent.name} (${B.featuredAgent.team}).`);
  P.claim = simple('Claim or post', 'Business owners claim a profile once; it powers listings, deals, events, jobs and marketplace items across every CLM site.');

  /* =================== additional page types (v2) =================== */
  const hsh = (id) => { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const feat = (l, k) => hsh(l.id + k) % 100;
  const SAMPLE = '<p class="note mt8">Sample records; live feeds replace them at launch.</p>';
  const geoQ = (q) => E.parseG(q.g);

  // ---- hot searches (saved-search landing pages) ----
  const HOT = [
    ['homes-under-500k', 'Homes under $500K', (l) => l.price < 500000 && l.type !== 'Land'],
    ['luxury-homes', 'Luxury homes $1M+', (l) => l.price >= 1000000 && l.type !== 'Land'],
    ['waterfront-homes', 'Waterfront & lake homes', (l) => l.type !== 'Land' && feat(l, 'water') < 12],
    ['mountain-view-homes', 'Mountain view homes', (l) => l.type !== 'Land' && feat(l, 'view') < 40],
    ['homes-with-pool', 'Homes with a pool', (l) => l.type === 'Single Family' && feat(l, 'pool') < 22],
    ['large-lot-homes', 'Homes on large lots', (l) => l.type !== 'Land' && (l.acres || 0) >= 0.5],
    ['condos-townhomes', 'Condos & townhomes', (l) => l.type === 'Condo' || l.type === 'Townhome'],
    ['investment-properties', 'Investment properties', (l) => l.type !== 'Land' && l.smartbuy >= 80],
    ['foreclosures', 'Bank-owned & foreclosures', (l) => l.type !== 'Land' && feat(l, 'reo') < 6],
    ['open-houses', 'Open houses this weekend', (l) => l.type !== 'Land' && feat(l, 'oh') < 18],
  ];
  HOT.forEach(([k, t, pred]) => { P[k] = homesPage({ route: k, pred, title: t, crumb: 'Hot searches', tail: 'hot-searches/' + k }); });
  P['hot-searches'] = (_, q) => {
    const ctx = geoQ(q); const all = E.pull('listings', ctx, { exact: ctx.level !== 'county' && ctx.level !== 'state' });
    const html = U.hero({ img: 'tile_hot_searches', eyebrow: 'Hot searches', h1: 'Popular home searches in ' + esc(ctxName(ctx)), lede: 'One-click saved searches. Each one is its own page with live counts and alerts.', sm: true }) +
      U.sec({}, `<div class="g g3">${HOT.map(([k, t, pred]) => `<a class="panel" href="${L.list(k, ctx)}"><h3>${t}</h3><p class="card-m">${((n) => n + (n === 1 ? ' home' : ' homes'))(all.filter(pred).length)} now</p></a>`).join('')}</div>` + SAMPLE);
    return page('Hot searches in ' + ctxName(ctx), ctx, html, { crumb: 'Hot searches', tail: 'hot-searches' });
  };

  // ---- rentals (long-term + nightly) derived from sample inventory ----
  const rent = (l) => Math.round((l.price * 0.0042) / 25) * 25, nightly = (l) => Math.round((l.price * 0.00034) / 5) * 5;
  const rentCard = (kind) => (l) => `<a class="card" href="#/${kind === 'str' ? 'str' : 'rental'}/${l.id}"><div class="card-img" ${bg(l.img)}><span class="badge">${kind === 'str' ? 'Nightly' : 'For rent'}</span></div><div class="card-b"><b class="card-t">${kind === 'str' ? money0(nightly(l)) + '<small> / night</small>' : money0(rent(l)) + '<small> / mo</small>'}</b><p class="card-m">${l.beds} bd · ${l.baths} ba · ${int(l.sqft)} sqft</p><p class="card-m">${esc(l.addr)}, ${esc(E.cityName(l.city))}</p></div></a>`;
  const rentPool = (ctx, kind) => E.pull('listings', ctx, { exact: ctx.level !== 'state' }).filter((l) => l.type !== 'Land' && feat(l, kind) < (kind === 'str' ? 30 : 35));
  const rentList = (kind) => (_, q) => {
    const ctx = geoQ(q); const a = rentPool(ctx, kind);
    const t = kind === 'str' ? 'Nightly & vacation rentals' : 'Long-term rentals';
    const html = U.hero({ img: kind === 'str' ? 'tile_nightly_rentals' : 'tile_long_term_rentals', eyebrow: kind === 'str' ? 'Short-term rentals' : 'Homes & apartments for rent', h1: t + ' in ' + esc(ctxName(ctx)), lede: kind === 'str' ? 'Ski-in, golf, lake and downtown stays, with the property managers and cleaners who run them.' : 'Houses, townhomes and condos for rent, plus the property managers who lease them.', sm: true }) +
      U.sec({}, listHead(int(a.length) + ' rentals', ctx, kind === 'str' ? 'nightly-rentals' : 'rentals') + grid(a.slice(0, 32), rentCard(kind)) + SAMPLE) +
      U.sec({ tint: true, title: 'Property managers serving ' + esc(ctxName(ctx)) }, grid(E.pull('businesses', ctx, { where: (b) => b.cat === 'property-management-company' }).slice(0, 8), U.biz));
    return page(t + ' in ' + ctxName(ctx), ctx, html, { crumb: t, tail: kind === 'str' ? 'nightly-rentals' : 'rentals' });
  };
  P.rentals = rentList('ltr'); P['nightly-rentals'] = rentList('str');
  const rentDetail = (kind) => ([id]) => {
    const l = E.idx.listings[id]; if (!l || !E.inScope(l.county)) return P.notfound();
    const ctx = E.ctx('city', l.city);
    const price = kind === 'str' ? money0(nightly(l)) + ' / night' : money0(rent(l)) + ' / month';
    const html = U.hero({ img: l.img, eyebrow: kind === 'str' ? 'Nightly rental' : 'For rent', h1: esc(l.addr), lede: esc(E.cityName(l.city)) + ' · ' + price, sm: true }) +
      U.sec({}, `<div class="split"><div><div class="kpis"><div class="kpi"><small>${kind === 'str' ? 'Nightly' : 'Monthly rent'}</small><b>${price.split(' / ')[0]}</b></div><div class="kpi"><small>Beds / baths</small><b>${l.beds} / ${l.baths}</b></div><div class="kpi"><small>Size</small><b>${int(l.sqft)} sqft</b></div><div class="kpi"><small>${kind === 'str' ? 'Sleeps' : 'Lease'}</small><b>${kind === 'str' ? l.beds * 2 : '12 mo'}</b></div></div>
        <h3 class="mt24">${kind === 'str' ? 'House rules & fees' : 'Lease terms'}</h3><p class="muted mt8">${kind === 'str' ? 'Cleaning fee, county transient room tax and city business license shown at checkout. Minimum stay set by the owner.' : 'Deposit equal to one month. Utilities, pet policy and application fee shown by the property manager.'}</p>${SAMPLE}</div>
        <div class="panel"><h3>${kind === 'str' ? 'Check availability' : 'Apply or schedule a tour'}</h3><div class="field mt16"><label>${kind === 'str' ? 'Dates' : 'Move-in date'}</label><input placeholder="Select dates"></div><div class="field"><label>Email</label><input placeholder="you@email.com"></div><button class="btn btn-dark">${kind === 'str' ? 'Request to book' : 'Request a tour'}</button><p class="note mt8">Preview only.</p></div></div>`) +
      U.sec({ tint: true, title: 'Similar rentals nearby' }, grid(rentPool(ctx, kind).filter((x) => x.id !== id).slice(0, 4), rentCard(kind)));
    return page(l.addr + ' — ' + (kind === 'str' ? 'nightly rental' : 'for rent'), ctx, html, { crumb: kind === 'str' ? 'Nightly rentals' : 'Rentals', tail: (kind === 'str' ? 'nightly-rentals/' : 'rentals/') + l.id.toLowerCase() });
  };
  P.rental = rentDetail('ltr'); P.str = rentDetail('str');

  // ---- coupons ----
  const code = (d) => 'CLM' + (hsh(d.id) % 9000 + 1000);
  const couponCard = (d) => `<a class="panel" href="#/coupon/${d.id}"><p class="sec-eyebrow">${esc(E.idx.businesses[d.biz]?.name || 'Local business')}</p><h3>${d.pct}% off · ${esc(d.title)}</h3><p class="card-m">Code <b>${code(d)}</b> · ${esc(E.cityName(d.city) || '')}</p></a>`;
  P.coupons = (_, q) => { const ctx = geoQ(q); const a = E.pull('deals', ctx);
    return page('Coupons in ' + ctxName(ctx), ctx, U.hero({ img: 'gen-deals', eyebrow: 'Printable & promo codes', h1: 'Coupons in ' + esc(ctxName(ctx)), lede: 'Promo codes from local businesses. Show the code or use it online.', sm: true }) + U.sec({}, listHead(int(a.length) + ' coupons', ctx, 'coupons') + grid(a.slice(0, 36), couponCard, 'g g3') + SAMPLE), { crumb: 'Coupons', tail: 'coupons' }); };
  P.coupon = detail('deals', (d, ctx) => { const b = E.idx.businesses[d.biz];
    const html = U.sec({}, `<div class="split"><div><p class="sec-eyebrow">${esc(b?.name || '')}</p><h1 class="sec-title">${d.pct}% off · ${esc(d.title)}</h1><div class="panel mt16" style="text-align:center;border-style:dashed"><small class="muted">Promo code</small><div style="font-size:2rem;font-weight:800;letter-spacing:.08em">${code(d)}</div><small class="muted">Ends ${esc(d.ends)}</small></div><h3 class="mt24">Terms</h3><p class="muted mt8">One per customer. Not valid with other offers. Issued by the business through its CLM profile.</p>${SAMPLE}</div><div>${b ? U.biz(b) : ''}</div></div>`) +
      U.sec({ tint: true, title: 'More coupons nearby' }, grid(E.pull('deals', ctx).filter((x) => x.id !== d.id).slice(0, 6), couponCard, 'g g3'));
    return page(d.title + ' coupon', ctx, html, { crumb: 'Coupons', tail: 'coupons/' + d.id.toLowerCase() }); });

  // ---- brokerages, verticals ----
  P.brokerages = (_, q) => { const ctx = geoQ(q); const a = E.pull('businesses', ctx, { where: (b) => b.cat === 'real-estate-agency' });
    return page('Brokerages in ' + ctxName(ctx), ctx, U.sec({}, listHead('Real estate brokerages in ' + esc(ctxName(ctx)), ctx, 'brokerages') + grid(a.slice(0, 24), U.biz) + SAMPLE), { crumb: 'Brokerages', tail: 'brokerages' }); };
  P.verticals = (_, q) => { const ctx = geoQ(q);
    const html = U.sec({}, `<h1 class="sec-title">Every directory category in ${esc(ctxName(ctx))}</h1><p class="sec-sub">${E.G.verticals.length} verticals · ${E.G.categories.length} categories from the CLM master database.</p><div class="g g3 mt16">${E.G.verticals.map((v) => `<div class="panel"><h3><a href="${L.list('directory', ctx, { v: v.slug })}">${esc(v.name)}</a></h3><p class="card-m">${E.G.categories.filter((c) => c.vertical === v.slug).map((c) => `<a href="${L.list('directory', ctx, { c: c.slug })}">${esc(c.name)}</a>`).join(' · ')}</p></div>`).join('')}</div>`);
    return page('Directory categories', ctx, html, { crumb: 'Directory', tail: 'directory/categories' }); };

  // ---- account / owner tools ----
  const form = (t, lede, fields, btn, side = '') => U.sec({}, `<div class="split"><div class="panel"><h1 class="sec-title" style="font-size:1.6rem">${t}</h1><p class="muted mt8">${lede}</p>${fields.map((f) => Array.isArray(f) ? `<div class="field mt16"><label>${f[0]}</label><select>${f[1].map((o) => `<option>${o}</option>`).join('')}</select></div>` : `<div class="field mt16"><label>${f}</label><input placeholder="${f}"></div>`).join('')}<button class="btn btn-dark mt16">${btn}</button><p class="note mt8">Preview only — nothing is submitted.</p></div><div>${side}</div></div>`);
  P['add-listing'] = (_, q) => page('Add a listing', E.ctx('state'), form('Add a listing', 'Agents add MLS listings by number; owners add a free FSBO listing.', [['Listing type', ['MLS listing (agent)', 'For sale by owner', 'For rent', 'Nightly rental', 'Land']], 'Address', 'MLS # (agents)', 'Asking price', ['Beds', ['1', '2', '3', '4', '5+']], 'Photos (upload)'], 'Continue', `<div class="panel"><h3>Where it shows</h3><p class="card-m">One listing appears on every CLM site whose area covers the address: ${Object.values(window.CLM_BRANDS).map((b) => esc(b.name)).join(', ')}.</p></div>`), { crumb: 'Add listing', tail: 'add-listing' });
  P['list-my-home'] = (_, q) => page('List my home', E.ctx('state'), form('List my home', 'Tell us about your home. We send a value range and your listing options.', ['Address', ['Timeline', ['ASAP', '1–3 months', '3–6 months', 'Just curious']], ['How do you want to sell?', ['Free FSBO', 'FSBO Plus MLS ($399)', 'Pro ($1,499)', 'Full service with ' + B.featuredAgent.name]], 'Name', 'Email', 'Phone'], 'Get my home value', `<a class="panel" href="#/sell"><h3>Compare seller plans</h3><p class="card-m">Free, $399, $1,499 or full service.</p></a>`), { crumb: 'List my home', tail: 'list-my-home' });
  P['saved-searches'] = () => { const ctx = E.ctx('state'); const ex = [['Park City · 3+ beds · under $2.5M', 12], ['St. George · pool homes', 7], ['Heber City · new construction', 4]];
    return page('My saved searches', ctx, U.sec({}, `<h1 class="sec-title">My saved searches</h1><p class="sec-sub">Alerts sync across every CLM site.</p><div class="g g3 mt16">${ex.map(([t, n]) => `<div class="panel"><h3>${t}</h3><p class="card-m">${n} new since last visit · daily email</p><div class="row mt8"><button class="btn btn-ghost">Edit</button><button class="btn btn-ghost">Pause</button></div></div>`).join('')}</div>${SAMPLE}<h2 class="sec-title mt40" style="font-size:1.3rem">Saved homes</h2>${grid(E.pull('listings', ctx).slice(0, 4), U.listing)}`), { crumb: 'Saved searches', tail: 'account/saved-searches' }); };
  P['find-your-home'] = () => { const steps = [['Where?', ['Anywhere in ' + B.areaShort, ...E.cities.slice(0, 6).map((c) => c.name)]], ['Budget', ['Under $500K', '$500K–$800K', '$800K–$1.5M', '$1.5M+']], ['Home type', ['Single family', 'Condo / townhome', 'New construction', 'Land']], ['Must-haves', ['Garage', 'Yard', 'Mountain view', 'Pool', 'Near schools', 'Near ski/golf']], ['Timeline', ['Now', '3 months', '6 months', 'Researching']]];
    const html = U.hero({ img: B.heroAlt, eyebrow: 'Home search profile', h1: 'Find your home', lede: 'Answer five questions. We build a saved search and match you with homes, neighborhoods and an agent.', sm: true }) + U.sec({}, `<div class="g g2">${steps.map(([t, o], i) => `<div class="panel"><p class="sec-eyebrow">Step ${i + 1} of ${steps.length}</p><h3>${t}</h3><div class="chips mt8">${o.map((x) => `<button class="chip">${esc(x)}</button>`).join('')}</div></div>`).join('')}</div><button class="btn btn-dark mt24">See my matches</button>`);
    return page('Find your home', E.ctx('state'), html, { crumb: 'Find your home', tail: 'find-your-home' }); };
  P['business-dashboard'] = () => { const ctx = E.ctx('city', B.primaryCity || 'salt-lake-city'); const b = E.pull('businesses', ctx)[0];
    const k = [['Profile views (30d)', '1,284'], ['Calls & clicks', '96'], ['Quote requests', '14'], ['Reviews', b ? b.reviews : 0]];
    const html = U.sec({}, `<div class="row between"><div><p class="sec-eyebrow">Business owner dashboard</p><h1 class="sec-title">${esc(b?.name || 'Your business')}</h1></div><a class="btn btn-dark" href="#/claim">Edit profile</a></div><div class="kpis mt16">${k.map(([t, v]) => `<div class="kpi"><small>${t}</small><b>${v}</b><i>sample</i></div>`).join('')}</div><div class="g g3 mt24">${['Post a deal', 'Post an event', 'Post a job', 'Add a marketplace item', 'Add team members (providers)', 'Reply to reviews'].map((t) => `<div class="panel"><h3>${t}</h3><p class="card-m">Publishes to every CLM site whose area covers your service area.</p></div>`).join('')}</div>${SAMPLE}`);
    return page('Business dashboard', ctx, html, { crumb: 'Dashboard', tail: 'account/business' }); };

  // ---- mortgage funnel ----
  P['get-pre-approved'] = () => page('Get pre-approved', E.ctx('state'), U.hero({ img: 'gen-mortgage', eyebrow: 'Lender funnel · rotating lenders', h1: 'Get pre-approved', lede: 'One short form. Your request rotates to a participating lender who serves your area.', sm: true }) + form('Pre-approval request', 'Soft credit check only at the lender’s step.', [['Purchase price', ['Under $500K', '$500K–$800K', '$800K–$1.5M', '$1.5M+']], ['Down payment', ['3–5%', '10%', '20%', '25%+']], ['Credit range', ['760+', '700–759', '640–699', 'Below 640']], ['Loan type', ['Conventional', 'FHA', 'VA', 'Jumbo', 'USDA']], 'Name', 'Email', 'Phone'], 'Send to a lender', U.rates()), { crumb: 'Get pre-approved', tail: 'get-pre-approved' });
  P['credit-repair'] = (_, q) => { const ctx = geoQ(q); return page('Credit repair', ctx, U.hero({ img: 'gen-mortgage', eyebrow: 'Before you buy', h1: 'Credit repair in ' + esc(ctxName(ctx)), lede: 'Raise your score before you apply. Local credit counselors and the lenders who work with them.', sm: true }) + U.sec({}, `<div class="g g3">${[['Check your reports', 'Pull all three bureau reports and dispute errors.'], ['Lower utilization', 'Keep card balances under 30% of limits.'], ['Talk to a counselor', 'Non-profit and paid counselors listed below.']].map(([t, d]) => `<div class="panel"><h3>${t}</h3><p class="card-m">${d}</p></div>`).join('')}</div>`) + U.sec({ tint: true, title: 'Lenders serving ' + esc(ctxName(ctx)) }, grid(E.pull('businesses', ctx, { where: (b) => ['mortgage-lender', 'mortgage-broker', 'credit-union'].includes(b.cat) }).slice(0, 8), U.biz)), { crumb: 'Credit repair', tail: 'credit-repair' }); };

  // ---- help & community Q&A ----
  const chat = (t, who, msgs, cta) => U.sec({}, `<div class="panel" style="max-width:720px;margin:0 auto"><p class="sec-eyebrow">${who}</p><h1 class="sec-title" style="font-size:1.6rem">${t}</h1><div class="mt16">${msgs.map(([me, m]) => `<div style="display:flex;justify-content:${me ? 'flex-end' : 'flex-start'};margin:8px 0"><div style="max-width:80%;padding:10px 14px;border-radius:14px;background:${me ? 'var(--charcoal);color:#fff' : 'var(--surface-2)'}">${m}</div></div>`).join('')}</div><div class="row mt16"><input style="flex:1;padding:12px 14px;border:1px solid var(--border);border-radius:999px" placeholder="${cta}"><button class="btn btn-dark">Send</button></div><p class="note mt8">Preview only.</p></div>`);
  P['ask-a-realtor'] = () => page('Ask a Realtor', E.ctx('state'), U.hero({ img: B.featuredAgent.img, eyebrow: 'Free Q&A', h1: 'Ask a Realtor', lede: 'Real answers from licensed agents. Featured: ' + esc(B.featuredAgent.name) + ', ' + esc(B.featuredAgent.team) + '.', sm: true }) + U.sec({}, `<div class="g g2">${[['How much do I need down in ' + B.areaShort + '?', 'Most buyers put 3–20% down; jumbo loans usually need 10–20%.'], ['Is now a good time to buy?', 'It depends on rate, inventory and how long you plan to stay. Ask for a local market brief.'], ['What does a buyer’s agent cost?', 'Compensation is negotiated in a written buyer agreement before touring.'], ['How long does closing take?', 'Typically 30–45 days from accepted offer.']].map(([qq, a]) => `<div class="panel"><h3>${esc(qq)}</h3><p class="card-m">${a}</p><p class="note mt8">Answered by ${esc(B.featuredAgent.name)}</p></div>`).join('')}</div>`) + chat('Ask your question', 'Goes to a licensed agent', [], 'Type your question…'), { crumb: 'Ask a Realtor', tail: 'ask-a-realtor' });
  P['ask-ai'] = () => page('Ask AI', E.ctx('state'), chat('Ask AI about ' + esc(B.areaShort) + ' real estate', 'AI assistant · answers cite CLM data', [[1, 'What’s the median home price around here?'], [0, 'The CLM master database lists ' + esc(countyOf(E.ctx('state')).name) + '’s median home value near ' + money0(countyOf(E.ctx('state')).home) + '. Want homes in that range?']], 'Ask anything…'), { crumb: 'Ask AI', tail: 'ask-ai' });
  P['team-chat'] = () => page('Team chat', E.ctx('state'), chat('Chat with the team', esc(B.featuredAgent.team), [[0, 'Hi! I’m with ' + esc(B.featuredAgent.team) + '. Looking to buy, sell or rent?'], [1, 'Buying in the next 3 months.'], [0, 'Great — what area and price range?']], 'Message the team…'), { crumb: 'Team chat', tail: 'team-chat' });
  P['help-desk'] = () => page('Help desk', E.ctx('state'), form('Help desk', 'Open a support ticket for listings, profiles, billing or data corrections.', [['Topic', ['Listing problem', 'Business profile', 'Billing', 'Data correction', 'Other']], 'Email', 'Describe the issue'], 'Open ticket', `<div class="panel"><h3>Common answers</h3>${U.faq([['How do I claim my business?', 'Use Claim your business; verification takes one business day.'], ['How fast do MLS changes show?', 'Listings refresh from the MLS feed every 15 minutes.']])}</div>`), { crumb: 'Help desk', tail: 'help-desk' });
  const FAQS = () => [['Where does listing data come from?', 'Licensed MLS IDX feeds: ' + esc(B.mls) + '.'], ['Do you charge buyers?', 'No. Searching, saving and alerts are free.'], ['How are businesses ranked?', 'By distance and service area, then reviews. Sponsored slots are labeled.'], ['Can one profile show on several sites?', 'Yes. One profile powers every CLM site that covers its service area.'], ['How do I list FSBO?', 'Choose a plan on the Sell page; the free plan has no fees.']];
  P.faqs = () => page('FAQs', E.ctx('state'), U.sec({}, `<h1 class="sec-title">Frequently asked questions</h1><div class="mt16" style="max-width:820px">${U.faq(FAQS())}</div>`), { crumb: 'FAQs', tail: 'faqs' });
  const WIKI = [['buying-process', 'The Utah home buying process'], ['repc', 'Utah REPC explained'], ['closing-costs', 'Utah closing costs'], ['property-tax', 'Utah property tax basics'], ['water-rights', 'Water rights and wells'], ['hoa', 'HOAs and CC&Rs'], ['short-term-rental-rules', 'Short-term rental rules by city'], ['radon', 'Radon testing in Utah']];
  P.wiki = () => page('Real estate wiki', E.ctx('state'), U.sec({}, `<h1 class="sec-title">${esc(B.areaShort)} real estate wiki</h1><p class="sec-sub">Plain-English answers, maintained by local pros.</p><div class="g g4 mt16">${WIKI.map(([k, t]) => `<a class="panel" href="#/wiki-article/${k}"><h3>${t}</h3><p class="card-m">Updated monthly</p></a>`).join('')}</div>`), { crumb: 'Wiki', tail: 'wiki' });
  P['wiki-article'] = ([k]) => { const w = WIKI.find((x) => x[0] === k) || WIKI[0];
    return page(w[1], E.ctx('state'), U.sec({}, `<div class="split"><article style="max-width:720px"><p class="sec-eyebrow">Wiki</p><h1 class="sec-title">${w[1]}</h1><p class="muted mt8">Reviewed by ${esc(B.featuredAgent.name)} · updated this month</p>${['Overview', 'Step by step', 'Costs and timing', 'Local rules', 'Who can help'].map((h) => `<h2 class="mt24" style="font-size:1.25rem">${h}</h2><p class="mt8">Template body copy for “${w[1]}” — ${h.toLowerCase()}. Each section is written once and localized per county where rules differ.</p>`).join('')}</article><div class="panel"><h3>In this wiki</h3><div class="link-list mt8">${WIKI.map(([kk, t]) => `<a href="#/wiki-article/${kk}">${t}</a>`).join('')}</div></div></div>`), { crumb: 'Wiki', tail: 'wiki/' + w[0] }); };

  // ---- legal / company pages ----
  const doc = (k, t, paras) => () => page(t, E.ctx('state'), U.sec({}, `<article style="max-width:780px"><p class="sec-eyebrow">${esc(B.name)}</p><h1 class="sec-title">${t}</h1><p class="note mt8">Template copy — final legal text supplied by counsel.</p>${paras.map(([h, b]) => `<h2 class="mt24" style="font-size:1.2rem">${h}</h2><p class="mt8">${b}</p>`).join('')}</article>`), { crumb: t, tail: k });
  P.about = doc('about', 'About ' + B.name, [['Who we are', `${esc(B.name)} is part of the CLM Utah network, a group of local real estate and community sites operated by Create Local Marketing.`], ['What we cover', esc(B.areaName) + ' — homes, neighborhoods, businesses, schools, events and the people who serve each community.'], ['Featured Realtor', esc(B.featuredAgent.name) + ', ' + esc(B.featuredAgent.team) + '.']]);
  P.privacy = doc('privacy', 'Privacy policy', [['What we collect', 'Account details, saved searches and messages you send.'], ['How we use it', 'To send alerts and route your requests to the agent, lender or business you choose.'], ['Your choices', 'Download or delete your data from your account at any time.']]);
  P.terms = doc('terms', 'Terms of use', [['Using the site', 'Listing information is provided for consumers’ personal, non-commercial use.'], ['Accuracy', 'Information is deemed reliable but not guaranteed.'], ['Accounts', 'You are responsible for activity on your account.']]);
  P['fair-housing'] = doc('fair-housing', 'Fair housing notice', [['Equal housing opportunity', 'We are committed to the Fair Housing Act and the Utah Fair Housing Act. We do not discriminate on the basis of race, color, religion, sex, national origin, disability, familial status, sexual orientation, gender identity or source of income.'], ['Report a concern', 'Contact HUD or the Utah Antidiscrimination and Labor Division.']]);
  P.accessibility = doc('accessibility', 'Accessibility statement', [['Our standard', 'We aim to meet WCAG 2.2 AA across every CLM site.'], ['Feedback', 'Tell us about any barrier through the help desk and we will respond within two business days.']]);
  P.dmca = doc('dmca', 'DMCA policy', [['Notices', 'Send copyright notices with the work, the URL and your contact details to our designated agent.'], ['Counter-notices', 'We follow the counter-notice process in 17 U.S.C. § 512.']]);
  P['mls-disclosures'] = doc('mls-disclosures', 'MLS disclosures', [['Data sources', esc(B.mls) + '. Listing data is provided through licensed IDX feeds.'], ['Attribution', 'Each listing shows the listing brokerage. Information deemed reliable but not guaranteed.'], ['Brokerage', esc(B.featuredAgent.team) + '.']]);
  P.sitemap = () => { const groups = [['Homes', ['homes', 'hot-searches', 'new-construction', 'land', 'fsbo', 'rentals', 'nightly-rentals', 'market-data', 'mortgage']], ['Places', ['cities', 'counties', 'neighborhoods', 'compare', 'relocation', 'things-to-do']], ['Directory', ['directory', 'verticals', 'realtors', 'lenders', 'brokerages', 'contractors', 'schools']], ['Community', ['news', 'events', 'calendar', 'deals', 'coupons', 'marketplace', 'classifieds', 'jobs', 'reels']], ['Guides', ['cost-of-living', 'market-report', 'buying-guide', 'selling-guide', 'neighborhood-guide', 'school-district', 'historical-sites', 'accessibility-guide', 'whats-happening', 'es']], ['Help', ['faqs', 'wiki', 'ask-a-realtor', 'ask-ai', 'help-desk', 'about', 'privacy', 'terms', 'fair-housing', 'accessibility', 'dmca', 'mls-disclosures']]];
    return page('Sitemap', E.ctx('state'), U.sec({}, `<h1 class="sec-title">Sitemap</h1><div class="g g3 mt16">${groups.map(([g, ks]) => `<div class="panel"><h3>${g}</h3><div class="link-list mt8">${ks.map((k) => `<a href="#/${k}">${esc(slugTitle(k))}</a>`).join('')}</div></div>`).join('')}</div>`), { crumb: 'Sitemap', tail: 'sitemap' }); };

  // ---- editorial / guide page types (manifest page types) ----
  const guide = (k, label, img, body) => (_, q) => { const ctx = geoQ(q); const k0 = countyOf(ctx); const nm = esc(ctxName(ctx));
    const html = U.hero({ img: img || E.heroFor(ctx), eyebrow: label, h1: label + ' · ' + nm, lede: 'Updated monthly · ' + esc(k0.name) + ' data from the CLM master database.', sm: true }) + body(ctx, k0, nm);
    return page(label + ' — ' + ctxName(ctx), ctx, html, { crumb: label, tail: k }); };
  const kp = (rows) => `<div class="kpis">${rows.map(([t, v, i]) => `<div class="kpi"><small>${t}</small><b>${v}</b>${i ? `<i>${i}</i>` : ''}</div>`).join('')}</div>`;
  P['cost-of-living'] = guide('cost-of-living', 'Cost of living', 'tile_relocation', (ctx, k, nm) => U.sec({}, kp([['Median home', money0(k.home), 'master DB'], ['Median rent', money0(k.rent), 'master DB'], ['Median household income', money0(k.income), 'master DB'], ['Unemployment', k.unemp + '%', 'master DB']]) + `<div class="g g2 mt24"><div class="panel"><h3>Housing</h3><p class="card-m">${esc(k.market)}</p></div><div class="panel"><h3>Utilities</h3><p class="card-m">${esc(k.electric)} · ${esc(k.isps)}</p></div></div>`) + U.sec({ tint: true, title: 'Homes in ' + nm }, grid(E.pull('listings', ctx).slice(0, 4), U.listing)));
  P['market-report'] = guide('market-report', 'Market report', 'tile_market_data', (ctx, k, nm) => { const a = E.pull('listings', ctx, { exact: true });
    return U.sec({}, kp([['Median home value', money0(k.home), (k.yoy >= 0 ? '+' : '') + k.yoy + '% YoY · master DB'], ['Days on market', k.dom, 'master DB'], ['Active listings', int(k.active), 'master DB'], ['Sample listing median', money0(median(a)), 'sample']]) + `<p class="mt24" style="max-width:780px">${esc(k.market)}</p>`) + U.sec({ tint: true, title: 'Newest listings in ' + nm }, grid(a.sort((x, y) => x.dom - y.dom).slice(0, 4), U.listing)) + U.sec({ title: 'Market news' }, grid(E.pull('news', ctx).slice(0, 3), U.news, 'g g3')); });
  P['buying-guide'] = guide('buying-guide', 'Home buying guide', 'iur-hero-editorial', (ctx, k, nm) => U.sec({}, `<div class="g g3">${['Get pre-approved', 'Pick neighborhoods', 'Tour homes', 'Write a Utah REPC', 'Inspect & appraise', 'Close & move'].map((t, i) => `<div class="panel"><p class="sec-eyebrow">Step ${i + 1}</p><h3>${t}</h3><p class="card-m">What to expect in ${nm}.</p></div>`).join('')}</div>`) + U.sec({ tint: true, title: 'Rates today' }, U.rates()) + U.sec({ title: 'Agents who help buyers in ' + nm }, grid(E.pull('providers', ctx, { where: (p) => p.role === 'Realtor' }).slice(0, 4), U.pro)));
  P['selling-guide'] = guide('selling-guide', 'Home selling guide', 'gen-fsbo', (ctx, k, nm) => U.sec({}, `<div class="g g3">${['Price it right', 'Prep & stage', 'Pick a plan (FSBO to full service)', 'Market & show', 'Negotiate offers', 'Close'].map((t, i) => `<div class="panel"><p class="sec-eyebrow">Step ${i + 1}</p><h3>${t}</h3><p class="card-m">Local detail for ${nm}.</p></div>`).join('')}</div><a class="btn btn-dark mt24" href="#/sell">Compare seller plans</a>`) + U.sec({ tint: true, title: 'Stagers, photographers & contractors' }, grid(E.pull('businesses', ctx, { where: (b) => ['painter', 'handyman', 'landscaper', 'general-contractor'].includes(b.cat) }).slice(0, 8), U.biz)));
  P['neighborhood-guide'] = guide('neighborhood-guide', 'Neighborhood guide', null, (ctx, k, nm) => { const hs = E.G.hoods.filter((h) => ctx.city ? h.city === ctx.city : E.inScope(E.idx.city[h.city].county) && (ctx.level === 'state' || ctx.counties.includes(E.idx.city[h.city].county))).slice(0, 12);
    return U.sec({}, `<div class="g g3">${hs.map((h) => `<a class="panel" href="${L.hood(h.slug)}"><h3>${esc(h.name)}</h3><p class="card-m">${esc(h.notes || E.cityName(h.city))}</p></a>`).join('')}</div>`) + U.sec({ tint: true, title: 'Homes in these neighborhoods' }, grid(E.pull('listings', ctx).slice(0, 4), U.listing)); });
  P['school-district'] = guide('school-district', 'School district guide', 'tile_schools', (ctx, k, nm) => { const s = E.pull('schools', ctx); const ds = [...new Set(s.map((x) => x.district))];
    return U.sec({}, kp([['Districts', ds.length], ['Schools', s.length], ['Top-rated', s.filter((x) => x.rating >= 8).length]]) + `<div class="g g2 mt24">${ds.slice(0, 4).map((d) => `<div class="panel"><h3>${esc(d)}</h3><div class="link-list mt8">${s.filter((x) => x.district === d).slice(0, 6).map((x) => `<a href="#/school/${x.id}">${esc(x.name)}<span>${x.rating}/10</span></a>`).join('')}</div></div>`).join('')}</div>${SAMPLE}`); });
  P['historical-sites'] = guide('historical-sites', 'Historical sites', null, (ctx, k, nm) => U.sec({}, grid(E.pull('activities', ctx, { radius: 60 }).slice(0, 8), U.activity) + `<p class="note mt8">Landmarks within 60 miles, ranked by distance.</p>`) + U.sec({ tint: true, title: 'Historic homes for sale' }, grid(E.pull('listings', ctx).filter((l) => l.year && l.year < 1960).slice(0, 4), U.listing)));
  P['accessibility-guide'] = guide('accessibility-guide', 'Accessibility guide', null, (ctx, k, nm) => U.sec({}, `<div class="g g3">${[['Single-level homes', 'Ranch and main-floor primary suites.'], ['Accessible parks & trails', 'Paved, ADA-rated routes.'], ['Healthcare access', 'Hospitals and clinics nearby.'], ['Transit & paratransit', 'Public transit options.'], ['Home modification pros', 'Ramps, lifts and bathroom remodels.'], ['Senior living', 'Communities and in-home care.']].map(([t, d]) => `<div class="panel"><h3>${t}</h3><p class="card-m">${d} · ${nm}</p></div>`).join('')}</div>`) + U.sec({ tint: true, title: 'Single-level homes' }, grid(E.pull('listings', ctx).filter((l) => l.type === 'Single Family' && l.beds <= 3).slice(0, 4), U.listing)));
  P['whats-happening'] = guide('whats-happening', 'What’s happening', 'gen-events', (ctx, k, nm) => U.sec({ title: 'This week' }, grid(E.pull('events', ctx).slice(0, 6), U.event, 'g g3')) + U.sec({ tint: true, title: 'New deals' }, grid(E.pull('deals', ctx).slice(0, 4), U.deal)) + U.sec({ title: 'Latest news' }, grid(E.pull('news', ctx).slice(0, 3), U.news, 'g g3')));
  P.es = guide('es', 'Bienes raíces en español', null, (ctx, k, nm) => U.sec({}, kp([['Precio medio', money0(k.home)], ['Renta media', money0(k.rent)], ['Población', int(k.pop)]]) + `<div class="g g3 mt24">${[['Comprar casa', '#/homes'], ['Agentes que hablan español', '#/realtors'], ['Calculadora de hipoteca', '#/mortgage'], ['Rentas', '#/rentals'], ['Noticias', '#/news'], ['Eventos', '#/events']].map(([t, u]) => `<a class="panel" href="${u}"><h3>${t}</h3></a>`).join('')}</div>`) + U.sec({ tint: true, title: 'Casas en venta en ' + nm }, grid(E.pull('listings', ctx).slice(0, 4), U.listing)));

  // ---- events calendar, author, reels ----
  P.calendar = (_, q) => { const ctx = geoQ(q); const ev = E.pull('events', ctx); const by = {}; ev.forEach((e) => (by[e.date] ||= []).push(e));
    const d0 = new Date((ev.map((e) => e.date).sort()[0] || '2026-10-01') + 'T12:00:00'); const y = d0.getFullYear(), m = d0.getMonth(); const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    let cells = ''; for (let i = 0; i < first; i++) cells += '<div></div>';
    for (let dd = 1; dd <= days; dd++) { const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}`; const es = by[key] || [];
      cells += `<div class="panel" style="min-height:96px;padding:8px"><b>${dd}</b>${es.slice(0, 2).map((e) => `<a href="#/event/${e.id}" style="display:block;font-size:12px;margin-top:4px">${esc(e.title)}</a>`).join('')}${es.length > 2 ? `<small class="muted">+${es.length - 2} more</small>` : ''}</div>`; }
    const html = U.sec({}, listHead('Events calendar · ' + d0.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), ctx, 'calendar') + `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch"><div style="display:grid;grid-template-columns:repeat(7,minmax(96px,1fr));gap:6px;min-width:720px">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((x) => `<small class="muted">${x}</small>`).join('')}${cells}</div></div>` + SAMPLE);
    return page('Events calendar', ctx, html, { crumb: 'Calendar', tail: 'events/calendar' }); };
  P.author = ([slug]) => { const all = E.pull('news', E.ctx('state')); const names = [...new Set(all.map((n) => n.author))]; const nm = names.find((a) => E.slug ? E.slug(a) === slug : a.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || names[0];
    const mine = all.filter((n) => n.author === nm);
    return page(nm, E.ctx('state'), U.sec({}, `<div class="row"><div class="av lg">${esc(initials(nm))}</div><div><p class="sec-eyebrow">Real Estate News contributor</p><h1 class="sec-title">${esc(nm)}</h1><p class="muted">${mine.length} articles</p></div></div>`) + U.sec({ tint: true, title: 'Articles by ' + esc(nm) }, grid(mine.slice(0, 9), U.news, 'g g3')), { crumb: 'Authors', tail: 'author/' + (nm || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') }); };
  P.reels = (_, q) => { const ctx = geoQ(q); const L2 = E.pull('listings', ctx).slice(0, 6), N = E.pull('news', ctx).slice(0, 3), V = E.pull('events', ctx).slice(0, 3);
    const items = [...L2.map((l) => ['Home', l.img, money0(l.price) + ' · ' + l.beds + ' bd', l.addr, '#/listing/' + l.id]), ...V.map((e) => ['Event', E.evImg(e), e.title, e.venue, '#/event/' + e.id]), ...N.map((n) => ['News', 'tile_real_estate_news', n.title, n.dek, '#/article/' + n.id])].sort((a, b) => hsh(a[2]) - hsh(b[2]));
    const html = U.sec({}, `<h1 class="sec-title">Reels &amp; stories · ${esc(ctxName(ctx))}</h1><p class="sec-sub">Swipe-style feed of homes, events and news — the mobile home screen.</p><div class="chips mt16">${['Homes', 'Events', 'News', 'Deals', 'Open houses'].map((x) => `<span class="chip">${x}</span>`).join('')}</div>
      <div style="display:grid;grid-auto-flow:column;grid-auto-columns:minmax(240px,280px);gap:14px;overflow-x:auto;padding:16px 0;scroll-snap-type:x mandatory">${items.map(([k, img, t, sub, u]) => `<a href="${u}" style="scroll-snap-align:start;position:relative;aspect-ratio:9/16;border-radius:18px;overflow:hidden;color:#fff;display:block;background:#222 center/cover;background-image:url('${E.img ? E.img(img) : ''}')"><div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.8))"></div><span class="badge" style="position:absolute;top:12px;left:12px">${k}</span><div style="position:absolute;left:14px;right:14px;bottom:14px"><b style="display:block;font-size:1.05rem">${esc(t)}</b><small>${esc(sub || '')}</small></div></a>`).join('')}</div>${SAMPLE}`);
    return page('Reels', ctx, html, { crumb: 'Reels', tail: 'reels' }); };
  P.notfound = (_, __, msg, extra) => page('Not found', E.ctx('state'), U.sec({}, U.empty(msg || 'Page not found', (extra ? extra + ' ' : '') + `<a class="btn btn-ghost mt16" href="#/">Go home</a>`)));
})();
