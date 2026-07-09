# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-09, post-scope-policy change)

**Policy change landed (Fable, user-directed):** the project is now an
**atlas-first historical world with constrained game-like affordances** —
ADR-011 (`docs/architecture-decisions/adr-011-atlas-first-game-affordances.md`)
replaces the blanket "not a game" rule. Nothing about claims/sources/
anachronism/violence/ESV discipline changed. Battle stays scripted reenactment
(no player combat) unless separately approved.

**M2 is released.** M3's first scene has its world-director brief:
`docs/design/gilboa-battle-brief.md` (Fable, 2026-07-09), `SceneDef`
beats/viewpoints filled in `src/data/scenes.ts` (`gilboa-battle` stays
`status: 'planned'` — no build yet). Terrain slice landed: `ridge`
`TerrainSpec` support in `src/engine/terrain.ts` +
`src/scenes/gilboa-battle/terrain.ts` (do not replace with stacked `mound`s).

Open fable-review-queue items (both non-blocking for the build): #12 DEM
sourcing ADR (deferred — v1 uses procedural `ridge`), #13 Philistine
plumed-headdress verification (must clear before the scene ships `released`).

## Next session (Sonnet/`threejs-engineer`): build `gilboa-battle`, visible-first

Follow `docs/design/gilboa-battle-brief.md`. Prioritize **visible progress**;
avoid heavy documentation or test expansion beyond what the brief and ADR-007
require. Work in this order, one commit+push per slice:

1. **Visible scene shell**: scene folder under `src/scenes/gilboa-battle/`
   wired around the existing ridge terrain, registered in `SCENE_COMPONENTS`
   (`src/pages/ObservePage.tsx`), `SceneDef` viewpoints working — an observer
   can stand on Gilboa.
2. **Quality-scaled battlefield population**: instanced Israelite/Philistine
   figures on the ADR-010 rig, ~120–140 combat figures at high tier, scaled
   down per `QUALITY_PROFILES`; budget draw calls against the Amalekite scene.
3. **Rout/fallen/prone readability**: fallen/prone pose buckets +
   death-sequence pose functions (ADR-007, pure, beat-invariant test — this
   test is required, keep it focused).
4. **Simple military kit attachments** on the existing rig (spear/shield/bow/
   round-shield/straight-sword/headdress) — not new body models. Headdress on
   Philistine principal-tier figures only, behind the `scholarlyViews`
   dispute label (queue #13).
5. **Atmosphere/debris/visual fidelity**: haze/dust, scattered kit debris,
   lighting per the brief's mood — the scene should read as a battle's end,
   not a diorama.

Supporting data as each slice needs it (don't front-load): claims per the
brief's "Required source basis" (`claim-gilboa-rout`, `claim-sons-killed`,
`claim-saul-wounded-archers`, `claim-armor-bearer-refusal`,
`claim-saul-death`, `claim-philistine-kit`, `claim-israelite-muster-kit`,
`claim-battle-scale`); light character entries (`jonathan`,
`abinadab-son-of-saul`, `malchi-shua`, `sauls-armor-bearer`); both
`violenceMode` paths + ADR-009's first-visit advisory (first scene that needs
it). Reviewers after the first geometry slice: `archaeology-reviewer`,
`biblical-text-reviewer`, `performance-reviewer`.

## Small follow-ups (fit around the build, don't block it)

- **UI copy still says "not a game"** (`src/pages/LandingPage.tsx:121`,
  `src/ui/SiteChrome.tsx:32`, `src/pages/FeaturesPage.tsx:25`): reword to the
  ADR-011 atlas-first framing (small `ui-engineer` task; mirror the new
  README.md paragraph).
- **Quick Pages-live check** (carried forward): confirm
  `https://elinxie.github.io/books-of-samuel/` renders after the latest
  merge (expect `/books-of-samuel/assets/...` requests, not `/src/main.tsx`).
- **Test-gap backlog** (small, from the 2026-07-08 biblical review):
  `integrity.test.ts` only scans `PASSAGES[].keyExcerpts` for the ESV excerpt
  budget — beat captions in `SCENES[].beats[]` are invisible to it. Add
  caption scanning.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI).
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.
