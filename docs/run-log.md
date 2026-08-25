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
sonnet-continuation/fable-review-\*/ADRs), `.claude/agents`, `.claude/commands`,
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

**2026-07-08 — Fable 5 — M1 sign-off + M2 scene direction**
Two deliverables, each its own commit.

- Checkpoint scaffolding (first, infra for the rest): `scripts/session-usage.mjs`
  (no-dep transcript reader → context %/cumulative tokens/cost estimate/verdict
  OK|SOON|NOW|CRITICAL), wired into `.claude/settings.json` as statusline +
  Stop hook (blocks stop at ≥70% ctx with dirty tree) + SessionStart +
  PreCompact; `/checkpoint` command; `docs/checkpoint-protocol.md` (the one
  rule: commit+push after every completed slice). Cross-agent handoff: root
  `AGENTS.md` (Codex etc. — constraints, implementation-tier role, manual
  checkpoint form) + `docs/web-handoff.md` (Claude Code web / ChatGPT Codex web
  resume instructions). Delegation rule appended to `docs/model-handoff.md`
  (landed via a Sonnet subagent mid-session): Fable orchestrates/judges,
  Sonnet-model subagents execute routine work — mirrored into `CLAUDE.md`.
- **M1 sign-off** (`docs/fable-review-checklist.md` full pass): gate green
  (format/lint/40 vitest/build/7 e2e). Reviewed the procedural character
  system (`src/engine/characters/`, merged to `main` via codex PR #8 → fixed
  and merged as PR #9, 2026-07-07 — note: that merge never got a run-log entry
  until now) — no anachronistic gear, honest placeholder disclosure with
  provenance in `src/data/assets.ts` (`modelPath`/`modelLicense`/
  `modelProvenance`, ADR-010), disputed questions still route through
  `scholarlyViews`, ESV budget intact, no gameplay drift. `M1` → `released` in
  `src/data/milestones.ts`. Follow-up rider (not blocking sign-off, but
  flagged): `src/engine/characters` instancing/bake path hasn't had a
  `performance-reviewer` pass — run one with the next scene-content slice.
  Fixed an ADR numbering collision found in the process:
  `adr-009-procedural-characters.md` → `adr-010-procedural-characters.md`
  (title + renumber note inside; refs updated in `features.ts`/`assets.ts`);
  `adr-009-violence-depiction-defaults.md` keeps ADR-009.
- **M2 scene direction** (world-director pass): `docs/design/besor-crossing-brief.md`
  and `docs/design/amalekite-camp-brief.md` — historical intent, visual
  composition, ~1:10 scale plan, camera/beat design, performance targets,
  required source claims, placeholder policy. `SceneDef` beats/viewpoints
  filled in `src/data/scenes.ts`: besor-crossing (9 beats, incl. the
  return-leg spoil-statute ruling, 1 Sam 30:21–25, folded in rather than a
  separate scene); amalekite-camp (7 beats, incl. an explicit
  time-compression card for 30:17 and camel flight restricted to that one
  beat per register #6). Both scenes stay `status: 'planned'` — geometry is
  Sonnet work, tracked in `docs/next-run.md`.
- Docs sync: `docs/next-run.md` (pick-order: besor-crossing build now
  co-equal priority with the visual-fidelity roadmap, then roadmap slice 3,
  then amalekite-camp, then a Pages-live check), `docs/next-fable-session.md`
  (next spends: M2 sign-off once built, M3 direction near M2 completion),
  `docs/progress.md` (M1 → released, M2 line added, build/test status
  refreshed, new "Cross-session infrastructure" note), `CLAUDE.md` (points at
  `docs/checkpoint-protocol.md`, delegation-rule line).
- Also carried forward from PR #10 (codex, user-merged before this session):
  GitHub Pages deploy config fixed on `main`. Live-URL verification still
  pending — queued as `docs/next-run.md` item 4.

Next: see `docs/next-run.md`.

**2026-07-08 — Codex — Pages source hardening**
User reported live DevTools request for `/src/main.tsx` from the project page, which means GitHub Pages served the repo's Vite dev `index.html` instead of the built `dist/` artifact. Hardened deploy workflow with `actions/configure-pages@v5`, added `public/.nojekyll` so the generated artifact disables Jekyll processing, and clarified README recovery steps. Verified local build artifact references `/books-of-samuel/assets/...`, not `/src/main.tsx`. Live browser/e2e retest blocked in this container by proxy/Playwright browser download limits; rerun Deploy to GitHub Pages after merge and confirm the network table no longer requests `/src/main.tsx`.

Next: see `docs/next-run.md`.

**2026-07-08 — Sonnet 5 — built `besor-crossing` (M2 scene 1 of 2)**
Branch `claude/brave-shannon-y5tdqk`, PR #13 (open, draft, targets `main`).
5 commits: `1d05d65` feat (scene build), `563cf32` test (terrain +
reenactment coverage, fixed a depart-south pose bug found while writing it),
`9c2e741`/`79a4e2a`/`aad5128` fix (review follow-ups, see below).

- Built `src/scenes/besor-crossing/`: `terrain.ts` (ADR-005 `channel`
  feature — braided wadi bed, ~130m wide, 8m deep), `layout.ts`,
  `GroundWorks.tsx` (terrain mesh + worn ford path + standing pools),
  `Vegetation.tsx` (bank density gradient keyed to distance-from-channel),
  `PackDonkeys.tsx` (instanced), `Crossing.tsx` (crowd reenactment, two
  hundred/four hundred split at ~1:10, ADR-007 pure pose functions),
  `PrincipalFigures.tsx` (David/Abiathar/Egyptian), `entities.ts`,
  `BesorCrossingScene.tsx`. Wired into `ObservePage.tsx`'s
  `SCENE_REGISTRY`. Scene + `brook-besor` location status: `planned` →
  `in-progress` (Fable M2 sign-off still pending — same pattern M1/Ziklag
  followed, not `released`). 5 new claims (`claim-besor-channel-form`,
  `claim-two-hundred-stay`, `claim-egyptian-servant`, `claim-spoil-statute`,
  `claim-pack-donkeys`), 3 new placeholder assets (`asset-terrain-besor`,
  `asset-water-pool`, `asset-pack-donkeys`); `asset-david-marker` reworded
  to cover all three principal figures + disclose the pose-function (not
  skeletal) limitation; `asset-olive-tree` broadened for wadi-bank reuse.
- Extended the M1 character system for its first real scene use (satisfies
  the M1 sign-off rider). `src/engine/characters/bodyGeometry.ts`:
  principal-detail figures now get a segmented merged silhouette
  (torso/head/limbs/belt/optional headwrap+beard, ~13 primitives via
  `mergeGeometries`, vertex-colored) instead of a single capsule.
  Crowd-detail figures unchanged (still one capsule, cheap instancing).
  Real scope boundary, explicitly disclosed in `asset-david-marker`: still a
  **static** silhouette posed as a rigid `THREE.Group` per frame via pure
  pose functions (same ADR-007 pattern as the crowd) — `applyClipPose` in
  `bake.ts` remains an unimplemented stub, no bone-driven skeletal animation.
- Manual QA: built + `vite preview` + Playwright against the real Chromium
  binary — navigated `/observe/besor-crossing` via HashRouter, checked all
  4 viewpoints (north bluff/ford/laager/south field) via Teleport, scrubbed
  the timeline through every beat, zero console errors, screenshots
  confirmed terrain/crowd/principal figures/donkeys/pools all render.
- Three review passes ran in parallel, all clean with real fixes (not
  rubber-stamps):
  - **archaeology-reviewer**: fixed missing `claim-dress` citation on
    `ent-egyptian`; removed an uncited comparative-ANE generalization from
    `claim-egyptian-servant`'s notes; added `BESOR_CROSSING_ENTITIES`
    coverage to `integrity.test.ts` (uniqueIds + claim-resolution, matching
    Ziklag — entity list previously had zero test coverage); back-referenced
    the 2 new claims into 3 source cards' `extractedClaims`
    (`borowski-1987`, `king-stager-2001`, `rainey-notley-2006`); disclosed
    `asset-olive-tree` reuse for wadi-bank trees. Added
    `docs/fable-review-queue.md` item #11 (Egyptian servant dress
    distinction — creative-direction call, not blocking).
  - **biblical-text-reviewer**: reworded several near-verbatim ESV phrases
    unquoted in captions/claims/descriptions (ADR-003 policy issue, not a
    factual error) — `b-revival` caption, `claim-two-hundred-stay` +
    `b-stay` caption + `ent-two-hundred` description (all used ESV's exact
    "too exhausted to cross"), `b-egyptian-found` caption, widened
    `b-return`'s `passageRef` to 1 Sam 30:20–21. Also reworded "a cake of
    figs" → "pressed fig cake" (flagged by the reviewer, applied by Sonnet).
  - **performance-reviewer**: confirmed clean — no per-frame allocations
    (module-scope scratch objects throughout), terrain `ColorZone` bake is
    one-time not per-frame, character-system integration doesn't rebuild
    geometry per frame. **Closes the M1 sign-off rider.** Two low-priority
    non-blocking notes for awareness only (not fixed/queued): `GroundWorks`'s
    ~75 non-instanced path/pool meshes match the pre-existing Ziklag
    pattern; `Crossing.tsx`'s crowd figures still build ad-hoc capsule
    geometry rather than calling `engine/characters`' crowd-detail builder.
