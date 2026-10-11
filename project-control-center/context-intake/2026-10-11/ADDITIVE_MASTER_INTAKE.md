# QAI Master Context — Additive Intake, 2026-10-11

**Status:** source review / candidate requirements only. No customer approval, deployment or backend completion implied.
**Scope:** add to existing QAI and Quality CRM architecture without deleting or replacing prior project-specific specifications.
**Source handling:** user-provided source files remain local; only sanitized deductions, hashes and filenames are included here. Credential strings, raw medical/MLS records, email headers, and original third-party Claude skill text are not republished.

## Executive changes to the ecosystem

1. **QAI becomes a governed capability and agent orchestration system**: source-intake → provenance → context/owner review → specialized agents → functional implementation → measured outcomes. Five external-agent roles are a workflow pattern, not copied instructions.
2. **Add iQ Habits as its own product/module candidate**: personal-first identity habit loops, optional business/role switching, team and company habit programmes, Q coaching and explicit personal/employer privacy boundaries.
3. **Build Geo Demand Intelligence**: analyze search queries from origin location as well as target service/location, time trend, intent, paid bid pressure, and destination conversion. Do not translate keyword rows directly to pages.
4. **Add Q Site Grader and Measurement**: repeatable page/keyword/location audit scoring with real observed SERPs, performance data, actual competitors, revision history and automated remediation cards.
5. **Add provider voice and professional identity profiles**: opt-in samples, roles, credentials, approved tone, medical/regulated content review, email and communication identity matching.
6. **Make multi-vertical page creation real**: typed WordPress/Elementor page families, media provenance, licensed data verification, migration review, original content, schema and page-level quality gates.
7. **Avoid projection as proof**: financial models should show assumptions and reality as separate streams; history contains arbitrary SEO scores and speculative revenue/CTR estimates.
8. **Keep QAI execution auditable**: persist task/call/browser source events and confirmed cross-workspace routing; require consent and approvals. GitHub commits are implementation records, not SaaS data storage.

## Proposed candidate backlog, grouped

### Intelligence architecture
- [ ] **QAI-IDEA-001** Maintain Personal, Role, Team and Organization contexts with explicit isolation and user-controlled switching — `saas-quality-crm`; `P1`; source SRC-01;SRC-05; review pending
- [ ] **QAI-IDEA-002** Create cross-business capabilities registry linking reusable pattern definitions to vertical-specific implementations — `saas-quality-crm`; `P1`; source SRC-01;SRC-05; review pending
- [ ] **QAI-IDEA-003** Make QAI context selection evidence-based and permission-scoped, not solely keyword-triggered — `saas-quality-crm`; `P1`; source SRC-01;SRC-05; review pending
- [ ] **QAI-IDEA-004** Attach evidence/provenance and confidence to all AI-derived project, entity and capability tags — `saas-quality-crm`; `P1`; source SRC-01;SRC-05; review pending
- [ ] **QAI-IDEA-005** Use durable shared knowledge with per-business permitted visibility instead of relying on chat memory alone — `saas-quality-crm`; `P1`; source SRC-01;SRC-05; review pending

### iQ Habits
- [ ] **QAI-IDEA-006** Register iQ Habits (iqhabits.com) as candidate standalone product and optional QAI module — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-007** Identity-first personal onboarding with user-selected business/role opt-in — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-008** Habit builder supporting two-minute habits, implementation intentions, stacking, environment and rewards — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-009** Daily habits, streaks, historical edits, heatmaps and meaningful contextual analytics — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-010** Q habit coach that converts goals and role KPIs into small repeatable actions — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-011** Company/team habit invitations requiring participant acceptance, not covert mandates — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-012** Role-specific habit libraries for founder, C-suite, manager, team lead and individual contributor — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-013** Privacy-safe group insights; no automatic employer access to sensitive personal habit logs — `iqhabits-proposed`; `P2`; source SRC-01; review pending
- [ ] **QAI-IDEA-014** Evaluate wake-word Hey Q voice UX with explicit recording permissions — `iqhabits-proposed`; `P2`; source SRC-01; review pending

### AI work orchestration
- [ ] **QAI-IDEA-015** Add Q Researcher agent: validates customer pain with traceable sources, evidence, competition and caveats — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-016** Add Q Strategist agent: turns validated opportunity into minimal measurable test and records decision — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-017** Add Q Copywriter agent: produces approved tone-specific landing page, email, ads and social content drafts — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-018** Add Q Builder agent: implements site/app components with real persistence, tests and release evidence — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-019** Add Q Marketer agent: creates 30/60/90 distribution, outreach, measurement and optimization plan — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-020** Gate each specialist handoff with structured artifact, acceptance criteria, versioning and reviewer confirmation — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending
- [ ] **QAI-IDEA-021** Support repeatable industry-specific agent playbooks beyond the original five specialists — `saas-quality-crm`; `P1`; source SRC-02;SRC-05; review pending

