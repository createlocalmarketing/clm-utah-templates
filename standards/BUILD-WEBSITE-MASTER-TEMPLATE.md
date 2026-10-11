# BUILD WEBSITE — MASTER SYSTEM TEMPLATE

**Create Local Marketing / Quality platform standard**  
**Version:** 1.0 | **Compiled:** 2026-10-11 | **Document type:** reusable operating procedure + project kickoff + architecture contract + execution/acceptance checklist  
**Status:** reusable master standard; project-specific exceptions must be populated and approved before execution  
**Canonical short name:** **Build Website**  
**Directive:** Build it once. Reuse it across brands and markets. Never mistake a template, route, screenshot, commit or saved Elementor JSON for a complete, live-verified page.

> **Coverage and provenance.** This template consolidates accessible requirements from the Architecture Audit Comparison, Design Meeting Workflow, SEO Architecture Blueprint, National Parks Guide, Utah Real Estate Directory, Inside Utah Real Estate, Realtor Website Template/single-listing sites, Quality Dental/Bakersfield Dentists, content-engine, Quality MCP/Quality CRM, cross-market page-universe and website audit discussions and recovered project handoffs. It is a consolidated operational standard, **not** a claim of having read a verbatim export of every historic conversation. When a previously approved project specification conflicts with a generic instruction below, consult the original evidence, capture the conflict and preserve the explicitly approved **site-specific** rule. Never silently overwrite a locked design.

---

## 00 — The rule of execution

**When someone says "Build website":**

1. Recover and reconcile the client's existing site history, approved visual references, SEO/page architecture, identity, project instructions, files, GitHub evidence, connected site and exceptions. Never start over from a blank interpretation of a previously scoped project.
2. Create or update the project in the **Project Control Center**, establish a canonical GitHub source, a persistent chronological audit trail and a page-by-page acceptance ledger. Track owner, task, evidence, last verified action and next action.
3. Audit the **actual** target WordPress installation before edits; verify exact site, Kinsta environment, connected MCP authorization, current theme, plugins, Elementor Pro/Kit, CPTs, taxonomies, URL structure, templates, media, pages, SEO settings, analytics, redirects, backups and defects. Never edit a different connected website.
4. For rebuilds, take and verify a **recoverable full-site backup** (files, database, media, settings). Inventory and classify assets as KEEP, IMPROVE, REBUILD, CONSOLIDATE, REDIRECT, ARCHIVE or REMOVE. Carry out the approved **flush/reset** of inherited unrelated content/branding/templates/plugins; preserve core infrastructure, required records, active clients, valid redirects and data ownership. Use staged/reversible deletion with receipts rather than silently destroying shared records.
5. Create the **correct custom branded WordPress theme** and the **vertical-specific first-party core plugin**, sourced in GitHub, before mass-producing pages. Establish a clean Elementor Global Kit, native Theme Builder templates, shared typography, breakpoints, tokens, card/CTA behavior, menus and responsive design.
6. Build the **entire data, SEO and URL architecture** before page instantiation: entities, verified IDs, geographic hierarchies, canonical paths, template families, CPTs, taxonomies, ACF, schemas, source provenance, internal links and the route universe. Do not invent counts, queries, business records or partnerships.
7. Lock and live-verify **one canonical instance of each visual component** (notably the two-column hero carousel and photo-rich content card) against the authorized CLM/UTRD design references and this site's brand skin, then distribute that component across applicable page families.
8. Generate/populate all approved page instances through a **repeatable, idempotent production pipeline**, not manual page-by-page copy/paste. Each page must have **original intent-matched content**, verified entities and licensed location-accurate imagery. A bare WordPress page or generic route remains **Incomplete/Draft**.
9. Implement EVERY visible, individually editable website element as a **native Elementor/Elementor Pro container/widget**. Use Theme Builder, Loop Grid/Carousel, native Image/Heading/Text/Button/Accordion/Video/Form elements and dynamic ACF tags. Do not build the production page as an HTML widget, embedded iframe, shortcode page, CSS illusion or external static SPA pretending to be Elementor.
10. Inspect each exact page in the editor and in the actual frontend on desktop/tablet/mobile. Confirm links, media, content, SEO/schema, accessibility, performance, tracking and brand coherence. Keep an exact per-page PASS/FAIL and screenshot/code evidence; no source-only or JSON-only signoff.
11. Route design changes through **Design Meeting Flow** (meeting notes → requirement → owner → project/page/component ID → screenshot and comments → revision → independent verification → human approval). Keep Pending / In Process / Completed-for-approval; never promote failed items to Complete.
12. Only publish/deploy/migrate after the approval and safety gates are satisfied. Report precise counts: **targeted, instantiated, populated, media-approved, QA-passed, approved, published**. Never conflate them.

**Immediate prohibition:** No "done", "built", "working", "connected", "approved" or "live" claim without exact corresponding evidence. No filler status update in place of implementation.

---

## 01 — One system, three fundamental layers

**Base architecture:** **CLM/Quality Universal Core → Site/Brand/Vertical Layer → Canonical Content/Data/Geography Layer**.

- **Universal platform:** identity/accounts and permissions, sources/provenance, places, content/editorial, directory, commerce, advertising, education, intelligence, media, forms/lead routing, analytics, reusable UI behavior, design libraries, notifications, audit/change control, security and integrations.
- **Brand layer:** unique display identity, registered theme name, WordPress theme URI, theme slug, logo and asset treatment, approved colors/typography, brand voice, hero patterns, categories, CTAs, disclosures, language, jurisdiction and audience.
- **Vertical/domain layer:** real estate listings/MLS, dental providers/practices, national parks/trails, local businesses, property landing sites, commerce, events, services, learning, and any location-specific regulations or expertise.
- **Content/entity layer:** one canonical identity per park/place/business/provider/product/story, with source ID, provenance, update and validation timestamps, local context, related entities and controlled syndication. Each published URL gets a uniquely useful treatment.
- **Operating principle:** a parent platform can syndicate facts/entities downstream; it **cannot** clone identical SEO prose or masquerade as the owner/official agency.
- **Replication:** national → state → county → city/neighborhood/park → service/topic → named entity → offer/article/event is configured by URL/data and brand scope, not a monolithic set of manually copied pages.

