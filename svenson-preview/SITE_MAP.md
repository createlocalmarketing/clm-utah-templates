# Svenson Sportfishing + Ketchikan — Proposed Site Map

> **Scale target:** thousands of useful, individually populated URLs across Svenson's fishing content, Dealiciously Local offers, Alaska/Ketchikan history, and the Ketchikan / Southeast Alaska visitor directory. The current static review build is only 210 pages, including 27 business profiles; it is not the completed site. The final count grows from verified directory, place, event, offer, editorial, and reviewed guide records. Keyword variants and empty filter combinations are not standalone indexable pages.

## URL convention

Staging base: `https://dev.createlocalmarketing.com/svenson/`

Paths below are relative to that base. For example, `/fishing-charters/` means `https://dev.createlocalmarketing.com/svenson/fishing-charters/`. At launch, map these paths to the approved public domain and set canonical URLs there. Do not index staging.

## Information architecture

The site serves two connected purposes: book fishing with Svenson and help visitors explore Ketchikan. A third, clearly labeled Safety & Survival education area offers free reviewed learning materials and an offline guide. Directory categories and operator listings must be transparent about ownership, verification, paid placement, and coverage.

### Global header and mega menu

- Utility bar: local date/time, weather with source/update, phone, address, Shop, language selector (only languages with translated content), and optional account/cart controls if active.
- Primary navigation: Fishing with Svenson | Plan Your Visit | Ketchikan Directory | Things to Do | Safety & Survival | Events & Inside Ketchikan | Shop.
- One primary header CTA: **Book Now**.
- Mega-menu groupings: Charter Trips; Plan Your Visit; Stay & Eat; Tours & Outdoors; Culture & Shopping; Fish & Hunt Services; Safety & Survival; Events, News & Real Estate.

## A. Home and Svenson Sportfishing

| Route | Page purpose and required content |
|---|---|
| `/` | Svenson-branded homepage; full-width video background with the approved two-column slider; routes to booking, trip choices, Ketchikan visitor guide, and safety hub; real proof, FAQs, and one prominent booking action. |
| `/fishing-charters/` | Main generic Ketchikan charter landing/comparison page; explain trip types and selection, show verified operator options and disclose directory/business relationships. Svenson’s own booking page remains brand-focused to avoid duplicate intent. |
| `/fishing-charters/salmon/` | Salmon charter details, timing, trip format, gear, catch handling, verified season links, questions, and booking action. |
| `/fishing-charters/halibut/` | Halibut trip details, current official regulation links, gear, catch handling, booking action, and FAQs. |
| `/fishing-charters/combo-trips/` | Combined trips only if Svenson confirms that it offers them; describe who they suit and compare trip options. |
| `/cruise-guests/` | Cruise visitor fishing guide: port logistics, meeting point, timing, duration, booking steps, and a realistic return-to-ship buffer without guarantees. |
| `/rates-availability/` | Verified rates, inclusions, deposits, cancellation terms, season dates, and booking availability/handoff. |
| `/fleet-captain/` | Verified captain/crew, boat details, safety equipment, licenses where applicable, and original photos. |
| `/what-to-bring/` | Clothing, footwear, seasickness preparation, accessibility notes, and what Svenson supplies. |
| `/fish-processing-shipping/` | Catch processing and shipping options, timing, provider, fees, and eligibility; publish only after reconfirming current terms. Link to directory category. |
| `/about-svenson/` | Company story, real people, experience, service area, and verifiable trust details. |
| `/faq/` | Visible, useful answers covering booking, trip conditions, licenses, fish handling, cruise guests, accessibility, and cancellations. |
| `/contact/` | Verified phone/address, season hours, contact form, and map/location details. |
| `/book/` | Booking flow. If it only redirects to a booking vendor, noindex the redirect/thin wrapper; index only if it contains original decision-useful content. |

## B. Ketchikan planning and directory

