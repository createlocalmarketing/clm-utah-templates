# QAI design and interaction remediation — 2026-10-10

## Incident

The first published Screen Explorer was a 17×37 repeated matrix of tiny dark-on-dark pills. Its headline advertised 629 "screens" even though the number represents route combinations across a shared generic module set, not 629 distinct and validated screen designs. The design failed visual hierarchy, brand image use, user-oriented navigation, and QA signoff. Its logo was not the approved master brand. The previous statement "initial tests passed" obscured important untested actions. All are P0 acceptance defects.

## Work included in this patch

- Editorial business directory: two-column photo-backed cards, refined light editorial typography and gold highlights, contrast-safe light tool rows, real media paths from the current CLM GitHub repo.
- Changed 37 simultaneous per-company buttons to six visible essentials plus explicit expansion to all 37 modules.
- Company-specific contextual module inventory and real action targets; industry filter and live search, workspace open and mobile simulator links.
- Font Awesome Free icon styles supplied via public CDN for the directory; general controls retain native inline SVG fallback. External font delivery not verified by local browser runtime.
- QAI brand ring with five-node Synaptic Core SVG **is explicitly reconstructed draft**, not an approved original master Q; definitive logo source remains blocked pending approved SVG asset recovery.
- Mobile "More" view changed to contextual modules with option to expand complete index, selected-company brand photo and company switch options. Not the desktop layout squeezed into an iPhone.
- Generated full 1,258-row desktop/iPhone context manifest, canonical module/feature checklist, action list, forms and 2-pass acceptance policy.
- Automated local render exercise across 629 desktop and 629 iPhone context routes with zero JS errors, and interaction checks for first explorer/filter/expand/navigation. No claim that every primary action was individually clicked.

## Verification and caveats

- **PASS (local):** Node JS syntax; 1,258 contextual screens render; 17 explorer cards; filter, expand 37 modules, workspace navigation.
- **MANUAL REVIEW REQUIRED:** Full actual GitHub Pages design/screenshot fidelity, human media fit, copy, every button, form, interaction outcome, icon fidelity, mobile screens beyond smoke, real route URLs with GitHub Pages.
- **P0 STILL OPEN:** Exact master Q logo fidelity, fontawesome asset-loading confirmation, live connections, real people profiles where authorized, most individual demo actions, existing generic module presentation, real account data and persistence.
- **TRUTH:** This remains a localStorage-based sample concept; GitHub Pages is not a production app server, and this change does not implement telephony, Gmail, QA media recording, MCP website deployment, or agent execution.
- **Do not mark the 1,258 route rows "approved" based on render test.** They have additional separate gates.

## Next implementation rounds

1. Link approved source SVG Q outer mark and exact center Synaptic Core geometry; compare at 16/24/32/64/128px desktop and iPhone.
2. Inventory EVERY rendered control in all modules and record click/expected result, contrast and media, including error/cancel states. Decommission nonfunctional decorative buttons or implement local demo action with explicit simulation status.
3. Replace sample business records with real authorized connector imports and backend tenant-owned persistence with test accounts; verify permission segregation.
4. Give each module a purposeful product-level screen layout rather than a cloned generic template; functional first, then separate desktop and mobile design signoff.
5. Gate completed code through repository testing and staging; never treat static GitHub Pages interactions as live SaaS capabilities.