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
