import type { ViolenceMode } from '../../state/store';
import {
  ABNER_FLIGHT_CURVE,
  ASAHEL_FLIGHT_CURVE,
  curvePose,
  curvePoseOffset,
  HILL_BASE_POS,
  JOAB_FLIGHT_CURVE,
  JOAB_U_AT_DEATH_POINT,
  yawToward,
  type FigureSlot,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for gibeon-pool (ADR-007
 * convention, mirroring gilboa-battle/ziklag-lament's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `gibeon-pool` entry exactly (`b-context`
 * through `b-close`) — see docs/design/gibeon-pool-brief.md, "Camera /
 * observer experience" and the full standard/reduced beat table.
 *
 * Hard constraints carried here: no function ever stages Ish-bosheth or
 * battle geometry at Mahanaim (narrated only, never built); no function ever
 * produces blade-entry, blood, gore, or dismemberment geometry, in either
 * violence mode (ADR-009); Asahel's death (`asahelDeathEnvelope`,
 * `abnerStrikeEnvelope`) follows this scene's own dedicated precedent —
 * distance, the reversed-spear-grip gesture only, and a held reaction
 * beat — not a second copy of Saul's suicide staging from gilboa-battle.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 10;
export const T_PROPOSAL = 34;
export const T_CHAMPIONS = 50;
export const T_BATTLE_SPREADS = 74;
export const T_ASAHEL_PURSUIT = 100;
export const T_ABNER_WARNS = 126;
export const T_ASAHEL_DEATH = 142;
export const T_PURSUIT_CONTINUES = 158;
export const T_STANDOFF = 178;
export const T_ABNER_PLEA = 196;
export const T_JOAB_HALTS = 212;
export const T_CASUALTY_COUNT = 226;
export const T_CLOSE = 240;
export const DURATION_SEC = 250;

/** How long the "stood still" reaction beat holds bystanders/pursuers in
 * place after Asahel's death (2:23b) before Joab/Abishai's pursuit resumes
 * (`T_PURSUIT_CONTINUES`, 2:24). */
export const REACTION_HOLD_SEC = T_PURSUIT_CONTINUES - T_ASAHEL_DEATH;

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
 * pose almost immediately — same convention as gilboa-battle/jabesh-burial's
 * poses.ts (ADR-009: "reduction abstracts depiction, never facts"). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

export interface UKeyframe {
  t: number;
  u: number;
}

/** Piecewise-smoothstepped progress (0..1, or any keyframed scalar) through
 * an ordered list of (time, value) keyframes — the shared mechanism behind
 * every principal's flight-curve progress in this file. Exported for unit
 * tests. */
export function keyframeValue(t: number, keys: UKeyframe[]): number {
  if (keys.length === 0) return 0;
  if (t <= keys[0].t) return keys[0].u;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t <= b.t) {
      const span = b.t - a.t || 1;
      return lerp(a.u, b.u, smoothstep((t - a.t) / span));
    }
  }
  return keys[keys.length - 1].u;
}

// ---------------------------------------------------------------------------
// Abner (2:8-32): installs Ish-bosheth (narrated only, b-context), proposes
// the contest, watches the champions fall, then retreats as the battle
// spreads, fleeing east with Asahel closing behind him. Halts and kills
// Asahel (2:23), continues fleeing, then stands at the hill of Ammah and
// pleads for restraint (2:26).

const ABNER_U_KEYS: UKeyframe[] = [
  { t: T_CONTEXT, u: 0 },
  { t: T_BATTLE_SPREADS, u: 0 },
  { t: T_ASAHEL_PURSUIT, u: 0.22 },
  { t: T_ASAHEL_DEATH, u: 0.5 },
  { t: T_ASAHEL_DEATH + REACTION_HOLD_SEC, u: 0.5 },
  { t: T_STANDOFF, u: 1 },
  { t: DURATION_SEC, u: 1 },
];

export interface AbnerPose extends FigureSlot {
  /** 0..1 the reversed spear-grip gesture (2:23) — a gesture/orientation
   * change only, never penetration geometry. Zero outside the strike window. */
  reversedGrip: number;
  /** 0..1 the plea gesture at the hill (2:26). */
  plea: number;
}

/** Abner's pose at scene time `t`. Exported for unit tests. */
export function abnerPose(t: number): AbnerPose {
  const u = keyframeValue(t, ABNER_U_KEYS);
  const base = curvePose(ABNER_FLIGHT_CURVE, u);

  const grip =
    smoothstep((t - T_ASAHEL_DEATH) / 1.2) * (1 - smoothstep((t - (T_ASAHEL_DEATH + 4)) / 1.5));
  const plea = smoothstep((t - T_ABNER_PLEA) / 2) * (1 - smoothstep((t - T_CASUALTY_COUNT) / 3));

  // At the hill crest, Abner turns to face down toward Joab/Abishai rather
  // than continuing to face along the flight curve's tangent.
  if (u >= 1) {
    const facePlea = smoothstep(plea);
    const downYaw = Math.atan2(HILL_BASE_POS[0] - base.x, HILL_BASE_POS[1] - base.z);
    return { ...base, yaw: lerp(base.yaw, downYaw, facePlea), reversedGrip: grip, plea };
  }
  return { ...base, reversedGrip: grip, plea };
}

