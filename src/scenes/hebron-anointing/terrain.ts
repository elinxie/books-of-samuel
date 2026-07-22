import { createTerrain, type Terrain, type TerrainSpec } from '../../engine/terrain';

/**
 * Hebron terrain (M4, hebron-anointing): the project's fifth regional
 * palette (Negev loess -> Gilboa garrigue -> Beth-shean valley green ->
 * Gilead oak/scrub -> now Judean highland) — rockier and more intensively
 * terraced than Gilead's flank (see docs/design/hebron-anointing-brief.md,
 * "Visual composition"). Deliberately not DEM-derived; a procedural
 * composite that encodes the brief's relative topography only:
 *
 *   - a town mound (Tell Rumeida) north of the composition, where the
 *     settlement/gate-plaza massing sits (TownAndPlaza.tsx);
 *   - a shallow spring-fed valley south of the town, between it and the
 *     approach ridge;
 *   - a modest approach ridge further south, from which vp-approach-ridge
 *     looks north across the valley/camps/plaza toward the town — the
 *     scene's deliberately bounded default framing (no long sightline north
 *     past the town, toward the rest of the former kingdom);
 *   - a gentle eastward fall (toward the historically real, much lower
 *     Jordan Rift direction) that the messenger-departure road runs along
 *     for its one deliberate outward sightline — a directional legibility
 *     choice, not an assertion about Hebron's real distance from the
 *     Jordan.
 *
 * See claim-hebron-town-form (the settlement/terrain disclosure) and
 * asset-terrain-hebron-hills.
 */
export const HEBRON_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0042, amplitude: 9, octaves: 4, offset: [18.3, -41.2] },
    { frequency: 0.021, amplitude: 2.6, octaves: 3, offset: [-14.7, 9.4] },
  ],
  features: [
    // Tell Rumeida / the town hill, north end of the composition.
    { kind: 'mound', center: [0, -70], radius: 62, height: 30 },
    // The spring-fed valley between the town's south foot and the approach ridge.
    {
      kind: 'channel',
      path: [
        [-260, 55],
        [-140, 60],
        [0, 58],
        [140, 54],
        [260, 50],
      ],
      width: 95,
      depth: 9,
    },
    // The approach ridge south of the valley (vp-approach-ridge's vantage).
    { kind: 'ridge', start: [-230, 165], end: [230, 172], width: 100, height: 20 },
    // A gentle eastward fall toward the (unshown, off-scene) Jordan Rift
    // direction — the messenger-departure road's one deliberate outward
    // sightline runs along this drop.
    { kind: 'ramp', direction: [1, 0], start: 90, end: 430, drop: 24 },
  ],
  colors: {
    base: '#c3ae85',
    scrub: '#7c8256',
    rocky: '#ad9a72',
    moistureOffset: [24.6, -8.3],
    moistureThreshold: 0.44,
    moistureStrength: 0.42,
    // Rockier than Gilead's flank (claim-hebron-town-form / brief's palette
    // note): the rocky tint ramps in sooner and stronger.
    rockyFromY: 10,
    rockyFullY: 28,
    rockyStrength: 0.7,
    zones: [
      { center: [0, -70], radius: 85, color: '#cdbe93', strength: 0.32 }, // pale hill-town ground
      { center: [0, 55], radius: 130, color: '#8d9463', strength: 0.24 }, // valley green
    ],
  },
  size: 1500,
  segments: 190,
};

export const HEBRON_TERRAIN: Terrain = createTerrain(HEBRON_TERRAIN_SPEC);
