# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## Immediate follow-up from Pages hardening (2026-07-08)

After this branch merges, rerun/confirm the **Deploy to GitHub Pages** workflow and
check `https://elinxie.github.io/books-of-samuel/` in DevTools. The root cause of
the reported blank page was a request for `/src/main.tsx`, meaning Pages served
the repository's Vite development `index.html` instead of the built `dist/`
artifact. The workflow now runs `actions/configure-pages@v5`, uploads `dist/`,
and the artifact includes `.nojekyll`; the network table should request
`/books-of-samuel/assets/...` instead. If `/src/main.tsx` still appears, verify
repo Settings → Pages → Source is **GitHub Actions**, not branch/root. This
supersedes item 5 below (the old codex-PR-#10 fix wasn't sufficient; this is
the actual fix — codex, PR #12, merged into `main` as `833aef6`).

## User priority note (2026-07-07, carries forward; updated 2026-07-08)

The user explicitly asked to **deprioritize deep bibliographic
research/cross-checking and heavy test-writing** when it costs significant
token budget, and to **prioritize making the scene look more realistic**
(the visual-fidelity roadmap). Keep new tests focused and proportionate.

## Since the last version of this note

Sonnet session 2026-07-08 (branch `claude/brave-shannon-y5tdqk`, PR #13,
still open as a **draft against `main`** — mark ready and merge):

1. **Built `besor-crossing`** (M2's first scene) per
   `docs/design/besor-crossing-brief.md` and the beats/viewpoints already
   seeded in `src/data/scenes.ts`. New `src/scenes/besor-crossing/`: terrain
   (ADR-005 `channel` feature, braided wadi ~130m wide/8m deep), layout,
   ground works (path + standing pools), bank vegetation gradient, instanced
   pack donkeys, crowd reenactment (two hundred/four hundred split, ~1:10,
   ADR-007 pure pose functions), principal figures (David/Abiathar/Egyptian).
   Wired into `ObservePage.tsx`'s `SCENE_REGISTRY`. Scene status +
   `brook-besor` location status: `planned` → `in-progress` (not `released`
   — no Fable M2 sign-off yet, same pattern M1/Ziklag followed). 5 new claims
   (`claim-besor-channel-form`, `claim-two-hundred-stay`,
   `claim-egyptian-servant`, `claim-spoil-statute`, `claim-pack-donkeys`), 3
   new placeholder assets (`asset-terrain-besor`, `asset-water-pool`,
   `asset-pack-donkeys`) — see `docs/asset-roadmap.md`.
2. **Extended the character system** (`src/engine/characters/bodyGeometry.ts`):
   principal-detail figures now get a segmented merged silhouette (~13
   primitives via `mergeGeometries`, vertex-colored) instead of a single
   capsule; crowd-detail figures unchanged. Still a **static** silhouette
   posed as a rigid `THREE.Group` per frame (ADR-007 pattern) —
   `applyClipPose` remains an unimplemented stub, no bone-driven skeletal
   animation. This satisfies the M1 sign-off rider (performance review of
   `src/engine/characters`' instancing/bake path).
3. Manual QA via Playwright against a built+previewed app: all 4 viewpoints,
   full timeline scrub, zero console errors, visuals confirmed via
   screenshots.
4. Three review passes (archaeology/biblical-text/performance-reviewer), all
   with real fixes applied — see `docs/run-log.md` for detail. One
   non-blocking creative-direction item queued:
   `docs/fable-review-queue.md` **#11** (Egyptian servant's dress —
   distinguish from David/Abiathar to convey abandonment, or keep the
   conservative shared-tunic reuse; besor-crossing-only, doesn't block
   `amalekite-camp`).
5. Gate green throughout: format/lint/**51 vitest** (up from 40)/build/7 e2e.

## Next Sonnet session: pick in this order

1. **Mark PR #13 ready for review and merge it into `main`** if not already
   done — it's the source of truth for M2 progress and this doc assumes it's
   landed.
2. **`amalekite-camp`** (the second M2 scene) per
   `docs/design/amalekite-camp-brief.md` — brief and beats/viewpoints already
   set (same prior Fable pass as besor-crossing). besor-crossing's landing
   establishes the loess/steppe terrain pattern and reuses the same crowd/
   principal-figure machinery this scene needs (camel-flight-only per
   register #6). This is now the natural next M2 slice.
3. **Visual-fidelity roadmap slice 3** (`docs/visual-fidelity-roadmap.md` §A:
   instanced burned-debris + expanded rock/scrub variety) — co-equal
   priority with item 2, pick whichever fits the remaining budget.
4. **M2 Fable sign-off**: not due yet — only 1 of 2 M2 scenes is built. Don't
   request it until `amalekite-camp` also lands (per the M1 pattern,
   `docs/fable-review-checklist.md`).
5. **Quick Pages-live check**: `deploy.yml` was hardened further on `main` by
   codex PR #12 (`833aef6`, merged 2026-07-08) — see "Immediate follow-up
   from Pages hardening" above for what changed and what to verify. Confirm
   the live URL (README's "Live site" link) actually renders. Low effort, do
   if nothing above fits the remaining budget.

## Known state

- Full gate green as of this session's HEAD (format/lint/51 vitest/build/7
  playwright e2e — sandboxed env needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`,
  unnecessary in real CI).
- No open bugs. Fable-review-queue Open table has exactly one item (#11,
  non-blocking creative-direction call, besor-crossing-only).
- `M1` is `released`. `M2` is `planned` — `besor-crossing` scene status
  `in-progress`, `amalekite-camp` scene status `planned` (not started).
- PR #13 still open as a draft — needs to be marked ready + merged.

## Files most recently changed

`src/scenes/besor-crossing/*` (new: terrain.ts, layout.ts, GroundWorks.tsx,
Vegetation.tsx, PackDonkeys.tsx, Crossing.tsx, PrincipalFigures.tsx,
entities.ts, BesorCrossingScene.tsx, terrain.test.ts, reenactment.test.ts),
`src/engine/characters/bodyGeometry.ts` (principal-detail segmented
silhouette), `src/pages/ObservePage.tsx` (`SCENE_REGISTRY`), `src/data/
scenes.ts` + `src/data/locations.ts` (status flips), `src/data/claims.ts` (5
new claims), `src/data/assets.ts` (3 new + 2 reworded records), `src/data/
integrity.test.ts` (`BESOR_CROSSING_ENTITIES` coverage), 3 source cards
(`borowski-1987.json`, `king-stager-2001.json`, `rainey-notley-2006.json` —
reverse `extractedClaims` links), `docs/fable-review-queue.md` (item #11).

## Test-gap backlog (from 2026-07-08 biblical review, still open)

`src/data/integrity.test.ts` only scans `PASSAGES[].keyExcerpts` for the ESV
excerpt budget — beat captions in `SCENES[].beats[]` are invisible to it. A
future scene could embed quotes without tripping `npm test`. Small
`test-engineer` task: scan captions for quoted ESV text too.
