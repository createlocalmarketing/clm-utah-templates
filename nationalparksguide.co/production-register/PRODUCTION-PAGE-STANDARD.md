# NPG Nationwide — mandatory production page quality contract
Applies to ALL 63 U.S. national parks, all site URLs, the Zion extraction, and the native app. No route alone counts as an approved page.
**Statuses:** Not Built → Routed → Sourced → Original Content → Licensed Media → Integrated → SEO/Schema QA → Needs Review → Approved → Deployable.
## Mandatory on EVERY page
- [ ] PAGE-001 SEO researched page-specific primary keyword, intent, query volumes and SERP competitors
- [ ] PAGE-002 Research Suggestions, Questions, Prepositions and Related park/category search terms in KeywordTool.io
- [ ] PAGE-003 Unique page-level URL slug, parent and child hierarchy, canonical and cross-domain syndication policy
- [ ] PAGE-004 Unique page title, meta description, OG/Twitter visual, breadcrumbs and search snippet
- [ ] PAGE-005 Exactly one H1 tied to actual intent; accurate evidence-backed H2, H3, H4, H5 structure where depth warrants
- [ ] PAGE-006 Original authoritative thorough non-duplicative prose that exhaustively answers visitor intent
- [ ] PAGE-007 Answer-first AEO module, tested question responses and verifiable People Also Ask-style FAQs
- [ ] PAGE-008 NPS, licensed directory and direct organizer sources with canonical URLs and last-checked dates
- [ ] PAGE-009 E-E-A-T: named author/publisher, qualified reviewer if needed, fact-check policy, corrections and credentials
- [ ] PAGE-010 YMYL safety review for trails, flood/fire, wildlife, permits, health advisories, legal or financial claims
- [ ] PAGE-011 Original responsive two-column hero; six-slide image/video carousel on relevant hub pages; zero text over image
- [ ] PAGE-012 Brand typography, color, reusable CLM layout, 12px cards, Font Awesome and original custom SVG icons
- [ ] PAGE-013 DISTINCT location-correct scene per media element, Envato/NPS source rights, no repeated generic photo
- [ ] PAGE-014 Original media filename/SEO naming, source credits, alt text, captions, WebP/AVIF/srcset and lazy loading
- [ ] PAGE-015 Rights-cleared moving footage/official video embeds, transcript, subtitles and VideoObject only if true
- [ ] PAGE-016 Relevant source-verified interactive content: trails, nearby businesses, events, offers, news and images
- [ ] PAGE-017 Real user journeys, working CTA/form/tab/filter/pagination, zero placeholder dead-end actions
- [ ] PAGE-018 Internal category/subcategory/park/trail/business/story/shop backlinks and no orphan pages
- [ ] PAGE-019 Schema.org factual JSON-LD WebPage, BreadcrumbList, Organization and suitable Park/LocalBusiness/Product/Event/Article types
- [ ] PAGE-020 No misleading Search Enhancements/FAQ rich-result ranking promises; schema validated to actual content
- [ ] PAGE-021 Appropriate XML sitemap, robots/canonical noindex for unfinished, WordPress SSR/prerender for SEO
- [ ] PAGE-022 Mobile breakpoints 320/375/390/430/768/1024/1440/1920 and accessibility keyboard/contrast QA
- [ ] PAGE-023 Core Web Vitals LCP/INP/CLS/performance checks and responsive image audit
- [ ] PAGE-024 Editorial adjacent news, related articles, curated question-answer modules and trustworthy bylines
- [ ] PAGE-025 Document current source status; never invent merchant deals, open hours, events or live weather
- [ ] PAGE-026 Geocoded 25-mile real licensed business import, deduped shared CLM merchant IDs, ethical origin records
- [ ] PAGE-027 Accurate Google aggregates only under provider licensing; never clone third-party reviews or photos unlawfully
- [ ] PAGE-028 WooCommerce/ACF Pro/Elementor Pro/Quality MCP field/container/element mapping to production backend
- [ ] PAGE-029 WPForms controls, permissions, age/consent, transaction integrity, privacy and security
- [ ] PAGE-030 Event/commerce/UGC/CUA permit requirements, advertiser and NPS non-affiliation/trademark disclosures
- [ ] PAGE-031 Reproducible route and integration tests, source audit, approved imagery and real data provenance evidence
- [ ] PAGE-032 User comments/change requests, review link, final approval, deploy and rollback checks
## Page-type-specific additions
### park
- [ ] Full visitor overview/history/geology/seasons
- [ ] GPS maps/entrances/fees/permits/shuttles
- [ ] Trails/safe photo spots/family/accessibility
- [ ] Distinct six-scene park media and real source video
- [ ] Verified gateway merchants and visitor economy
- [ ] Event calendar, journalism, real offers, original shop
- [ ] Park/TouristAttraction schema only if accurate
### topic
- [ ] Unique per-park topical cluster and SERP intent
- [ ] Original H1-H5 article, answer blocks, rich supporting evidence
- [ ] Relevant source-verified trails, maps and directory cards
- [ ] Topic-specific structured data and safety review
### business_category
- [ ] Source licensed POI 25-mile coverage and operating verification
- [ ] Verified local ownership and category-specific sort/filter
- [ ] Merchant profiles with actual sources and owner-claim status
- [ ] No fake ratings or discount incentives
### merchant_profile
- [ ] Owner claim/authentication and visible verification status
- [ ] Business tabs: Overview/Services/Media/Deals/Reviews/Events/Contact
- [ ] Starter/Platinum quotas/wall and accurate third-party ratings if licensed
- [ ] No QR coupons until verified merchant and backend
### news_category
- [ ] Original bylined reporting/corrected citations and publication date
- [ ] Event/visitor/public safety sources verified and reviewed
### event_category
- [ ] Confirmed event date/timezone, organizer, venue and sponsor records
- [ ] Actual registration, tickets, cancellations and Event schema
### shop_category
- [ ] Original park-inspired art and real merchandising category SEO
- [ ] WooCommerce stock/variants/price/shipping/returns
- [ ] Real vendor inventory and Product schema only if active
### product
- [ ] Art and trademark rights, manufacturer or POD contract
- [ ] Verified SKU/variants/stock, checkout/refunds/tax
- [ ] Park-specific SEO product content and image asset
### trail
- [ ] Official lengths, elevations, source maps, permits and seasonality
- [ ] Accessible alternatives and opt-in GPS-safe challenges
### app
- [ ] Native app functional authenticated server and optional GPS consent
- [ ] Real rewards ledger, camera, wallet, scrapbook, reels and privacy
### video
- [ ] Licensed real-motion footage, original cinematic baritone and uplifting frontier score
- [ ] 1:20 16:9+9:16 render, real subtitle/stem and media rights QA
## Global source rules
- Park classification: https://www.nps.gov/aboutus/national-park-system.htm
- Keyword research: ../research/NATIONAL-63-PARK-KEYWORD-VOLUMES-20261010.json
- Full keyword Suggestions/Questions/Prepositions/Related and top SERP intent mapping remains outstanding across most per-park categories; name-keyword volumes alone do not complete SEO research.
- Every unknown local merchant must first be ingested from an authorized source and geographically validated; do not fabricate names or photos.
- 25-mile requirement applies to **all 63** national parks, not the five featured homepage parks. Optional 100-mile expanded coverage is a secondary tier.
- No externally sourced stock footage may be used beyond the actual license grant. NPS YouTube media rights are checked clip-by-clip.
- Prelaunch unresearched URLs remain noindex to avoid polluting SERPs with thin duplicated pages.
- Production stack: Quality MCP and owned components integrated with WordPress, Elementor Pro, ACF Pro, WooCommerce and WPForms. No additional third-party site builder plugins.
**Total requirements per park page:** 32 global gates + relevant page-type gates. A page cannot be marked complete without evidence for each.
