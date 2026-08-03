import type { ViolenceMode } from '../../state/store';
import { DEATH_POINT, DEATH_ROUTE_U, pursuitPointAt, ROUTE_END_POINT } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for the pool of Gibeon (ADR-007
 * convention, mirroring gilboa-battle/poses.ts and jabesh-burial/poses.ts).
 * Beat times match `src/data/scenes.ts`'s `gibeon-pool` entry exactly
 * (`b-context` through `b-close`) — see docs/design/gibeon-pool-brief.md,
 * "Camera / observer experience", for the standard/reduced treatment table
 * this file implements.
 *
 * ADR-009: one choreography, two treatments. No function here ever produces
 * wound, blood, or dismemberment geometry; "fallen" is only ever a
 * body-orientation/collapse transform (`asset-figure-fallen`), and
 * `claim-asahel-death`'s precedent (documentary distance, the reversed-spear
 * grip shown as a gesture only, the "stood still" beat as a literal motion
 * freeze) is implemented in `abnerStrikePose`/`pursuitClock` below.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 14;
export const T_PROPOSAL = 34;
export const T_CHAMPIONS = 52;
export const T_BATTLE_SPREADS = 78;
export const T_ASAHEL_PURSUIT = 104;
export const T_ABNER_WARNS = 122;
export const T_ASAHEL_DEATH = 138;
export const T_PURSUIT_CONTINUES = 150;
export const T_STANDOFF = 166;
export const T_ABNER_PLEA = 182;
export const T_JOAB_HALTS = 196;
export const T_CASUALTY_COUNT = 210;
export const T_CLOSE = 226;
export const DURATION_SEC = 240;

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

/** Duration (seconds) of an animated fall/collapse transition — standard is
 * gradual, reduced elides the animation and cuts to the resulting pose
 * almost immediately (same eventual pose, reached sooner). */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// The "stood still" reaction beat (2:23b): a literal motion freeze, not a
// replay. Every pursuit-route position function below reads time through
// `pursuitClock` rather than raw `t`, so the whole pursuing cast — Abner,
// Asahel (already stationary), Joab, Abishai, and the rally/pursuing
// contingent figures — holds in place together for `STAND_STILL_DUR`
// seconds starting at the death beat, then resumes. Identical in both
// violence modes (the brief: "read through stillness/posture, not replay").

export const STAND_STILL_DUR = 7;

export function pursuitClock(t: number): number {
  if (t <= T_ASAHEL_DEATH) return t;
  if (t <= T_ASAHEL_DEATH + STAND_STILL_DUR) return T_ASAHEL_DEATH;
  return t - STAND_STILL_DUR;
}

const BANK_TO_SPREAD_DUR = 9;
const ARRIVE_SETTLE_DUR = 3;

/** Clock-time (post-hold) target for the hill/standoff arrival — a module
 * constant since `T_STANDOFF` is fixed. */
const STANDOFF_ARRIVE_CLOCK = pursuitClock(T_STANDOFF);
/** Abner himself arrives slightly ahead of the hilltop band settling. */
const ABNER_HILL_ARRIVE_CLOCK = pursuitClock(160);

function travelRouteAndSettle(
  ct: number,
  routeStart: number,
  arriveClock: number,
  slot: [number, number],
): { x: number; z: number; yaw: number; moving: boolean } {
  const progress = clamp01((ct - routeStart) / Math.max(0.001, arriveClock - routeStart));
  if (progress < 1) {
    const pt = pursuitPointAt(progress);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, moving: true };
  }
  const settle = smoothstep((ct - arriveClock) / ARRIVE_SETTLE_DUR);
  // u=1 is a fixed point on the curve — reuse the module-scope constant
  // rather than reallocating it (two new THREE.Vector3s) every frame per
  // settling figure (jabesh-burial c5aac8f hoisting precedent).
  return {
    x: lerp(ROUTE_END_POINT.x, slot[0], settle),
    z: lerp(ROUTE_END_POINT.z, slot[1], settle),
    yaw: ROUTE_END_POINT.yaw,
    moving: settle < 1,
  };
}

// ---------------------------------------------------------------------------
// The champions' contest (b-champions, 2:14-16): twelve paired grapple/fall
// cycles sharing this one function, parameterized by `pairOffset` (a small
// per-pair stagger). Standard shows the approach/grip, then a documentary,
// distance-held mutual fall; reduced shows the pairing but elides the fall —
// cutting straight to all twenty-four fallen and still (brief table).

const CHAMPION_GRAPPLE_LEAD_SEC = 4;
const CHAMPION_FALL_STANDARD_DUR = 5;