| Route | Page purpose and category coverage |
|---|---|
| `/directory/` | Searchable Ketchikan business directory with category filters, verification labels, source/coverage note, listing policy, and correction/submission routes. |
| `/directory/stay/` | Hotels, motels, lodges, inns, B&Bs, cabins, vacation rentals, campgrounds, RV sites, and glamping. |
| `/directory/food/` | Restaurants, cafes, coffee, bakeries, seafood, bars, breweries, food trucks, groceries, and other verified food options. |
| `/directory/tours/` | Cruise excursions, helicopter/floatplane flightseeing, wildlife tours, boat tours, kayaking, guided tours, and fishing-charter filters. |
| `/directory/outdoors/` | Hiking, parks, public lands, camping, equipment rentals, outfitters, wildlife activities, and outdoor access information. |
| `/directory/culture/` | Historic sites, museums, cultural learning, galleries, performances, and entertainment. Ensure cultural descriptions are accurate and respectfully sourced. |
| `/directory/shop/` | Gift shops, local makers, galleries, sporting goods, fishing/hunting gear, and seafood products. |
| `/directory/transportation/` | Car rentals, taxis, shuttles, ferry/airport logistics, courier, and verified visitor transport. |
| `/directory/hunting/` | Local hunting guide/outfitter discovery. Verify licenses, guide status, service area, season, and rules before profile publication. |
| `/directory/game-care/` | Game-meat care, processing, cold storage, taxidermy, trophy shipping, and freight. Keep the category even when named providers are still unverified. |
| `/directory/business/{slug}/` | Reusable business profile: official name, category, contact, location/service area, season/hours, services, accessibility, original image, source, verification date, and owner correction link. No fabricated ratings or availability. |
| `/things-to-do/` | Editorial activity guide for Ketchikan organized by audience, season, duration, and location; links to verified operators and public lands. |
| `/deals/` | **Dealiciously Local** Ketchikan offers hub: browse by place/category/subcategory, with only business-approved, dated, eligibility-labeled offers. No invented or expired offers. |
| `/deals/{offer-slug}/` | Reusable offer detail: participating business, exact benefit, exclusions, redemption method, valid dates, source/approval and expiry behavior. |
| `/events-calendar/` | Filterable event calendar with dates, category, venue, organizer and source links; confirm current availability with organizers. |
| `/events/{slug}/` | Individual event detail template with original summary, schedule, venue, access details, organizer, source, last-verified date, and post-event archive/expiry rule. |
| `/parks-public-lands/` | Officially sourced Ketchikan parks/public-lands hub. Use accurate designations; do not call Tongass National Forest or Misty Fjords National Monument a national park. |
| `/hiking-trails/` | Trail pages/listings with verified access, distance/difficulty where sourced, seasonal conditions, safety notes, and responsible agency links. |
| `/plan/` | Trip-planning hub: getting here, cruise/airport/ferry information, packing, weather/tides, maps, accessibility, and visitor logistics. Link to official sources for changing schedules and conditions. |
| `/real-estate/` | Local realtor and real-estate resource directory; distinguish business profiles from current property inventory and relocation content. |
| `/directory/local-services/` | Visitor essentials such as medical services, pharmacy, groceries, fuel, laundry, and other locally verified services. |

## C. Safety & Survival education and free offline guide

This is the Svenson-site adaptation of the DisasterStrike document’s offline knowledge and survival education concepts. It is a learning/reference product, not a dispatch or live-alert system.

| Route | Page purpose and app content |
|---|---|
| `/safety-survival/` | Education hub with clear scope, reviewer/source standards, emergency limitations, and links to each guide and the free app. |
| `/safety-survival/cpr-aed/` | CPR/AED learning aids with adult, child, and infant content clearly distinguished; reviewed against current AHA guidance. Not a certification course. |
| `/safety-survival/first-aid/` | Reviewed first-aid education, visual aids, decision points, and when to call emergency services or seek professional care. |
| `/safety-survival/wilderness-first-aid/` | Remote-setting first-aid reference, staying safe, evacuation considerations, and links to recognized training. |
| `/safety-survival/water-safety/` | Boating, cold-water, drowning prevention, and water-related emergency education reviewed by qualified sources. |
| `/safety-survival/alaska-outdoor-safety/` | Ketchikan/Alaska visitor preparation: weather, cold exposure, trail/boat preparation, communication planning, and official closure/condition links. |
| `/safety-guide/` | Install the free Svenson Safety & Survival Guide PWA; explain installation, offline packs, storage, updates, and limitations. No account required for basic guides. |

### Offline app information architecture

- **Learn:** CPR/AED, first-aid basics, wilderness/remote care, Alaska outdoor safety.
- **Visual guides:** original, clinically reviewed illustrated sequences; printable PDFs; optional compressed video where licensing and offline size allow.
- **Download packs:** Boat & Fishing; Hiking & Wilderness; General Preparedness. Show pack size and last-reviewed/version date before download.
- **Offline behavior:** cache the app shell, text, diagrams, and selected resources; test the full guide in airplane mode after an explicit download. Show a visible “last updated”/stale-content notice.
- **Safety boundary:** state prominently that this is educational material, not medical certification, emergency dispatch, live hazard monitoring, or an SOS service. Do not imply it can contact rescuers without a working communication path.
- **Privacy:** no account needed for core guides; do not collect location, medical information, or emergency contacts for the education-only MVP.
- **Content governance:** name a qualified reviewer, cite primary/recognized sources, date revisions, and maintain a review/update schedule. Do not publish treatment instructions generated only by AI.

