# ADR-009: Procedural skinned character system (realistic figures, pulled forward)

**Status:** Accepted (2026-07-07, Fable session; user-directed priority change).

## Context

ADR-008 scheduled modeled figures for Milestone 3 via Blender→glTF, flagging
instanced _skinned_ crowds as the riskiest unknown. The project owner directed
that realistic 3D characters be built now, ahead of the roadmap, using
third-party models or our own — with the app remaining web-based. A sourcing
survey (2026-07-07) found no realistic rigged human models that are both CC0
and compatible with our budgets/period requirements; marketplace and
Mixamo-style assets fail the licensing hard constraint. So the figures are
**project-original, generated in code**.

## Decision

1. **`src/engine/characters/` is the character foundation**: anthropometric
   17-bone skeleton (stable bone-name contract), procedural skinned body with
   period dress (knee-length tunic, belt, optional simlah over-mantle, sandals,
   wrap/bare head, beard) as vertex-colored ring-loop surfaces, programmatic
   `AnimationClip`s (`walk`, `idle`, `kneel`, `mourn`), and deterministic
   per-figure variation (stature, build, skin/hair/dress palettes). Design and
   quality bar: `docs/design/character-system.md`.
2. **Two-tier LOD for the web budget**: `principal` detail (fully skinned +
   animated, ≤ 14k tris, ≤ 3 per scene) and `crowd` detail (≤ 3k tris).
3. **Crowds use baked-pose instancing** (`bake.ts`): clips are CPU-sampled
   into a small set of static pose geometries (walk×8, kneel×4, idle×3 per
   variant); figures are re-bucketed into `InstancedMesh`es per frame. This
   resolves the ADR-008 skinned-crowd risk with the "instanced static-pose
   variants" approach it anticipated.
4. **ADR-008's provenance fields activate now** (`modelPath`, `modelLicense`,
   `modelProvenance` on `AssetRecord`); these figures record
   `modelLicense: 'project-original'`.
5. **The Blender→glTF path stays open.** `CharacterRig` (same bone names, same
   clip names) is the seam where a Blender-authored `.glb` body can replace the
   procedural one at M3+ without touching scene code. This ADR amends ADR-008's
   _timing_ (the "pilot figure" now exists earlier, in code) but not its
   tooling, sourcing, or licensing policy.
6. **Honesty unchanged**: figures remain `placeholder: true` (dress detail and
   gear still await full historical review against King & Stager); the UI
   disclosure stays.

## Consequences

- Ziklag's capsule figures are replaced by these characters; the scene keeps
  its `figurePose` timeline contract and tests.
- A dev-only visual QA harness (`char-preview.html` + `src/dev/charPreview.ts`)
  renders a pose lineup for sculpt review; it is not part of the built app.
- Budgets in ADR-008 are amended for figures: crowd ≤ 3k tris,
  principal ≤ 14k tris (was a flat 3k) — justified because principals don't
  instance and the crowd path is baked/instanced.
