import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  DAVID_PLAZA_POS,
  GATE_PLAZA_CENTER,
  TOWN_CENTER,
  TOWN_HOUSES,
} from '../hebron-anointing/layout';
import { NORTH_ROAD_CURVE, TOWN_AMBIENT_SLOTS } from '../hebron-covenant/layout';
import { GRAVE_POS, TOMB_CENTER, TOMB_ENTRY_POS } from '../hebron-gate/layout';

/**
 * Deterministic, scene-local layout for hebron-reckoning (ADR-006
 * conventions, mirroring hebron-gate/gibeon-pool's layout.ts). 1 unit = 1
 * meter, positions are x/z only (height sampled from terrain.ts at render
 * time). Reuses hebron-anointing's town/plaza constants and hebron-gate's own
 * tomb-ground constants directly — this scene's burial is the compositional
 * echo of hebron-gate's burial, same ground, days apart (the milestone's
 * closing image, per the brief). No Mahanaim geometry of any kind exists
 * anywhere in this module — the murder (4:5-7) is cards-only, per the
 * standing rule since gibeon-pool.
 *
 * The only genuinely new ground is the pool of Hebron (`POOL_CENTER`,
 * `claim-hebron-pool-feature`), placed east/south-east of the town — clear
 * of the terrace-ring and house-scatter extents (see layout.test.ts) and of
 * the valley channel hebron-anointing's terrain carves south of the town —
 * and the Arabah road the two assassins arrive on, entering from the
 * east/northeast (the brief's "Visual composition": distinct from
 * hebron-covenant's north road and hebron-gate's south-east raid road).
 */

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

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
    const tan = curve.getTangentAt(Math.max(0.001, u));
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}

export {
  DAVID_PLAZA_POS,
  GATE_PLAZA_CENTER,
  GRAVE_POS,
  TOMB_CENTER,
  TOMB_ENTRY_POS,
  TOWN_CENTER,
  TOWN_HOUSES,
};
export { NORTH_ROAD_CURVE, TOWN_AMBIENT_SLOTS };

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" (a)-(d)).

/** David's receiving ground — the same literal household-presence point
 * hebron-anointing/hebron-covenant/hebron-gate use; David has not moved
 * (`vp-receiving-ground`'s default focus). */
export { DAVID_PLAZA_POS as RECEIVING_GROUND_CENTER };

/** Where Rechab and Baanah stop and present their claim — close to David but
 * not on top of him, petitioners before a king (brief's "small before
 * David" sightline). */
export const PRESENTATION_POS: [number, number] = [11, -22];

/** Where the bundle is set down at the presentation and rests through the
 * verdict/execution beats, before its own journey to the tomb begins. */
export const BUNDLE_REST_POS: [number, number] = [8, -19];

/** The pool of Hebron (4:12), a modest basin east/south-east of the town —
 * clear of the terrace rings, house scatter, and the valley channel (see
 * terrain.ts, layout.test.ts). Placeholder placement per the brief; not the
 * extant Birket es-Sultan site/form. */
export const POOL_CENTER: [number, number] = [80, -10];
export const POOL_RADIUS = 8;

/** Just outside the basin's rim — where Rechab and Baanah are brought for
 * the execution, near the pool without standing in the depression itself. */
export const POOL_BANK_POS: [number, number] = [POOL_CENTER[0] - 10, POOL_CENTER[1] - 2];

/** Small guard/attendant cluster near David's receiving ground — "the young
 * men" of 4:12a are represented by this disclosed presence, not by a
 * separately modeled executioner gesture (see poses.ts). */
export const ATTENDANT_CENTER: [number, number] = [-14, -24];

// ---------------------------------------------------------------------------
// Routes.

/** The two assassins' arrival, up from the Arabah direction (east/northeast)
 * after their narrated night march (4:6-7) — distinct entry axis from
 * hebron-covenant's north road (west) and hebron-gate's raid road
 * (south-east), per the brief. The murder/flight itself (4:5-7) is narrated
 * only; this curve begins already well inside the composition, at the point
 * the observer is first shown them, and ends exactly at `PRESENTATION_POS`. */
export const ARABAH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(300, 0, -58),
    new THREE.Vector3(200, 0, -44),
    new THREE.Vector3(120, 0, -32),
    new THREE.Vector3(55, 0, -25),
    new THREE.Vector3(PRESENTATION_POS[0], 0, PRESENTATION_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

/** The short walk from the presentation point to the pool bank for the
 * execution (b-execution, 4:12a) — documentary distance throughout, no
 * invented method (ADR-009; see poses.ts). */
export const EXECUTION_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(PRESENTATION_POS[0], 0, PRESENTATION_POS[1]),
    new THREE.Vector3(38, 0, -18),
    new THREE.Vector3(60, 0, -13),
    new THREE.Vector3(POOL_BANK_POS[0], 0, POOL_BANK_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

/** The bundle's own route to the tomb of Abner (b-burial, 4:12b) — the same
 * tomb ground `hebron-gate` built (`TOMB_CENTER`, reused directly), the
 * milestone's closing image. */
export const BUNDLE_PROCESSION_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(BUNDLE_REST_POS[0], 0, BUNDLE_REST_POS[1]),
    new THREE.Vector3(-20, 0, -30),
    new THREE.Vector3(-40, 0, -40),
    new THREE.Vector3(-55, 0, -47),
    new THREE.Vector3(TOMB_CENTER[0], 0, TOMB_CENTER[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// Crowd slot pools (rejection-sampled annuli, ADR-006 convention).

/** David's attendants/guard — disclosed design count, ~8-14 at high tier
 * (`claim-reckoning-cast-scale`). "The young men" of 4:12a. */
export const ATTENDANT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  18,
  340101,
  ATTENDANT_CENTER,
  2,
  12,
  2.0,
);