// ---------------------------------------------------------------------------
// Asahel (2:18-23, 2:32): "swift as a gazelle," pursues Abner alone despite
// two warnings, and is killed by a backward spear-thrust. His death is this
// project's first named-character-kills-named-character rendering (see
// docs/design/gibeon-pool-brief.md, "Asahel's death").

const ASAHEL_U_KEYS: UKeyframe[] = [
  { t: T_CONTEXT, u: 0 },
  { t: T_BATTLE_SPREADS, u: 0.15 },
  { t: T_ASAHEL_PURSUIT, u: 0.55 },
  { t: T_ASAHEL_DEATH, u: 1 },
  { t: DURATION_SEC, u: 1 },
];

export interface AsahelPose extends FigureSlot {
  /** 0 standing .. 1 fallen/still, after the strike. Same collapse-transform
   * convention as every prior death in the project (asset-figure-fallen). */
  fallen: number;
}

/** Asahel's pose at scene time `t` and violence mode. In reduced mode the
 * fall is elided to a near-instant cut (brief: "cut from Abner turning to
 * Asahel already fallen and still"). Exported for unit tests. */
export function asahelPose(t: number, mode: ViolenceMode): AsahelPose {
  const u = keyframeValue(t, ASAHEL_U_KEYS);
  const base = curvePose(ASAHEL_FLIGHT_CURVE, u);
  const dur = fallDuration(mode, 5);
  const fallen = smoothstep((t - T_ASAHEL_DEATH) / dur);
  return { ...base, fallen };
}

// ---------------------------------------------------------------------------
// Joab and Abishai (2:13-32): agree to the contest, command at the pool and
// the spreading battle, pursue Abner past Asahel's death (pausing at the
// "stood still" reaction beat, 2:23b), then halt the pursuit at Abner's
// plea (2:26-28).

const JOAB_U_KEYS: UKeyframe[] = [
  { t: T_CONTEXT, u: 0 },
  { t: T_BATTLE_SPREADS, u: 0.1 },
  { t: T_ASAHEL_PURSUIT, u: 0.35 },
  { t: T_ASAHEL_DEATH, u: JOAB_U_AT_DEATH_POINT },
  { t: T_ASAHEL_DEATH + REACTION_HOLD_SEC, u: JOAB_U_AT_DEATH_POINT },
  { t: T_STANDOFF, u: 1 },
  { t: DURATION_SEC, u: 1 },
];

export interface JoabPose extends FigureSlot {
  /** 0..1 the held-reaction-beat stillness (2:23b: "all who came to the
   * place where Asahel had fallen and died, stood still") — a posture flag
   * a caller can use to suppress any idle sway/gesture during the hold,
   * never a new geometry. */
  reactionHold: number;
  /** 0..1 the trumpet-halt gesture (2:27-28). */
  trumpet: number;
}

/** Joab's pose at scene time `t`. Exported for unit tests. */
export function joabPose(t: number): JoabPose {
  const u = keyframeValue(t, JOAB_U_KEYS);
  const base = curvePose(JOAB_FLIGHT_CURVE, u);
  const reactionHold =
    t >= T_ASAHEL_DEATH && t < T_PURSUIT_CONTINUES
      ? smoothstep((t - T_ASAHEL_DEATH) / 1.5) *
        (1 - smoothstep((t - (T_PURSUIT_CONTINUES - 1.5)) / 1.5))
      : 0;
  const trumpet =
    smoothstep((t - T_JOAB_HALTS) / 1.5) * (1 - smoothstep((t - (T_JOAB_HALTS + 6)) / 2));
  return { ...base, reactionHold, trumpet };
}

/** Abishai's pose: Joab's own curve/timing, offset laterally so he reads as
 * a distinct figure beside Joab rather than exactly overlapping him
 * (brief's "figure positions" allowed placeholder). Exported for unit tests. */
export function abishaiPose(t: number): FigureSlot {
  const u = keyframeValue(t, JOAB_U_KEYS);
  return curvePoseOffset(JOAB_FLIGHT_CURVE, u, 3.2);
}

// ---------------------------------------------------------------------------
// The champions' contest (2:14-16): twelve pairs, each seizing the other by
// the head and falling together — rendered as a paired grapple/fall cycle
// sharing one animation function parameterized by pair index (brief's
// "Performance target": "12 paired grapple/fall cycles sharing one animation
// function").

