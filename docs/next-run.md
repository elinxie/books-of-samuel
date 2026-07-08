# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-08, amalekite-camp session, branch `claude/amalekite-camp-7h2pjc`)

`amalekite-camp` (second M2 scene) is **built, tested, visually QA'd** on this
branch: basin terrain + scout's rise, 14-cluster fire sprawl, shelters
(ridge-awnings/windbreaks, not goat-hair tents), livestock (new
`livestockCount` tier field), crowd reenactment (raiders/attackers/captives,
ADR-007 pure pose functions), camel flight per register #6, beat-driven
lighting (dusk → night firelight → compression trough → next-day evening),
David + Egyptian-guide principals. 7 new claims, 6 new assets, scene status
`in-progress`. Gate: format/lint/70 vitest/build/7 e2e all green at last full
run. Playwright screenshot QA: all 4 viewpoints + 8 beat times, zero console
errors; violence rendering confirmed restrained (onset kept, no
aftermath-only fallback needed).

All three review passes (archaeology / biblical-text / performance) completed
with real fixes applied — see `docs/run-log.md` for detail. No escalations;
one non-blocking perf watch item (per-frame instance load, profile on a weak
device someday) noted in the run-log.

## Next session: pick in this order

1. **Merge this branch's PR if still open** (check CI green first; agents are
   authorized to merge their own PRs — see CLAUDE.md; squash, into `main`).
2. **M2 Fable sign-off is now due** — both M2 scenes are built. A
   Fable-level session should run `docs/fable-review-checklist.md` over
   besor-crossing + amalekite-camp, decide `released` status flips
   (scenes + `brook-besor` location + M2 milestone), and clear queue item
   #11 (Egyptian dress) if it chooses to.
3. **Visual-fidelity roadmap slice 3** (`docs/visual-fidelity-roadmap.md` §A:
   instanced burned-debris + expanded rock/scrub variety in Ziklag).
4. **Quick Pages-live check** (carried forward): confirm
   `https://elinxie.github.io/books-of-samuel/` renders after the next merge
   (deploy hardened by PR #12; expect `/books-of-samuel/assets/...` requests,
   not `/src/main.tsx`).

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they
cost significant budget; prioritize visual realism. Keep tests focused.

## Test-gap backlog (from 2026-07-08 biblical review, still open)

`src/data/integrity.test.ts` only scans `PASSAGES[].keyExcerpts` for the ESV
excerpt budget — beat captions in `SCENES[].beats[]` are invisible to it. A
future scene could embed quotes without tripping `npm test`. Small
`test-engineer` task: scan captions for quoted ESV text too.

## Files most recently changed

`src/scenes/amalekite-camp/*` (new scene: layout.ts, terrain.ts, timing.ts,
CampCrowd.tsx, PrincipalFigures.tsx, Camels.tsx, Livestock.tsx, Fires.tsx,
Shelters.tsx, GroundWorks.tsx, Vegetation.tsx, entities.ts,
AmalekiteCampScene.tsx, terrain.test.ts, reenactment.test.ts),
`src/pages/ObservePage.tsx` (registry), `src/engine/quality.ts`
(`livestockCount`), `src/data/{claims,assets,scenes,locations}.ts`,
`src/data/integrity.test.ts`, `docs/{progress,asset-roadmap,uncertainty-register}.md`.
