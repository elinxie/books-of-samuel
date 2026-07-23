import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  AMMAH_HILL_CENTER,
  GIBEON_POOL_CENTER,
  GIBEON_POOL_RADIUS_X,
  GIBEON_POOL_RADIUS_Z,
} from './terrain';

/**
 * Deterministic, scene-local layout for gibeon-pool (ADR-006 conventions,
 * mirroring gilboa-battle/hebron-anointing's layout.ts). 1 unit = 1 meter.
 * x separates the two banks/sides across the pool (Benjamin/Abner west,
 * negative x; Judah/Joab east, positive x) — no invented dress distinction
 * carries this, only grouping and position (brief's "Resolved design
 * calls"). z is the "away from Gibeon" journey axis: 0 at the pool, through
 * the champions' ground and the spreading battlefield, out along the
 * pursuit route, to the hill of Ammah far to the south. Positions are x/z
 * only — height is sampled from terrain.ts at render time, never baked in
 * here.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" 1-5).

/** Where each side's company sits, opposite banks of the pool (2:13). */
export const BENJAMIN_BANK_CENTER: [number, number] = [-24, -2];
export const JUDAH_BANK_CENTER: [number, number] = [24, -2];

/** Principal standing positions at the pool, facing across the water. */
export const ABNER_POOL_POS: [number, number] = [-13, 4];
export const JOAB_POOL_POS: [number, number] = [13, -4];
export const ASAHEL_POOL_POS: [number, number] = [17, 3];
export const ABISHAI_POOL_POS: [number, number] = [19, -9];

/** The champions' ground, immediately south of the pool's tip — close
 * enough to hold both pool and contest in one frame (brief, composition 2). */
export const CHAMPIONS_MEET_Z = 27;
const CHAMPIONS_BENJAMIN_Z = 24;
const CHAMPIONS_JUDAH_Z = 30;
const CHAMPIONS_X_SPAN = 9;

/** The wider spreading battlefield, south of the champions' ground. */
export const BATTLE_SPREAD_CENTER: [number, number] = [0, 90];

/** The pursuit route away from Gibeon — Abner's flight, Asahel's chase,
 * and Joab/Abishai's pursuit all follow this same ground. */
export const PURSUIT_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 95),
    new THREE.Vector3(10, 0, 150),
    new THREE.Vector3(6, 0, 220),
    new THREE.Vector3(12, 0, 290),
    new THREE.Vector3(16, 0, 340),
    new THREE.Vector3(18, 0, 385),
  ],
  false,
  'catmullrom',
  0.5,
);

/** How far along the pursuit route (0..1) Abner halts and kills Asahel
 * (2:23) — well short of the hill of Ammah, on open ground. */
export const ASAHEL_DEATH_U = 0.62;

/** The hill of Ammah: the rallying Benjaminite band's position (2:25), and
 * Abner's forward "speaking" position for his plea (2:26) — both above the
 * pursuers gathered at the curve's south end/the hill's foot (deliberate
 * visual irony per the brief: the losing side holds the high ground). */
export const AMMAH_RALLY_POS: [number, number] = [20, 415];
export const AMMAH_PLEA_POS: [number, number] = [18, 400];

export function samplePath(
  curve: THREE.CatmullRomCurve3,
  u: number,
): { x: number; z: number; yaw: number } {
  const clamped = Math.min(1, Math.max(0, u));
  const pos = curve.getPointAt(clamped);
  const tan = curve.getTangentAt(Math.max(0.001, clamped));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled annulus, ADR-006 convention).

