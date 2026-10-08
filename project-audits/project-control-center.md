# Project Control Center — Audit Ledger

## Purpose

Account-wide GitHub-backed mirror of ChatGPT project work: folders/chats on the left, approval-gated Kanban task boards on the right, permanent task ownership/dependency/history.

## 2026-10-08 — Dashboard failure diagnosed and rebuilt

**Root cause:** the first dashboard implementation called `route()` from `boot()` and the hashchange listener, but never defined a `route()` function. The sidebar rendered before the exception, which is why the screenshot showed project names on the left but a blank project/task area on the right.

**Corrective implementation:**
- Added working hash routing.
- Replaced the flat task list with a four-column Kanban:
  - Pending
  - In Process
  - Completed · Awaiting Approval
  - Approved · Closed
- Changed governance so assistant-completed tasks are never final until explicit user approval.
- Added owner and waiting-on filters.
- Added per-project current phase, last action, next action and audit/site links.
- Imported known ChatGPT folder/chat hierarchy from recoverable account/project history.
- Moved Quality MCP into the known `0-PLUGIN-DEVELOPMENT` group instead of `0-WEBSITES`.
- Added permanent future-chat bootstrap rule.

**Limitation:** A normal chat does not expose a direct API that enumerates the user's entire ChatGPT sidebar. The dashboard therefore mirrors all recovered known folders/chats and automatically grows as chats/projects are encountered or explicitly bootstrapped.

**Approval state:** Awaiting user review.