A WordPress theme defines the visual shell and supports Elementor Theme Builder. A first-party core plugin owns CPTs, taxonomies, verified data and business logic. **Do not bury business logic in the theme or present an HTML front-end as the plugin's editability layer.**

---

## 02 — Source-of-truth hierarchy and conflicts

1. Owner's **most recent explicit approved instruction for this exact project/component**.
2. Locked project-specific design/architecture/specification and decision history (including archived threads and handoffs).
3. Approved CLM/UTRD design and component reference, shared architecture and this site's approved theme/Kit tokens.
4. GitHub code, source commit, test results, accepted before/after screenshots and live Elementor document state.
5. Up-to-date official/primary data sources and verified licensed datasets.
6. Fresh research and recommendations **only for undecided requirements**, never to supersede decisions by accident.

When contradictory sources appear: record a **decision-conflict card** with citations/links, dates, affected components, the competing options, current production state and final approval needed. Do not silently pick an outdated version or repaint the whole site while changing a single control.

**Global vs exception:** Adam's Poppins identity, eXp Luxury logos and 7169 Canyon Drive property micro-site constraints are **not** universal site branding. Bakersfield Dentists' teal/gold palette is site-specific. National Parks Guide forest/canyon palette is site-specific. The **component hierarchy, source governance, native Elementor rule and QA discipline** are universal.

---

## 03 — "Build Website" project kickoff card (copy and fill)

| Field | Value |
|---|---|
| Project and canonical slug | `[site-project]` |
| Domain(s) and approved staging site | `[domain, www preference, staging hostname]` |
| Vertical, audience and business model | `[e.g., directory/media/services/commerce/lead generation]` |
| Parent platform / sibling sites | `[canonical data owner + syndication targets]` |
| Existing or clean install | `[rebuild/greenfield]` |
| Current WordPress/Kinsta environment | `[verified URL, installation ID, environment]` |
| Quality MCP / WordPress authorized connection | `[connector, verified target, permissions]` |
| GitHub repo + project board + working branch | `[links]` |
| Original approved design references | `[URLs, screenshots, GitHub components, approvals]` |
| Source chats / specification files | `[direct references, complete archive/handoff list]` |
| Approved brand assets, colors, fonts, logos | `[files + licenses + locked values]` |
| Theme name / slug / URI / text domain | `[human-readable, brand-specific]` |
| First-party core plugin slug / PHP namespace | `[brand-specific readable name]` |
| Primary/secondary user journeys | `[exact actions]` |
| Geographic and business coverage | `[real service area and rules]` |
| Canonical CPT, taxonomy and ACF inventory | `[IDs, relationships]` |
| Approved URL map/page register | `[every requested path, template, status]` |
| KeywordTool.io market/date/locale evidence | `[source IDs, actual volumes/intent]` |
| Media rights and video plan | `[sources, filenames, attribution]` |
| Conversions, tracking, lead forms and automations | `[destinations/owners/event names]` |
| Compliance, accessibility, privacy and disclaimers | `[sector-specific checks]` |
| Native app / external tools / integrations | `[approved only]` |
| Backup/restore receipt and reset scope | `[backup status, verification and owner decision]` |
| Publication and launch policy | `[staging, noindex, review, explicit approval]` |
| Responsible owner and reviewer | `[names/roles]` |

**First deliverable:** direct access to the actual site and the persistent GitHub project, a current-vs-approved audit, exact complete page register and a run order. **Do not substitute a plan for the website build**.

---

## 04 — Architecture Audit Comparison: complete current-state audit

**Never audit only the homepage.** Crawl and inventory the existing site and compare to the approved future-state design/feature/SEO contracts and competitor/best-in-class references. Record EXACT observed facts and unknowns.

### Evidence matrix

| Audit category | Required comparisons / evidence |
|---|---|
| Site and infrastructure | Host, DNS, SSL, redirects, public/staging, backups, WordPress/PHP versions, plugins, themes, cron, caches, auth, security |
| Page inventory | Full discovered URL list, orphan/duplicate/redirect/canonical/noindex, fragment routes vs real server paths, page families, missing pages |
| SEO | SERP positions where sourced, GSC if authorized, titles/meta, one H1, heading hierarchy, content, schema, canonicals, robots, sitemap, OG/Twitter, image SEO |
| Geography/entity | Service areas, country/state/county/city/neighborhood/park/entrance, business geocodes, place IDs/NPI/MLS/NPS code, parent-child relationships |
| Architecture | Theme name/URI, plugin responsibilities, ACF groups, CPTs, taxonomies, URL uniqueness, inter-site content/data contracts |
| Design system | Approved source vs actual header, navigation, Kit typography, color/contrast, button system, hero geometry, card treatment, images, overlays and spacing |
| Elementor | Every template/document ID, widgets and parent-child containers, responsive controls, Theme Builder display conditions, loops/dynamic tags, unexpected HTML widgets |
| UX/conversions | Audience journeys, navigation depth, real target pages, forms, booking, contact, phone, checkout, feedback, lead routing, real counts that drill down |
| Media | Original vs placeholder imagery, recognizable site-specific photos, rights, SEO filename/WebP/AVIF, crop/position, resolution, image loading, duplicates |
| Performance | Mobile CWV/LCP/INP/CLS, cache, CDN, WebP, size, lazy loading, keyboard access, screen-reader semantics, reduced motion |
| Trust/accessibility | Author/source/review dates, first-party/paid labels, consent, privacy, WCAG AA, real ratings and compliance, disclaimers |
| Analytics | GA4/GTM/Search Console where authorized, events, form attribution, conversion funnel and real operational reporting |
| Security/integrations | Secrets, endpoints, user roles, plugin dependencies, WP REST authorization, claims/offer fraud, payment processing |
| Competitors/market | Category-by-category comparison with evidence, keyword opportunities, missing functional behaviors; no fabricated competitor findings |

### Disposition and comparison rules

