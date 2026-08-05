import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { GATE_PLAZA_CENTER, TOWN_CENTER } from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-covenant (ADR-006
 * conventions). Reuses hebron-anointing's `TOWN_CENTER`/`GATE_PLAZA_CENTER`
 * constants directly (the brief's "Hard continuity rule": do not re-invent
 * the town) rather than re-deriving them — this scene adds only what it
 * newly needs: the northern approach/departure road, the feast ground, and
 * the three covenant-scene crowds' gathering slots. Same coordinate system
 * as hebron-anointing (1 unit = 1 meter, -z north, +z south, +x east); the
 * town/terrace/house geometry itself is imported and reused unmodified from
 * `../hebron-anointing/{TerraceWalls,TownAndPlaza}.tsx`, not rebuilt here.
 * See docs/design/hebron-covenant-brief.md, "Visual composition".
 */

export { GATE_PLAZA_CENTER, TOWN_CENTER };

/** Where Abner is received, and where he is dismissed — reused verbatim as
 * hebron-anointing's own gate plaza, the brief's "continuity anchor"
 * (`vp-gate-plaza`). The northern road's own curve (below) ends exactly
 * here. */
export const RECEPTION_POS: [number, number] = GATE_PLAZA_CENTER;

/** A separate courtyard near the town, dressed for the meal — the scene's
 * ceremonial center (brief's focal mass (c)), distinct ground from the gate
 * plaza reception point. */
export const FEAST_GROUND_CENTER: [number, number] = [30, -24];
export const DAVID_FEAST_POS: [number, number] = [
  FEAST_GROUND_CENTER[0] - 4,
  FEAST_GROUND_CENTER[1],
];
export const ABNER_FEAST_POS: [number, number] = [
  FEAST_GROUND_CENTER[0] + 4,
  FEAST_GROUND_CENTER[1],
];
const DAVID_ESCORT_CENTER: [number, number] = [
  FEAST_GROUND_CENTER[0] - 16,
  FEAST_GROUND_CENTER[1] - 4,
];

// ---------------------------------------------------------------------------
// The northern road (brief's focal mass (a) and (d)): the deliberate inverse
// of hebron-anointing's southern approach column — Abner's party of
// twenty-plus-one comes from the direction of Israel/Benjamin territory,
// skirting the town hill's west flank (the mound sits at TOWN_CENTER,
// radius ~62 — see hebron-anointing/terrain.ts) to reach the same gate
// plaza. Used twice: the arrival march (b-arrival) and, reversed, the peace
// departure (b-peace) — the scene's symmetry axis, per the brief.
// Placeholder exact course, disclosed (brief's "Allowed placeholders").

export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-20, 0, -320),
    new THREE.Vector3(-60, 0, -230),
    new THREE.Vector3(-95, 0, -150),
    new THREE.Vector3(-70, 0, -90),
    new THREE.Vector3(-25, 0, -40),
    new THREE.Vector3(RECEPTION_POS[0], 0, RECEPTION_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Reused directly from hebron-anointing/layout.ts (identical helper, no
 * scene-specific behavior) — samples a curve into evenly spaced
 * position+yaw points for road-strip rendering. */
export { samplePath } from '../hebron-anointing/layout';

// ---------------------------------------------------------------------------
// Rejection-sampled gathering areas (ADR-006 convention).

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 100,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const angle = rng() * Math.PI * 2;
    const r = rMin + rng() * (rMax - rMin);
    const x = center[0] + Math.cos(angle) * r;
    const z = center[1] + Math.sin(angle) * r;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

/** Abner's twenty men's feast-ground seats (literal 1:1 count, brief's
 * "Scale assumptions") — a buffer pool slightly larger than the exact
 * headcount so slot assignment never repeats a coordinate. */
export const ABNER_FEAST_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  230501,
  ABNER_FEAST_POS,
  1.6,
  8,
  1.5,
);

/** David's escort/household presence at the feast — a disclosed design
 * count, ~15-25 at high quality tier (claim-covenant-cast-scale). */
export const DAVID_ESCORT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  230502,
  DAVID_ESCORT_CENTER,
  3,
  15,
  1.8,
);

/** Ambient townspeople going about an ordinary working day — a disclosed
 * design count, ~20-30 at high quality tier (claim-covenant-cast-scale),
 * deliberately far below hebron-anointing's ~150-200-figure civic assembly. */
export const TOWN_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  36,
  230503,
  TOWN_CENTER,
  14,
  68,
  2.4,
);

/** Feast-dressing (mats/vessels, asset-feast-props) placements — a single
 * small instanced set scattered across the feast ground, not one prop per
 * figure (brief's performance target: "the only new prop family and should
 * be a single small instanced set"). */
export const FEAST_PROP_SLOTS: [number, number][] = rejectionSampleAnnulus(
  10,
  230504,
  FEAST_GROUND_CENTER,
  2,
  11,
  2.6,
);
