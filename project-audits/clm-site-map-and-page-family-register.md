# Create Local Marketing — Site Map and Page Family Register

**Project board:** [Create Local Marketing website](https://createlocalmarketing.github.io/clm-utah-templates/project-control-center/#/project/create-local-marketing-website)  
**Tracking issue:** [#10: complete site blueprint and page inventory](https://github.com/createlocalmarketing/clm-utah-templates/issues/10)  
**Homepage element-level registry:** [JSON register for all 314 current Elementor nodes](https://github.com/createlocalmarketing/clm-utah-templates/blob/main/project-audits/clm-element-level-seo-schema-register.json)  
**Live site:** https://www.createlocalmarketing.com/  
**Updated:** 2026-10-16

## Release truth

This is the master page-family plan. Listed as **planned** means it is not yet a published, quality-checked page. The Utah county/service matrix alone is **29 × 12 = 348 planned county/service landing pages**. It excludes city pages, three deeper office hubs, state/service pages, industry/service combinations, product pages, and editorial pages. No URLs should be mass-published from a location/keyword swap: each page needs local proof, a distinct customer need, and human review.

## Page families and required dimensions

| Family | Scope | URL pattern | Required page-specific content |
|---|---|---|---|
| Core services | SEO/local SEO, web design/WordPress, web hosting, social media, content, video, graphic design, paid ads, marketing audits, analytics/automation, custom development/apps, AI/AEO/AIO, CRM, reputation/reviews, PBX/call tools, SMS/MMS, e-commerce | `/services/{service}/` | Service package, deliverables, process, proof, FAQs, CTA, related services, eligible schema |
| Utah county + service | 29 counties × 12 core service clusters = 348 planned rows | `/utah/{county}/{service}/` | County-specific buyer questions, evidence of service coverage, local case studies/partners, county towns served, tailored FAQs and internal links |
| Utah city + service | Major Utah cities, each × the relevant service clusters; additional depth for office markets | `/utah/{city}/{service}/` | City-specific intent, office/coverage facts, unique examples, named local resources and non-duplicated copy |
| Office hubs | Salt Lake City, Park City, St. George; deeper service coverage per hub | `/locations/{city-ut}/` and `/locations/{city-ut}/{service}/` | Accurate office/contact details, staff/service availability, service area, local proof, location-aware conversion options |
| State + service | Utah, California, Nevada, Arizona, Colorado, Texas, New York, Florida, Tennessee, Hawaii (all islands); 10 × 12 starter service clusters = 120 planned rows | `/states/{state}/{service}/` | State-level relevance; city/county navigation; state-specific proof and constraints; no unsupported local-office claim |
| Industry + service | Every serviced vertical × web design, local SEO, ads, content/social, video, CRM/automation, reputation, e-commerce and audit | `/industries/{industry}/{service}/` | Vertical workflow, customer journey, compliance/YMYL controls, qualified partner benefits, evidence and ROI measurement |
| Products and partnerships | AppsSolved, UtahSavingsGuide, Dealiciously Local, Utah Real Estate Directory, Inside Utah Real Estate, customer loyalty programs, custom CRM, white-label text, partnership proposal / marketing-system-for-equity model | `/platforms/{product}/`, `/partnerships/{name}/` | Product purpose, partner roles, current availability, business model, onboarding, support, disclosures and proof |
| Editorial and learning | Inside Marketing news, business spotlights, client/business directory, AI projects, favorites, free e-courses, classes, recommended Facebook groups, MCP guides and video library | `/inside-marketing/{section}/{slug}/` | Named author/editor, publication/update date, sources, media, related services, clear editorial/commercial disclosures |

## Utah county inventory

Beaver, Box Elder, Cache, Carbon, Daggett, Davis, Duchesne, Emery, Garfield, Grand, Iron, Juab, Kane, Millard, Morgan, Piute, Rich, Salt Lake, San Juan, Sanpete, Sevier, Summit, Tooele, Uintah, Utah, Wasatch, Washington, Wayne, Weber.

## Core service-cluster matrix

1. Marketing strategy and featured audit
2. Local SEO and local search visibility
3. SEO, AEO, AIO and answer-led content
4. Custom web design and custom WordPress development
5. Website hosting, maintenance and care
6. Social media management and content creation
7. Video production and video marketing
8. Graphic design and brand strategy
9. Lead generation and paid advertising
10. AI, CRM and workflow automation
11. Custom apps, directories, marketplaces and e-commerce
12. Reputation/review systems, live chat, PBX and SMS/MMS communications

Every Utah county gets a planned row for each applicable cluster; every major city gets a city/service row after the city list is validated and mapped to meaningful local proof. Salt Lake City, Park City and St. George receive expanded office hub and city/service coverage. The project board tracks pages as planned, drafted, reviewed, live, or blocked.

## Required per-page and per-element acceptance record

The homepage registry above contains one record for **every Elementor container, widget, button, image, and other node** in document 268. Each record includes:
- Elementor ID, widget/container type, CSS class, parent section, and visible element label
- Target query, search intent, and SERP role
- YMYL review level, E-E-A-T evidence requirement, AEO question/answer target, and AIO entity/action
- Specific Schema.org mapping (including explicit “no standalone schema” when an element is decorative or not independently eligible)
- For images: original URL, filename, title, alt text, caption, rights/brand status, and naming rule
- Review status and known asset blockers

For each future page, add the same record set for all Elementor elements. Mark mapping complete only after a rendered-page and structured-data check. Decorative controls do not receive misleading metadata or duplicate schema; they map to their parent page/section.

## Currently built page routes to reconcile

- [Services](/services/)
- [Marketing audit reports](/audits/)
- [Local SEO](/services/local-seo/)
- [Brand strategy](/services/brand-strategy/)
- [Social media and content](/services/social-media-content/)
- [Website design and development](/services/website-design-development/)
- [Website hosting](/services/website-hosting/)
- [Video production](/services/video-production/)
- [Custom development and apps](/services/custom-development-apps/)
- [Paid advertising](/services/paid-advertising/)
- [Analytics and automation](/services/analytics-automation/)
- [Industry directory](/website-design-by-industry/)
- [Dental practices](/website-design-for-dental-practices/)
- [Med spas](/website-design-for-med-spas/)
- [Real estate](/website-design-for-real-estate/)
- [Directory and marketplace design](/website-design-for-directory-marketplaces/)
- [White-label agency services](/agency-white-label-web-design/)
- [Service areas](/service-areas/)
- [Our work/business directory](/our-work/)
- [Inside Marketing](/inside-marketing/)
- [Partnership proposals](/partnership-proposals/)
- [Contact](/contact/)

## Video gap

Homepage and navigation currently do not provide a working, visible video library/feed. “Video production” is an existing service route, but that does not satisfy the requested homepage video proof, social video feeds, project examples, or education videos. Track video components as missing until real, approved media assets and working embeds are live and verified.

## Navigation acceptance

- Utility strip: Local first + nationwide support, live St. George weather, date, Mountain time, location, phone and account sign-in; no email.
- Main nav: Services, Industries, Our work, Resources, Technology & AI, Local platforms, Contact; clickable logo returns home.
- Cart icon precedes icon-only theme control at far right. Hover/focus tooltip explains the next mode.
- Mega menus use labeled groups, icons, keyboard support, View All routes and rotating in-house featured content.
- All links resolve; no invented/dead routes.
