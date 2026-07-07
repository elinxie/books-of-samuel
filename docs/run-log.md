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