export interface ChampionPose {
  /** 0 apart .. 1 fully approached/gripped (met at the pair's midpoint). */
  approach: number;
  /** 0 standing .. 1 fallen — a collapse transform only, never wound geometry. */
  fallen: number;
}

export function championPairPose(t: number, mode: ViolenceMode, pairOffset: number): ChampionPose {
  const start = T_CHAMPIONS + pairOffset;
  const approach = smoothstep((t - start) / CHAMPION_GRAPPLE_LEAD_SEC);
  const fallStart = start + CHAMPION_GRAPPLE_LEAD_SEC;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, CHAMPION_FALL_STANDARD_DUR));
  return { approach, fallen };
}

// ---------------------------------------------------------------------------
// The two wider contingents (b-battle-spreads onward): every generic figure
// starts at its bank slot, walks to its battle-spread slot once the contest
// ignites the wider clash, then either falls (documentary, a minority — read
// as the disproportion 2:30-31 states in text, never a literal ratio of it),
// holds its ground, or continues along the pursuit route as part of the
// rallying/pursuing subset (`claim-gibeon-battle-scale`).

export type ContingentSide = 'abner' | 'joab';
export type ContingentRole = 'falls' | 'scatter' | 'rally' | 'pursue' | 'hold';

export interface ContingentFigureParams {
  side: ContingentSide;
  role: ContingentRole;
  bank: [number, number];
  spread: [number, number];
  arriveDelay: number;
  fallDelay: number;
  /** 'scatter' only: how far along the pursuit route this figure gets before fading. */
  scatterTargetU: number;
  scatterFadeDelay: number;
  /** 'rally' | 'pursue' only: per-figure stagger on when the route leg begins/ends. */
  routeDelay: number;
  routeArriveDelay: number;
  /** 'rally' | 'pursue' only: the hilltop or hill-base slot this figure settles into. */
  finalSlot?: [number, number];
}

export interface ContingentPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
  moving: boolean;
}

function bankYaw(side: ContingentSide): number {
  return side === 'abner' ? 0 : Math.PI;
}

export function contingentFigurePose(
  t: number,
  fig: ContingentFigureParams,
  mode: ViolenceMode,
): ContingentPose {
  const moveStart = T_BATTLE_SPREADS + fig.arriveDelay;
  if (t < moveStart) {
    return {
      x: fig.bank[0],
      z: fig.bank[1],
      yaw: bankYaw(fig.side),
      fallen: 0,
      visible: true,
      moving: false,
    };
  }

  const moveEnd = moveStart + BANK_TO_SPREAD_DUR;
  if (t < moveEnd) {
    const p = smoothstep((t - moveStart) / BANK_TO_SPREAD_DUR);
    const yaw = Math.atan2(fig.spread[0] - fig.bank[0], fig.spread[1] - fig.bank[1]);
    return {
      x: lerp(fig.bank[0], fig.spread[0], p),
      z: lerp(fig.bank[1], fig.spread[1], p),
      yaw,
      fallen: 0,
      visible: true,
      moving: true,
    };
  }

  if (fig.role === 'falls') {
    // b-battle-spreads' own standard/reduced split (distinct from the
    // champions'/Asahel's "same final pose, faster transition" convention):
    // standard shows a documentary, gradual collapse that stays fallen;
    // reduced elides the fall entirely and reads only by the crowd thinning
    // — the figure fades from the scene instead of being shown fallen
    // (brief: "individual falls are elided, read only by the crowd
    // thinning"), mirroring gilboa-battle's `routFigurePose` reduced-mode
    // drain.
    const fallStart = moveEnd + fig.fallDelay;
    if (mode === 'standard') {
      const fallen = smoothstep((t - fallStart) / fallDuration(mode, 5));
      return {
        x: fig.spread[0],
        z: fig.spread[1],
        yaw: bankYaw(fig.side),
        fallen,
        visible: true,
        moving: false,
      };
    }
    const drain = smoothstep((t - fallStart) / 3.5);
    return {
      x: fig.spread[0],
      z: fig.spread[1],
      yaw: bankYaw(fig.side),
      fallen: 0,
      visible: drain < 0.97,
      moving: false,
    };
  }

  if (fig.role === 'hold') {
    return {
      x: fig.spread[0],
      z: fig.spread[1],
      yaw: bankYaw(fig.side),
      fallen: 0,
      visible: true,
      moving: false,
    };
  }

  const routeStart = T_ASAHEL_PURSUIT + fig.routeDelay;
  if (t < routeStart) {
    return {
      x: fig.spread[0],
      z: fig.spread[1],
      yaw: bankYaw(fig.side),
      fallen: 0,
      visible: true,
      moving: false,
    };
  }

  const ct = pursuitClock(t);

  if (fig.role === 'scatter') {
    // Disperses partway along the retreat, then fades from the scene — a
    // dropout, never a depicted death (the 360 casualty figure is text-only,
    // per the brief; this is dispersal, not a rendered corpse).
    const targetClock = STANDOFF_ARRIVE_CLOCK * 0.55 + fig.routeArriveDelay;
    const progress = clamp01((ct - routeStart) / Math.max(0.001, targetClock - routeStart));
    const pt = pursuitPointAt(progress * fig.scatterTargetU);
    const arrived = progress >= 0.999;
    const fadeStart = targetClock + fig.scatterFadeDelay;
    const fade = arrived ? smoothstep((ct - fadeStart) / 4) : 0;
    return { x: pt.x, z: pt.z, yaw: pt.yaw, fallen: 0, visible: fade < 0.97, moving: !arrived };
  }

  // 'rally' (Abner's side) | 'pursue' (Joab's side): travel the full route,
  // then settle into the hilltop/hill-base slot. Every figure of this role
  // always has `finalSlot` set (see `buildContingentFigures`); the u=1
  // fallback below reuses the hoisted constant rather than recomputing an
  // unused curve point every frame (jabesh-burial c5aac8f precedent).
  const arriveClock = STANDOFF_ARRIVE_CLOCK + fig.routeArriveDelay;
  const slot: [number, number] = fig.finalSlot ?? [ROUTE_END_POINT.x, ROUTE_END_POINT.z];
  const travel = travelRouteAndSettle(ct, routeStart, arriveClock, slot);
  return {
    x: travel.x,
    z: travel.z,
    yaw: travel.yaw,
    fallen: 0,
    visible: true,
    moving: travel.moving,
  };
}

