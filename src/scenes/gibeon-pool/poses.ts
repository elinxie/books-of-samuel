import type { ViolenceMode } from '../../state/store';
import {
  ABISHAI_POOL_POS,
  ABNER_POOL_POS,
  AMMAH_HILL_POS,
  ASAHEL_POOL_POS,
  HILL_BASE_U,
  JOAB_POOL_POS,
  POOL_CENTER,
  samplePursuitPoint,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for gibeon-pool (ADR-007
 * convention, mirroring gilboa-battle/hebron-anointing/ziklag-lament's
 * poses.ts). Beat times match `src/data/scenes.ts`'s `gibeon-pool` entry
 * exactly (`b-context` through `b-close`) — see
 * docs/design/gibeon-pool-brief.md, "Camera / observer experience" and the
 * beat table's standard/reduced treatment.
 *
 * ADR-009 (`b-champions`, `b-asahel-death`): one choreography, two
 * treatments, via `fallDuration` — reduced never changes the narrative fact
 * or the final pose a figure settles into, it elides the animated
 * transition and cuts to the resulting pose sooner. No function here ever
 * produces wound, blood, or dismemberment geometry; "fallen" is only ever a
 * body-orientation/collapse transform (asset-figure-fallen, reused).
 *
 * `effectiveTime` implements 2:23b's "stood still" beat as a literal,
 * unit-tested hold: every figure still in motion (Abner continuing toward
 * the hill, Joab/Abishai/the wider contingents pursuing) pauses for
 * `STAND_STILL_DUR` seconds starting the instant Asahel falls, in both
 * violence modes — the emotional pivot the brief calls for, carried by a
 * held beat rather than graphic detail.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 14;
export const T_PROPOSAL = 40;
export const T_CHAMPIONS = 58;
export const T_BATTLE_SPREADS = 78;
export const T_ASAHEL_PURSUIT = 100;
export const T_ABNER_WARNS = 118;
export const T_ASAHEL_DEATH = 132;
export const T_PURSUIT_CONTINUES = 148;
export const T_STANDOFF = 164;
export const T_ABNER_PLEA = 178;
export const T_JOAB_HALTS = 190;
export const T_CASUALTY_COUNT = 200;
export const T_CLOSE = 212;
export const DURATION_SEC = 224;

export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function smoothstep(t: number): number {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Yaw (radians) to face from (fromX, fromZ) toward (toX, toZ). */
export function yawToward(fromX: number, fromZ: number, toX: number, toZ: number): number {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

/** Duration (seconds) of an animated transition. Standard uses the full,
 * gradual duration; reduced elides the animation and cuts to the resulting
 * pose almost immediately — same convention as every prior M3/M4 scene's
 * poses.ts (ADR-009: "reduction abstracts depiction, never facts"). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// The "stood still" beat (2:23b): every figure in motion holds for
// `STAND_STILL_DUR` seconds the instant Asahel falls, in both modes.

export const STAND_STILL_DUR = 6;

/** Scene time with the stillness hold subtracted out — everything driven by
 * this stays frozen for `STAND_STILL_DUR` seconds starting at `T_ASAHEL_DEATH`,
 * then resumes as if time had paused. Exported for unit tests. */
export function effectiveTime(t: number): number {
  if (t <= T_ASAHEL_DEATH) return t;
  const held = Math.min(STAND_STILL_DUR, t - T_ASAHEL_DEATH);
  return t - held;
}

export function stillnessActive(t: number): boolean {
  return t > T_ASAHEL_DEATH && t < T_ASAHEL_DEATH + STAND_STILL_DUR;
}

/** Sundown lighting arc (2:24's own detail — "as the sun was going down" —
 * used directly, not a placeholder hour): ramps from daylight to dusk
 * starting shortly before Asahel's death, settling by the standoff beat and
 * holding through the rest of the scene. Exported for unit tests. */
export function duskFactor(t: number): number {
  return smoothstep((t - (T_PURSUIT_CONTINUES - 20)) / 30);
}

// ---------------------------------------------------------------------------
// The champions' contest (2:14-16, claim-champions-contest): twelve pairs,
// one shared pose function parameterized by each pair's slot data — the
// brief's "12 paired grapple/fall cycles sharing one animation function".
// Both figures in a pair step forward from their own bank, meet, grapple
// (`engage`), then fall together. Standard: a gradual mutual collapse.
// Reduced: "the pairing is shown; the mutual fall is elided — cut from the
// grapple to all twenty-four fallen (still)" — `engage` ramps identically in
// both modes (the pairing itself is shown), only `fallen`'s duration differs.

const CHAMPION_STEP_START = T_PROPOSAL + 4;
const CHAMPION_STEP_END = T_CHAMPIONS - 2;
const CHAMPION_ENGAGE_DUR = 2;

export interface ChampionPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 approaching .. 1 grasped/grappling (the head-seize gesture, legible
   * without violence detail — no blade-entry geometry in either mode). */
  engage: number;
  /** 0 standing .. 1 fallen together. */
  fallen: number;
}

/** One champion's pose at scene time `t`. `start`/`meet` are this figure's
 * own walk-in and grapple positions (from `buildChampionPairSlots`);
 * `facingMeet` is the paired opponent's meet position, so both figures face
 * each other once grappling. Exported for unit tests. */
export function championPose(
  t: number,
  start: [number, number],
  meet: [number, number],
  facingMeet: [number, number],
  mode: ViolenceMode,
): ChampionPose {
  const stepProgress = clamp01(
    smoothstep((t - CHAMPION_STEP_START) / (CHAMPION_STEP_END - CHAMPION_STEP_START)),
  );
  const x = lerp(start[0], meet[0], stepProgress);
  const z = lerp(start[1], meet[1], stepProgress);
  const yaw = yawToward(x, z, facingMeet[0], facingMeet[1]);

  const engage = clamp01(smoothstep((t - CHAMPION_STEP_END) / CHAMPION_ENGAGE_DUR));
  const fallen = t < T_CHAMPIONS ? 0 : smoothstep((t - T_CHAMPIONS) / fallDuration(mode, 6));

  return { x, z, yaw, engage, fallen };
}

// ---------------------------------------------------------------------------
// The two wider contingents (claim-gibeon-battle-scale): bank -> battle
// scatter -> (Abner's side: a rallying subset climbs to the hill of Ammah,
// the rest disperse/fade; Joab's side: pursues to the hill's base). A small,
// seeded fraction of each side falls during the battle-spread beat —
// deliberately lopsided (Abner's side heavier) but never scaled to literally
// match the 360/20 casualty figures, per the brief's explicit "not used to
// size the rendered contingents" instruction.

export interface ContingentPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

const CONTINGENT_BATTLE_MOVE_DUR = 10;
const CONTINGENT_ADVANCE_MOVE_DUR = 26;
const CONTINGENT_FALL_WINDOW = 3;
const CONTINGENT_FADE_WINDOW = 4;
const CONTINGENT_DISPERSE_WINDOW = 10;

/** Abner/Benjamin's contingent. `hillTop` is this figure's rally slot, or
 * `null` if it is not part of the rallying subset (drawn from, not additive
 * to, the wider contingent — see the brief's "Scale assumptions"). Exported
 * for unit tests. */
export function abnerContingentPose(
  t: number,
  bank: [number, number],
  battle: [number, number],
  hillTop: [number, number] | null,
  fallsInBattle: boolean,
  fallDelay: number,
  mode: ViolenceMode,
): ContingentPose {
  if (t < T_BATTLE_SPREADS) {
    return {
      x: bank[0],
      z: bank[1],
      yaw: yawToward(bank[0], bank[1], POOL_CENTER[0], POOL_CENTER[1]),
      fallen: 0,
      visible: true,
    };
  }

  const moveProgress = clamp01(smoothstep((t - T_BATTLE_SPREADS) / CONTINGENT_BATTLE_MOVE_DUR));
  const bx = lerp(bank[0], battle[0], moveProgress);
  const bz = lerp(bank[1], battle[1], moveProgress);
  const battleArrive = T_BATTLE_SPREADS + CONTINGENT_BATTLE_MOVE_DUR;

  if (t < battleArrive) {
    return { x: bx, z: bz, yaw: yawToward(bx, bz, battle[0], battle[1]), fallen: 0, visible: true };
  }

  const fallTriggerT = battleArrive + fallDelay;
  if (fallsInBattle && t >= fallTriggerT) {
    if (mode === 'standard') {
      const fallen = smoothstep((t - fallTriggerT) / CONTINGENT_FALL_WINDOW);
      return { x: battle[0], z: battle[1], yaw: 0, fallen, visible: true };
    }
    const fade = smoothstep((t - fallTriggerT) / CONTINGENT_FADE_WINDOW);
    return { x: battle[0], z: battle[1], yaw: 0, fallen: 0, visible: fade < 0.97 };
  }

  if (!hillTop) {
    // Survives but is not part of the rallying band: disperses once the
    // pursuit is underway — reads as melting back toward Mahanaim, never
    // shown traveling there (the brief's hard scope guard).
    const fade = smoothstep((effectiveTime(t) - T_PURSUIT_CONTINUES) / CONTINGENT_DISPERSE_WINDOW);
    return { x: battle[0], z: battle[1], yaw: 0, fallen: 0, visible: fade < 0.97 };
  }

  const advanceStart = T_ASAHEL_PURSUIT;
  const advanceEnd = advanceStart + CONTINGENT_ADVANCE_MOVE_DUR;
  const et = effectiveTime(t);
  const advanceProgress = clamp01(smoothstep((et - advanceStart) / (advanceEnd - advanceStart)));
  const x = lerp(battle[0], hillTop[0], advanceProgress);
  const z = lerp(battle[1], hillTop[1], advanceProgress);
  return { x, z, yaw: yawToward(x, z, hillTop[0], hillTop[1]), fallen: 0, visible: true };
}

/** Joab/Judah's contingent: bank -> battle scatter -> pursuit to the hill's
 * base (never the summit — held below the rallying Benjaminites, per the
 * brief's visual irony). Exported for unit tests. */
export function joabContingentPose(
  t: number,
  bank: [number, number],
  battle: [number, number],
  hillBase: [number, number],
  fallsInBattle: boolean,
  fallDelay: number,
  mode: ViolenceMode,
): ContingentPose {
  if (t < T_BATTLE_SPREADS) {
    return {
      x: bank[0],
      z: bank[1],
      yaw: yawToward(bank[0], bank[1], POOL_CENTER[0], POOL_CENTER[1]),
      fallen: 0,
      visible: true,
    };
  }

  const moveProgress = clamp01(smoothstep((t - T_BATTLE_SPREADS) / CONTINGENT_BATTLE_MOVE_DUR));
  const bx = lerp(bank[0], battle[0], moveProgress);
  const bz = lerp(bank[1], battle[1], moveProgress);
  const battleArrive = T_BATTLE_SPREADS + CONTINGENT_BATTLE_MOVE_DUR;

  if (t < battleArrive) {
    return { x: bx, z: bz, yaw: yawToward(bx, bz, battle[0], battle[1]), fallen: 0, visible: true };
  }

  const fallTriggerT = battleArrive + fallDelay;
  if (fallsInBattle && t >= fallTriggerT) {
    if (mode === 'standard') {
      const fallen = smoothstep((t - fallTriggerT) / CONTINGENT_FALL_WINDOW);
      return { x: battle[0], z: battle[1], yaw: 0, fallen, visible: true };
    }
    const fade = smoothstep((t - fallTriggerT) / CONTINGENT_FADE_WINDOW);
    return { x: battle[0], z: battle[1], yaw: 0, fallen: 0, visible: fade < 0.97 };
  }

  const advanceStart = T_ASAHEL_PURSUIT;
  const advanceEnd = T_JOAB_HALTS;
  const et = effectiveTime(t);
  const advanceProgress = clamp01(smoothstep((et - advanceStart) / (advanceEnd - advanceStart)));
  const x = lerp(battle[0], hillBase[0], advanceProgress);
  const z = lerp(battle[1], hillBase[1], advanceProgress);
  const yaw =
    t < T_JOAB_HALTS
      ? yawToward(x, z, hillBase[0], hillBase[1])
      : yawToward(x, z, AMMAH_HILL_POS[0], AMMAH_HILL_POS[1]);
  return { x, z, yaw, fallen: 0, visible: true };
}

// ---------------------------------------------------------------------------
// Named principals: Abner, Joab, Abishai, Asahel (claim-asahel-pursuit-death,
// claim-ammah-standoff). Ish-bosheth is referenced/context only and is never
// staged here (he does not appear at Gibeon in the text).

const ABNER_ARRIVE_START: [number, number] = [14, -150];
const JOAB_ARRIVE_START: [number, number] = [-12, 160];

const ABNER_HILL_ARRIVE_T = T_STANDOFF - 4;
const JOAB_HILL_ARRIVE_T = T_STANDOFF + 2;
const ASAHEL_PEEL_T = T_BATTLE_SPREADS + 6;
const JOAB_PURSUIT_START = T_BATTLE_SPREADS + 8;

/** Abner's progress (0..1) along `PURSUIT_CURVE`, paused during the "stood
 * still" hold. Exported for unit tests. */
export function abnerProgress(t: number): number {
  if (t < T_BATTLE_SPREADS) return 0;
  const et = effectiveTime(t);
  return clamp01(smoothstep((et - T_BATTLE_SPREADS) / (ABNER_HILL_ARRIVE_T - T_BATTLE_SPREADS)));
}

/** Abner's own progress at the instant Asahel falls — Asahel's pursuit
 * converges on this exact point, so the two figures coincide at the strike. */
export const ASAHEL_DEATH_U = abnerProgress(T_ASAHEL_DEATH);

/** Two brief backward glances during the warning beat (2:21-22) — Abner
 * staged as reluctant, not hunting. Exported for unit tests. */
export function abnerWarnGlance(t: number): number {
  if (t < T_ABNER_WARNS || t > T_ASAHEL_DEATH) return 0;
  const span = T_ASAHEL_DEATH - T_ABNER_WARNS;
  const local = (t - T_ABNER_WARNS) / span;
  const pulse = (center: number, width: number) =>
    Math.max(0, 1 - Math.abs(local - center) / width);
  return Math.max(pulse(0.25, 0.18), pulse(0.68, 0.18));
}

export interface AbnerPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 a beseeching forward lean at the hill (the plea beat, 2:26). */
  lean: number;
  /** 0..1 the reversed-grip spear-thrust gesture (2:23) — the one specific,
   * legible, non-graphic detail the text gives; never blade-entry geometry. */
  spearReverse: number;
}

/** Abner's pose at scene time `t`. Exported for unit tests. */
export function abnerPose(t: number, mode: ViolenceMode): AbnerPose {
  if (t < T_ARRIVAL) {
    const p = smoothstep(t / T_ARRIVAL);
    const x = lerp(ABNER_ARRIVE_START[0], ABNER_POOL_POS[0], p);
    const z = lerp(ABNER_ARRIVE_START[1], ABNER_POOL_POS[1], p);
    return { x, z, yaw: yawToward(x, z, POOL_CENTER[0], POOL_CENTER[1]), lean: 0, spearReverse: 0 };
  }

  if (t < T_BATTLE_SPREADS) {
    return {
      x: ABNER_POOL_POS[0],
      z: ABNER_POOL_POS[1],
      yaw: yawToward(ABNER_POOL_POS[0], ABNER_POOL_POS[1], JOAB_POOL_POS[0], JOAB_POOL_POS[1]),
      lean: 0,
      spearReverse: 0,
    };
  }

  const u = abnerProgress(t);
  const { x, z, yaw: forwardYaw } = samplePursuitPoint(u);

  const glance = abnerWarnGlance(t);
  const strike =
    clamp01(smoothstep((t - T_ASAHEL_DEATH) / fallDuration(mode, 2))) *
    (1 - smoothstep((t - (T_ASAHEL_DEATH + STAND_STILL_DUR + 3)) / 4));
  const turnBlend = Math.max(glance * 0.6, strike);
  const backYaw = forwardYaw + Math.PI;

  const lean = smoothstep((t - T_ABNER_PLEA) / 3);

  return { x, z, yaw: lerp(forwardYaw, backYaw, turnBlend), lean, spearReverse: strike };
}

export interface JoabPose {
  x: number;
  z: number;
  yaw: number;
}

/** Joab's pose at scene time `t`. Exported for unit tests. */
export function joabPose(t: number): JoabPose {
  if (t < T_ARRIVAL) {
    const p = smoothstep(t / T_ARRIVAL);
    const x = lerp(JOAB_ARRIVE_START[0], JOAB_POOL_POS[0], p);
    const z = lerp(JOAB_ARRIVE_START[1], JOAB_POOL_POS[1], p);
    return { x, z, yaw: yawToward(x, z, POOL_CENTER[0], POOL_CENTER[1]) };
  }
  if (t < T_BATTLE_SPREADS) {
    return {
      x: JOAB_POOL_POS[0],
      z: JOAB_POOL_POS[1],
      yaw: yawToward(JOAB_POOL_POS[0], JOAB_POOL_POS[1], ABNER_POOL_POS[0], ABNER_POOL_POS[1]),
    };
  }

  const et = effectiveTime(t);
  const raw = clamp01(
    smoothstep((et - JOAB_PURSUIT_START) / (JOAB_HILL_ARRIVE_T - JOAB_PURSUIT_START)),
  );
  const u = raw * HILL_BASE_U;
  const { x, z, yaw } = samplePursuitPoint(u);

  if (t < T_JOAB_HALTS) return { x, z, yaw };
  return { x, z, yaw: yawToward(x, z, AMMAH_HILL_POS[0], AMMAH_HILL_POS[1]) };
}

const ABISHAI_ARRIVE_OFFSET: [number, number] = [5, 3];
const ABISHAI_LATERAL_OFFSET: [number, number] = [7, -4];

/** Abishai's pose: parallel to Joab throughout, per 2:24. Exported for unit
 * tests. */
export function abishaiPose(t: number): JoabPose {
  const base = joabPose(t);
  if (t < T_BATTLE_SPREADS) {
    const p = t < T_ARRIVAL ? smoothstep(t / T_ARRIVAL) : 1;
    const startX = JOAB_ARRIVE_START[0] + ABISHAI_ARRIVE_OFFSET[0];
    const startZ = JOAB_ARRIVE_START[1] + ABISHAI_ARRIVE_OFFSET[1];
    const x = lerp(startX, ABISHAI_POOL_POS[0], p);
    const z = lerp(startZ, ABISHAI_POOL_POS[1], p);
    return { x, z, yaw: base.yaw };
  }
  return {
    x: base.x + ABISHAI_LATERAL_OFFSET[0],
    z: base.z + ABISHAI_LATERAL_OFFSET[1],
    yaw: base.yaw,
  };
}

export interface AsahelPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing .. 1 fallen and still (2:23). */
  fallen: number;
}

