import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  DAVID_PLAZA_POS,
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  TERRACE_SEGMENTS,
  TOWN_CENTER,
  TOWN_HOUSES,
} from '../hebron-anointing/layout';
import { NORTH_ROAD_CURVE, TOWN_AMBIENT_SLOTS } from '../hebron-covenant/layout';

/**
 * Deterministic, scene-local layout for hebron-gate (ADR-006 conventions,
 * mirroring hebron-covenant/gibeon-pool's layout.ts). 1 unit = 1 meter,
 * positions are x/z only (height sampled from terrain.ts at render time).
 * Reuses hebron-anointing's town/plaza/terrace constants and
 * hebron-covenant's north road/ambient-town slots directly — this is the
 * same Hebron gate plaza that hosted the anointing (M4) and received Abner
 * in peace (hebron-covenant); the reuse is the point (brief's "Visual
 * composition"). `DAVID_PLAZA_POS` is the same literal point David stood at
 * for the anointing — David has not moved his household presence, and this
 * scene deliberately does not re-invent it.
 *
 * The one new structure is the gate-passage interior (`asset-hebron-gate-
 * passage`, `claim-hebron-gate-form`): a modest two-chamber gateway, not a
 * monumental six-chamber Solomonic-type gate. It sits directly on
 * hebron-anointing's own `GATE_POSTS` line, deepened into the town's edge —
 * the two posts become the passage's outer piers.
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

// ---------------------------------------------------------------------------
// The gate passage (b-gate-aside, b-abner-death, 3:27): a modest two-chamber
// gateway built on hebron-anointing's own GATE_POSTS line (its two posts
// become the passage's outer piers). Deliberately shallow and small — "the
// midst of the gate" needs an interior deep enough to draw someone aside
// into, nothing more; not a monumental six-chamber Solomonic-type gate
// (brief's "Resolved design calls").

/** Corridor centerline z-span: outer (plaza-facing) to inner (town-facing). */
export const GATE_PASSAGE_OUTER_Z = -35;
export const GATE_PASSAGE_INNER_Z = -50;
export const GATE_PASSAGE_HALF_WIDTH = 3.1;
/** The two chamber recesses flanking the corridor, roughly at its midpoint. */
export const GATE_CHAMBER_Z = (GATE_PASSAGE_OUTER_Z + GATE_PASSAGE_INNER_Z) / 2;
export const GATE_CHAMBER_HALF_DEPTH = 2.6;
export const GATE_CHAMBER_OFFSET_X = GATE_PASSAGE_HALF_WIDTH + 2.4;

/** "The midst of the gate" (3:27a) — the private interior point Joab draws
 * Abner aside to, off the straight through-line and into the east chamber's
 * mouth (the drawing-aside gesture's destination, not the corridor's center
 * line — an aside must actually go aside). Held in shadow: `vp-gate-shadow`
 * frames this point at documentary distance, never closer. */
export const ASIDE_POINT: [number, number] = [GATE_CHAMBER_OFFSET_X - 1.4, GATE_CHAMBER_Z];

/** Just outside the gate's outer threshold, where Joab waits for Abner's
 * return before drawing him in. */
export const GATE_WAIT_POS: [number, number] = [2, GATE_PASSAGE_OUTER_Z + 4];

// ---------------------------------------------------------------------------
// Plaza positions.

/** Joab's own standing position at the plaza for the protest (3:24-25),
 * facing David across the same ground hebron-anointing/hebron-covenant used. */
export const JOAB_PLAZA_POS: [number, number] = [-9, -17];

/** Where the mourning assembly first gathers (present from the scene's
 * start as ordinary townspeople near the gate — the same figures who, per
 * the brief's held-reaction beat, are the ones "noticing, motionless" after
 * the strike, before becoming the funeral's mourning procession). West of
 * the plaza's center, mirrored by the raid party's east-side arrival. */
export const MOURNING_GATHER_CENTER: [number, number] = [-16, -6];

/** Joab's raid party's arrival-side gathering ground, east of the plaza. */
export const RAID_PARTY_CENTER: [number, number] = [20, -4];

export {
  DAVID_PLAZA_POS,
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  TERRACE_SEGMENTS,
  TOWN_CENTER,
  TOWN_HOUSES,
};
export { NORTH_ROAD_CURVE, TOWN_AMBIENT_SLOTS };

// ---------------------------------------------------------------------------
// Routes.

/** Joab's raid party returns from an unspecified direction (3:22 names no
 * route) — staged from the south-east, a distinct arrival axis from Abner's
 * northern road (reused from hebron-covenant), so the two "returns" read as
 * visually separate journeys. */
