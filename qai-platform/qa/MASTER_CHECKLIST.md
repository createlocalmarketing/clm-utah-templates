# QAI Product Acceptance Matrix — Canonical Checklist

**State: OPEN — design and functional acceptance NOT granted.**
**Source:** `qai-platform/data.js`, `app.js` and `styles.css` at audit generation time.

The counts below are route *combinations*, not independently designed and approved pages. Do **not** relabel a generated route as a production-ready screen.

## Acceptance contract

Each desktop and iPhone route has a row in [ROUTE_AUDIT.csv](./ROUTE_AUDIT.csv). Each row separately tracks:

- [ ] Route opens and displays the expected company and module — independently tested
- [ ] Primary action clicked and expected transition/data change observed
- [ ] No runtime JS errors or broken internal navigation
- [ ] Visual screenshot reviewed at a real desktop/iPhone viewport
- [ ] Typography, spacing, contrast, hierarchy, dark/light surfaces pass human review
- [ ] Meaningful brand/industry-relevant visuals and genuine people imagery where applicable; no fabricated identities
- [ ] Font Awesome Free icon visible and semantically correct; offline SVG fallback when necessary
- [ ] Real records or explicitly labeled demo records, verified business routing and source attribution
- [ ] Data persists correctly where promised, across reloads/devices where promised (local-only demo cannot pass server sync)
- [ ] Correct role scope, business tenancy and information privacy
- [ ] User acceptance of final live/staging behavior and screenshots

**Two-pass rule:** automated functional checks are pass one, independent visual and owner signoff are pass two. Neither substitutes for the other. Passing navigation is not proof of a functional service integration.

**Severity:** P0 unusable/broken/deceptive, P1 serious visual/action issue, P2 quality/coverage, P3 polish.

## Scope and honesty

- **17** workspaces / context profiles.
- **37** modules.
- **629** contextual routes per surface; **1258** desktop+iPhone route rows.
- **34** distinct action identifiers detected in the source (not yet proven functional).
- **9** distinct form identifiers detected in the source (not yet proven persistent).

## Individual seeded record/detail coverage

See [DETAIL_FLOW_AUDIT.csv](./DETAIL_FLOW_AUDIT.csv) for **2,752** record-route cases across desktop and iPhone, with record-specific title correctness, click-through, visual QA, actual data, permissions, and final acceptance columns. [DETAIL_TEST_REPORT.json](./DETAIL_TEST_REPORT.json) records the browser results.

During the first pass, **68 desktop calendar record links failed** with "Record not found". The calendar source routing was corrected and all 2,752 record links now open with matching record titles in the local Chromium smoke test. **All remain UNAPPROVED for design and real integration.**

These cases are distinct from the 1,258 general workspace/module route combinations. Totals: **4,010 modeled route cases**, *not 4,010 bespoke finished pages*. Additional creation/edit/confirmation/error workflows remain separately enumerated as action and form tests.

## Release-blocking findings from 2026-10-10 feedback

- [ ] **P0 — Screen Explorer:** prior 17×37 tiny dark chips, dark-on-dark text, broken visual hierarchy. Replace with editorial image-led cards and progressive disclosure; click every workspace and its module sections.
- [ ] **P0 — Logo fidelity:** prior text Q / improvised network glyph did not match the approved master Q. New SVG is a **draft reconstruction only** until compared against actual approved Q SVG asset; obtain exact source and pixel-compare.
- [ ] **P0 — Misleading coverage:** “629 screens” is generated route math, not 629 verified original page designs. Correct claim everywhere.
- [ ] **P0 — Broken/inert actions:** audit every button, control, modal, tab, popup, dropdown, text link and submission. No false “connected” indication.
- [ ] **P0 — Company switching:** person, inbox, leads, projects, CRM calls, websites, messaging, industry tools, identity/sig all must load *authorized* company-specific data.
- [ ] **P0 — Visual media:** photos, editorial artwork, staff imagery, branded hero assets, empty states, thumbnails and differentiated industries required; no plain repeated text cards.
- [ ] **P0 — Server truth:** demo `localStorage` is not multiuser persistence; no claim of live backend or cross-device sync.
- [ ] **P1 — Website Builder:** live site linked/viewed authentically, component selection tracked, page edits require confirmation, no invented AdamGriffee layout masquerading as live page.
- [ ] **P1 — Phone/mobile:** genuinely distinct iPhone simulator; device interactions, state changes and native workflows validated separately.
- [ ] **P1 — Review workflow:** voice speaker owner, co-authors/co-managers, tagging verification, review intake, priority-aware automation only after approval.
- [ ] **P1 — Universal intelligence:** cross-industry recommendation proposals, impact/compliance classification and linked cards.
- [ ] **P1 — Communication integration:** identities, aliases, send-as signatures, call disposition, calendar/SMS reminders and contact-specific routing.
- [ ] **P1 — GitHub CI/CD:** functional code, tests, staging, evidence, production gates; not just static clickthrough snapshots.

## Canonical module and surface checklist

### WORKSPACE

- [ ] `today` — **Today**: Your intelligent daily command center. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `qai` — **QAI Assistant**: Your context-aware executive copilot. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `meetings` — **Meetings**: Speaker-attributed sessions and decisions. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `calendar` — **Calendar**: Schedules, events and work commitments. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `notifications` — **Activity**: All alerts, mentions and decisions. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### WORK MANAGEMENT

