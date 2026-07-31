import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for gibeon-pool (ADR-006 conventions,
 * mirroring gilboa-battle/hebron-anointing's layout.ts). 1 unit = 1 meter.
 * -z is north (Abner/Israel's side of the pool, and the direction the
 * pursuit and the hill of Ammah lie, per 2:24's "way to the wilderness of
 * Gibeon" read as continuing away from Judah); +z is south (Joab/Judah's
 * side, the direction of Hebron); +x is east. Positions are x/z only —
 * height is sampled from terrain.ts at render time, never baked in here. See
 * docs/design/gibeon-pool-brief.md, "Visual composition" and "Scale
 * assumptions".
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" 1-5).

/** The pool of Gibeon itself — terrain.ts's basin depression center. */
export const POOL_CENTER: [number, number] = [0, 0];
export const POOL_RADIUS = 15;
/** Abner/Israel's side, seated opposite Joab/Judah's company (2:13). */
export const ISRAEL_BANK_CENTER: [number, number] = [0, -46];
/** Joab/Judah's side. */
export const JUDAH_BANK_CENTER: [number, number] = [0, 46];
/** A flat clearing east of the pool where the twelve-a-side contest is
 * staged — close enough to hold both the pool and the champions' ground in
 * one frame from the default viewpoint. */
export const CHAMPIONS_GROUND_CENTER: [number, number] = [30, 0];
/** The hill of Ammah (2:24-25) — terrain.ts's modest rise at the pursuit
 * route's far end. */
export const AMMAH_HILL_CENTER: [number, number] = [360, -190];
export const AMMAH_HILL_RADIUS = 46;
/** Where Joab's pursuing detachment halts, short of the hill's foot, looking
 * up at the rallied Benjaminite band above them (brief's deliberate
 * visual-irony composition: the losing side holds the high ground). */
export const AMMAH_FOOT_CENTER: [number, number] = [305, -168];

// ---------------------------------------------------------------------------
// The pursuit route: away from Gibeon (2:19-24), Abner fleeing, Asahel then
// Joab/Abishai giving chase, ending at the hill of Ammah. No location beyond
// this scene's own ground is asserted for any point along this curve — the
// text gives no fixed waypoints, only a direction and an endpoint name.

export const PURSUIT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, -46),
    new THREE.Vector3(50, 0, -82),
    new THREE.Vector3(130, 0, -122),
    new THREE.Vector3(225, 0, -158),
    new THREE.Vector3(310, 0, -182),
    new THREE.Vector3(360, 0, -190),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Point (x,z) and facing yaw at fraction `u` (0..1) along `PURSUIT_CURVE`. */
export function pursuitPointAt(u: number): { x: number; z: number; yaw: number } {
  const c = Math.min(1, Math.max(0, u));
  const pos = PURSUIT_CURVE.getPointAt(c);
  const tan = PURSUIT_CURVE.getTangentAt(Math.max(0.001, c));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

/** Where Abner halts and kills Asahel (2:23) — partway along the pursuit
 * route, well short of the hill of Ammah, distinct ground from both the pool
 * and the hill. A disclosed staging choice; the text fixes no waypoint. */
export const ASAHEL_DEATH_U = 0.56;

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled annulus, ADR-006 convention,
// mirroring hebron-anointing's rejectionSampleAnnulus).

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

/** Abner's Israel/Benjamin contingent, gathered on the pool's north bank
 * (brief's "Scale assumptions": disclosed design count, ~35-45 figures at
 * top quality tier). */
export const ISRAEL_CONTINGENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  60,
  220601,
  ISRAEL_BANK_CENTER,
  4,
  30,
  2.2,
);

/** Joab's Judah contingent, on the south bank (~30-40 figures at top quality
 * tier). */
export const JUDAH_CONTINGENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  55,
  220602,
  JUDAH_BANK_CENTER,
  4,
  28,
  2.2,
);

/** The rallying Benjaminite band atop the hill of Ammah (2:25) — drawn from
 * (not additive to) the Israel contingent as it regroups, per the brief. */
export const AMMAH_BAND_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  220603,
  AMMAH_HILL_CENTER,
  3,
  18,
  2.4,
);

/** Where Joab's pursuing detachment gathers once halted, below the hill. */
export const AMMAH_PURSUER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  20,
  220604,
  AMMAH_FOOT_CENTER,
  3,
  16,
  2.2,
);

// ---------------------------------------------------------------------------
// The champions' ground (2:14-16): twelve pairs, rendered literally 1:1 (the
// text's own exact number — no ratio, no design-choice headcount). Two
// facing lines close enough to grip, spread along z; no team-color
// distinction (brief: "no invented Judah kit vs. Benjamin kit").

export const CHAMPION_PAIR_COUNT = 12;
const CHAMPION_Z_SPACING = 3.2;
const CHAMPION_LINE_HALF_GAP = 1.15;

export interface ChampionPairSlot {
  benjamin: FigureSlot;
  judah: FigureSlot;
}

export const CHAMPION_PAIR_SLOTS: ChampionPairSlot[] = (() => {
  const rng = mulberry32(220701);
  const [cx, cz] = CHAMPIONS_GROUND_CENTER;
  const out: ChampionPairSlot[] = [];
  for (let i = 0; i < CHAMPION_PAIR_COUNT; i++) {
    const z = cz + (i - (CHAMPION_PAIR_COUNT - 1) / 2) * CHAMPION_Z_SPACING + (rng() - 0.5) * 0.4;
    const jitter = (rng() - 0.5) * 0.3;
    out.push({
      benjamin: { x: cx - CHAMPION_LINE_HALF_GAP + jitter, z, yaw: Math.PI / 2 },
      judah: { x: cx + CHAMPION_LINE_HALF_GAP - jitter, z, yaw: -Math.PI / 2 },
    });
  }
  return out;
})();
