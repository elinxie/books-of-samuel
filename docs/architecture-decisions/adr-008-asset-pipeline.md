# ADR-008: Modeled-asset pipeline — Blender → glTF, starting at Milestone 3

**Status:** Accepted (2026-07-07, Fable review — resolves `fable-review-queue.md` #9).

## Context

Every render element is currently a procedural placeholder, each with a
`replacementMilestoneId` in `src/data/assets.ts`, but no concrete tooling,
sourcing policy, or start point existed for the placeholder→modeled transition.
That's a stack decision affecting every future scene's fidelity ceiling.

## Decision

### Tooling

- **Authoring:** Blender (free, scriptable, no license entanglement).
- **Interchange:** glTF 2.0 binary (`.glb`), exported from Blender.
- **Loading:** drei `useGLTF` (GLTFLoader ships with three) — **no new npm
  dependency**. No Draco/KTX2 compression for now; revisit only if
  `public/models/` exceeds ~10 MB total.
- **Locations:** source files in `assets-src/<asset-id>/` (committed plain —
  low-poly .blend files are small; Git LFS only if size ever forces it);
  exports in `public/models/<asset-id>.glb`, loaded via
  `import.meta.env.BASE_URL` so the GitHub Pages base path keeps working.

### Sourcing and licensing policy

1. **Default: project-authored.** Models are built in Blender against the
   asset's `historicalRequirements` and its cited source cards. Published
   drawings/photos are _references to consult, never geometry/texture sources to
   copy_ — consistent with the no-proprietary-assets hard constraint and the
   repo's MIT license.
2. **CC0 third-party base meshes are permitted but expected to be rare** —
   generic period-appropriate Iron Age Levant assets barely exist. Anything
   adapted must pass the same historical review as project-authored work.
3. **No marketplace or proprietary-licensed assets, period.**
4. **Provenance is data.** When the first modeled asset lands, `AssetRecord`
   gains three optional fields — this ADR pre-authorizes exactly these, so the
   change needs no further Fable review:
   - `modelPath?: string` — repo path of the .glb;
   - `modelLicense?: 'project-original' | 'cc0-adapted'`;
   - `modelProvenance?: string` — how it was made, what (if anything) it
     adapted, where the source .blend lives.

### Budgets (per asset, all quality modes)

Figures ≤ 3k triangles (they instance into crowds), buildings ≤ 5k, props
≤ 1.5k; textures ≤ 1024² and few — prefer vertex color and small shared trim
atlases, matching the existing vertex-colored look so modeled and placeholder
assets can coexist across a scene without a style cliff.

### Timing

- **Milestone 2: no modeling.** M2's replacements are procedural refinements or
  data work (DEM-terrain investigation is a terrain-source question, ADR-005;
  wells/threshing floor/fields stay procedural; the new M2 creatures — camels,
  the Egyptian servant — enter as placeholder-fidelity forms like everything
  else).
- **Milestone 3: pipeline goes live**, aligned with the M3
  `replacementMilestoneId` cluster. First a **single pilot asset** (one period
  figure) walks the full path — .blend → .glb → `useGLTF` → instanced in-scene —
  before batch work starts. Known technical risk to settle in the pilot, not in
  this ADR: instanced _skinned_ meshes are nontrivial; candidate approaches are
  instanced static-pose variants for crowds with animated bones only on near
  principals. Then the M3 batch: period figure set (`f-period-figures`), then
  Beth-shan architecture.

## Alternatives considered

- **Procedural-only forever:** rejected — capsule figures cap the project's
  "inhabit the scene" goal, and `assets.ts` already promises replacements.
- **Asset marketplaces:** rejected — licensing risk, MIT-incompatibility of most
  terms, and near-zero period-appropriate inventory; would also blur the
  every-element-traceable discipline.
- **Draco/meshopt compression now:** rejected — decoder complexity before any
  size problem exists.

## Consequences

- Modeled assets remain traceable: geometry decisions cite the same source cards
  as claims, and provenance lives in `assets.ts` next to `whyTemporary`.
- The pilot-first rule means the riskiest unknown (instanced skinned crowds) is
  settled cheaply before batch modeling.
- `docs/asset-roadmap.md` stays the human-readable schedule; its intro now
  points here.
