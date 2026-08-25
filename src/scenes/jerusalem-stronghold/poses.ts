import * as THREE from 'three';
import { APPROACH_CURVE, CONSTRUCTION_GROUND_CENTER } from './layout';

/**
 * Pure, beat-driven pose/timing choreography for jerusalem-stronghold (ADR-007
 * convention, mirroring hebron-covenant/hebron-gate's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `jerusalem-stronghold` entry exactly
 * (`b-all-israel` through `b-close`) — see
 * docs/design/jerusalem-stronghold-brief.md, "Timeline beats".
 *
 * Hard constraints carried here, load-bearing per the brief: nothing in this
 * file ever stages an assault, a capture mechanism, or the taunt being
 * enacted — David's force simply walks the approach, holds, and (after
 * `T_TAKING`, the narrative's own gap) redistributes inside the enclosure.
 * No Hebron geometry, no Joab, no 2 Samuel 6+ content.
 */

export const T_ALL_ISRAEL = 0;
export const T_REGNAL = 14;
export const T_APPROACH = 26;
export const T_TAUNT = 54;
export const T_TAKING = 80;
export const T_TSINNOR = 98;
export const T_DWELLING = 118;
export const T_MILLO = 132;
export const T_GREATER = 144;
export const T_HIRAM = 152;
export const T_PERCEIVED = 160;
export const T_HOUSEHOLD = 168;
export const T_CLOSE = 176;
export const DURATION_SEC = 178;

/** How long after `T_TAKING` David's force finishes the approach and settles
 * into an occupying presence — the before/after pair's hinge. */
const SETTLE_DUR = 9;

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

const CURVE_END = APPROACH_CURVE.getPointAt(1);

// Hoisted scratch vectors for per-frame curve sampling in `davidsForcePose`
// (called once per figure per frame across David's force during the
// approach — the tmpVec/tmpTan pattern established by
// ziklag/ReturningMen.tsx and ziklag-lament/poses.ts) — avoids allocating
// two new THREE.Vector3 instances per figure per frame.
const tmpPos = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

// ---------------------------------------------------------------------------
// David's force: an approach column at the capture beats, redistributed as
// an occupying presence inside the enclosure afterward
// (`claim-stronghold-cast-scale`). Arrival is timed to complete at/around
// `T_TAKING` — the men are at the gate by the moment the narrative's own gap
// falls; nothing about the taking itself is staged, the column simply
// finishes arriving and then, over `SETTLE_DUR`, redistributes inside.

export interface ForceFigureParams {
  laneOffset: number;
  arriveStagger: number;
  destSlot: [number, number];
}

export interface ForcePose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 — 0 while still on the approach road, 1 once redistributed to the
   * interior occupying slot. */
  settled: number;
}

export function davidsForcePose(t: number, fig: ForceFigureParams): ForcePose {
  const arriveAt = T_TAKING + fig.arriveStagger;
  const [dx, dz] = fig.destSlot;

  if (t < arriveAt) {
    const u = clamp01(smoothstep(t / arriveAt));
    APPROACH_CURVE.getPointAt(u, tmpPos);
    APPROACH_CURVE.getTangentAt(Math.max(0.001, u), tmpTan);
    const [ox, oz] = facePerpendicular(tmpTan.x, tmpTan.z, fig.laneOffset);
    return { x: tmpPos.x + ox, z: tmpPos.z + oz, yaw: Math.atan2(tmpTan.x, tmpTan.z), settled: 0 };
  }

  const settleEnd = arriveAt + SETTLE_DUR;
  if (t < settleEnd) {
    const p = smoothstep((t - arriveAt) / SETTLE_DUR);
    return {
      x: lerp(CURVE_END.x + fig.laneOffset, dx, p),
      z: lerp(CURVE_END.z, dz, p),
      yaw: yawToward(CURVE_END.x, CURVE_END.z, dx, dz),
      settled: p,
    };
  }

  return { x: dx, z: dz, yaw: 0, settled: 1 };
}

// `ForceFigureParams` construction (random lane offset/stagger/slot
// assignment, via `mulberry32`) lives in `DavidsForce.tsx`, per ADR-006 —
// this file stays pure pose math with no randomness of its own.

// ---------------------------------------------------------------------------
// David (named principal): walks the same approach road as his men, arrives
// and holds at the gate through the taunt/taking beats, then occupies an
// interior anchor point once the stronghold is his. From `T_HIRAM` onward he
// turns to face the construction ground — a small, legible acknowledgment of
// the building beat, never a gesture at the taking itself.

export const DAVID_INTERIOR_ANCHOR: [number, number] = [-4, 68];

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  settled: number;
}

export function davidPrincipalPose(t: number): DavidPose {
  const base = davidsForcePose(t, {
    laneOffset: 0,
    arriveStagger: 0,
    destSlot: DAVID_INTERIOR_ANCHOR,
  });
  if (base.settled < 1) return base;
  const turn = smoothstep((t - T_HIRAM) / 6);
  const southYaw = 0;
  const towardBuilding = yawToward(
    DAVID_INTERIOR_ANCHOR[0],
    DAVID_INTERIOR_ANCHOR[1],
    CONSTRUCTION_GROUND_CENTER[0],
    CONSTRUCTION_GROUND_CENTER[1],
  );
  return { ...base, yaw: lerp(southYaw, towardBuilding, turn) };
}