## D. Events, news, shop, and governance

| Route | Page purpose |
|---|---|
| `/events/` | Event discovery landing page modeled on Adam Griffee’s seasonal guide: season/interest photo cards, event-planning links, community context, related directory categories, and concise FAQ. Real dated listings live in `/events-calendar/`. |
| `/events-calendar/` | Current, dated community and visitor events with source, organizer, venue, accessibility, and update status. |
| `/events/{slug}/` | Individual event detail page; expire, redirect, or archive after the event according to its continuing value. |
| `/news/` | **Inside Ketchikan** editorial archive with topic filters, lead story, image-led story cards, dated authorship, source links, and related place/business/event guides. |
| `/news/{article-slug}/` | Original article with named author, publish/update dates, cited sources, local context, accessible media, related pages, and correction/contact route. |
| `/deals/` | Dealiciously Local offers directory; city → category → subcategory filters, verified providers, approved current offers, events and services, with paid placement clearly disclosed. |
| `/deals/{offer-slug}/` | Individual offer record with all material terms, dates, attribution, business profile link, and expired-offer handling. |
| `/shop/` | Svenson merchandise or other confirmed products; do not show empty product categories. |
| `/submit-a-business/` | Listing intake, owner verification, correction route, and clear editorial criteria. |
| `/advertise/` | Sponsorship/paid placement information with visible disclosure rules. |
| `/editorial-policy/` | Sourcing, updates, corrections, and author/reviewer standards. |
| `/listing-policy/` | Verification, sponsored listings, ranking, and removal policies. |
| `/privacy/`, `/terms/`, `/accessibility/` | Required site policies, including PWA/offline data behavior. |
| `/search/` | Site search. Directory filters should not produce indexable duplicate query URLs. |

## E. Phase-two statewide resource architecture

Create these only when the page can provide enough original, verified information and current authoritative sourcing. Keep these state-level guides separate from Ketchikan business listings.

- `/alaska-fishing-guide/` → `/alaska-fishing-guide/licenses/`, `/seasons/`, `/salmon/`, `/halibut/`, `/processing-shipping/`.
- `/alaska-hunting-guide/` → `/alaska-hunting-guide/seasons/`, `/licenses-tags-permits/`, `/guide-requirements/`, `/sitka-blacktail/`, `/game-care-shipping/`, `/taxidermy/`.
- Verify regulations and licensing with responsible Alaska authorities before each publication/update. Do not multiply thin species/location pages.

## F. Full-scale page universe — thousands of URLs

This is the production URL contract. Fixed pages are listed below; record families create one URL for every approved source record. A source record becomes indexable only after the page has its own verified information, original copy, meaningful media, and internal links. A record that is not complete stays private/noindex in the CMS and is omitted from XML sitemaps.

### 1. Svenson fishing and trip-planning pages

```text
/
├── fishing-charters/
│   ├── salmon/
│   │   ├── chinook-king-salmon/
│   │   ├── coho-silver-salmon/
│   │   ├── sockeye-red-salmon/
│   │   ├── pink-humpy-salmon/
│   │   └── chum-dog-salmon/
│   ├── halibut/
│   ├── rockfish/
│   ├── lingcod/
│   ├── combo-trips/
│   ├── all-day/
│   ├── half-day/                         [only if currently offered]
│   └── cruise-guests/
├── fishing-by-month/{month}/              [publish only with distinct local season content]
├── fishing-methods/{method-slug}/         [only methods Svenson confirms]
├── fishing-areas/{area-slug}/             [verified locations; do not disclose sensitive sites]
├── alaska-fishing-guide/species/
│   ├── pacific-salmon/{species-slug}/
│   ├── pacific-halibut/
│   ├── rockfish/{species-slug}/
│   ├── lingcod/
│   └── other-local-species/{species-slug}/ [include only relevant, sourced species]
├── alaska-fishing-guide/fish-identification/{species-slug}/
├── alaska-fishing-guide/fish-care/
│   ├── bleeding-and-icing/
│   ├── cleaning-and-storage/
│   ├── regulations-and-evidence/
│   ├── packing-for-travel/
│   └── shipping-fish-home/
├── rates-availability/
├── fleet-captain/
│   ├── boats/{boat-slug}/                [one page per verified vessel]
│   └── captains/{captain-slug}/           [one page per verified person]
├── what-to-bring/
├── fish-processing-shipping/
├── fishing-reports/{report-slug}/         [dated, sourced report archive]
├── fishing-gallery/{media-slug}/          [captioned, cleared media records]
├── alaska-fishing-guide/
│   ├── licenses/
│   ├── stamps-tags-recording/
│   ├── southeast-regulations/
│   ├── ketchikan-area-regulations/
│   ├── emergency-orders/
│   ├── charter-angler-rules/
│   ├── fish-identification/
│   ├── salmon/{species-slug}/
│   ├── halibut/
│   ├── rockfish/{species-slug}/
│   ├── lingcod/
│   ├── fishing-methods/{method-slug}/
│   ├── fishing-by-month/{month}/
│   ├── fishing-by-area/{area-slug}/
│   ├── catch-care/
│   └── processing-shipping/
├── about-svenson/
├── faq/
├── reviews/
├── contact/
├── book/
└── policies/{policy-slug}/
```