/** Asahel's progress (0..1) along `PURSUIT_CURVE`, converging on Abner's own
 * position at the exact moment of the strike, then holding there. Exported
 * for unit tests. */
export function asahelProgress(t: number): number {
  if (t < ASAHEL_PEEL_T) return 0;
  const raw = clamp01(smoothstep((t - ASAHEL_PEEL_T) / (T_ASAHEL_DEATH - ASAHEL_PEEL_T)));
  return raw * ASAHEL_DEATH_U;
}

/** Asahel's pose at scene time `t`. Exported for unit tests. */
export function asahelPose(t: number, mode: ViolenceMode): AsahelPose {
  if (t < T_ARRIVAL) {
    const p = smoothstep(t / T_ARRIVAL);
    const x = lerp(JOAB_ARRIVE_START[0] - 4, ASAHEL_POOL_POS[0], p);
    const z = lerp(JOAB_ARRIVE_START[1] - 3, ASAHEL_POOL_POS[1], p);
    return { x, z, yaw: yawToward(x, z, POOL_CENTER[0], POOL_CENTER[1]), fallen: 0 };
  }
  if (t < ASAHEL_PEEL_T) {
    return {
      x: ASAHEL_POOL_POS[0],
      z: ASAHEL_POOL_POS[1],
      yaw: yawToward(ASAHEL_POOL_POS[0], ASAHEL_POOL_POS[1], ABNER_POOL_POS[0], ABNER_POOL_POS[1]),
      fallen: 0,
    };
  }

  const u = asahelProgress(t);
  const { x, z, yaw } = samplePursuitPoint(u);
  if (t < T_ASAHEL_DEATH) return { x, z, yaw, fallen: 0 };

  const fallen = smoothstep((t - T_ASAHEL_DEATH) / fallDuration(mode, 5));
  return { x, z, yaw, fallen };
}
