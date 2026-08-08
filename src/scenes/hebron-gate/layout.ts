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
import { NORTH_ROAD_CURVE } from '../hebron-covenant/layout';

/**
 * Deterministic, scene-local layout for hebron-gate (ADR-006 conventions,
 * mirroring hebron-covenant/gibeon-pool's layout.ts). 1 unit = 1 meter, same
 * axis convention as hebron-anointing: -z is north (uphill, toward the town
 * cluster), +z is south (the plaza), +x is east. Mandatory visual continuity
 * (docs/design/hebron-gate-brief.md, "Visual composition"): the town/terrace
 * massing and the gate plaza itself (`TOWN_HOUSES`, `TERRACE_SEGMENTS`,
 * `TOWN_CENTER`, `GATE_PLAZA_CENTER`, `DAVID_PLAZA_POS`) and Abner's own
 * north road (`NORTH_ROAD_CURVE`, hebron-covenant's) are imported and
 * re-exported unchanged — the same plaza that hosted the anointing (M4) and
 * received Abner in peace (hebron-covenant), "the reuse is the point." The
 * one genuinely new structure is the gate-passage interior below
 * (`claim-hebron-gate-form`) — "a gateway deep enough to draw someone aside
 * into," replacing hebron-anointing's simple two-post marker at the same
 * location, not duplicating it (`GATE_POSTS` is imported only for that
 * continuity note/tests, not re-rendered here).
 */
export {
  DAVID_PLAZA_POS,
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  NORTH_ROAD_CURVE,
  TERRACE_SEGMENTS,
  TOWN_CENTER,
  TOWN_HOUSES,
};

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
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
    const tan = curve.getTangentAt(u);
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
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

// ---------------------------------------------------------------------------
// The gate passage (claim-hebron-gate-form): a modest two-chamber gateway
// straddling hebron-anointing's own GATE_POSTS location — "the midst of the
// gate" (3:27) requires an interior deep enough to draw someone into. Not a
// monumental six-chamber Solomonic-type gate (brief's hard placeholder
// policy). South mouth (`GATE_SOUTH_Z`) opens onto the plaza; north mouth
// (`GATE_NORTH_Z`) opens toward the town cluster.

export const GATE_PASSAGE_CENTER: [number, number] = [0, -42];
export const GATE_SOUTH_Z = -37.5;
export const GATE_NORTH_Z = -46.5;
export const GATE_OUTER_X = 8;
export const GATE_WALL_THICK = 1.3;
export const GATE_WALL_HEIGHT = 3.1;

export interface GateWallSpec {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
}

/** Two outer walls (the passage's full length) plus two inward recess walls
 * — one per side, offset front/back so the two resulting alcoves read as
 * distinct chambers rather than a mirrored single notch. The west alcove
 * (`GATE_ASIDE_POCKET`) is where Joab draws Abner aside (3:27a); the east
 * alcove is dressed but never staged with the aside itself. */
export const GATE_WALLS: GateWallSpec[] = [
  // Outer side walls, full passage depth.
  { x: -GATE_OUTER_X, z: GATE_PASSAGE_CENTER[1], w: GATE_WALL_THICK, d: 9, h: GATE_WALL_HEIGHT },
  { x: GATE_OUTER_X, z: GATE_PASSAGE_CENTER[1], w: GATE_WALL_THICK, d: 9, h: GATE_WALL_HEIGHT },
  // West recess wall — closes the north end of the west alcove, open to the
  // plaza (south) and to the passage center (east).
  { x: -5.7, z: -45, w: 4.6, d: 1.1, h: GATE_WALL_HEIGHT },
  // East recess wall — mirrored, closes the south end of the east alcove.
  { x: 5.7, z: -39, w: 4.6, d: 1.1, h: GATE_WALL_HEIGHT },
  // A lintel beam over the narrowest point of the passage itself.
  { x: 0, z: GATE_PASSAGE_CENTER[1], w: 8, d: 1, h: 0.5 },
];
/** The lintel (last entry above) sits at this height above the walls. */
export const GATE_LINTEL_Y = GATE_WALL_HEIGHT + 0.1;