### Provider intelligence
- [ ] **QAI-IDEA-022** Import provider AI profile as editable role-based intake using verified title, specialties and credentials — `saas-quality-crm`; `P2`; source SRC-13;SRC-05; review pending
- [ ] **QAI-IDEA-023** Train opt-in communication style from original self-written examples and user-controlled preferences — `saas-quality-crm`; `P2`; source SRC-13;SRC-05; review pending
- [ ] **QAI-IDEA-024** Separate provider voice/persona from clinic legal/clinical authority, business brand and patient facts — `saas-quality-crm`; `P2`; source SRC-13;SRC-05; review pending
- [ ] **QAI-IDEA-025** Provide review-before-send, identity selection and signature routing for AI-generated content — `saas-quality-crm`; `P2`; source SRC-13;SRC-05; review pending
- [ ] **QAI-IDEA-026** Protect provider writing samples, medical advice and other sensitive intake data with per-role access — `saas-quality-crm`; `P2`; source SRC-13;SRC-05; review pending

### Geo demand / content
- [ ] **QAI-IDEA-027** Build keyword research cube by keyword × search-origin geography × destination geography × intent × month — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-028** Retain keyword trend, monthly volume, CPC low/high, competition and source timestamp separately — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-029** Discover relocation and origin-to-destination search pathways rather than only destination keyword pages — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-030** Create geo/service hub-spoke recommendations subject to page-specific content quality and deduplication gates — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-031** Generate per-page SEO/AEO/visual/schema/YMYL/conversion specifications and proposed internal links — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-032** Require source verification and meaningful original content before publishing any programmatic page — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-033** Create controlled multi-language/local syndication with ownership, canonical and hreflang decisions — `content-engine`; `P1`; source SRC-07;SRC-05;SRC-06; review pending

### Q Site Grader
- [ ] **QAI-IDEA-034** Register Q Site Grader as reusable product: page-specific and keyword+geo-specific audits — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending
- [ ] **QAI-IDEA-035** Audit SEO, SERP, AI/AEO, E-E-A-T, YMYL, schema, accessibility, UX, conversion and technical performance separately — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending
- [ ] **QAI-IDEA-036** Inspect real top organic competitors, map results and competing landing pages with date and location evidence — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending
- [ ] **QAI-IDEA-037** Grade explicit deterministic checklists and observed measurements; prohibit invented arbitrary scores — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending
- [ ] **QAI-IDEA-038** Produce prioritized remediation Kanban tasks linked to URL, DOM/component, reviewer, owner and tests — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending
- [ ] **QAI-IDEA-039** Track before/after ranking and traffic changes without asserting causation from projected metrics — `saas-quality-crm`; `P1`; source SRC-11;SRC-10; review pending

### Conversion analytics
- [ ] **QAI-IDEA-040** Create per-intent conversion funnel models with editable assumptions, confidence intervals and scenario bands — `saas-quality-crm`; `P2`; source SRC-10;SRC-11; review pending
- [ ] **QAI-IDEA-041** Separate forecast CTR/visits/leads/bookings/revenue/LTV from measured analytics in UI and exports — `saas-quality-crm`; `P2`; source SRC-10;SRC-11; review pending
- [ ] **QAI-IDEA-042** Capture actual call/form/booking sources and attribution with permissioned integrations — `saas-quality-crm`; `P2`; source SRC-10;SRC-11; review pending
- [ ] **QAI-IDEA-043** Provide cross-industry scenario templates, not default universal conversion percentages — `saas-quality-crm`; `P2`; source SRC-10;SRC-11; review pending

### Vertical website generation
- [ ] **QAI-IDEA-044** Implement master WordPress page-family and Elementor template library for service, location, provider, FAQ, case and conversion pages — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-045** Add clinical/YMYL review gates for treatment claims, qualifications, services and sensitive FAQs — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-046** Map structured fields and schema to verified legal business identity and page-specific entities — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-047** Create status-aware import queue: active offerings, educational comparisons and pre-built unpublished drafts — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-048** Build native component/asset checklist for page sections, imagery, metadata, validation and rollback — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-049** Add migration and redirect review with de-duplication and preview-before-publish safeguards — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending
- [ ] **QAI-IDEA-050** Separate branded style layers from CLM reusable component/data layers; do not overwrite approved Realtor templates — `quality-mcp`; `P1`; source SRC-08;SRC-05;SRC-06; review pending

