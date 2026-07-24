import type { ViolenceMode } from '../../state/store';
import {
  AMMAH_HILL_CENTER,
  ASAHEL_CHASE_START,
  ASAHEL_DEATH_POS,
  BATTLE_SPREAD_CENTER,
  ISRAEL_BANK_Z,
  JOAB_HALT_POS,
  JUDAH_BANK_Z,
  yawToward,
} from './layout';

/**
 * Pure, beat-driven pose choreography for gibeon-pool (ADR-007 convention,
 * mirroring gilboa-battle/ziklag-lament/hebron-anointing's poses.ts). Beat
 * times match `src/data/scenes.ts`'s `gibeon-pool` entry exactly (`b-context`
 * through `b-close`) — see docs/design/gibeon-pool-brief.md's beat table for
 * the standard/reduced treatment this file implements.
 *
 * ADR-009: one choreography, two treatments, exactly as established by every
 * prior violence-adjacent scene. No function here ever produces wound,
 * blood, or dismemberment geometry; "fallen" is only ever a body-
 * orientation/collapse transform. `b-asahel-death` carries this project's
 * first named-character-kills-named-character precedent (see the brief's
 * dedicated section): documentary distance, no wound geometry in either
 * mode, the text's one specific non-graphic detail (Abner's reversed spear
 * grip) shown in standard mode only, and reduced mode elides the whole
 * strike mechanic rather than merely shortening it — Asahel is simply
 * already fallen, the fact and method carried by the beat caption's text,
 * not the animation.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 8;
export const T_PROPOSAL = 26;
export const T_CHAMPIONS = 40;
export const T_BATTLE_SPREAD = 60;
export const T_ASAHEL_PURSUIT = 82;
export const T_ABNER_WARNS = 100;
export const T_ASAHEL_DEATH = 112;
export const T_PURSUIT_CONTINUES = 126;
export const T_STANDOFF = 140;
export const T_ABNER_PLEA = 152;
export const T_JOAB_HALTS = 162;
export const T_CASUALTY_COUNT = 172;
export const T_CLOSE = 182;
export const DURATION_SEC = 194;

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

/** Duration (seconds) of an animated transition. Standard uses the full,
 * gradual duration; reduced elides the animation and cuts to the resulting
 * pose almost immediately — same convention as every prior scene's poses.ts
 * (ADR-009: "reduction abstracts depiction, never facts"). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// The champions' contest (b-champions, 2:14-16): twelve pairs, one shared
// choreography parameterized by a per-pair phase offset so the "twelve times
// over" reads as a ragged, near-simultaneous cluster rather than a single
// synchronized cut. `reach` is the head-grasp approach gesture (identical in
// both modes — the brief: "the pairing is shown" even when reduced); `fallen`
// is the mutual collapse, elided to a near-instant cut in reduced mode
// ("cut from the grapple to all twenty-four fallen").

export interface ChampionPose {
  /** 0 apart .. 1 fully grasped (the head-grasp gesture, 2:16a). */
  reach: number;
  /** 0 standing .. 1 fallen (the mutual killing, 2:16b). */
  fallen: number;
}

const CHAMPION_REACH_DUR = 5;
const CHAMPION_FALL_LEAD = 7;

export function championPose(t: number, mode: ViolenceMode, phaseOffset = 0): ChampionPose {
  const reach = smoothstep((t - T_CHAMPIONS - phaseOffset) / CHAMPION_REACH_DUR);
  const fallStart = T_CHAMPIONS + CHAMPION_FALL_LEAD + phaseOffset;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, 4));
  return { reach, fallen };
}

// ---------------------------------------------------------------------------
// The wider contingents (b-battle-spreads, 2:17): each figure holds at its
// bank slot through the arrival/proposal/champions beats, then drifts to a
// spread-field slot once the wider clash ignites. A seeded fraction "falls"
// partway — a collapse transform in standard mode, a fade/thin in reduced
// mode (brief: "individual falls are elided, read only by the crowd
// thinning"). A hill-bound subset (Abner's contingent only — the rallying
// Benjaminite band, 2:25, drawn from this contingent, not additive to it)
// continues on to a hill-of-Ammah slot starting at `T_STANDOFF`.

