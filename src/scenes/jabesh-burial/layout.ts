import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for Jabesh-gilead (ADR-006 conventions —
 * a fresh generator, distinct from both Ziklag's enclosed ring and
 * Beth-shan's dense tell quarter: a small **open, unwalled hamlet cluster**
 * on a Gilead hill terrace, per claim-jabesh-town-form). 1 unit = 1 meter.
 * West (-x) is the direction of the Jordan valley and Beth-shan — the axis
 * the retrieval column arrives along, climbing the wadi path; the village
 * terrace sits east and upslope of the path's end. See
 * docs/design/jabesh-burial-brief.md, "Visual composition".
 */

// ---------------------------------------------------------------------------
// The wadi path (the column's route) and the stream itself (a separate,
// narrower line — the path runs along the bank, not in the bed).

export const WADI_PATH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-430, 0, 55),
    new THREE.Vector3(-330, 0, 15),
    new THREE.Vector3(-230, 0, -15),
    new THREE.Vector3(-150, 0, -25),
    new THREE.Vector3(-90, 0, -8),
    new THREE.Vector3(-50, 0, 8),
    new THREE.Vector3(-22, 0, 6),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Where the path meets the village — the "money shot" vantage looks west from here. */
export const VILLAGE_EDGE_POS: [number, number] = [-22, 6];

export const CHANNEL_PATH: [number, number][] = [
  [-440, -55],
  [-320, -70],
  [-190, -50],
  [-70, -58],
  [40, -46],
  [150, -60],
  [270, -78],
];
export const CHANNEL_WIDTH = 42;
export const CHANNEL_DEPTH = 5;

// ---------------------------------------------------------------------------
// Village: a small open, unwalled hamlet cluster (8-12 structures) on the
// terrace east of the path's end — deliberately loose (min 11m spacing, a
// clear 16m-radius open yard at the center for the reception gathering),
// unlike Beth-shan's dense 6.6m-step summit quarter or Ziklag's ring.

export const VILLAGE_CENTER: [number, number] = [22, 10];
const VILLAGE_YARD_CLEAR_RADIUS = 16;
const VILLAGE_SCATTER_MIN_R = 18;
const VILLAGE_SCATTER_MAX_R = 55;
const VILLAGE_HOUSE_TARGET = 10;
const VILLAGE_HOUSE_MIN_SPACING = 11;

export interface HouseSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
  h: number;
}

export const HOUSES: HouseSpec[] = (() => {
  const rng = mulberry32(71801);
  const houses: HouseSpec[] = [];
  let guard = 0;
  while (houses.length < VILLAGE_HOUSE_TARGET && guard++ < VILLAGE_HOUSE_TARGET * 200) {
    const angle = rng() * Math.PI * 2;
    const r = VILLAGE_SCATTER_MIN_R + rng() * (VILLAGE_SCATTER_MAX_R - VILLAGE_SCATTER_MIN_R);
    const x = VILLAGE_CENTER[0] + Math.cos(angle) * r;
    const z = VILLAGE_CENTER[1] + Math.sin(angle) * r;
    if (Math.hypot(x - VILLAGE_CENTER[0], z - VILLAGE_CENTER[1]) < VILLAGE_YARD_CLEAR_RADIUS) {
      continue;
    }
    if (houses.some((h) => (h.x - x) ** 2 + (h.z - z) ** 2 < VILLAGE_HOUSE_MIN_SPACING ** 2)) {
      continue;
    }
    houses.push({
      x,
      z,
      rot: rng() * Math.PI,
      w: 3.2 + rng() * 2.1,
      d: 2.8 + rng() * 1.8,
      h: 2.0 + rng() * 0.6,
    });
  }
  return houses;
})();

// ---------------------------------------------------------------------------
// Focal masses outside the village: the pyre ground and the tamarisk.

export const PYRE_POS: [number, number] = [65, 40];
export const TAMARISK_POS: [number, number] = [100, -35];
export const GRAVE_POS: [number, number] = [TAMARISK_POS[0] + 3, TAMARISK_POS[1] - 2];

/** Where the four wrapped forms rest during the dawn reception, just inside
 * the village edge — a resting point between the wadi path and the houses. */
export const RECEPTION_CENTER: [number, number] = [0, 8];

function rowSlots(center: [number, number], count: number, spacing: number): [number, number][] {
  const out: [number, number][] = [];
  const start = -((count - 1) / 2) * spacing;
  for (let i = 0; i < count; i++) {
    out.push([center[0] + start + i * spacing, center[1]]);
  }
  return out;
}

/** Four bier positions at the dawn reception (biers laid side by side). */
export const RECEPTION_BIER_SLOTS: [number, number][] = rowSlots(RECEPTION_CENTER, 4, 2.4);

/** Four bier positions on the pyre platform (laid side by side before covering). */
export const PYRE_BIER_SLOTS: [number, number][] = rowSlots(PYRE_POS, 4, 1.6);

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled, ADR-006 convention).

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

/** Villagers gathered in the open yard for the dawn reception (b-received). */
export const VILLAGE_YARD_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  71802,
  VILLAGE_CENTER,
  4,
  15,
  2.0,
);

/** Villagers held at documentary distance around the pyre ground (b-pyre, b-bones). */
export const PYRE_GATHER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  71803,
  PYRE_POS,
  13,
  27,
  2.0,
);

/** Villagers gathered for the burial and the fast, around the tamarisk (b-tamarisk onward). */
export const TAMARISK_GATHER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  71804,
  TAMARISK_POS,
  9,
  22,
  2.0,
);

/** Where the retrieval column settles once it has arrived and laid the
 * biers down — they become part of the town's population from here on,
 * per the brief's "leadership reads by staging only" (no distinguished
 * named figure singled out afterward). */
export const RETRIEVAL_ARRIVAL_SLOTS: [number, number][] = rejectionSampleAnnulus(
  12,
  71805,
  [RECEPTION_CENTER[0] - 9, RECEPTION_CENTER[1] - 6],
  1,
  9,
  1.8,
);

// ---------------------------------------------------------------------------

function distanceToPolyline(x: number, z: number, path: [number, number][]): number {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const [ax, az] = path[i];
    const [bx, bz] = path[i + 1];
    const abx = bx - ax;
    const abz = bz - az;
    const apx = x - ax;
    const apz = z - az;
    const len2 = abx * abx + abz * abz;
    const t = len2 === 0 ? 0 : Math.min(1, Math.max(0, (apx * abx + apz * abz) / len2));
    const dx = apx - abx * t;
    const dz = apz - abz * t;
    const d2 = dx * dx + dz * dz;
    if (d2 < best) best = d2;
  }
  return Math.sqrt(best);
}

/** Distance from (x, z) to the wadi's centerline — drives the water-line
 * vegetation gradient (tamarisk/oleander thickest near the bed, thinning to
 * oak/scrub on the slopes). */
export function distanceToChannel(x: number, z: number): number {
  return distanceToPolyline(x, z, CHANNEL_PATH);
}
