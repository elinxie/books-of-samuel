import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for the pool of Gibeon (ADR-006
 * conventions; a fresh generator, not reused from any other scene). 1 unit =
 * 1 meter. The pool sits at the origin (`terrain.ts`); Abner/Benjamin's side
 * gathers on the north bank (negative z), Joab/Judah's side on the south
 * bank (positive z) — "one on one side of the pool and the other on the
 * other side" (2:13). +x is the direction away from Gibeon the pursuit
 * drains, ending at the hill of Ammah. See docs/design/gibeon-pool-brief.md,
 * "Visual composition" and "Scale assumptions".
 */

export const POOL_CENTER: [number, number] = [0, 0];
export const POOL_RADIUS = 9;

// ---------------------------------------------------------------------------
// Rejection-sampled annulus helper (ADR-006 convention), with an optional
// exclusion disc so scattered crowd slots never land inside the pool itself.

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  exclude?: { center: [number, number]; radius: number },
  guardMul = 120,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const angle = rng() * Math.PI * 2;
    const r = rMin + rng() * (rMax - rMin);
    const x = center[0] + Math.cos(angle) * r;
    const z = center[1] + Math.sin(angle) * r;
    if (exclude) {
      const dx = x - exclude.center[0];
      const dz = z - exclude.center[1];
      if (dx * dx + dz * dz < exclude.radius * exclude.radius) continue;
    }
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

// ---------------------------------------------------------------------------
// The two companies' pool-bank gathering ground (b-arrival/b-proposal/
// b-champions): seated across the water from each other, well clear of the
// basin (`POOL_RADIUS` + an 8m margin).

export const ABNER_BANK_CENTER: [number, number] = [0, -34];
export const JOAB_BANK_CENTER: [number, number] = [0, 34];
const BANK_R_MIN = 4;
const BANK_R_MAX = 17;

export function buildAbnerBankSlots(count: number, seed = 42101): [number, number][] {
  return rejectionSampleAnnulus(count, seed, ABNER_BANK_CENTER, BANK_R_MIN, BANK_R_MAX, 1.9);
}

export function buildJoabBankSlots(count: number, seed = 42102): [number, number][] {
  return rejectionSampleAnnulus(count, seed, JOAB_BANK_CENTER, BANK_R_MIN, BANK_R_MAX, 1.9);
}

// ---------------------------------------------------------------------------
// The champions' ground (b-champions, 2:14-16): twelve pairs, immediately
// beside the pool — close enough to hold both in one frame from `vp-pool`.
// Rendered literally 1:1 (24 figures, the text's own exact number).

export const CHAMPION_PAIR_COUNT = 12;
/** How far each side's champion starts from the pool's north-south axis. */
const CHAMPION_HALF_GAP = 10;

export interface ChampionPairSlot {
  x: number;
  /** Benjamin/Abner-side champion start position. */
  benjaminStart: [number, number];
  /** Judah/Joab-side champion start position. */
  judahStart: [number, number];
  /** Where the pair meets/grapples and falls — the midpoint. */
  meet: [number, number];
}