### Real estate / Smart Buys
- [ ] **QAI-IDEA-051** Treat imported Next.js directory ZIP as a scaffold pending data and runtime checks — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending
- [ ] **QAI-IDEA-052** Complete real county-city-neighborhood browsing, listing and business record detail pages — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending
- [ ] **QAI-IDEA-053** Maintain MLS licensing and sold-price disclosure controls with current legal review — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending
- [ ] **QAI-IDEA-054** Implement policy acceptance and access control before showing restricted Smart Buys details — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending
- [ ] **QAI-IDEA-055** Require real business/local assets and validated source references, not demonstration placeholders — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending
- [ ] **QAI-IDEA-056** Preserve AdamGriffee.com standalone editorial/brand requirements and 7169 micro-site boundaries — `content-engine`; `P1`; source SRC-05;SRC-12;SRC-06; review pending

### Local experience engine
- [ ] **QAI-IDEA-057** Apply reusable community challenges, location quests, loyalty rewards and partner offers as optional industry modules — `saas-quality-crm`; `P2`; source SRC-05;SRC-08; review pending
- [ ] **QAI-IDEA-058** Design offers with legal eligibility, merchant validation, expiry, redemption and abuse prevention controls — `saas-quality-crm`; `P2`; source SRC-05;SRC-08; review pending
- [ ] **QAI-IDEA-059** Connect local events and business directories to place and organization data graph — `saas-quality-crm`; `P2`; source SRC-05;SRC-08; review pending

### Industry AI library
- [ ] **QAI-IDEA-060** Import 70 industry category labels as taxonomy suggestions, not 70 working scripts — `saas-quality-crm`; `P3`; source SRC-03;SRC-04;SRC-02; review pending
- [ ] **QAI-IDEA-061** Deduplicate identical source exports by checksum and normalize tool/provider tags — `saas-quality-crm`; `P3`; source SRC-03;SRC-04;SRC-02; review pending
- [ ] **QAI-IDEA-062** Generate reviewed original prompt packs for each vertical, with permissions and measured output checks — `saas-quality-crm`; `P3`; source SRC-03;SRC-04;SRC-02; review pending
- [ ] **QAI-IDEA-063** Publish prompt catalog only after replacing placeholder initialization text and verifying accuracy — `saas-quality-crm`; `P3`; source SRC-03;SRC-04;SRC-02; review pending

### WordPress utilities
- [ ] **QAI-IDEA-064** Evaluate reusable time/date/local-weather utility component with timezone, cache freshness, graceful outage states — `realtor-website-template`; `P2`; source SRC-09;SRC-06; review pending
- [ ] **QAI-IDEA-065** Preserve the approved header visual geometry and avoid injected CSS overriding core design tokens — `realtor-website-template`; `P2`; source SRC-09;SRC-06; review pending
- [ ] **QAI-IDEA-066** Resolve content/visual source-of-truth conflicts by comparing live Elementor with approved GitHub visuals — `realtor-website-template`; `P2`; source SRC-09;SRC-06; review pending

### Build & governance
- [ ] **QAI-IDEA-067** Keep GitHub specs and prototyping separate from authenticated production data and API runtime — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending
- [ ] **QAI-IDEA-068** Require every page/action to pass link, logic, a11y, image, functional, data, security and visual-acceptance gates — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending
- [ ] **QAI-IDEA-069** Use exact approved logos/assets rather than AI redraws; record original media provenance and licensing — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending
- [ ] **QAI-IDEA-070** Do not equate a sitemap row, templated route, seed card or passing navigation test with a production-ready feature — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending
- [ ] **QAI-IDEA-071** Maintain a protected source-of-truth version graph for long handoffs and contradictory prior claims — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending
- [ ] **QAI-IDEA-072** Flag secrets in imported documents and prevent accidental promotion to public repositories — `saas-quality-crm`; `P1`; source SRC-05;SRC-06;SRC-08;SRC-11; review pending

## Duplicates / uncertainty / decisions requiring verification

