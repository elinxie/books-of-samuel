import type { ViolenceMode } from '../../state/store';
import { AMMAH_HILL_CENTER, ASAHEL_DEATH_U, pursuitPointAt } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for gibeon-pool (ADR-007
 * convention, mirroring gilboa-battle/ziklag-lament's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `gibeon-pool` entry exactly (`b-context`
 * through `b-close`) — see docs/design/gibeon-pool-brief.md, "Camera /
 * observer experience" and the beat table's standard/reduced treatment.
 *
 * ADR-009, extended to this scene's precedent-setting death (see the brief's
 * "Asahel's death — the precedent this sets"): documentary distance, no
 * wound/blood/dismemberment geometry in any mode, no close-up or lingering
 * framing on any death. Reduced mode never changes the narrative fact or the
 * final pose a figure settles into — it elides the animated transition and
 * cuts to the resulting pose sooner (`fallDuration`, identical convention to
 * gilboa-battle/ziklag-lament). Abner's reversed spear grip and the 2:23b
 * "stood still" bystander hold are gesture/stillness beats only — never
 * penetration or contact geometry.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 14;
export const T_PROPOSAL = 34;
export const T_CHAMPIONS = 52;
export const T_BATTLE_SPREADS = 82;
export const T_ASAHEL_PURSUIT = 106;
export const T_ABNER_WARNS = 130;
export const T_ASAHEL_DEATH = 150;
export const T_PURSUIT_CONTINUES = 168;
export const T_STANDOFF = 190;
export const T_ABNER_PLEA = 208;
export const T_JOAB_HALTS = 224;
export const T_CASUALTY_COUNT = 240;
export const T_CLOSE = 256;
export const DURATION_SEC = 270;

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

/** Duration (seconds) of an animated fall/collapse transition. Standard uses
 * the full, gradual duration; reduced elides the animation and cuts to the
 * resulting pose almost immediately — the same eventual pose, reached sooner
 * (brief: "reduction abstracts depiction, never facts"). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

/** A short, symmetric 0..1 bell pulse centered on `center`, zero outside
 * +/- `width`. Used for the two on-record warning gestures (2:21-22). */
function pulse(t: number, center: number, width: number): number {
  const d = Math.abs(t - center);
  if (d > width) return 0;
  return smoothstep(1 - d / width);
}

/** Given a curve fraction `u`, returns a position that follows
 * `pursuitPointAt` up to `settleFrom`, then blends from that fixed point
 * onward to a specific `target` (a per-figure resting slot near the hill or
 * a scatter point) as `u` continues from `settleFrom` to 1. Keeps every
 * figure on the same shared route while still giving each a distinct,
 * legible final position (the rallying band spreads across the hilltop, the
 * pursuers gather below it — brief's deliberate visual-irony composition). */
export function curveThenSettle(
  u: number,
  settleFrom: number,
  target: [number, number],
): { x: number; z: number } {
  if (u <= settleFrom) {
    const p = pursuitPointAt(u);
    return { x: p.x, z: p.z };
  }
  const p = pursuitPointAt(settleFrom);
  const blend = smoothstep((u - settleFrom) / (1 - settleFrom));
  return { x: lerp(p.x, target[0], blend), z: lerp(p.z, target[1], blend) };
}

/** Elapsed "moving time" for a figure that pauses between `holdStart` and
 * `holdEnd` (the 2:23b "stood still" reaction beat) — time simply does not
 * accumulate during the hold, so a figure frozen mid-route stays exactly
 * where it was when the hold began, then resumes from there. */
export function elapsedWithHold(
  t: number,
  startT: number,
  holdStart: number,
  holdEnd: number,
): number {
  if (t <= startT) return 0;
  if (t <= holdStart) return t - startT;
  if (t <= holdEnd) return holdStart - startT;
  return holdStart - startT + (t - holdEnd);
}

// ---------------------------------------------------------------------------
// The champions' contest (2:14-16): twelve paired grapple/fall cycles
// sharing one function, parameterized by a small per-pair time offset so the
// pairs read as "twelve times over" rather than one synchronized flash.
// Standard mode plays the grip gesture and a gradual mutual fall; reduced
// keeps the grip gesture (the pairing is shown) but elides the fall's
// duration to a near-instant cut (fallDuration) — never the fact of it.

export const CHAMPION_SPAWN_DUR = 3;
const CHAMPION_GRIP_RAMP = 1.1;
const CHAMPION_GRIP_HOLD = 2.1;