function rejectionSampleBox(
  count: number,
  seed: number,
  center: [number, number],
  halfW: number,
  halfD: number,
  minSpacing: number,
  guardMul = 60,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const x = center[0] + (rng() * 2 - 1) * halfW;
    const z = center[1] + (rng() * 2 - 1) * halfD;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

/** Benjamin/Israel's contingent, seated on the pool's west bank (2:12-13). */
export function buildBenjaminBankSlots(count: number, seed = 621101): FigureSlot[] {
  const slots = rejectionSampleBox(count, seed, BENJAMIN_BANK_CENTER, 9, 15, 2.1);
  return slots.map(([x, z]) => ({ x, z, yaw: Math.PI / 2 })); // facing east, across the pool
}

/** Judah's contingent, seated on the pool's east bank (2:12-13). */
export function buildJudahBankSlots(count: number, seed = 621201): FigureSlot[] {
  const slots = rejectionSampleBox(count, seed, JUDAH_BANK_CENTER, 9, 15, 2.1);
  return slots.map(([x, z]) => ({ x, z, yaw: -Math.PI / 2 })); // facing west, across the pool
}

/** Where a wider-contingent figure lands once the battle spreads (2:17) —
 * scattered but biased toward its own side's half of the field, overlapping
 * near the center so the clash reads as contact, not two separated masses. */
export function buildBattleSpreadSlots(
  count: number,
  side: 'benjamin' | 'judah',
  seed: number,
): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  const bias = side === 'benjamin' ? -1 : 1;
  for (let i = 0; i < count; i++) {
    const x = bias * (8 + rng() * 45) + (rng() - 0.5) * 20;
    const z = BATTLE_SPREAD_CENTER[1] + (rng() - 0.5) * 70;
    out.push({ x, z, yaw: rng() * Math.PI * 2 });
  }
  return out;
}

/** One champion pair's two starting/meeting positions (2:14-16), spread
 * along the pool's width — 12 pairs, rendered literally 1:1. */
export interface ChampionPairSlot {
  benjaminStart: FigureSlot;
  judahStart: FigureSlot;
  meetX: number;
}

export function buildChampionPairSlots(pairCount = 12, seed = 621301): ChampionPairSlot[] {
  const rng = mulberry32(seed);
  const out: ChampionPairSlot[] = [];
  for (let i = 0; i < pairCount; i++) {
    const spread = pairCount > 1 ? i / (pairCount - 1) - 0.5 : 0;
    const x = spread * CHAMPIONS_X_SPAN * 2 + (rng() - 0.5) * 0.6;
    out.push({
      benjaminStart: { x, z: CHAMPIONS_BENJAMIN_Z, yaw: Math.PI },
      judahStart: { x, z: CHAMPIONS_JUDAH_Z, yaw: 0 },
      meetX: x,
    });
  }
  return out;
}

/** The rallying Benjaminite band atop the hill of Ammah (2:25) — drawn from
 * (not additive to) the wider Benjamin contingent, per the brief's scale
 * assumptions. */
export function buildAmmahRallySlots(count: number, seed = 621401): FigureSlot[] {
  const slots = rejectionSampleBox(count, seed, AMMAH_RALLY_POS, 13, 10, 2.2);
  return slots.map(([x, z]) => {
    const yaw = Math.atan2(x - AMMAH_HILL_CENTER[0], z - AMMAH_HILL_CENTER[1]) + Math.PI;
    return { x, z, yaw };
  });
}

/** Where the pursuing (surviving) Judah contingent gathers at the hill's
 * foot, below the rallying band — the brief's deliberate visual irony. */
export function buildPursuersHaltSlots(count: number, seed = 621501): FigureSlot[] {
  const end = PURSUIT_CURVE.getPointAt(1);
  const slots = rejectionSampleBox(count, seed, [end.x, end.z - 6], 14, 10, 2.0);
  return slots.map(([x, z]) => ({
    x,
    z,
    yaw: Math.atan2(AMMAH_RALLY_POS[0] - x, AMMAH_RALLY_POS[1] - z),
  }));
}

/** Sanity re-export so scene components don't need to reach into terrain.ts
 * just for the pool's basin extent. */
export const POOL_CENTER = GIBEON_POOL_CENTER;
export const POOL_RADIUS_X = GIBEON_POOL_RADIUS_X;
export const POOL_RADIUS_Z = GIBEON_POOL_RADIUS_Z;
