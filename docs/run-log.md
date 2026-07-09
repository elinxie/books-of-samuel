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
