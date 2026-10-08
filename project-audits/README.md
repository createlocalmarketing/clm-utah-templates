# Project Audit Logs

This directory is the permanent accountability ledger for project work performed with ChatGPT.

## Required protocol

For every substantial project task:

1. Record the task before or when work begins.
2. Record the project/chat lineage and affected site/repository.
3. Record the exact page/template/file/component IDs touched when available.
4. Record the requirement/source that caused the work.
5. Record what was changed.
6. Record validation performed.
7. Mark the result as PASS, PARTIAL, FAIL, REGRESSED, BLOCKED, or SUPERSEDED.
8. Record any regression discovered.
9. Record the exact next action.
10. Preserve history chronologically. Do not delete failed attempts; supersede them with later entries.

The Git commit history is part of the audit trail. The Markdown ledger is the human-readable project history.

## Account-wide bootstrap requirement

This protocol applies across ChatGPT projects, not only the current repository.

On the first substantive message of a new project/chat, when the GitHub connection is available, ChatGPT should:

1. register/update the project in the central Project Control Center;
2. create its project audit ledger if one does not exist;
3. create its initial task records;
4. return the Project Control Center link near the beginning of the first response;
5. maintain task ownership, waiting-on dependencies, status, verification, and history as work proceeds.

The central Project Control Center is the canonical cross-project accountability layer. Product-specific dashboards remain separate and link to it rather than duplicating it.

### Quality MCP boundary

- **Project Control Center:** cross-project/chats/tasks/accountability.
- **Quality MCP Fleet Console:** installed WordPress sites, versions, deployments, health checks, retries, errors, and rollout operations.

A duplicate cross-project task dashboard requested in the Quality MCP chat is superseded by the central Project Control Center.

## Active project ledgers

- [Realtor Website Template / AdamGriffee.com](./realtor-website-template.md)
- [Quality MCP](./quality-mcp.md)