export interface ContingentFigureConfig {
  bankX: number;
  bankZ: number;
  bankYaw: number;
  targetX: number;
  targetZ: number;
  targetYaw: number;
  arriveDelay: number;
  driftDuration: number;
  falls: boolean;
  fallProgress: number;
  /** Present only for the hill-bound subset of Abner's contingent. */
  hillX?: number;
  hillZ?: number;
  hillYaw?: number;
}

export interface ContingentPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

const HILL_ARRIVE_DURATION = 10;

export function contingentFigurePose(
  t: number,
  cfg: ContingentFigureConfig,
  mode: ViolenceMode,
): ContingentPose {
  if (t < T_BATTLE_SPREAD) {
    return { x: cfg.bankX, z: cfg.bankZ, yaw: cfg.bankYaw, fallen: 0, visible: true };
  }
  const startT = T_BATTLE_SPREAD + cfg.arriveDelay;
  if (t < startT) {
    return { x: cfg.bankX, z: cfg.bankZ, yaw: cfg.bankYaw, fallen: 0, visible: true };
  }

  const driftProgress = clamp01((t - startT) / cfg.driftDuration);
  const fallStartT = startT + cfg.fallProgress * cfg.driftDuration;

  if (cfg.falls && t >= fallStartT) {
    if (mode === 'standard') {
      const fx = lerp(cfg.bankX, cfg.targetX, cfg.fallProgress);
      const fz = lerp(cfg.bankZ, cfg.targetZ, cfg.fallProgress);
      const fallen = smoothstep((t - fallStartT) / fallDuration(mode, 5));
      return { x: fx, z: fz, yaw: cfg.targetYaw, fallen, visible: true };
    }
    // Reduced: the fall is elided. The figure keeps drifting but fades from
    // the scene — the clash reads by the crowd thinning, not a depicted fall.
    const x = lerp(cfg.bankX, cfg.targetX, driftProgress);
    const z = lerp(cfg.bankZ, cfg.targetZ, driftProgress);
    const fade = smoothstep((t - fallStartT) / 3);
    return { x, z, yaw: cfg.targetYaw, fallen: 0, visible: fade < 0.97 };
  }

  let x = lerp(cfg.bankX, cfg.targetX, driftProgress);
  let z = lerp(cfg.bankZ, cfg.targetZ, driftProgress);
  let yaw = cfg.targetYaw;

  if (cfg.hillX !== undefined && cfg.hillZ !== undefined && t >= T_STANDOFF) {
    const hillProgress = clamp01((t - T_STANDOFF) / HILL_ARRIVE_DURATION);
    x = lerp(cfg.targetX, cfg.hillX, hillProgress);
    z = lerp(cfg.targetZ, cfg.hillZ, hillProgress);
    if (hillProgress > 0.5 && cfg.hillYaw !== undefined) yaw = cfg.hillYaw;
  }

  return { x, z, yaw, fallen: 0, visible: true };
}

// ---------------------------------------------------------------------------
// Named principals: Abner, Joab, Abishai, Asahel (2:8-32). Each follows the
// same "journey" the brief lays out — pool bank, battle-spread field,
// pursuit route, hill of Ammah — as a small set of explicit phases rather
// than a generic curve, since each principal's path differs in exactly the
// ways the text specifies (Asahel breaks off alone; Abner flees on to the
// hill; Joab and Abishai pause at the place Asahel fell).

const ABNER_BANK: [number, number] = [-14, ISRAEL_BANK_Z - 6];
const JOAB_BANK: [number, number] = [-10, JUDAH_BANK_Z + 6];
const ABISHAI_BANK: [number, number] = [8, JUDAH_BANK_Z + 6];
const ASAHEL_BANK: [number, number] = [-2, JUDAH_BANK_Z + 10];

const ABNER_SPREAD: [number, number] = BATTLE_SPREAD_CENTER;
const JUDAH_SPREAD: [number, number] = [BATTLE_SPREAD_CENTER[0], -BATTLE_SPREAD_CENTER[1]];

/** Abner's position atop the hill of Ammah, from which he delivers his plea (2:26). */
const ABNER_HILL_POS: [number, number] = [AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1] + 10];

interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
}