export interface ChampionPose {
  /** 0..1 scale-in as the pair steps onto the champions' ground (b-proposal). */
  appear: number;
  /** 0..1 the head-grasp gesture blend. */
  grip: number;
  /** 0..1 the mutual collapse. */
  fallen: number;
}

export function championPose(t: number, pairOffset: number, mode: ViolenceMode): ChampionPose {
  const appear = smoothstep((t - T_PROPOSAL) / CHAMPION_SPAWN_DUR);
  const local = t - T_CHAMPIONS - pairOffset;
  if (local < 0) return { appear, grip: 0, fallen: 0 };

  const grip =
    smoothstep(local / CHAMPION_GRIP_RAMP) *
    (1 - smoothstep((local - CHAMPION_GRIP_HOLD) / CHAMPION_GRIP_RAMP));
  const fallen = smoothstep((local - CHAMPION_GRIP_HOLD) / fallDuration(mode, 4));
  return { appear: clamp01(appear), grip: Math.max(0, grip), fallen };
}

// ---------------------------------------------------------------------------
// Lighting: b-pursuit-continues (2:24) states sundown directly — "use it
// directly, not a placeholder hour" per the brief. Dusk ramps from a little
// before that beat and holds through the close.

const DUSK_START = T_PURSUIT_CONTINUES - 10;
const DUSK_END = T_CASUALTY_COUNT;

/** 0 (full day) .. 1 (dusk), ramping across the pursuit-continues/standoff/
 * plea/halt beats and holding through the casualty-count and close cards. */
export function duskProgress(t: number): number {
  return smoothstep((t - DUSK_START) / (DUSK_END - DUSK_START));
}

// ---------------------------------------------------------------------------
// Abner's flight and the death of Asahel (2:18-23): a single shared curve
// fraction so the two men read as converging on, then sharing, the same
// ground at the moment of the kill.

/** Curve fraction 0..ASAHEL_DEATH_U for either Abner or the pursuing Asahel,
 * both converging on the same point at `T_ASAHEL_DEATH`. */
export function chaseU(t: number): number {
  if (t < T_BATTLE_SPREADS) return 0;
  if (t >= T_ASAHEL_DEATH) return ASAHEL_DEATH_U;
  return smoothstep((t - T_BATTLE_SPREADS) / (T_ASAHEL_DEATH - T_BATTLE_SPREADS)) * ASAHEL_DEATH_U;
}

export interface AbnerPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 the two on-record warnings (2:21-22) — a turn-back/raised-hand
   * gesture blend, identical in both modes (the brief's emotional pivot). */
  warn: number;
  /** 0..1 the spear-grip reversal — the one specific, legible, non-graphic
   * detail 2:23 gives (the butt end, not the point). Identical in both
   * modes; only the strike/fall that follows differs by `fallDuration`. */
  reversedGrip: number;
  /** 0..1 the brief thrust gesture itself — a whole-body/weapon extension,
   * never contact or wound geometry. */
  strike: number;
  /** 0..1 the plea gesture at the hill of Ammah (2:26). */
  plea: number;
}

const ABNER_HILL_SETTLE = 0.88;
/** Abner's own position at the hill — a little forward of the rallying
 * band's center, toward the pursuers he is pleading with. */
const ABNER_HILL_POS: [number, number] = [AMMAH_HILL_CENTER[0] - 14, AMMAH_HILL_CENTER[1] + 10];