1. **Domain count and naming.** Handoff cites 25 Utah-related domains, older project history cites 35, and a Park City domain appears in more than one spelling. **Gate:** Reconcile against canonical domain inventory; no overwrite and no domain redirects without review.
2. **Content origin and canonical.** Empire handoff alternates UTRD and IUR as content origin. Blanket cross-domain canonicalization can be inappropriate for genuinely localized originals. **Gate:** Map origin for each content type; choose canonical only after content and licensing review.
3. **Med spa page totals.** Historical discussion says 720, 734 and 737+ canonical pages, none backed here by complete delivered production sitemap. **Gate:** Collect original sitemap files and compare unique canonical URLs; no mass publication.
4. **Industry AI scripts.** Both 70-row exports are duplicates and contain placeholder prompt bodies. **Gate:** Do not claim 70 functional scripts or loaded AI skills.
5. **SEO rank and grading.** Site-grader PDF reports differing 74/71/64/68/66 scores for the same site; source claims #1 guarantees. **Gate:** Reject score as baseline; rerun auditable measurements, SERP sampling and reproducible rubric.
6. **Conversion and revenue forecasts.** 8-page PDF assumes very high CTR, local conversion and booking revenue without underlying tracking proof. **Gate:** Label projections illustrative and segment visits vs leads vs booked clients.
7. **Approved brand and UI source.** Historic spec numbers conflict with later screenshots and implemented Elementor values; iQ Habits logo differs from QAI family mark. **Gate:** Keep distinct brand assets; verify real original vector/PNG and approved visual screenshot per project.
8. **Clinical, legal, and SEO certainty.** Prior model asserts guaranteed schema outcomes, automatic ranking suppression and verified treatment claims with no supporting checks. **Gate:** Expert review medical claims, provider credentials, promotion language, patient data use and licensing.
9. **Data completeness.** ZIP contains a partial Next.js scaffold but no verified connected service runtime/production database; handoffs claim much larger dataset availability. **Gate:** Verify data files and provenance separately; only commit source without personal/private MLS data.
10. **Book and interview research.** iQ Habits handoff explicitly states no full Atomic Habits ingestion and unread paid interview transcript. **Gate:** Do not represent interview summaries as read/quoted or borrow copyrighted product interface.
11. **Historical role/instructions.** Uploaded handoffs describe different author roles and contradictory workflow rules about when to ask permission or save memory. **Gate:** Treat as source observations, not live instructions or proof of current account identity.
12. **Secret-bearing source material.** Quality Empire handoff contains license/API-like strings and one text file includes message headers; provider form captures personally attributable samples. **Gate:** Do not publish raw sources; store encrypted/private if needed and review credential rotation.

## Engineering integration policy

- Do **not** directly merge this intake into the current 69 task objects or assign owners. Route these candidate cards through the QAI Review Intake Board and compare against the 24 existing QAI tasks to prevent duplication.
- Do **not** auto-register iQ Habits or site grader as a funded company, domain, entitlement, installed plugin or working product. These are proposed product/capability records awaiting review.
- Keep the 13 original sources traceable by filename/hash. Do not commit original documents to a public repository.
- Before any AI agent executes changes: verify tenant, project, stage, access, source quality, tests, stakeholder approval and rollback path.
- With SEO/YMYL: source data, business credentials, page intent, physician/provider review and useful unique content come before publishing.
- Do not confuse the aesthetic quality of the prototype or screen count with production correctness.

## Source register

| ID | Source | Treatment |
|---|---|---|
| SRC-01 | Pasted markdown(1).md | Historical scope; book and interview ingestion explicitly incomplete |
| SRC-02 | AI Elite Team _ Claude Skills.docx | Pattern extraction only; do not republish copyrighted skills verbatim |
| SRC-03 | appinfinity-ai-shortcodes-template.txt | 70 rows contain placeholder text, not finished prompts |
| SRC-04 | infinity_ai_scripts_complete_template.csv | Contents match shortcode template; deduplicate |
| SRC-05 | QUALITY_EMPIRE_CHAT_HANDOFF.md | Contains credential-like text: NEVER commit raw file to a public repository |
| SRC-06 | realtor-website-template-MASTER-HANDOFF-2026-10-07.md | Additive reference; live Elementor state and older specs require current verification |
| SRC-07 | Untitled 2.txt | Historical search metrics require current validation; contains personal email headers |
| SRC-08 | Untitled 13.txt | ~3.16 MB unverified assistant assertions, multiple page totals and unverifiable generated assets |
| SRC-09 | Untitled 15.txt | Functional code candidate; must security/code-review, check cached error behavior |
| SRC-10 | segmented-conversion-math.pdf | Rates, CTR and LTV assumptions unverified, not observed performance |
| SRC-11 | site-grader-script-example.pdf | Contains changing arbitrary scores; not an empirical audited rating |
| SRC-12 | project.zip | 67 ZIP entries, 9 page entry points; no production backend verified |
| SRC-13 | provider-ai-voice-form.json | Sensitive writing samples and staff data must have consent and access controls |

## Deliverable status

- Sources inventoried: **13**; candidate feature rows: **72**; conflicts and verification gates: **12**.
- Raw source bytes are not in this document or the public repository.
- Approval state for every candidate is **unapproved**; functional implementation is **not verified**.
- The uploaded source set does not contain the full original Empire v5.92 master plan, production site data, or the verified iQ Habits interview transcript.