/** Interpolates x/z between two points over [tStart, tEnd], holding at each end outside that window. */
function journeySegment(
  t: number,
  tStart: number,
  tEnd: number,
  from: [number, number],
  to: [number, number],
): [number, number, number] {
  const p = smoothstep((t - tStart) / (tEnd - tStart));
  const x = lerp(from[0], to[0], p);
  const z = lerp(from[1], to[1], p);
  return [x, z, p];
}

export interface AbnerPose extends PrincipalPose {
  /** 0..1 the reversed spear-grip gesture (2:23's "backward" thrust) —
   * standard mode only; stays 0 throughout in reduced mode, per the brief's
   * "reduced mode elides the strike itself, not the fact or the method." */
  spearReversed: number;
  /** 0..1 a brief strike pulse at the moment of the blow — standard only. */
  strike: number;
}

/** Abner: bank -> battle-spread -> the pursuit route (fleeing, warning
 * Asahel twice, then the death blow) -> flees on to the hill of Ammah, where
 * he stays and delivers his plea (2:26). */
export function abnerPose(t: number, mode: ViolenceMode): AbnerPose {
  if (t < T_BATTLE_SPREAD) {
    return {
      x: ABNER_BANK[0],
      z: ABNER_BANK[1],
      yaw: yawToward(...ABNER_BANK, 0, 0),
      spearReversed: 0,
      strike: 0,
    };
  }
  if (t < T_ASAHEL_PURSUIT) {
    const [x, z] = journeySegment(t, T_BATTLE_SPREAD, T_ASAHEL_PURSUIT, ABNER_BANK, ABNER_SPREAD);
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_DEATH_POS), spearReversed: 0, strike: 0 };
  }
  if (t < T_ABNER_WARNS) {
    const [x, z] = journeySegment(
      t,
      T_ASAHEL_PURSUIT,
      T_ABNER_WARNS,
      ABNER_SPREAD,
      ASAHEL_DEATH_POS,
    );
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_CHASE_START), spearReversed: 0, strike: 0 };
  }
  // From T_ABNER_WARNS on, Abner has stopped and turned to face Asahel —
  // the two warnings (2:21-22), then the blow (2:23), all at this one spot.
  const yaw = yawToward(...ASAHEL_DEATH_POS, ...ASAHEL_CHASE_START);
  const spearReversed =
    mode === 'standard' ? smoothstep((t - T_ABNER_WARNS) / (T_ASAHEL_DEATH - T_ABNER_WARNS)) : 0;
  const strike =
    mode === 'standard'
      ? smoothstep((t - T_ASAHEL_DEATH) / 0.6) *
        (1 - smoothstep((t - (T_ASAHEL_DEATH + 1.8)) / 0.6))
      : 0;
  if (t < T_PURSUIT_CONTINUES) {
    return { x: ASAHEL_DEATH_POS[0], z: ASAHEL_DEATH_POS[1], yaw, spearReversed, strike };
  }
  if (t < T_STANDOFF) {
    const [x, z] = journeySegment(
      t,
      T_PURSUIT_CONTINUES,
      T_STANDOFF,
      ASAHEL_DEATH_POS,
      ABNER_HILL_POS,
    );
    return { x, z, yaw: yawToward(x, z, ...ABNER_HILL_POS), spearReversed: 0, strike: 0 };
  }
  return {
    x: ABNER_HILL_POS[0],
    z: ABNER_HILL_POS[1],
    yaw: yawToward(...ABNER_HILL_POS, ...JOAB_HALT_POS),
    spearReversed: 0,
    strike: 0,
  };
}

/** Joab and Abishai: bank -> battle-spread -> the pursuit route, arriving at
 * the place Asahel fell a few beats after his death (2:23b's "all who came
 * to the place... stood still" — the held reaction beat: they simply stop
 * moving there, held through `T_PURSUIT_CONTINUES`), then on to the hill of
 * Ammah's base (2:24), where they stay through the standoff/plea/halt. */
