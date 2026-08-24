import * as THREE from 'three';
import type { ViolenceMode } from '../../state/store';
import {
  ADVANCE_ROUTE_CURVE,
  DAVID_INQUIRY_POS,
  ENGAGE_TWO_ROUTE_CURVE,
  FLANK_ROUTE_CURVE,
  RIM_EDGE,
} from './layout';

// Hoisted scratch vectors for per-frame curve sampling in `sampleCurvePose`
// (called once per figure per frame across David's force during every
// travel leg, most sustained during the phase-two flanking march — the
// brief's own "one real risk in this scene") — avoids allocating two new
// THREE.Vector3 instances per figure per frame, the tmpVec/tmpTan pattern
// established by ziklag/ReturningMen.tsx and ziklag-lament/poses.ts.
const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

/**
 * Pure, beat-driven pose/timing choreography for rephaim-valley (ADR-007
 * convention, mirroring hebron-gate/jerusalem-stronghold's poses.ts). Beat
 * times match `src/data/scenes.ts`'s `rephaim-valley` entry exactly
 * (`b-philistines-hear` through `b-close`) — see
 * docs/design/rephaim-valley-brief.md, "Camera / observer experience".
 *
 * Hard constraints carried here, load-bearing per the brief:
 * - **No fight-stance pose buckets anywhere.** Both engagements are
 *   formation movement — a line closing, a formation breaking, a population
 *   dispersing — never a modeled melee-clash cycle (contrast
 *   `gilboa-battle/poses.ts`'s `defenderClashPose`/`clashPhase01`). Falling
 *   is a whole-body collapse transform only, exactly like every other
 *   ADR-009 scene in this project.
 * - **The 5:24 sign is never visualized.** No function in this file (or any
 *   component that reads it) produces a wind effect, a light change, or any
 *   canopy motion keyed to `T_SOUND` — the wait beat is realized purely as
 *   an absence of motion (David's force already static; the grove's trees
 *   are static instanced geometry with no foliage-sway system in this
 *   engine to begin with, so there is nothing to freeze). See
 *   `claim-divine-sign-depiction`.
 * - **The Philistine population is one instanced group, repositioned, never
 *   doubled.** `philistinePose` below reuses the exact same
 *   `PHILISTINE_SPREAD_SLOTS` position for both phases (layout.ts) and gates
 *   visibility by time; there is no second, similar-looking slot set.
 */

export const T_HEAR = 0;
export const T_SPREAD = 14;
export const T_INQUIRY_1 = 30;
export const T_ENGAGE1 = 46;
export const T_PERAZIM = 70;
export const T_IMAGES = 84;
export const T_RETURN = 98;
export const T_INQUIRY_2 = 114;
export const T_CIRCLING = 128;
export const T_SOUND = 154;
export const T_ENGAGE2 = 170;
export const T_PURSUIT = 188;
export const T_CLOSE = 200;
export const DURATION_SEC = 210;

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

function facePerpendicular(tanX: number, tanZ: number, offset: number): [number, number] {
  const len = Math.hypot(tanX, tanZ) || 1;
  return [(-tanZ / len) * offset, (tanX / len) * offset];
}

// ---------------------------------------------------------------------------
// David's force (5:20a advance, 5:23b flanking march, 5:25a converging
// attack) — one shared route-following device reused across every leg,
// per the brief's "a single shared route curve with per-figure offsets"
// (the hebron-gate procession pattern). Each figure carries a fixed rim
// `restSlot` (its home position before/between legs), a small `holdOffset`
// (used by the small inquiry-group cluster to stand apart from the wider
// crowd's own slots without a second layout table), and a `laneOffset`
// (perpendicular spread while riding any curve).

export interface DavidForceFigureParams {
  restSlot: [number, number];
  holdOffset: [number, number];
  laneOffset: number;
}

export interface DavidForcePose {
  x: number;
  z: number;
  yaw: number;
}