Each existing item receives `KEEP`, `IMPROVE`, `REBUILD`, `CONSOLIDATE`, `REDIRECT`, `ARCHIVE` or `REMOVE`; each gap receives `REQUIRED`, `OPTIONAL`, `BLOCKED` or `NOT APPLICABLE`. A missing page is not a PASS. A source-only screenshot is not browser testing. Audit every page where feasible and every distinct template and journey at minimum.

**Audit output:** executive score and current-state summary; evidence-backed scorecard; critical/high findings; per-URL table; broken links; technical SEO; performance; UX/mobiles; content; geographic/directory; conversion; compliance; analytics; competitive/monetization; future-state sitemap; approved homepage contract; prioritized remediation backlog; 30/60/90/180-day execution and acceptance plan. For each claim: exact URL, screenshot/evidence, impact, owner, fix and priority.

---

## 05 — Rebuild/flush/reset protocol (not optional when inherited data contaminates the site)

1. Confirm exact **site and environment**. Never use an MCP authenticated to a different client/domain.
2. Confirm verified full backup and restore method for **database, media, Elementor docs, kit/theme, menus, plugins, SEO metadata, users, redirects and site options**. A theme export or individual template backup is **not** a full restore point.
3. Export a content/media/redirect/source ledger; identify active client or business records that cannot be deleted.
4. `KEEP`: WordPress infrastructure, legitimate users/roles, approved payments/leads, required plugins/integrations, domain/SSL/Kinsta config, SEO value and valid data.
5. `ARCHIVE`: old theme/template/Kit settings, old images and posts if reversible; preserve source receipts, owner and timestamps.
6. `REMOVE/FLUSH`: unrelated inherited brand assets, copied navigation, unrelated library templates, outdated global styles/headers/footers, irrelevant plugins and draft junk. **Actually perform** the requested cleanup after evidence/backup checks rather than repeatedly deferring it.
7. Create/activate the correct brand theme + core plugin; install clean Elementor Kit and Theme Builder conditions; reset site schema/logo/title/favicon.
8. Rebuild required redirects and protect external backlinks/organic traffic for existing sites; avoid deleting live content before staged migration.
9. Verify old logo, legacy assets and irrelevant templates no longer appear on the frontend/Elementor controls. Record before/after in GitHub.
10. Run health/rollback tests and document any intentionally retained legacy media and why.

**Rebuild policy exceptions:** e.g. Bakersfield Smile Design rebuild stays on its ADS subdomain until controlled migration; DentistBakersfield.com can build on its approved live target; unique property microsite templates must not be disturbed by an unrelated global redesign.

---

## 06 — Theme and first-party plugin standards

**Every vertical/site gets a distinct readable technical identity**—not meaningless `clm-` prefixes in customer-visible names. Example:

```
Theme display: National Parks Guide | America's National Parks
Theme slug:    national-parks-guide
Theme URI:     https://nationalparksguide.co/
Plugin slug:   national-parks-guide-core
PHP/Text ID:   national-parks-guide
CSS namespace: npg-
ACF keys:      npg_park_name, npg_trail_distance_mi
Taxonomies:    npg_park, npg_state, npg_activity
```

- Use **WordPress Theme URI** as correct publisher/theme identity metadata, not a magic SEO keyword lever. URLs, content and entity relationships determine organic SEO performance; never stuff theme metadata.
- Custom theme owns accessibility-ready wrappers, fonts/tokens, asset loading, image sizes, menu registration, responsive fallbacks, Elementor compatibility and header/footer hooks.
- Core plugin owns CPTs/taxonomies, ACF fields, verified source/entity records, site/page generators, APIs, data imports, dynamic queries, schema where appropriate, admin interfaces, commerce/claims, audits and integrations.
- Separate shared Quality/CLM universal platform functions from vertical/site exceptions; version interfaces and migration steps.
- WordPress pages use **native Elementor** containers/widgets for all visible elements; underlying PHP logic/REST may be bespoke **outside** the page visual tree.
- Do not install unauthorized external plugins/services. WPForms Elite, WooCommerce, Elementor Pro, ACF Pro, Quality MCP, approved SEO tooling and licensed asset sources are used only within the actual site scope and entitlements.
- GitHub includes deployable PHP, CSS, JS modules where logically needed, migrations, exportable Elementor JSON, CPT schemas, tests, changelogs, architecture diagrams and approval evidence. Do not let live WordPress diverge silently from source.
- Theme/layout changes require isolated tests; do not stack global CSS bandages over embedded Elementor problems.

---

## 07 — SEO Architecture Blueprint: research first, exact page universe second

### Per-page search intelligence

For every homepage, section, category, subcategory, city/park/service, named business/provider, trail, story, event, offer and product:

- Primary query; close variants clustered into **one** canonical intent page where appropriate.
- Real location, language, country and timeframe; keyword research via connected KeywordTool.io and approved original sources. Record **Suggestions / Related / Questions / Prepositions**, monthly volume, competition if available, search intent and source references. Never add overlapping variants as unique audience volume.
- Examine live SERP, People Also Ask, image/video/local packs, dominant intent, competitors and actual answers. Do not pretend AI brainstormed questions are verified PAA.
- For explicit dental strategy, only >0 verified-volume exact-match terms become exact-intent standalone pages; zero-volume terms roll into stronger parents unless another documented need justifies the URL. Apply other-vertical thresholds from their approved keyword contracts.
- Build topic/entity clusters and avoid thin doorway pages, duplicates or pages differentiated solely by swapping a city/park word.
- One unique canonical URL per intent. Avoid slug collisions; stable taxonomy and location depth. Distinguish native WordPress paths from client-side preview hashes.
- Map headline and H1–H5 only as semantically justified, answer-first text, detailed original expertise, useful tables/data, places, visual explainer modules, FAQs and internal navigation into the next intent.
- Sitewide: schema accurately matches visible facts (Organization/WebSite, BreadcrumbList, Article/NewsArticle, Place, LocalBusiness, Product/Offer, Course, VideoObject, Event, etc. as relevant). Do **not** mark up unqualified FAQ rich results, unverifiable reviews/ratings, medical claims or unavailable events/offers.
- Include unique title/meta/OG/Twitter, canonical, breadcrumbs, structured media, accurate `dateModified`/reviewers, author bios and topical E-E-A-T. Apply healthcare/financial/YMYL checks and legal disclaimers where needed.
- Handle pagination, filters, facets, search results, duplicate content, robots, sitemaps, redirect chains, cross-domain canonicals and indexation policy.
- Publish only genuinely complete, unique and useful pages. **An inventory row is not a finished page.**

