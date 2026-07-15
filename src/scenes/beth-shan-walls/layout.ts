import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for Beth-shan (ADR-006 conventions — a
 * fresh generator, NOT Ziklag's enclosed-ring: a tell city is a different
 * form). 1 unit = 1 meter, tell center at the origin. West (-x) is the
 * valley-road approach and the wall's outward face; east (+x) is the Jordan
 * valley / the retrieval party's direction; the wall arc sits on the
 * west-facing brow, above the gate plaza, per the brief's "Focal masses".
 */

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

export interface HouseSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
  h: number;
}

export interface WallSpec {
  x: number;
  z: number;
  rot: number;
  len: number;
}

export const WALL_RADIUS = 66;
export const WALL_HEIGHT = 3.4;
export const GATE_HALF_ARC = 0.12;
/** Angular half-span (radians) of the wall arc around the west point (theta=0). */
const WALL_HALF_ARC = 0.95;

/** theta=0 points due west (-x); positive theta sweeps north (+z). */
function brimPos(theta: number, r: number): [number, number] {
  return [-Math.cos(theta) * r, Math.sin(theta) * r];
}

function distanceToSegment(
  x: number,
  z: number,
  ax: number,
  az: number,
  bx: number,
  bz: number,
): number {
  const abx = bx - ax;
  const abz = bz - az;
  const apx = x - ax;
  const apz = z - az;
  const len2 = abx * abx + abz * abz;
  const t = len2 === 0 ? 0 : Math.min(1, Math.max(0, (apx * abx + apz * abz) / len2));
  const dx = apx - abx * t;
  const dz = apz - abz * t;
  return Math.hypot(dx, dz);
}

// ---------------------------------------------------------------------------
// Wall + gate

export const WALL_SEGMENTS: WallSpec[] = (() => {
  const rng = mulberry32(31501);
  const segments: WallSpec[] = [];
  const count = 20;
  for (let i = 0; i <= count; i++) {
    const theta = -WALL_HALF_ARC + (i / count) * (WALL_HALF_ARC * 2);
    if (Math.abs(theta) < GATE_HALF_ARC) continue; // gate gap
    const [x, z] = brimPos(theta, WALL_RADIUS);
    segments.push({
      x,
      z,
      rot: theta + Math.PI / 2 + (rng() - 0.5) * 0.02,
      len: (WALL_HALF_ARC * 2 * WALL_RADIUS) / count + 0.5,
    });
  }
  return segments;
})();

export const GATE_TOWERS: [number, number][] = [
  brimPos(-GATE_HALF_ARC - 0.05, WALL_RADIUS),
  brimPos(GATE_HALF_ARC + 0.05, WALL_RADIUS),
];

/** Four wrapped display forms, clustered on the wall face flanking the gate
 * (above the gate plaza — 1 Sam 31:10/12 and the 2 Sam 21:12 "public square"
 * variant both point at this spot; claim-beth-shan-wall, claim-body-display). */
export const DISPLAY_FORM_SLOTS: FigureSlot[] = [-0.52, -0.26, 0.26, 0.52].map((theta) => {
  // A touch outside the wall radius, so the forms read against the wall's
  // outward (valley-road-facing) face rather than sitting behind it.
  const [x, z] = brimPos(theta, WALL_RADIUS + 1.6);
  return { x, z, yaw: -theta };
});

// ---------------------------------------------------------------------------
// Town: dense summit quarter, narrow lanes (ADR-006 rider — not a ring plan)

const SUMMIT_RADIUS = 52;
const MONUMENT_PLAZA: [number, number, number] = [14, 16, 11]; // x, z, radius

/** Gate-to-center lane and a narrow cross lane, kept clear of houses. */
const LANES: { a: [number, number]; b: [number, number]; halfWidth: number }[] = [
  { a: [-58, 0], b: [6, 4], halfWidth: 5.5 },
  { a: [6, -38], b: [6, 38], halfWidth: 4 },
];

function inExcludedZone(x: number, z: number): boolean {
  const [mx, mz, mr] = MONUMENT_PLAZA;
  if (Math.hypot(x - mx, z - mz) < mr) return true;
  for (const lane of LANES) {
    if (distanceToSegment(x, z, lane.a[0], lane.a[1], lane.b[0], lane.b[1]) < lane.halfWidth) {
      return true;
    }
  }
  return false;
}