const ENTRY_DUR = 5;
const ADV_TRAVEL_DUR = 12;
const CIRCLE_TRAVEL_DUR = 19;
const ENGAGE2_TRAVEL_DUR = 10;

const T_ADV_ENTRY_START = T_ENGAGE1;
const T_ADV_TRAVEL_START = T_ADV_ENTRY_START + ENTRY_DUR;
const T_ADV_TRAVEL_END = T_ADV_TRAVEL_START + ADV_TRAVEL_DUR;
/** Return travel begins during the card-only images beat, so the force is
 * already back at the rim by the time the Philistines are staged as
 * spreading again (`T_RETURN`) — the brief's "same default vantage". */
const T_RETURN_TRAVEL_START = T_IMAGES;
const T_RETURN_TRAVEL_END = T_RETURN_TRAVEL_START + ADV_TRAVEL_DUR;
const T_CIRCLE_ENTRY_START = T_CIRCLING;
const T_CIRCLE_TRAVEL_START = T_CIRCLE_ENTRY_START + ENTRY_DUR;
const T_CIRCLE_TRAVEL_END = T_CIRCLE_TRAVEL_START + CIRCLE_TRAVEL_DUR;
const T_ENGAGE2_ENTRY_START = T_ENGAGE2;
const T_ENGAGE2_TRAVEL_START = T_ENGAGE2_ENTRY_START + ENTRY_DUR;
const T_ENGAGE2_TRAVEL_END = T_ENGAGE2_TRAVEL_START + ENGAGE2_TRAVEL_DUR;

function sampleCurvePose(
  curve: THREE.CatmullRomCurve3,
  u: number,
  laneOffset: number,
): DavidForcePose {
  const uu = clamp01(u);
  curve.getPointAt(uu, tmpPos);
  curve.getTangentAt(Math.max(0.001, Math.min(0.999, uu)), tmpTan);
  const [ox, oz] = facePerpendicular(tmpTan.x, tmpTan.z, laneOffset);
  return { x: tmpPos.x + ox, z: tmpPos.z + oz, yaw: Math.atan2(tmpTan.x, tmpTan.z) };
}

function offsetPos(p: [number, number], o: [number, number]): [number, number] {
  return [p[0] + o[0], p[1] + o[1]];
}

/**
 * David's force across both phases: rim hold -> advance -> hold at the
 * closing line -> return to the rim -> rim hold -> flanking march -> hold
 * near the grove (the wait beat) -> converging attack -> hold. Every leg
 * rides `ADVANCE_ROUTE_CURVE`, `FLANK_ROUTE_CURVE`, or
 * `ENGAGE_TWO_ROUTE_CURVE` (layout.ts) with the figure's own `laneOffset` —
 * no per-figure independent pathing anywhere.
 */