- Gate green throughout: format/lint/**51 vitest** (up from 40)/build/7 e2e.
- Docs sync (this entry): `docs/progress.md`, `docs/next-run.md` (next:
  merge PR #13, then `amalekite-camp` or visual-fidelity slice 3, M2
  sign-off not due yet), `docs/asset-roadmap.md`. Did not touch
  `docs/uncertainty-register.md` (nothing newly disputed this session) or
  `docs/fable-review-queue.md` further (item #11 already in place).

Next: see `docs/next-run.md`.

**2026-07-08 — Fable 5 (undercover harness) — amalekite-camp session (branch `claude/amalekite-camp-7h2pjc`)**

- Built `amalekite-camp` (second M2 scene) per
  `docs/design/amalekite-camp-brief.md` and the beats/viewpoints seeded in
  `scenes.ts`. New `src/scenes/amalekite-camp/`: basin terrain (flatten +
  scout's-rise mound, worn/grazed ColorZones keyed to the 14-cluster layout),
  layout.ts (clusters/fires/shelter-prop slots/pens/staging/captive grid/camel
  starts, all seeded-deterministic), timing.ts (shared beat constants),
  Shelters (instanced ridge-awnings + brush windbreaks + spoil heaps + tether
  posts — deliberately NOT goat-hair tents), Fires (instanced emissive cones +
  glow discs, not lights; die to embers across the compression card),
  Livestock (2 instanced meshes, new `livestockCount` tier field 36/70/110),
  Camels (camel+rider merged geometry, one instanced mesh, flight beat ONLY
  per register #6, pad tack no frame saddle), CampCrowd (raiders/attackers/
  captives in one instanced mesh, ADR-007 pure pose functions), David +
  Egyptian-guide principals, BeatLighting (keyframed dusk → twilight strike →
  night → dark compression trough → next-day evening; single directional +
  hemisphere throughout, mutated via refs per frame). Scene status `planned`
  → `in-progress`; wired into `SCENE_REGISTRY`.
- Data: 7 new claims (camp-sprawl, strike-timing, full-recovery,
  livestock-spoil, camel-depiction, camp-shelters, camp-scale), 6 new
  placeholder assets, `brook-besor` location backlink. Camel decision
  (register #6) implemented exactly as resolved; register row updated.
- **Violence call (brief authorized deciding at build):** onset kept (not the
  aftermath-only fallback) — alarm/scatter/crumple-at-distance in failing
  light, no gore geometry, fallen not rendered past the compression card.
  Screenshot pass confirmed it reads restrained.
- Manual QA: built + previewed + Playwright (real Chromium): all 4 viewpoints,
  10 beat-time screenshots, zero console errors. Two visual fixes from the
  pass: deeper dusk keys so the fire sprawl (the money shot) reads at t≈30;
  camel-flight stagger lengthened (delay 0–11s) so the flight streams past
  vp-east-edge instead of blinking through.
- Three review passes, real fixes:
  - **biblical-text**: verse citations all confirmed; reworded 2 over-long
    quoted ESV clauses (claim-camp-sprawl, claim-strike-timing) + the same
    clause unquoted in ent-strike; flagged ent-captives → claim-camp-scale
    traceability gap (applied). Left note: excerpt-budget test still doesn't
    scan beat captions (pre-existing backlog item).
  - **archaeology**: all brief constraints honored (no tents, no ambient
    camels, no named-culture material culture, no implied documentation of
    camp form). Fixed b-drive-north caption misreading "David's spoil" as a
    personal cut (contradicted vv. 21–25); added citation-honesty note to
    claim-camp-shelters (no dedicated tent-archaeology source in the
    bibliography); back-referenced 2 new claims into king-stager-2001 +
    borowski-1987 extractedClaims. No escalations.
  - **performance**: clean. ~15 draw calls tier-independent vs Ziklag's ~134
    (brief target: ≤ Ziklag) — ~9x headroom; all counts from QUALITY_PROFILES;
    no per-frame allocations; one shadow light; bundle delta reasonable
    (ObservePage lazy chunk +26 kB raw for the whole scene). Watch item: per-
    frame instanced-matrix load ≈297 at high tier (~4x prior scenes,
    tier-scales to ≈146 at study) — fine by inspection, profile on a weak
    device someday. Accepted deviation, noted here: fires are two instanced
    meshes (cones + glow discs), not the brief's literal "one instanced
    billboard system" — same draw-call budget, no custom shader needed.
- Gate green: format/lint/**70 vitest** (up from 51)/build/7 e2e.
- Docs sync: progress.md (M2 both-scenes-built, sign-off due), asset-roadmap
  (camp placeholder table), uncertainty-register #6 (implemented), next-run
  (M2 Fable sign-off is now the top item).

Next: see `docs/next-run.md`.

**2026-07-08 — Codex — handoff/build check after usage cutoff**
Resumed after Claude Code hit usage limits. No scene/code fixes needed: branch
already contains the amalekite-camp build and docs. Re-ran the local gate: format,
lint, 70/70 Vitest, and production build all pass; production build copied the
reader into `dist/reader/index.html`. Playwright e2e is environment-blocked in
this container because the expected browser is absent and `npx playwright install
chromium` returns CDN 403; earlier Claude run had 7/7 e2e green with
`PLAYWRIGHT_CHROMIUM_PATH`. Updated `docs/next-run.md` so the next Claude/Fable
session can merge/publish first, then run M2 sign-off.

**2026-07-08 — Fable 5 — M2 sign-off (branch `claude/amalekite-camp-7h2pjc`, restarted from `main`@`e0e1ee7` after PR #16 merged)**

- Note: while the build session was interrupted, PR #16 (amalekite-camp) was
  created and merged into `main` externally, and codex merged a docs handoff
  (PR #15) into the branch first. Branch restarted from `main` per the
  merged-PR protocol; this entry is the follow-up sign-off pass.
- Ran `docs/fable-review-checklist.md` over M2 (besor-crossing +
  amalekite-camp). **Verdict: pass — M2 released.** Evidence: three reviewer
  passes per scene with real fixes (run-log entries above), full gate green
  (70 vitest / 7 e2e / build / lint / format re-verified this pass), quality-
  tier screenshots for the camp (study t=34: fire sprawl reads through heavy
  fog; high t=64: strike reads at long draw distance; zero console errors),
  observation-not-gameplay intact (scripted reenactment only, no mechanics).
- Status flips: `M2` milestone → `released`; `besor-crossing` +
  `amalekite-camp` scenes → `released`; `brook-besor` location → `released`;
  `1sam-30` passage → `released` (all three of its scenes now released);
  features `f-besor-scene`/`f-amalekite-camp`/`f-spoil-rule` → `done`
  (spoil-rule disclosed as staged within besor-crossing's closing beats).
- **Scope call:** `f-dem-terrain` re-scoped M2 → M3 — no M2 scene is at an
  identified site (Ziklag disputed, camp unlocatable), asset records already
  target M3 for DEM replacements; disclosed in the M2 goal text.
- **Queue #11 resolved (Egyptian servant's dress):** keep the conservative
  shared-dress treatment — a "worn/disheveled" variant would be invented
  specificity that reads as noise at placeholder fidelity; abandonment is
  carried by staging and label text. Revisit in the M3 modeled-figure dress
  review. Queue Open table is now empty.

Next: see `docs/next-run.md`.

**2026-07-09 — Fable (`world-director` subagent) — `gilboa-battle` scene brief**

- M3's first scene brief: `docs/design/gilboa-battle-brief.md`. Scope guard:
  covers 1 Sam 31:1–6 only (rout + death sequence); wall-display/stripping is
  next-day and belongs to `beth-shan-walls`. `SceneDef` in `src/data/scenes.ts`
  filled with 8 beats (`b-lines` → `b-silence`) and 5 viewpoints; `status`
  stays `planned`, `claimIds`/`assetIds` stay empty until Sonnet creates the
  records at build.
- Resolved design calls: **ridge terrain required** (implement ADR-005's
  anticipated `ridge` `TerrainSpec` feature, don't fake with stacked mounds);
  **DEM deferred, procedural for v1** (DEM sourcing/licensing is untouched
  repo territory — opened queue #12 as its own Fable-tier ADR question);
  **dress review resolved** — differentiate Israelite/Philistine kit
  conservatively, plumed headdress on Philistine principals only behind a
  `scholarlyViews` dispute (queue #13 opened: source page-verification must
  clear before `released`); **modeled-figure pilot already satisfied** by
  ADR-010's procedural rig — Gilboa needs kit-attachment meshes + fallen pose
  buckets, not a from-scratch glTF hero, so no redundant work scheduled.
- Scale: no headcount asserted (register #4 forbids it) — stages the
  ridge-crest engagement, not a national army; ~120–140 combat figures at
  high tier, ~1:10 disclosed ratio, rout read by motion/dust not count.
- Violence: full per-beat standard-vs-reduced table in the brief, per
  ADR-009 (one choreography, two treatments; armor-bearer's refusal at 31:4a
  identical in both modes as the emotional pivot; Saul's death held at
  documentary distance in standard, fully elided in reduced; no dismemberment
  or blood in any mode; beheading (31:9) out of scope).
- Gate re-verified this pass: format/lint/70 vitest/build all green (fresh
  `npm install` was needed — lockfile/node_modules had drifted since the last
  session in this container).
- `docs/fable-review-queue.md`: added #12 (DEM data-sourcing/licensing ADR,
  open) and #13 (Philistine headdress attribution, open, blocks `released`
  not the build); annotated #11's resolution with a pointer to this brief.

Next: build `gilboa-battle` — see `docs/next-run.md`.

**2026-07-09 — Codex — Gilboa terrain primitive slice**

- Implemented ADR-005 `ridge` `TerrainSpec` support in `src/engine/terrain.ts`:
  one elongated gaussian rise between two endpoints, with validation and unit
  coverage. Added `src/scenes/gilboa-battle/terrain.ts` + terrain tests for the
  1 Sam 31 ridge: crest near origin, lower northern approach, eastern rout slope.
- Seeded `claim-gilboa-topography`, `claim-gilboa-terrain-form`, and
  `asset-terrain-gilboa-ridge`; updated progress/asset roadmap/next-run.
- Checks: `npm run test -- src/engine/terrain.test.ts src/scenes/gilboa-battle/terrain.test.ts`
  passed. `npm run verify` passed through format/lint/unit/build, then e2e was
  blocked by the missing Playwright browser in this container; `npx playwright
install chromium` also failed with CDN 403.

Next: wire `gilboa-battle` scene composition around the new terrain; then add
narrated beat claims, light character entries, kit attachments, pose buckets,
and violence-mode UI per `docs/design/gilboa-battle-brief.md`.

**2026-07-09 — Fable 5 (scheduled web job) — scope policy: atlas-first + game affordances**

- User-directed policy change: blanket "not a game" replaced by **atlas-first
  historical world with constrained game-like affordances**. Recorded as
  ADR-011 (`docs/architecture-decisions/adr-011-atlas-first-game-affordances.md`).
  Allowed: first-person nav, guided paths, interactable labels, optional study
  objectives, map/route progression, NPC presence, scripted reenactments,
  replayable scenes, environmental discovery, non-combat learning
  interactions, light orientation/learning progression. Still out without
  separate Fable approval: fantasy systems, loot grind, power-fantasy
  leveling, distorting win/loss states, unsourced invented certainty,
  player-driven combat. Claims/sources/anachronism/ESV/violence discipline
  unchanged.
- Updated: CLAUDE.md, AGENTS.md, README.md, docs/model-handoff.md ("Fixed for
  now" + decision table), docs/fable-review-checklist.md (§ renamed
  "Affordances serve the atlas"), docs/visual-fidelity-roadmap.md,
  .claude/agents/fable-architect.md, docs/next-run.md (Gilboa visible-first
  build handoff, 5 slices).
- Deferred to next-run follow-ups: UI copy in LandingPage/SiteChrome/
  FeaturesPage still says "not a game" (small ui-engineer task).
- Checks: prettier format:check on changed files only; lint/test/build/e2e
  intentionally skipped — docs/config-only diff, no runtime surface.

Next: build `gilboa-battle` visible-first — see `docs/next-run.md`.

**2026-07-09 — Sonnet 5 — Gilboa build, Steps 1–5 (scene shell through atmosphere)**

Scheduled job; no Fable policy-change branch existed (checked — CLAUDE.md/AGENTS.md
still state the blanket "not a game" scope, `model-handoff.md` still lists it
"Fixed for now"), so continued the already-planned Gilboa build per `next-run.md`
instead. Five sequential `threejs-engineer` subagent slices, each reviewed,
build/lint/vitest-checked, committed, and pushed individually:

1. **Scene shell** (`16ae41e`): wired `GILBOA_TERRAIN` into a rendered scene
   (`GilboaBattleScene.tsx`, `GroundWorks`, elevation-driven `Vegetation`, entity
   labels, fixed dawn lighting/fog), registered in `ObservePage`'s
   `SCENE_REGISTRY`, `status: 'planned' → 'in-progress'`.
2. **Battlefield population** (`fe9bd5c`): ~127 figures at high tier (crest
   retinue ~13, Philistine archers ~14 + infantry ~45 + principals ~5, routing
   Israelites ~45) via pure seeded slot builders (`layout.ts`), reusing the
   ADR-010 rig. Added `claim-battle-scale` + 4 light character entries
   (Jonathan, Abinadab, Malchi-shua, Saul's armor-bearer).
3. **Pose choreography** (`e0bb4ad`): beat-driven death sequence/rout (`poses.ts`,
   pure functions of scene time) — sons overtaken, retinue collapse ripple, Saul
   staggering/kneeling/falling, the armor-bearer's refusal (identical in both
   modes, the emotional pivot) and following, seeded rout falls. Added the 5
   narrated-beat claims and a `violenceMode` ('standard'/'reduced') store field +
   Settings-panel toggle per ADR-009 — **no first-visit advisory modal yet**,
   flagged as a gap.
4. **Military kit** (`a8bd196`): primitive-geometry spear/shield/bow/round-shield/
   straight-sword/headdress attachments as `InstancedMesh`, riding the same
   per-instance transforms as figure poses. Headdress renders on Philistine
   principal-tier only, behind `claim-philistine-kit`'s two-view `scholarlyViews`
   dispute (fable-review-queue #13 stays open, untouched, pending citation
   verification before `released`).
5. **Atmosphere** (`65fa645`): rout-dust GPU point-sprite system (one shared
   material, `SmokeColumns.tsx`-style vertex displacement), footprints reused
   from the same slot builders the figures use, intensity a pure function of
   scene time tied to the beat timeline.

Checks per slice: `npm run build` + targeted `npx eslint` + full `npx vitest run`
(fast, ~15 files) after each. Ran the full gate once at the end instead of
per-slice: `npx vitest run` (117/117 passed), `npm run build` (clean), and
`npm run e2e` (7/7 passed, `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium`)
— plus a manual `vite preview` + headless-Chromium console-error check of
`/observe/gilboa-battle` specifically (not covered by the existing e2e specs),
0 console errors, canvas renders. **Full `npm run verify` (format:check +
lint + test + build + e2e as one gate) was not run as a single command** —
its constituent checks were all run individually above; noting this explicitly
per the run's instructions since `verify` itself wasn't invoked.

Known gaps carried forward (not blockers for this pass, tracked for later):
ADR-009 first-visit violence advisory modal; fable-review-queue #13 (headdress
citation page-verification) before `released`; `PhilistinePress.tsx`
kit/instance-count growth across steps may be worth a `performance-reviewer`
pass now that all 5 slices run concurrently (flagged by the Step 4/5 agents,
not independently re-verified this session beyond the manual console-error
check above).

Next: see `docs/next-run.md`.

**2026-07-09 — Sonnet 5 — merge reconciliation (policy branch × Gilboa build branch)**
Fable's scope-policy job (ADR-011, above) and this session's Gilboa build ran on
diverged branches — the build session's own note above records it checked for
and didn't find the policy branch. Merged `main` (carrying the completed
`gilboa-battle` build) into the policy branch; only `docs/next-run.md` and this
file conflicted (both edited the "state right now" / handoff section same-day).
No code conflicts — ADR-011 touched docs/config only. Resolved by keeping
ADR-011's policy files as-is and rewriting `next-run.md`'s state/handoff section
to reflect that `gilboa-battle` is now built (`in-progress`, not `planned`),
carrying forward the build session's follow-up list as the actual next steps.

**2026-07-09 — Sonnet 5 — melee combat + rig conversion (user-directed)**
User asked, across the same session as the merge above: (1) real mutual
combat visible in `gilboa-battle`, not just rout/death, with an actual
combatant count instead of the disclosed no-headcount abstraction; (2) after
that landed, animated legs and real limbed figures everywhere, not capsule
blobs. A background `threejs-engineer` subagent started on both but failed
mid-task on an account monthly-spend-limit cutoff (external constraint, not a
code problem); picked up the work directly in the foreground afterward
(subagents cost re-derivation from cold, foreground work reuses this
session's live context — see the session's own reasoning on why, not
repeated here).

Landed in six commits, each independently gated (format/lint/typecheck/
vitest/build, plus a manual headless-Chromium console-error check of
`/observe/gilboa-battle`):

- `f234794` crowd limb-pose forward kinematics (`poseJointPositions`,
  `CrowdLimbPose`), additive, unwired.
- `91e3606` scripted melee-clash combat wired live: new `DefenderLine`/
  `EngagedPhilistines` components, `claim-line-defense`, new `b-line-clash`
  beat (revises the original brief's "not blow-by-blow fighting" call —
  logged `fable-review-queue.md` #15), figure-count ratios bumped to match
  `claim-battle-scale`'s already-landed ~1:20 ratio (~325 figures at high
  tier vs. the original brief's 120–140 cap — flagged, not yet perf-reviewed).
  13 new unit tests.
- `6f111af` docs sync.
- `656185c` `buildCrowdLimbedGeometry` + `sampleWalkPoses`/`sampleFightPoses`
  (`engine/characters/`) — real limbed silhouette + pose-bucket sampling,
  additive (existing capsule-tier `buildCrowdGeometry` untouched). 11 new
  unit tests.
- `18bf8d4` `DefenderLine`/`EngagedPhilistines` converted to real figures +
  braced-stance leg cycling (6 InstancedMesh buckets each, `mesh.count` set
  to per-bucket occupancy each frame). 3 new unit tests (`clashPhase01`).
- `0b4327f` `RoutingIsraelites` converted, walk-cycle legs (8 buckets).
- `5ef5409` `CrestRetinue`/`PhilistinePress` converted (single rest-pose
  geometry, no bucket cycling — static/idle formations).

Research alongside: a `researcher` subagent found no scholar has published a
Gilboa-specific combatant estimate and recommended keeping the disclosed
abstraction; the user overrode this and asked for a derived number anyway,
"flagged as you implement it" — done as a fully-disclosed assumption chain
off Finkelstein & Silberman's regional population figure, logged
`fable-review-queue.md` #14.

**Not resolved, explicitly flagged for next session:** no real FPS/frame-time
measurement has been taken at the new ~325-figure, real-geometry count — see
`docs/next-run.md`'s item 0, now the top priority. Manual checks only
confirmed 0 console errors and correct render, not frame time.

**2026-07-09 — Sonnet 5 — sandboxed relative performance measurement**
Followed up on the flag above. Built a headless-Chromium `requestAnimationFrame`
timing harness (`performance.now()` deltas over a fixed window) and compared
this session's final `gilboa-battle` state against a `git worktree` checkout
of `2a41aca` (the pre-session build) at the same scene point (the rout beat —
the one moment that exists unchanged in both versions), both at high quality
tier. Result: avg frame time ~222ms → ~333ms, a **~1.5x regression** — real,
but milder than the raw multipliers (figure count ~2.5x, triangles/figure
~4x, draw calls roughly doubled) alone would predict; a large fixed scene
cost (terrain/vegetation/dust, unchanged this session) dilutes the relative
impact of what did grow.

Checked the renderer before trusting the numbers: `WEBGL_debug_renderer_info`
reports `SwiftShader Device` — this sandbox has **no GPU**, pure software
rasterization. Absolute fps (~3-4.5 either way) is meaningless for real
hardware and wasn't reported as if it were; the ~1.5x _relative_ delta is a
real, likely-transferable signal (evidence this isn't catastrophic), but a
software rasterizer's bottlenecks don't necessarily scale like a real GPU's
would. Recorded honestly in `docs/next-run.md`: this is real measurement, not
a substitute for someone checking the actual deployed scene on real hardware.

**2026-07-10 — Sonnet 5 — merged unmerged rig-conversion/melee-combat work to main**
This whole branch (`claude/resolve-merge-conflicts-nqbqn8`) had 12 commits
past what PR #23 actually merged — PR #23 only captured an earlier ancestor
(the simple gilboa-battle build); the melee-combat, rig-conversion, and
performance-measurement work above never landed on `main`. Reset
`claude/continue-unmerged-work-4xucqr` to the branch tip, merged `main` (no
conflicts), re-ran the full gate: format:check, lint, 144 vitest, build, 7
e2e — all green. Pushed and opened a PR to close the gap.

**2026-07-14 — Sonnet 5 — four independent slices (branch `claude/focused-mccarthy-ckjcuh`)**
Gate green throughout: format:check, lint, 151 vitest, build, 8/8 e2e.

1. **ADR-009 first-visit violence advisory, built.** New
   `src/ui/ViolenceAdvisory.tsx` (+ test), wired via `src/pages/ObservePage.tsx`
   and persisted through `src/state/store.ts`. `SceneDef` gains
   `depictsDeath?: boolean` (`src/data/types.ts`); `gilboa-battle` set to
   `depictsDeath: true` (`src/data/scenes.ts`) — the trigger is scene data, not
   a hardcoded id, per ADR-009's own spec. E2e coverage in `e2e/smoke.spec.ts`.
   Closes `next-run.md` item 1.
2. **ESV excerpt-budget test-gap closed.** `src/data/integrity.test.ts` now
   also scans `SCENES[].beats[].caption` against the excerpt budget, not just
   `PASSAGES[].keyExcerpts`. Zero violations in existing data. Closes
   `next-run.md` item 4.
3. **"Not a game" copy reworded to ADR-011 atlas-first framing**:
   `src/pages/LandingPage.tsx`, `src/ui/SiteChrome.tsx`,
   `src/pages/FeaturesPage.tsx`. Closes the small-follow-up UI-copy item.
4. **Two new M3 world-director briefs** (Fable-tier, via `world-director`
   subagent): `docs/design/beth-shan-walls-brief.md`,
   `docs/design/jabesh-burial-brief.md` — briefs only, no build; both scenes
   stay `planned`/empty in `src/data/scenes.ts`. Beth-shan: first
   identified/excavated site in the project (Tel Beth-Shean), wall rendered
   narrated-but-archaeologically-thin, four wrapped/undetailed body forms (no
   severed head/dismemberment), Philistine-control disputed via
   `scholarlyViews`, ~55-70 figures high tier. Jabesh-gilead: stays disclosed
   composite (site unresolved, register #8), extends ADR-009 to funerary
   burning (covered-before-flame, no burning-body silhouette, queued for ADR-009
   wording ratification), bones as a wrapped bundle not skeletal geometry,
   ~45-55 figures, smallest M3 cast. Added `fable-review-queue.md` #16
   (Beth-shan archaeological-horizon page-verification vs.
   `mazar-beth-shean-2006`) and #17 (Jabesh pyre ADR-009 extension +
   cremation-scholarship citations) — both block their scene's path to
   `released`, neither blocks the build. `docs/uncertainty-register.md`
   updated in step (#8 rewritten, #9 annotated, #11/#12/#13 added).

Other notes: sandboxed GitHub Pages live-check for
`https://elinxie.github.io/books-of-samuel/` could not run this session — the
sandbox network proxy returns a policy-level 403 (`connect_rejected`, confirmed
via `/root/.ccr/__agentproxy/status`) for that host, not a transient failure;
carried forward as an environment limitation, not resolved. PR #25
(`claude/mt-gilboa-battle-viz-s2gs7e`, separate branch/session — resolves
queue #15 + adds archer volley) is open with failing CI from a trivial
Prettier issue in `docs/fable-review-queue.md` on that branch; left a PR
comment flagging it, did not push (out of scope for this branch).

Still open, unchanged: `next-run.md` item 0 (real-hardware perf check),
queue #12/#13/#14/#15.

**2026-07-15 — Sonnet 5 — `beth-shan-walls` scene build (M3, scene 2)**
Built the full `beth-shan-walls` scene per `docs/design/beth-shan-walls-brief.md`,
following `gilboa-battle`'s pattern. New: `src/scenes/beth-shan-walls/`
(terrain: mound tell + flattened summit + east/west ramps, greener valley
palette; scene-local `layout.ts` per ADR-006 rider — dense summit-quarter grid

- lanes, wall arc + gate, gate-plaza/lane/escort/night-work rejection-sampled
  slot pools, valley-road + retrieval-path CatmullRom curves — NOT Ziklag's ring;
  `poses.ts` pure beat-time choreography incl. `displayFormTransform`'s
  standard/reduced ADR-009 fork; `TownBlocks`/`WallAndGate`/`Monuments`/
  `DisplayForms`/`Townspeople`/`PhilistineEscort` (reuses gilboa's
  `kitMeshes.ts`)/`RetrievalParty`/`Torches` (amalekite fire-sprite technique)/
  `BethShanWallsScene` root with beat-driven midday→dusk→night→pre-dawn lighting
  rig). New shared engine piece: `src/engine/characters/wrappedForm.ts`
  (`buildWrappedFormGeometry(lengthScale)` — a lathe-revolved tapered/banded
  cloth-bundle silhouette, no limb/head articulation; reused for both the
  upright wall display and the horizontal carried bier, and intended for
  `jabesh-burial`'s bone bundle at a shorter scale). Data: 8 new claims
  (`claim-beth-shan-identification/-town-form/-wall/-control`,
  `claim-egyptian-monuments`, `claim-body-display`, `claim-armor-ashtaroth`,
  `claim-jabesh-retrieval` — shared forward with `jabesh-burial`), `men-of-jabesh`
  character, 7 new asset records (`asset-terrain-beth-shan-tell`,
  `asset-tell-town-blocks`, `asset-beth-shan-wall`, `asset-display-forms`,
  `asset-egyptian-monuments`, `asset-bier-props`, `asset-torch-sprites`), full
  `SceneDef` (8 beats matching the brief's table exactly — the parent task brief
  said "9 beats" but only 8 are listed/tabled; built the actual 8 — 5 viewpoints,
  `status: in-progress`, `depictsDeath: true`, `durationSec: 150`). Registered in
  `ObservePage.tsx` `SCENE_REGISTRY`; violence advisory gates automatically via
  `depictsDeath`. Interpretive calls not fully pinned by the brief (flagging for
  review): confidence picked from brief's dual-value ranges (`claim-beth-shan-
town-form` → moderate, `claim-beth-shan-control` → low, both first-listed);
  retrieval party reaches the wall by circling the tell's exterior base from
  east to west foot, never entering the gate/town (avoids implying an
  evaded-guard/stealth read); Philistine escort withdraws down the valley road
  before dusk so no guard presence is staged at all during the night retrieval;
  biers reuse the same wrapped-form geometry as the wall display (one honest
  object, not a body vs. bundle distinction) plus a simple plank+pole bier-frame
  prop underneath. Tests: `terrain.test.ts`, `layout.test.ts` (12 cases),
  `poses.test.ts` (19 cases), `reenactment.test.ts` (escort/retrieval pose
  functions), `wrappedForm.test.ts` — all new, all passing; added
  `BETH_SHAN_WALLS_ENTITIES` checks to `integrity.test.ts`. Full gate:
  format/lint/typecheck/vitest (215 tests, 24 files) all clean; `npm run build`
  clean; ran existing `e2e/smoke.spec.ts` (8/8 pass, untouched) plus a throwaway
  Playwright smoke check (standard/reduced modes, high quality tier, scrubbed
  through all 8 beat times, zero console errors) — deleted after verifying, not
  committed. Figure counts at high tier: town 36 + escort 12 + retrieval 9 = 57
  (target 55–70); architecture is the budget load (house socle/wall/roof ×~140
  houses, wall socle/upper ×~17 segments, all instanced) — flagging for
  `performance-reviewer`, not yet profiled on real hardware. Did not touch
  `jabesh-burial`, `next-run.md`, `progress.md`, `fable-review-queue.md`, or
  `asset-roadmap.md` (out of scope, orchestrator's job). Did not commit/push.

**2026-07-15 — Sonnet 5 — `jabesh-burial` scene build (M3, scene 3, closing)**
Built the full `jabesh-burial` scene per `docs/design/jabesh-burial-brief.md`,
following `beth-shan-walls`'s pattern with `besor-crossing`'s simpler
terrain/vegetation structure as the scale analogue. New:
`src/scenes/jabesh-burial/` (terrain: ADR-005 `hills` + a narrow/shallow
`channel` for the Wadi Yabis form + a west→east rise ramp + village/pyre/
tamarisk flattens, Gilead's 4th regional palette; scene-local `layout.ts` —
a loose, open, unwalled 8–12-house hamlet cluster around a clear yard, min
11m house spacing, explicitly NOT Ziklag's ring or Beth-shan's dense
summit-quarter grid; `poses.ts` pure beat-time choreography incl.
`formPose`'s unconditional covered-before-flame gating, `pyreFireIntensity`,
`boneBundlePose`/`burialMoundProgress`, `sevenDayShimmerEnvelope`/
`Oscillation`; `GroundWorks`/`Vegetation`/`VillageHouses`/`Tamarisk`/
`RetrievalColumn` (figures, path-following)/`Torches` (torches now move with
their bearer, unlike Beth-shan's static wall-foot torches)/`Biers` (the 4
wrapped forms, reuses `buildWrappedFormGeometry(1)`)/`Pyre` (seeded
log-cabin stack that grows to fully cover the biers before flame, then the
project's one large fire)/`BoneBundle` (`buildWrappedFormGeometry(0.3)` —
bundle scale, never skeletal geometry)/`Villagers` (3-location crowd: yard →
pyre-gather-ring → tamarisk, soft linear cross-fade at beat boundaries, no
route curve needed on this open unwalled terrain)/`JabeshBurialScene` root
with beat-driven deep-night→dawn→morning→dusk lighting rig plus a
seven-day-fast shimmer that oscillates the SAME directional+hemisphere rig
between the night/brightest-day reference keys — a rig mutation, no new
lights). Data: 7 new claims (`claim-jabesh-location` [disputed, both
candidate tells surfaced], `claim-gilead-terrain`, `claim-jabesh-town-form`
[design-placeholder], `claim-night-march`, `claim-burning-bodies`
[scholarlyViews carry the cremation-anomaly debate, hedged attribution,
citation verification queued #17], `claim-tamarisk-burial` [Chronicles
terebinth variant + 1 Sam 22:6 echo in notes], `claim-seven-day-fast`);
reused `claim-jabesh-retrieval`, `men-of-jabesh`, `claim-dress`,
`claim-chronology` by id, not recreated. 5 new asset records
(`asset-terrain-jabesh-wadi`, `asset-tamarisk-tree`, `asset-pyre`,
`asset-village-cluster`, `asset-vegetation-gilead`); reused
`asset-bier-props`, `asset-torch-sprites`, `asset-figure-procedural`,
`asset-rocks` by id. Full `SceneDef` (7 beats exactly matching the brief's
table, 5 viewpoints, `status: in-progress`, `depictsDeath: true`,
`durationSec: 150`). Registered in `ObservePage.tsx` `SCENE_REGISTRY`;
violence advisory gates automatically via `depictsDeath`. Interpretive calls
not fully pinned by the brief (flagging for review): exact beat `timeSec`
values and viewpoint camera positions (brief gives beat order/table but no
numbers — chose an evenly-paced 150s arc mirroring Beth-shan's spacing);
villager crowd transit between the 3 locations uses a direct linear
lerp/cross-fade rather than route-curve walking (this scene's terrain has no
walls/obstacles, and the beat-to-beat gaps represent skipped hours the
lighting arc already carries — flagged as a simplification, not full
walked-transit choreography); retrieval-column figures freeze at their
arrival slot once they reach the village and are not tracked through the
later pyre/tamarisk beats individually (they read as absorbed into the
general village population, matching "leadership by staging only"); pyre
timber covering timed so the last-staggered bier's carry transit always
finishes before any log begins covering it (no form is ever left partially
covered). `pyreFireIntensity`/`boneBundlePose` also take a `violenceMode` arg
(the brief's only two mode-dependent beats here: b-pyre reduced caps
intensity at an embers-only level, never a full blaze; b-bones reduced
elides the gathering/carry, bundle simply present at the grave once
b-tamarisk begins) — every other beat/function is intentionally
mode-invariant per the table. Tests: `terrain.test.ts` (3 cases),
`layout.test.ts` (14 cases), `poses.test.ts` (26 cases, incl. the
covered-before-flame hard constraint in both modes, the reduced-mode
embers-cap and gathering-elision, and the shimmer's multi-cycle
oscillation), `reenactment.test.ts` (10 cases, column/villager pose
functions) — all new, all passing; added `JABESH_BURIAL_ENTITIES` checks to
`integrity.test.ts`. Full gate: format:check/lint/typecheck/vitest (28
files, 269 tests) all clean; `npm run build` clean. Did not run e2e
(orchestrating session runs full `npm run verify`). Figure counts at high
tier: retrieval column 11 + villagers 36 = 47 (brief target 45–55,
deliberately smaller than Beth-shan's 57); cost here is
vegetation/terrain/night-lighting per the brief, not crowd size —
flagging for `performance-reviewer`, not yet profiled on real hardware. Did
not touch `beth-shan-walls`, `next-run.md`, `progress.md`,
`fable-review-queue.md`, `asset-roadmap.md`, or `docs/uncertainty-register.md`
(out of scope, orchestrator's job). Did not commit/push.

**2026-07-16 — Fable 5 — M3 sign-off review (branch `claude/focused-mccarthy-o8d4os`)**
Full `docs/fable-review-checklist.md` pass over `gilboa-battle`,
`beth-shan-walls`, `jabesh-burial` (all built, merged to `main` at `3d72f3d`).
**Verdict: milestone approved as built; M3 flips `planned`→`in-progress`, not
`released`** — the three release gates (#13/#16/#17 page-verification) are real
and stay open; scenes stay `in-progress`; `f-gilboa`/`f-beth-shan`/`f-jabesh`
→ `in-progress`. Checklist findings: historical plausibility PASS (all
rendered elements claim-traced; biblical-text claims phrased as narrated;
disputes in `scholarlyViews` — headdress, wall vs. 2 Sam 21:12 square,
Rowe/Dagon temples, Beth-shan control, Jabesh site, cremation anomaly,
tamarisk/oak; confidence spot-checks sound). Anachronism PASS (kit hedged
comparative-ANE; monuments labeled + removable-on-failed-verification; wall
disclosed as archaeologically thin; no invented guard/elders/pursuit).
Visual coherence PASS on build evidence + e2e beat-scrub checks. Performance:
beth-shan clean (57 figs, 24 draw calls), jabesh fixed (`c5aac8f`), gilboa's
real-hardware check still open (next-run item 0, non-blocking). Tests:
`npm run verify` green this session — format/lint/269 vitest/build clean;
e2e 8/8 (first run failed on the sandbox browser-path issue only;
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/...` per the
documented env note). Source traceability PASS with the known TO VERIFY
hedges (#13/#16/#17 track exactly those). ADR-011 PASS (scripted reenactment
only, no win/loss framing, everything ignorable/replayable).
Queue rulings: **#12 resolved** — ADR-012 (DEM sourcing: SRTM default,
source-card + provenance disclosure, modern-surface caveat). **#14 resolved**
— battle-scale chain approved as shipped (honestly labeled disclosed
extrapolation). **#15 stale duplicate removed** — resolved 2026-07-13; both
riders verified done in current code (b-lines caption, claim-line-defense
basis relabel). **#17 narrowed** — ADR-009 funerary-burning extension
ratified into the ADR text (covered-before-flame both modes, no burning
silhouette/charring ever, wrapped forms only); citation verification
remains and gates `jabesh-burial`→`released`. **#13/#16 stay open** —
page-verification (headdress; Mazar Beth-shean horizon) is researcher work
this session cannot substitute for; they gate their scenes' `released` only.
Build-agent ambiguities all approved as shipped: beth-shan dual-range
confidence picks (town-form `moderate`, control `low` — both right on a
second read); no-guard retrieval staging + escort withdrawal (omission over
invention; text narrates neither guard nor evasion); evenly-paced 150s beats
(execution detail); villager lerp/cross-fade transit (disclosed
simplification — Sonnet may upgrade to route-curve walking freely, no queue
item). Path to `released`: clear #13/#16/#17 via `researcher`
page-verification + a short Fable confirmation, then flip all three scenes,
M3, and the three features together.

**2026-07-16 — Sonnet 5 (researcher) — queue #17 citation verification (branch `claude/focused-mccarthy-o8d4os`, one of three parallel researcher passes with #13/#16)**
Ran the remaining half of queue #17: named, checkable attributions for
`claim-burning-bodies`' three `scholarlyViews`, replacing the hedged "e.g.,
commentators…" placeholder that only cited `king-stager-2001` (a burial-
practice baseline, not commentary on this specific crux).

- Found two real, on-point, public-domain commentaries discussing 1 Samuel
  31:12-13 by name (verified via web search cross-checking multiple
  independent digital reproductions of each public-domain text — not
  primary-copy page inspection): **Keil & Delitzsch's Biblical Commentary on
  the Books of Samuel** (trans. James Martin, T&T Clark, 1866) and **John
  Gill's Exposition of the Old Testament** (1748-63). Added both as new
  source cards (`sources/source-cards/keil-delitzsch-1866.json`,
  `gill-exposition-1763.json`; `copyrightStatus: public-domain`); `npm run
build:sources` was run (by another concurrent session on this shared
  branch — confirmed the regenerated `source-index.json` count/entries are
  correct rather than re-running it myself, since I have no shell tool this
  session).
- Wired real `proponents` into all three `scholarlyViews` in `claims.ts`:
  honorable-treatment and prevent-desecration are both attributed to Keil
  (mutilation made normal burial impossible; feared further Philistine
  desecration), prevent-desecration also to Gill (same desecration fear plus
  a putrefaction rationale); the third view was retitled from "a proposed
  textual variant" to accurately describe what was actually found — not a
  modern textual-critical emendation, but an older Targum/Kimchi/Ben Melech
  interpretive tradition (reported in Gill, and reported-and-rejected in
  Keil & Delitzsch) reading the verb as ceremonial spice-burning rather than
  cremation. `claim-burning-bodies`' `notes` and `docs/fable-review-queue.md`
  #17 both updated accordingly; `docs/bibliography.md` given the two new
  rows.
- **#17 moved to Resolved** (not fully page-verified against original print
  volumes — both source cards carry a narrow `TO VERIFY` for exact
  pagination, parallel to queue #4's precedent for what counts as adequately
  resolved short of primary-copy inspection). Substantive attribution is not
  in doubt: cited by name and passage (ad loc. 1 Samuel 31:12-13) across
  multiple independent corroborating sources. A brief Fable confirmation can
  now close `jabesh-burial` → `released` on this gate (queue #13/#16 are the
  other two open gates, being worked in parallel by other sessions on this
  same branch).
- **Tooling note:** this session's toolset had no shell/Bash access, so
  `npm run build:sources`/`npm test`/`npm run lint`/git commit-push could
  not be run directly. `claims.ts` and `source-index.json` were observed to
  be concurrently edited by the parallel #13/#16 sessions on this branch
  mid-pass (their own new claims/source-cards merged in cleanly around this
  work; verified by re-reading the affected regions after each such
  notification — no conflicts with this session's edits). Whichever
  agent/session next has shell access on this branch should run the full
  `npm run verify` gate (this pass's changes are docs/data-only — two new
  JSON source cards + `claims.ts` text edits — and are not expected to
  affect lint/test/build, but that expectation is unverified here) and
  handle the actual `git commit`/`push`.

**2026-07-16 — Sonnet 5 — queue #16 citation-verification pass (Beth-shan archaeological-horizon)**
Ran the fourth of the three-parallel-agent citation gates on this branch
(queue #13/#17 were the other two — #17 already resolved above by a sibling
session; #13 still open, untouched by this pass). Real web research (no
primary-copy access to the Hebrew University Beth-Shean excavation-report
monographs, as expected), producing a genuine, useful finding: Amihai Mazar
published his own popular-level synthesis addressing exactly this narrative-
vs-archaeology question — "Was King Saul Impaled on the Wall of Beth Shean?",
_Biblical Archaeology Review_ 38.2 (2012) — corroborated across multiple
independent secondary quotations (not accessed via the paywalled original;
flagged `TO VERIFY` in the new source card).

- **(a) Stratum/level**: the relevant post-garrison Iron I horizon runs
  through the levels Rowe/James numbered Level VI into Level V; absolute
  dating stays inside the unresolved high/low chronology debate (register #5)
  — no calendar date asserted. `claim-beth-shan-town-form` updated.
- **(b) Fortification-wall evidence**: the disclosed gap was _understated_,
  not overstated — Mazar's own conclusion is that no fortification wall of
  _any_ excavated period (not just Iron I) has been found at the site, and no
  distinctive Philistine material culture is attested in the relevant stratum.
  `claim-beth-shan-wall`'s notes corrected to state this more precisely/
  strongly.
- **(c) Egyptian monuments**: clears. Multiple independent secondary sources
  describe a "Monuments Courtyard" fronting the twin-temple complex (Seti I
  stelae, a Ramesses II stela, the reused Ramesses III statue found together),
  read as deliberate post-garrison curation/display — a real, repeated finding
  in the literature, not one interpreter's inference. `claim-egyptian-
monuments`/`asset-egyptian-monuments` updated to drop this as a release-
  blocking gap; only fine-grained sub-phase timing remains unverified.
- **(d) Rowe's Level V twin-temple = Ashtaroth/Dagon identification**:
  confirmed as genuinely unresolved/contested, not settled either way —
  secondary sources consistently frame it as Rowe's own proposal, and Mazar's
  renewed excavations independently reattribute the same temple complex to an
  earlier stratigraphic horizon ("Late Level VI"/Stratum S-2) than Rowe's
  Level V, unmooring his chronological correlation regardless of the deity
  question. `view-rowe-twin-temples-beth-shan` updated; the brief's omission
  of the temple stands confirmed as the right call.

Added 2 source cards (`mazar-2012-bar-saul-impaled`, `mazar-panitz-cohen-
2009-beth-shean-vol3`); narrowed `mazar-beth-shean-2006`'s confidenceNotes to
clarify it is specifically Volume I (tell-wide synthesis), distinct from the
two new, more precisely relevant cards. Updated `claims.ts` (`claim-beth-shan-
town-form`, `claim-egyptian-monuments`, `claim-beth-shan-wall`, `claim-armor-
ashtaroth`'s Rowe scholarlyView, `claim-beth-shan-control`) and
`assets.ts` (`asset-egyptian-monuments`). Moved `fable-review-queue.md` #16 to
Resolved with the full four-part outcome. Updated `uncertainty-register.md`
rows #11/#12 to point at the resolution. Did not touch `scenes.ts`/
`milestones.ts` status fields (Fable-tier call, per this task's own scope
guard) — `beth-shan-walls` stays `in-progress` until a Fable pass confirms.

**Tooling note (same limitation as the #17 session above):** this session's
toolset had no shell/Bash access — could not run `npm run build:sources`,
`npm test`, `npm run lint`, or `git commit`/`push` directly. Observed
`sources/source-index.json` already correctly regenerated and consistent
with all 23 current source-card files (including this session's 2 new cards)
by the time this pass finished, apparently rebuilt by a concurrent sibling
session on this same branch — did not hand-edit it. `claims.ts`/
`fable-review-queue.md`/`uncertainty-register.md` were each re-read
immediately before editing after hitting stale-file errors mid-pass (sibling
#13 session's concurrent edits), and edits were re-targeted at small unique
anchor strings to apply cleanly without clobbering their work — no conflicts
found on inspection. Whichever agent/session next has shell access on this
branch should run the full `npm run verify` gate (this pass's changes are
docs/data-only — 2 new JSON source cards + `claims.ts`/`assets.ts` text edits
— not expected to affect lint/test/build, but unverified here) and handle
`git commit`/`push` for this work alongside the sibling sessions' own commits.

**2026-07-16 — Sonnet 5 (researcher) — queue #13 citation-verification pass (Philistine feathered headdress, third of three parallel researcher passes with #16/#17)**
Real web research on the Medinet Habu feathered-headdress attribution question.
Could not page-verify the headdress discussion specifically within
`king-stager-2001` or `yadin-1963` (no accessible full text/preview surfaced
exact pagination for either — both cards' `confidenceNotes` updated to record
the attempt and its limit). Did find three real, checkable, peer-reviewed
secondary sources that substantively narrow (not fully close) the question:

- Yasur-Landau, "The 'Feathered Helmets' of the Sea Peoples: Joining the
  Iconographic and Archaeological Evidence," _Talanta_ 44 (2012): 27–40 — joins
  the Egyptian relief evidence to independent Levantine finds (a bronze
  chariot linchpin from Tel Miqne-Ekron bearing the same headdress); the
  motif is absent from Egyptian art before/after the 12th century BCE, but is
  not solely an Egyptian invention.
- Stager & Mountjoy, "A Pictorial Krater from Philistine Ashkelon," in
  _Up to the Gates of Ekron_ (Crawford et al., eds., 2007) — a painted
  Philistine Bichrome krater from Ashkelon (Grid 38, Phase 18) depicting a
  warrior in the same headdress on locally made Philistine pottery, Stager's
  own "Philistine self-portrait" reading, dated to the "ripe" Bichrome phase
  (later 12th–11th century BCE).
- Master, "The Philistines in the Highlands: A View from Ashkelon,"
  _Jerusalem Journal of Archaeology_ 1 (2021): 203–220 — independently argues
  Philistine raiding presence in the central highlands is plausible in the
  late Iron I–early Iron IIA window (textual/settlement-pattern evidence, not
  material-culture iconography).

Net finding: the headdress is genuinely corroborated as Philistine
self-reproduced material culture, not only Egyptian propaganda art, extending
its directly attested range from c. 1175 BCE Medinet Habu into local
Philistine coastal-plain art through roughly the 11th century BCE — but every
direct attestation (relief, krater, linchpin) stays on the coastal plain and
in representational media; none reaches the highlands, the Iron I/IIA
transition, or excavated worn battle gear. The "worn at Gilboa" inference
remains a disclosed extrapolation from adjacent evidence, not a directly
attested fact. Added 3 source cards (`yasur-landau-2012-feathered-helmets`,
`stager-mountjoy-2007-ashkelon-krater`, `master-2021-philistines-highlands`);
rewrote `claim-philistine-kit`'s two `scholarlyViews` and `notes` with this
material; hand-reconstructed `sources/source-index.json` (23 cards total,
including 2 pre-existing cards — `mazar-2012-bar-saul-impaled`,
`mazar-panitz-cohen-2009-beth-shean-vol3` — that were already on disk but
missing from the index before this pass, i.e. drift unrelated to this task
that got fixed incidentally). Queue #13 narrowed, not resolved: moved from a
vague "unverified" citation gap to a precisely characterized one (genuinely
corroborated marker, chronologically/geographically adjacent, but no direct
highland/Iron IIA attestation) — left in the Open table with updated text;
did not touch `gilboa-battle`/M3 `status` fields (Fable-tier call).

**Tooling note (same limitation as the sibling #16/#17 sessions above):** no
shell/Bash access in this session — could not run `npm run build:sources`,
`npm test`, `npm run lint`, or `git commit`/`push`. Hit stale-file errors
mid-pass editing `claims.ts` and `docs/fable-review-queue.md` (concurrent
sibling #16 session moving its own queue item to Resolved at the same time);
re-read immediately before each write and re-applied against the freshest
content — no work clobbered on inspection, confirmed after the fact by
re-reading both files and `sources/source-index.json`. Whichever agent/session
next has shell access on this branch should run the full `npm run verify`
gate (this pass's changes are docs/data-only — 3 new JSON source cards +
`claims.ts`/`fable-review-queue.md` text edits + a hand-rebuilt
`source-index.json` — not expected to affect lint/test/build, but unverified
here) and handle `git commit`/`push` for this work alongside the sibling
sessions' own commits.

**2026-07-19 — Fable 5 — M3 release sign-off (status flips only; no geometry/claims/source-card changes)**
Fable-tier release pass over the three M3 gates left open by the 2026-07-16
citation-verification passes:

- **Beth-shan (`beth-shan-walls`) → `released`.** Queue #16 resolved
  2026-07-16 with the same disclosed-hedge pattern the project accepted at
  queue #4 (secondary corroboration on all four sub-questions; only narrow
  `TO VERIFY` pagination hedges remain, flagged on the source cards). Nothing
  new blocks; flip confirmed.
- **Jabesh (`jabesh-burial`) → `released`.** Queue #17 resolved 2026-07-16
  same pattern (Keil & Delitzsch + Gill named attributions, ad loc. 1 Sam
  31:12-13; ADR-009 funerary-burning extension already ratified at the M3
  sign-off). Flip confirmed.
- **Gilboa (`gilboa-battle`) → `released` — the actual judgment call (queue
  #13 moved to Resolved).** Ruling: "genuinely corroborated Philistine
  marker, chronologically/geographically adjacent but not directly attested
  at Gilboa" IS a sufficient citation basis given the render's shape. Core
  reasons: (1) the gate as opened asked whether the attribution was real at
  all — now answered by three peer-reviewed sources (Ashkelon krater, Ekron
  linchpin = Philistine self-representation, not Egyptian propaganda only);
  (2) the residual highland/Iron IIA gap is a permanent evidentiary state no
  research pass can close — a `released` gate should gate closable work, and
  the project's designed instrument for permanent uncertainty is the
  `scholarlyViews` dispute label, in place and precisely worded on
  `claim-philistine-kit` (basis `comparative-ane`, confidence `low`);
  (3) the inference is modest — a coastal force campaigning inland wearing
  its own documented gear, with Master 2021 independently supporting
  Philistine highland activity in this window; (4) released precedent
  already spans this band (unattested-but-narrated Beth-shan wall,
  `claim-battle-scale`'s disclosed chain, M2 camels behind a dispute chip);
  (5) principal-tier-only rendering keeps extent conservative. Riders: fold
  in any future highland attestation or published rejection; the
  `king-stager-2001`/`yadin-1963` page-check stays a narrow non-blocking
  `TO VERIFY`.
- **Real-hardware perf check (gilboa, high tier): ruled non-blocking,
  independent of the citation question** — upholding the 2026-07-16
  sign-off's own ruling. It is a device/rendering-quality rider (mitigations
  already named: quality tiers, fewer pose buckets, capsule LOD), not a
  historical-integrity gate; sandboxed relative measurement bounds it as
  non-catastrophic. Stays the top open item in `next-run.md`.
- **Cascade flips** per the 2026-07-16 sign-off's stated criterion ("flip all
  three scenes, M3, and the three features together") and M2 precedent:
  `M3` → `released`; `f-gilboa`/`f-beth-shan`/`f-jabesh` → `done`;
  `1sam-31` passage → `released`; `mount-gilboa`/`beth-shan`/`jabesh-gilead`
  locations → `released`. `f-dem-terrain` stays `planned` (explicitly
  non-gating per ADR-012/queue #12).
- Bookkeeping: queue Open table now empty (#13 → Resolved with full
  reasoning; status-flip note added covering #16/#17); `progress.md` M3
  section + `next-run.md` state block updated. `npm run verify` green
  (status-field/doc-only diff). Not committed — orchestrator reviews the
  diff and handles git.

**2026-07-22 — Sonnet 5 — M4 scope + 2 of 3 world-director briefs (Fable spend limit hit)**
Scheduled/automated continuation session. First action — spawning `fable-architect`
for the M4 scope call — errored immediately: "You've hit your monthly spend
limit." Proceeded under `docs/model-handoff.md`'s documented fallback (Sonnet
does the call, marks it provisional, keeps moving) rather than blocking.

Decided M4's 3-scene breakdown myself (queue #18, provisional): `ziklag-lament`
(2 Sam 1), `hebron-anointing` (2 Sam 2:1–7), `gibeon-pool` (2 Sam 2:8–32). M4's
4th goal (divided-kingdom context view) called as an atlas/map UI overlay, not
a 4th scene. Wrote `planned` `SceneDef` stubs into `scenes.ts` and wired
`2sam-1`/`2sam-2` `sceneIds` (mirrors the M3 stub-before-build pattern —
verified against `git show e5c555f` for the exact stub shape).

Delegated: `researcher` agent added `gibeon` (Tell el-Jib, settled) and
`mahanaim` (disputed, 2 low-confidence candidates) locations + 3 source cards
(had to add a second Mahanaim view myself — `coughenour-1989-mahanaim` — was
delivered with only 1 view, which fails `integrity.test.ts`'s disputed→≥2-views
rule). Two `world-director` agents (model overridden to `sonnet`, marked
provisional per that role's own stated fallback policy) wrote
`ziklag-lament-brief.md` and `hebron-anointing-brief.md` in parallel — both
landed cleanly, no edit conflicts on the shared `fable-review-queue.md` fold-in
(confirmed by both agents' own final checks). `gibeon-pool`'s brief is not yet
written — next up.

Gate green this session: format:check, lint, typecheck, 269 vitest, build
(had to run `npm install` first — fresh sandbox, no `node_modules`). E2e not
re-run (doc/data-only diff, no component code touched). Pushed to
`claude/focused-mccarthy-ybp2iz`, opened draft PR #42.

**2026-07-22 — Sonnet 5 — M4 briefs completed, all flagged characters/claims entered**
Continuation of the same session/branch. Third `world-director` agent
(model-overridden `sonnet`, same Fable-fallback policy) wrote
`gibeon-pool-brief.md` (2 Sam 2:8-32) — the last of the three M4 briefs.
Notable calls: `locationId: 'gibeon'` (Mahanaim narrated only, never built —
its disputed identification stays reference-only); the pool itself gets
real geometry on the strength of Pritchard's excavated rock-cut pool, but
flagged an open dating gap; scale kept deliberately smaller than Gilboa
(civil-war skirmish, not a national battle) except the 24 champions, who
render at literal 1:1 per the text's own number; Asahel's death — the
project's first named-character-kills-named-character rendering — sets a
documentary-distance/no-wound-geometry precedent per ADR-009, using the
text's own "stood still" reaction beat as the emotional pivot instead of a
graphic replay.

Filled every character/claim gap flagged across all three M4 briefs myself
(execution-tier, no Fable/world-director needed): `amalekite-messenger`,
`abner`, `ish-bosheth`, `joab`, `abishai`, `asahel` in `characters.ts`;
`claim-amalekite-messenger-account`, `claim-ish-bosheth-installed`,
`claim-gibeon-contest`, `claim-asahel-death`, `claim-abner-pursuit-halted`,
`claim-gibeon-pool-form` in `claims.ts` — each `basis: 'biblical-text'`
except the last (`archaeology`, low confidence, dating gap disclosed in
notes). Wired all three scene stubs' `claimIds` accordingly. One
self-inflicted bug caught by re-reading the diff before committing: my
first `claims.ts` edit landed the new claim object _after_ the array's
closing `];` instead of inside it (old_string matched only the exported
`CLAIMS_BY_ID` line, not the preceding bracket) — fixed before it could
break typecheck.

All three M4 briefs, all flagged data gaps, and the M4 scope decision are
now complete for this fallback pass — `docs/next-run.md`'s next real task is
building the scenes themselves. Gate green: format:check, lint, typecheck,
269 vitest, build. E2e still not re-run (still no component code touched).

**2026-07-22 — Sonnet 5 — ziklag-lament built (M4's first scene)**
Continuation of the same session/branch, past the briefs-only work above.
Since scene builds are ordinary Sonnet-tier work (`docs/model-handoff.md`
routes scene implementation within already-set direction to
`threejs-engineer`, not Fable) and Fable's quota was still exhausted,
proceeded straight to building `ziklag-lament` per its brief rather than
stopping at briefs-only.

`threejs-engineer` built the scene in one pass: new `src/scenes/ziklag-lament/`
folder (reuses `ziklag` terrain/vegetation, deliberately drops
`SmokeColumns` for the "recovering, not burning" damage state per the
brief), 17 beats / 3 viewpoints in `scenes.ts`, six new claims plus
`scholarlyViews` added to `claim-amalekite-messenger-account` (the brief's
two "e.g."-hedged readings on why the messenger's account might not match
`gilboa-battle`'s own narration), a new `asset-royal-tokens` placeholder,
`2sam-1` flipped `planned` → `in-progress`. The brief's hardest constraint —
never visually corroborating the Amalekite's claim to have killed Saul —
is enforced by a dedicated test, not just a caption convention. Exactly 3
ESV quotes spent (248 chars total, well under the 500 budget), verified by
the build agent's own script against the file content it wrote (not
against a live ESV source — this sandbox has no outbound access to
Bible-text sites, confirmed via proxy status).

Orchestrating session independently re-ran the full gate rather than
trusting the build agent's self-report: format:check, lint, typecheck, 287
vitest (18 new), build all pass, confirmed directly. Also independently
recalled/cross-checked the three ESV quotes (1:23, 1:26, 1:27) against my
own knowledge of the text — reads as correct ESV phrasing, but flagged in
`next-run.md` as still wanting a live-source check before `released`, since
model recollection isn't the same guarantee as checking the actual text.
Flipped `f-2sam` feature `planned` → `in-progress`. `docs/next-run.md`
updated; two scenes (`hebron-anointing`, `gibeon-pool`) and the atlas/map UI
overlay remain for M4, plus four open citation gaps and the still-pending
real Fable pass on queue #18.

**2026-07-22 — Sonnet 5 — hebron-anointing built (M4's second scene)**
Same session/branch, continuing straight to the next scene build since
scene implementation doesn't need Fable. `threejs-engineer` built
`hebron-anointing` (2 Sam 2:1–7) per its brief in one pass: new Judean-
highland `TerrainSpec` (5th regional palette), 6 beats/4 viewpoints, 8 new
claims, new `men-of-judah` group character, `≈303`-figure high-tier cast
(72 David's-men + 45 household + 180 assembly + 6 principals) — matching
the brief's ~250–310 target. The largest crowd (`JudahAssembly`, ~150–200
figures) is fully static/baked, deliberately cheaper per-figure than
Gilboa's animated combat crowd, per the brief's performance guidance.

Independently re-verified before committing (not just trusting the build
report): full gate (format/lint/typecheck/315 vitest/build/8-8 e2e) re-run
directly, plus a targeted grep confirming the "house of Judah, not Israel"
qualifier appears on every anointing-beat caption and that no
Abner/Ish-bosheth/Mahanaim geometry exists anywhere in the new scene
folder (`poses.ts` even carries an explicit code-comment stating this
constraint).

Caught and resolved a real discrepancy: the build agent bumped `2sam-2`'s
passage status to `in-progress` (mirroring what happened for `2sam-1`
after `ziklag-lament`), but flagged that it couldn't reconcile this against
what it read as the established `1sam-31` precedent. Checked
`git log -p -- src/data/passages.ts` myself: `1sam-31` actually stayed
`planned` through all three M3 scene builds and jumped straight to
`released` at the end — never bumped incrementally. Judged that pattern an
oversight, not deliberate policy (scenes/features/milestones all use
`in-progress` as a real intermediate state elsewhere), and kept the new
`in-progress`-per-scene-progress convention going forward rather than
reverting to match the accidental precedent. Documented the reasoning in
`next-run.md` so it doesn't get re-litigated as a bug next session.

Gate green: format:check, lint, typecheck, 315 vitest, build, 8/8 e2e.
`docs/next-run.md` updated. One scene (`gibeon-pool`) and the atlas/map UI
overlay remain for M4.

**2026-08-02 — Fable 5 — M4 review pass (queue #18 resolved, #19 opened)**
First real Fable session to touch M4; genuine review, not a rubber stamp.
Read all three briefs, spot-checked all three builds (scenes/claims/
characters/locations + load-bearing scene code: ziklag-lament's
no-corroboration pose test, gibeon-pool's reversed-grip/stood-still poses
and no-uniform Contingent palette, hebron's qualifier captions). Verdicts:
(1) 3-scene breakdown CONFIRMED — text's own seams; no Mahanaim scene
(disputed site, 3 verses, no stageable action). (2) Atlas-overlay call for
the 4th goal CONFIRMED — divided-kingdom content is inherently cartographic;
a 3D territory render = invented borders = ADR-011's "unsourced invented
certainty"; ui-engineer green-lit with constraints in #18's resolution row
(soft regions, no border lines, Mahanaim dispute surfaced, schematic claim,
toggleable). Map-table-in-scene rejected as anachronism. (3) All three
briefs approved; gibeon-pool's 8→5 claim consolidation approved (2:32 is a
text-only card, no claim needed). (4) Asahel template ratified into ADR-009
§Named-character killings. Fixes applied at review: gibeon-pool retitled
(Abner/Joab, not the never-staged Ish-bosheth); ziklag-lament b-account
caption de-asserted ("the narrative's own account", not "how Saul actually
died" — checklist's narrated-not-asserted rule); register row #15 added
(pool dating — brief asked for it, build missed it); M4 → in-progress
(was still 'planned' despite 3 built scenes). Release: all 3 scenes stay
in-progress on queue #19's four closable citation gates (messenger-account
named attributions + ESV live wording check; Tell Rumeida town-form;
Pritchard pool dating) per the M3 #16/#17 precedent. Passage-status
in-progress convention confirmed. Docs synced: progress.md, next-run.md,
queue, register, ADR-009. Targeted re-verify after edits (data tests +
typecheck + format) — see commit.

**2026-08-02 — Fable 5 — M4 release pass (status flips only; no geometry/claims/source-card changes)**
Executed the cascade queue #19 flagged for Fable judgment. Ruling: all four
#19 closures sufficient for release. (a) Gill/Keil named attributions +
McCarter card = #17 precedent met; (b) live ESV check fixed a real 1:26
wording error, budget 249/500; (c) Tell Rumeida = the actual judgment call:
three citable sources (Ofer 1993, Eisenberg & Ben-Shlomo 2017, Ussishkin 2021) genuinely checked and converging on CONFIRMING the 11th-10th c.
town-form gap — the #13 permanent-evidentiary-state standard applies; a
released gate should gate closable work, and claim-hebron-town-form's
disclosed design-placeholder surviving a real research pass is a valid
release state (beth-shan-wall precedent). (d) pool construction dated
Iron I/10th c. affirmatively, confidence low→moderate. Verified /atlas
overlay landed (AtlasPage + route + nav + schematic claim + tests) before
treating M4 complete. Spot-checked gibeon-pool's design-placeholder scale
claims (claim-gibeon-battle-scale parallel to the #14-approved
claim-battle-scale form) — no extra scrutiny needed beyond #18's approval.
Cascade flips: 3 scenes → released; M4 → released; f-2sam → done;
2sam-1/2sam-2 → released; hebron/gibeon → released; ziklag → released
(found in-progress despite both scenes now released — M1/M2-era oversight,
flipped per jabesh-gilead precedent that disputed identification doesn't
bar location release). mahanaim stays planned (deliberate). Non-blocking
riders carried forward: real-hardware perf, Pages-live, TO VERIFY hedges.
Re-verified #19's no-shell follow-up: `npm run build:sources` regenerates
byte-identical index. Docs synced: queue status-flip note, progress.md M4
section, next-run.md (top item now M5 scoping). Full verify gate re-run
green after the flips.

**2026-08-03 — Fable 5 — M5 scope + world-director pass (briefs only, no build)**
Defined M5 per next-run's top item. Scope ruling: **M5 = 2 Sam 3–4 bundled**
(M4 precedent) — ch. 4 alone too thin (murder site = unbuildable disputed
Mahanaim; only the Hebron judgment stages), 3–4 one narrative unit closing
the house of Saul at 4:12, all staged action at already-built Hebron
(geometry amortized). M6 starts at 2 Sam 5. Scene breakdown: 3 scenes, all
Hebron, + /atlas phase extension (not a 4th scene, per the M4 atlas
precedent — 3:1's long-war trend is cartographic content). Briefs written:
hebron-covenant (3:1–21, staged from 3:20; Michal/Paltiel + Rizpah
accusation cards-only — text never places Michal at the feast; Bahurim
unbuilt; 20 men literal 1:1), hebron-gate (3:22–39; ADR-009 named-killing
template 2nd application — aside-into-the-gate as the shown gesture, strike
at documentary distance, David's words as the reaction beat; motive
(vengeance vs. rival-elimination) + Davidic-apologia dispute as
scholarlyViews, never captioned as fact; gate = modest chambered
design-placeholder, no six-chamber over-claim; medieval Tomb-of-Abner
tradition not adopted; refuge-city irony only if a named citation lands),
hebron-reckoning (2 Sam 4; murder cards-only incl. 4:6 MT/LXX divergence;
head = covered bundle only; hands/feet display caption-only under ADR-009's
unconditional dismemberment bar; pool of Hebron = gibeon-pool-convention
basin, Birket es-Sultan rejected; 4:10 Ziklag cross-link is the text's own).
M5 entry added to milestones.ts (planned, with scope-reasoning comment).
Researcher gaps flagged in next-run (McCarter→2 Sam 3–4 extension, Herzog
gate typology, King-Stager feasting/mourning, Hebron water installations) —
none block builds. No queue items opened: contested calls resolved this
pass, recorded in briefs. Docs synced: next-run.md (new top state + build
order: covenant → gate → reckoning → atlas), progress.md M5 section. No
code/scene/claim changes; no verify run (data edit is one additive
milestone entry; orchestrating session gates before merge).

**2026-08-10 — Sonnet — build hebron-covenant (2 Sam 3:1-21, first M5 scene)**
Branch claude/focused-mccarthy-97j7ef, commit 5e735e6, PR #55 draft
(against main, not yet merged). Build-only, per the already-approved
2026-08-03 Fable brief — no scope/creative decisions this pass. New scene
src/scenes/hebron-covenant/, status in-progress, depictsDeath: false,
~71 figures high-tier (Abner's 20 literal 1:1 + ~15-25 feast-side +
~20-30 ambient town). Reuses hebron-anointing's Hebron terrain/town-form
constants directly, no new terrain spec (hard continuity rule held).
New claims: claim-long-war, claim-abner-break, claim-abner-overture,
claim-covenant-feast, claim-feast-form (design-placeholder),
claim-covenant-cast-scale (design-placeholder). New referenced-only
characters michal/paltiel/rizpah (text-only per brief, no geometry). New
passage 2sam-3 (in-progress); hebron location sceneIds extended. New
asset asset-feast-props. 2sam-3 ESV budget: one quote used (3:21a),
rest reserved for hebron-gate's lament. Gate green: format, lint,
typecheck, 400 vitest, build, 9/9 e2e (orchestrating doc-sync session
independently re-ran full npm run verify + e2e with
PLAYWRIGHT_CHROMIUM_PATH set — confirmed, not just taken from build
report; plain `npm run verify`'s 9 e2e "failures" in this sandbox are
only the missing env var, a known pre-existing quirk, not a regression).
Doc sync this pass: next-run.md (new top state block + reordered
what's-next: hebron-gate next, then hebron-reckoning, atlas extension,
researcher pass, Fable M5 sign-off), progress.md M5 section. Checked
asset-roadmap.md (build agent's own hebron-covenant table already
adequate, no edit needed) and uncertainty-register.md (claim-feast-form/
claim-covenant-cast-scale are routine design-placeholder scale/form
claims, same category as claim-hebron-town-form/claim-anointing-rite-form/
claim-judah-assembly-scale which never got register rows either — register
convention reserves rows for genuine scholarly disagreement or unresolved
identification, not asset/design placeholders; no new row added, correctly
per the register's own "how to update" note). No src/ or docs/design/
changes this pass.

**2026-08-10 (cont.) — Sonnet — hebron-gate built (M5 scene 2/3, branch `claude/focused-mccarthy-97j7ef`)**
Built per docs/design/hebron-gate-brief.md, 2nd application of ADR-009's
named-character-killing template (1st: Asahel, gibeon-pool). Documentary
distance throughout, no wound/blood geometry in any mode, drawing-aside
gesture (3:27) the one staged specific detail, reduced mode elides the
strike entirely (poses.test.ts confirms: reduced-mode strikeLean stays 0
through the strike window, fallen lands measurably earlier than standard).
Curse content (3:29) stated plainly in caption, never visualized.
Refuge-city irony (Josh 20:7) deliberately omitted, no citation yet. Gate
= modest two-chamber passage, disclosed placeholder, not a monumental
six-chamber type. Reuses hebron-anointing/hebron-covenant's gate-plaza
continuity; one new structure (asset-hebron-gate-passage). ~127 figures
high tier (raid party ~22, mourning assembly ~79, ambient ~22, 4
principals), largest M5 scene, within the brief's 100-140 band. New
claims: claim-joab-return-protest, claim-abner-killing (scholarlyViews:
blood-vengeance-for-Asahel w/ legal complication noted, vs. political
rival-elimination, both hedged pending named citations),
claim-david-disavowal, claim-abner-funeral, claim-public-response
(scholarlyViews: apologia vs. plain-report, hedged pending
mccarter-1984-ii-samuel's extension to 2 Sam 3), claim-hebron-gate-form,
claim-abner-tomb-form (rock-cut entry, medieval Tomb-of-Abner tradition
explicitly not adopted), claim-gate-cast-scale. No new characters (reuses
david/joab/abner/abishai). 2sam-3 ESV budget: this scene spent the two
quotes reserved for it (3:33b-34a lament core, 3:38), shared-passage total
now three (the cap). New e2e test confirms the ADR-009 advisory fires for
hebron-gate specifically. Gate green: format, lint, typecheck, 444 vitest,
build, 10/10 e2e — independently re-run by the orchestrating session after
the build agent's own pass (not just taken from its report). Commit
`50f4253`, pushed to PR #55 (still draft).

Doc sync this pass: next-run.md (new top state block covering both built
M5 scenes, reordered what's-next: hebron-reckoning next, then atlas
extension, researcher pass, Fable M5 sign-off, plus a new non-blocking
rider — performance-reviewer pass on hebron-gate's ~79-figure procession
crowd, un-bucketed InstancedMesh per-frame updates, not yet confirmed to
scale cleanly), progress.md M5 section. No src/ or docs/design/ changes
this pass.

**2026-08-10 (cont.) — Sonnet — hebron-reckoning built (M5 scene 3/3, closes milestone, branch `claude/focused-mccarthy-97j7ef`)**
Built per docs/design/hebron-reckoning-brief.md, 3rd and strictest
application of ADR-009's named-killing template: hands-and-feet display
(4:12a) renders not at all, caption-only (grep-confirmed: no
geometry-producing code references hands/feet/dismemberment anywhere in
the scene folder; AssassinPose has no strike/gesture field at all, since
the text gives no method to invent). Head renders only as a small
covered/wrapped bundle. Murder (4:5-7) cards-only, no Mahanaim geometry;
4:6 MT/LXX entry divergence surfaced as scholarlyViews, hedged pending a
researcher pass. Deliberate textual twin of ziklag-lament (David retells
the Ziklag episode himself, 4:10) — cross-linked in claim notes. Reuses
hebron-anointing/hebron-gate's Hebron/tomb continuity; one new feature,
the pool of Hebron (gibeon-pool's exact basin convention, no shader,
Birket es-Sultan not adopted). ~33 figures high tier (attendants ~12,
ambient ~18, 3 principals), cheapest M5 scene by a wide margin. New
passage 2sam-4 (in-progress). New claims: claim-ish-bosheth-assassination,
claim-david-judgment, claim-hebron-pool-feature (design-placeholder),
claim-reckoning-cast-scale (design-placeholder). New characters: rechab,
baanah (staged), mephibosheth (referenced-only, confined to 4:4). Fresh
2sam-4 ESV budget: 4:11a + 4:10 fragment. Closing card checked directly
against its literal string: states only 4:12's fact, no 2 Sam 5+ content
anywhere. New e2e test for the ADR-009 advisory, completing coverage for
all three M5 scenes. Gate green: format, lint, typecheck, 478 vitest,
build, 11/11 e2e — independently re-run by the orchestrating session, not
just taken from the build report. Commit `9fa2784`, pushed to PR #55
(still draft).

**All three M5 scenes are now built.** Doc sync this pass: next-run.md
(new top state block covering all three scenes, what's-next now: atlas
extension → researcher pass → Fable M5 sign-off), progress.md M5 section.
No src/ or docs/design/ changes this pass.

**2026-08-10 (cont.) — Sonnet — atlas M5 phase extension built, checkpointed mid-slice at critical context, then finished (branch `claude/focused-mccarthy-97j7ef`)**
Built per next-run.md's top item, the last M5 build task. ui-engineer
agent added an M5 phase toggle to /atlas (AtlasPage.tsx, reusing
DividedKingdomMap): Judah's region unchanged from M4; Israel-writ region
gets a headless variant (fainter fill, no stroke/outline, "no king"
sub-label, never removed/reassigned/merged) for the house of Saul's ended
kingship (4:12), without asserting who holds the north next — 2 Sam 5
stays entirely out of scope, verified by dedicated structural test
assertions (exactly two regions, no stroke on the headless ellipse, "out
of scope" disclosure present). New claim claim-atlas-m5-phase
(design-placeholder, cross-references rather than re-derives
claim-long-war/claim-abner-break/claim-abner-killing/
claim-public-response/claim-ish-bosheth-assassination);
claim-divided-kingdom-atlas-overlay's notes updated to scope itself to M4
only. New AtlasPhase store state; DividedKingdomMap gained
regions/emphasizedIds/ariaLabel props (default to M4 values, M4 phase
pixel-unchanged).

Session hit critical context (96%) mid-build, while the ui-engineer agent
was still actively writing files concurrently in the working tree —
checkpointed in five small commits as files landed (30d1ea2 atlasRegions
data, a8734eb store/map/claim plumbing, 0e5f446 AtlasPage.tsx with 2
known-failing tests explicitly flagged, c9fa57c doc note, aba27e6 test
fix once the agent's own iteration resolved the false-positive regex,
37cee59 e2e coverage). Each commit was independently re-verified
(typecheck/lint/format at minimum) before committing, even the
known-broken 0e5f446 checkpoint (committed anyway per checkpoint-protocol
"never lose work" — clearly labeled, not claimed as gate-green). Final
state re-verified in full after the agent's last file landed: format,
lint, typecheck, 484 vitest, build, 12/12 e2e (new atlas-M5-phase e2e
test included) — all green.

**All M5 build work is now done: three scenes + the atlas extension.**
Doc sync: next-run.md (atlas item marked done, resume point now the
researcher pass), progress.md, this entry. Remaining M5 work: researcher
pass on five gap clusters, then Fable M5 sign-off.

**2026-08-10 (cont.) — Fable M5 sign-off attempted, hit monthly spend limit**
Launched a fable-architect review for M5's sign-off (all 3 scenes + atlas
extension built and gate-green, per the entries above). First call failed:
"You've hit your monthly spend limit." Same recurring constraint as the
2026-07-22 M4 precedent (docs/next-run.md's then-current entry, model-
handoff.md's documented fallback policy: batch the Fable pass, don't spend
a partial session chasing it once the limit is hit). Unlike that prior
incident, M5's three briefs were already Fable-authored (2026-08-03, before
any spend-limit issue) and all three builds are plain implementation of
those already-approved briefs — so no Sonnet-fallback scope/creative
judgment is needed here, only the sign-off review itself. Not attempting a
Sonnet-authored substitute for that review. All M5 scenes/atlas extension
stay `in-progress` (their correct default status regardless of sign-off
timing, same as every prior milestone's builds before their own sign-off
passes). Next session: retry the Fable M5 sign-off once the spend limit
resets — see docs/next-run.md.

**2026-08-10 (cont.) — Opus 5 (standing in for Fable, user-directed) — M5
sign-off review (branch `claude/focused-mccarthy-97j7ef`, PR #55 draft)**
Full `docs/fable-review-checklist.md` pass over `hebron-covenant`,
`hebron-gate`, `hebron-reckoning`, and the `/atlas` M5 phase. **Model note:
Fable's monthly spend limit was still hit (see the entry above), and the
user explicitly directed that this review run on Opus in Fable's place.
This is a deliberate, authorized model substitution — a full Fable-tier
pass, NOT provisional in the 2026-07-22 sense, and it does not create a
follow-up "needs a real Fable re-review" item.** Reviewed against the
actual data and code, not the doc summaries: all 18 new M5 claims in
`claims.ts`, all three scenes' beat captions in `scenes.ts`,
`hebron-reckoning/poses.ts`, `hebron-gate/poses.ts` + `poses.test.ts`,
`MourningAssembly.tsx`, all three `entities.ts`, `AtlasPage.tsx`,
`atlasRegions.ts`, `DividedKingdomMap.tsx`, the new character entries, and
ADR-003/ADR-009's own text.

**Verdict: milestone approved as built. M5 flips `planned` → `in-progress`,
not `released`** — release gates on new queue **#20**'s five closable
citation/verification items, exactly the M3 #16/#17 and M4 #19 pattern. All
three scenes and both passages stay `in-progress`; `hebron` is already
`released` from M4 and needs no flip.

Checklist findings. **Historical plausibility PASS** — every rendered
element claim-traced; `biblical-text` claims consistently phrased as what
the narrative states, not as fact (spot-checked the hardest cases:
`claim-abner-break` explicitly says the text does not state whether
Ish-bosheth's accusation was true; `claim-public-response` states the
people's conclusion as the narrative's own insistence). Both genuinely
contested questions are non-adjudicating `scholarlyViews` — Joab's motive
(`claim-abner-killing`, with the legal complication that Asahel died in
open battle noted inside the vengeance view rather than smuggled in as
editorial), and apologia-vs-plain-report (`claim-public-response`).
Confidence ratings survive a second read; the design-placeholder/speculative
pairs (`claim-feast-form`, `claim-hebron-gate-form`, `claim-abner-tomb-form`,
`claim-hebron-pool-feature`, three cast-scale claims, `claim-atlas-m5-phase`)
are all correctly rated and none is dressed up. **Anachronism PASS** — the
modest two-chamber gate deliberately not a six-chamber Solomonic type; the
medieval "Tomb of Abner" tradition and Birket es-Sultan both explicitly
not adopted, with the reason stated in each claim; no banquet-hall
architecture invented, which would have silently upgraded the released
`claim-hebron-town-form`; no Mahanaim geometry anywhere. **Visual coherence
PASS** — all three scenes scale figure counts off `profile.figureCount`
(ADR-004), so quality modes reduce cast rather than only shading; beat times
in `poses.ts` match `scenes.ts` exactly. **Performance PASS, rider
downgraded** — `MourningAssembly.tsx`'s ~79-figure un-bucketed
`InstancedMesh` is one draw call updating 79 matrices per frame with no
per-figure walk cycle; that is an order of magnitude under `gilboa-battle`'s
~325 animated figures across 6–8 buckets, which is the measured precedent.
The mourners genuinely move (gather → procession → tomb), so baking them the
way `hebron-anointing`'s static `JudahAssembly` is baked isn't available.
Ruled **not a concern and not a release rider**; the flagged
`performance-reviewer` pass is optional, not required. Bundle re-checked:
`ObservePage` chunk 302.79 kB / 79.40 kB gzip, no concern. **Tests PASS** —
484 vitest green at review start, 48 files. **Source traceability PASS with
the known hedges**, which queue #20 now tracks. **ADR-011 PASS** — the only
new affordance is the `/atlas` phase toggle: orientation/learning, on the
allow-list, defaults to the already-reviewed M4 phase, and the shading is
independently dismissible. No fantasy systems, no win/loss framing, no
player-driven combat; both killings stay scripted reenactment.

**ADR-009 bar verified in code, not from the build report.**
`hebron-reckoning`'s `AssassinPose` carries only `presented`/`fallen` — no
strike/gesture field at all — and the only hands/feet/dismemberment strings
anywhere in the scene folder are comments and captions. The
no-invented-method restraint (stricter than `gibeon-pool`'s reversed grip
and `hebron-gate`'s strike lean, because 4:12a supplies no method) is
**ratified as the correct reading of ADR-009** for any future killing the
text narrates without method detail. `hebron-gate`'s reduced mode confirmed
by `poses.test.ts`: `strikeLean` stays 0 through the strike window and the
fall lands measurably earlier. David's curse (3:29) is caption-only in both
modes.

**Two real defects found and fixed at this review** (neither was in any doc
summary — both required reading the code): **(1)** `/atlas`'s M5 lede
presented a paraphrase of 2 Samuel 3:1 inside quotation marks with a verse
citation. The wording ("grew steadily stronger… grew steadily weaker")
matches no translation — ESV reads "There was a long war… And David grew
stronger and stronger, while the house of Saul became weaker and weaker."
Rewritten as unquoted narration. It had also slipped the ESV budget entirely,
because `integrity.test.ts` scans passage `keyExcerpts` and scene beat
captions but never page copy — so **ADR-003 amended** (quoted-means-verbatim;
page/UI copy is a third budgeted surface, budgeted per page rather than
pooled per passage, since pooling would retroactively break released M4
content; automation deferred as an explicit manual-review responsibility,
same standing as the existing summary-paraphrase note, and folded into #20).
**(2)** `atlasRegions.ts`'s user-visible M5 legend caption and two doc
comments described the headless region as "shown fainter with a dashed
outline," but `DividedKingdomMap.tsx` renders `stroke="none"` on both
variants deliberately, and a test asserts it — the caption was advertising a
border-like encoding the no-hard-edge discipline specifically forbids.
Corrected to "a fainter fill and no outline added."

Build-agent-flagged judgment calls, both **approved as shipped**:
`hebron-covenant`'s northern approach staged from the west (-x) is a
disclosed legibility choice — `layout.ts` states it asserts no compass
bearing, and the caption says "from the direction of Israel and Benjamin"
rather than naming one, which is the honest phrasing; `hebron-gate` reusing
`asset-bier-props` instead of minting `asset-bier` is right, since the bier
is the wrapped-form + prop convention ADR-009 already ratified and a
duplicate id would assert a distinction that doesn't exist.

Other changes made at this review: **`f-2sam-3-4` feature added**
(`in-progress`, M5) — M5 had no feature entry at all, so its scene work was
invisible on the Features page; M4's `f-2sam` is scoped "2 Samuel 1–2
scenes" and already `done`, so it could not be reused. **Register rows #16
(Joab's motive + the apologia question) and #17 (the 4:6 MT/LXX
divergence)** added — both meet the register's own "genuine scholarly
disagreement" criterion and neither had a row. Scene comments in `scenes.ts`
updated to record the verdict and drop the "provisional" wording. Docs
synced: queue (#20 opened), progress.md, next-run.md, ADR-003, register.
Gate re-run after all edits: format, lint, typecheck, 484 vitest, build —
green. No commit/push (the orchestrating session re-verifies and handles
git).

**Path to `released`:** clear queue #20's five items via a `researcher`
pass, then a short confirmation flip of the three scenes, `2sam-3`/`2sam-4`,
`f-2sam-3-4` → `done`, and M5 → `released` together, per the M3/M4 cascade.

**2026-08-12 — Sonnet 5 — queue #20 fully closed (researcher pass + live ESV
check + ADR-003 decision); M5 release flip handed to Fable**
Scheduled continuation session. Dispatched a `researcher` agent for queue
#20(a)-(d): `mccarter-1984-ii-samuel` extended to 2 Sam 3–4 (new card
`mccarter-1980-apology-of-david` cited directly on `claim-public-response`'s
apologia view; `claim-abner-killing`'s rival-elimination view cites McKenzie
2000/Halpern 2001 instead, since no page-verifiable McCarter statement on
that specific motive was found; `claim-abner-break` cites a new public-domain
card `ellicott-commentary-1878`; `claim-ish-bosheth-assassination`'s 4:6
MT/LXX divergence closed **checked, permanently thin** for attribution).
`herzog-1997` and `king-stager-2001` both landed real, previously-unchecked
coverage: `claim-hebron-gate-form` and `claim-feast-form` both moved
`design-placeholder` → `comparative-ane`/`low` (renderings unchanged either
way, per the queue's own instruction). `claim-hebron-pool-feature` closed
**checked, permanently thin** — no Iron Age water installation is reported
anywhere at Tell Rumeida/Hebron; Birket es-Sultan independently reconfirmed
as 1283 CE Mamluk, stays not adoptable. Four new source cards total.

That agent had no shell tool, so its `sources/source-index.json` update was
hand-built and its `npm run build:sources`/`npm run verify` were unrun — the
orchestrating session ran both directly: `npm install` first (missing
`node_modules`), then `build:sources` (regenerated index differed slightly
from the hand-built one), then `npm run verify` — caught two real Prettier
violations in the researcher's own edits (`docs/fable-review-queue.md`,
`sources/source-cards/mccarter-1984-ii-samuel.json`), fixed, then full gate
green: format, lint, 484 vitest, build, 12/12 e2e (needed
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`,
the standing sandbox note — the pinned Playwright build number had drifted
again). Spot-checked the actual diffs against `claims.ts`/the new source
cards before trusting the agent's self-report, per this project's standing
practice — reasoning held up: hedges only where genuinely unattributed,
"checked, permanently thin" only where the search pass came up empty, no
forced upgrades.

Also closed **queue #20(e)**, open since 2026-07-14: this session's
`WebSearch` tool reached live Bible-text sites via search-result snippets
even though direct `WebFetch`/`curl` to biblegateway.com/esv.org still 403s
from this sandbox (confirmed again) — the same asymmetry the #19b pass
noticed once before. Checked all five M5 quoted spans (3:21a, 3:33b–34a,
3:38, the 4:10 fragment, 4:11a) against live ESV text: all five matched
verbatim, including the two fragments' truncation points. No wording errors
this time (unlike #19b, which found a real one). Decided the ADR-003
automation rider without building anything: keep it manually enforced —
an automated `.tsx` quoted-string scanner risks false positives without a
disproportionate amount of tooling for a non-blocking rider, per the
2026-07-07 standing priority note to deprioritize heavy test-writing.

Moved queue #20 from Open to Resolved in `docs/fable-review-queue.md` (all
five items + the ADR-003 rider closed, nothing left open under it); synced
`docs/next-run.md` and `docs/uncertainty-register.md` #16/#17.

**Did not flip M5 → `released` this session.** Per the M3 (2026-07-19) and
M4 (2026-08-02) precedent recorded in this same queue file, the release flip
itself was done by a **Fable release pass** both prior times, not a bare
Sonnet confirmation, even after Sonnet closed the citation gates feeding it
— so this is handed to `fable-architect` next in this same session rather
than flipped directly.

**2026-08-12 — Fable — M5 release pass: queue #20 closures confirmed, M5
released**
Confirmation pass per the M3 (2026-07-19)/M4 (2026-08-02) release-pass form.
Spot-checked the queue-#20 claim edits directly in `claims.ts` (not just the
queue row): apologia view cites McCarter 1980 by name; rival-elimination view
cites McKenzie/Halpern rather than forcing McCarter onto an unfound
statement; `claim-hebron-gate-form`/`claim-feast-form` land at
`comparative-ane`/`low` with regional-not-site-specific limits disclosed and
renderings unchanged (no forced upgrades); the two "checked, permanently
thin" closures (Hebron pool, 4:6 attribution) are genuine negative findings
per the #13/#19c standard. Ruling: sufficient for release. Cascade executed:
`hebron-covenant`/`hebron-gate`/`hebron-reckoning` → `released`;
`2sam-3`/`2sam-4` → `released`; `f-2sam-3-4` → `done`; `M5` → `released`.
`hebron` location unchanged (already `released` from M4, comment already
covers per-scene independence). Status-flip note added to
`docs/fable-review-queue.md`; `docs/next-run.md` top block updated (next:
carried-forward non-blocking riders — real-hardware `gilboa-battle` perf
check + Pages-live check — then M6 scoping, a Fable pass). Full verify gate
re-run green after the flips. Committed on `claude/focused-mccarthy-hwagel`
(push + PR #57 update left to the orchestrating session).

---

**2026-08-23 — Fable (world-director) — M6 scope pass, briefs written, no
build yet**
Scheduled/automated session. Baseline verified clean first (`npm install` +
full `npm run verify`: format, lint, 484 vitest, build, 12/12 e2e, all green)
before any new work, per the M5-release starting state. Dispatched
`world-director` (Fable-tier) to scope M6 (2 Samuel 5), following the
M2–M5 scope-pass pattern. Result: **M6 resolves to two scenes + an atlas
extension**, entered `planned` in `src/data/milestones.ts`:

- `jerusalem-stronghold` (2 Sam 5:6–16) — the milestone's load-bearing scene:
  Jebusite stronghold capture, the _tsinnor_ crux (rendered as a genuine
  unresolved crux — no capture-route/water-shaft geometry in any mode, ever),
  the Millo (named as a question, never labeled in geometry), City of David
  naming, Hiram's cedar/craftsmen folded in as a construction-not-palace
  closing beat. `depictsDeath: false`. Brief:
  `docs/design/jerusalem-stronghold-brief.md`.
- `rephaim-valley` (2 Sam 5:17–25) — both Philistine engagements as one
  two-phase scene (contrast is the point), deliberately lighter violence
  than `gilboa-battle` (no melee choreography, no fight-stance pose buckets,
  no invented divination apparatus, no visualized divine sign at 5:24 — the
  sign is stated on-screen, never rendered). `depictsDeath: true`, ADR-009
  advisory wired. Brief: `docs/design/rephaim-valley-brief.md`.
- 5:1–5 (all-Israel covenant/anointing at Hebron) gets **no fourth Hebron
  scene** — cards + a `/atlas` M6 phase instead (Hebron→Jerusalem capital
  shift, two regions unify), per the 2026-08-02 M4 ruling that this kind of
  political-geography change is atlas work. Logged as queue #21 for
  confirmation at the M6 review; cheaply reversible since Hebron geometry
  already exists.

Four new fable-review-queue items opened (none block build work): **#21**
the 5:1–5 treatment above; **#22** a source-card gap cluster (the project
has no Jerusalem/Jebusite-period card at all — Millo, _tsinnor_ philology,
Rephaim/Baal-perazim geography, Phoenician cedar trade, the unidentified
_bĕkā'îm_ tree — folds into a future `researcher` pass, gates named
attributions only, not the builds); **#23** the _tsinnor_ identification +
the no-invented-capture-route rendering bar, extending the M5-ratified
no-invented-method restraint from killing-method to assault-method; **#24**
a new precedent needing ratification — narrated divine signs (5:24) are
disclosed by caption/stillness, never visualized, escalated since this is
the first time the project has faced this exact call.

Neither scene may render any 2 Samuel 6+ content (ark, dynastic oracle,
Bathsheba, temple), and neither asserts a chronological order relative to
the other (5:17's topical-arrangement possibility is disclosed, not
resolved) — both hard guards stated explicitly in both briefs and the M6
milestone comment. `docs/design/{jerusalem-stronghold,rephaim-valley}-brief.md`
follow the M5 briefs' structural format exactly (historical intent, visual
composition, scale assumptions — both scenes state explicitly that no
figure ratio is claimed since 2 Sam 5 narrates no counts, same as
`gilboa-battle` — camera/observer experience, performance target with a
hard cap at `gilboa-battle`'s high-tier instance count while its
real-hardware check stays open, required source basis, placeholder policy).
No code touched; `src/data/scenes.ts`/`claims.ts` untouched, per every prior
milestone's convention (scenes stay out of `scenes.ts` until a
`threejs-engineer` build pass). `npm run format` applied to the three
touched/new files (docs table padding), full `npm run verify` re-run green
after. Next: `researcher` pass on queue #22 (non-blocking, parallelizable),
then build `jerusalem-stronghold` first (per its brief, the milestone's
load-bearing scene — same build-hardest-scene-with-established-continuity-
first pattern is not applicable here since neither scene reuses existing
terrain, so order is per the brief's own read: Jerusalem's contested
citation load makes it worth building and reviewing first), then
`rephaim-valley`, then the `/atlas` M6 phase. Real-hardware `gilboa-battle`
perf check and the Pages-live check remain open, unchanged, still blocked
from this sandbox.

## 2026-08-24 — M6 build: both scenes + atlas extension + researcher pass, Sonnet-fallback sign-off (scheduled/automated session, branch `claude/focused-mccarthy-m17xzl`, PR #67 draft)

Baseline verified clean first (`npm install`; `npm run verify`'s e2e leg
needed `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
— the pinned Playwright version expects a `1228` browser build not
preinstalled here; `1194` is — 12/12 e2e green once pointed there). All four
M6 items built by dispatched subagents, each independently re-verified by
this orchestrating session (full gate re-run + targeted greps for every
brief's "Not allowed" list) before pushing, not just taken from the build
agent's own report:

- **`jerusalem-stronghold`** (`e1350dd`, `threejs-engineer`) — 2 Sam 5:1–16.
  ~120 figures high-tier (David's force ~50, Jebusites ~32, Tyrian
  craftsmen ~12, ambient ~25, David). New location `jerusalem`; 11 new
  claims; new characters `jebusites`/`hiram`/`tyrian-craftsmen`; new passage
  `2sam-5` (spends 2 of its 3-quote ESV budget: 5:6b, 5:8a). `depictsDeath:
false`. Grepped clean for shaft/tunnel/hook geometry, Joab, Hebron
  geometry, and any 2 Sam 6+ term. Gate: 509 vitest, 13/13 e2e.
- **`rephaim-valley`** (`994ec72`, `threejs-engineer`) — 2 Sam 5:17–25, one
  scene/two phases. ~131 figures high-tier (Philistines ~68 reused across
  both phases, David's force ~58, principals 5). New location
  `valley-of-rephaim` (Baal-perazim deliberately gets no `LocationEntry`);
  8 new claims; reuses `philistines`/`david`/`davids-band`, no new named
  characters. Spends `2sam-5`'s third quote (5:24). `depictsDeath: true`,
  standard/reduced-mode fork on both engagement beats, no fight-stance pose
  buckets. Grepped clean for divination apparatus, wind/light/canopy-signal
  language, Joab/Abishai, triumphal staging, and any 2 Sam 6+ term. Gate:
  536 vitest, 15/15 e2e.
- **Atlas M6 phase** (`b8e4e1c`, `ui-engineer`) — third `DividedKingdomMap`
  phase: the M4/M5 regions merge into one under a single king, capital
  marker moves Hebron→Jerusalem. New `claim-atlas-m6-phase`
  (cross-references, doesn't restate, the scene claims). M4/M5 phases
  confirmed pixel-unchanged (regression assertions in
  `AtlasPage.test.tsx`/`DividedKingdomMap.test.tsx`). Merge captioned as
  allegiance change, not territorial extent — grepped clean for stray
  border/extent language. Gate: 546 vitest, 16/16 e2e.
- **Queue #22 researcher pass** (`00d17b7`, `researcher`) — closed the
  Jerusalem-period source-card gap cluster; 7 new source cards,
  `mccarter-1984-ii-samuel` extended to 2 Sam 5. Full detail in
  `docs/fable-review-queue.md`'s #22 Resolved row. Agent had no shell tool
  this session (same limitation as the 2026-08-02 #19 pass) — hand-built
  `source-index.json` matched exactly what `npm run build:sources` produced
  when this session ran it for real; two prettier issues fixed before
  commit. `claim-jebusite-stronghold-form` raised
  design-placeholder/speculative → scholarly-reconstruction/low (no
  geometry change; both poles of the extent dispute now real citations).
  `valley-of-rephaim` gained `identification.disputed: true` (Kleiman 2024).

**Fable M6 sign-off: `fable-architect` hit its monthly spend limit on the
first call** (recurring — see 2026-07-22, 2026-08-10). Per
`docs/model-handoff.md`'s fallback, this session ran the sign-off itself:
confirmed #21 and #23 as built (independently re-checked against the actual
committed code, not just the queue's own framing), left #24 (the narrated
divine-sign depiction policy) open as genuinely Fable-tier — writing an ADR
under a fallback is exactly the kind of call the policy says to escalate,
not absorb. **No status flips made** — `jerusalem-stronghold`,
`rephaim-valley`, the atlas M6 phase, `2sam-5`, `jerusalem`,
`valley-of-rephaim`, `M6` all stay short of `released`, per the
model-handoff rule that a flagged open provisional decision holds the
status. Full detail and reasoning: `docs/fable-review-queue.md`'s
2026-08-24 note. A `performance-reviewer` pass on both new scenes (neither
build agent ran one, though both briefs asked for one) was dispatched
immediately after and is the last item this session did — see below.

**`performance-reviewer` pass (`28f517b`), dispatched after the sign-off
note above was written: found and fixed one real issue in each scene** —
`jerusalem-stronghold/poses.ts`'s `davidsForcePose` and
`rephaim-valley/poses.ts`'s `sampleCurvePose` both called
`curve.getPointAt`/`getTangentAt` with no `optionalTarget`, allocating two
throwaway `Vector3`s per figure per frame. Real GC pressure during exactly
the beat `rephaim-valley`'s brief flagged as "the only real risk in this
scene" (the flanking march, ~45-60 figures, sustained multi-second window).
Fixed by hoisting scratch vectors to module scope — the same
`tmpVec`/`tmpTan` pattern already used in `ziklag/ReturningMen.tsx` and
`ziklag-lament/poses.ts`. No behavior change (existing `poses.test.ts`
covers the pure functions); independently re-verified by this session:
546 vitest, 16/16 e2e, clean build, bundle size unaffected. Everything else
checked out clean (terrain budgets, instancing, static-crowd baking,
quality-tier scaling, no fight-stance buckets) — full detail in the
agent's own report if needed later.

Draft PR #67 tracks all of this on `claude/focused-mccarthy-m17xzl`.
User notified via push notification of the Fable outage and the fallback
plan mid-session.

**Next session's first priority: a real Fable M6 sign-off** once the spend
limit resets — rule on #24 first (ratify as-is / revise / promote to its
own ADR, since it will recur from 2 Samuel 6 onward), then re-confirm
#21/#23 and execute the release cascade if everything still holds. See
`docs/next-run.md` for the full next-run note.

## 2026-08-25 — M6 release: ADR-013 (queue #24), release cascade, branch `claude/focused-mccarthy-sqz8z0`, commit `075d765`

Closed the one item the 2026-08-24 build/sign-off session left open. Wrote
`docs/architecture-decisions/adr-013-narrated-supernatural-depiction.md`:
ratifies `rephaim-valley`'s "stated, never visualized" default (2 Sam 5:24)
as project-wide policy for any narrated divine/supernatural event with no
described physical mechanism. Scope note load-bearing for future milestones:
ADR-013 governs the supernatural _mechanism_ only — a text's own separately-
stated worldly outcome (e.g. Uzzah struck dead, 2 Sam 6:7) stays ADR-009's
call; the two ADRs compose, neither displaces the other. `claim-divine-sign-
depiction`'s notes updated to cite ADR-013 instead of carrying an open
ratification question. `docs/fable-review-queue.md`: #21/#23/#24 moved Open
→ Resolved (re-confirmed #21/#23 unchanged since 2026-08-24; #24 closed by
the ADR); Open table now empty.

Executed the M6 release cascade, same pattern as M3/M4/M5's release passes
(no Fable involved — retired project-wide 2026-08-24, see
`docs/model-handoff.md`; this is an ordinary Sonnet review-tier pass per
`docs/fable-review-checklist.md`): `jerusalem-stronghold`/`rephaim-valley`
→ `released`; `2sam-5` → `released`; `jerusalem`/`valley-of-rephaim` →
`released`; `M6` → `released`; new feature `f-2sam-5` added directly as
`done` (M6 had no feature entry at build time — same gap M5's sign-off
found/fixed for `f-2sam-3-4`).

Full `npm run verify` gate re-run green after the flips: format, lint, 546
vitest, build, 16/16 e2e (`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/
chromium-1194/chrome-linux/chrome` needed for e2e in this sandbox — pinned
Playwright wants a `1228` browser build, only `1194` preinstalled).

Carried forward, non-blocking: live ESV wording check for M6's three
quotes (5:6b, 5:8a, 5:24); real-hardware perf check of `gilboa-battle` +
Pages-live check (open since M3). M7 (2 Sam 6+) has no scope/briefs yet —
top priority next session, a scoping pass Sonnet runs directly.

Doc-sync pass (same session, no code changes): `docs/progress.md`,
`docs/next-run.md`, `docs/asset-roadmap.md` updated to reflect the release
(all three still described M6 as unreleased/pending Fable). Found and fixed
one pre-existing drift in `docs/asset-roadmap.md`'s "Upcoming needs by
milestone" M6 bullet: it claimed the `/atlas` M6 phase was "still
outstanding," but that phase was actually built 2026-08-24 (commit
`b8e4e1c`, same session as the two scenes) — a stale line that predated
this session's release, not something this release caused.
`docs/uncertainty-register.md` checked — its four M6-era rows (#18-21) are
genuinely open scholarly disputes independent of release status (tsinnôr
identification, Jerusalem's 10th-c. extent, the Millo, Rephaim's location),
none needed a "now released" update. `docs/model-handoff.md`,
`docs/sonnet-continuation.md`, `docs/fable-review-checklist.md` checked for
stale "wait for Fable" language — all three already fully reflect the
2026-08-24 Fable retirement, nothing to fix.
