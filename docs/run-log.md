# Run log

Append-only. One compact entry per session. Newest at the bottom.

---

**2026-07-06 — Fable 5 — baseline session**
Repo init. Stack chosen (Vite/React/R3F/TS/Zustand/Zod/Vitest/Playwright).
Built: full data model (claims/passages/scenes/locations/characters/routes/
milestones/features/source-cards), 16 seeded source cards, Ziklag scene
(terrain/settlement/smoke/vegetation/reenactment via pure pose function), observer
camera (inspect+walk), quality profiles, full HUD (settings/teleport/inspector/
certainty panels), all study pages (landing/progress/features/sources/method),
unit tests (integrity/store/reenactment). Not yet done at handoff: e2e tests,
CI/deploy workflows, continuation docs (progress/next-run/run-log/model-handoff/
sonnet-continuation/fable-review-*/ADRs), `.claude/agents`, `.claude/commands`,
CLAUDE.md, real README. Handed off mid-build to Sonnet due to Fable usage limits.

**2026-07-06 — Sonnet 5 — continuation session 1**
Verified Fable's build: fixed 2 typecheck errors (unused import, vite manualChunks
overload), 1 lint error (dead `let` init), generated `sources/source-index.json` +
its build script. Ran full gate: 31 vitest + 6 playwright e2e all pass, build
clean, lint clean. Diagnosed sandboxed Playwright browser-path mismatch, fixed via
`PLAYWRIGHT_CHROMIUM_PATH` env override (no effect on real CI). Wrote full
continuation infrastructure: all `/docs/*` files (architecture, reconstruction-
method, uncertainty-register, asset-roadmap, bibliography, source-ingestion-policy,
automation, model-handoff, sonnet-continuation, fable-review-checklist,
fable-review-queue, progress, next-run, this log, 4 ADRs), `.claude/agents/*`
subagent roster, `.claude/commands/continue-samuel*.md`, `CLAUDE.md`, real
`README.md`, `.github/workflows/ci.yml` + `deploy.yml`. User's ask: make the repo
continuable across chats given limited Fable 5 usage — `docs/model-handoff.md`
now carries the concrete "spend Fable on / don't spend Fable on" policy (no tool
exists to read actual usage numbers, so this is a task-type heuristic, stated as
such). Opened PR #2 for this branch.

