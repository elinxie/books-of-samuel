import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { TOWN_CENTER } from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-covenant (ADR-006
 * conventions). 1 unit = 1 meter; same axis convention as hebron-anointing
 * (-z north, +z south, +x east) — see docs/design/hebron-covenant-brief.md,
 * "Visual composition"/"Resolved design calls". `TOWN_CENTER` (and, via the
 * reused `TownAndPlaza`/`TerraceWalls`/`Vegetation` components, the town
 * massing, terrace rings, and gate posts themselves) is imported directly
 * from hebron-anointing rather than redefined here — the brief's "visual
 * continuity is mandatory" instruction and ADR-006's "constants may be
 * imported/shared" allowance, taken together, extend to reusing the whole
 * generic-massing components, not just their numeric constants: this is the
 * same place, a few years later, and nothing about its town/terrace form has
 * changed between the two scenes.
 */

// ---------------------------------------------------------------------------
// The northern road (b-arrival/b-peace): the deliberate inverse of
// hebron-anointing's southern approach column — Abner comes from the
// direction of Israel/Benjamin territory (north), not the Negev (south).
// Swings around the town's east flank (well outside the terrace rings'
// radius) to reach the same gate-plaza point hebron-anointing's own approach
// road ends at ([0, -14]) — the two roads are deliberately the same
// destination, from opposite directions. Exact course is a disclosed
// placeholder (brief's "Placeholder policy").

export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(20, 0, -340),
    new THREE.Vector3(95, 0, -240),
    new THREE.Vector3(120, 0, -120),
    new THREE.Vector3(80, 0, -40),
    new THREE.Vector3(30, 0, -18),
    new THREE.Vector3(0, 0, -14),
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

/** A point on the northern road at `u` in [0,1] (0 = far north start, 1 =
 * the gate plaza). Yaw faces the direction of increasing `u` (arriving). */
export function northRoadPointAt(u: number): RoadPoint {
  const c = Math.min(1, Math.max(0, u));
  const pos = NORTH_ROAD_CURVE.getPointAt(c);
  const tan = NORTH_ROAD_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, c)));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

/** Hoisted endpoints — reused every frame by several figures' pose
 * functions, so these avoid reallocating curve points/tangents constantly
 * (jabesh-burial c5aac8f hoisting precedent, also followed by
 * gibeon-pool/layout.ts). */
export const NORTH_ROAD_START: RoadPoint = northRoadPointAt(0);
export const NORTH_ROAD_END: RoadPoint = northRoadPointAt(1);

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
// The reception point (b-arrival): where Abner's party is gathered/received
// just inside the gate plaza, before the party disperses to the feast
// ground proper.

export const ARRIVAL_GATHER_CENTER: [number, number] = [8, -18];

// ---------------------------------------------------------------------------
// The feast ground (b-feast/b-pledge): a dressed courtyard space east of the
// gate plaza, distinct from it — "a prepared open-air meal in a
// courtyard/plaza space consistent with hebron-anointing's existing town
// rendering," per the brief. Two facing clusters (Abner's party, David's
// escort) around a shared mat/vessel center (`FeastGround.tsx`).

export const FEAST_GROUND_CENTER: [number, number] = [34, -6];
export const ABNER_FEAST_CLUSTER_CENTER: [number, number] = [22, -14];
export const ABNER_PRINCIPAL_SEAT: [number, number] = [28, -9];
export const DAVID_FEAST_CLUSTER_CENTER: [number, number] = [46, 2];
export const DAVID_PRINCIPAL_SEAT: [number, number] = [39, -3];

// ---------------------------------------------------------------------------
// Rejection-sampled annulus helper (ADR-006 convention).

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

/** Abner's twenty men's feast slots — literal 1:1 count (3:20), fixed
 * regardless of quality tier (same register as gibeon-pool's twelve-a-side
 * champions). */
export const ABNER_MEN_COUNT = 20;
export const ABNER_FEAST_SLOTS: [number, number][] = rejectionSampleAnnulus(
  ABNER_MEN_COUNT,
  43201,
  ABNER_FEAST_CLUSTER_CENTER,
  3,
  13,
  1.8,
);

/** David's escort at the feast — a disclosed design-choice count (no
 * narrated headcount), scaled by quality tier in the scene component. */
export function buildDavidEscortSlots(count: number, seed = 43202): [number, number][] {
  return rejectionSampleAnnulus(count, seed, DAVID_FEAST_CLUSTER_CENTER, 3, 15, 1.8);
}

/** Ambient townsfolk, scattered around the town hill — "a working town on
 * an ordinary day," deliberately far below hebron-anointing's civic-assembly
 * scale. Disclosed design-choice count, scaled by quality tier. */
export function buildTownBackgroundSlots(count: number, seed = 43203): [number, number][] {
  return rejectionSampleAnnulus(count, seed, TOWN_CENTER, 16, 68, 2.4);
}
