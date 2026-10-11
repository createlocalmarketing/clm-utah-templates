# QAI Mobile Simulator — Visual Defects and Fix 2026-10-11

**Status:** Targeted source patch prepared. Selector/semantic/contrast checks passed; live browser visual signoff NOT complete.

## Reported / observed

| ID | Screen | Original defect | Treatment | Acceptance |
| --- | --- | --- | --- | --- |
| MOB-CONTRAST-001 | Switch business | Charcoal cards with dark charcoal text; business names nearly invisible | White/high-contrast workspace cards, wrapping names, gold selected state | Awaiting live screenshot check |
| MOB-CONTRAST-002 | Business applications | Dark cards with nearly invisible dark labels | Light neutral tiles, readable icons/labels and hover/focus treatment | Awaiting live screenshot check |
| MOB-FILTER-003 | All Tasks | Very dark pill labels and partially clipped tabs; no useful focus cue | Light chip styles, strong selected state, horizontal swipe/snap, focus styles | Awaiting live screenshot check |
| MOB-QAI-004 | Ask QAI | Dark-on-dark recommendation prompts, illegible placeholder/input | White action rows, trailing arrow, readable input/placeholder, clear gold send CTA | Awaiting live screenshot check |

## Implementation

- Additional stylesheet `qai-platform/mobile-fixes.css` scoped to `body[data-surface="mobile"]`.
- `qai-platform/mobile.html` explicitly imports the new stylesheet after base/refinement CSS.
- Existing interaction identifiers and click handlers remain unchanged; no fake integrations were added.
- The business switcher still uses the established workspace selector, and assistant suggestions still invoke `data-action="ask"`.

## Verification required before closing

- [x] Source contains all four target controls and selectors; script remains unchanged.
- [x] CSS is scoped to mobile and loaded after existing CSS.
- [x] Color contrast ratios for the four principal text/background pairs computed over 4.5:1.
- [ ] Live browser screenshots of Switch business, All Tasks, and Ask QAI taken **after deployment**.
- [ ] Text readability verified visually at simulated 393px screen and smaller iPhone SE preset.
- [ ] Swipe filters and active-state result counts verified in deployed runtime.
- [ ] Business selection loads correct context and names remain visible.
- [ ] VoiceOver/keyboard focus and tab order accepted.
- [ ] User/stakeholder approval.

Do not count these tests as a broad certification of the platform; individual module/action/backend verification remains separately required.