export function davidsForcePose(t: number, fig: DavidForceFigureParams): DavidForcePose {
  const rest = offsetPos(fig.restSlot, fig.holdOffset);
  const edge = offsetPos(RIM_EDGE, fig.holdOffset);

  if (t < T_ADV_ENTRY_START) {
    return { x: rest[0], z: rest[1], yaw: yawToward(rest[0], rest[1], edge[0], edge[1]) };
  }
  if (t < T_ADV_TRAVEL_START) {
    const p = smoothstep((t - T_ADV_ENTRY_START) / ENTRY_DUR);
    return {
      x: lerp(rest[0], edge[0], p),
      z: lerp(rest[1], edge[1], p),
      yaw: yawToward(rest[0], rest[1], edge[0], edge[1]),
    };
  }
  if (t < T_ADV_TRAVEL_END) {
    const p = clamp01((t - T_ADV_TRAVEL_START) / ADV_TRAVEL_DUR);
    return sampleCurvePose(ADVANCE_ROUTE_CURVE, p, fig.laneOffset);
  }
  if (t < T_RETURN_TRAVEL_START) {
    return sampleCurvePose(ADVANCE_ROUTE_CURVE, 1, fig.laneOffset);
  }
  if (t < T_RETURN_TRAVEL_END) {
    const p = clamp01((t - T_RETURN_TRAVEL_START) / ADV_TRAVEL_DUR);
    return sampleCurvePose(ADVANCE_ROUTE_CURVE, 1 - p, fig.laneOffset);
  }
  if (t < T_CIRCLE_ENTRY_START) {
    return { x: rest[0], z: rest[1], yaw: yawToward(rest[0], rest[1], edge[0], edge[1]) };
  }
  if (t < T_CIRCLE_TRAVEL_START) {
    const p = smoothstep((t - T_CIRCLE_ENTRY_START) / ENTRY_DUR);
    return {
      x: lerp(rest[0], edge[0], p),
      z: lerp(rest[1], edge[1], p),
      yaw: yawToward(rest[0], rest[1], edge[0], edge[1]),
    };
  }
  if (t < T_CIRCLE_TRAVEL_END) {
    const p = clamp01((t - T_CIRCLE_TRAVEL_START) / CIRCLE_TRAVEL_DUR);
    return sampleCurvePose(FLANK_ROUTE_CURVE, p, fig.laneOffset);
  }
  if (t < T_ENGAGE2_ENTRY_START) {
    return sampleCurvePose(FLANK_ROUTE_CURVE, 1, fig.laneOffset);
  }
  if (t < T_ENGAGE2_TRAVEL_START) {
    const from = sampleCurvePose(FLANK_ROUTE_CURVE, 1, fig.laneOffset);
    const to = sampleCurvePose(ENGAGE_TWO_ROUTE_CURVE, 0, fig.laneOffset);
    const p = smoothstep((t - T_ENGAGE2_ENTRY_START) / ENTRY_DUR);
    return { x: lerp(from.x, to.x, p), z: lerp(from.z, to.z, p), yaw: to.yaw };
  }
  if (t < T_ENGAGE2_TRAVEL_END) {
    const p = clamp01((t - T_ENGAGE2_TRAVEL_START) / ENGAGE2_TRAVEL_DUR);
    return sampleCurvePose(ENGAGE_TWO_ROUTE_CURVE, p, fig.laneOffset);
  }
  return sampleCurvePose(ENGAGE_TWO_ROUTE_CURVE, 1, fig.laneOffset);
}

/** David himself: the same choreography, leading at the column's centerline
 * (no lane offset, no hold offset) — a rigid-group pose, never bone-driven
 * skeletal animation (ADR-007). */
export function davidPrincipalPose(t: number): DavidForcePose {
  return davidsForcePose(t, { restSlot: DAVID_INQUIRY_POS, holdOffset: [0, 0], laneOffset: 0 });
}

// ---------------------------------------------------------------------------
// The Philistine deployment (5:18, 5:22 — "spread themselves" / "came up
// yet again... and spread themselves"): one population, one slot set,
// reused verbatim for both phases. `philistinePose` gates visibility by
// time and, once a phase's engagement beat arrives, hands off to
// `philistineBreakPose` for the formation-breaking/dispersal window.

export interface PhilistineFigureParams {
  slot: [number, number];
  /** Standard mode only: whether this figure is among the fraction that
   * falls (a collapse transform) rather than disperses. Ignored entirely in
   * reduced mode (brief: "reduced... elides the falls entirely"). */
  falls: boolean;
  fallDelay: number;
  /** Unit-ish outward flee vector (radial from the spread's own center) and
   * distance — a disclosed staging choice, not a claim about which way any
   * particular group actually ran. */
  fleeDir: [number, number];
  fleeDist: number;
}

export interface PhilistinePose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing .. 1 fully fallen/prone — a collapse transform only, never
   * wound/blood/dismemberment geometry (ADR-009), identical device to every
   * other fall pose in this project. */
  fallen: number;
  /** True once dispersing (the caller uses this to switch from the static
   * `standYaw` it computes itself to `yaw`, this pose's flee direction). */
  moving: boolean;
  visible: boolean;
}

