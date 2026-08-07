import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { TOWN_CENTER } from '../hebron-anointing/layout';
import { TOMB_POS } from '../hebron-gate/layout';

/**
 * Deterministic, scene-local layout for hebron-reckoning (ADR-006
 * conventions). 1 unit = 1 meter; same axis convention as the other two M5
 * scenes (-z north, +z south, +x east) — see
 * docs/design/hebron-reckoning-brief.md, "Visual composition". `TOWN_CENTER`
 * (and, via the reused `TownAndPlaza`/`TerraceWalls`/`Vegetation`
 * components, the town massing itself) comes from hebron-anointing;
 * `TOMB_POS` comes from hebron-gate, imported directly rather than
 * redefined — "the same tomb, days apart" is the milestone's deliberate
 * closing image, so this scene reuses the exact coordinates, not an
 * approximation of them.
 *
 * The receiving ground sits near the same gate-plaza continuity anchor the
 * other two M5 scenes use (a courtyard/plaza space, not a new location); the
 * two genuinely new pieces of ground are the arrival road from the Arabah
 * direction (east/northeast, per the brief's disclosed morning-arrival
 * inference) and the pool of Hebron itself (4:12), a modest basin placed
 * near the town — `claim-hebron-pool-feature`, terrain carved in `./terrain.ts`.
 */

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// The receiving ground (b-presentation through b-execution): a courtyard/
// plaza space near the same gate-plaza continuity anchor hebron-covenant/
// hebron-gate use, not itself redrawn here (no new plaza geometry — the
// brief's "nothing else is new ground" beyond the pool and the arrival
// road).

export const DAVID_RECEIVING_POS: [number, number] = [8, -16];
/** Where Rechab and Baanah stand to present the bundle — small before
 * David, a petitioner's distance, never a throne-audience staging. */
export const PRESENTATION_POS: [number, number] = [3, -21];

// ---------------------------------------------------------------------------
// The arrival road (b-arrival, 4:8a): the assassins' approach from the
// Arabah direction (east/northeast) after their narrated night march (4:7b)
// — the deliberate inverse of hebron-covenant's northern road and
// hebron-gate's short north-east raid road, distinct from both. Exact course
// is a disclosed placeholder (no route is described in the text).

export const ARRIVAL_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(390, 0, -165),
    new THREE.Vector3(250, 0, -98),
    new THREE.Vector3(140, 0, -50),
    new THREE.Vector3(58, 0, -27),
    new THREE.Vector3(PRESENTATION_POS[0], 0, PRESENTATION_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

export interface RoadPoint {
  x: number;
  z: number;
  yaw: number;
}

export function arrivalRoadPointAt(u: number): RoadPoint {
  const c = Math.min(1, Math.max(0, u));
  const pos = ARRIVAL_ROAD_CURVE.getPointAt(c);
  const tan = ARRIVAL_ROAD_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, c)));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

export const ARRIVAL_ROAD_START: RoadPoint = arrivalRoadPointAt(0);
export const ARRIVAL_ROAD_END: RoadPoint = arrivalRoadPointAt(1);

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
// The pool of Hebron (b-execution, 4:12): a modest basin near the town,
// disclosed placeholder placement — `claim-hebron-pool-feature`, modeled on
// gibeon-pool's own basin/no-water-shader convention, explicitly not the
// extant "Birket es-Sultan" pool in modern Hebron.

export const POOL_CENTER: [number, number] = [40, 46];
export const POOL_RADIUS = 7;

/** Documentary-distance execution ground near (not at) the pool — two
 * adjacent standing slots, never a shared single point (Rechab and Baanah
 * are staged as two individuals throughout, never merged into one figure). */
export const EXECUTION_GATHER_CENTER: [number, number] = [POOL_CENTER[0] - 13, POOL_CENTER[1] - 5];
export const RECHAB_EXECUTION_POS: [number, number] = [
  EXECUTION_GATHER_CENTER[0] - 1.6,
  EXECUTION_GATHER_CENTER[1],
];
export const BAANAH_EXECUTION_POS: [number, number] = [
  EXECUTION_GATHER_CENTER[0] + 1.6,
  EXECUTION_GATHER_CENTER[1],
];

// ---------------------------------------------------------------------------
// The burial route (b-burial, 4:12b): the head-bundle's own path from the
// receiving ground straight to Abner's tomb — it never travels near the
// pool (the hands-and-feet display, caption-only, is a separate, unrendered
// fact; the bundle's own journey is unrelated to that site).

export const BURIAL_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(PRESENTATION_POS[0], 0, PRESENTATION_POS[1]),
    new THREE.Vector3(20, 0, -32),
    new THREE.Vector3(42, 0, -48),
    new THREE.Vector3(TOMB_POS[0], 0, TOMB_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

export function burialRoutePointAt(u: number): RoadPoint {
  const c = Math.min(1, Math.max(0, u));
  const pos = BURIAL_ROUTE_CURVE.getPointAt(c);
  const tan = BURIAL_ROUTE_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, c)));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

export const BURIAL_ROUTE_END: RoadPoint = burialRoutePointAt(1);

// ---------------------------------------------------------------------------
// Rejection-sampled annulus helper (ADR-006 convention, duplicated locally
// per "layout code stays local" — see docs/architecture.md).

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

/** David's attendants — the "young men" 4:12a attributes the execution to
 * (`claim-reckoning-cast-scale`), a disclosed design count, ≈8-14 figures at
 * high quality tier. Present near the receiving ground throughout; the
 * execution itself is staged as Rechab and Baanah's own collapse (no gesture
 * is invented, per the brief), so this group never travels to the pool. */
export function buildAttendantSlots(count: number, seed = 45101): [number, number][] {
  return rejectionSampleAnnulus(count, seed, DAVID_RECEIVING_POS, 3, 15, 1.9);
}

/** Ambient townsfolk — a working town continuing an ordinary morning around
 * the judgment (`claim-reckoning-cast-scale`), a disclosed design count,
 * ≈10-20 figures at high quality tier, static throughout. */
export function buildAmbientTownSlots(count: number, seed = 45201): [number, number][] {
  return rejectionSampleAnnulus(count, seed, TOWN_CENTER, 16, 66, 2.4);
}