- [ ] `projects` — **Projects**: Initiatives, ownership and milestones. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `board` — **Review Board**: Multi-party review and approval Kanban. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `tasks` — **All Tasks**: Tasks, priorities, outcomes and next actions. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `automations` — **Automations**: Event-driven workflows and approvals. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `files` — **Files & Evidence**: Assets, recordings and audit trail. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### RELATIONSHIPS

- [ ] `contacts` — **Contacts**: Unified people and relationships. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `companies` — **Companies**: Accounts, merchants and partner organizations. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `leads` — **Leads**: Sources, ownership and follow-up. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `pipeline` — **Deals Pipeline**: Opportunities across workspaces. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `transactions` — **Transactions**: Milestones, steps and handoffs. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### COMMUNICATIONS

- [ ] `inbox` — **Unified Inbox**: Conversation threads across authorized identities. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `identities` — **Email Identities**: Inbox groups, aliases and signatures. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `sms` — **Q Messages**: Business-text conversations and reminders. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `calls` — **Q Phone**: Business-line dialer and call records. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `callanalytics` — **Call Analytics**: Talk time, outcomes and attribution. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### WEB & GROWTH

- [ ] `websites` — **Websites**: Your connected sites and environments. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `builder` — **Visual Builder**: Select a real site element and propose a change. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `capture` — **Q Capture**: Browser-side visual feedback and evidence. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `campaigns` — **Campaigns**: Audience, content and performance. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `deals` — **Offers & Deals**: Limited-time local campaigns. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `events` — **Events**: City, team and community events. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `experiences` — **Q Experiences**: Geo quests, rewards and visitor engagement. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### INTELLIGENCE

- [ ] `analytics` — **Insights**: Live-view concept of business performance. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `knowledge` — **Knowledge Graph**: Institutional context and decisions. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `capabilities` — **Universal Patterns**: Features reusable across every industry. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `research` — **Opportunity Radar**: AI-generated adjacent opportunities. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `education` — **Education**: Courses, resources and content programs. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

### PLATFORM

- [ ] `mcp` — **Q MCP Fleet**: WordPress sites, revisions and safe execution. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `integrations` — **Integrations**: Connected systems and adapters. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `members` — **People & Access**: Tenants, role scopes and collaborators. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `settings` — **Settings**: Workspace preferences and safeguards. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.
- [ ] `explorer` — **Screen Explorer**: Explore every conceptual app screen. Desktop, iPhone, records, forms, tabs, primary/secondary actions and cross-business access to be verified.

## Source action inventory (each action needs at least one clicked positive scenario and one negative/error scenario)

- [ ] `ask` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `calendar-day` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `call-demo` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `close-modal` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `course` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `dial-digit` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `explorer-expand` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `explorer-filter` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `explorer-reset` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `file-demo` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `filter` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `identity-demo` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `mobile-menu` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `mobile-nav` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `mobile-quick` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `modal` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `nav` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `navigate-to` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `open-item` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `open-mobile` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `pattern-open` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `record-toggle` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `search-close` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `search-open` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `search-result` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `select-element` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `sidebar-toggle` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `task-open` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `timeline` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `toast-close` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `toggle-automation` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `toggle-tools` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `toggle-workspaces` — handler, route context, intended state change, visual outcome, persistence and permission handling.
- [ ] `workspace` — handler, route context, intended state change, visual outcome, persistence and permission handling.

## Form inventory

- [ ] `campaign` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `chat` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `comment` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `compose` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `contact` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `event` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `lead` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `signature` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.
- [ ] `task` — full validation, submit, cancel, save, reload, duplicate prevention, affected data, permissions, UI confirmation.

## High-level workflow test suites

- [ ] Workspace selection -> correct authorized modules, inboxes, tasks, websites, calls, communications identities
- [ ] Task from meeting -> speaker owner, co-manager suggestions, review Kanban, verified tag, approval quorum, queued agent job, result QA
- [ ] Website element click -> selected DOM/Elementor component, screenshot/video timestamp, stakeholder note, linked task, preview, approval
- [ ] QAI universal pattern -> choose sector -> tailored variant -> scoped proposal -> review -> linked project task
- [ ] Phone call -> click-to-call from assigned task -> event metadata and recording permission -> disposition -> follow-up completion verification
- [ ] Email -> select real authorized account -> correct From/Reply-To/signature -> draft -> approval -> send; no unverified aliases
- [ ] Calendar -> create meeting/reminder with timezone and opt-in SMS -> deep-link to exact action
- [ ] Mobile -> open matching company -> review approvals and tasks, browser/phone capture, notification and offline recovery
- [ ] Accessibility -> keyboard navigation, 44px tap targets, WCAG contrast, alt text, screenreader labels, reduced motion
- [ ] Browser compatibility -> Chrome, Edge, Safari desktop; iPhone simulator renders consistently
- [ ] Deployment -> clean install, staging data, backend health, migrations, smoke, rollback, signed build IDs

## Do not fake a PASS

- `functional_route`: route actually opened in automated browser.
- `primary_click`: user-like click leads to correct change or navigation.
- `visual_review`: require screenshot inspection, not just screenshot generation.
- `owner_review`: only explicit stakeholder approval closes item.
- A page with controls that lead nowhere must fail even if page renders.
- A generated page without intentional design/sector differentiation is not a finished page.