**Page-level content:** direct answer and unique trip intent; the Adam Griffee two-column image/copy carousel with full-width video background where approved; species biology and identification; local availability and methods only when confirmed by Svenson and official sources; trip inclusions/exclusions, season context, and logistics; current regulations linked to Alaska Department of Fish and Game (ADF&G) and federal authority as applicable; catch handling/processing; trip-suited photo/video; safety/accessibility notes; booking CTA; visible FAQs; named author/reviewer/source/date; breadcrumb and accurate structured data. No unsupported catch guarantees, rates, seasons, methods, credentials, or vessel claims. Regulation summaries show area/species/date scope and last-checked date and link to current primary rules and emergency orders.

### 1A. Fishing knowledge architecture (not a thin “fish species” page)

```text
/alaska-fishing-guide/
├── species/
│   ├── pacific-salmon/
│   │   ├── chinook-king-salmon/
│   │   ├── sockeye-red-salmon/
│   │   ├── coho-silver-salmon/
│   │   ├── pink-humpy-salmon/
│   │   └── chum-dog-salmon/
│   ├── pacific-halibut/
│   ├── rockfish/
│   │   ├── black-rockfish/
│   │   ├── yelloweye-rockfish/
│   │   ├── dusky-rockfish/
│   │   └── identification-and-release/
│   ├── lingcod/
│   └── other-locally-relevant-species/{species-slug}/
├── seasons/{month-or-season}/
├── techniques/{technique-slug}/
├── waters/{management-area-or-waterbody}/
├── regulations/{species-or-topic}/
├── fish-care/{care-topic}/
├── processing-and-shipping/{service-or-topic}/
└── fishing-reports/{dated-report-slug}/
```

Species pages answer what the fish is, identification features, habitat/range, life cycle, conservation/management context, Ketchikan/Southeast relevance, likely trip context, handling/release guidance where official sources provide it, and applicable current rules. Separate charter pages explain what Svenson actually offers. Season pages use local evidence and current reports, distinguish historical patterns from current conditions, and do not promise a catch. Method pages publish only after operator confirmation. Every regulated topic names its authority, management area, effective date/last checked, and links to emergency orders. ADF&G and NOAA are primary sources for Alaska species and rules; scientific/cultural interpretation is attributed and reviewed.

### 2. Ketchikan and Southeast Alaska destination guides

```text
/plan/
├── getting-here/
│   ├── by-air/
│   ├── by-sea/
│   ├── cruise-port/
│   └── ferry/{route-or-terminal}/
├── getting-around/
│   ├── downtown-walking/
│   ├── airport-transfers/
│   ├── ward-cove-transfers/
│   ├── shuttles/
│   ├── taxis/
│   └── car-rentals/
├── itineraries/
│   ├── one-day/
│   ├── two-days/
│   ├── three-days/
│   ├── cruise-port-day/
│   ├── fishing-trip-day/
│   ├── rainy-day/
│   ├── family-trip/
│   └── accessible-visit/
├── weather-and-seasons/{month-or-season}/
├── maps/{map-slug}/
├── neighborhoods/{neighborhood-slug}/
└── nearby-communities/{community-slug}/
```

**Page-level content:** who the guide is for; location and geography; transport/access choices; realistic time and cost factors when current sources support them; seasonal caveats; current agency, carrier, port, or operator links; related internal providers and places; FAQs; sources and last-checked date. Variable schedules and conditions are clearly time-stamped.

### 3. Searchable directory — full provider record system

