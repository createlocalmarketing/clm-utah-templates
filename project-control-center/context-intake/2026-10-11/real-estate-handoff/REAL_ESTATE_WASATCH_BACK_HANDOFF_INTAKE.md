# Real Estate Empire / Wasatch Back — additive technical intake (SRC-14)
**Status:** historical source analyzed; changes proposed, NOT approved or implemented.
**Ingested:** 2026-10-11. **Historical session stated:** 2026-07-31.
**Primary area:** `content-engine` (Utah real-estate network). **Dependencies:** `quality-mcp` (WordPress execution), `saas-quality-crm` (QAI orchestration/attribution), `realtor-website-template` only for reusable CLM components (do not conflate AdamGriffee.com with Park City city-site work).

## Source fidelity
This is a **transcript-style handoff**, not a verified line-by-line complete recording. The attached Markdown claims a remote delivery ZIP and reports audits/generation completed by a previous agent. This intake verifies **what the MD says** and its 19,503-byte checksum; it does not verify archive contents, present-day site conditions, keyword availability, SEO rankings, WordPress imports, or production deployment. All quantitative figures below are **historical claims** until source files are examined.

## Historical artifact inventory claimed by source
| Artifact | Reported quantity/purpose | Proof still needed |
|---|---|---|
| `02-keyword-matrix.csv` | 1,686 deduplicated keyword rows from 42 requests | raw CSV, pull locality and date, bid/volume columns, duplicate and intent mapping |
| `04-wasatch-back-pages.wxr.xml` | 251 WordPress **draft** pages | WXR parser, real Elementor data, content uniqueness and complete manifest |
| `07-washington-county-pages.wxr.xml` | 116 WordPress **draft** pages | WXR parser, proper St. George geography/branding and manifest |
| `elementor-template-kit/` | 10 reusable section JSON exports | validity, widget/template imports, rendering and editor roundtrip |
| `05-acf-field-groups.json` | Geo, comparison, relocation field group definitions | plugin dependency, ACF import, required field/render tests |
| `06-page-manifest.csv`, `08-washington-manifest.csv` | page hierarchy, import planning | unique IDs, parent-child mapping and export parity |
| `01-verification-gap-report.md` | municipality/CDP and development name deltas | full official source and actual discrepancy list |
| `03-site-architecture.md` and `00-README-IMPORT.md` | routing, schema, import procedure | inspect directly before implementation |

## Geographic coverage, authority and entity quality
- Source says it compared **29 Utah counties** with official municipality/CDP lists (historically 255 municipalities/79 CDPs) and identified **64 omitted or variant places**, plus approximately **30** Wasatch Back development naming differences. The exact figures are not independently validated.
- Priority areas are **Summit + Wasatch** and then **Washington County**, followed by remaining counties with quality/source gates.
- Store `geo_entity_id`, entity type (incorporated city/CDP/unincorporated area/neighborhood/development/HOA), official names, alternate names, parent/overlapping counties, provenance, verified-as-of date and status.
- Never assume a named real-estate development is an incorporated locality. Resolve subdivision geometry from recorder plats where possible, with county-specific naming and OCR quality checks.
- Historical suspicious names: `Onball Jandian`, `Park City Bane`, `Summit Pack`, `The Colon`. Treat as questionable OCR, not entities.
- Examples of previously claimed omissions: Summit **East Basin, Hoytsville, Marion, Samak, Silver Summit, Wanship**; Wasatch **Independence, Park City**; Washington **Apple Valley, Leeds, New Harmony, Dammeron Valley**. Validate against contemporary and jurisdiction-aware authoritative data before making claims of completeness.

