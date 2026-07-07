---
name: threejs-r3f-performance
description: Three.js / React Three Fiber performance and correctness checklist for this project. Use before or after any change to src/engine/, src/scenes/**, or anything rendered inside ObservePage's Canvas — new geometry, instancing, materials, lighting/shadows, GLTF loading, or camera/controls work.
---

# Three.js / R3F performance checklist (Books of Samuel)

Distilled for this repo's stack (Vite + React 19 + `@react-three/fiber` +
`@react-three/drei`, quality profiles in `src/engine/quality.ts`). Not a
general tutorial — check the specific things that have historically caused
regressions in this kind of scene (many instanced objects, a single scrubbable
timeline, three quality tiers that must all stay cheap).

## Render-loop discipline

- Never call `setState` (React or Zustand) inside `useFrame` on a fast path —
  it re-renders the React tree every frame. Mutate `ref.current` (position,
  rotation, material uniforms) directly instead.
- Never allocate inside `useFrame`: no `new THREE.Vector3()`, `.clone()`,
  array literals, or object literals per frame. Create scratch objects once
  (module scope or `useMemo`/`useRef`) and mutate them in place. This project's
  `figurePose(t, ...)` pattern (`src/scenes/ziklag/reenactment.ts`) is already
  a pure function of `t` — keep new choreography the same shape, and have the
  calling component write results into refs rather than state.
- Prefer driving animation from the scene-time value already in the Zustand
  store (`sceneTime` or equivalent) rather than wall-clock time, so scrubbing
  the timeline stays exact and pausing actually pauses.

## Avoiding unnecessary re-renders

- Split components so that data which changes every frame (positions, pose)
  never lives in a component that also renders expensive JSX (many children,
  materials). Push frequently-changing values down to the leaf via refs/props,
  not up through context or global state.
- Memoize geometry/material objects with `useMemo` keyed on their real inputs
  (quality profile, layout seed) — don't recreate them every render.
- Selecting narrowly from the Zustand store (`useStore((s) => s.quality)`,
  not the whole store) avoids re-rendering scene components on unrelated
  state changes (e.g. a HUD toggle shouldn't re-render the terrain).

## Instancing repeated objects

- Any repeated static or per-instance-transform-only object (vegetation,
  rocks, debris, crowd figures) must use `InstancedMesh` (via drei's
  `<Instances>`/`<Instance>` or raw `THREE.InstancedMesh`), not one mesh per
  object. This project already does this for vegetation/rocks/figures/smoke —
  match that pattern for new density (orchard trees, burned debris, etc.).
- Instance counts must come from the active `QualityProfile`
  (`src/engine/quality.ts`), never a hardcoded density. Add a new field to
  the profile (all three tiers) rather than a local constant when introducing
  a new instanced system.
- Set `instanceMatrix.needsUpdate = true` only when transforms actually
  change (placement is deterministic/static in this project — set once, not
  per frame).
- For instances needing per-instance color variation (material variety
  without new textures), use `InstancedMesh.instanceColor` rather than
  separate materials per instance.

## Materials and texture strategy

- This project favors procedural/vertex-color variation over textures so far
  (terrain color ramps, no texture pipeline yet per `docs/asset-roadmap.md`).
  Keep new material variation (mudbrick, ash, stone) in that spirit: vertex
  colors, `MeshStandardMaterial` parameter jitter (roughness/color per
  instance), or cheap procedural noise — not a new texture/asset dependency
  without a Fable-level architecture note.
- Reuse material instances across meshes where the look is shared; don't
  create a new `THREE.Material` per component instance if one shared material
  (or one per quality tier) will do — materials are expensive to compile and
  each unique one is a separate GPU program permutation.
- Prefer `MeshStandardMaterial`/`MeshLambertMaterial` over
  `MeshPhysicalMaterial` unless a specific effect (clearcoat, transmission)
  is required — physical material is materially more expensive per pixel.

## Lighting and shadow budgets

- Shadow-casting lights are the single most expensive thing in this scene
  category. Keep to one shadow-casting directional (sun) light; everything
  else (ambient/hemisphere fill) should not cast shadows.
- `shadowMapSize` must scale with the quality profile (already does:
  512/1024/2048 study/balanced/high) — don't bump the balanced/study default
  when only high-mode fidelity is the goal.
- Tighten the shadow camera frustum (`light.shadow.camera.{left,right,top,bottom,near,far}`)
  to the actual scene bounds — a loose frustum wastes shadow-map resolution
  on empty space and softens/aliases the shadows that matter.
- `study` mode must stay shadow-free (`shadows: false`) — this is a hard
  floor for low-end/mobile, not just a density slider.

## GLTF loading strategy (for Milestone 3+ modeled assets)

- Not yet in use (M2 stays procedural per ADR-008), but when it lands: load
  via drei's `useGLTF`, which caches and dedupes by URL — never call
  `GLTFLoader` directly per component instance.
- Call `useGLTF.preload(url)` for models needed at scene entry so the
  Suspense fallback isn't hit mid-observation.
- Reuse a single loaded geometry/skinned mesh across many `InstancedMesh` or
  cloned-via-`SkeletonUtils` instances rather than re-parsing the GLTF per
  figure — a crowd of the same figure should share one parsed asset.
- Compress on the authoring side (Draco/Meshopt via the Blender export step)
  before it reaches the repo; don't add a runtime transcoding dependency
  without a Fable review (ADR-008 already fixed the pipeline as
  Blender → `.glb`, no new deps).

## Memory disposal

- `useGLTF`/`useTexture` from drei handle their own disposal via suspense
  cache; raw `THREE.BufferGeometry`/`Material` created manually in a
  component must be disposed in a `useEffect` cleanup (`geometry.dispose()`,
  `material.dispose()`) if the component can unmount mid-session (e.g.
  switching scenes via `SCENE_REGISTRY`).
- Watch scene switches specifically: this project already swaps the active
  scene/terrain via the Zustand store (`setTerrain`) — confirm the previous
  scene's instanced meshes and any per-scene textures are actually
  garbage-collectable (no stray refs held in module-level caches) after a
  switch, not just visually replaced.

## Mobile / browser performance and quality-mode scaling

- Every density, draw-distance, DPR-cap, and shadow decision must read from
  `useQualityProfile` — grep for hardcoded counts before adding new instanced
  systems (`vegetationCount`, `rockCount`, `treeCount`, `figureCount`,
  `smokeParticlesPerColumn` are the existing fields; extend this interface
  rather than parallel constants).
- `dpr` is already capped per tier (`[0.75,1]`/`[1,1.5]`/`[1,2]`) — don't
  read `window.devicePixelRatio` directly elsewhere.
- Test any new heavy feature in `study` mode on the assumption it's running
  on the weakest realistic device — `study` exists specifically so the app
  degrades gracefully rather than being unusable.

## Before finishing scene-content work

- Run `npm run typecheck && npm run lint && npm test` at minimum;
  `npm run verify` (full gate incl. Playwright) before a PR when feasible.
- For anything that changes draw calls, instance counts, or adds a new
  render pass, ask the `performance-reviewer` subagent to check budgets
  before considering the task done (per `CLAUDE.md`).