function pursuerPose(t: number, bank: [number, number]): PrincipalPose {
  const arriveAtDeathT = T_ASAHEL_DEATH + 5;
  if (t < T_BATTLE_SPREAD) {
    return { x: bank[0], z: bank[1], yaw: yawToward(...bank, 0, 0) };
  }
  if (t < T_ASAHEL_PURSUIT) {
    const [x, z] = journeySegment(t, T_BATTLE_SPREAD, T_ASAHEL_PURSUIT, bank, JUDAH_SPREAD);
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_DEATH_POS) };
  }
  if (t < arriveAtDeathT) {
    const [x, z] = journeySegment(
      t,
      T_ASAHEL_PURSUIT,
      arriveAtDeathT,
      JUDAH_SPREAD,
      ASAHEL_DEATH_POS,
    );
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_DEATH_POS) };
  }
  if (t < T_PURSUIT_CONTINUES) {
    // Held reaction beat (2:23b): stopped still at the place Asahel fell.
    return {
      x: ASAHEL_DEATH_POS[0],
      z: ASAHEL_DEATH_POS[1],
      yaw: yawToward(...ASAHEL_DEATH_POS, ...JOAB_HALT_POS),
    };
  }
  if (t < T_STANDOFF) {
    const [x, z] = journeySegment(
      t,
      T_PURSUIT_CONTINUES,
      T_STANDOFF,
      ASAHEL_DEATH_POS,
      JOAB_HALT_POS,
    );
    return { x, z, yaw: yawToward(x, z, ...AMMAH_HILL_CENTER) };
  }
  return {
    x: JOAB_HALT_POS[0],
    z: JOAB_HALT_POS[1],
    yaw: yawToward(...JOAB_HALT_POS, ...AMMAH_HILL_CENTER),
  };
}

export interface JoabPose extends PrincipalPose {
  /** 0..1 the trumpet-sounding gesture at the halt (2:28) — identical in both modes, no violence. */
  trumpet: number;
}

export function joabPose(t: number): JoabPose {
  const p = pursuerPose(t, JOAB_BANK);
  const trumpet =
    smoothstep((t - T_JOAB_HALTS) / 1.5) * (1 - smoothstep((t - (T_JOAB_HALTS + 4)) / 1.5));
  return { ...p, trumpet };
}

export function abishaiPose(t: number): PrincipalPose {
  return pursuerPose(t, ABISHAI_BANK);
}

export interface AsahelPose extends PrincipalPose {
  /** 0 standing .. 1 fallen and still (2:23a). Standard: a brief, gradual
   * collapse. Reduced: an elided, near-instant cut — the beat opens on him
   * already fallen, per the brief's "cut from Abner turning to Asahel
   * already fallen and still." */
  fallen: number;
}

/** Asahel: bank -> battle-spread (with Joab/Abishai) -> breaks off alone,
 * running ahead to the pursuit route ("swift as a gazelle," 2:18) -> falls
 * at `T_ASAHEL_DEATH` and stays there, still, for the remainder of the
 * scene (2:23a) — never moved again in this scene (his burial at Bethlehem
 * is a text-only closing card, `b-close`, out of this scene's location). */
export function asahelPose(t: number, mode: ViolenceMode): AsahelPose {
  const fallen = smoothstep((t - T_ASAHEL_DEATH) / fallDuration(mode, 4));
  if (t < T_BATTLE_SPREAD) {
    return {
      x: ASAHEL_BANK[0],
      z: ASAHEL_BANK[1],
      yaw: yawToward(...ASAHEL_BANK, 0, 0),
      fallen: 0,
    };
  }
  if (t < T_ASAHEL_PURSUIT) {
    const [x, z] = journeySegment(t, T_BATTLE_SPREAD, T_ASAHEL_PURSUIT, ASAHEL_BANK, JUDAH_SPREAD);
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_CHASE_START), fallen: 0 };
  }
  if (t < T_ABNER_WARNS) {
    const [x, z] = journeySegment(
      t,
      T_ASAHEL_PURSUIT,
      T_ABNER_WARNS,
      JUDAH_SPREAD,
      ASAHEL_CHASE_START,
    );
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_DEATH_POS), fallen: 0 };
  }
  if (t < T_ASAHEL_DEATH) {
    const [x, z] = journeySegment(
      t,
      T_ABNER_WARNS,
      T_ASAHEL_DEATH,
      ASAHEL_CHASE_START,
      ASAHEL_DEATH_POS,
    );
    return { x, z, yaw: yawToward(x, z, ...ASAHEL_DEATH_POS), fallen: 0 };
  }
  return {
    x: ASAHEL_DEATH_POS[0],
    z: ASAHEL_DEATH_POS[1],
    yaw: yawToward(...ASAHEL_DEATH_POS, ...ASAHEL_CHASE_START),
    fallen,
  };
}