export function abnerPose(t: number, mode: ViolenceMode): AbnerPose {
  const warn = Math.max(pulse(t, T_ABNER_WARNS + 5, 3.4), pulse(t, T_ABNER_WARNS + 15, 3.4));

  const strikeStart = T_ASAHEL_DEATH;
  const strikeDur = fallDuration(mode, 2.4);
  const reversedGrip = smoothstep((t - (T_ABNER_WARNS + 17)) / 2);
  const strike = clamp01(
    smoothstep((t - strikeStart) / strikeDur) *
      (1 - smoothstep((t - (strikeStart + strikeDur + 1)) / 1.2)),
  );

  if (t < T_PURSUIT_CONTINUES) {
    const u = chaseU(t);
    const p = pursuitPointAt(u);
    return { x: p.x, z: p.z, yaw: p.yaw, warn, reversedGrip, strike, plea: 0 };
  }

  if (t < T_STANDOFF) {
    const u = lerp(
      ASAHEL_DEATH_U,
      1,
      smoothstep((t - T_PURSUIT_CONTINUES) / (T_STANDOFF - T_PURSUIT_CONTINUES)),
    );
    const { x, z } = curveThenSettle(u, ABNER_HILL_SETTLE, ABNER_HILL_POS);
    const p = pursuitPointAt(Math.min(u, ABNER_HILL_SETTLE));
    const yaw =
      u < ABNER_HILL_SETTLE
        ? p.yaw
        : yawToward(x, z, ABNER_HILL_POS[0] + 40, ABNER_HILL_POS[1] + 10);
    return { x, z, yaw, warn: 0, reversedGrip: 0, strike: 0, plea: 0 };
  }

  const plea = smoothstep((t - T_ABNER_PLEA) / 3) * (1 - smoothstep((t - T_JOAB_HALTS) / 3));
  const yaw = yawToward(
    ABNER_HILL_POS[0],
    ABNER_HILL_POS[1],
    ABNER_HILL_POS[0] + 40,
    ABNER_HILL_POS[1] + 10,
  );
  return {
    x: ABNER_HILL_POS[0],
    z: ABNER_HILL_POS[1],
    yaw,
    warn: 0,
    reversedGrip: 0,
    strike: 0,
    plea,
  };
}

export interface AsahelPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 running .. 1 fallen and still. */
  fallen: number;
}

export function asahelPose(t: number, mode: ViolenceMode): AsahelPose {
  const u = chaseU(t);
  const p = pursuitPointAt(u);
  const strikeStart = T_ASAHEL_DEATH;
  const fallen = smoothstep((t - strikeStart) / fallDuration(mode, 3.5));
  return { x: p.x, z: p.z, yaw: p.yaw, fallen };
}

// ---------------------------------------------------------------------------
// Joab and Abishai's continued pursuit (2:24) — a slower, later-starting
// convergence on the same route, arriving at the hill's foot (not the
// hilltop itself — the brief's deliberate visual irony) by the standoff.

const JOAB_START_T = T_BATTLE_SPREADS + 12;
const JOAB_ARRIVE_DEATH_POINT_T = T_PURSUIT_CONTINUES;
export const AMMAH_FOOT_SETTLE = 0.86;

export interface PursuerPose {
  x: number;
  z: number;
  yaw: number;
}

/** Shared curve-fraction schedule for Joab/Abishai: reaches the point where
 * Asahel fell right as `b-pursuit-continues` begins (2:23c/2:24's own
 * sequence), then continues to the hill's foot by the standoff. */
export function joabAbishaiU(t: number): number {
  if (t < JOAB_START_T) return 0;
  if (t < JOAB_ARRIVE_DEATH_POINT_T) {
    return (
      smoothstep((t - JOAB_START_T) / (JOAB_ARRIVE_DEATH_POINT_T - JOAB_START_T)) * ASAHEL_DEATH_U
    );
  }
  if (t < T_STANDOFF) {
    return lerp(
      ASAHEL_DEATH_U,
      1,
      smoothstep((t - JOAB_ARRIVE_DEATH_POINT_T) / (T_STANDOFF - JOAB_ARRIVE_DEATH_POINT_T)),
    );
  }
  return 1;
}

/** `lateralOffset` (meters, perpendicular-ish) keeps Joab and Abishai from
 * literally overlapping while sharing the same schedule. */
export function pursuerPrincipalPose(
  t: number,
  lateralOffset: number,
  target: [number, number],
): PursuerPose {
  const u = joabAbishaiU(t);
  const { x, z } = curveThenSettle(u, AMMAH_FOOT_SETTLE, target);
  const p = pursuitPointAt(Math.min(u, AMMAH_FOOT_SETTLE));
  const yaw =
    u < AMMAH_FOOT_SETTLE ? p.yaw : yawToward(x, z, AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1]);
  return { x: x + lateralOffset, z, yaw };
}

// ---------------------------------------------------------------------------
// Contingent figure roles/poses. Role assignment (which figures fall, join
// the rallying band, scatter, or pursue) lives in the component files
// (AbnerContingent.tsx, JoabContingent.tsx), mirroring gilboa-battle's
// buildRoutFigures/buildDefenderFigures convention; this file holds only the
// pure per-figure pose function given an already-assigned role.

export interface ContingentPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  moving: boolean;
}

export type AbnerRole = 'falls' | 'band' | 'scatter';