```text
/directory/
├── stay/
│   ├── hotels/  motels/  lodges/  fishing-lodges/  inns/
│   ├── bed-and-breakfasts/  cabins/  vacation-rentals/
│   ├── campgrounds/  rv-parks/  glamping/
│   └── {provider-slug}/
├── food/
│   ├── restaurants/  seafood/  cafes/  coffee-sweets/  bakeries/
│   ├── food-trucks/  bars-breweries/  groceries/
│   └── {provider-slug}/
├── tours/
│   ├── fishing-charters/  cruise-excursions/  flightseeing/
│   ├── helicopter/  floatplane/  wildlife-bear-viewing/
│   ├── kayaking/  boat-tours/  driving-tours/  walking-tours/
│   └── {provider-slug}/
├── outdoors/
│   ├── outfitters/  equipment-rentals/  fishing-gear-rentals/
│   ├── hunting-guides/  wildlife-viewing/  camping-services/
│   └── {provider-slug}/
├── culture/
│   ├── museums/  historic-sites/  galleries/  cultural-learning/
│   ├── theaters-performances/  entertainment/  event-venues/
│   └── {provider-or-place-slug}/
├── shop/
│   ├── gifts/  local-makers/  art-galleries/  bookstores/
│   ├── sporting-goods/  fishing-hunting-gear/  seafood-products/
│   └── {provider-slug}/
├── transportation/
│   ├── car-rentals/  taxis/  shuttles/  bus-van-charters/
│   ├── ferry-services/  marine-freight/  fish-shipping/
│   └── {provider-slug}/
├── fish-processing-shipping/{provider-slug}/
├── hunting-game-care/
│   ├── hunting-outfitters/{provider-slug}/
│   ├── meat-processing/{provider-slug}/
│   ├── taxidermy/{provider-slug}/
│   ├── trophy-shipping/{provider-slug}/
│   └── game-care-guide/{topic-slug}/
├── visitor-services/
│   ├── medical/  pharmacy/  fuel/  laundry/  financial/
│   ├── communications/  churches-weddings/  professional-services/
│   └── {provider-slug}/
├── real-estate/
│   ├── realtors/{provider-slug}/
│   ├── property-services/{provider-slug}/
│   └── relocating-to-ketchikan/
└── business/{provider-slug}/               [canonical full profile per business]
```

**Every business profile page:**

1. Distinct, rights-cleared lead photo; subtitle; official business name; title; original description; visible action button.
2. Verified category, address or service area, NAP, hours/season, contact, booking URL, directions, and current status.
3. Services/products and decision details, with source and confirmation date for each time-sensitive fact.
4. Unique photo gallery and video module with alt/captions/credit/permission status.
5. Deals and coupons only when approved and in date; each item includes terms, eligibility, redemption method, owner confirmation, start/end dates, and expired handling.
6. Business events only when a dated event is verified; connect to venue and event detail pages.
7. Accessibility/transport notes only when sourced; transparent unanswered fields rather than invented facts.
8. Reviews only from a cited authorized source; no fabricated ratings, testimonials, or endorsement language.
9. FAQs, related category/place/event/news pages, correction/owner-claim route, editorial disclosure, and primary/additional sources.
10. Accurate `LocalBusiness` subtype where justified, `BreadcrumbList`, and `FAQPage` only for visible FAQs; stable `@id`, canonical URL, unique title/meta, and image metadata.

**Directory scale rule:** scrape and reconcile Visit Ketchikan, chamber/public directories, official operator sites, agency sources, and owner submissions. Keep a provenance record per field and deduplicate entities across categories. Build one rich profile per real provider; do not create one profile for every keyword variation. Category/search facets are user filters and are noindex unless they have distinct curated editorial content.

### 4. Parks, public lands, trails, places, and attractions

```text
/parks-public-lands/
├── tongass-national-forest/
├── misty-fjords-national-monument/
├── alaska-state-parks/{park-slug}/
├── city-parks/{park-slug}/
└── {land-unit-slug}/
/hiking-trails/
├── {trail-slug}/                          [each verified trail gets its own guide]
├── trail-systems/{system-slug}/
├── trailheads/{trailhead-slug}/
└── trail-planning/{topic-slug}/
/places-to-discover/
├── downtown-ketchikan/
├── creek-street/
├── saxman-totem-park/
├── totem-bight-state-historical-park/
├── herring-cove/
└── {place-slug}/
```

**Page-level content:** official designation and land manager; what the place is; location/access; route, surface, distance/elevation only as supported by agency sources; facilities/reservations/fees only when current; seasonal/weather risks; accessibility and transport; respectful cultural context from community-approved sources; unique image/illustration; source dates; route/map; FAQs; related guide and provider cards. The site does not relabel national monuments or forests as national parks.

### 5. Things to do and experience pages