### Every URL gets a contract (machine-readable recommended)

```
page_id, project_id, domain, canonical_url, page_type, template_id,
parent_id, park_or_geo_id, primary_keyword, volume_source,
search_intent, named_entities, required_sections,
required_media_ids, dynamic_query_id, internal_links,
schema_types, CTA_targets, author, editor, source_urls,
source_checked_at, editorial_status, image_rights_status,
frontend_qa_status, owner_approval, publish_status,
github_issue_url, preview_url, commit_sha
```

Do not generate an orphaned URL without this metadata and its required content, images and interactions. Counts must be derived from actual rows, not inflated by theoretical permutations.

### Site architecture and content families

- Platform/national hub → state hub → county/region → city/neighborhood/park/gateway → topic/category/service → subcategory → entity/profile → related stories/events/offers/products.
- Separate parent hub, directory/filter results, information article, booking/lead page, service money page and individual verified entity profile by intent.
- Canonical entities may be represented on multiple approved sibling sites through genuinely different contextual content and controlled canonical relationships, not boilerplate clones.
- Parent menu and page counts **click through to real filtered lists**. Every navigation item, card link, breadcrumb, call button, tab and footer link resolves to an actual experience or is not displayed.

---

## 08 — Native Elementor design system: absolute production rule

**Production page element tree is native Elementor/Elementor Pro.** Layouts are editable containers and widgets, not `html`, `shortcode`, an iframe of GitHub Pages, HTML pasted into text editors, custom source-generated card markup or an inert screenshot. Native widgets may have proper registered extension code at the plugin layer when necessary, but visual child elements still need exposed Elementor edit controls.

### Globally reusable visible components

- Header: utility row, branding identity/portrait/logo as appropriate, desktop mega/drop menus, responsive nav, search, CTA and state/location indicators.
- Hero: **two-column carousel**; one side stunning, location-accurate high-resolution photo/video; other side editable eyebrow, H1/title, subtitle, snippet, details and paired/approved CTAs. The **whole slide** changes—not merely an image carousel within static text.
- Section header: topical eyebrow/kicker, H2, helpful subtitle and clear explanation; no empty block.
- Destination/service/business/product/story card: **real image → topical eyebrow → specific title → subtitle → original useful snippet → labeled metadata → visible CTA button**, consistent hierarchy and aspect ratios. Generic no-image rectangles are a design failure.
- Carousel/Loop rail: functional horizontal movement, good mobile swipe, mixed genuinely relevant entities, linked filter/category heading and accurate real counts. For local directories, mix operators/practices as approved rather than showing a single provider everywhere.
- Local profiles: authentic name, real property/practice/operator media, sourced description, address and map, contacts, offers where real, owner claims, reviews only if substantiated, entity-specific conversion.
- Explainers: named-place photography, relevant short clips and interactive tools only when implemented, accessible source references, facts and decision points.
- FAQ: native Accordion/Nested Accordion, question-by-question original verifiable answers.
- Forms: native Elementor/approved WPForms integration, correct validation and lead destination, spam prevention, consent, analytics and success messaging.
- Footer: real brand logo, business/legal text, actual links, attribution/copyright and appropriate sector disclosures.
- Commerce: actual WooCommerce product/media/price/checkout/shipping/payment/inventory; a product concept is not a purchasable product.

### Universal design contracts

- Every image card needs **media, eyebrow, title, subtitle, snippet, CTA**; exceptions must be approved and recorded.
- Dramatic "dopamine-rich" photography, people/experiences where relevant, authentic assets and substantial editorial page composition. Avoid thin repetitive text walls and ornamental icon-only grids.
- Real photo must depict the named subject; if using a clearly labeled regional scene as interim context, do not present it as the merchant/property/practice photo and **do not claim that page finished**.
- Source is the approved GitHub/CLM/UTRD component behavior translated **natively** into each site's design tokens, not a screenshot approximation. Site-specific header/carousel geometry and fonts may differ by approved brand.
- Typography roles: shared CLM baseline uses **Inter** for standard UI/body, **Oswald** for labels and metadata, **Playfair Display** for IUR editorial headlines as approved, **Poppins** for AdamGriffee identity/header exception. Individual brands such as NPG or Quality Dental may have their **own explicitly approved** fonts; do not overwrite them with the global baseline or old Elementor settings.
- Consistent padding, photo ratio, alignment, responsive scale, functional pagination arrows, equal-width/bottom-aligned CTA rows where prescribed, keyboard operation, reduced motion and visible focus indicators.
- Build a canonical component once, compare to approved reference in actual browser at desktop/tablet/mobile and **pass before propagation**. After propagation, regression-test all template/page instances.
- Never alter locked logo shapes, weight, crops, approved brand color values or unrelated sitewide components while fixing a local defect.

---

## 09 — Media production and licensing engine

Each media asset is a **first-class content object**:

```
media_id, site_id, subject_entity_id, photo_source, source_url,
license_type, rights_holder, permitted_uses, attribution,
image_description, source_verified_at, download_verified,
filename_webp, dimensions, aspect_ratio, crop, focal_point,
alt_text, caption, WP_attachment_id, usage_pages,
original_source_hash, uniqueness/duplicate_check, approval_status
```