export const RAID_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(210, 0, 85),
    new THREE.Vector3(140, 0, 55),
    new THREE.Vector3(70, 0, 20),
    new THREE.Vector3(28, 0, 2),
    new THREE.Vector3(RAID_PARTY_CENTER[0] + 4, 0, RAID_PARTY_CENTER[1] + 6),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Where the north road (Abner's own departure route, hebron-covenant)
 * passes closest to the gate plaza — found once by sampling, since a
 * Catmull-Rom curve's `u` does not correspond linearly to its control
 * points. Abner's silent return (3:26's recall is narrated, never staged)
 * re-enters the composition at this point, already on his way back through
 * the gate — the same road he left "in peace" on. */
export const ABNER_RETURN_GATE_U: number = (() => {
  let bestU = 0;
  let bestD = Infinity;
  for (let i = 0; i <= 200; i++) {
    const u = i / 200;
    const p = NORTH_ROAD_CURVE.getPointAt(u);
    const d = (p.x - GATE_PLAZA_CENTER[0]) ** 2 + (p.z - GATE_PLAZA_CENTER[1]) ** 2;
    if (d < bestD) {
      bestD = d;
      bestU = u;
    }
  }
  return bestU;
})();

/** The funeral procession's own spine (b-procession, 3:31-32a): from the
 * gate, through open ground south-west of the town (clear of the terrace
 * rings and the house scatter — see layout.test.ts), to the tomb ground on
 * the hill's western flank. Funeral pace, not the covenant feast's brisker
 * arrival walk. */
/** On the hill's western flank — far enough from the town-house scatter and
 * terrace rings to read as distinct ground (layout.test.ts), but close
 * enough to the mound's own rise to read visibly as a flank, not flat
 * ground (terrain.test.ts). */
export const TOMB_CENTER: [number, number] = [-58, -50];

export const PROCESSION_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, GATE_PASSAGE_OUTER_Z - 2),
    new THREE.Vector3(-22, 0, -26),
    new THREE.Vector3(-42, 0, -30),
    new THREE.Vector3(-55, 0, -42),
    new THREE.Vector3(TOMB_CENTER[0], 0, TOMB_CENTER[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// Crowd slot pools (rejection-sampled annuli, ADR-006 convention).

/** Joab's raid party (3:22, "from a raid, bringing much spoil") — a
 * disclosed design count, ~15-25 at high tier (claim-gate-cast-scale), not a
 * narrated number. Pool sized generously for the high-tier target. */
export const RAID_PARTY_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  330101,
  RAID_PARTY_CENTER,
  2,
  16,
  2.0,
);

/** The mourning assembly's initial gathering slots near the plaza (present
 * from the scene's start as Hebron's own townspeople). */
export const MOURNING_GATHER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  100,
  330201,
  MOURNING_GATHER_CENTER,
  2,
  22,
  2.1,
);

/** The mourning assembly's graveside slots at the tomb ground — the same
 * count/order as the gather slots (each figure keeps its own index across
 * both pools so its procession journey is a single, continuous walk). */
export const MOURNING_TOMB_SLOTS: [number, number][] = rejectionSampleAnnulus(
  100,
  330202,
  [TOMB_CENTER[0] + 10, TOMB_CENTER[1] - 4],
  4,
  30,
  2.1,
);

/** The tomb's own rock-cut entry point (claim-abner-tomb-form) — a simple
 * placeholder entry on the hill's flank, explicitly not the medieval "Tomb
 * of Abner" tradition/site in modern Hebron. */
export const TOMB_ENTRY_POS: [number, number] = [TOMB_CENTER[0] + 3, TOMB_CENTER[1] - 1];

/** Where the bier settles at the graveside before burial. */
export const GRAVE_POS: [number, number] = [TOMB_CENTER[0] + 1, TOMB_CENTER[1] + 2];

/** David's position at the graveside, distinct from the mourner mass —
 * "King David followed the bier" (3:31b) and "the king lamented for Abner"
 * (3:33) both keep him individually legible, not folded into the crowd. */
export const DAVID_GRAVE_POS: [number, number] = [TOMB_CENTER[0] - 3, TOMB_CENTER[1] + 3];

/** Where Joab (and, by extension, the mourners he leads, 3:31) stands at the
 * graveside — near the bier, distinct from David's own position behind it. */
export const JOAB_GRAVE_POS: [number, number] = [TOMB_CENTER[0] + 4, TOMB_CENTER[1] + 4];
