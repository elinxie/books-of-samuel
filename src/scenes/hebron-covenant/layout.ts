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
 * 1 meter, same axis convention as hebron-anointing: -z is north, +z is
 * south, +x is east. Mandatory visual continuity (brief, "Resolved design
 * calls"): the town/terrace massing (`TOWN_HOUSES`, `GATE_POSTS`,
 * `TERRACE_SEGMENTS`, `TOWN_CENTER`, `GATE_PLAZA_CENTER`) is imported and
 * re-exported unchanged from hebron-anointing/layout.ts, not recomputed —
 * this is the same town a few years later, not a fresh composition. Only
 * this scene's new ground (the north road, the feast dressing, the three
 * new crowds) is generated here.
 */
export { GATE_PLAZA_CENTER, GATE_POSTS, TERRACE_SEGMENTS, TOWN_CENTER, TOWN_HOUSES };

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// The north road (brief, "Visual composition" (a)/(d)): Abner's party of
// twenty-plus-one comes down from the direction of Israel/Benjamin territory
// — the deliberate inverse of hebron-anointing's southern approach column.
// The curve skirts the town mound's bare north flank (hebron-anointing's
// terracing only covers a ~194°-wide arc centered due south of the mound,
// see its TERRACE_ANGULAR_SPAN — the north side has no terrace geometry to
// collide with) and ends at the exact same point hebron-anointing's
// APPROACH_CURVE does, (0, -14): the two roads' shared convergence on one
// plaza is this scene's deliberate mirror-symmetry axis (brief: "the
// departure road — the same northern road, used twice... the scene's
// symmetry axis").
export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(55, 0, -280),
    new THREE.Vector3(46, 0, -195),
    new THREE.Vector3(34, 0, -120),
    new THREE.Vector3(18, 0, -58),
    new THREE.Vector3(6, 0, -28),
    new THREE.Vector3(GATE_PLAZA_CENTER[0], 0, GATE_PLAZA_CENTER[1]),
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
// The feast ground (brief, "Visual composition" (c)): the same plaza
// hebron-anointing already established, dressed for a meal rather than an
// assembly — "no hall, no throne room, no palace" (3:20's own bare
// statement). David and Abner sit facing each other across the feast
// dressing (FeastGround.tsx); the twenty gather near Abner, David's escort
// near David.

export const FEAST_GROUND_CENTER: [number, number] = [0, -20];
export const DAVID_SEAT_POS: [number, number] = [-6, -26];
export const ABNER_SEAT_POS: [number, number] = [6, -14];

/** Where the twenty settle once arrived — close beside Abner, not mixed
 * into David's own household. */
export const ABNER_MEN_CENTER: [number, number] = [10, -8];
/** Abner + twenty, 2 Samuel 3:20's own exact count — no ratio applies
 * (brief: "a named, countable, renderable number taken directly from the
 * text"), so this stays fixed across every quality tier. */
export const ABNER_MEN_COUNT = 20;

/** Where David's escort/household presence gathers — a disclosed
 * design-choice headcount (claim-covenant-cast-scale), not a ratio of
 * claim-600-men; conceptually the same following introduced as
 * `davids-band`, not restated as a new count. */
export const DAVID_ESCORT_CENTER: [number, number] = [-16, -29];

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

/** The twenty's standing/seated slots beside Abner — exactly `ABNER_MEN_COUNT`. */
export const ABNER_MEN_SLOTS: [number, number][] = rejectionSampleAnnulus(
  ABNER_MEN_COUNT,
  230201,
  ABNER_MEN_CENTER,
  2,
  11,
  1.8,
);

/** David's escort — a buffer pool larger than any quality tier draws from
 * (target range 15–25, brief's "Scale assumptions"). */
export const DAVID_ESCORT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  230301,
  DAVID_ESCORT_CENTER,
  2,
  17,
  1.9,
);

/** Ambient townsfolk, scattered near the town's own house cluster rather
 * than the plaza — "a working town on an ordinary day," deliberately kept
 * out of the closed political meal at the feast ground (brief's "Scale
 * assumptions"). Buffer pool larger than any quality tier draws from
 * (target range 20–30). */
export const TOWN_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  230401,
  TOWN_CENTER,
  10,
  58,
  2.1,
);

// ---------------------------------------------------------------------------
// Feast dressing (asset-feast-props, claim-feast-form): mats/low tables and
// shared vessels laid between David's and Abner's seats — a single small
// instanced prop family (brief's performance target), not individual
// place-settings for every figure present.

export interface FeastPropSlot {
  x: number;
  z: number;
  rot: number;
  scale: number;
}

const FEAST_PROP_COUNT = 12;

export const FEAST_PROP_SLOTS: FeastPropSlot[] = (() => {
  const rng = mulberry32(230501);
  const out: FeastPropSlot[] = [];
  for (let i = 0; i < FEAST_PROP_COUNT; i++) {
    const t = i / (FEAST_PROP_COUNT - 1);
    const x = THREE.MathUtils.lerp(DAVID_SEAT_POS[0], ABNER_SEAT_POS[0], t) + (rng() - 0.5) * 4.2;
    const z = THREE.MathUtils.lerp(DAVID_SEAT_POS[1], ABNER_SEAT_POS[1], t) + (rng() - 0.5) * 4.2;
    out.push({ x, z, rot: rng() * Math.PI, scale: 0.82 + rng() * 0.34 });
  }
  return out;
})();