```text
/things-to-do/
├── fishing/  flightseeing/  helicopter-tours/  floatplane-tours/
├── bear-wildlife-viewing/  kayaking/  boat-tours/  rainforest-tours/
├── zipline-adventure/  museums/  historic-walks/  native-arts/
├── shopping/  live-entertainment/  family-activities/
├── rainy-day/  free-activities/  accessible-activities/
└── {experience-slug}/
```

Each experience archive has its own useful introduction and selection criteria, linked verified operators/places, distinct relevant image cards using image + subtitle + title + description + button, audience/season filters, FAQs, and current source/condition notes. Individual operator experiences become separate pages only where the operator and service have distinct verified content.

### 6. Dealiciously Local offers and coupons

```text
/deals/
├── active/
├── stay/                                  [lodging, cabins, campgrounds]
├── food/                                  [restaurants, cafes, food shops]
├── fishing-and-tours/                     [charters, excursions, guided tours]
├── outdoors-and-rentals/                  [gear, rentals, outdoor activities]
├── shopping/                              [gifts, galleries, local makers]
├── transportation/
├── services/
├── coupons/                               [code or printable offers]
├── packages/                              [multi-provider bundles with clear terms]
├── seasonal/{season-or-holiday}/
├── business/{provider-slug}/              [offers attached to a verified profile]
├── submit-an-offer/                       [business submission; not indexable]
└── {offer-slug}/                          [one page per owner-approved offer]
```

The Dealiciously Local archive uses category filters, active-date controls, card/photo, subtitle, offer title, savings/value description, deadline badge, and a clear **Get Deal / Redeem Coupon / Book Offer** button. Detail pages include verified provider and profile link, exact dollar/percent/value benefit, baseline price where needed to substantiate savings, eligibility, blackout dates, capacity/inventory, booking code/URL, redemption steps, exclusions, validity dates/timezone, owner approval and source, sponsorship disclosure, cancellation/stacking rules, and expiry behavior. Expired offers are removed from active feeds and sitemap; archive only if the page has continuing informational value. A business profile can show deals, coupons, packages, events, services, photos, and video as its own modules; each approved offer gets its own URL when the terms and user intent merit a complete page. Never invent an offer, savings amount, urgency, or inventory.

### 6A. Alaska and Ketchikan history library

```text
/alaska-history/
├── timeline/
│   ├── before-contact-and-ancient-alaska/
│   ├── russian-america/
│   ├── alaska-purchase-and-transfer/
│   ├── territorial-alaska/
│   ├── gold-rushes/{region-or-rush}/
│   ├── world-war-ii-and-the-aleutian-campaign/
│   ├── statehood/
│   ├── alaska-native-claims-settlement-act/
│   └── contemporary-alaska/
├── alaska-native-peoples/
│   ├── southeast-alaska/{nation-or-community}/
│   ├── tlingit-history/
│   ├── haida-history/
│   ├── tsimshian-history/
│   ├── iñupiaq-history/
│   ├── yupik-history/
│   ├── unangan-history/
│   └── athabascan-peoples/
├── industries/
│   ├── salmon-fisheries-and-canneries/
│   ├── commercial-fishing/{fishery-or-region}/
│   ├── mining-and-gold/
│   ├── timber-and-forestry/
│   ├── maritime-and-bush-aviation/
│   ├── military-history/
│   └── oil-and-pipeline/
├── regions/{region-slug}/
├── historic-places/{place-slug}/
├── people/{person-slug}/                    [only with reliable sourced biography]
└── sources-and-corrections/

/inside-ketchikan/history/
├── kichxáan-and-the-tlingit-fish-camp/
├── ketchikan-creek-and-salmon/
├── first-cannery-and-fishing-industry/
├── gold-copper-and-the-port-town/
├── canneries-and-fishing-families/
├── sprucemills-timber-and-world-war-ii/
├── ward-cove-pulp-mill-and-closure/
├── creek-street-and-stedman-thomas/
├── saxman-totem-heritage-center/
├── ketchikan-through-photographs/{story-slug}/
└── oral-histories/{interview-slug}/          [with participant consent]
```

The history hub covers Alaska's Indigenous histories and living nations, Russian America and colonial impacts, U.S. purchase/transfer, territorial government, gold rushes, fisheries/canneries, maritime trade, mining, timber, World War II, statehood, ANCSA, oil/pipeline, and contemporary Alaska—with separate regional chapters and source-led place pages. Ketchikan chapters cover the Tlingit fish-camp history at Kichxáan, salmon and commercial fisheries, canneries, mining/supply-port growth, timber/mills, wartime activity, Creek Street and historic districts, and community change. Every article has original writing, byline, publish/update date, primary/authoritative sources, image rights/captions, correction route, and respectful attribution. Alaska Native histories and cultural knowledge require Indigenous/community-approved sources and review; no invented oral history, pan-Indigenous generalization, or scraped/rephrased tourism copy.