export interface AbnerFigureParams {
  role: AbnerRole;
  bank: [number, number, number]; // x, z, yaw
  fallDelay: number;
  pursuitDelay: number;
  scatterTargetU: number;
  settleTarget: [number, number];
}

const ABNER_ROUT_FALL_WINDOW = 5;
const ABNER_BAND_TREK_DUR = 96;
const ABNER_SCATTER_TREK_DUR = 42;

/** Abner's wider Israel/Benjamin contingent: some fall in the rout
 * (b-battle-spreads), some scatter partway down the pursuit route and stop,
 * and the rallying-band subset treks all the way to the hill of Ammah,
 * settling into an individual slot there (2:17, 2:25). */
export function abnerFigurePose(
  t: number,
  fig: AbnerFigureParams,
  mode: ViolenceMode,
): ContingentPose {
  const [bx, bz, byaw] = fig.bank;
  if (t < T_BATTLE_SPREADS) {
    return { x: bx, z: bz, yaw: byaw, fallen: 0, moving: false };
  }

  if (fig.role === 'falls') {
    const fallStart = T_BATTLE_SPREADS + fig.fallDelay;
    const fallen = smoothstep((t - fallStart) / fallDuration(mode, ABNER_ROUT_FALL_WINDOW));
    return { x: bx, z: bz, yaw: byaw, fallen, moving: false };
  }

  const startT = T_BATTLE_SPREADS + fig.pursuitDelay;
  if (fig.role === 'band') {
    const elapsed = Math.max(0, t - startT);
    const progress = smoothstep(elapsed / ABNER_BAND_TREK_DUR);
    const { x, z } = curveThenSettle(progress, ABNER_HILL_SETTLE, fig.settleTarget);
    const p = pursuitPointAt(Math.min(progress, ABNER_HILL_SETTLE));
    const yaw =
      progress < ABNER_HILL_SETTLE
        ? p.yaw
        : yawToward(x, z, AMMAH_HILL_CENTER[0] - 40, AMMAH_HILL_CENTER[1] + 20);
    return { x, z, yaw, fallen: 0, moving: progress < 1 };
  }

  // 'scatter': flees a shorter distance and stops, never reaching the hill.
  const progress = smoothstep((t - startT) / ABNER_SCATTER_TREK_DUR) * fig.scatterTargetU;
  const p = pursuitPointAt(progress);
  return { x: p.x, z: p.z, yaw: p.yaw, fallen: 0, moving: progress < fig.scatterTargetU * 0.98 };
}

export type JoabRole = 'stay' | 'pursue';

export interface JoabFigureParams {
  role: JoabRole;
  bank: [number, number, number];
  pursuitDelay: number;
  settleTarget: [number, number];
}

const JOAB_PURSUER_TREK_DUR = 66;
/** The 2:23b "stood still" hold window applied to the pursuing crowd
 * subset — the bystanders nearest Asahel when he falls. */
const BYSTANDER_HOLD_START = T_ASAHEL_DEATH;
const BYSTANDER_HOLD_END = T_ASAHEL_DEATH + 7;

/** Joab's wider Judah contingent: most stay near the pool/champions' ground
 * throughout; a pursuing subset follows the chase, pausing at the 2:23b
 * "stood still" moment before continuing to the hill's foot. */
export function joabFigurePose(t: number, fig: JoabFigureParams): ContingentPose {
  const [bx, bz, byaw] = fig.bank;
  if (fig.role === 'stay' || t < T_BATTLE_SPREADS) {
    return { x: bx, z: bz, yaw: byaw, fallen: 0, moving: false };
  }

  const startT = T_ASAHEL_PURSUIT + fig.pursuitDelay;
  const elapsed = elapsedWithHold(t, startT, BYSTANDER_HOLD_START, BYSTANDER_HOLD_END);
  const progress = smoothstep(elapsed / JOAB_PURSUER_TREK_DUR);
  const { x, z } = curveThenSettle(progress, AMMAH_FOOT_SETTLE, fig.settleTarget);
  const p = pursuitPointAt(Math.min(progress, AMMAH_FOOT_SETTLE));
  const yaw =
    progress < AMMAH_FOOT_SETTLE
      ? p.yaw
      : yawToward(x, z, AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1]);
  const isHeld = t >= BYSTANDER_HOLD_START && t < BYSTANDER_HOLD_END && t >= startT;
  return { x, z, yaw, fallen: 0, moving: progress < 1 && !isHeld };
}