1. Prefer exact original entity/location media from the official source, owned/approved user media or authentic verified operator sources; use appropriately licensed Envato footage/photos for generic lifestyle illustrations, not fabricated representations of actual businesses. Photograph identity matters.
2. Research image quality, rights, photographer, watermark and redistribution/derivative constraints. Do not upload unlicensed Google/GBP/third-party materials merely because publicly visible. Google/Street View embeds must obey provider terms.
3. Download the authorized source, convert/size as appropriate to responsive WebP/AVIF, assign **descriptive SEO filename**, truthful alt, title, metadata and crop at the actual aspect ratio. Use WordPress Media Library attachment IDs in final native Elementor widgets. Avoid tiny images stretched into heroes.
4. Each card gets relevant **different** imagery where possible, and product mockups must depict the **actual** product type. No landscape recycled onto unrelated listings, mugs, shirts and trails.
5. LCP hero preload/eager decode as appropriate; lower images responsive `srcset`, loading, CDN/caching and bytes/quality budget.
6. For videos, secure proper footage/music/narration rights, render the actual master, watch/listen to it, supply functional player and rights ledger. An ffmpeg script, YouTube link or animatic alone is not the requested finished film.
7. Media-rights gate is independent of render-gate. A high-resolution file **without** license approval is not launch-ready.

---

## 10 — Canonical data and page-production engine

**Pipeline:** `discover → source → verify → normalize → deduplicate → classify → geo/link → keyword-map → entity+page-map → media-match → original content → native Elementor instance → audit → human approval → publish → monitor`.

Production tasks must be **idempotent** (same input does not create duplicate pages), rerunnable, checkpointed, and auditable. Each job reports attempted, created, updated, skipped, blocked and failed. Errors are isolated; retries use source IDs and content hashes.

### Canonical entity basics

- Shared canonical ID + source provider ID, name, URL/slug, geo, owner/partner status, verification evidence, freshness and provenance.
- Actual parent-child relationships (provider↔practice with historical validity; park↔trail/entrance; city↔neighborhood; business↔category; event↔organizer; offer↔merchant; property↔listing/agent).
- Directory search/filter/nearby results use **true source records and verified coordinates**. An approved 25-mile park rule must specify **the entrance or gateway anchor**, radius measurement type and exact verification semantics; do not invent it from park centroid or assume driving distance equals straight-line distance.
- Data belongs in ACF/registered CPTs and APIs; editorial copy in content records; pictures in verified Media Library. Elementor Loop templates query those records instead of hardcoding five static names.
- Commerce/ad/claim/review/lead/payout records need explicit role and fraud controls, validation, privacy, consent and audit histories. Never fabricate review counts, providers, paid placements or current availability.
- News/events/offers have date source/freshness checks, expiration/unpublishing where appropriate, attribution and provenance. Source-specific original derivatives replace wholesale copying.
- Cross-site feeds share the data object while enforcing independent brand scope, geo, editorial tone, audience intent, canonical URL and attribution; no duplicate/cannibalizing content.

### Page universe expansion and approvals

A build is *not* finished merely because its page register is enumerated. The completion ladder is:

`Identified → Researched → Entity verified → Content written → Licensed media attached → Native Elementor rendered → SEO/functional QA passed → Human approved → Published and monitored`.

**Mass production gate:** one full vertical template family is QA-PASSed with real records, tested links and real media, then batch instantiate all eligible items, preserve per-URL variance and validate via automated + human checks. Never scale a broken hero/card or incorrectly sourced category across thousands of pages.

---

## 11 — Design Meeting Flow: feedback to action, not lost conversation

The design meeting is an execution control mechanism:

1. **Ingest:** meeting notes, transcription, chat, screenshot annotation, issue, comments and file uploads. Identify exact speaker/owner where verified, referenced site/project and component.
2. **Classify:** decision / new requirement / bug / design correction / source correction / content task / question / dependency / approval / deferred / rejected.
3. **Map:** canonical project → exact website → page URL → Elementor template/document/container/widget or core plugin module → source requirement → original instruction and evidence.
4. **Task:** create/merge GitHub and Project Control Center card with persistent ID, chronological changelog, owner, co-managers, priority, blocker, before screenshot, expected outcome, test cases and acceptance criteria.
5. **Execute:** isolate work on branch/staging; use authorized Q/Quality MCP to edit the correct WordPress site; save actual native widget changes; do not redo passed sections.
6. **Review:** attach working **clickable URL** (and editor link where permitted), real desktop/tablet/mobile screenshots, code evidence, media/SEO source evidence, and exact before/after.
7. **Disposition:** `Pending → In Process → Ready for Review → Changes Requested / Approved → Published & Monitored`. User's **approval**, not an assistant's claim or green draft badge, closes a deliverable.
8. **Regression:** failed/reopened tasks retain their original IDs and history; do not silently reset the checklist or claim changed status.
9. **Meeting cadence:** show open work, completed-and-verified work, waiting on owner, blocked dependencies, new requests and concrete next action. Track exact last completed task ID and next task ID when interrupted.

**Persistent rule:** at the first substantive website project/chat message, bootstrap/attach to the GitHub Project Control Center; ensure mirror index for the project/chat; project split/handoff carries original active+archived threads and open items. Never erase the history by opening a new chat.

---

## 12 — Per-page 32-point acceptance checklist

A page must have individual evidence and status for every applicable gate. N/A requires recorded reviewer rationale, not omission.

### Keyword / SERP / architecture

- [ ] **K01** Unique verified keyword/source intent cluster.
- [ ] **K02** Actual SERP review, source and timeframe.
- [ ] **K03** Relevant sourced PAA/questions, not invented data.
- [ ] **K04** Distinct title, metadata, canonical and social cards.
- [ ] **K05** Original semantic headings/H1–H5 and coverage.
- [ ] **K06** Valid applicable schema grounded in visible data.
- [ ] **K07** Real crawlable WordPress URL, correct status, canonical and sitemap state.
- [ ] **K08** Breadth/depth of purposeful parent/related entity/internal links.

### Original editorial

- [ ] **C01** Distinct, useful original page-specific content.
- [ ] **C02** Primary-source citations and appropriate review freshness.
- [ ] **C03** Verified geographic/entity/category details.
- [ ] **C04** Visitor/customer decision guidance; access, logistics, pricing/availability only where verified.
- [ ] **C05** Accurate original answers, FAQ content and qualification checks.
- [ ] **C06** Attribution, author/reviewer, E-E-A-T/YMYL/sector disclosures.

### Image-first design

