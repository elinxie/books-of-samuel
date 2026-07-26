import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for gibeon-pool (ADR-006 conventions,
 * mirroring hebron-anointing/gilboa-battle's layout.ts). 1 unit = 1 meter.
 * -z is north (the direction Abner's contingent arrives from and retreats
 * toward — Mahanaim itself is narrated only, never built, per the brief's
 * "Location note"); +z is south (the direction Joab's contingent faces,
 * toward Judah/Bethlehem/Hebron — also never built here); +x is east, the
 * direction the battle spreads and the pursuit route runs, toward the hill
 * of Ammah. Positions are x/z only — height is sampled from terrain.ts at
 * render time, never baked in here. See docs/design/gibeon-pool-brief.md,
 * "Visual composition" (the five focal masses: the pool, the champions'
 * ground, the spreading battlefield, the pursuit route, the hill of Ammah).
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

// ---------------------------------------------------------------------------
// Focal centers.

/** The pool of Gibeon (2:13) — this scene's establishing shot, composed first. */
export const POOL_CENTER: [number, number] = [0, 0];
export const POOL_RADIUS = 13;

/** Where each company gathers, seated on opposite banks (2:13). */
export const ISRAEL_BANK_CENTER: [number, number] = [0, -34];
export const JUDAH_BANK_CENTER: [number, number] = [0, 34];

/** The named principals' standing positions at the pool. */
export const ABNER_POOL_POS: [number, number] = [-7, -25];
export const JOAB_POOL_POS: [number, number] = [7, 25];
export const ABISHAI_POOL_POS: [number, number] = [12, 29];
export const ASAHEL_POOL_POS: [number, number] = [2, 29];

/** The champions' ground: at/immediately beside the pool (brief's focal mass b). */
export const CHAMPIONS_PAIR_COUNT = 12;

/** The wider battlefield the contest ignites into (2:17), east of the pool. */
export const BATTLE_SPREAD_ABNER_CENTER: [number, number] = [55, -20];
export const BATTLE_SPREAD_JOAB_CENTER: [number, number] = [55, 20];

/** The hill of Ammah (2:24-25) — the pursuit route's destination. */
export const AMMAH_HILL_POS: [number, number] = [230, 50];

/**
 * The shared spine of the pursuit route (brief's focal mass d): from the
 * spreading battlefield, out into open ground away from Gibeon, to the hill
 * of Ammah. Abner (and Asahel, chasing him) travel this curve to u=1 (the
 * hill's summit); Joab and Abishai are capped short of the summit
 * (`HILL_BASE_U`) so the Benjaminites read as physically above them, per
 * the brief's deliberate visual irony.
 */
export const PURSUIT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(45, 0, 0),
    new THREE.Vector3(100, 0, 12),
    new THREE.Vector3(150, 0, 28),
    new THREE.Vector3(195, 0, 42),
    new THREE.Vector3(230, 0, 50),
  ],
  false,
  'catmullrom',
  0.5,
);

/** How far along `PURSUIT_CURVE` Joab/Abishai's contingent halts — short of
 * the hill's summit, at its base. */
export const HILL_BASE_U = 0.82;

export function samplePursuitPoint(u: number): { x: number; z: number; yaw: number } {
  const c = Math.min(1, Math.max(0, u));
  const pos = PURSUIT_CURVE.getPointAt(c);
  const tan = PURSUIT_CURVE.getTangentAt(Math.max(0.001, c));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

// ---------------------------------------------------------------------------
// Champions' pair slots: 12 pairs, one Benjaminite + one Judahite each,
// starting near their own bank and meeting at/beside the pool
// (claim-champions-contest) — literal 1:1 count, no ratio.

export interface ChampionPairSlot {
  x: number;
  benjStart: [number, number];
  benjMeet: [number, number];
  judStart: [number, number];
  judMeet: [number, number];
}

export function buildChampionPairSlots(
  count = CHAMPIONS_PAIR_COUNT,
  seed = 220601,
): ChampionPairSlot[] {
  const rng = mulberry32(seed);
  const out: ChampionPairSlot[] = [];
  const span = 64;
  for (let i = 0; i < count; i++) {
    const frac = count > 1 ? i / (count - 1) - 0.5 : 0;
    const x = frac * span + (rng() - 0.5) * 2;
    out.push({
      x,
      benjStart: [x, -17 + (rng() - 0.5) * 1.5],
      benjMeet: [x, -2.2 + (rng() - 0.5) * 1],
      judStart: [x, 17 + (rng() - 0.5) * 1.5],
      judMeet: [x, 2.2 + (rng() - 0.5) * 1],
    });
  }
  return out;
}

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

/** Abner's contingent, seated on the north bank (2:13). */
export const ISRAEL_BANK_SLOTS: [number, number][] = rejectionSampleAnnulus(
  60,
  220701,
  ISRAEL_BANK_CENTER,
  4,
  30,
  2.1,
);

/** Joab's contingent, seated on the south bank (2:13). */
export const JUDAH_BANK_SLOTS: [number, number][] = rejectionSampleAnnulus(
  60,
  220702,
  JUDAH_BANK_CENTER,
  4,
  30,
  2.1,
);

/** Abner's contingent's scattered melee positions once the battle spreads (2:17). */
export const ABNER_BATTLE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  60,
  220703,
  BATTLE_SPREAD_ABNER_CENTER,
  5,
  42,
  2.4,
);

/** Joab's contingent's scattered melee positions once the battle spreads (2:17). */
export const JUDAH_BATTLE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  60,
  220704,
  BATTLE_SPREAD_JOAB_CENTER,
  5,
  42,
  2.4,
);

/** The rallying Benjaminite band atop the hill of Ammah (2:25) — drawn from
 * (not additive to) Abner's wider contingent. */
export const HILL_TOP_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  220705,
  AMMAH_HILL_POS,
  3,
  20,
  2.2,
);

/** Joab's pursuing contingent, halted at the hill's base (2:24-28) — held
 * below the Benjaminite band, per the brief's visual irony. */
const HILL_BASE_CENTER: [number, number] = (() => {
  const p = samplePursuitPoint(HILL_BASE_U);
  return [p.x, p.z];
})();
export const HILL_BASE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  50,
  220706,
  HILL_BASE_CENTER,
  6,
  32,
  2.4,
);
