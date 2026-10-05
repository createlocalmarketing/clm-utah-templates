# CLM universal page templates (handoff)

Static preview of Create Local Marketing's universal page-type templates for the Utah real-estate network. There is one template per page type. Every brand gets the same features; only the theme (colors, fonts, copy) and the geographic scope change.

## Where things are

| Path | What it is |
|---|---|
| `index.html` | Index: one line per universal template, with one button per brand. Each button opens that single page template on its own URL. |
| `data/templates.json` | The same index in machine-readable form: template name, group, key elements, production URL pattern, and a standalone page link per brand. |
| `utrd/t-*.html`, `iur/t-*.html`, `pch/t-*.html`, `sg/t-*.html` | Standalone single-template pages. Links inside are disabled so you see only that page. |
| `utahrealestatedirectory.com/` | Full clickable copy of the Utah Real Estate Directory site. |
| `insideutahrealestate.com/` | Full clickable copy of the Inside Utah Real Estate site. |
| `homesforsaleinparkcityutah.com/` | Full clickable copy of the Homes for Sale in Park City site. |
| `homesforsaleinstgeorgeutah.com/` | Full clickable copy of the Homes for Sale in St. George site. |
| `engine/brands.js` | Brand configs. This is the only thing that differs between domains. |
| `engine/core.js` | Shared engine: data loading, geo resolver, area-of-influence ranking, shell, router. |
| `engine/pages.js` | Every page template. |
| `engine/app.css` | One stylesheet, themed per brand through `body.brand-*` CSS variables. |
| `data/geo.json` | Counties, cities, neighborhoods and regions from the CLM master database. |
| `data/content.json` | Listings, businesses, people, news, events, deals, jobs, classifieds and marketplace items. These are sample records. |

## Brand scopes

- **UTRD** and **Inside Utah Real Estate:** statewide. The drill-down goes region → county → city → neighborhood.
- **Park City:** Summit and Wasatch counties, with Park City as the primary city.
- **St. George:** all of Washington County, with St. George as the primary city.

## Area-of-influence radii

Results for a city or neighborhood include anything within these distances (miles), labeled by distance. The radii are set in `CLM_RADIUS` in `engine/brands.js`.

| Content | Radius (mi) |
|---|---|
| News | 25 |
| Events | 30 |
| Activities | 60 |
| Schools | 12 |
| Jobs | 30 |
| Deals | 20 |
| Marketplace | 25 |
| Classifieds | 25 |
| Nearby listings | 12 |
| Businesses | 25, plus their service area |

## Rules

- Use subdirectories only, never subdomains.
- Never use competitor portal names as sources or keywords.
- The production stack is WordPress, Elementor Pro, ACF Pro and Kinsta.
