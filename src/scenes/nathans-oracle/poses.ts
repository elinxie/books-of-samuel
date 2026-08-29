import {
  DAVID_HOUSE_POS,
  DAVID_TENT_SIT_POS,
  NATHAN_HOUSE_POS,
  NIGHT_CORNER_POS,
  TENT_POS,
  WALK_TO_TENT_CURVE,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for nathans-oracle (ADR-007
 * convention, mirroring hebron-covenant/ark-into-jerusalem's poses.ts). Beat
 * times match `src/data/scenes.ts`'s `nathans-oracle` entry exactly
 * (`b-open` through `b-close`) — see docs/design/nathans-oracle-brief.md,
 * "Timeline beats".
 *
 * Hard constraint carried here, load-bearing per the brief and ADR-013:
 * `nathanPose`'s `resting` field only ever drives an ordinary, low, settled
 * posture (see `PrincipalFigures.tsx`'s `REST_PITCH`, a forward/downward
 * lean, never an upward one) — nothing in this file ever raises Nathan's
 * head, adds a listening/receptive gesture, or otherwise stages him as
 * perceiving anything. `nightAmount` drives only ambient lighting (an
 * ordinary, unremarkable night falling and lifting) — it is not itself a
 * depiction of the oracle's reception, and nothing here keys any lighting,
 * camera, or pose change to the oracle's content, which is carried entirely
 * by card (see `src/data/scenes.ts`'s `b-night-word` caption).
 */

export const T_OPEN = 0;
export const T_WISH = 12;
export const T_ASSENT = 24;
export const T_NIGHT = 36;
export const T_REPORT = 58;
export const T_WALK = 70;
export const T_SIT = 84;
export const T_PRAYER = 92;
export const T_CLOSE = 104;
export const DURATION_SEC = 110;

/** Ramp duration (seconds) for the night falling/lifting and for Nathan's
 * settling/rising transitions — short enough to read as a real transition,
 * gentle enough to stay unremarkable (no dramatic dawn/dusk cue). */
const NIGHT_RAMP = 4;
const SIT_TRANSITION_DUR = 3;

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

/** A held plateau: ramps 0→1 over `ramp` seconds starting at `start`, holds
 * 1, then ramps back 1→0 over `ramp` seconds ending at `end`. Used both for
 * the night-stillness beat's ambient darkness (`nightAmount`) and for
 * Nathan's settled-for-the-night posture (`nathanPose`'s `resting` field) —
 * one shared shape, since both describe the same stretch of ordinary night.
 */
export function plateauEnvelope(t: number, start: number, end: number, ramp: number): number {
  const up = smoothstep((t - start) / ramp);
  const down = 1 - smoothstep((t - (end - ramp)) / ramp);
  return clamp01(Math.min(up, down));
}

/** 0 (full day) .. 1 (full, ordinary night) — drives only ambient lighting
 * (`NathansOracleScene.tsx`'s `SceneEnvironment`), ramping up around
 * `T_NIGHT` and back down before `T_REPORT`, matching 7:4's "that same
 * night" as an unremarkable fact of the hour, not a staged cue for the
 * oracle itself (ADR-013; see claim-oracle-depiction). */
export function nightAmount(t: number): number {
  return plateauEnvelope(t, T_NIGHT, T_REPORT, NIGHT_RAMP);
}

// ---------------------------------------------------------------------------
// Nathan: stands with David at the house for the wish/assent beats, is
// settled for the night at the quiet corner through the oracle beat (ordinary
// rest only — no receptive posture, ADR-013), then returns to the house to
// deliver his report and remains there for the rest of the scene (the text
// gives no further narrated movement for him).

export interface NathanPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing at the house .. 1 settled for the night at the quiet corner.
   * Drives a low, forward/downward-leaning rest transform in
   * `PrincipalFigures.tsx` — ordinary rest only, never an upward or
   * receptive posture (the brief's hard "Not allowed" list). */
  resting: number;
}

export function nathanPose(t: number): NathanPose {
  const resting = nightAmount(t);
  const x = lerp(NATHAN_HOUSE_POS[0], NIGHT_CORNER_POS[0], resting);
  const z = lerp(NATHAN_HOUSE_POS[1], NIGHT_CORNER_POS[1], resting);
  const facingDavidYaw = yawToward(
    NATHAN_HOUSE_POS[0],
    NATHAN_HOUSE_POS[1],
    DAVID_HOUSE_POS[0],
    DAVID_HOUSE_POS[1],
  );
  // At rest, an arbitrary settled orientation — not toward or away from
  // anything narratively significant, just a body at rest.
  const restYaw = facingDavidYaw + Math.PI * 0.15;
  return { x, z, yaw: lerp(facingDavidYaw, restYaw, resting), resting };
}

// ---------------------------------------------------------------------------
// David: stands with Nathan at the house through the wish/assent/report
// beats, then walks the short interior route to the tent and sits — the
// seated posture itself is the beat (7:18a); he stays seated through the
// prayer and the close.

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  /** 0 standing .. 1 seated before the LORD at the tent — drives the same
   * squash-and-lower seated transform hebron-covenant's `davidPrincipalPose`
   * established (`PrincipalFigures.tsx`'s `SIT_LOWER`/`SIT_SQUASH`). */
  seated: number;
}

export function davidPose(t: number): DavidPose {
  if (t < T_WALK) {
    return {
      x: DAVID_HOUSE_POS[0],
      z: DAVID_HOUSE_POS[1],
      yaw: yawToward(
        DAVID_HOUSE_POS[0],
        DAVID_HOUSE_POS[1],
        NATHAN_HOUSE_POS[0],
        NATHAN_HOUSE_POS[1],
      ),
      seated: 0,
    };
  }

  if (t < T_SIT) {
    const u = clamp01(smoothstep((t - T_WALK) / (T_SIT - T_WALK)));
    const pos = WALK_TO_TENT_CURVE.getPointAt(u);
    const tan = WALK_TO_TENT_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), seated: 0 };
  }

  const seated = clamp01(smoothstep((t - T_SIT) / SIT_TRANSITION_DUR));
  return {
    x: DAVID_TENT_SIT_POS[0],
    z: DAVID_TENT_SIT_POS[1],
    yaw: yawToward(DAVID_TENT_SIT_POS[0], DAVID_TENT_SIT_POS[1], TENT_POS[0], TENT_POS[1]),
    seated,
  };
}