### 7. Events and calendar

```text
/events/
├── calendar/
├── annual-events/{event-slug}/
├── arts-culture/  food-drink/  fishing/  outdoors/  community/
├── events-by-month/{year}/{month}/         [archive pages only when useful and populated]
└── {event-slug}/                           [one verified event record per date/edition]
```

Event detail includes event name, date/time/timezone, venue, organizer, original summary, ticket/reservation link, age/access information where published, image and rights credit, source/update date, weather/cancellation contact, related dining/stay/transport cards, and `Event` schema. Past events are archived only if the page retains value; otherwise expire/redirect. Empty date/category filters are not indexed.

### 8. Inside Ketchikan news and editorial

```text
/inside-ketchikan/
├── news/
├── fishing-reports/
├── community/  local-business/  arts-culture/
├── events/  outdoors/  visitor-updates/  safety/
├── authors/{author-slug}/
└── {article-slug}/                        [one original article per story]
```

Each story has a named accountable author, publication and update timestamps, original reporting or synthesis, cited primary sources, local media with rights/credits, correction route, related profiles/guides, visible FAQ only when useful, and accurate `Article`/`NewsArticle` and breadcrumb schema. This is not a feed of scraped duplicate articles.

### 9. Safety & Survival learning library and offline app

```text
/safety-survival/
├── cpr-aed/
│   ├── adult-cpr/  child-cpr/  infant-cpr/  aed-use/
│   └── choking-response/                  [each reviewed and clearly scoped]
├── first-aid/
│   ├── bleeding/  burns/  allergic-reaction/  fractures/
│   ├── hypothermia/  heat-illness/  wound-care/
│   └── emergency-response/
├── wilderness-first-aid/
│   ├── remote-assessment/  evacuation-planning/
│   ├── cold-injury/  water-safety/  communications/
│   └── boat-and-fishing-safety/
├── alaska-outdoor-safety/{topic-slug}/
├── reviewers/{reviewer-slug}/
└── sources-and-update-policy/
/safety-guide/
├── app-install/
├── offline-packs/boat-and-fishing/
├── offline-packs/hiking-and-wilderness/
├── offline-packs/general-preparedness/
└── update-history/{version}/
```

Every clinical/safety page names its qualified reviewer, primary source, review date, intended audience, limitations, and emergency escalation. CPR/first-aid sequences are reviewed against current AHA/Red Cross guidance; outdoor/hunting/fishing safety uses responsible agencies. The download app provides offline educational references, not emergency dispatch, certification, diagnosis, or live hazard alerts. No AI-only treatment instructions.

### 10. Shop, products, policies, and site utilities

```text
/shop/
├── apparel/{product-slug}/
├── fishing-gear/{product-slug}/
├── gifts/{product-slug}/
├── cart/  checkout/  shipping/  returns/
└── size-guide/
/search/  /site-map/  /submit-a-business/  /claim-or-correct-listing/
/advertise/  /editorial-policy/  /listing-policy/
/privacy/  /terms/  /accessibility/  /contact/
```

Only confirmed products are listed. Product pages use original product photos, real stock/price/shipping data, clear merchant identity, checkout and returns policy, and eligible `Product`/`Offer` schema. Search result URLs, empty filters, and internal search queries are noindex.

### 11. Languages and translated URL families

```text
/{language-code}/{canonical-route}/
```

Language selector displays only languages with complete translated page content. Translated pages are human-reviewed, preserve the same source/medical/regulatory standards, use language-specific canonicals and reciprocal `hreflang`, and are counted as pages only after translation QA. Do not auto-publish machine-translated YMYL safety/regulation pages.

## G. Page counts and sitemap publication rules

The production inventory is generated from the page records, not guessed from keyword counts:

```text
Indexable URLs = curated evergreen fishing and history guides
                + complete verified business profiles
                + complete trail/place/attraction records
                + current/archived valuable event records
                + owner-approved active offers and useful archives
                + original Inside Ketchikan / Inside Alaska articles
                + reviewed species, season, method, area, and fish-care guides
                + fully reviewed translated equivalents
```

The requirement is **thousands of published, useful pages**. The 7,900 supplied keyword phrases are assignment signals to map to the right page family, not 7,900 separate URLs. Before each release, generate and reconcile: (1) full CMS route inventory, (2) XML sitemap by content family, (3) canonical/indexability report, (4) source/verification report, (5) duplicate-title/H1/content and image-rights checks, and (6) missing-profile/page report. Publish a URL only when all required page modules are populated. Use XML sitemap index files when the URL volume requires them; do not emit draft, noindex, filter, staging, or empty-record URLs.