/** Real-time window (seconds) each engagement's formation-break/dispersal
 * takes, from the engagement beat to an emptied valley floor. */
export const BREAK_DUR = 14;
/** Real-time window a standing-mode crumple takes once triggered. */
const FALL_WINDOW = 2.2;
/** How long before the break window's own end everything (fallen figures
 * included) fades out, so the valley reads as emptied by the next beat in
 * both violence modes — reduction abstracts depiction, never the fact that
 * the Philistines were driven off. */
const FADE_TAIL = 5;

function hiddenAt(slot: [number, number]): PhilistinePose {
  return { x: slot[0], z: slot[1], yaw: 0, fallen: 0, moving: false, visible: false };
}

function philistineBreakPose(
  t: number,
  fig: PhilistineFigureParams,
  breakStart: number,
  mode: ViolenceMode,
): PhilistinePose {
  const [sx, sz] = fig.slot;
  const breakEnd = breakStart + BREAK_DUR;
  const fadeStart = breakEnd - FADE_TAIL;
  const lateFade = t < fadeStart ? 1 : 1 - smoothstep((t - fadeStart) / FADE_TAIL);
  const fleeYaw = Math.atan2(fig.fleeDir[0], fig.fleeDir[1]);

  if (mode === 'standard' && fig.falls) {
    const fallStart = breakStart + fig.fallDelay;
    if (t < fallStart) {
      return { x: sx, z: sz, yaw: fleeYaw, fallen: 0, moving: false, visible: lateFade > 0.02 };
    }
    const fallen = smoothstep((t - fallStart) / FALL_WINDOW);
    return { x: sx, z: sz, yaw: fleeYaw, fallen, moving: false, visible: lateFade > 0.02 };
  }

  // Disperses: the standard-mode non-falling majority, and — since reduced
  // mode ignores `falls` entirely — the whole population in reduced mode. A
  // shorter drain in reduced mode reads as the elided/quicker cut the brief
  // describes ("cutting from the advance to an emptied valley floor").
  const dur = mode === 'standard' ? BREAK_DUR : BREAK_DUR * 0.55;
  const p = clamp01((t - breakStart) / dur);
  const drift = smoothstep(p);
  const x = sx + fig.fleeDir[0] * fig.fleeDist * drift;
  const z = sz + fig.fleeDir[1] * fig.fleeDist * drift;
  const visible = mode === 'standard' ? lateFade > 0.02 : p < 0.97;
  return { x, z, yaw: fleeYaw, fallen: 0, moving: true, visible };
}

/** The full two-phase gate: hidden before the first spread, static through
 * each hold window, breaking/dispersing at each engagement, hidden again
 * between phases and after the second engagement. */
export function philistinePose(
  t: number,
  fig: PhilistineFigureParams,
  mode: ViolenceMode,
): PhilistinePose {
  if (t < T_SPREAD) return hiddenAt(fig.slot);
  if (t < T_ENGAGE1) {
    return { x: fig.slot[0], z: fig.slot[1], yaw: 0, fallen: 0, moving: false, visible: true };
  }
  if (t < T_ENGAGE1 + BREAK_DUR) return philistineBreakPose(t, fig, T_ENGAGE1, mode);
  if (t < T_RETURN) return hiddenAt(fig.slot);
  if (t < T_ENGAGE2) {
    return { x: fig.slot[0], z: fig.slot[1], yaw: 0, fallen: 0, moving: false, visible: true };
  }
  if (t < T_ENGAGE2 + BREAK_DUR) return philistineBreakPose(t, fig, T_ENGAGE2, mode);
  return hiddenAt(fig.slot);
}

// ---------------------------------------------------------------------------
// Lighting: flat daylight throughout, hour unstated in the text (disclosed
// design-placeholder, brief's "Lighting") — no lighting-arc function is
// defined here at all, deliberately, since one of the brief's sharpest
// constraints is to resist staging the wait beat with any atmospheric cue.