// ---------------------------------------------------------------------------
// Lighting: 2:24 states the one lighting detail this scene gets directly —
// "the sun was going down" as Joab and Abishai continue the pursuit. Every
// other beat's hour is an unstated, disclosed placeholder (a fixed rig, per
// the brief). `duskBlend` ramps the rig from its daytime state to a warmer,
// lower-angle dusk state across `b-pursuit-continues` through `b-standoff`,
// then holds — the rest of the scene (the plea, the halt, the casualty and
// closing cards) stays at that same evening light.

export function duskBlend(t: number): number {
  return smoothstep((t - T_PURSUIT_CONTINUES) / (T_STANDOFF - T_PURSUIT_CONTINUES));
}

// ---------------------------------------------------------------------------
// Named principals: Abner, Asahel, Joab, Abishai. Ish-bosheth is referenced
// only (2:8-10) and never staged at Gibeon, per the brief.

export interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  visible: boolean;
}

interface PrincipalBankSpec {
  bank: [number, number];
  spread: [number, number];
}

function principalBankStage(t: number, spec: PrincipalBankSpec): PrincipalPose | null {
  const moveStart = T_BATTLE_SPREADS;
  const moveEnd = moveStart + BANK_TO_SPREAD_DUR;
  if (t < moveStart) {
    return { x: spec.bank[0], z: spec.bank[1], yaw: 0, fallen: 0, visible: true };
  }
  if (t < moveEnd) {
    const p = smoothstep((t - moveStart) / BANK_TO_SPREAD_DUR);
    return {
      x: lerp(spec.bank[0], spec.spread[0], p),
      z: lerp(spec.bank[1], spec.spread[1], p),
      yaw: 0,
      fallen: 0,
      visible: true,
    };
  }
  return null;
}

/**
 * Abner: pool bank -> the spread battlefield -> flees the pursuit route,
 * halting exactly at the death point from `T_ABNER_WARNS` through the
 * held reaction beat, then on to the hill of Ammah to rally his band and
 * deliver the plea (2:26). Staged as reluctant throughout — never a hunter.
 */
export function abnerPrincipalPose(
  t: number,
  spec: PrincipalBankSpec & { rallySlot: [number, number] },
): PrincipalPose {
  const bankStage = principalBankStage(t, spec);
  if (bankStage) return bankStage;

  if (t < T_ASAHEL_PURSUIT) {
    return { x: spec.spread[0], z: spec.spread[1], yaw: 0, fallen: 0, visible: true };
  }

  const ct = pursuitClock(t);
  if (ct <= T_ABNER_WARNS) {
    const p = smoothstep((ct - T_ASAHEL_PURSUIT) / (T_ABNER_WARNS - T_ASAHEL_PURSUIT));
    const pt = pursuitPointAt(p * DEATH_ROUTE_U);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, fallen: 0, visible: true };
  }
  if (ct <= T_ASAHEL_DEATH) {
    // Halted at the death point through the two warnings and the strike
    // itself — turned back to face Asahel, not fleeing further. DEATH_POINT
    // is a hoisted constant (DEATH_ROUTE_U never varies here), avoiding a
    // repeated curve allocation every frame for the whole hold (jabesh-burial
    // c5aac8f precedent).
    const pt = DEATH_POINT;
    return { x: pt.x, z: pt.z, yaw: pt.yaw + Math.PI, fallen: 0, visible: true };
  }

  const travel = travelRouteAndSettle(ct, T_ASAHEL_DEATH, ABNER_HILL_ARRIVE_CLOCK, spec.rallySlot);
  return { x: travel.x, z: travel.z, yaw: travel.yaw, fallen: 0, visible: true };
}

