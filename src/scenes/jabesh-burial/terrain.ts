import {
  createTerrain,
  type ColorZone,
  type Terrain,
  type TerrainSpec,
} from '../../engine/terrain';
import {
  CHANNEL_DEPTH,
  CHANNEL_PATH,
  CHANNEL_WIDTH,
  PYRE_POS,
  TAMARISK_POS,
  VILLAGE_CENTER,
} from './layout';

/**
 * Jabesh-gilead terrain (M3): rolling Gilead hill-flank country (ADR-005
 * `hills` + a `channel` feature for the Wadi Yabis form — narrower and
 * greener than the Besor braid, a perennial stream line in hill country)
 * rising from the low Jordan-valley approach in the west up to the village
 * terrace, per claim-gilead-terrain. The composite-setting disclosure
 * (claim-jabesh-location) means this is deliberately a representative lower
 * Wadi Yabis form, not either candidate tell's actual plan. Palette: the
 * project's fourth regional palette — oaks and scrub on the slopes, a
 * tamarisk/oleander line along the water, terraced plots near the village.
 * See asset-terrain-jabesh-wadi.
 */

const CHANNEL_ZONES: ColorZone[] = (() => {
  const zones: ColorZone[] = [];
  const bandRadius = CHANNEL_WIDTH * 0.55;
  for (let i = 0; i < CHANNEL_PATH.length - 1; i++) {
    const [ax, az] = CHANNEL_PATH[i];
    const [bx, bz] = CHANNEL_PATH[i + 1];
    const steps = 3;
    for (let s = 0; s <= steps; s++) {
      if (i < CHANNEL_PATH.length - 2 && s === steps) continue;
      const t = s / steps;
      zones.push({
        center: [ax + (bx - ax) * t, az + (bz - az) * t],
        radius: bandRadius,
        color: '#3f5a34',
        strength: 0.3,
      });
    }
  }
  return zones;
})();

/** Small tan patches near the village hinting at terraced cultivation
 * (design placeholder — no specific plot survey exists for this composite
 * site). */
const TERRACE_ZONES: ColorZone[] = [
  {
    center: [VILLAGE_CENTER[0] - 30, VILLAGE_CENTER[1] + 25],
    radius: 20,
    color: '#b9a878',
    strength: 0.22,
  },
  {
    center: [VILLAGE_CENTER[0] + 35, VILLAGE_CENTER[1] - 20],
    radius: 18,
    color: '#b9a878',
    strength: 0.2,
  },
  {
    center: [VILLAGE_CENTER[0] - 5, VILLAGE_CENTER[1] + 45],
    radius: 16,
    color: '#b9a878',
    strength: 0.18,
  },
];

export const JABESH_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.0035, amplitude: 14, octaves: 4, offset: [71.4, -22.6] },
    { frequency: 0.018, amplitude: 2.4, octaves: 3, offset: [8.1, 51.9] },
  ],
  features: [
    { kind: 'channel', path: CHANNEL_PATH, width: CHANNEL_WIDTH, depth: CHANNEL_DEPTH },
    // Rises from the low western Jordan-valley approach up to the village terrace.
    { kind: 'ramp', direction: [-1, 0], start: 40, end: 400, drop: 55 },
    { kind: 'flatten', center: VILLAGE_CENTER, radius: 55, strength: 0.65 },
    { kind: 'flatten', center: PYRE_POS, radius: 20, strength: 0.55 },
    { kind: 'flatten', center: TAMARISK_POS, radius: 18, strength: 0.5 },
  ],
  colors: {
    base: '#8a7a52',
    scrub: '#4f6b34',
    rocky: '#8f8672',
    moistureFrequency: 0.011,
    moistureOffset: [18.6, -33.2],
    moistureThreshold: 0.34,
    moistureStrength: 0.68,
    rockyFromY: 20,
    rockyFullY: 48,
    rockyStrength: 0.5,
    zones: [
      // Pale earth under the village terrace, echoing Beth-shan's mudbrick zone.
      { center: VILLAGE_CENTER, radius: 55, color: '#c9bd9a', strength: 0.32 },
      ...TERRACE_ZONES,
      ...CHANNEL_ZONES,
    ],
  },
  size: 1200,
  segments: 180,
};

export const JABESH_TERRAIN: Terrain = createTerrain(JABESH_TERRAIN_SPEC);
