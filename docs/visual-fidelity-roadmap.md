# Visual fidelity roadmap

Long-term visual goal: move the 3D experience closer to a polished,
historically-serious ancient-world atmosphere — richer terrain, denser
environmental detail, better material variation, believable lighting, more
readable human figures, stronger settlement composition, and cinematic-but-
study-oriented viewpoints. **Assassin's Creed: Origins** is a broad quality
_reference_ only ("what high-fidelity ancient-world atmosphere looks like") —
no assets, maps, UI, mechanics, names, or branding are ever copied from it or
any commercial game. This project stays an observer, not a game (see
`CLAUDE.md`).

This doc is the actionable backlog for that goal. Work it in small, single-
session slices — see the rate-limit protocol in `docs/sonnet-continuation.md`.
Each slice should be small enough to implement, test, document, and commit in
one run. Check off items as they land and note the commit/PR.

## Guardrails for every slice

- Every quality tier stays meaningful: `study` must stay cheap (weak
  hardware/mobile), `high` can be denser — see `src/engine/quality.ts`
  (`QUALITY_PROFILES`) and `.claude/skills/threejs-r3f-performance/SKILL.md`.
- No new runtime dependencies without a Fable-level architecture note
  (`docs/fable-review-queue.md`) — procedural/vertex-color technique first.
- Every visible element still needs a `basis`/`confidence` claim or a labeled
  `design-placeholder`; new/changed placeholders go in `src/data/assets.ts` +
  `docs/asset-roadmap.md` before a scene is marked `released`.
- No modeled/GLB period figures before the Milestone 3 asset-pipeline pilot
  (ADR-008) — figure work here means procedural capsule improvements only.
- No combat, inventory, quests, or win/loss state, ever.

## A. Environment richness

- [x] Terrain color-ramp: Ziklag ground-color zones now key off real
      layout data (smoke-origin scorch patches, gate-approach dust halo)
      instead of one flat disk (2026-07-07).
- [ ] Terrain color-ramp improvements: more zones/moisture variation in
      `TerrainColors` (`src/engine/terrain.ts`) for Ziklag beyond the current
      base/scrub/rocky blend — e.g. a dedicated "charred settlement floor"
      color zone keyed to the settlement's `ColorZone` center.
- [ ] More varied ground surfaces where relevant: dusty path, burned floor,
      rocky patches, field edges. Composable via existing `ColorZone` entries
      in each scene's `TerrainSpec` — no new terrain system needed yet.
- [ ] Denser/more varied instanced cover: more rock/scrub size and hue
      variance in `Vegetation.tsx`, plus burned-debris instances (charred
      timber, ash-blackened rubble) for the Ziklag aftermath, gated by
      `rockCount`/`vegetationCount`-style profile fields (extend
      `QualityProfile`, don't hardcode).
- [ ] Orchard/maquis density and placement realism (current orchard scatter
      in `Vegetation.tsx` is a good base; tune clustering/species-tint
      variety without adding a species-differentiation asset yet — that's
      M3 per `docs/asset-roadmap.md`).

## B. Atmosphere and lighting

- [ ] Review haze/fog falloff and sun angle for a hot, semi-arid burned-
      settlement read (currently late-afternoon per the resolved Fable
      lighting call — `docs/fable-review-queue.md` #3). Tune, don't
      re-litigate the time-of-day decision.
- [ ] Ambient/hemisphere fill balance so shadow cores don't read as flat
      black or blown out across all three quality tiers.
- [ ] Smoke-column shader (`SmokeColumns.tsx`) interaction with fog/lighting
      — check it still reads as smoldering aftermath, not spectacle, at
      each quality tier.
- [ ] No bloom/postprocessing additions without a performance-reviewer pass
      and a Fable note if it implies a new dependency.

## C. Settlement material detail

- [x] Mudbrick/stone variation on `Settlement.tsx` houses and perimeter
      walls via per-mesh seeded hue/roughness jitter (2026-07-07) — houses
      aren't instanced, so this uses a per-mesh material array rather than
      `instanceColor`, same underlying technique.
- [ ] Timber/ash further variation (roof slabs, collapse debris still share
      two flat tones — lower priority, less visually dominant than walls).
- [ ] Gate/wall material distinction from house walls: walls now vary
      separately from houses (different base-hue mix); gate towers still
      share one flat tone — revisit if they read as too uniform once other
      slices land.
- [ ] Field-plot and threshing-floor surface distinction from surrounding
      terrain (color zones or a dedicated ground patch mesh).
- [ ] Keep every material change inside the "procedural/vertex-color before
      texture pipeline" policy (`docs/asset-roadmap.md`) — no image textures
      without a Fable/architecture note.

## D. Characters and figures

- [ ] Improve capsule proportions and pose readability within the current
      ~1:10 ratio and abstraction policy (`asset-figure-capsule`,
      `docs/uncertainty-register.md` #7) — better silhouette, simple cloak
      shape, staff/shield silhouettes only where a claim supports them.
- [ ] Crowd distribution/grouping realism in `ReturningMen.tsx` pose
      function — legibility of the narrative beats matters more than raw
      density.
- [ ] Do not introduce modeled GLB figures here; that's gated on the M3
      asset-pipeline pilot (ADR-008).

## E. Composition and observer experience

- [ ] Audit existing teleport viewpoints for strong silhouettes and clear
      focal points; add a viewpoint only if it helps study the scene (not
      spectacle for its own sake).
- [ ] Confirm walkable paths and group readability hold up as environment
      density increases (A/C above) — denser scenes must not obscure labels
      or entity-inspector hit targets.

## F. Performance and verification

- [ ] `InstancedMesh` for any new repeated geometry — no exceptions.
- [ ] All density/fog/shadow/draw-distance values sourced from
      `QualityProfile`, never hardcoded.
- [ ] No per-frame allocation in `useFrame` (see the performance skill).
- [ ] Vitest coverage for any new pure layout/terrain/pose logic (follow
      `terrain.test.ts` / `reenactment.test.ts` patterns).
- [ ] Playwright only when the change is user-visibly interactive.
- [ ] Run the `performance-reviewer` subagent after any slice that adds
      meaningful scene content (new instanced systems, new draw calls).

## Suggested slice order

Small, mostly-independent, roughly in this order:

1. ~~Ziklag terrain color-ramp / burned-floor zone (A).~~ Done 2026-07-07.
2. ~~Settlement material variation via per-mesh color jitter (C).~~ Done
   2026-07-07.
3. Instanced burned-debris + expanded rock/scrub variety (A).
4. Lighting/fog tuning pass with a before/after screenshot in the PR (B).
5. Figure/pose readability pass (D).
6. Viewpoint audit once A–C have landed and the scene reads differently (E).

Re-order freely — pick whichever is smallest and safest for a given session's
remaining budget, per `docs/next-run.md`'s current-priority rule.