/**
 * Asahel: pool bank -> the spread battlefield -> breaks away alone to chase
 * Abner ("swift as a gazelle," 2:18), reaching the death point exactly as
 * Abner's second warning lands, then falls at `T_ASAHEL_DEATH` and stays —
 * the project's first named-character-kills-named-character death.
 */
export function asahelPrincipalPose(
  t: number,
  mode: ViolenceMode,
  spec: PrincipalBankSpec,
): PrincipalPose {
  const bankStage = principalBankStage(t, spec);
  if (bankStage) return bankStage;

  if (t < T_ASAHEL_PURSUIT) {
    return { x: spec.spread[0], z: spec.spread[1], yaw: Math.PI, fallen: 0, visible: true };
  }
  if (t < T_ABNER_WARNS) {
    const p = smoothstep((t - T_ASAHEL_PURSUIT) / (T_ABNER_WARNS - T_ASAHEL_PURSUIT));
    const pt = pursuitPointAt(p * DEATH_ROUTE_U);
    return { x: pt.x, z: pt.z, yaw: pt.yaw, fallen: 0, visible: true };
  }
  // DEATH_POINT is a hoisted constant — Asahel stays here for the rest of
  // the scene, so this must not recompute the curve every frame forever
  // after the death beat (jabesh-burial c5aac8f precedent).
  const pt = DEATH_POINT;
  const fallen = smoothstep((t - T_ASAHEL_DEATH) / fallDuration(mode, 6));
  return { x: pt.x, z: pt.z, yaw: pt.yaw, fallen, visible: true };
}

/**
 * Joab and Abishai: pool bank -> the spread battlefield -> the pursuit,
 * arriving below the hill of Ammah (looking up at Abner's rallying band) by
 * the standoff. `arriveOffset` staggers Abishai very slightly behind Joab.
 */
export function joabAbishaiPose(
  t: number,
  spec: PrincipalBankSpec & { pursuerSlot: [number, number] },
  arriveOffset = 0,
): PrincipalPose {
  const bankStage = principalBankStage(t, spec);
  if (bankStage) return bankStage;

  if (t < T_ASAHEL_PURSUIT) {
    return { x: spec.spread[0], z: spec.spread[1], yaw: 0, fallen: 0, visible: true };
  }
  const ct = pursuitClock(t);
  const arriveClock = STANDOFF_ARRIVE_CLOCK + arriveOffset;
  const travel = travelRouteAndSettle(ct, T_ASAHEL_PURSUIT, arriveClock, spec.pursuerSlot);
  return { x: travel.x, z: travel.z, yaw: travel.yaw, fallen: 0, visible: true };
}

// ---------------------------------------------------------------------------
// Abner's strike (b-asahel-death, 2:23): the text's one specific, legible,
// non-graphic detail — the reversed spear grip — shown as a gesture only, no
// penetration/wound geometry in either mode. Reduced elides the strike
// gesture entirely ("cut from Abner turning to Asahel already fallen and
// still," per the brief) while the fact/method stays identical in caption
// text.

export interface AbnerStrikePose {
  /** 0..1 the two-warnings reluctance — a backward glance/half-turn, never a strike. */
  reluctanceTurn: number;
  /** 0..1 the spear flipped to its butt end, held only in standard mode. */
  reverseGrip: number;
  /** 0..1 the thrust extension itself, held only in standard mode. */
  strikeExtend: number;
}

export function abnerStrikePose(t: number, mode: ViolenceMode): AbnerStrikePose {
  const reluctanceIn = smoothstep((t - T_ABNER_WARNS) / 4);
  const reluctanceOut = smoothstep((t - (T_ASAHEL_DEATH - 1)) / 1);
  const reluctanceTurn = clamp01(reluctanceIn - reluctanceOut);

  if (mode === 'reduced') {
    return { reluctanceTurn, reverseGrip: 0, strikeExtend: 0 };
  }
  const windup = smoothstep((t - (T_ASAHEL_DEATH - 3)) / 2.4);
  const strike = smoothstep((t - T_ASAHEL_DEATH) / 0.7);
  return { reluctanceTurn, reverseGrip: Math.max(0, windup - strike), strikeExtend: strike };
}
