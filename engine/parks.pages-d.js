/* Nationwide per-park category route contracts. Every route is a production target, not yet completed unique editorial. */
(function(){
'use strict';
const U=window.ParkUI,{D,esc,ic,park,layout,header,section,businessCard,productCard,source,empty}=U;
function childIndex(p,kind){const labels={businesses:'Merchant discovery',news:'Local editorial',events:'Verified events',shop:'Park gift shop'};const entries=kind==='businesses'?D.businessTaxonomy:kind==='news'?D.newsTaxonomy:kind==='events'?D.eventTaxonomy:D.productTaxonomy;const desc={businesses:'All licensed local tourism suppliers and services around the park; each listing needs a verified physical address and 25-mile geography test.',news:'Original visitor, conservation, historic and community reporting that cites precise sources and timestamps.',events:'Actual events with confirmed dates, organizer identity, venue coordinates and ticket terms; no speculative calendar entries.',shop:'Original park-specific collectibles, verified inventory and secure WooCommerce checkout, with no unlicensed NPS trademarks.'};
const cards=entries.map(x=>`<a class="group" href="#/park/${p.slug}/${kind}/${x.slug}">${ic(kind==='businesses'?'fa-store':kind==='events'?'fa-calendar-days':kind==='news'?'fa-newspaper':'fa-bag-shopping')}<div><strong>${esc(x.label)}</strong><small>${esc(p.short)} · ${esc(kind)}</small></div></a>`).join('');
layout(header(p.name+' — '+(labels[kind]||kind),p.state+' · '+kind,desc[kind])+section('NATIONWIDE PARK CONTENT',labels[kind]+' categories','Each route has its own approval and original-content checklist. Unfinished templates are not SEO publications.',cards,4)+`<section class="section"><div class="wrap">${source(p)}<a href="#/park/${p.slug}" class="btn alt">← Return to ${esc(p.short)} park</a></div></section>`);
}
function category(p,kind,slug){const list=kind==='businesses'?D.businessTaxonomy:kind==='news'?D.newsTaxonomy:kind==='events'?D.eventTaxonomy:D.productTaxonomy;const entry=list.find(x=>x.slug===slug);if(!entry)return childIndex(p,kind);const label=entry.label;const target=label+' near '+p.name;const near=D.inRadius(p);
const biz=kind==='businesses'?near.filter(b=>b.category===slug||b.types.includes(slug)||(slug==='hotels'&&b.category==='hotels')||(slug==='restaurants'&&b.category==='restaurants')):[];
const shop=kind==='shop'?D.products.filter(x=>x.park===p.slug&&x.category===slug):[];
const news=kind==='news'?D.news.filter(x=>x.park===p.slug):[];
const partial=kind==='businesses'?biz.length:kind==='shop'?shop.length:kind==='news'?news.length:0;
const specific=kind==='businesses'?'Businesses must be source-compliant, claimed or clearly unclaimed, and inside the stated 25-mile boundary measured from a verified park entrance or gateway. Do not display fabricated ratings, reviews, prices or owner relationships.'
:kind==='news'?'Original reporting is required: primary sources, reporter, reviewer, publication date, correction history, local context, and no unsourced safety advice.'
:kind==='events'?'Do not publish an event without a verified date, timezone, venue, organizer, source, registration link, cancellation policy and appropriate Event schema.'
:'Original art and legal park-inspired products must have product photography, supplier confirmation, attributes, SKU, stock, secure WooCommerce cart, returns, shipping and product schema.';
const listHTML=kind==='businesses'?biz.map(b=>businessCard(b,p)).join(''):kind==='shop'?shop.map(productCard).join(''):'';
layout(header(target,p.state+' · '+label,kind==='businesses'?'Find lodging, tours, services and local operators with correct geography and verified sources.':kind==='events'?'Check genuine upcoming and seasonal programs with organizers and dates.':kind==='shop'?'Review original collection concepts and verify real inventory before checkout.':'Read reported park and gateway news with clear source provenance.')+`
<section class="section"><div class="wrap layout"><article class="text">
<p class="lead">${esc(p.name)} is a designated National Park Service destination. This ${esc(label.toLowerCase())} page must be researched specifically for the park and surrounding travel region. It is currently a structured production page awaiting original verified content.</p>
<div class="notice">PRELAUNCH STATUS: structured page target only. No unique researched publication, verified business completeness, live commerce or independent quality sign-off. Keep noindex until approved.</div>
<h2>What visitors need to know about ${esc(label.toLowerCase())}</h2>
<p>${esc(specific)}</p><h3>Where should visitors start?</h3>
<p>Begin with the official National Park Service planning and condition information. For local merchants, always verify availability, ownership, address and service radius at the source.</p>
<h3>How should visits be planned safely?</h3><p>Respect access restrictions, weather risks, special permits, accessibility and the visitor's actual itinerary. Never reward unsafe behavior, closed areas or unauthorized commercial activity.</p>
<h4>Source, dates and visitor context</h4><p>Each published claim needs a retained source URI, observation timestamp, editorial review and correction pathway. Today's missing fields are an explicit publication blocker.</p>
<h5>Publication acceptance gate</h5><p>Specific search intent, original H1–H5 where warranted, full internal links, accessible media, schema matching factual content, usable filters, responsive checks and reviewer sign-off.</p>
<h2>Visitor questions and related searches</h2>
<details><summary>How do I find trustworthy ${esc(label.toLowerCase())} near ${esc(p.short)}?</summary><p>Compare current source listings, operating terms and official park resources. An unverified record is not a recommendation.</p></details>
<details><summary>Are these activities available year-round?</summary><p>Seasonality and closures vary. Refer to current published park and merchant sources rather than a prelaunch listing.</p></details>
<details><summary>Can I book, purchase or redeem offers here?</summary><p>No. Where no verified merchant or commerce integration is attached, the page does not represent available inventory.</p></details>
${source(p)}
</article><aside class="side"><strong>${esc(p.short)} ${esc(kind)}</strong><a href="#/park/${p.slug}">Park overview</a><a href="#/park/${p.slug}/${kind}">All ${esc(kind)} categories</a>${list.map(x=>`<a href="#/park/${p.slug}/${kind}/${x.slug}">${esc(x.label)}</a>`).join('')}</aside></div></section>
${listHTML?section('SOURCE-IDENTIFIED RECORDS',kind==='businesses'?'Local merchants':'Collection references', 'This sample list is not a complete market inventory.',listHTML,4):`<section class="section"><div class="wrap">${empty('No source-verified records have been attached to this park/category yet. This is a production task, not an empty category being promoted to search engines.')}</div></section>`}
<section class="section tint"><div class="wrap"><h2 style="font:800 30px var(--display)">Explore related ${esc(p.short)} information</h2><div class="grid g3"><a class="group" href="#/park/${p.slug}/topic/plan">${ic('fa-map')} Plan your visit</a><a class="group" href="#/park/${p.slug}/topic/things-to-do">${ic('fa-person-hiking')} Things to do</a><a class="group" href="#/park/${p.slug}/businesses">${ic('fa-store')} Local business directory</a></div></div></section>`);
}
window.ParkPagesD={childIndex,category};
})();