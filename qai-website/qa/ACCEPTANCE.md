# QAI WEBSITE — ACCEPTANCE & RELEASE AUDIT

**Status: PUBLIC SITE IMPLEMENTATION BUILT; LIVE AND VISUAL ACCEPTANCE OPEN.**
**Purpose:** A separate, full public marketing/product website — not another screen inside the CRM or iPhone simulator.

## 1. Routes and content

- 46 independently addressable `.html` routes are generated.
- Core: home, platform, products, industries, solutions, pricing, resources, about, contact, security, integrations, demo, FAQ, capabilities, roadmap (15).
- Product detail pages (10), industry detail pages (10), solution detail pages (5), editorial articles (6).
- Reusable design templates provide consistency; **46 routes do not mean 46 individually hand-art-directed layouts**.
- Global header/footer, top navigation, responsive menu, search and related-page links.

## 2. Visual requirements

- Ivory, charcoal, deep sage and restrained gold design tokens; strong readable contrast.
- Image-led main story with human/business/community imagery from already-present repository `/img/` assets.
- Image-backed editorial product/industry cards and feature sections throughout the site.
- Actual approved master Q vector **not yet available in repository**. Temporary synaptic-node/QAI wordmark is a proposal, not a verified brand master. Replace when approved source SVG is accessible.
- **NOT PASSED:** visual cross-browser, image-load and actual user review. Browser session blocked by execution environment policy.

## 3. Functional flows

- Global navigation: links to actual generated HTML files.
- Global search: filters published products/industries/solutions/pages; closes via Escape.
- Workflow stepper: switch among Capture / Verify / Review / Execute.
- Sample command-center experience: switch workspace and Kanban view.
- Pricing toggle: changes *proposed* packaging, not checkout.
- Tour/contact form: validates, locally saves and downloads a JSON brief; explicitly never claims that email was sent.
- Native `details` accordion FAQ with accessible summaries.
- Links to actual existing desktop and iPhone concept URLs without pretending either is the website.
- **NOT VERIFIED IN LIVE BROWSER:** complete click-through and cross-device interaction testing.

## 4. Honest scope separation

- Marketing pages are published static site content on GitHub Pages.
- The QAI CRM concept stores demo state locally and does not have multiuser persistence.
- Phone, Gmail, live voice, OpenAI agent orchestration, site changes, and Quality MCP integrations remain unconnected in this public product preview.
- QAI is not commercially released; edition/pricing descriptions are tentative and avoid invented pricing.

## 5. Release gates

- [x] Generated route inventory and expected destination files.
- [x] HTML entry, shared CSS/JS source, favicon and descriptive metadata.
- [x] Node parse/syntax check for the two JS files.
- [x] Static link/route checks (`qa/static_audit.py`, results in `STATIC_AUDIT.json`).
- [ ] Production GitHub Pages HTTP 200 smoke tests for every route.
- [ ] Actual image/media loading checks for each visual card and hero.
- [ ] Browser interaction tests on desktop/tablet/phone.
- [ ] Contrast/keyboard/focus and WCAG checks.
- [ ] Exact approved Q mark source replacement.
- [ ] Final human design and launch approval.

## 6. Existing app mobile modal defect

In `qai-platform/app.js`, the mobile renderer previously appended `renderModal()` outside the simulated phone, creating a desktop-size overlay. Correct by mounting it inside `.iphone-glass` with a contained overlay and mobile-specific stacked form. Also replace the lifeless mobile Visual Builder sample with clearly identified photo-led selectable components; keep live-site actions clearly separate.

**No completed implementation or visual signoff is inferred merely from a page loading.**
