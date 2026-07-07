import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic placeholder layout for the Ziklag scene.
 * Plan type: early Iron Age "enclosed settlement" — a belt of dwellings ringing
 * an open center (comparative model: Beersheba VII; see claim-oval-plan).
 * Applying it to Ziklag is speculative and labeled as such in the UI.
 * 1 unit = 1 meter. Settlement center at (0, 0); north gate at -z.
 */

export interface HouseSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
  h: number;
  collapsed: boolean;
  roofGone: boolean;
}

export interface WallSpec {
  x: number;
  z: number;
  rot: number;
  len: number;
  h: number;
}

const rng = mulberry32(20260706);

const RING_RADIUS = 38;
const WALL_RADIUS = 45.5;
const GATE_HALF_ARC = 0.14; // radians of gap at north
const POSTERN_HALF_ARC = 0.08; // radians of gap at south

function ringPos(theta: number, r: number): [number, number] {
  // theta = 0 points north (-z), increasing clockwise viewed from above.
  return [Math.sin(theta) * r, -Math.cos(theta) * r];
}

export const HOUSES: HouseSpec[] = (() => {
  const houses: HouseSpec[] = [];
  const ringCount = 24;
  for (let i = 0; i < ringCount; i++) {
    const theta = (i / ringCount) * Math.PI * 2 + (rng() - 0.5) * 0.06;
    if (
      Math.abs(THREE.MathUtils.euclideanModulo(theta + Math.PI, Math.PI * 2) - Math.PI) <
      GATE_HALF_ARC + 0.08
    )
      continue; // north gate gap
    if (Math.abs(theta - Math.PI) < POSTERN_HALF_ARC + 0.06) continue; // south postern gap
    const r = RING_RADIUS + (rng() - 0.5) * 4;
    const [x, z] = ringPos(theta, r);
    houses.push({
      x,
      z,
      rot: theta + (rng() - 0.5) * 0.15,
      w: 5.5 + rng() * 2.5,
      d: 4 + rng() * 2,
      h: 2.5 + rng() * 0.7,
      collapsed: rng() < 0.4,
      roofGone: rng() < 0.7,
    });
  }
  // Inner cluster of dwellings/storerooms.
  for (let i = 0; i < 9; i++) {
    const theta = rng() * Math.PI * 2;
    const r = 13 + rng() * 12;
    const [x, z] = ringPos(theta, r);
    if (Math.abs(x) < 6 && z > -30 && z < 30) continue; // keep a lane through the center
    houses.push({
      x,
      z,
      rot: rng() * Math.PI,
      w: 4.5 + rng() * 2.5,
      d: 3.5 + rng() * 2,
      h: 2.4 + rng() * 0.6,
      collapsed: rng() < 0.45,
      roofGone: rng() < 0.75,
    });
  }
  return houses;
})();

export const WALLS: WallSpec[] = (() => {
  const walls: WallSpec[] = [];
  const segments = 34;
  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    if (
      Math.abs(THREE.MathUtils.euclideanModulo(theta + Math.PI, Math.PI * 2) - Math.PI) <
      GATE_HALF_ARC
    )
      continue;
    if (Math.abs(theta - Math.PI) < POSTERN_HALF_ARC) continue;
    const [x, z] = ringPos(theta, WALL_RADIUS);
    walls.push({
      x,
      z,
      rot: theta,
      len: (Math.PI * 2 * WALL_RADIUS) / segments + 0.6,
      h: rng() < 0.25 ? 1.3 + rng() * 0.6 : 2.4 + rng() * 0.5, // some stretches toppled
    });
  }
  return walls;
})();

export const GATE_TOWERS: [number, number][] = [
  ringPos(-GATE_HALF_ARC - 0.045, WALL_RADIUS),
  ringPos(GATE_HALF_ARC + 0.045, WALL_RADIUS),
];

/** Smoke rises from a deterministic subset of ruined structures. */
export const SMOKE_ORIGINS: { x: number; z: number; major: boolean }[] = (() => {
  const picks: { x: number; z: number; major: boolean }[] = [];
  const r2 = mulberry32(77);
  const shuffled = [...HOUSES].sort(() => r2() - 0.5);
  for (let i = 0; i < Math.min(7, shuffled.length); i++) {
    picks.push({ x: shuffled[i].x, z: shuffled[i].z, major: i < 3 });
  }
  return picks;
})();

/** Approach of the returning column, from the north road to the gate. */
export const APPROACH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(20, 0, -340),
    new THREE.Vector3(9, 0, -250),
    new THREE.Vector3(-6, 0, -165),
    new THREE.Vector3(5, 0, -100),
    new THREE.Vector3(0, 0, -47),
    new THREE.Vector3(0, 0, -24),
    new THREE.Vector3(-1, 0, -10),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Departure south through the postern toward the Besor drainage. */
export const EXIT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, -8),
    new THREE.Vector3(1, 0, 18),
    new THREE.Vector3(-2, 0, 46),
    new THREE.Vector3(-7, 0, 120),
    new THREE.Vector3(-14, 0, 260),
    new THREE.Vector3(-10, 0, 420),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Gathering positions on the open center, seeded and collision-spaced. */
export const PLAZA_SLOTS: [number, number][] = (() => {
  const slots: [number, number][] = [];
  const r3 = mulberry32(4242);
  let guard = 0;
  while (slots.length < 80 && guard++ < 4000) {
    const x = (r3() * 2 - 1) * 14;
    const z = -6 + (r3() * 2 - 1) * 11;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > 1.4 ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
})();

export const FIELDS: { x: number; z: number; w: number; d: number; rot: number }[] = [
  { x: 85, z: -18, w: 46, d: 30, rot: 0.3 },
  { x: 96, z: 30, w: 38, d: 26, rot: 0.1 },
  { x: -92, z: 16, w: 42, d: 30, rot: -0.25 },
  { x: -70, z: 84, w: 34, d: 24, rot: 0.15 },
];

export const THRESHING_FLOOR: { x: number; z: number; r: number } = { x: 27, z: -66, r: 6.5 };
export const WELL_POS: [number, number] = [14, -60];

/** Points along a curve for rendering a worn path. */
export function samplePath(
  curve: THREE.CatmullRomCurve3,
  step = 7,
): { pos: THREE.Vector3; yaw: number }[] {
  const length = curve.getLength();
  const n = Math.floor(length / step);
  const out: { pos: THREE.Vector3; yaw: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}