export const HOUSES: HouseSpec[] = (() => {
  const rng = mulberry32(31502);
  const houses: HouseSpec[] = [];
  const step = 6.6;
  for (let gx = -SUMMIT_RADIUS; gx <= SUMMIT_RADIUS; gx += step) {
    for (let gz = -SUMMIT_RADIUS; gz <= SUMMIT_RADIUS; gz += step * 0.92) {
      const x = gx + (rng() - 0.5) * 2.2;
      const z = gz + (rng() - 0.5) * 2.2;
      if (Math.hypot(x, z) > SUMMIT_RADIUS) continue;
      if (inExcludedZone(x, z)) continue;
      houses.push({
        x,
        z,
        rot: rng() * Math.PI,
        w: 3.6 + rng() * 2.4,
        d: 3.0 + rng() * 2.0,
        h: 2.3 + rng() * 0.7,
      });
    }
  }
  return houses;
})();

/** Curated Egyptian monuments near the summit (claim-egyptian-monuments) —
 * additive, not load-bearing; verification queued (fable-review-queue #16). */
export const MONUMENTS: { x: number; z: number; kind: 'stela' | 'statue' }[] = [
  { x: MONUMENT_PLAZA[0] - 3, z: MONUMENT_PLAZA[1] - 2, kind: 'stela' },
  { x: MONUMENT_PLAZA[0] + 3.5, z: MONUMENT_PLAZA[1] + 2.5, kind: 'statue' },
];

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled, ADR-006 convention 5)

function rejectionSample(
  count: number,
  seed: number,
  pick: (rng: () => number) => [number, number],
  minSpacing: number,
  guardMul = 60,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const [x, z] = pick(rng);
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

/** Gate-plaza gathering slots — the "public square" (2 Sam 21:12) below the wall. */
export const GATE_PLAZA_SLOTS: [number, number][] = rejectionSample(
  55,
  31503,
  (rng) => [-105 + (rng() * 2 - 1) * 38, (rng() * 2 - 1) * 26],
  2.1,
);

/** A smaller pool of slots inside the town lanes, for the "and lanes" half of
 * the brief's townspeople placement. */
export const TOWN_LANE_SLOTS: [number, number][] = rejectionSample(
  30,
  31504,
  (rng) => {
    const lane = LANES[Math.floor(rng() * LANES.length)];
    const t = rng();
    const x = lane.a[0] + (lane.b[0] - lane.a[0]) * t + (rng() - 0.5) * lane.halfWidth * 1.3;
    const z = lane.a[1] + (lane.b[1] - lane.a[1]) * t + (rng() - 0.5) * lane.halfWidth * 1.3;
    return [x, z];
  },
  2.0,
);

export const TOWNSPEOPLE_SLOTS: [number, number][] = [...GATE_PLAZA_SLOTS, ...TOWN_LANE_SLOTS];

/** A tighter cluster near the gate for the Philistine escort/detachment. */
export const ESCORT_GATE_SLOTS: [number, number][] = rejectionSample(
  18,
  31505,
  (rng) => [-82 + (rng() * 2 - 1) * 14, (rng() * 2 - 1) * 15],
  2.4,
);

/** A small standing cluster at the wall's foot for the retrieval party's work beat. */
export const NIGHT_WORK_SLOTS: [number, number][] = rejectionSample(
  10,
  31506,
  (rng) => [-76 + (rng() * 2 - 1) * 9, -30 + (rng() * 2 - 1) * 10],
  2.0,
);

// ---------------------------------------------------------------------------
// Paths

/** The valley road: the western approach from Gilboa/Jezreel up to the gate —
 * the axis the display is meant to be read along (brief "Sightlines"). */
export const VALLEY_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-380, 0, 10),
    new THREE.Vector3(-260, 0, -6),
    new THREE.Vector3(-170, 0, 12),
    new THREE.Vector3(-118, 0, -3),
    new THREE.Vector3(-90, 0, 5),
    new THREE.Vector3(-70, 0, 0),
  ],
  false,
  'catmullrom',
  0.5,
);

/** East brow — the sightline the news crosses (31:11) and the direction the
 * retrieval party comes from and leaves by, threading around the tell's
 * southern flank to the wall's foot (never through the gate/town — the
 * retrieval happens at the wall exterior, per the brief's "no invented guard
 * fight"). */
export const RETRIEVAL_PATH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(150, 0, -20),
    new THREE.Vector3(90, 0, -70),
    new THREE.Vector3(20, 0, -95),
    new THREE.Vector3(-40, 0, -80),
    new THREE.Vector3(-70, 0, -50),
    new THREE.Vector3(-78, 0, -30),
  ],
  false,
  'catmullrom',
  0.5,
);

export const EAST_BROW_POS: [number, number] = [150, -20];
export const NIGHT_GROUND_POS: [number, number] = [-78, -30];
