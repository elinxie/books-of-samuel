import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic placeholder layout for the Besor-crossing scene. 1 unit = 1
 * meter. The wadi runs roughly NW-SE; north bank (negative z) is the near
 * side coming from Ziklag, south bank (positive z) is open country toward
 * the Amalekite camp. See docs/design/besor-crossing-brief.md.
 */

export const CHANNEL_PATH: [number, number][] = [
  [-320, -90],
  [-180, -55],
  [-70, -22],
  [10, 8],
  [110, 42],
  [260, 88],
];
export const CHANNEL_WIDTH = 130;
export const CHANNEL_DEPTH = 8;

/** Where the route crosses — a vertex on the channel centerline itself. */
export const FORD_POS: [number, number] = [10, 8];

/** Baggage laager: north bank, upslope from the bed, west of the ford. */
export const LAAGER_CENTER: [number, number] = [-25, -35];

/** Open country south of the bed where the Egyptian is found — off-route. */
export const SOUTH_FIELD_CENTER: [number, number] = [35, 55];
export const EGYPTIAN_POS: [number, number] = [42, 60];

/** Where the returning four hundred and the waiting two hundred reconvene. */
export const REUNION_POS: [number, number] = [-8, -5];

/** North approach: from the Ziklag-direction road down to the ford. */
export const NORTH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(30, 0, -260),
    new THREE.Vector3(18, 0, -190),
    new THREE.Vector3(6, 0, -110),
    new THREE.Vector3(4, 0, -40),
    new THREE.Vector3(9, 0, 4),
  ],
  false,
  'catmullrom',
  0.5,
);

/** South route: from the ford, past the south field, on toward the raiders. */
export const SOUTH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(11, 0, 14),
    new THREE.Vector3(20, 0, 55),
    new THREE.Vector3(32, 0, 105),
    new THREE.Vector3(45, 0, 165),
    new THREE.Vector3(55, 0, 230),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Settling positions for the two hundred, seeded and collision-spaced. */
export const LAAGER_SLOTS: [number, number][] = (() => {
  const slots: [number, number][] = [];
  const rng = mulberry32(9001);
  let guard = 0;
  while (slots.length < 24 && guard++ < 3000) {
    const x = LAAGER_CENTER[0] + (rng() * 2 - 1) * 16;
    const z = LAAGER_CENTER[1] + (rng() * 2 - 1) * 13;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > 1.6 ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
})();

/** Pack-donkey positions at the laager (see claim-pack-donkeys). */
export const DONKEY_SLOTS: [number, number][] = [
  [LAAGER_CENTER[0] - 8, LAAGER_CENTER[1] + 6],
  [LAAGER_CENTER[0] - 4, LAAGER_CENTER[1] + 9],
  [LAAGER_CENTER[0] + 1, LAAGER_CENTER[1] + 7],
  [LAAGER_CENTER[0] - 10, LAAGER_CENTER[1] + 1],
  [LAAGER_CENTER[0] + 3, LAAGER_CENTER[1] + 2],
  [LAAGER_CENTER[0] - 6, LAAGER_CENTER[1] - 4],
];

/** Standing-pool spots in low points of the braided bed (design placeholder). */
export const POOL_SPOTS: { x: number; z: number; r: number }[] = [
  { x: -140, z: -55, r: 15 },
  { x: -25, z: -6, r: 9 },
  { x: 70, z: 26, r: 12 },
];

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

/** Distance from (x, z) to the wadi centerline — drives the bank vegetation gradient. */
export function distanceToChannel(x: number, z: number): number {
  return distanceToPolyline(x, z, CHANNEL_PATH);
}

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
