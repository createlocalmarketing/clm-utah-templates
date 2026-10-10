# QAI / Quality CRM — Meeting-to-Execution and Universal Intelligence Architecture

**Status:** Requirements captured; design approved? NO. Engineering implementation? NOT STARTED.
**Updated:** 2026-10-10
**Primary project:** `saas-quality-crm (active)`
**Control plane:** Project Control Center / Quality CRM
**Execution adapters:** Quality MCP, GitHub development pipeline, communications/calendar/phone/email adapters
**Scope:** Native first-party QAI platform with optional input connectors.

## Principles

1. QAI is the identity-, context-, and permission-aware intelligence/orchestration layer.
2. Quality CRM/Project Control Center is the system of record for tasks, people, organizations, projects, reviews, communications, approvals, and audit events.
3. Quality MCP is the authorized WordPress/Elementor execution plane—not the task-management database.
4. GitHub holds source, specifications, tests, revisions, pull requests, and audit references; it is not a durable application database or backend runtime.
5. Do not represent static HTML, mocked persistence, or one-way clicks as a functional application.
6. QAI must preserve source evidence, dissenting opinions, historical revisions, data isolation, and approvals.
7. Native browser extension + native Visual Builder are the primary product; Wispr Flow and external recorders are optional ingestion sources, not mandatory paid dependencies.

## Canonical flow

Captured meeting / browser interaction / email / call / chat -> identity + context detection -> diarized transcript and synchronized visual evidence -> atomic action and idea extraction -> task deduplication + classification + ownership proposal -> business/project/entity/component tag verification -> Collaborative Review Intake Board -> joint-owner review and approval gates -> priority-aware execution job -> OpenAI API agents, Quality MCP or authorized business actions -> tests/staging/proof -> human approval -> deploy/publish under authorization -> project knowledge and global capability-graph updates -> new downstream tasks where warranted.

**Important ChatGPT limitation:** a custom backend can invoke OpenAI's API agents from event triggers; this does not assume an API that creates native ChatGPT Project sidebar conversations or automatically edits their instructions. Native ChatGPT project chat remains a collaboration surface; QAI project context is maintained in the canonical database with selective sync to authorized sources.

## A. Meeting-origin collaborative ownership

- Create **one atomic card per distinct actionable item**, with pointers back to the parent meeting/idea and original recording/transcript evidence.
- The speaker proposing or taking responsibility for an action is *proposed* as primary owner; if unclear, route to identification review rather than assigning based on voice duration or assertiveness.
- Every meeting attendee gets participation attribution. Relevant attendees become proposed **co-authors / joint managers** by policy; their precise rights depend on organization permissions, and not all attendees need blanket access to private cross-tenant tasks.
- Proposed card fields: `task_id`, `business_id`, `workspace_id`, `project_id`, `source_meeting_id`, `source_segments[]`, `originator_user_id`, `owner_user_id`, `co_manager_user_ids[]`, `attendee_user_ids[]`, `reviewer_user_ids[]`, `decision_status`, `intake_status`, `stage`, `priority`, `impact`, `dependencies[]`, `acceptance_criteria[]`, `evidence[]`, `agent_job_ids[]`, `audit_events[]`.
- Co-managers see card, discuss, adjust scope/tags/ownership, and agree on an executable decision. Distinguish *comment*, *accept proposed owner*, *approve requirement*, *approve execution*, *approve production publication*. Authorized quorum is configurable; dissent and unavailable reviewers must not be silently treated as consent.
- Existing Kanban states remain: Pending, In Process, Completed/Awaiting Approval, Approved/Closed. **New Review Intake** is an upstream queue/view, not a replacement for the established stages. Approval to execute is not equivalent to completion signoff.
- Priorities `P0` emergency, `P1` high, `P2` normal, `P3` backlog; scheduler enforces dependency ordering, rate limits, business hours where needed, approved budgets, and the execution permission scope.

## B. Tag verification engine

Suggested tags have evidence and confidence scores at these layers: person/speaker -> organization/business -> workspace -> project -> site/URL -> page -> element/component -> task category -> reusable capability -> access classification.
Before task release run: deterministic domain/entity mapping; project registry checks; source-based content classifiers; duplicate/recent-task search; contradictory requirement detection; ACL checks; two-stage human confirmation for ambiguous context or low confidence. UI shows Why this tag?, source timestamp and URL, alternative destinations, and a Move/Confirm control. Record every re-tag and keep original lineage.
Never route private family tasks, personal email, clinical/patient records, or one client's sensitive information to unrelated company-wide context.

## C. Q Capture browser extension + native Visual Builder

Build one browser extension with a shared WebExtensions codebase, initially Chromium browsers, then Firefox and Safari packaging/QA; use active-tab/on-demand grants instead of broad always-on permissions when possible.
Capture on explicit user action: current URL, title, viewport, DOM node path/stable selector, accessible label, component IDs (Elementor where available), bounding box, click/hover/scroll events, screenshot marker, timestamp, optional tab/system audio/video capture with consent.
Allow a Vimeo-style pinned video timeline note: at timestamp T capture cursor and nearest highlighted node and attach editable natural-language feedback; show synchronized playback, transcript, participants, and captured DOM targets. Include Comment / Change Request / Bug / Idea / Universal Capability options.
Native WordPress/Elementor integration can resolve exact component/widget IDs for sites managed by Quality MCP. Other sites fall back to DOM selectors, contextual screenshots, manual retargeting, and user permissions. Beware dynamic DOM changes, cross-origin frames, SPA navigation, canvas, shadow DOM, responsive states, and password forms: never promise perfect auto-targeting.
First-party capture must avoid keystroke logging, passwords, hidden sensitive input capture, and covert cross-origin recording.