- [ ] **M01** Approved, native two-column carousel hero where page family requires one.
- [ ] **M02** Distinct, high-resolution accurate authorized hero photo per slide.
- [ ] **M03** Authentic photo + eyebrow + title + subtitle + snippet + CTA on each required card.
- [ ] **M04** Genuine image/video/carousel variation in substantive sections, with no repetitive empty boxes.
- [ ] **M05** Per-asset license, alt, responsive file, metadata, uniqueness and load QA.

### Usability / responsive native Elementor

- [ ] **D01** Exact approved Kit, typography/colors, logo, component geometry.
- [ ] **D02** Functional real destination for every menu, CTA, count, form and route.
- [ ] **D03** Verified desktop/tablet/mobile frontend screenshots and breakpoints.
- [ ] **D04** Keyboard, touch/swipe, accessibility, focus and reduced motion.
- [ ] **D05** Functional, navigable funnel and page-to-page continuity.

### Geography / merchant / commerce

- [ ] **G01** Unique canonical source/entity record and real locale.
- [ ] **G02** Verified radius/service-area logic where applicable.
- [ ] **G03** Verified operator/property/provider identity, source and actual photos where applicable.
- [ ] **G04** Real offers/booking/inventory/events/pricing or explicit honest exclusion as appropriate.

### Approval / production

- [ ] **A01** Original instruction, reviewer, owner and revision history attached.
- [ ] **A02** Exact editor/preview/frontend URLs, screenshots and build SHA evidence.
- [ ] **A03** Performance, SEO/schema, media, links, privacy and accessibility tests pass.
- [ ] **A04** Authorized human approval recorded before indexable publication.

**Counts:** 32 conditions. Track pass/fail and evidence per URL—not one blanket PASS for a template covering 8,000 unique pages.

---

## 13 — Multi-device and actual user experience testing

- Desktop, tablet, mobile: inspect real browser screenshots, carousel arrows, focus, pagination, image crops, button alignment, menus, navigation, title overflow, tap targets, real data rails and empty states.
- Verify Elementor Navigator editability; slide image/text/CTA independently selectable; live frontend reflects saved version after cache clearing. A JSON save or `200` status alone is **not** visual QA.
- Search by category/ZIP/region and real count drilldowns; test specific provider/park/city profiles, calls/emails/forms, checkout, member claims, login, logout, map and booking routes.
- Test screen reader/keyboard and device touch, Core Web Vitals, lazy loading, cached HTML, canonical metadata, schema, 404/redirect, link checker and noindex for draft pages.
- Preserve screenshots with viewport dimensions/date/version, exact URL and element ID; attach to GitHub task.
- For an actual **mobile app**: distinct React Native/Expo/approved native app architecture, authenticated state, privacy/consent, offline/geo behavior if scoped, real iOS/Android build and tests. Display an interactive **phone-framed** review; don't call an HTML mockup a shipped native app.

---

## 14 — Tracking, operations, conversion and security

- GA4/GTM/Search Console/analytics connections only when available and approved; measure actual impressions/clicks/events/leads/booking/checkouts/claim flows, not projected success as achieved results.
- Events are named by namespace/site/component/action (`npg:merchant-carousel:opened` style), versioned and reconciled to dashboards.
- Forms via approved tools (WPForms Elite where used), validation, routing, assigned owner, spam protection, consent, privacy and tested follow-up.
- Sponsored/featured placements must be clearly disclosed; booking products require real participating vendors and valid terms.
- Gate account permissions, personal data, API secrets and user exports. Store tokens in appropriate secret stores, not GitHub committed PHP or HTML. Consent/geolocation and child-safety policies for apps.
- Monitor backups, uptime, outages, broken links, schema errors, stale listings/events, failed feed sync, image/rights expiration, checkout and regression after launch.
- Reusable components update only by controlled release, impact assessment, contract tests and canary/rollback; don't break all client websites by applying an unverified style patch globally.

---

## 15 — Vertical adapters (mandatory inheritance + protected differences)

### A. Utah Real Estate Directory / city real estate network

- Root real estate directory/search and city/neighborhood/property discovery; IDX/MLS where authorized; agent/brokerage/vendor profiles, market reports, local guides, education, relocation, investment and property funnels.
- Geo template replication must use real cities and meaningful different data; exact page taxonomy, property schema where applicable, fair housing and finance disclosures.
- Approved UTRD image-led CLM components form the **reference behavior** for many cards/rails; live pages still use correct site's color/typography skin and real entities.

### B. Inside Utah Real Estate (IUR)

- Canonical editorial newsroom/authority hub; original researched stories, topical clusters, data/features, FAQ, place stories, newsroom components and timely sources.
- New content normally publishes original on IUR; downstream sites receive permission-aware, non-duplicate, genuinely rewritten/localized derivatives with provenance and canonical/source links where appropriate.
- Editorial card style is curated—not a raw property IDX grid. Search remains appropriately in UTRD. Playfair is reserved for approved IUR editorial headline roles.

### C. AdamGriffee.com / single-realtor template

- Personal branded authority/advisory site, distinct from universal UTRD directory. CLM core → Adam brand → native Elementor. Preserve approved 1920/55 utility, 1920/450 identity and 1920/60 nav geometry and fixed portrait/logo/identity only on Adam pages.
- Adam identity Poppins/eXp Luxury black/white/gold; six-slide approved carousel and paired CTA rules; no unauthorized shift of existing component geometry. Rebuild one canonical prototype, then propagate.
- Protect isolated 7169 Canyon Drive property microsite, its dedicated header/footer, menu, photos and property booking, against unrelated global page/theme changes.
- Never apply Adam headshot/logo, real estate copy, agents or property imagery to parks/dental/publication verticals.

### D. Quality Dental / Bakersfield Dentists / Smile Design