## Search-demand and page architecture
- Capture search **origin geography** separately from target location (national/state/county/city; intended move-from state, targeted destination, time trend, average monthly volume, CPC range, competition, measured date). This extends earlier `QAI-IDEA-027..033`, not a replacement.
- Source keyword examples include `moving to Utah from California`, `aspen vs park city`, `Park City vs Vail`, `cost of living in Park City`, `homes for sale in Park City Utah`, and specific developments. Values like $93.53 CPC are **historical snapshot claims**, not current prices.
- Separate page families: `/areas/`, `/neighborhoods/`, `/relocation/moving-to-park-city-from-{state}/`, `/compare/{a-vs-b}/`, city/community/property pages and IDX listing views.
- Proposed eight origin-state relocations in the claimed draft: CA, TX, NY, FL, CO, WA, AZ, IL. Do not publish templated thin variants.
- Each useful page requires distinct real local content, verifiable property and demographic facts, images with provenance, original FAQ/answers, editorial reviewer, current SERP/search intent mapping, structured data and relevant next steps.

## WordPress / Elementor / MLS contract
1. Source references **Elementor Pro + native editable widgets and containers**. WXR `_elementor_data` must actually roundtrip through the real editor, not just parse as XML.
2. ACF groups must map page types to verified place data, source timestamps, legal disclaimer, `reviewed_by` and `license_number` where applicable; no hardcoded faux statistics.
3. BoldTrail / kvCORE code references include `[kvcoreidx_search]`, `[kvcoreidx_listings]`, `[kvcoreidx_listing_detail_page]`, `[kvcoreidx_site_map_index]`, `[kvcoreidx_team]`, `[kvcoreidx_agent_profile]`. These are **syntax as reported by handoff**, not installed-configuration verification.
4. Check plugin rights/token and use per-page authorized shortcode selection; an empty page or placeholder is a failing implementation.
5. Separate build acceptance: source checked → staging import → editability → IDX live validation → content/SEO review → accessibility/performance → production release.
6. Reported launch blockers: WordPress search indexing discouraged / robots blocked and ACF Pro missing. **Check live today**; do not assume historical state persists.

## Network, product and capability reuse
- Network roles: UTRD directory/entity hub; IUR editorial and syndication hub; Park City and St. George city brands; specialist rental/mortgage/SmartBuy sites; Utah Savings Guide, DealiciouslyLocal, resorts/parks and local discovery as contextually valuable feeders.
- Respect source/canonical decisions and real visitor value. Search rank #1 cannot be guaranteed and cross-domain backlinks must not be indiscriminately manufactured.
- Longer-term PropertyZen concepts in the handoff: Property Passport, Genome, Decision Brief, Advisor, Steward, Knowledge Network and Built World Graph, based on evidence-first decision standards. Candidate architecture, **not working modules**.
- First-party QAI may use source auditing, verified geo catalog, demand cube, section-template library, import batch review, release gates and cross-domain attribution as reusable capabilities.
- Data rights are first-order: MLS/RESO/IDX contracts, confidentiality and Utah price disclosure restrictions must be assessed before public display.

## High-impact immediate next actions
1. Verify historical archive existence and read the claimed nine delivered items. **No secret-bearing sources go to public GitHub.**
2. Cross-check original neighborhood lists, municipalities/CDPs, recorder plats and normalized geographic type.
3. Compare current Park City/St. George WordPress/Elementor/IDX installations with historical claims.
4. Create a practical staging import validation with a **small reviewed batch**, not 367 sitewide live publishes.
5. Restore measurable gate-by-gate outcomes in QAI Kanban; owner/co-manager and destination tags require human verification.

## Register links
- [Candidate rows QAI-IDEA-073 through QAI-IDEA-092](../CANDIDATE_REQUIREMENTS.csv)
- [Conflict gates V-13 through V-17](../CONFLICT_REGISTER.md)
- [Source register SRC-14](../SOURCE_REGISTER.json)

## Historical delivery references (not independently tested)
- Deliverable ZIP (from source): `https://galaxy-prod.tlcdn.com/gen/user_3DveYwAs8XNdeHGrekztm3LCBrC/14dbccfc-08fc-490a-af63-b651bdb61e4c.zip`
- Companion summary (from source): `https://g.tlcdn.com/gen/728ea9f6fb644d5bbae1323f51ae4463.md`
- Original design folder, neighborhood document and Drive IDs are referenced in the uploaded handoff and require authorization/recency verification before use.
