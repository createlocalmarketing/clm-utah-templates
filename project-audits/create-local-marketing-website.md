# Create Local Marketing Website Rebuild

## Current state
- Website: https://www.createlocalmarketing.com/
- Control Center project: create-local-marketing-website
- GitHub issue: https://github.com/createlocalmarketing/clm-utah-templates/issues/10
- Last updated: October 16, 2026 (America/Denver)

## User correction and action

The user rejected the custom SVG community illustrations as hand-drawn/finger-painting style and disallowed client/lead/patient portraits as agency imagery. The SVGs remain in the current homepage Elementor document and still need replacement with approved, licensed photography or approved portfolio assets. No generic illustrations or watermarked Envato previews may be used.

### GitHub project manager and content registers
- [Project Control Center](https://createlocalmarketing.github.io/clm-utah-templates/project-control-center/#/project/create-local-marketing-website) is the task ledger, not Excel.
- [Issue #10](https://github.com/createlocalmarketing/clm-utah-templates/issues/10) tracks the site rebuild.
- [Homepage box inventory](clm-homepage-content-box-inventory.md) lists 34 homepage content boxes and acceptance fields.
- [Element-level SEO/schema register](clm-element-level-seo-schema-register.json) maps every 314 current Elementor nodes with SERP, YMYL, E-E-A-T, AEO, AIO, schema eligibility, and image metadata/rights fields.
- [Site map and page-family register](clm-site-map-and-page-family-register.md) defines service, industry, state, county, city, office, platform, editorial, education, SaaS, partnership and commerce families.

### Page scale and status
- The first Utah county/service matrix is 29 counties × 12 core service clusters = 348 planned rows.
- The initial state/service matrix is 10 states × 12 service clusters = 120 planned rows.
- Salt Lake City, Park City and St. George receive deeper office/city/service coverage; Utah major-city/service pages add further rows.
- These are planned page rows, not pages represented as already live. Each row requires unique local intent, evidence and review before publishing to avoid thin doorway pages.

### Live header and navigation changes
- The utility strip now shows Local first / Nationwide support, live St. George weather, separate dynamic date and Mountain time, St. George location, phone and account login. Email and the duplicate utility-bar cart were removed.
- Four dark/light wordmark/icon widgets now link home. Their original asset files remain separate; JavaScript no longer overwrites each logo variant with the same image.
- Cart precedes a tooltip-labeled, icon-only theme control at the far right.
- Main nav now groups Services, Industries, Our work, Resources and Local platforms. Services includes AI, AEO, AIO, YMYL/E-E-A-T, content/design, CRM, automation, PBX, SMS/MMS, review apps, live chat, reputation and e-commerce.
- Mega menus include icon-led group headings/links, View All destinations, keyboard-accessible triggers, and a rotating in-house Q promo rail.
- These changes are verified on a cache-busted production render. The canonical `/` URL still returns stale asset references/older menu output after Elementor and WordPress object-cache clears; a production cache purge/normal-route verification remains open.

### Remaining live homepage gaps
- Three rejected custom SVG illustrations remain on the homepage; approved licensed photo assets are not available through Envato search (results are watermarked previews only), so they were not hotlinked.
- Several service/package/system/process/portfolio/editorial boxes still lack approved, section-specific photography and complete image/title/subtitle/description/CTA fields.
- Video production exists as a service route, but homepage video proof, social video feeds, project examples, and education-video experiences are missing. No playable video asset was found in the WordPress media library.
- Commerce, featured audit, booking, live SMS chat, directory detail pages and all state/county/city/industry service landing pages remain in the planned QA/build scope.

## Required per-element acceptance
Every Elementor element is recorded by ID/type/class/section with a target query, search intent/SERP role, YMYL review, E-E-A-T evidence requirement, AEO answer target, AIO entity/action and schema eligibility. Every image also needs a descriptive filename, title, alt text, caption when useful, rights/source status and page-specific context. No decorative element should receive misleading standalone structured data.

## Verification limits
The normal homepage URL is still serving a stale cached bundle in the browser snapshot; query-busted production HTML uses the current theme assets and renders the revised header/menu. The 314-element register is a working acceptance map, not a claim that all sections are SEO-complete. Homepage image replacement and video proof remain blocked on approved assets.