const CHAMPIONS_GRAPPLE_LEAD = 1.5;

export interface ChampionPose {
  /** 0..1 the head-grasp/lean-forward gesture — legible without any wound
   * detail (2:15's "seized each other by the head"). */
  grasp: number;
  /** 0 standing .. 1 fallen/still, mutual (2:16). */
  fallen: number;
}

/**
 * One pair's grapple/fall envelope, staggered by `pairOffset` (a small
 * per-pair delay so the line doesn't fall in perfect unison). Standard shows
 * the grasp, then the mutual fall; reduced cuts from the grasp straight to
 * all twenty-four fallen (still) — brief's `b-champions` reduced treatment.
 * Exported for unit tests.
 */
export function championPose(t: number, mode: ViolenceMode, pairOffset: number): ChampionPose {
  const start = T_CHAMPIONS + pairOffset;
  const grasp = smoothstep((t - start) / 2);
  const fallStart = start + CHAMPIONS_GRAPPLE_LEAD;
  const dur = fallDuration(mode, 5);
  const fallen = smoothstep((t - fallStart) / dur);
  return { grasp, fallen };
}

// ---------------------------------------------------------------------------
// The two wider contingents (claim-gibeon-battle-scale): Abner's Israel/
// Benjamin company and Joab's Judah company. Both arrive at their bank once
// b-arrival begins (no geometry before it — b-context is a text-only card),
// hold through the proposal/champions beats, then drift outward into the
// spreading battlefield once the wider clash ignites (b-battle-spreads).
// From there each figure takes one of three disclosed roles: `falls` (a
// rout-style casualty, read by motion/distance per ADR-009, never a literal
// count matching 2:29-31's real casualty figures), `band` (drawn from — not
// additive to — the contingent: continues on to the hill of Ammah/its foot
// for the standoff), or `hold` (remains on the spread ground, untracked
// further — the majority on Joab's side, who have won the field; a minority
// on Abner's, who have not fled as far).

export const SPREAD_MOVE_START = T_BATTLE_SPREADS;
export const SPREAD_MOVE_DUR = 12;

export type ContingentRole = 'falls' | 'band' | 'hold';

export interface ContingentFigureState {
  bankPos: [number, number];
  spreadPos: [number, number];
  role: ContingentRole;
  bandSlot: [number, number] | null;
  /** Seconds after settling on the spread ground before a `falls` figure
   * begins its collapse. */
  fallDelay: number;
  /** Seconds after `T_ASAHEL_PURSUIT` a `band` figure begins moving on
   * toward the hill — staggers the band so it doesn't arrive in lockstep. */
  moveDelay: number;
}

export interface ContingentPose extends FigureSlot {
  fallen: number;
  /** 0..1 spawn-in envelope — zero until b-arrival begins, so no contingent
   * geometry is visible during the text-only b-context card. */
  spawnScale: number;
}

/** One contingent figure's pose at scene time `t`. Exported for unit tests. */
export function contingentFigurePose(
  t: number,
  fig: ContingentFigureState,
  mode: ViolenceMode,
): ContingentPose {
  const spawnScale = smoothstep((t - T_ARRIVAL) / 3);
  const bankYaw = yawToward(fig.bankPos[0], fig.bankPos[1], fig.spreadPos[0], fig.spreadPos[1]);

  if (t < SPREAD_MOVE_START) {
    return { x: fig.bankPos[0], z: fig.bankPos[1], yaw: bankYaw, fallen: 0, spawnScale };
  }

  const moveToSpread = smoothstep((t - SPREAD_MOVE_START) / SPREAD_MOVE_DUR);
  let x = lerp(fig.bankPos[0], fig.spreadPos[0], moveToSpread);
  let z = lerp(fig.bankPos[1], fig.spreadPos[1], moveToSpread);
  let yaw = bankYaw;
  let fallen = 0;

  if (fig.role === 'falls') {
    const fallStart = SPREAD_MOVE_START + SPREAD_MOVE_DUR + fig.fallDelay;
    fallen = smoothstep((t - fallStart) / fallDuration(mode, 6));
  } else if (fig.role === 'band' && fig.bandSlot) {
    const moveStart = T_ASAHEL_PURSUIT + fig.moveDelay;
    if (t >= moveStart) {
      const bandProgress = smoothstep((t - moveStart) / Math.max(1, T_STANDOFF - moveStart));
      x = lerp(fig.spreadPos[0], fig.bandSlot[0], bandProgress);
      z = lerp(fig.spreadPos[1], fig.bandSlot[1], bandProgress);
      if (bandProgress > 0.02) {
        yaw = yawToward(fig.spreadPos[0], fig.spreadPos[1], fig.bandSlot[0], fig.bandSlot[1]);
      }
    }
  }

  return { x, z, yaw, fallen, spawnScale };
}
