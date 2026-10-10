# SaaS Quality CRM / QAI — Permanent Audit Ledger

## 2026-10-10 — First-party meeting intelligence and QAI orchestration requirements captured

**Source:** Current user discussion about multi-speaker meeting capture, visual website review, native browser extension, joint Kanban ownership, tag verification, universal capabilities, call analytics, SMS, calendar, email identities, and functioning CI/CD.

**Architecture:** [QAI Operating System Architecture](../project-control-center/docs/qai-operating-system-architecture.md)

**Project registration:** `saas-quality-crm` created in Project Control Center projects.json under plugin development.

**Task capture:** `qai-001` through `qai-011` created in central tasks.json as pending with `review_status=needs_collaborative_review`. These are planning/intake cards; they are not approved engineering deliverables, and the currently deployed dashboard does not yet have a dedicated Review Intake column or functional backend mutation controls.

**Implementation:** NOT STARTED. **Production change:** NONE. **Verification:** GitHub commit success for project registry, task registry, and design specification; no live SaaS execution or multi-attendee review tested. **Next:** Build actual DB/API/RBAC and visual review workflow, then validate end-to-end.

**Governance:** user approval is required before a card is considered an executable commitment. Preserve speaker attribution and co-author participation without assuming all participants are interchangeable project owners or have cross-tenant data access.