**2026-07-06/07 — Sonnet 5 — continuation session 2 (repo reconciliation)**
While subscribed to PR #2 for CI/review events, found `mergeable_state: "dirty"`
against a base SHA that didn't match local history: a _different_ session had
built and merged (PR #1, ~40 min before PR #2 opened) an unrelated "Books of
Samuel" — a static KJV/WEB text reader (Python build scripts, single-file HTML,
own README/LICENSE) — into `main`, from the same original init commit. Two
independent visions of the same repo name/slug, real file collisions
(`README.md`, `index.html`). Flagged as architecturally significant per the PR-
subscription protocol; asked the user via AskUserQuestion rather than resolving
unilaterally. Decision: keep both, 3D visualizer owns the root, KJV/WEB reader
relocated to `/reader/` as a companion full-text tool (motivated by this
project's own ESV-excerpt-only policy — the reader is where full text lives).

Executed: merged `origin/main`, resolved the two conflicts keeping the
visualizer's `README.md`/`index.html`, relocated the reader's `data/`, `web/`,
`scripts/*.py`, `notes/` under `reader/` (its Python scripts resolve paths via
`Path(__file__).resolve().parent.parent`, so the whole subtree moved as a unit
with zero script changes needed), restored its compiled `index.html` to
`reader/index.html` (its scripts' own default output path). Added
`scripts/copy-reader.mjs` (copies `reader/index.html` → `dist/reader/index.html`
post-build — the one integration seam) and wired it into `npm run build`. Wrote
`reader/README.md` (adapted from main's README for its new nested location).
Kept the root `LICENSE` (MIT + public-domain text note, from PR #1) covering the
whole repo; updated root `README.md`'s License section and added a "Companion:
full-text reader" section. Excluded `reader/` from this project's
ESLint/Prettier (separate stack, own conventions/validation). Added a
`docs/architecture.md` section documenting the seam. Added an e2e check that
`/reader/` actually deploys (caught a real bug while writing it: `page.goto('/reader/')`
with a leading slash drops the `/books-of-samuel/` base per standard URL-joining
rules and 404s — fixed to `page.goto('reader/')`). Full gate re-verified green
(format/lint/typecheck/31 vitest/build/7 playwright e2e, `dist/reader/index.html`
byte-identical to main's original compiled reader). Next: see `docs/next-run.md`.

**2026-07-07 — Sonnet 5 — CI fix**
PR #2 CI failed: "source cards in sync" step diffed a freshly-regenerated
`sources/source-index.json` against committed, found `generatedAt` differed
(committed 07-06, regenerated 07-07) — guaranteed to fail on any day after the
commit, unrelated to real card drift. Nothing read that field. Removed it from
`scripts/build-source-index.mjs` and regenerated. Re-verified full gate green.

**2026-07-07 — Fable 5 — generalization + creative-direction review session**
Working `docs/next-fable-session.md`, per-item checkpoint commits.

- Q7 terrain: parameterize now (Sonnet's read confirmed). ADR-005; `terrain.ts`
  rebuilt as `TerrainSpec` + `createTerrain` (mound/flatten/ramp/channel features,
  per-scene color ramps), Ziklag output regression-pinned identical
  (`terrain.test.ts`: 8 height + 3 vertex/color pins); legacy `terrainHeight`/
  `buildTerrainGeometry` deprecated; consumer migration (store-held active
  `Terrain`, scene registry, `SceneEntityDef` decoupling) specced in ADR → Sonnet.
- Q8 settlement layout: defer extraction (confirmed) — scene-local, no second
  ring-type consumer coming (Beth-shan = tell city). ADR-006 standardizes the
  conventions (seeded PRNG per concern, spec arrays not meshes, arc-gap gates,
  curve paths, rejection-sampled slots, claims-traceable constants); extraction
  triggers on a second enclosed-ring scene. Method-doc checklist now points at it.
- Q10 (new, added+resolved): pure pose functions = standard reenactment pattern.
  ADR-007: pure (t, params) → pose, scrub-safe by construction, gesture channels
  normalized, beat-invariant unit test required per scene, named figures get pose
  functions too from M2 (Ziklag's inline David/Abiathar grandfathered).
- Q9 asset pipeline: ADR-008 — Blender→glTF(.glb)→drei useGLTF (no new deps);
  project-authored/CC0-only, no marketplaces; provenance fields (modelPath/
  modelLicense/modelProvenance) pre-authorized for AssetRecord; tri/texture
  budgets set; modeling starts M3 via one pilot figure (instanced-skinned-mesh
  risk settled there); M2 stays procedural. Roadmap intro points at the ADR.
- Q1 plan type: confirmed as shipped (real period type, speculative label,
  generic-composite framing). Rider: no template reuse without a fresh
  per-scene appropriateness claim. Register #3 updated.
- Q2 figure ratio/abstraction: confirmed — ~1:10 is now the standard ratio for
  narrated crowds; capsules-without-gear stays until M3 modeled figures.
  Register #7 updated.
- Q3 late-afternoon lighting: confirmed — hour unstated in text, disclosed
  placeholder; low light earns its keep for legibility + honest mood.
- Q5 camels: RENDER (not omit) — narratively load-bearing in the flight beat
  (30:17); omission would misstate the narrated world. Constraints: flight beat
  only, no ambient herds, ~1:10, rope-halter/pad tack only, dispute chip on
  label. claim-amalekite-raiders notes now carry the depiction decision;
  register #6 decided; roadmap M2 line updated. Build artifacts at M2:
  claim-camel-depiction + asset-camel-placeholder (modeled at M3).
- Q6 Gilboa violence default: STANDARD as default (ADR-009), behind a one-time
  advisory w/ one-click reduced; persisted violenceMode setting; one shared
  choreography, two render treatments; reduced abstracts depiction never facts;
  no dismemberment in any mode; beheading/body-display as aftermath-discovery
  at distance. Method-doc violence section + register #9 updated. Impl at M3.
- Wrap-up: queue Open reduced to #4 only. next-run.md rewritten (Sonnet: ADR-005
  consumer migration first, then #4, then M2 groundwork); next-fable-session.md
  → completed stub (next Fable spends: M1 checklist sign-off after #4, then M2
  scene direction); model-handoff decision table + progress + architecture
  updated. Full gate green at exit. Every item committed separately per the
  checkpoint rule (8 decision commits + this wrap-up).

**2026-07-07 — Sonnet 5 — ADR-005 consumer migration**
Ran `docs/next-run.md` item 1 (routine, fully specified in ADR-005 "Runtime
wiring"):

- Moved `ZIKLAG_TERRAIN_SPEC`/`ZIKLAG_TERRAIN` out of `src/engine/terrain.ts`
  into a new `src/scenes/ziklag/terrain.ts`; the engine module now carries only
  the scene-agnostic `TerrainSpec`/`Terrain`/`createTerrain`.
- Added `terrain: Terrain` + `setTerrain` to the Zustand store (initial value:
  Ziklag's). `ObservePage`'s scene lookup grew from a component-only
  `SCENE_COMPONENTS` map to a `SCENE_REGISTRY` of `{ component, terrain }`;
  entering a scene now calls `setTerrain` alongside `setScene`.
- Migrated all eight direct consumers (`GroundWorks`, `Settlement`,
  `SmokeColumns`, `Vegetation`, `ReturningMen`, `ObserverControls`,
  `EntityLabel`, plus the `ObservePage` registry) off `terrainHeight`/
  `buildTerrainGeometry` onto `useAppStore((s) => s.terrain)` (or
  `useAppStore.getState().terrain` inside `useFrame` loops), then deleted the
  deprecated re-exports.
- Moved `SceneEntityDef` out of `scenes/ziklag/entities.ts` into a new shared
  `src/scenes/types.ts`; `EntityLabel` and `entities.ts` both import from there.
- Split `terrain.test.ts`: the scene-agnostic `createTerrain` feature-primitive
  tests stayed in `src/engine/terrain.test.ts`; the Ziklag regression pins moved
  to `src/scenes/ziklag/terrain.test.ts` next to the spec they pin. Pin values
  unchanged — only imports moved. Dropped the "deprecated `terrainHeight`
  delegates" test since the function it exercised no longer exists (38/38 vitest,
  down from 39 for that one deletion, not a coverage loss).
- Full gate re-verified green: format/lint/typecheck/38 vitest/build/7 playwright
  e2e (`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  in this sandboxed env).
- Updated ADR-005 ("Runtime wiring" section marked implemented, stale
  "until the consumer migration lands" consequence removed), `docs/progress.md`,
  `docs/next-run.md` (next up: queue #4 citation verification, then M2
  `besor-crossing` groundwork).

Next: see `docs/next-run.md`.

**2026-07-07 — Sonnet 5 — citation close-out + visual-fidelity roadmap start**
Ran `docs/next-run.md` item 1 (queue #4) via the `researcher` subagent, then
started the user's requested visual-fidelity track:

- Queue #4 resolved: `garfinkel-ganor-2019` now cites the real identification
  article (Garfinkel & Ganor, _Strata_ 37 [2019]: 51–59) plus a peer-reviewed
  rebuttal (Thomas & McKinny, _IEJ_ 72/1 [2022]: 66–88) and reply (Keimer,
  _PEQ_ 155/2 [2023]: 115–134); `oren-tel-sera-1993` now documents that the
  Tel Sera' identification predates Oren, tracing to Press (1955)/Mazar
  (1957)/Aharoni (1967). Both cards keep a narrow, honest `TO VERIFY` for
  details found only via secondary citation (exact print pagination; Tel
  Halif's proponent list, out of scope this pass). Updated `claims.ts`,
  `locations.ts`, `fable-review-queue.md` (Open table now empty),
  `uncertainty-register.md` #10, `bibliography.md`. Did not touch the
  substantive 3-candidate Ziklag-location dispute.
- Wrote `docs/visual-fidelity-roadmap.md` (sections A–F per the user's brief,
  grounded in actual files: `QualityProfile`, `TerrainSpec`/`ColorZone`,
  existing instancing patterns).
- Checked in `.claude/skills/threejs-r3f-performance/SKILL.md`: the user has
  two relevant account-wide skills enabled (`threejs-best-practices`,
  `react-three-fiber-best-practices`), but no tool in this session exposes an
  account skill's raw content for copying — `Skill` only invokes the fixed
  project/built-in skill list. Wrote an original equivalent grounded in this
  repo's real patterns instead, so any session/agent working this repo (with
  or without those account skills enabled) gets the same guidance.
- Landed visual-fidelity slice 1 (`docs/visual-fidelity-roadmap.md` §A):
  `src/scenes/ziklag/terrain.ts`'s single flat ash-colored zone replaced with
  zones keyed to real layout data — a softer general interior tone, dark
  scorch patches at each `SMOKE_ORIGINS` point (severity-scaled by `major`),
  and a lighter worn-dust halo at the gate midpoint (from `GATE_TOWERS`).
  Coverage: 2 new tests in `src/scenes/ziklag/terrain.test.ts` comparing the
  real spec against a same-hills/features variant with zones stripped, so the
  assertions isolate the zone effect from procedural noise rather than
  comparing across unrelated locations. The old coarse vertex-color regression
  pins didn't need updating (sampled points fall outside the changed zones).
  Verified visually via a Playwright screenshot of the live dev server (scene
  renders, no console errors) in addition to the unit tests.
- Full gate green: format/lint/typecheck/40 vitest/build/7 playwright e2e.
- Mid-session user feedback: deprioritize deep bibliographic research and
  heavy test-writing going forward when token-costly; prioritize visible
  scene-realism work instead. Recorded in `docs/next-run.md`'s "User priority
  note" for future sessions to see without chat memory.
- Responded by landing visual-fidelity slice 2 same session (§C): house
  walls/socles and perimeter-wall segments in `Settlement.tsx` get per-mesh
  seeded hue/roughness jitter (deterministic `mulberry32` seed) instead of
  two flat repeated tones — houses aren't instanced, so this is a small
  per-mesh material array, not `instanceColor`. No new tests added for this
  one per the user's steer (visual-only JSX change, no new pure logic beyond
  the same jitter pattern the roadmap doc already documents). Verified via
  typecheck/lint/test/build all green and a Playwright screenshot of the
  live scene (no console errors; bundle size unchanged).

Next: see `docs/next-run.md`.

**2026-07-07 — Fable 5 — realistic characters pulled forward (ADR-009)**
User-directed priority change: build realistic 3D characters now, ahead of
the M3 Blender/glTF pipeline (ADR-008). Sourcing survey found no CC0 rigged
realistic-human models meeting licensing/period constraints → project-original,
generated in code. Shipped `src/engine/characters/` foundation: anthropometric
17-bone skeleton, procedural skinned body + period dress (tunic/belt/mantle/
sandals/head wrap/beard, vertex-colored), programmatic clips (walk/idle/kneel/
mourn), two-tier LOD (principal ≤14k tris fully skinned, crowd ≤3k tris via
baked-pose instancing, `bake.ts`). Dev-only QA harness (`char-preview.html` +
`src/dev/charPreview.ts`), not part of the built app. ADR-009 written; ADR-008
amended in effect (pilot figure now exists in code, `CharacterRig` keeps the
Blender→glTF seam open). Ziklag rewired onto the new rig. Data layer: capsule
placeholder asset replaced (`asset-figure-capsule` → `asset-figure-procedural`),
`asset-david-marker` updated to reflect the principal rig, `AssetRecord` gains
ADR-008's pre-authorized `modelPath`/`modelLicense`/`modelProvenance` fields
(now populated `project-original`), `f-period-figures` moved `planned` →
`in-progress`, `docs/asset-roadmap.md`/`docs/visual-fidelity-roadmap.md`
updated. Design contract: `docs/design/character-system.md`.
