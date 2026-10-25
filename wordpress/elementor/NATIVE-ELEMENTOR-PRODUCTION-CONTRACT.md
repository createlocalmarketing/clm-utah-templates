# National Parks Guide — Native Elementor Production Contract

**Status:** HARD RULE / all page targets. This contract supersedes any practice of treating static GitHub Pages HTML previews as the WordPress deliverable.

## Rule 1 — absolutely no HTML widgets for page design

Every visible, editable page element for `nationalparksguide.co`, `utahzionnationalpark.com`, and future park/city variants **MUST be a native Elementor/Elementor Pro widget inside a Flexbox Container or an Elementor Theme Builder / Loop Item template**. No exceptions for visual page sections.

Forbidden in page element trees: `html`, `shortcode`, `wp-widget-custom_html`, custom HTML layouts, pseudo-widgets and an iframe of the old GitHub Pages website. Custom CSS/JS pasted into page widgets is not a substitute for native element layout. Do not use `elementor_canvas` with a separate static HTML page injected into WordPress.

- Two-column page hero: **Elementor Pro Nested Carousel** `nested-carousel`, with five slide containers. Each slide has Image widget in left Container and Heading, Text Editor and Button widgets in right Container. Editors must be able to modify and rearrange every slide in Elementor Navigator.
- Other photographic carousels: `nested-carousel`, `loop-carousel` (when data-backed), `image-carousel`, or `gallery` as appropriate. Native pagination/swipe/arrows—not custom HTML slider code.
- Photo/content cards: Elementor Containers with Image, Heading, Text Editor, Button (or native `image-box`) and field-level controls.
- FAQ: Elementor Accordion or Nested Accordion with item-level editable questions; schema from appropriate SEO plugin / actual visible content.
- Menu/header/footer: Elementor Pro Theme Builder templates; `nav-menu`, `mega-menu`, Site Logo, site-title, buttons. Sitewide templates use proper display conditions.
- Merchant/trail/article/event lists: native Loop Grid/Loop Carousel + corresponding Elementor Loop Item template, backed by canonical CPTs/taxonomies/ACF and verified geo fields. Each loop item is editable in Elementor; each content record is independently editable in WordPress.
- Park and city search filters: native taxonomy filter / Elementor search widgets or a separately registered fully editable Elementor widget; never a pasted HTML form.
- Real images: approved, correctly labeled WordPress Media Library attachments with descriptive alt text, metadata, source/license ledger and responsive image output. Candidate remote Wikimedia URLs in the draft files DO NOT meet this requirement until they are reviewed and ingested.
- SEO schema, canonical URLs, content taxonomies, source and license records are **backend functions**, not visitor-visible HTML widgets.

## Standard reusable templates and live-data model

| Page family | Elementor template / component | Data & acceptance |
| --- | --- | --- |
| National homepage | Native nested 2-column five-park hero + park/experience loops | Five approved destination photos and real park records |
| Utah Zion homepage | Native five-slide 2-column hero + ten separate category carousels | Zion activities + gateway companies, truthful geography |
| Each of 63 park hubs | Dynamic Elementor single-park template + park-dependent loops | Unique media, guides, sourced NPS facts, real entries |
| Park topic and subcategory | Single guide template + unique post/page instance | Per-URL keyword/SERP, original visitor copy and photos |
| Merchant profile | Single `npg_business` template, ACF/dynamic tags, native widgets | Owner/location data, 25-mile source test, operator media |
| Merchant category | Elementor Loop Grid/Carousel `npg_business` | Verified category and origin-specific search results |
| Trail / photo location | Single `npg_trail` / `npg_place` template | Coordinates, trail rules, images, route safety |
| Article / news / history | Single `npg_story` template | Sourced original reporting, byline, author QA |
| Event | Single `npg_event` template and loop | Confirmed dates, organizer, local time, venue |
| Deals / vouchers | Single `npg_offer` + native Elementor card loop | Merchant approval, valid dates, actual redemption |
| Products / souvenirs | Elementor WooCommerce product and archive widgets/templates | Real SKU, unique art, inventory, price and fulfillment |
| App landing | Elementor-native page and **separate real React Native app** | Phone-framed browser simulator is not native app code |

The WordPress data layer may use PHP/custom plugins for CPT registration, schemas, data ingestion and REST endpoints. Those are not substitute visual HTML layouts.

## What is actually in this branch

- `native-templates/national-home.json`: 214 independently-editable native Elementor elements, 23 Image widgets, 3 Nested Carousel widgets, 0 HTML widgets.
- `native-templates/zion-home.json`: 627 native elements, 64 Image widgets, 11 Nested Carousel widgets, 0 HTML widgets.
- `native-templates/zion/*.json`: 8 differentiated Zion guide page templates, each 216 native elements, 23 Image widgets, 1 Nested Carousel, 1 H1, and native FAQ Accordion.
- All content is saved in **Elementor's native import/export JSON format** with a `content` array of `elType:\"container\"` / `elType:\"widget\"` elements. Embedded markup is rejected by `validate-native-templates.mjs`.
- These are **unimported, unapproved staging artifacts**. JSON syntax/element structure passed independent source checks. A real Elementor import/edit/render test is still a blocker; do not call these pages deployed.

## Production gate — required before WordPress deployment

1. Connect **the correct park WordPress staging site** through Quality MCP (or another authorized Elementor connector). Current Quality MCP connection is AdamGriffee.com — do not deploy National Parks templates there.
2. Read installed Elementor + Pro version, registered widget slugs, Nested Elements feature state, active Kit typography/colors and CPT registration.
3. Ingest source-approved photography into the park Media Library, then replace external `id:0` candidate image URLs with valid attachment IDs and source/license links.
4. Create draft Elementor pages or Elementor Library templates via Elementor Document::save, not direct HTML edits. Create/edit the Loop Items and bind ACF fields.
5. Verify Navigator editability of **each native element** including independently edited child slides, typography, buttons, dynamic loops, images and responsive controls.
6. Screenshot desktop, tablet and actual mobile views; test arrows/swipe, media loading, accessibility, SEO, navigation, business data and Core Web Vitals.
7. Pair **every URL** with its existing 32-gate page-specific acceptance register. Human reviewer must approve the exact URL before publication.
8. Never mark any of the 8,411 targets complete merely because a static preview or template JSON exists.

For existing review links use [National Pages](https://createlocalmarketing.github.io/clm-utah-templates/nationalparksguide.co/all-pages/index.html), [Zion Pages](https://createlocalmarketing.github.io/clm-utah-templates/utahzionnationalpark.com/all-pages/index.html), and [8,411 Page Checklist](https://createlocalmarketing.github.io/clm-utah-templates/npg-preview-20261011/checklist/index.html).

## Design Meeting Flow accountability

Each project request must map: original instruction → Elementor widget/template/instance ID → exact page URL → image/source/SEO checklist → screenshot proof → revision/change request → reviewer approval → staged publication. Do not send another HTML screenshot as evidence of Elementor implementation.