- Parent QualityDental.com platform owns canonical dentist/practice relationships and directory engine; DentistBakersfield is Kern County partner deployment; Smile Design is the authoritative clinical practice site and its staging must remain on the `ads.` subdomain during rebuild.
- Distinct **provider** (dentist/person with portable reviews) vs **practice** (business/location) records; NPI and place IDs where legitimate; practice claim and verification, relationship history, specialties, services, insurances, cities, reviews with actual sources, authentic practice imagery.
- KeywordTool.io is primary agreed research for dental; >0 volume exact-intent pages, others consolidated. All pages unique, no invented practice/ratings/volumes and not misleading medical claims.
- Site-specific Bakersfield palette: primary `#007689`, sparse bright gold `#FFCC00`; real provider/practice gallery or authorized embeds; actual city counts link to exact filtered results. Paid premier placement disclosed.
- Approved WordPress custom theme + core plugin, Elementor-native UX, WPForms lead system, WooCommerce verified deals/commerce; provider/practice page types and city/service/insurance/FAQ/blog/news/event hierarchy. Respect clinical YMYL sourcing and legal consent.

### E. National Parks Guide / Utah Zion / other park sites

- All **63** national parks; the national canonical site owns park-first destination/entity content and shared app framework. Standalone Zion site has its own brand/domain and only appropriate Zion/local content.
- First five featured by the captured keyword research were Great Smoky Mountains, Yellowstone, Glacier, Yosemite, Zion. Dynamic preference may change only after documented comparable research, not arbitrary rearrangement.
- For each park: visitor hub, trails, photography, things to do, lodging/campgrounds, dining, guides/tours, equipment/rentals, shuttles/transport, family/attractions, relevant local businesses within **verified entrance/gateway 25-mile rules**, news, events, retail/offers, safety/conditions and commerce where real.
- Hero = two-column photographic carousel; every category rail has **multiple real** location/operator cards, unique photos, subtitles/snippets/CTAs; at least four to six appropriate real business categories for each park where source-covered.
- NPS/official sources for access/safety and data provenance; do not imply NPS endorsement. Scoped API sources, real business geo data, authorized images and correct publication policy.
- Real app source distinct from phone-framed browser review; GPS challenges/rewards require permission, verified real partner offers, privacy and safety. Video deliverables require actual licensed footage/edit, not code or stills alone.
- National Parks WordPress build uses `national-parks-guide` branded custom theme and `national-parks-guide-core` plugin, **not** inherited real estate site styling.

### F. Generic vertical/local hubs and future clones

- Clone architecture and validated components, not factual prose. Configure separate identity, domain, location, regulators, permitted business/commerce roles, source contracts and review permissions. Directory/ads/offers/event/news/education modules are optional based on approved business plan, not a blanket promise all are operational.

---

## 16 — Template naming, technical names and SEO URLs

**Names must be understandable to the project owner and developers.**

```
Theme: national-parks-guide
Plugin: national-parks-guide-core
Template: npg-tpl--park-hub-v1
Template variant: npg-tpl--park-topic-hikes-v1
Section: npg-sec--zion-hikes-featured
Component: npg-cmp--photo-story-card
Element: npg-el--trail-name
Global utility: npg-u--visually-hidden
ACF fields: npg_park_name, npg_trail_distance_mi, npg_media_rights_status
Taxonomies: npg_park, npg_state, npg_activity, npg_content_family
Query ID: npg_zion_verified_guides
Media ID: npg-media--zion-canyon-overlook--2026--000042
```

This is an internal namespace contract, **not** a reason to show cryptic agency initials in customer-visible theme titles, URLs or interface copy. Human-first taxonomy/path naming must map actual query intent, e.g. `/national-parks/zion/hiking-trails/` when that is the approved canonical pattern; do not silently invent a different path. WordPress Theme URI must correctly point to brand/publisher info, without pretending the field itself determines SERP rankings.

---

## 17 — Hard release gates and status reporting

| Status | Meaning and minimum proof |
|---|---|
| `INVENTORIED` | Target URL/entity listed, no implementation claim |
| `RESEARCHED` | Source/keyword/intent/geographic brief complete |
| `DRAFT ENTITY` | Real canonical record entered in WordPress, no publishing claim |
| `TEMPLATE BUILT` | Native Elementor template saved, not necessarily populated or visually tested |
| `POPULATED` | Page-specific original copy + verified data + rights-cleared images attached |
| `QA FAIL` | Exact broken conditions attached; cannot approve |
| `QA PASS` | Frontend/editor/device/SEO/accessibility/performance tests documented with evidence |
| `READY FOR OWNER REVIEW` | Exact public or authorized preview, required acceptance evidence and no blockers |
| `OWNER APPROVED` | Human disposition, timestamp, exact content version |
| `PUBLISHED` | Site live, indexation correct, smoke tests and monitoring recorded |

**Every progress update must include** page universe size, real unique drafted instances, populated originals, media-approved, browser QA passed, approved, published, failed/blocked, exact URLs/IDs, last verified action and next action. Do not compress "8,411 target rows" into "8,411 pages built".

**Stop-the-line triggers:** wrong site connector, missing full backup before destructive flush, contaminated branding, unapproved imagery, invalid business or medical/visitor-safety facts, broken hero/card, source-invalid keywords, disconnected CTAs, uneditable production HTML, unresolved slug collision, fake counts, broken frontend, unknown publication status, regression in an approved template.

---

## 18 — Project handoff / chat continuity contract

When work spans chats, branches or assistants:

1. Identify the canonical project and all predecessor chats/archives, not merely the newest thread. Keep project-specific and universal contexts separate.
2. Summarize approved/unapproved requirements with original issue links, direct URLs, IDs, source files, commits, decisions, locked colors/fonts, exceptions and unresolved disputes.
3. Record actual connected site, current WordPress status, theme/plugin versions, Elementor document IDs, backups, migrations and code branch.
4. Itemize **done with proof**, **in process**, **blocked**, **rejected/regressed**, **awaiting owner** and **next action**. Do not mark completed after writing a plan.
5. If source material is only summarized/partially available, state that limitation and seek archived transcripts or files before claiming exhaustive historical verification.
6. Give a concrete resume instruction: exact repository, working branch, file/task/page ID, next batch, QA/test command, staging site and approval rule.
7. Do not initiate unauthorized autonomous work in the background; future recurring checks only when the user authorizes a scheduled automation.

---

## 19 — "Build Website" agent execution prompt (copy verbatim to start a project)

