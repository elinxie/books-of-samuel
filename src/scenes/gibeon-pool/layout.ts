import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic figure placement for gibeon-pool (2 Samuel 2:8-32). 1 unit =
 * 1 meter. Coordinate convention, matching `terrain.ts`'s "journey" layout:
 * x runs west (-) to east (+), away from the pool toward the pursuit route
 * and the hill of Ammah; z separates the two sides throughout (Abner's
 * Israel/Benjamin side at z > 0, Joab's Judah side at z < 0) — this
 * north/south grouping, not any invented kit, is what keeps the two civil-war
 * sides legible (see docs/design/gibeon-pool-brief.md, "no invented Judah
 * kit vs. Benjamin kit"). Positions are x/z only — height is sampled from
 * the scene terrain at render time via `terrain.heightAt`, never baked in
 * here, so this module stays terrain-free and unit-testable.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

/** Yaw (radians) to face from (fromX, fromZ) toward (toX, toZ) — same convention as ziklag-lament/hebron-anointing's yawToward helpers. */
export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

// ---------------------------------------------------------------------------
// The pool of Gibeon (2:13) and the two companies seated across it (b-arrival).

export const POOL_CENTER: [number, number] = [0, 0];
export const POOL_RADIUS = 13;
/** Israel/Benjamin bank (Abner's side), north of the pool. */
export const ISRAEL_BANK_Z = 34;
/** Judah bank (Joab's side), south of the pool. */
export const JUDAH_BANK_Z = -34;

function bankSlots(count: number, bankZ: number, seed: number, spreadX = 92): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) - 0.5 : 0;
    const x = t * spreadX * 2 + (rng() - 0.5) * 6;
    // A shallow crescent, curving slightly back from the water at the ends,
    // so the company reads as gathered rather than a ruler-straight rank.
    const z = bankZ + Math.abs(t) * 6 + (rng() - 0.5) * 8;
    out.push({ x, z, yaw: yawToward(x, z, POOL_CENTER[0], POOL_CENTER[1]) });
  }
  return out;
}

/** Abner's company, seated on the north bank (b-arrival, 2:13). */
export function buildIsraelBankSlots(count: number, seed = 220301): FigureSlot[] {
  return bankSlots(count, ISRAEL_BANK_Z, seed);
}

/** Joab's company, seated on the south bank (b-arrival, 2:13). */
export function buildJudahBankSlots(count: number, seed = 220302): FigureSlot[] {
  return bankSlots(count, JUDAH_BANK_Z, seed);
}

// ---------------------------------------------------------------------------
// The champions' ground (b-champions, 2:14-16): twelve pairs beside the pool,
// literal 1:1 (24 figures). Each pair grapples along the x axis so the row
// of pairs reads as a distinct cluster next to (not inside) the water.

export const CHAMPIONS_COUNT = 12;
export const CHAMPIONS_X = 34;
const CHAMPION_GAP = 0.6;

export interface ChampionPairSlot {
  israel: FigureSlot;
  judah: FigureSlot;
}

/** The twelve champion pairs' grappling positions, beside the pool's east flank. */
export function buildChampionPairSlots(seed = 220303): ChampionPairSlot[] {
  const rng = mulberry32(seed);
  const out: ChampionPairSlot[] = [];
  for (let i = 0; i < CHAMPIONS_COUNT; i++) {
    const t = CHAMPIONS_COUNT > 1 ? i / (CHAMPIONS_COUNT - 1) - 0.5 : 0;
    const z = t * 44 + (rng() - 0.5) * 1.5;
    const israelX = CHAMPIONS_X - CHAMPION_GAP;
    const judahX = CHAMPIONS_X + CHAMPION_GAP;
    out.push({
      israel: { x: israelX, z, yaw: yawToward(israelX, z, judahX, z) },
      judah: { x: judahX, z, yaw: yawToward(judahX, z, israelX, z) },
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// The spreading battlefield (b-battle-spreads, 2:17): open ground east of the
// pool where the wider clash ignites. Abner's side stays biased north
// (z > 0), Joab's stays biased south (z < 0), even as both drift east.

function spreadSlots(count: number, zBias: number, seed: number): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const x = 70 + rng() * 150;
    const z = zBias * (6 + rng() * 46);
    out.push({ x, z, yaw: (rng() - 0.5) * Math.PI });
  }
  return out;
}

export function buildAbnerSpreadSlots(count: number, seed = 220304): FigureSlot[] {
  return spreadSlots(count, 1, seed);
}

export function buildJoabSpreadSlots(count: number, seed = 220305): FigureSlot[] {
  return spreadSlots(count, -1, seed);
}

// ---------------------------------------------------------------------------
// The pursuit route (b-asahel-pursuit through b-pursuit-continues, 2:18-24):
// open ground away from Gibeon, continuing east from the battle-spread field.

export const BATTLE_SPREAD_CENTER: [number, number] = [140, 14];
export const ASAHEL_CHASE_START: [number, number] = [150, -10];
/** Where Abner turns and Asahel falls (2:23) — distinct from the hill itself. */
export const ASAHEL_DEATH_POS: [number, number] = [340, 6];
/** Where Joab and Abishai stand at the base of the hill, looking up (2:24-28). */
export const JOAB_HALT_POS: [number, number] = [410, -14];

// ---------------------------------------------------------------------------
// The hill of Ammah (b-standoff through b-joab-halts, 2:24-28): a modest
// rise where the rallying Benjaminite band gathers, physically above the
// pursuers — a deliberate visual irony the brief asks to keep, not "fix."

export const AMMAH_HILL_CENTER: [number, number] = [460, 0];

/** A ring of slots atop the hill of Ammah for the rallying band (2:25),
 * drawn from Abner's wider contingent, not additive to it. */
export function buildAmmahHillSlots(count: number, seed = 220306): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / Math.max(1, count)) * Math.PI * 2 + rng() * 0.4;
    const r = 6 + rng() * 16;
    const x = AMMAH_HILL_CENTER[0] + Math.cos(angle) * r;
    const z = AMMAH_HILL_CENTER[1] + Math.sin(angle) * r * 0.8;
    out.push({ x, z, yaw: yawToward(x, z, JOAB_HALT_POS[0], JOAB_HALT_POS[1]) });
  }
  return out;
}
