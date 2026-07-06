# Architecture

## Stack

- **Vite** + **React 19** + **TypeScript** (strict) — static SPA, builds to `dist/`.
- **three.js** + **@react-three/fiber** + **@react-three/drei** — declarative 3D scene graph in React. Chosen over raw Three.js or Babylon.js because R3F lets scene composition (settlement, vegetation, timeline-driven figures) stay in ordinary React components and hooks, which keeps the historically-driven data model (claims, sources, confidence) wired directly into JSX props instead of a separate imperative layer.
- **Zustand** — global UI/playback state (toggles, quality mode, scene time, nav mode). Chosen for near-zero boilerplate versus Redux/Context for this size of app; `persist` middleware keeps study-toggle and quality preferences across visits.
- **Zod** — runtime schema for `SourceCard` JSON. Source cards are hand-authored JSON files edited outside the type checker, so a runtime validator (checked in tests) catches malformed cards before they silently break claim resolution.
- **react-router-dom** (`HashRouter`) — hash-based routing avoids needing server-side rewrite rules on GitHub Pages, which only serves static files.
- **Vitest** + **@testing-library/react** — unit/data/state tests.
- **Playwright** — real-browser smoke tests (see Testing below).
- **GitHub Actions** — CI (lint/typecheck/test/build/e2e) and Pages deployment.

Any change to this stack is an architectural decision — see `/docs/model-handoff.md` for who may make that call.

## Directory layout

```
src/
  data/          Data model (types.ts) + seeded content (claims, passages, scenes,
                 locations, characters, routes, milestones, features, assets) + the
                 SourceCard loader (sourceCards.ts, reads sources/source-cards/*.json
                 via import.meta.glob).
  state/         Zustand store: study toggles, quality mode, nav mode, scene playback.
  engine/        Reusable 3D building blocks not specific to one scene: quality
                 profiles, procedural noise/terrain, first-person/orbit observer
                 controls, keyboard tracking.
  scenes/<name>/ One folder per scene: layout (deterministic placement data),
                 composition components (ground, structures, vegetation, actors),
                 scene-local entity/label definitions.
  ui/            Pages-agnostic UI: HUD panels, claim/legend display, shared chrome.
  pages/         Route-level components (Landing, Observe, Progress, Features,
                 Sources, Method).
sources/
  source-cards/  One JSON file per bibliographic source (schema in src/data/types.ts).
  source-index.json   Generated summary index (npm run build:sources).
docs/            Architecture, method, progress, and continuity documentation.
.claude/         Subagent definitions and slash-command playbooks for this project.
e2e/             Playwright smoke tests.
```

## Data model

Every visual element traces to a `ReconstructionClaim` (`basis` × `confidence`, optional
`scholarlyViews`, `sourceIds`). Scenes, locations, routes, and characters hold
`claimIds` arrays rather than embedding historical assertions inline, so the UI can
render "what's certain vs. reconstructed" for any object without duplicating text.
Full type definitions: `src/data/types.ts`. Rationale and stability: `/docs/architecture-decisions/adr-002-data-model.md`.

## Rendering approach

- **Terrain** is procedural (deterministic value-noise heightfield + vertex colors),
  not derived from real elevation data — this is a labeled placeholder
  (`asset-terrain-negev`) pending a DEM-based pass once a Ziklag candidate site is
  adopted for terrain purposes (Milestone 2).
- **Vegetation, rocks, and marching figures** use `InstancedMesh` so density scales
  with quality mode at near-constant draw-call cost.
- **Smoke** is a custom GPU point-sprite shader (vertex shader displaces particles
  along a swirl+drift path keyed by `uTime`), avoiding a per-particle CPU loop.
- **The scripted reenactment** (`ReturningMen.tsx`) is a pure function of scene time
  (`figurePose(t, ...)`) rather than an animation timeline library — this makes the
  choreography unit-testable (see `reenactment.test.ts`) and trivially scrubbable
  from the timeline UI.

## Quality modes

`src/engine/quality.ts` defines three profiles (`study` / `balanced` / `high`)
controlling fog distance, camera far-plane, device-pixel-ratio cap, shadow map size,
and instance counts for vegetation/rocks/figures/smoke. Components read the active
profile from the Zustand store; nothing hardcodes a density or draw distance outside
this file. See `/docs/architecture-decisions/adr-004-quality-modes.md`.

## Routing and code splitting

`ObservePage` (which pulls in three.js/R3F/drei) is lazy-loaded via `React.lazy`, so
the landing/progress/features/sources/method pages stay light even before the 3D
engine chunk is fetched.

## Deployment

`vite.config.ts` sets `base` to `/books-of-samuel/` (GitHub Pages project-site path),
overridable via `BASE_PATH` for local root-serving. `.github/workflows/deploy.yml`
builds and publishes `dist/` via `actions/deploy-pages` on push to `main`. One manual
one-time step is required in the GitHub repo settings: **Settings → Pages → Source:
GitHub Actions** (cannot be set via a workflow file).

## Testing layers

1. **Data integrity** (`src/data/integrity.test.ts`, `sourceCards.test.ts`) — every
   claim cites an existing source, every scene's references resolve, every
   placeholder asset documents why/requirements/replacement milestone, the ESV
   excerpt budget is enforced.
2. **State logic** (`src/state/store.test.ts`) — toggle independence, playback
   clamping, scene reset.
3. **Choreography** (`src/scenes/ziklag/reenactment.test.ts`) — the reenactment's
   pure pose function is checked at specific scene times against the beat timeline.
4. **Playwright smoke** (`e2e/smoke.spec.ts`) — real Chromium (software WebGL via
   SwiftShader) verifies the app loads, the observer scene renders, toggles/quality
   modes/replay controls work, and no console errors occur.

In this sandboxed dev environment, the pinned `@playwright/test` version expects a
browser build newer than the pre-installed one; `playwright.config.ts` reads
`PLAYWRIGHT_CHROMIUM_PATH` to point at `/opt/pw-browsers/chromium` when set. Regular
CI runners are unaffected (`npx playwright install` fetches the matching build).
