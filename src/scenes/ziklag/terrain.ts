import {
  createTerrain,
  type ColorZone,
  type Terrain,
  type TerrainSpec,
} from '../../engine/terrain';
import { GATE_TOWERS, SMOKE_ORIGINS } from './layout';

/**
 * Ziklag frontier terrain: gentle semi-arid hills, a low tell under the
 * settlement, a flattened occupation pad, a southward fall toward the Besor
 * drainage, and ash-darkened ground inside the burned town. PLACEHOLDER — see
 * asset-terrain-negev.
 *
 * Ground-color zones are keyed to the same layout data the structures use
 * (`SMOKE_ORIGINS`, `GATE_TOWERS`) so the burned-floor tint tracks where
 * houses actually burned rather than one uniform disk under the whole ring.
 */
const gateMidpoint: [number, number] = [
  (GATE_TOWERS[0][0] + GATE_TOWERS[1][0]) / 2,
  (GATE_TOWERS[0][1] + GATE_TOWERS[1][1]) / 2,
];

const SETTLEMENT_FLOOR_ZONES: ColorZone[] = [
  // General trampled/ashy floor across the interior — softer than before,
  // since the per-origin scorch zones below now carry the strong contrast.
  { center: [0, 0], radius: 48, color: '#726a5c', strength: 0.35 },
  // Dark scorch patches under each smoke-rising ruin (see Settlement.tsx).
  ...SMOKE_ORIGINS.map((s): ColorZone => ({
    center: [s.x, s.z],
    radius: s.major ? 10 : 6.5,
    color: '#33291f',
    strength: s.major ? 0.6 : 0.42,
  })),
  // Worn, dusty ground trodden around the gate approach, blending into the
  // path overlay in GroundWorks.tsx rather than duplicating it.
  { center: gateMidpoint, radius: 16, color: '#c9b88d', strength: 0.3 },
];

export const ZIKLAG_TERRAIN_SPEC: TerrainSpec = {
  hills: [
    { frequency: 0.006, amplitude: 16, octaves: 4, offset: [11.3, -7.1] },
    { frequency: 0.025, amplitude: 2.5, octaves: 3 },
  ],
  features: [
    { kind: 'flatten', center: [0, 0], radius: 78, strength: 0.82 },
    { kind: 'mound', center: [0, 0], radius: 60, height: 6.5 },
    { kind: 'ramp', direction: [0, 1], start: 60, end: 520, drop: 4.5 },
  ],
  colors: {
    base: '#c2a36b',
    scrub: '#8a8a55',
    rocky: '#a89878',
    moistureOffset: [3.7, -9.2],
    zones: SETTLEMENT_FLOOR_ZONES,
  },
};

export const ZIKLAG_TERRAIN: Terrain = createTerrain(ZIKLAG_TERRAIN_SPEC);
