# SaaS Quality CRM / QAI — Permanent Audit Ledger

## 2026-10-10 — First-party meeting intelligence and QAI orchestration requirements captured

**Source:** Current user discussion about multi-speaker meeting capture, visual website review, native browser extension, joint Kanban ownership, tag verification, universal capabilities, call analytics, SMS, calendar, email identities, and functioning CI/CD.

**Architecture:** [QAI Operating System Architecture](../project-control-center/docs/qai-operating-system-architecture.md)

**Project registration:** `saas-quality-crm` created in Project Control Center projects.json under plugin development.

**Task capture:** `qai-001` through `qai-011` created in central tasks.json as pending with `review_status=needs_collaborative_review`. These are planning/intake cards; they are not approved engineering deliverables, and the currently deployed dashboard does not yet have a dedicated Review Intake column or functional backend mutation controls.

**Implementation:** NOT STARTED. **Production change:** NONE. **Verification:** GitHub commit success for project registry, task registry, and design specification; no live SaaS execution or multi-attendee review tested. **Next:** Build actual DB/API/RBAC and visual review workflow, then validate end-to-end.

**Governance:** user approval is required before a card is considered an executable commitment. Preserve speaker attribution and co-author participation without assuming all participants are interchangeable project owners or have cross-tenant data access.


## 2026-10-10 — Mobile-first architecture correction

**User requirement:** Start from intended cross-device user experience, not previously proposed plugins. Treat a 60:40 mobile/desktop mix as a design emphasis rather than measured usage. Native app must be highly functional with same context, tasks, reviews, recordings, communication and approvals on phone and desktop; web extensions are optional.

**Design correction:** Removed extension-first assumption. Native iOS/Android Q Mobile and desktop web are primary client surfaces on one SaaS backend. Add Share to Q for screenshots/URLs/voice notes; constrained cross-app recording by platform permission rules; deep links; realtime/offline sync; server-side job continuity; platform-by-platform release acceptance.

**Registry impact:** Added `qai-012` mobile app, `qai-013` cross-device sync, `qai-014` mobile capture, `qai-015` device parity testing. Re-scoped `qai-004` as optional desktop browser extension. All remain pending, unimplemented, and subject to collaborative review.

**Evidence:** [Mobile-first amendment](../project-control-center/docs/qai-operating-system-architecture.md#j-mobile-first-device-agnostic-architecture-2026-10-10-amendment).

**Verification:** GitHub specification and task registry update succeeded. **No deployed mobile/web app or real device tests have been performed.**


## 2026-10-10 — QAI ownership and human-outcome platform doctrine

**Decision input (proposal, not approved release):** Q must be a truly owned first-party platform, not a bundle of Wispr Flow or other SaaS integrations. Core mission is freeing human time for meaningful family, community, employee and client experiences. Q Voice takes dictation, diarized meetings, actions and speech directly into Q Mobile/Q Desktop; Q Live multilingual educational broadcasting and consented avatar likeness are R&D areas. Q Experiences patterns should adapt across all industries via reusable mechanic primitives + industry taxonomy, not a hand-maintained fixed set of sector cases.

**Specification:** [Owned Q product charter / Q Voice / Q Live / universal industry experience architecture](../project-control-center/docs/qai-product-mission-owned-platform-and-industry-architecture.md).

**Registry changes:** New pending cards `qai-016`–`qai-024`; updated `qai-005` and `qai-007` to reflect native-owned implementations and sector-wide adaptability.

**Technical caveats:** self-hostable/open-source infrastructure does not mean the company owns licensed weights/source; check licenses (e.g., Meta Seamless commercial NC restrictions). Real-time all-language audiovisual translated likeness remains R&D; user consent/clear disclosure, latency/quality evidence, HIPAA/reviews rules and separate clinical/legal approval required.

**Implementation status:** Requirements committed to GitHub only; NO software code/runtime functionality newly deployed/tested; no production integration implied. Next action: collaborative scoping/acceptance followed by vertical-slice development of native Q Voice + authenticated collaborative Kanban and real mobile/desktop persistence.
