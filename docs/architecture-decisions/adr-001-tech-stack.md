# ADR-001: Technical stack

**Status:** Fixed. Changing this requires a Fable review (see `fable-review-queue.md`).

## Context

Needed a static, GitHub-Pages-deployable, browser-based 3D app, with a data model
expressive enough to carry historical confidence/basis metadata through to the UI,
buildable and testable by a coding agent across many short sessions.

## Decision

Vite + React 19 + TypeScript (strict) + three.js via @react-three/fiber + drei +
Zustand + Zod + Vitest + Playwright + GitHub Actions, `HashRouter` for static
hosting compatibility.

## Alternatives considered

- **Raw Three.js (no React)** — rejected: scene composition would live in an
  imperative layer disconnected from the data model and toggle UI, making the
  claim → visual traceability requirement harder to enforce and test.
- **Babylon.js** — rejected: comparable capability, but R3F's declarative
  component model fits this project's "every element traces to a claim" pattern
  more directly than Babylon's scene-graph API, and the R3F/drei ecosystem has
  broader community coverage for the instancing/shader patterns this project needs.
- **Redux / Context for state** — rejected: Zustand gives the same
  toggle/playback state with far less boilerplate at this app's scale.
- **BrowserRouter** — rejected: requires server rewrite rules GitHub Pages doesn't
  provide for a project site; `HashRouter` needs no server configuration.

## Consequences

- Bundle size is dominated by three.js/R3F/drei (~1.1 MB pre-gzip for that chunk);
  mitigated by lazy-loading `ObservePage` so static pages stay light. Tracked in
  `docs/architecture.md` and watched by the performance-reviewer subagent.
- Zod is a light runtime dependency solely for source-card validation — acceptable
  given source cards are hand-edited JSON outside the type checker's reach.