## Search intent and launch controls

- KeywordTool exports supplied for October 20–22, 2026 show Ketchikan search demand around things to do (5,400 average monthly), restaurants (3,600), hotels (1,900), fishing charters (1,900), fishing in Ketchikan (880), salmon fishing (720), and tours (720). Local Ketchikan hunting terms in the supplied hunt export are about 30 each. These are research inputs, not guarantees; revalidate before publication.
- Give every indexable canonical page one primary intent. The main fishing charter page, category filters, and Svenson booking pages must not become duplicate versions of the same target.
- Index business/event/article profiles only when they are complete, original, and verified; noindex thin records and filter parameters.
- Keep staging password-protected and noindex. At launch, map canonicals, sitemap, redirects, schema IDs, and internal links to the approved production domain.

## Local content Elementor template families

Use the reusable layout system from AdamGriffee.com’s local sections—“Deliciously Local,” directory rails, event features, local story feeds, and things-to-do discovery—adapted to Ketchikan content and Svenson styling. These are page-family templates built with Elementor Pro Theme Builder and native Elementor containers/widgets or approved Elementor-compatible plugins. Do not build page bodies with HTML widgets or coded section markup.

| Elementor template family | Used on | Required editable modules |
|---|---|---|
| `CLM Ketchikan — Local Discovery Section` | Homepage, `/things-to-do/`, `/directory/` | Image-backed section intro; city/topic filter chips; category rail; every card has one unique relevant photo, eyebrow, title, description, and visible button; responsive carousel controls; clear “browse all” route. |
| `CLM Ketchikan — Restaurant Directory` | `/directory/food/`, restaurant/cafe archive, local dining feature | Dining-type filters (seafood, cafe/coffee, bakery, casual, local favorite, fine dining only when supported); image-led restaurant cards; map/list switch only if accurate location data is available; hours/season/source status; full restaurant profile links. |
| `CLM Ketchikan — Business Profile` | `/directory/business/{slug}/` | Verified identity/contact/location/service area; source and last-verified date; unique licensed photo; services and booking/contact CTA; accessibility/seasonal details when verified; related directory/event/story cards. |
| `CLM Ketchikan — Dealiciously Local Offers` | `/deals/`, `/deals/{offer-slug}/`, homepage offers rail | Category/subcategory filters; approved active offers only; provider profile association; exact terms, dates, redemption CTA and expiry; paid placement label; no fabricated savings or endorsements. |
| `CLM Ketchikan — Things to Do` | `/things-to-do/`, activity category pages | Seasonal/audience/length filters; image-led operator/attraction cards; distinguish public lands from commercial tours; official condition/booking links; featured local guide and FAQ. |
| `CLM Ketchikan — Event Discovery` | `/events/` | Seasonal/interest feature cards, organizer/event discovery routes, editorial community context, related dining/things-to-do, and FAQ; never imply listings are current unless feed/update is confirmed. |
| `CLM Ketchikan — Events Calendar` | `/events-calendar/` | Date/category filters, event cards with image, subtitle, title, description and action; venue/date/organizer/source; accessibility where published; stale/past-event handling. |
| `CLM Ketchikan — Inside Ketchikan Archive` | `/news/`, category archives | Lead story plus dated source-backed editorial cards; topic filters; author/source labels; related businesses, places, events and guides. |
| `CLM Ketchikan — Inside Ketchikan Story` | `/news/{article-slug}/` | Author, publish/update timestamps, original article, cited primary sources, relevant local media, related cards, corrections/contact path and Article schema where eligible. |

### Shared card and media standard

Every image-led tile—including icon-led ones—uses **unique relevant image + subtitle/eyebrow + title + descriptive snippet + visible button**. No duplicate photo within one page. Use actual Ketchikan operator, business, venue, event, trail, or source-agency media; save approved assets locally in optimized WebP with descriptive filename, alt text, source/credit, license/permission status, and destination URL. Do not use generated stand-ins, watermarked previews, generic stock, or remote hotlinks as final production media. Fit the whole subject where possible; avoid random crops and hard cuts. A section is not launch-ready until its asset rights and source are recorded.

### Home-page local discovery sequence

Place the community layer after Svenson’s fishing/service proof and before FAQs/footer: (1) Ketchikan local discovery intro and search/category chips, (2) “Deliciously Local” restaurants and cafes, (3) seasonal things to do, (4) verified upcoming events, (5) Inside Ketchikan stories, (6) current approved local offers, and (7) full directory CTA. Each rail uses its matching template family above. Empty or unverified feeds use an honest browse/submit state instead of fabricated cards.