export function buildChampionPairSlots(): ChampionPairSlot[] {
  const out: ChampionPairSlot[] = [];
  for (let i = 0; i < CHAMPION_PAIR_COUNT; i++) {
    const x = (i - (CHAMPION_PAIR_COUNT - 1) / 2) * 3.6;
    out.push({
      x,
      benjaminStart: [x, -CHAMPION_HALF_GAP],
      judahStart: [x, CHAMPION_HALF_GAP],
      meet: [x, 0],
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// The spreading battlefield (b-battle-spreads, 2:17): the wider clash beyond
// the pool's immediate ground. Two overlapping annuli, shifted east and
// toward each other, so the two sides read as distinct groupings (per the
// brief: legible by grouping/position, never by invented insignia) while
// visibly spilling across the pool's own axis. Both annuli exclude the pool
// footprint itself.

export const ABNER_SPREAD_CENTER: [number, number] = [16, -15];
export const JOAB_SPREAD_CENTER: [number, number] = [16, 15];
const SPREAD_R_MIN = 5;
const SPREAD_R_MAX = 34;
const SPREAD_EXCLUDE = { center: POOL_CENTER, radius: POOL_RADIUS + 4 };

export function buildAbnerSpreadSlots(count: number, seed = 42103): [number, number][] {
  return rejectionSampleAnnulus(
    count,
    seed,
    ABNER_SPREAD_CENTER,
    SPREAD_R_MIN,
    SPREAD_R_MAX,
    2.1,
    SPREAD_EXCLUDE,
  );
}

export function buildJoabSpreadSlots(count: number, seed = 42104): [number, number][] {
  return rejectionSampleAnnulus(
    count,
    seed,
    JOAB_SPREAD_CENTER,
    SPREAD_R_MIN,
    SPREAD_R_MAX,
    2.1,
    SPREAD_EXCLUDE,
  );
}

// ---------------------------------------------------------------------------
// The pursuit route (b-asahel-pursuit through b-standoff): the direction
// Abner's contingent flees, away from Gibeon, ending at the hill of Ammah.
// Distinct ground from the pool/battlefield (brief's "Focal masses" d).

export const PURSUIT_ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(60, 0, -6),
    new THREE.Vector3(120, 0, 16),
    new THREE.Vector3(190, 0, -14),
    new THREE.Vector3(255, 0, 10),
    new THREE.Vector3(305, 0, -6),
    new THREE.Vector3(326, 0, 0),
  ],
  false,
  'catmullrom',
  0.5,
);

/** 0..1 fraction of the pursuit route where Abner halts and Asahel is killed. */
export const DEATH_ROUTE_U = 0.52;

export function pursuitPointAt(u: number): { x: number; z: number; yaw: number } {
  const clamped = Math.min(1, Math.max(0, u));
  const pos = PURSUIT_ROUTE_CURVE.getPointAt(clamped);
  const tan = PURSUIT_ROUTE_CURVE.getTangentAt(Math.max(0.001, clamped));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

/** The death point itself (2:23) — Abner halts, Asahel falls here and stays. */
export const DEATH_POINT = pursuitPointAt(DEATH_ROUTE_U);

/** The route's own endpoint (u=1) — hoisted since several per-frame pose
 * functions in `./poses.ts` settle figures at this fixed point and would
 * otherwise reallocate it (two new THREE.Vector3s via the curve) every
 * frame per figure (jabesh-burial c5aac8f precedent: hoist constant-input
 * per-frame allocations to a module-scope value computed once). */
export const ROUTE_END_POINT = pursuitPointAt(1);

// ---------------------------------------------------------------------------
// The hill of Ammah (b-standoff onward, 2:24-28): Abner's rallying band
// gathers on top; Joab, Abishai, and the pursuing subset hold below, looking
// up — the deliberate visual irony the brief calls for (the losing side
// holds the high ground).

export const HILL_CENTER: [number, number] = [345, -8];
const RALLY_R_MIN = 3;
const RALLY_R_MAX = 19;
export const PURSUER_BASE_CENTER: [number, number] = [322, 4];
const PURSUER_R_MIN = 3;
const PURSUER_R_MAX = 20;

/** Up to 18 slots atop the hill for the rallying Benjaminite band (2:25). */
export function buildAmmahRallySlots(count: number, seed = 42105): [number, number][] {
  return rejectionSampleAnnulus(count, seed, HILL_CENTER, RALLY_R_MIN, RALLY_R_MAX, 2.4);
}

/** Slots at the hill's foot for Joab/Abishai and the pursuing subset. */
export function buildPursuerBaseSlots(count: number, seed = 42106): [number, number][] {
  return rejectionSampleAnnulus(
    count,
    seed,
    PURSUER_BASE_CENTER,
    PURSUER_R_MIN,
    PURSUER_R_MAX,
    2.2,
  );
}
