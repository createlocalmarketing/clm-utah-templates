# PROPERTY Zen — nonnegotiable implementation rules

## RULE #1 — CODE THE ACTUAL LIVE CRM. NEVER GENERATE DASHBOARD IMAGES.
When the user requests a dashboard, sidebar, logo placement, layout, marketing module, client experience, or other UI change, **edit the actual HTML/CSS/JavaScript application in this GitHub directory and deploy the changed code.** Do **not** call image generation to create a screenshot, concept, substitute dashboard, or proof of completion. The approved reference screenshot is a **visual acceptance specification**, not inspiration for new artwork. Internal browser captures for QA are acceptable, but do not deliver generated dashboard images.

**A commit is not proof of a correct design.** Verify the live site when possible; test behavior and responsive layout, compare the browser rendering with the approved reference, state what was verified and what remains unverified. Do not claim pixel-perfect or finished without the comparison.

## Design-lock specifics
- Official brand: **PROPERTY Zen**, never “Properties Zen”. Use the approved transparent logo asset already in this folder; never redraw the logo.
- Sidebar outer surface and brand/footer: `#3a444d` (solid).
- Navigation panel overlay: `#262d33` (solid).
- Navigation copy: accessible white text; icons: the supplied gold-gradient WebP colors; selected nav ribbon: that same gold-gradient treatment.
- Preserve the approved dashboard hierarchy and proportions: topbar, PROPERTY Zen title, hold-up banner, hero property/transaction area, 3-column team/documents/marketing row, transactions and activity lower row.
- Use real photographs only when sourced and authorized. Adam's headshot and property listing photos must not be generatively replaced.
- MLS facts must remain separated from clearly labeled illustrative workflows. Don't invent real customer closings or title relationships.
- Maintain real interactive navigation and mobile/client views. Don't break the code in pursuit of a screenshot.

## Working procedure
1. Locate the existing files and official user-supplied assets.
2. Edit application source directly, keeping CSS changes consolidated when feasible.
3. Perform syntax, route, accessibility, and viewport visual checks.
4. Commit and refresh asset references. Verify GitHub Pages where possible.
5. Report the code changes, commit, and live URL. Clearly state verification limits.

**Rule #1 takes priority over illustrative/design-generation shortcuts for this project.**
