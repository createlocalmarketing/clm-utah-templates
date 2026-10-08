# Adam Real Estate CRM — Mockup Requirements (2026-10-08)

Source: nine user-supplied historical TIME Real Estate & Development mockups. These are **workflow references only**, NOT visual design standards. This specification supplements the three-workspace birthday demo at `project-control-center/real-estate-demo/index.html`.

## 1. Navigation and business tools
- Global: Dashboard, Tools, Email, Contacts, Calendar, Leads, Website, Social, SEO.
- Real estate operations: Business Plan, Listings, Transactions, Office, Forms, Reports, Accounting, Store.
- Adapt as contextual navigation under Quality OS / real estate workspaces; avoid duplicated or overloaded nav.
- Preserve independent Adam Griffee Realtor, eXp Luxury, Property Zen contexts.

## 2. Unified contact 360 record
- Persistent contact overview and integrated tabs: Detail, Social Feed, Notes, Events, Tasks, Transaction, Attachments, Contact Log.
- Communication shortcuts: phone, SMS, email; groups such as friends/coworkers.
- Contact editing sections: General, Personal, Business, Social Media; later Transaction Portal and Notes/Log.
- Basic contact fields: first/last, multiple phones/emails, addresses, city/state/ZIP, referral source, transaction, assigned-to, photo.
- Extendable custom fields, groups, DNC and email opt-out; no implicit consent to messaging.
- Contact detail quick actions: schedule meeting, add note, find duplicates.
- Contact actions must link to timeline/audit rather than scatter records across siloed modules.

## 3. Contacts and leads listing
- Search with field selector, alphabetical navigation, filter, sortable columns, paging, multi-select, bulk operations.
- Contacts: sync selected, edit, add to transaction, email, SMS, group, find duplicates, invoice, upload document, quotes, add task, event, schedule call or meeting.
- Leads: claim, assign, edit, add to transaction, email, SMS, tasks/events, schedule call/meeting, note, deduplicate.
- Track source, lead status, last action/contact, ownership and business scope separately.

## 4. Calendar/work planning
- Left-side daily tasks, events, projects and deadlines; daily/weekly/monthly calendar; daily notes center.
- Add new event, call, task and note from same view.
- Target design: unified calendar connected to task, lead, contact and transaction deadlines. External provider sync is not part of demo.

## 5. Contact migration
- Historical import ideas: Facebook, Gmail, Yahoo, LinkedIn, CSV, Hotmail, Outlook, MSN, VCF.
- Historical export ideas: Outlook, Outlook Express, VCF, CSV.
- Modern implementation must use supported OAuth/provider APIs or user-uploaded CSV/VCF; never ask for provider passwords.
- Preview mapping, normalize phone/email, match duplicates, review merges with provenance and privacy checks.
- Do not promise direct import from deprecated providers without feasible integrations.

## 6. Transaction-centric accountability
- Cross-link buyer, seller, agents, title, lender, broker, insurer, inspectors and other participants on each transaction.
- Each milestone specifies action owner, waiting-on, required document, deadline, state, permissions, handoff condition and notification history.
- Consumer app: timeline, responsibility summary, upload/camera/email document intake, signatures via authorized provider, notifications and clear next action.
- The birthday demo currently simulates these features only. Real transactional records must be scoped by tenant permissions.

## Acceptance gates
- [x] Historical mockups reviewed and requirements extracted.
- [x] Three-workspace transaction/accountability frontend committed on main.
- [ ] Browser-accessible public demo URL verified; reported GitHub Pages 404 unresolved.
- [ ] Contact 360 tabbed interface with timeline.
- [ ] Search, multi-select and quick-action contact/lead table.
- [ ] Calendar, daily task panel and notes center.
- [ ] Contact import/dedup review experience.
- [ ] Backend identity, membership and tenant isolation.
- [ ] Secure notification, signature and document integrations.
- [ ] User acceptance, visual QA and production deployment.

Do not mark demo complete based only on a merged code file; verify the deployed URL and the browser interactions.
