import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Valley of Rephaim terrain (M6, rephaim-valley): a broad, open valley floor
 * with a rising highland rim along its western side — the ground both
 * Philistine engagements of 2 Samuel 5:17-25 are staged on. See
 * docs/design/rephaim-valley-brief.md, "Visual composition".
 *
 * `claim-rephaim-terrain-form` (modeled on `claim-gibeon-terrain-form`/
 * `claim-jerusalem-terrain-form`): the valley's broad identification and
 * general orientation (southwest of Jerusalem, an open corridor a force
 * could use to strike at the new center) is a standard historical-geography
 * reading (rainey-notley-2006); the exact landform profile here is this
 * project's own disclosed approximation, not DEM-derived. Palette and
 * vegetation vocabulary are carried over directly from hebron-anointing's
 * Judean-highland material language (limestone, terracing, olive/scrub) —
 * the landform is new, the region is not (brief's "Visual composition").
 *
 * No Jerusalem geometry renders anywhere in this scene, not even an
 * undetailed horizon ridge — the brief allows one "at most," but the
 * scope-guard's order-of-events disclosure (shared with jerusalem-stronghold)
 * is honored more safely by a bare horizon than by any modeled rise that
 * could be read as gesturing at the capital's position or state.
 *
 * Landform features:
 *  - a `ridge` feature is the western highland rim David's force holds and
 *    stages from (`b-spread`'s default vantage, `vp-valley-rim`);
 *  - the valley floor itself is left as base rolling terrain (fbm hills
 *    only, no carved channel) — "a broad, open valley floor" per the brief,
 *    not a narrow defile;
 *  - a `mound` feature is the grove's flank rise (`GROVE_CENTER`,
 *    layout.ts) — a gentle shoulder, not a hill in its own right, matching
 *    "small, ordinary, and visually unremarkable, which is the point."
 */
export const REPHAIM_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0035, amplitude: 5, octaves: 4, offset: [61.4, -22.8] },
    { frequency: 0.02, amplitude: 1.4, octaves: 3, offset: [-33.1, 14.6] },
  ],
  features: [
    // The western highland rim — a long, moderately broad rise, not a knife
    // ridge (contrast jerusalem-stronghold's narrow City of David spine):
    // "a rising highland rim along one side" (brief).
    { kind: 'ridge', start: [-95, -240], end: [-95, 260], width: 130, height: 30 },
    // A gentle eastward fall away from the rim, into the open valley floor.
    { kind: 'ramp', direction: [1, 0], start: -60, end: 160, drop: 10 },
    // The grove's own low shoulder on the valley's eastern flank — a modest
    // rise, not a landmark hill (`claim-bakaim-grove`).
    { kind: 'mound', center: [100, 30], radius: 55, height: 6 },
  ],
  colors: {
    // Carried directly from hebron-anointing/jerusalem-stronghold's
    // Judean-highland palette values — the region is not new here.
    base: '#c3ae85',
    scrub: '#7c8256',
    rocky: '#ad9a72',
    moistureOffset: [24.6, -8.3],
    moistureThreshold: 0.44,
    moistureStrength: 0.42,
    rockyFromY: 10,
    rockyFullY: 28,
    rockyStrength: 0.65,
    zones: [
      { center: [-95, 10], radius: 120, color: '#cdbe93', strength: 0.26 }, // pale rim ground
      { center: [30, -10], radius: 140, color: '#b8ab80', strength: 0.2 }, // open valley floor
      { center: [100, 30], radius: 60, color: '#8d9463', strength: 0.3 }, // the grove's damper shoulder
    ],
  },
  size: 1500,
  segments: 190,
};

export const REPHAIM_TERRAIN: Terrain = createTerrain(REPHAIM_TERRAIN_SPEC);
