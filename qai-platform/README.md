# QAI — Quality AI Operating System · Interactive Concept v0.1

A working browser-based **product experience concept** for the Quality AI / Quality CRM ecosystem, with two distinct user interfaces:

- **Desktop command center:** `index.html`
- **Native-style iPhone app simulator:** `mobile.html` (fixed iPhone device shell with independent mobile navigation and screens; not a responsive desktop shrink)

## Published routes

When deployed inside the existing `clm-utah-templates` GitHub Pages site, the target paths are:

- Desktop: `https://createlocalmarketing.github.io/clm-utah-templates/qai-platform/`
- iPhone simulator: `https://createlocalmarketing.github.io/clm-utah-templates/qai-platform/mobile.html`

The URL query can also deep-link to specific views, e.g. `?w=quality&m=board` (use `w=global` or a workspace ID from data.js) and `?w=adam&m=builder`.

## Product map

17 workspaces × 37 modules = **629 navigable workspace/module routes**, plus seeded entity detail screens and interactive flows. Module groups: Workspace, Work Management, Relationships, Communications, Web & Growth, Intelligence, and Platform.

Module examples: executive overview, QAI assistant, meetings, calendar, collaborative five-column review Kanban, tasks, projects, automations, contacts, leads, transactions, unified inbox, email identities, SMS, Q Phone, Call Analytics, websites, Visual Builder, Q Capture, campaigns, offers, events, Q Experiences, analytics, knowledge graph, reusable cross-industry capabilities, opportunity radar, academies, Q MCP fleet, integrations, access controls and settings.

## Working prototype interactions

- Switch among company, product, client and private workspaces.
- Navigate the entire app with contextual deep links and search.
- Create/edit task cards, assign a primary owner and co-managers, verify/change business/project routing, set priority and leave comments.
- Move tasks across Review Intake → Pending → In Process → Awaiting Final Approval → Approved/Closed using controls or desktop drag-and-drop.
- Inspect a simulated real-estate site visually, select component regions, and create a review card with the selected element context.
- View a sample meeting video timeline, propose follow-up tasks, and review attendee attributions.
- Create review proposals from universal capability patterns, differentiated by industry.
- Add demo events, contacts, leads, campaign drafts, local message drafts and simulated call-log records.
- Toggle demonstration automation flags and reset state.
- Use the separate iPhone simulator with bottom navigation, drawer, task approval, mobile visual notes, QAI mock assistant, dialer and records.

## What is NOT implemented

This is NOT a production backend or a collection of real provider connections. No authenticated users, persistent cross-device database, OpenAI agent/API calls, telephony, SMS delivery, Gmail sending, browser extension DOM capture, microphone recording, live meeting diarization, WordPress publishing, or production deployment pipeline is wired. No task in this demo executes an external workflow. QAI answers are deterministic demo text; charts are illustrative. All demo edits are held in browser `localStorage` only, keyed to this origin. Do not input sensitive customer or personal information.

The foundation is designed to graduate to an authenticated QAI backend, RBAC/ABAC policy, organization-scoped SQL store, object storage for captures, event queue, and Quality MCP adapters. Do not treat any stage transition or successful click in the demo as proof of real external operation.

## Local run & smoke testing

Serve these files with a static file server:

```
cd qai-platform
python -m http.server 8000
```

Open `http://localhost:8000/index.html` and `http://localhost:8000/mobile.html`.

Development acceptance checks run with Node JS syntax checks and Playwright test for desktop and iPhone user flows. The QA harness was run in an isolated browser document because outbound/local navigation is disallowed by this sandbox.

## File map

- `index.html` — desktop entrypoint
- `mobile.html` — fixed-frame iPhone entrypoint
- `data.js` — 17 workspaces, 37 modules, synthetic data and reusable patterns
- `app.js` — reusable state, navigation, routes, UI renderers and actions
- `styles.css` — product UI design system for both distinct experiences

**Design colors:** charcoal `#262d33`, dark panels `#192229`, Quality gold `#c6a66f`.
