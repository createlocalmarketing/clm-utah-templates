# SRC-15 — Summit County Stamp / Scene-Art Handoff: Additive Reconciliation

**Source:** `skivacations-handoff.md` (5886 bytes; SHA-256 `68267a0f100b3839532cd525ed6a9d3907a84fd71cb19fa526b58411bb80ed1e`).
**Source status:** Historical *draft* narrative, explicitly not a completed product.
**Primary project:** `vector-stamp-collection`. Shared reuse candidate: `content-engine`; reusable workflow candidate: `saas-quality-crm`.
**Interpretation:** The *filename* indicates ski vacations but the entire handoff describes a Summit County stamp-sheet build. Do **not** re-route this as a ski-vacation website specification.

## Critical precedence decision

The historical draft requested Scandinavian-minimalist geometric silhouette stamps, A4 portrait and merchandising SVGs. A **later user direction** explicitly preferred Rockwell-inspired *people-first scenic depictions*, with Park City, ski resorts, unique city attractions, mountains, events and people as subjects. The user also requested isolated scene art for real estate/site featured cards **without literal stamp borders or text**.

**Current design direction:** scene first → visual review/approval → vectorization only if required → reusable standalone media derivatives. An optional physical commemorative stamp sheet is a separate derivative and requires fresh user approval. Neither the old minimalist art nor its numeric denominations should be treated as the live master design.

## Source-described artwork subjects (historical, not full coverage)

| Historical art ID | Location label | Historical subject | Notes |
|---|---|---|---|
| `stamp-gondola` | Park City | Gondola, cable, pylons, peaks | Potential scene family; verify resort specifics |
| `stamp-skier` | Deer Valley | Skier among pines | Resort scene; not a municipality |
| `stamp-skijump` | Kimball Jct. | Olympic Park jump towers | Human/Olympic heritage strong scene candidate |
| `stamp-mainstreet` | Park City | Historic Main Street storefronts | People, heritage, shopfronts |
| `stamp-courthouse` | Coalville | Summit County Courthouse | County seat history |
| `stamp-kamas` | Kamas | Valley, barn, fence | Valley/ranch history; original fence unreadable |
| `stamp-rodeo` | Oakley | Bucking bronco and rider | Rodeo and culture |
| `stamp-food` | Wasatch Back | Trout and huckleberries on plate | Regional lifestyle subject; verify authentic relevance |

The eight subjects are **an initial historical set, not the full city/resort coverage required by the later user**. Do not assume the set exhausts Summit County or Wasatch Back.

## What the source says was previously produced

- Files reportedly at `/home/user/magica/summit_stamps/`: `common.py` (SVG helpers/palette), `stamps.py` (8 designs), `build.py` (layout/write), `outputs/*.svg` (9 items), `outputs/*.png` previews.
- A4 reference artboard reported as **794×1123**; historical palette of cream/slate/forest/rust/charcoal/gold/ivory.
- All 9 SVGs reportedly generated; **the user's handoff itself says not final** and lists severe defects.
- Reported draft reference `https://g.tlcdn.com/gen/a0fe4a1a777043c5b289e68aa27ac1b1.png` is an old *preview*, not present-day approval. The original code/files were not attached and have not been independently tested in this intake.

## Defects expressly reported by source

1. Off-page elements: stamp #3 (x=560 plus width 260) and #5 (x=610 plus width 220) exceed reported 794px sheet width.
2. Stamp #4 and #6 rectangles overlap. Layout leaves void and irregular margins.
3. Short stamps lose title/footer; `Kimball Junction` label was clipped/missing.
4. Fake perforations used ivory circles instead of real cut/compound outline paths; possible stray perforation artifacts.
5. Micro text 4.3–4.6pt at 50–75% opacity; poor print legibility.
6. Kamas fence dark on dark; weak contrast.
7. Georgia/Futura font fallback references may substitute at vendors; require text-to-outline production copies while retaining editable text master.
8. Skier and rodeo artwork silhouettes need human artistic refinement.
9. Numeric 10–45/SC denominations lacked unit and were not verified authentic; stamp merchandising must not imply legal postage.
10. Original SVG integrity, actual cut performance, Illustrator opening, and final approval were **not verified**.

## Reusable QAI / CLM production system

Build capability pattern `Creative Asset Lifecycle`:
brief + approved audience/brand and geographic facts → media/ownership research → scene-first concept → human visual approval → editable master + derivative generation → device/print rendering → QA (geometry, colors, iconography, contrast, source metadata, licensing, asset names) → review card with owner/co-managers → deployment/merch only after explicit approval.

Suggested output families:
- **Source scene artwork:** no stamp furniture. Separate export for city tiles, park/resort landing hero, destination cards and real-estate lifestyle features.
- **Collectible stamp derivative:** optional A4 sheet with genuine vector cut line, typography and print proof.
- **Merch derivative:** outlined typography/cut-safe vectors, shirts, stickers, hats etc. licensed/approved for the intended vendor.
- **Web/media derivatives:** JPEG/WebP/AVIF, correct subject/place mapping, accessible alternative text, responsive crop, SEO filenames, provenance and usage rights.

Do not publish generated art from an unapproved concept, reuse another city's scene under the wrong title, or call a raster-in-SVG wrapper editable vector.

## Scope / project routing

- `vector-stamp-collection` owns historical visuals, current scene art direction, vectorization, stamp variants and print proof.
- `content-engine` and park/city/real-estate sites can consume **approved standalone scene exports** under per-site brand, rights and relevance checks.
- `saas-quality-crm` can implement a **generic Asset Studio/asset approval pipeline**, not take ownership of individual artwork.
- No live website or creative asset was modified by this intake.

## New backlog and gates
- Candidate rows `QAI-IDEA-093..104` in [master CSV](../CANDIDATE_REQUIREMENTS.csv) (unapproved).
- Conflict gates `V-18..21` in [conflict register](../CONFLICT_REGISTER.md).
- Detailed [acceptance checklist](SCENE_AND_VECTOR_ACCEPTANCE_CHECKLIST.md).
