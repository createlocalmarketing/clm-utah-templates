# SRC-14 — Original artifact recovery and functional validation checklist
**State:** All pending. **Source:** historical handoff only; nothing here certifies actual file deployment.

- [ ] Authorized source archive downloaded and checksums captured (never assume URL available).
- [ ] ZIP safely inspected for path traversal, credentials, scripts and file integrity.
- [ ] `02-keyword-matrix.csv` contains claimed 1,686 unique records with source, geo, timestamp and CPC definitions.
- [ ] `04-wasatch-back-pages.wxr.xml` contains claimed 251 **drafts** with unique WordPress IDs/slugs, correct Elementor data and reviewed content.
- [ ] `07-washington-county-pages.wxr.xml` contains claimed 116 **drafts** without cross-market contamination.
- [ ] Both manifest CSVs match XML page identities exactly; counts subtotal and hierarchy reconcile.
- [ ] Ten section templates import into Elementor Pro and roundtrip without losing native editability.
- [ ] ACF field groups import and page type mapping validates.
- [ ] Search-origin geography and destination geography remain separate in keyword tables.
- [ ] Place dataset validates official cities/CDPs, subdivision records, aliases and overlapping counties.
- [ ] Historical 64 missing places and ~30 development variants reproduced and corrected with source evidence.
- [ ] Current live robots/indexability, ACF Pro and BoldTrail/kvCORE status checked.
- [ ] Real IDX shortcodes produce licensed listing results and filter correctly on staging.
- [ ] No exact sold prices, sensitive MLS or private data exposed contrary to verified rights.
- [ ] Required real media, schema, original page content, YMYL/EEAT fields and approved signatures present.
- [ ] Sample staging pages pass visual, desktop/mobile, functional, SEO and accessibility review.
- [ ] Approving owners/co-managers and project tags verified in QAI Review Intake before agent execution.
- [ ] Production publish remains explicitly separately approved.