/** The west alcove — "the midst of the gate," its own shadowed interior
 * pocket — where the aside/strike (3:27) is staged, at documentary distance
 * from the plaza (`vp-gate-plaza`) and from `vp-gate-shadow`'s own vantage. */
export const GATE_ASIDE_POCKET: [number, number] = [-6, -41];
/** Where Abner (and Abishai, a few meters off) stand just inside the south
 * mouth before being drawn aside. */
export const GATE_SOUTH_MOUTH: [number, number] = [0, GATE_SOUTH_Z + 1];
export const ABISHAI_GATE_POS: [number, number] = [3.4, -39.5];

// ---------------------------------------------------------------------------
// Joab's returning raid party (3:22, "from a raid, bringing much spoil"): a
// fresh approach road distinct from Abner's own north road, entering from
// the east — no direction is narrated, so this is a disclosed staging
// choice (`claim-gate-cast-scale`) kept visually distinct from Abner's route
// for legibility, not a claim about the raid's actual origin.

export const JOAB_RAID_RETURN_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(260, 0, 40),
    new THREE.Vector3(170, 0, 10),
    new THREE.Vector3(95, 0, -4),
    new THREE.Vector3(46, 0, -10),
    new THREE.Vector3(20, 0, -10),
  ],
  false,
  'catmullrom',
  0.5,
);

export const JOAB_RAID_GROUND_CENTER: [number, number] = [26, -9];

export const JOAB_PROTEST_POS: [number, number] = [7, -16];

/** Where Joab stands as a mourner in front of the bier once he tears his
 * clothes (3:31) — right where Abner fell, before the procession departs. */
export const JOAB_MOURNER_START: [number, number] = [-4, -39.5];

// ---------------------------------------------------------------------------
// The tomb ground (brief, "Visual composition" (c)): a modest rock-cut entry
// on the hill's flank, well clear of the town-house scatter's own radius
// (claim-abner-tomb-form — the medieval "Tomb of Abner" tradition is
// explicitly not adopted as a site or form).

export const TOMB_POS: [number, number] = [-70, -55];
export const TOMB_ENTRANCE_INSET: [number, number] = [-68.6, -54.3];
export const TOMB_MOURNER_CENTER: [number, number] = [-62, -52];

// ---------------------------------------------------------------------------
// The procession route (3:31-32a): from where Abner fell, through the
// plaza, to the tomb ground — the funeral's spine, walked at funeral pace.

export const PROCESSION_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(GATE_ASIDE_POCKET[0], 0, GATE_ASIDE_POCKET[1]),
    new THREE.Vector3(-14, 0, -34),
    new THREE.Vector3(-32, 0, -40),
    new THREE.Vector3(-50, 0, -48),
    new THREE.Vector3(TOMB_POS[0], 0, TOMB_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled, ADR-006 convention).

/** Joab's raid party, disclosed ~15-25 at high tier (`claim-gate-cast-scale`). */
export const JOAB_RAID_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  240101,
  JOAB_RAID_GROUND_CENTER,
  2,
  14,
  1.9,
);

/** The mourning assembly ("all the people," 3:31-36): disclosed
 * representative crowd, ~60-90 at high tier — present from the scene's
 * start as ordinary bystanders near the plaza (the "figures at distance
 * noticing" the brief's held-reaction bridge calls for), then, from the
 * mourning-command beat on, reads as the formally-gathered mourners who
 * follow the bier to the tomb. A buffer pool larger than any quality tier
 * draws from. */
export const PLAZA_WATCH_SLOTS: [number, number][] = rejectionSampleAnnulus(
  100,
  240201,
  [10, -22],
  6,
  40,
  1.7,
);

export const TOMB_WATCH_SLOTS: [number, number][] = rejectionSampleAnnulus(
  100,
  240202,
  TOMB_MOURNER_CENTER,
  3,
  22,
  1.7,
);

/** Ambient townsfolk, scattered near the house cluster — a working town
 * still going about its own life at its edges while the gate/plaza carries
 * the day's real event, the same convention hebron-covenant used. */
export const TOWN_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  40,
  240301,
  TOWN_CENTER,
  10,
  58,
  2.1,
);
