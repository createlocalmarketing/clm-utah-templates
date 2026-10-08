# Project Control Center

Account-wide project/task control plane for ChatGPT work.

## Scope boundary

This dashboard tracks **projects, chats, tasks, owners, dependencies, audit history, and completion status** across all projects.

It does **not** replace product-specific operational dashboards.

Example:
- **Project Control Center** tracks the `quality-mcp` project itself: roadmap, tasks, ownership, blockers, audit history.
- **Quality MCP Fleet Console** tracks installed WordPress sites, plugin versions, deployments, health checks, retries, errors, and rollout status.

These systems must link to each other but never be conflated.

## First-chat bootstrap protocol

On the first substantive message in a new project/chat, when GitHub access is available:

1. Identify the chat/project name and parent group.
2. Create or update its record in `data/projects.json`.
3. Create its audit ledger under `../project-audits/`.
4. Add initial tasks to `data/tasks.json`.
5. Return the Project Control Center project link near the beginning of the response.
6. Continue maintaining the project record/task state as work proceeds.

ChatGPT cannot act before the first user message exists, so bootstrap occurs on that first substantive turn.

## Task views

The UI supports:
- Open
- Completed
- All
- By owner
- Waiting on person
- Blocked / regressed
- Per-project detail

Task owners are arbitrary strings so the same system can support Adam, another team member, the account owner, ChatGPT, contractors, or future staff.

## History rule

Do not erase failed attempts, regressions, or superseded decisions. Record the newer result and preserve chronology.


## Approval-gated Kanban workflow

The Project Control Center uses four stages:

1. **Pending** — queued / not started.
2. **In Process** — actively being worked.
3. **Completed · Awaiting Approval** — ChatGPT reports the task finished, but it is **not final**.
4. **Approved · Closed** — only after the user explicitly approves the work.

If the user rejects or corrects work in the approval column, the task returns to **In Process** with the correction preserved in its history.

The left sidebar mirrors known ChatGPT project-folder and chat-thread structure. There is no direct ChatGPT sidebar enumeration API available from a normal project chat, so historical projects are backfilled from recoverable account/project history and every future project/chat is registered on its first substantive message.