> **BUILD WEBSITE — APPLY THE MASTER STANDARD**
>
> You are the delivery lead, information architect, technical SEO researcher, senior WordPress/PHP/Elementor developer, UI designer, verified-data/content engineer, accessibility/QA specialist and project manager for this website. Recover every relevant approved instruction, chat, file, template and GitHub issue. Start by connecting to the **correct** WordPress environment and GitHub project, inventorying the real website and reconciling the Architecture Audit Comparison, SEO Architecture Blueprint, Design Meeting Flow and vertical-specific exceptions.
>
> Apply CLM/Quality Core → unique branded custom theme/core plugin → canonical data/entities → SEO URL map → native Elementor component family → original content + licensed media → idempotent page generation → per-URL live QA → human approval → staged/published release. When rebuilding an inherited site, verify recovery first and actually remove unrelated legacy templates, media and branding by documented disposition, preserving valid business data.
>
> Never present static HTML, a screenshot, saved JSON, empty WordPress routes, duplicated text, placeholder images or a page checklist as a **completed website**. Every visitor-facing component is an editable native Elementor widget/container unless an explicit, registered first-party widget is approved. Every required card has authentic imagery, eyebrow, title, subtitle, useful snippet, real CTA and working destination. Each page gets source-backed SERP/SEO/AEO/E-E-A-T/schema, accurate geography/entities, media provenance, internal links, conversion purpose and actual responsive QA.
>
> Build and validate one canonical component per family, then propagate to **the entire approved page universe**, logging exact attempted, created, content-populated, tested, approved and published counts. All page records and meeting change requests map to a persistent GitHub/Control Center audit. Owner approval controls production publication. Work on executable deliverables rather than repeating architecture pitches or asking questions answered in prior instructions.
>
> **Project-specific values:** [domain], [authorized site], [approved source chats], [GitHub repo/branch], [brand kit], [page universe], [geographic scope], [keyword sources], [media rights], [staging], [backup receipt], [business logic], [app requirements], [owner reviewer], [approval policy].

---

## 20 — Required project deliverables checklist

- [ ] Comprehensive source/cross-chat/handoff concordance and conflict resolution.
- [ ] Direct project board, persistent task IDs, chronological audit log and approval ledger.
- [ ] Real current-site crawl/audit, competitor/reference comparison and page inventory.
- [ ] Verified backup/restore receipt, inherited-content disposition and completed authorized reset.
- [ ] Custom brand WordPress theme, named and correctly registered, active on correct site.
- [ ] First-party core plugin/data schemas/APIs/migrations/tests installed.
- [ ] Clean Elementor Kit + native Theme Builder header/footer/single/archive/search/404.
- [ ] Canonical responsive photo-first design components approved against browser references.
- [ ] KeywordTool.io/source-backed SERP studies and full unique canonical URL/page register.
- [ ] Real canonical content entities, taxonomy relationships, geographic verification and provenance.
- [ ] Rights-cleared per-card/per-page media objects imported with WordPress attachment IDs.
- [ ] Native Elementor Loop templates and dynamic widgets with appropriate queries.
- [ ] Populated unique page content with schema, snippets, FAQs, conversions and internal links.
- [ ] Page generation/import engine with idempotency, retries, exact metrics and error tracking.
- [ ] Real public/authorized preview links **for every page**, not just homepage demos.
- [ ] Per-page 32-point acceptance ledger with owner, screenshots and true status.
- [ ] Mobile/tablet/desktop visual + functional + Core Web Vitals/accessibility/SEO tests.
- [ ] Forms, search, directory, map, commerce, claims, app and other approved operations actually tested.
- [ ] Correct publication/noindex/sitemap/canonical/redirect policies and scheduled monitoring.
- [ ] GitHub commits/PRs, site asset sync, release tag, migration/rollback notes.
- [ ] Owner acceptance and measurable handoff/training without unsupported completion claims.

---

## 21 — Reference library and known project sources

**Direct source/handoff examples recovered:**

- `realtor-website-template-MASTER-HANDOFF-2026-10-07.md` — reusable CLM design/system, Elementor and QA, Adam exceptions and archive continuity.
- `NATIONAL-PARKS-GUIDE-COMPLETE-HISTORY-HANDOFF-2026-10-10(1).md` — full 63-park/app/content/media requirements and failure audit.
- `Bakersfield Dentists — Full Project Spec.md` — Quality Dental directory/data, keyword, profile, design and genuine-media requirements.
- `Pasted text.txt` — UtahRealEstateDirectory master website audit standard.
- Architecture Audit Comparison, Design Meeting Workflow, SEO Architecture Blueprint — cross-project named conversation standards, including live audit, page/element design acceptance, canonical URL strategy and reusable template control.
- `single-listing-sites (archive 1/2)`, `realtor-website-template (archive 1/2/3/4)`, `quality-mcp`, `quality-crm`, `content-engine`, `National Parks Guide`, `Inside Utah Real Estate`, `Utah Real Estate Directory`, `SEO Content Syndication Engine`, `Smile Design rebuild`, `DentistBakersfield.com`, `Project Control Center`, and other site-specific build and architecture chats.
- GitHub source: `createlocalmarketing/clm-utah-templates` and the per-project GitHub Control Center repositories/issues. For NPG review: `createlocalmarketing/clm-platform/issues/72` and the custom theme/Core/plugin branch. Use recorded exact link/version in each project kickoff.

**Provenance rule:** The document is designed to be updated whenever additional actual transcripts/decisions are recovered. "All projects considered" does **not** mean every inaccessible/condensed chat was directly read verbatim. Do not inflate verification claims.

---

## 22 — Version/change-control record

| Version | Date | Change | Approval |
|---|---|---|---|
| 1.0 | 2026-10-11 | Consolidated universal Build Website system, architecture, audit, SEO, design meeting, WordPress/Elementor, media, page production, compliance, vertical-specific exceptions and operational acceptance | Master draft, awaiting owner acceptance |

**Next revision protocol:** when a new site/vertical supplies a broadly reusable improvement, update the master standard by GitHub PR/change card, identify whether it is `Universal`, `Vertical-specific` or `Brand-specific`, preserve historical requirements, test against at least two sites before platform-wide rollout and record owner approval. Do not modify the universal baseline silently.