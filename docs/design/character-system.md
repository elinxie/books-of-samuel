# Character system design (Fable, 2026-07-07)

Creative + technical direction for realistic human figures. This is the contract
for all character work; implementation lives in `src/engine/characters/`.

## Goals and constraints

- **Realistic silhouettes, honest detail.** Correct human proportions, real
  skeletal articulation, period dress that drapes and moves. No portraiture:
  named figures (David, Abiathar) are distinguished by dress and label, never an
  invented face (see `asset-david-marker` historicalRequirements).
- **Web budget.** Two-tier LOD:
  - `principal` detail — fully skinned + animated `SkinnedMesh`, ~8–12k tris,
    used for ≤3 named figures per scene.
  - `crowd` detail — same generator at lower segment counts (~2.5k tris),
    rendered via **baked-pose instancing**: animation clips are CPU-sampled into
    a small set of static pose geometries; each frame every figure is assigned
    to the nearest pose bucket of an `InstancedMesh`. ~15 draw calls for a
    60–72-figure crowd. This settles the ADR-008 "instanced skinned meshes"
    risk with the "instanced static-pose variants" approach it named.
- **Project-original, license-clean.** All geometry is generated in code
  (`modelLicense: 'project-original'`). Survey of CC0 sources (2026-07-07)
  found no realistic rigged humans compatible with our licensing policy; the
  Blender `.glb` path from ADR-008 remains open — `CharacterRig` is the seam
  where a loaded model can replace the procedural body without touching scene
  code (same bone names, same clip names).

## Anthropometry (basis)

- Stature default **1.66 m** male / **1.54 m** female, matching published
  estimates for southern Levant Iron Age skeletal populations (male means
  cluster ~1.63–1.69 m). Recorded as a claim with basis `comparative-ane`;
  per-figure variation ±0.06 m.
- Proportions follow standard artistic/anatomical canon (~7.5 head-heights),
  biacromial breadth ≈ 0.245·H, hip joint spacing ≈ 0.11·H, limb segment
  fractions per Drillis–Contini body-segment tables. These are modern human
  constants, not archaeological claims.

## Dress (basis: biblical-text + comparative-ANE, see claim-dress)

Everyday male dress of the period, per King & Stager (Life in Biblical Israel):

- **Tunic (ketonet)** — knee-length, short/elbow sleeves, wool, undyed-to-earth
  tones. Belted with a wrapped sash/leather belt.
- **Mantle (simlah)** — rectangular wool over-cloak, worn open over the
  shoulders; darker/striped tones; present on ~half the crowd for silhouette
  variety.
- **Head**: wrapped cloth or bare with short hair; full beards standard for
  adult men.
- **Feet**: flat leather sandals (dark sole + straps hinted by color bands).
- **No armor, no anachronistic gear.** Weapons/packs are a later, separately
  sourced pass.

Palette: undyed wool range (existing `WOOL_PALETTE` tones), skin in a
Levantine bronze range, hair near-black to dark brown. All vertex colors —
no textures — matching the project's vertex-colored look (ADR-008).

## Skeleton

17 bones, Y-up, character faces +Z, origin at ground between the feet.
`hips → spine → chest → neck → head`; `chest → upperArm{L,R} → forearm{L,R} →
hand{L,R}`; `hips → thigh{L,R} → shin{L,R} → foot{L,R}`. Rest pose is a
relaxed A-pose (arms ~14° out). Bone names are a stable public contract —
animation clips and any future glTF replacement must use them.

## Animation

Programmatic `AnimationClip`s authored in `animation.ts`:

- `walk` — 1 s loop authored for a ~1.5 m stride; play at
  `timeScale = speed / 1.5`. Pelvic rotation/list, counter-rotating shoulders,
  arm swing, knee flexion profile, subtle vertical bob (authored on the hips
  bone, so terrain-following stays the scene's job).
- `idle` — 4 s loop; breathing, weight shift.
- `kneel` — 2 s one-shot (clamp) into a grieving kneel/slump; sampled at
  0/⅓/⅔/1 for crowd buckets.
- `mourn` — 4 s loop, standing: bowed head, hand raised toward the face
  (1 Sam 30:4 weeping posture).

## Crowd pose buckets (bake.ts)

walk×8 (phase-sliced), kneel×4 (progress-sliced), idle×3 = 15 static
geometries per body variant. Variants (2–3 body builds × dress via per-instance
color) keep memory ≈ a few MB. Figures are bucketed per frame by walk phase /
kneel progress computed from the existing `figurePose` timeline.

## Quality bar (review checklist for scene use)

1. Walk reads as human at 50 m: weight transfer visible, no skating (stride
   matched to ground speed), arms counter-swing.
2. Silhouette at 10 m: neck, shoulders, elbows, knees, calf taper all present;
   tunic hem moves with the legs; cloak breaks the crowd's uniformity.
3. Close-up on principals: brow/nose/jaw/beard read as a face without claiming
   an identity; hands have a thumb; sandals visible.
4. No T-pose ever visible; no interpenetration worse than clothing-level at
   animation extremes.
5. Honest labeling: figures remain `placeholder: true` until dress details and
   gear pass historical review; provenance fields filled per ADR-008.
