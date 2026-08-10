import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  TERRACE_SEGMENTS,
  TOWN_CENTER,
  TOWN_HOUSES,
} from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-covenant (ADR-006
 * conventions, mirroring hebron-anointing/gibeon-pool's layout.ts). 1 unit =
 * 1 meter, positions are x/z only (height sampled from terrain.ts at render
 * time). Reuses hebron-anointing's town/plaza/terrace constants directly —
 * this is the same Hebron a few years later, not a re-invented town (brief's
 * "Visual continuity... is mandatory").
 *
 * hebron-anointing's own coordinate convention (-z toward the town mound,
 * +z south toward the Negev approach, +x east toward the Gilead/Jordan
 * road) is kept, but this scene needs a road entering from a direction that
 * reads as distinct from both of those — "the deliberate inverse of
 * hebron-anointing's southern approach column" (brief, "Visual
 * composition"). No real-world compass bearing is asserted for it: like
 * hebron-anointing's own eastward messenger road ("a directional legibility
 * choice, not an assertion about Hebron's real distance from the Jordan"),
 * this scene's "northern road" runs in from the west (-x) side of the
 * composition — a disclosed staging choice (brief's placeholder policy
 * explicitly allows "the northern road's exact course"), not a claim about
 * which real compass direction Mahanaim/Gilead lies in from Tell Rumeida.
 */

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" (a)-(d)).

/** Where the feast is laid — an open courtyard/plaza space east of the gate
 * plaza, within the town's own open ground, deliberately not a banquet hall
 * (brief: "no hall, no throne room, no palace"). */
export const FEAST_GROUND_CENTER: [number, number] = [30, -22];

/** David's fixed position at the feast, facing the arriving party. */
export const DAVID_FEAST_POS: [number, number] = [40, -22];
/** Abner's fixed position once seated at the feast, facing David. */
export const ABNER_FEAST_POS: [number, number] = [22, -24];

// ---------------------------------------------------------------------------
// Routes.

/** The road Abner's twenty-one come up from the north (b-arrival), used
 * again in reverse for the departure (b-peace) — the scene's symmetry axis.
 * Passes near the gate plaza (a legible "received" waypoint) on its way to
 * the feast ground. */
export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-230, 0, -52),
    new THREE.Vector3(-150, 0, -40),
    new THREE.Vector3(-90, 0, -30),
    new THREE.Vector3(-50, 0, -22),
    new THREE.Vector3(-20, 0, -16),
    new THREE.Vector3(GATE_PLAZA_CENTER[0], 0, GATE_PLAZA_CENTER[1]),
    new THREE.Vector3(16, 0, -17),
    new THREE.Vector3(FEAST_GROUND_CENTER[0], 0, FEAST_GROUND_CENTER[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

export function samplePath(
  curve: THREE.CatmullRomCurve3,
  step = 7,
): { pos: THREE.Vector3; yaw: number }[] {
  const length = curve.getLength();
  const n = Math.max(1, Math.floor(length / step));
  const out: { pos: THREE.Vector3; yaw: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Crowd/seating slots (rejection-sampled, ADR-006 convention).

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 80,
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

/** Abner's party seating, literal 21 (Abner + twenty men, 3:20) — a pool
 * slightly larger than 21 for a small buffer, sliced to the exact count at
 * render time. Clustered on the arrival (north/west) side of the feast
 * ground. */
export const ABNER_PARTY_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  230301,
  [FEAST_GROUND_CENTER[0] - 8, FEAST_GROUND_CENTER[1] - 5],
  2,
  15,
  2.1,
);

/** David's-side feast presence — a disclosed design count (~15-25 at high
 * tier, claim-covenant-cast-scale), on the receiving (south/east) side of
 * the feast ground. Pool sized for the high-quality-tier target. */
export const DAVIDS_SIDE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  230302,
  [FEAST_GROUND_CENTER[0] + 8, FEAST_GROUND_CENTER[1] + 6],
  2,
  17,
  2.1,
);

/** Ambient town background — a working town on an ordinary day, deliberately
 * far below hebron-anointing's civic-assembly scale (brief's "Scale
 * assumptions"). Scattered around the town houses, clear of the feast
 * ground and gate plaza. */
export const TOWN_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  34,
  230303,
  TOWN_CENTER,
  12,
  52,
  2.4,
);

// ---------------------------------------------------------------------------
// Feast dressing (mats/vessels, new asset-feast-props) — one small instanced
// set placed at each seating cluster's slots, plus a few shared communal
// vessel points at the ground's center. Physical form is a disclosed design
// placeholder (claim-feast-form): the text says only "a feast," no vessel or
// seating-arrangement detail.

export const FEAST_VESSEL_SLOTS: [number, number][] = rejectionSampleAnnulus(
  8,
  230304,
  FEAST_GROUND_CENTER,
  2,
  10,
  3,
);

export { GATE_PLAZA_CENTER, GATE_POSTS, TERRACE_SEGMENTS, TOWN_CENTER, TOWN_HOUSES };
