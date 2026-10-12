# AdamGriffee.com — Master Acceptance Audit

Date: 2026-10-11. Repo design authority: createlocalmarketing/clm-utah-templates.
Reference standard: @website-design-master-checklist and standards/BUILD-WEBSITE-MASTER-TEMPLATE.md when present. Never substitute old Elementor Kit styles.

## Scope and architecture
Live WordPress returned 94 published pages, including seven protected 7169 Canyon Drive pages (176–182). Earlier 32/39 page counts were Elementor-only and incomplete. Review public pages, posts, IUR category archives/template 35, menus, footer, forms, and ACF/provider/business/event families.
Shared source: engine/app.css, core.js, pages.js, brands.js; data/templates.json, geo.json, content.json; related directory/city/National Parks patterns. The repository's content.json is described as SAMPLE DATA; sample entries must not be mistaken for verified live events, MLS listings or provider records.

## Confirmed defects and status
| ID | Priority | Evidence / failure | Status |
| --- | --- | --- | --- |
| AG-001 | P0 | /things-to-do/ formerly HTTP 404 | PARTIAL: page 2328 now published HTTP 200 with 9 linked cards; live activity feed not yet present |
| AG-002 | P0 | /events/ 2093 previously a one-screen generic section; real event feed missing | PARTIAL: editorial portal deployed |
| AG-003 | P0 | /business-directory/ 2092 previously a one-screen generic section; real business records and search missing | PARTIAL: category portal deployed |
| AG-004 | P0 | /relocation/schools/ 675 renders the same Historic Main Street asset ID 256 three times | OPEN |
| AG-005 | P0 | Screenshot demonstrates inconsistent homepage buttons, spacing, text wrapping, card rhythm and icons | OPEN |
| AG-006 | P0 | Broken Handle media image shown in restaurant cards | OPEN |
| AG-007 | P0 | Many newly published utility pages 2079–2121 are thin one-screen HTML wrappers | OPEN |
| AG-008 | P0 | Inbound CTA/footer links point to missing or low-value destinations | OPEN |
| AG-009 | P1 | /relocation/schools/ Yoast title repeats site identity suffix | OPEN |

## Acceptance criteria
1. Inspect current published page and map page type, entity, intent, primary URL, parent/child URL contract and relevant side entities.
2. Compare to GitHub CLM architecture and approved Adam brand; preserve Poppins identity/header and protected 7169 microsite.
3. Consistent Inter UI/body, Oswald kickers/meta, Playfair major editorial headers, canonical image crops, section rhythm, light/translucent carousel cards.
4. Cards/buttons must resolve to real, tested non-thin destinations. Theme-aware charcoal/gold button variants, consistent dimensions and Font Awesome icon standards.
5. Distinct subject-relevant owned/licensed imagery; no old stamps or 7169 imagery outside microsite. Check asset HTTP, alt, license, crop, duplicates.
6. Unique and substantive page-depth modules: verified records, relevant children, related places, actual dynamic feeds, FAQ where useful, conversion and internal link graph.
7. SEO/AEO/AIO/EEAT/schema/YMYL assessment of titles, sources, freshness, canonical, sitemap/indexing, author and claims. Avoid fabricated data.
8. Verify desktop/tablet/mobile, actual frontend rendering, click targets, interaction, caches and layout. Only mark PASS after verification.

## Production repair ledger — October 11, 2026
- Page 2093 /events/: updated from generic one-screen HTML to a multi-section seasonal/events discovery editorial portal. WordPress post save SUCCESS.
- Page 2092 /business-directory/: updated from generic one-screen HTML to a multi-section local services/category discovery editorial portal. WordPress post save SUCCESS.
- Added scoped reusable ag-portal CSS to active custom Adam child theme's style.css, not global Elementor Kit. Original theme file backed up.
- WordPress stripped inline style wrappers; removed the stray CSS text from both WordPress post bodies and moved CSS to child theme stylesheet.
- Cleared Elementor generated CSS and WordPress object cache.
- Public frontend now HTTP 200 and includes ag-hero, ag-card and ten ag-btn links on each repaired page. This is PARTIAL, not feature-complete: live event feed, searchable verified provider records and provider detail pages are still absent.
- No modifications to protected property microsite pages 176–182.

## Priority queue
1. Build substantive /things-to-do/ destination and fix inbound 404 links.
2. Replace school district duplicated imagery with distinct relevant assets and deepen district-specific program/area content.
3. Normalize homepage/global CTA icon, height, contrast, line wrap, card and section rhythm.
4. Audit all 94 published pages plus post/archive/template routes, capture source/target link graph, and repair dead ends.
5. Move from editorial portals to actual verified dynamic event, business/provider, geo and education objects using reusable native Elementor/ACF families.

Historical sources: realtor-website-template archives 1–4, single-listing-sites archives 1–2, content-engine, website-architecture-blueprint-checklist 1–3, dental-directory-city-site-blueprint, nationalparksguide-template, quality-crm, Adam website and directory/city sites. Newest approved user requirements prevail.
## Production follow-up: Things To Do
- Created WordPress page 2328 at `/things-to-do/` with full editorial hero, 3 thematic card grids (9 linked cards), local place/activity/relocation modules, internal anchors, FAQs, conversion CTAs and shared theme-level scoped CSS.
- Cleared Elementor/WordPress object caches and verified public frontend HTTP 200 with `ag-card` + `ag-hero`, no more 404.
- Remains PARTIAL pending actual verified activity/POI content object feeds, formal post type/template architecture, image licensing checks and responsive screenshot QA.

## 2026-10-12 native Elementor remediation
- Verified uploaded @website-design-master-checklist.md v1.0 prohibits raw HTML page-building and requires native editable Elementor module families, original content, URL-by-URL acceptance evidence.
- Confirmed old `neighborhood-guide/` 2104 was HTML-in-post content rendered without required styling; live `old-town/` 2122 had no saved Elementor element tree and only 391 characters of generic content.
- Updated child-theme functions.php to enqueue stylesheet with `filemtime(style.css)` rather than permanent v1.0.0 query. Later verified current frontend style.css query changed to file mtime. First-party backup created.
- Saved 7 top-level native Elementor sections on Old Town 2122, with native image/heading/text/button widgets and six connected cards, property due diligence, local intelligence and FAQs.
- Rebuilt Neighborhood Guide 2104 as 7 top-level editable native Elementor sections with its own neighborhood-intent heading, compare criteria, six contextual cards, FAQ and navigation; patched Old Town CTA to actual Old Town URL.
- Added narrowly scoped responsive `.ag-native-*` card/button styling to custom child theme, not Elementor Kit or 7169 microsite. Clear caches completed.
- Same-site frontend: both pages HTTP 200, Elementor IDs 2122/2104 rendered and 6 `ag-native-card` occurrences each; CSS link query now versioned using file mtime. This is PARTIAL: manual screenshot/button QA, distinct media assignment, full-depth data feeds, accessibility and all master checklist gates still pending.
- Important regression: prior assistant-built raw HTML portals (including other 14 pages) violate the newly supplied master checklist, despite being live. Must migrate to native Elementor and re-QA. No 7K+ complete pages established.
