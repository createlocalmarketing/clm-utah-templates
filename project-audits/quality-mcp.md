# Quality MCP — Project Audit / Coordination Ledger

## Control-plane boundary

The **account-wide Project Control Center** is the canonical system for project/chat task accountability across all projects.

Quality MCP must **not** build a competing duplicate of that cross-project task manager.

Quality MCP retains its separate product-specific **Fleet Console**, whose scope is:
- every installed WordPress site
- plugin/version inventory
- enrollment
- simultaneous or staged updates
- post-update verification
- health/error reporting
- retries
- rollout status
- site-specific troubleshooting

The two systems are linked conceptually:
- Project Control Center = work/project accountability
- Quality MCP Fleet Console = operational WordPress/site management

## 2026-10-07 — Duplicate dashboard request reconciled
**Status:** SUPERSEDED / RESOLVED

A similar request was made in the Quality MCP chat for a GitHub-backed chronological audit/checklist system.

That cross-project accountability request is now fulfilled centrally by:
- `/project-control-center/`
- `/project-audits/`

Do not implement a second independent project/task-control dashboard inside Quality MCP.

Continue implementing the Quality MCP Fleet Console independently as part of the Quality MCP product roadmap.

## Current known Quality MCP priorities

- Full audit of Quality MCP history for missed requests.
- Maintain Quality MCP's project checklist in the central Project Control Center.
- Complete fleet dashboard for installed sites, versions, updates, verification, errors, retries and rollout state.
- Ensure PetFM auto-enrollment/visibility.
- Keep sidebar/dashboard navigation and Builder selection/page preview workflows functioning on AdamGriffee.com and PetFM.ai.


## Quality SERP Optimizer / Elementor Pro integration — 2026-11-06

- **CLM SERP backend — SOURCE IMPLEMENTED / CI PASS:** all 4,053 categories mapped through a 45-feature research matrix in `createlocalmarketing/clm-platform/quality-data/serp-panels/`. New `mcp-server/abilities/serp_optimizer.py` and updated `get-page-template-spec` provide site-role-aware category research and native Elementor execution requirements, **not generated pages**.
- **ChatGPT Quality SERP Optimizer v0.3.0 — UPDATED:** private plugin carries the current cross-project audit and Elementor design/QA boundary, published by Create Local Marketing. This does **not** activate Q Builder on enrolled WordPress sites.
- **Quality MCP v0.9.18 — STAGED, NOT RELEASED:** staged source in `createlocalmarketing/clm-platform/quality-mcp/staged/0.9.18/` includes authenticated read-only `/builder/serp-audit`, admin category preflight, and PHP/JS syntax CI. Installed CLM plugin was v0.9.17 at inspection. No fleet rollout.
- **Native Elementor auto-page generation incorporating those SERP requirements — NOT COMPLETE:** still needs backend-to-Q Builder action wiring, actual native Elementor output with approved design profile and media, persistent per-page acceptance ledger, real staging tests, @marketing-audit, owner approval, and controlled rollout.
- **Control-plane boundary:** keep persistent cross-project tasks in Project Control Center / Quality CRM. Q MCP owns plugin/site execution and fleet telemetry, not a competing Kanban.