## D. Universal capability / Opportunity Intelligence

Two distinct objects:
- **Capability pattern:** portable definition of an idea across business verticals (e.g. geolocation quests, loyalty/game loop, limited-time deal campaign, email identity selection, local discovery).
- **Deployment instance:** a specific business/site adaptation with design, pricing, compliance, data sources, KPIs, lifecycle, and version.
A pattern can have vertical-specific adapters: real estate neighborhood tours/education (not purchase-contingent inducements without review), city discovery/local merchant quests, restaurant digital stamps and off-peak rewards, med-spa treatment education/loyalty subject to clinical/privacy/promotional restrictions, family/private recreation without cross-account sharing.
Opportunity Intelligence suggests adjacent applications proactively, tags estimated value/cost/risk, cites research when using external claims, and places *proposals* on review boards. Suggestions do not become committed work or production functionality without approval.

## E. Multi-context QAI identity

An individual may access personal workspace and multiple organizations via explicit membership and tenant-scoped RBAC/ABAC. Routing context may change per sentence/action but must maintain audit trace, identity confidence, role/permissions, and a visible active-organization indicator.
Do not commingle personal/family and work content, or regulated healthcare information with public marketing content. Reuse templates/capability patterns rather than leaking records. Context changes that would expand access or send externally require review.

## F. Calendar, SMS, Quality Call Analytics

Sample: a meeting proposes an MLS status-check call -> create task with owner Adam, requested date/time/zone, contact number/source, callback context, chosen business caller identity, co-reviewers -> reviewer confirms contact/scheduling -> task generates calendar event and opted-in SMS reminder with deep link to Q task and 'Call with Q' -> user initiates call using authorized Q business line.
Log call session ID, caller/callee, business line, start/end, ring/answer/hold/transfer/record states, call duration, who terminated if supported, recording status, transcription status, source task, provider event IDs. Distinguish observable call termination metadata from inferred sentiment/disposition and store `unknown` when the provider lacks evidence.
At completion transcribe when allowed, summarize disposition, set `completed` only if outcome proves the task's acceptance criteria; otherwise `follow_up_required`, assign next action and due date. Hold counts and hold times require actual telephony bridge event instrumentation, not inferred from provider API alone.
Require recording/communication consent, appropriate SMS registration/opt-in, webhook signature verification, least-privilege retention, phone number security, and idempotent provider webhook ingestion.

## G. Unified email identities, inboxes, aliases

Normalize `organization`, `mail_account`, `send_as_identity`, `alias`, `signature_template`, `mailbox_view`, `conversation`, `policy`.
Separate physical mailboxes from Google Workspace aliases: an alias may send through a parent mailbox and not have its own inbox. Support business-scoped signature, From, Reply-To, display name, tracking/CRM linkage, and search across authorized inboxes. Personal accounts remain separate by default.
Never send from an address unless verified provider permissions/configuration support it. Drafts and explicit send-authorization required for customer-facing communications until a narrow approved automations policy exists. Preserve raw IDs/headers for reply threading.

## H. Production runtime / CI-CD

Existing Project Control Center is a GitHub Pages static JSON frontend. It cannot perform secure multi-tenant persisted CRUD, websocket events, protected phone/email operations, background queues, or live OpenAI API calls using private credentials.
Keep GitHub for source and CI/CD, not as an application database. Build a real Q CRM UI served by a deployed app (e.g. existing Sevalla infrastructure or equivalent) + transactional PostgreSQL/managed auth/RLS + object storage for video/evidence + queue/workers + webhook receiver + API. Existing Sevalla CLM worker/MCP platform may be reused where verified, but do not couple all SaaS tenants to the real-estate data worker.
Use dev/staging/prod isolated environments with seeded synthetic test data, verified authenticated end-to-end scenarios, security reviews, CI checks, evidence, explicit production deploy and rollback. GitHub Pages remains an interim read-only/demo dashboard until real app is deployed.
Each phase demands working backend persistence before proceeding, not only visual clickthrough acceptance.

## I. First implementation milestones

1. Register `saas-quality-crm` and attach this design to the existing Project Control Center without duplicating its task database.
2. Implement real tenant-aware database/auth/task APIs and live Kanban persistence (include review intake, co-owners, comment threads, audit and approval).
3. Ship Q Capture browser extension (capture precise DOM/URL/cursor/timestamp evidence on user action) and native Visual Builder integration.
4. Synchronize transcript/audio/video timeline to visual evidence, diarized speaker attribution and meeting task extraction.
5. Create tag verification UI with source evidence and configurable multi-reviewer decision policy.
6. Add OpenAI API agent execution worker/queue with scoped authorizations, cost/priority controls, test environments and callbacks.
7. Add universal capability registry/opportunity recommendations.
8. Add calendar/SMS/Quality Call Analytics with provider event-level verification.
9. Add email multi-mailbox/alias/sender-signature integrations.
10. Validate full end-to-end task: speech -> correct task and co-managers -> tags verified -> approved -> agent executes -> test -> staged evidence -> reviewer closes -> GitHub trace.

## Definition of done

NOT done when a mock card appears.
Done only when authenticated users can create and review an actual persisted task, with safe permissions and co-manager approvals; evidence is stored and retrievable; routing is verified; an approved task launches an observable job; actual files/site state are changed in a disposable test environment; tests and failures are recorded; production deployment is separately authorized; audit history is preserved.
