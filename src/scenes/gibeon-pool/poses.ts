import type { ViolenceMode } from '../../state/store';
import {
  ABISHAI_POOL_POS,
  ABNER_POOL_POS,
  AMMAH_PLEA_POS,
  AMMAH_RALLY_POS,
  ASAHEL_DEATH_U,
  ASAHEL_POOL_POS,
  BATTLE_SPREAD_CENTER,
  CHAMPIONS_MEET_Z,
  JOAB_POOL_POS,
  PURSUIT_CURVE,
  samplePath,
  type ChampionPairSlot,
  type FigureSlot,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for gibeon-pool (ADR-007
 * convention, mirroring gilboa-battle/ziklag-lament's poses.ts). Beat times
 * mirror `src/data/scenes.ts`'s `gibeon-pool` entry exactly (`b-context`
 * through `b-close`) — see docs/design/gibeon-pool-brief.md, "Camera /
 * observer experience" for the standard/reduced treatment table this file
 * implements.
 *
 * ADR-009: one choreography, two treatments; reduced never changes the
 * narrative fact or a figure's final resting pose, only how gradually the
 * transition to it is shown. No function here ever produces wound, blood,
 * or dismemberment geometry — "fallen" is only ever a body-orientation/
 * collapse transform (asset-figure-fallen), matching every prior scene.
 *
 * `b-asahel-death` (T_ASAHEL_DEATH) is the load-bearing beat: Abner halts
 * and the text's one specific, legible, non-graphic detail — the reversed
 * spear grip — is shown as a gesture only (`abnerPose`'s `strike` field);
 * Asahel's collapse is a silhouette/orientation transform, never a wound;
 * the "stood still" reaction (2:23b) is carried by the pursuing Judah
 * contingent's own hold-plateau in `contingentFigurePose`, not a scripted
 * close-up replay.
 */

export const T_CONTEXT = 0;
export const T_ARRIVAL = 14;
export const T_PROPOSAL = 34;
export const T_CHAMPIONS = 50;
export const T_BATTLE_SPREADS = 78;
export const T_ASAHEL_PURSUIT = 100;
export const T_ABNER_WARNS = 118;
export const T_ASAHEL_DEATH = 134;
export const T_PURSUIT_CONTINUES = 150;
export const T_STANDOFF = 168;
export const T_ABNER_PLEA = 182;
export const T_JOAB_HALTS = 196;
export const T_CASUALTY_COUNT = 212;
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

/** A short symmetric rise/fall pulse centered at `center`, 0 outside `±halfWidth`. */
function pulse(t: number, center: number, halfWidth: number): number {
  const d = Math.abs(t - center);
  if (d >= halfWidth) return 0;
  return smoothstep(1 - d / halfWidth);
}

/**
 * Duration (seconds) of an animated fall/collapse transition. Standard uses
 * the full, gradual duration; reduced elides the animation and cuts to the
 * resulting pose almost immediately — same convention as gilboa-battle/
 * ziklag-lament's poses.ts (ADR-009: "reduction abstracts depiction, never
 * facts").
 */
export function fallDuration(mode: ViolenceMode, standardDur: number): number {
  return mode === 'standard' ? standardDur : Math.min(1, standardDur * 0.12);
}

// ---------------------------------------------------------------------------
// Generic keyed-scalar interpolation (a scalar sibling of ziklag-lament's
// BeatLighting keyframe technique) — used to blend a figure's progress `u`
// along `PURSUIT_CURVE` across several beat-anchored keys, including a
// held plateau (two adjacent keys sharing the same `u`) for the "stood
// still" reaction beat.

export interface UKey {
  t: number;
  u: number;
}

export function sampleU(t: number, keys: UKey[]): number {
  let i = 0;
  while (i < keys.length - 1 && t >= keys[i + 1].t) i++;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const span = b.t - a.t || 1;
  const f = smoothstep((t - a.t) / span);
  return lerp(a.u, b.u, f);
}

// ---------------------------------------------------------------------------
// The champions' contest (2:14-16, `b-champions`): 12 paired grapple/fall
// cycles sharing this one function, parameterized by pair offset — the
// project's cheapest and most reusable new choreography (brief, "Performance
// target").

export interface ChampionPose {
  benjaminX: number;
  benjaminZ: number;
  benjaminYaw: number;
  judahX: number;
  judahZ: number;
  judahYaw: number;
  /** 0..1 the head-grasp lean-in gesture, both figures — legible without
   * blade-entry detail (brief: "the head-grasp gesture"). */
  grapple: number;
  /** 0..1 the mutual collapse. Identical value for both paired figures. */
  fallen: number;
}

export function championPairPose(
  t: number,
  mode: ViolenceMode,
  pair: ChampionPairSlot,
): ChampionPose {
  const approach = smoothstep((t - T_PROPOSAL) / (T_CHAMPIONS - T_PROPOSAL));
  const benjaminZ = lerp(pair.benjaminStart.z, CHAMPIONS_MEET_Z, approach);
  const judahZ = lerp(pair.judahStart.z, CHAMPIONS_MEET_Z, approach);

  const grapple = smoothstep((t - T_CHAMPIONS) / 3);
  const fallStart = T_CHAMPIONS + 3;
  const fallen = smoothstep((t - fallStart) / fallDuration(mode, 5));

  return {
    benjaminX: pair.meetX,
    benjaminZ,
    benjaminYaw: pair.benjaminStart.yaw,
    judahX: pair.meetX,
    judahZ,
    judahYaw: pair.judahStart.yaw,
    grapple,
    fallen,
  };
}

// ---------------------------------------------------------------------------
// The wider contingents (2:17 onward, `b-battle-spreads` through
// `b-joab-halts`): pool-seated -> battle-spread -> (a subset) the pursuit/
// hill of Ammah. See docs/design/gibeon-pool-brief.md's "Scale assumptions":
// the hilltop rallying band is drawn from Abner's existing contingent, not
// additive.

export interface ContingentFigureState {
  side: 'benjamin' | 'judah';
  bank: FigureSlot;
  spread: FigureSlot;
  falls: boolean;
  fallDelay: number;
  /** Joins the pursuit past the battle-spread beat (Judah: the surviving
   * pursuing contingent; Benjamin: only the tagged hill-of-Ammah rally
   * band, per the brief's "drawn from, not additive to"). */
  continues: boolean;
  /** Meaningful only when `continues` is true. */
  destSlot: FigureSlot;
  spreadArriveStagger: number;
  pursuitStagger: number;
  scale: number;
}

const SPREAD_DUR = 14;

export interface ContingentPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
}

/** Position/orientation for one wider-contingent figure at scene time `t`.
 * Exported for unit tests. */
export function contingentFigurePose(
  t: number,
  fig: ContingentFigureState,
  mode: ViolenceMode,
): ContingentPose {
  if (t < T_BATTLE_SPREADS) {
    return { x: fig.bank.x, z: fig.bank.z, yaw: fig.bank.yaw, fallen: 0 };
  }

  const arriveAt = T_BATTLE_SPREADS + fig.spreadArriveStagger;
  if (t < arriveAt) {
    return { x: fig.bank.x, z: fig.bank.z, yaw: fig.bank.yaw, fallen: 0 };
  }

  const moveP = smoothstep((t - arriveAt) / SPREAD_DUR);
  const x0 = lerp(fig.bank.x, fig.spread.x, moveP);
  const z0 = lerp(fig.bank.z, fig.spread.z, moveP);

  if (fig.falls) {
    const fallStart = arriveAt + SPREAD_DUR * 0.6 + fig.fallDelay;
    if (t < fallStart) return { x: x0, z: z0, yaw: fig.spread.yaw, fallen: 0 };
    const fallen = smoothstep((t - fallStart) / fallDuration(mode, 5));
    return { x: fig.spread.x, z: fig.spread.z, yaw: fig.spread.yaw, fallen };
  }

  if (t < arriveAt + SPREAD_DUR || !fig.continues) {
    return { x: x0, z: z0, yaw: fig.spread.yaw, fallen: 0 };
  }

  if (fig.side === 'judah') {
    const startT = arriveAt + SPREAD_DUR + fig.pursuitStagger;
    const reachDeathT = Math.max(startT + 1, T_ASAHEL_DEATH + 2 + fig.pursuitStagger * 0.3);
    const holdEndT = reachDeathT + 8;
    const standoffT = Math.max(holdEndT + 1, T_STANDOFF);
    const u = sampleU(t, [
      { t: startT, u: 0 },
      { t: reachDeathT, u: ASAHEL_DEATH_U },
      { t: holdEndT, u: ASAHEL_DEATH_U },
      { t: standoffT, u: 1 },
    ]);
    if (u < 0.92) {
      const p = samplePath(PURSUIT_CURVE, u);
      return { x: p.x, z: p.z, yaw: p.yaw, fallen: 0 };
    }
    const p1 = samplePath(PURSUIT_CURVE, 1);
    const f = smoothstep((u - 0.92) / 0.08);
    return {
      x: lerp(p1.x, fig.destSlot.x, f),
      z: lerp(p1.z, fig.destSlot.z, f),
      yaw: fig.destSlot.yaw,
      fallen: 0,
    };
  }

  // Benjamin rally-band figure: along the curve to its foot, then up onto
  // the hill to its individual rally slot.
  if (t < T_PURSUIT_CONTINUES) {
    const u = smoothstep(
      (t - arriveAt - SPREAD_DUR) / (T_PURSUIT_CONTINUES - arriveAt - SPREAD_DUR),
    );
    const p = samplePath(PURSUIT_CURVE, u);
    return { x: p.x, z: p.z, yaw: p.yaw, fallen: 0 };
  }
  const p1 = samplePath(PURSUIT_CURVE, 1);
  const f = smoothstep((t - T_PURSUIT_CONTINUES) / (T_STANDOFF - T_PURSUIT_CONTINUES));
  return {
    x: lerp(p1.x, fig.destSlot.x, f),
    z: lerp(p1.z, fig.destSlot.z, f),
    yaw: fig.destSlot.yaw,
    fallen: 0,
  };
}

// ---------------------------------------------------------------------------
// Named principals: Abner, Joab, Abishai, Asahel. Ish-bosheth is referenced
// only (2:8-10, `b-context`) and is never staged at Gibeon, per the brief.

export interface PrincipalPose {
  x: number;
  z: number;
  yaw: number;
}

export interface AbnerPose extends PrincipalPose {
  /** 0..1 turning back to warn Asahel — two pulses (2:21-22), gesture only. */
  warn: number;
  /** 0..1 the reversed-spear-grip strike gesture (2:23) — orientation only,
   * no blade-entry/wound geometry in either mode. */
  strike: number;
  /** 0..1 the plea's held posture (2:26), rising through b-abner-plea and
   * settling after Joab's halt. */
  plea: number;
}

/** Abner: pool -> flees south as the battle spreads -> halts and kills
 * Asahel (2:23) -> continues to the hill of Ammah -> pleads for restraint. */
export function abnerPose(t: number): AbnerPose {
  if (t < T_BATTLE_SPREADS) {
    return {
      x: ABNER_POOL_POS[0],
      z: ABNER_POOL_POS[1],
      yaw: Math.PI / 2,
      warn: 0,
      strike: 0,
      plea: 0,
    };
  }

  if (t < T_ASAHEL_DEATH) {
    const u =
      ASAHEL_DEATH_U * smoothstep((t - T_BATTLE_SPREADS) / (T_ASAHEL_DEATH - T_BATTLE_SPREADS));
    const p = samplePath(PURSUIT_CURVE, u);
    const warn = Math.max(pulse(t, T_ABNER_WARNS - 3, 4), pulse(t, T_ABNER_WARNS + 5, 4));
    return { x: p.x, z: p.z, yaw: p.yaw, warn, strike: 0, plea: 0 };
  }

  const strikeEnd = T_ASAHEL_DEATH + 3;
  if (t < strikeEnd) {
    const deathPos = samplePath(PURSUIT_CURVE, ASAHEL_DEATH_U);
    const strike = smoothstep((t - T_ASAHEL_DEATH) / 1.2);
    const faceYaw = deathPos.yaw + Math.PI;
    return {
      x: deathPos.x,
      z: deathPos.z,
      yaw: lerp(deathPos.yaw, faceYaw, strike),
      warn: 0,
      strike,
      plea: 0,
    };
  }

  if (t < T_PURSUIT_CONTINUES) {
    const u = lerp(
      ASAHEL_DEATH_U,
      1,
      smoothstep((t - strikeEnd) / (T_PURSUIT_CONTINUES - strikeEnd)),
    );
    const p = samplePath(PURSUIT_CURVE, u);
    return { x: p.x, z: p.z, yaw: p.yaw, warn: 0, strike: 0, plea: 0 };
  }

  if (t < T_STANDOFF) {
    const end = samplePath(PURSUIT_CURVE, 1);
    const f = smoothstep((t - T_PURSUIT_CONTINUES) / (T_STANDOFF - T_PURSUIT_CONTINUES));
    return {
      x: lerp(end.x, AMMAH_RALLY_POS[0], f),
      z: lerp(end.z, AMMAH_RALLY_POS[1], f),
      yaw: Math.PI,
      warn: 0,
      strike: 0,
      plea: 0,
    };
  }

  const plea = smoothstep((t - T_ABNER_PLEA) / 2) * (1 - smoothstep((t - (T_JOAB_HALTS + 6)) / 4));
  if (t < T_ABNER_PLEA) {
    const f = smoothstep((t - T_STANDOFF) / (T_ABNER_PLEA - T_STANDOFF));
    return {
      x: lerp(AMMAH_RALLY_POS[0], AMMAH_PLEA_POS[0], f),
      z: lerp(AMMAH_RALLY_POS[1], AMMAH_PLEA_POS[1], f),
      yaw: Math.PI,
      warn: 0,
      strike: 0,
      plea,
    };
  }
  return { x: AMMAH_PLEA_POS[0], z: AMMAH_PLEA_POS[1], yaw: Math.PI, warn: 0, strike: 0, plea };
}

export interface AsahelPose extends PrincipalPose {
  /** 0..1 the collapse — a silhouette/orientation transform only, never a
   * wound. Reduced mode cuts to (near-)fully-fallen almost immediately. */
  fallen: number;
}

/** Asahel: pool -> peels off alone to chase Abner ("swift as a gazelle",
 * 2:18) -> closes the gap -> struck down at T_ASAHEL_DEATH, and stays. */
export function asahelPose(t: number, mode: ViolenceMode): AsahelPose {
  if (t < T_BATTLE_SPREADS) {
    return { x: ASAHEL_POOL_POS[0], z: ASAHEL_POOL_POS[1], yaw: -Math.PI / 2, fallen: 0 };
  }
  if (t < T_ASAHEL_PURSUIT) {
    const f = smoothstep((t - T_BATTLE_SPREADS) / (T_ASAHEL_PURSUIT - T_BATTLE_SPREADS));
    const x = lerp(ASAHEL_POOL_POS[0], 6, f);
    const z = lerp(ASAHEL_POOL_POS[1], BATTLE_SPREAD_CENTER[1], f);
    return { x, z, yaw: Math.PI, fallen: 0 };
  }

  // Reduced mode elides the visible strike: cut from the chase straight to
  // an already-fallen Asahel (brief's b-asahel-death reduced treatment).
  const strikeLead = mode === 'standard' ? 1.2 : 0;
  const collapseStart = T_ASAHEL_DEATH + strikeLead;
  if (t < collapseStart) {
    const u =
      ASAHEL_DEATH_U * smoothstep((t - T_ASAHEL_PURSUIT) / (T_ASAHEL_DEATH - T_ASAHEL_PURSUIT));
    const p = samplePath(PURSUIT_CURVE, u);
    return { x: p.x, z: p.z, yaw: p.yaw, fallen: 0 };
  }

  const deathPos = samplePath(PURSUIT_CURVE, ASAHEL_DEATH_U);
  const fallen = smoothstep((t - collapseStart) / fallDuration(mode, 4));
  return { x: deathPos.x, z: deathPos.z, yaw: deathPos.yaw, fallen };
}

/** Joab and Abishai: continue the pursuit toward the hill of Ammah,
 * arriving below the rallying Benjaminites (brief's deliberate visual
 * irony — the losing side holds the high ground). Both share this timing;
 * `lateralOffset` keeps them visually distinct, side by side. */
function pursuerPose(t: number, basePos: [number, number], lateralOffset: number): PrincipalPose {
  const startT = T_BATTLE_SPREADS + 20;
  if (t < startT) {
    return { x: basePos[0] + lateralOffset, z: basePos[1], yaw: -Math.PI / 2 };
  }
  const u = sampleU(t, [
    { t: startT, u: 0 },
    { t: T_ASAHEL_DEATH + 2, u: ASAHEL_DEATH_U },
    { t: T_ASAHEL_DEATH + 10, u: ASAHEL_DEATH_U },
    { t: T_STANDOFF, u: 1 },
  ]);
  const p = samplePath(PURSUIT_CURVE, u);
  return { x: p.x + lateralOffset, z: p.z, yaw: p.yaw };
}

export function joabPose(t: number): PrincipalPose {
  return pursuerPose(t, JOAB_POOL_POS, -3);
}

export function abishaiPose(t: number): PrincipalPose {
  return pursuerPose(t, ABISHAI_POOL_POS, 3);
}

/** Joab's trumpet-raise gesture (2:27-28) — a gesture/orientation change
 * only, identical in both violence modes (there is no violence in this
 * beat). */
export function joabTrumpetGesture(t: number): number {
  return pulse(t, T_JOAB_HALTS + 2, 4);
}
