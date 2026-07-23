import {
  APPROACH_CURVE,
  DAVID_PLAZA_POS,
  ELDER_PLAZA_POS,
  MESSENGER_EXIT_POS,
  MESSENGER_ROAD_CURVE,
} from './layout';

/**
 * Pure, beat-driven pose/timing choreography for hebron-anointing (ADR-007
 * convention, mirroring jabesh-burial/ziklag-lament's poses.ts). Beat times
 * match `src/data/scenes.ts`'s `hebron-anointing` entry exactly (`b-inquiry`
 * through `b-close`) — see docs/design/hebron-anointing-brief.md, "Camera /
 * observer experience".
 *
 * Hard constraints carried here: nothing in this file ever stages Abner,
 * Ish-bosheth, or Mahanaim geometry (that is `gibeon-pool`'s territory), and
 * the messenger-departure pose never shows arrival at or travel within
 * Jabesh-gilead (already rendered, separately, in `jabesh-burial`) — the
 * messengers simply walk the Hebron-side road east until they are out of
 * frame. No function here ever asserts David is "king" in an unqualified
 * sense; the anointing pour gesture (`anointingPourEnvelope`) is staged at
 * the plaza only, over the house-of-Judah-only claim carried in captions
 * and entity labels, not in this file's own data.
 */

export const T_INQUIRY = 0;
export const T_INQUIRY_END = 10;
export const T_ARRIVAL = 16;
export const T_SETTLING = 58;
export const T_ANOINTING = 98;
export const T_MESSAGE = 138;
export const T_CLOSE = 165;
export const DURATION_SEC = 170;

/** David reaches the plaza a little ahead of the general column — enough
 * lead time to be standing, composed, when the column itself is still
 * settling (b-settling, 2:3b) and the assembly gathers for the anointing. */
export const DAVID_ARRIVE = T_SETTLING - 6;

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

// ---------------------------------------------------------------------------
// The inquiry (2:1): a brief, minimally-staged vignette at the south end of
// the approach road — the text does not fix its location, so this carries
// no new terrain and no Ziklag-geometry reuse (brief's b-inquiry treatment).
// The mechanism (ephod/Abiathar) is inferred from the identical practice at
// 1 Samuel 30:7-8, not restated in 2:1 itself (claim-hebron-inquiry).

const INQUIRY_START = APPROACH_CURVE.getPointAt(0);
export const INQUIRY_POS: [number, number] = [INQUIRY_START.x, INQUIRY_START.z];
export const ABIATHAR_OFFSET: [number, number] = [2.4, -0.6];
/** How long after the inquiry vignette ends Abiathar stays visible before
 * fading — he is not tracked further once the column gets underway. */
const ABIATHAR_FADE_AFTER = 2;

export interface DavidPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 the inquiry gesture (a brief kneel/consult posture toward
   * Abiathar) — zero once the column gets underway. */
  inquire: number;
}

/** David's pose at scene time `t`: the inquiry vignette, the highland-road
 * approach, then standing at the plaza through the settling/anointing
 * beats, turning to face the messenger road once he dispatches the
 * commendation (b-jabesh-message). Exported for unit tests. */
export function davidPose(t: number): DavidPose {
  if (t < T_INQUIRY_END) {
    const inquire = smoothstep(t / T_INQUIRY_END);
    const [ax, az] = [INQUIRY_POS[0] + ABIATHAR_OFFSET[0], INQUIRY_POS[1] + ABIATHAR_OFFSET[1]];
    return {
      x: INQUIRY_POS[0],
      z: INQUIRY_POS[1],
      yaw: yawToward(INQUIRY_POS[0], INQUIRY_POS[1], ax, az),
      inquire,
    };
  }

  if (t < DAVID_ARRIVE) {
    const u = clamp01(smoothstep((t - T_INQUIRY_END) / (DAVID_ARRIVE - T_INQUIRY_END)));
    const pos = APPROACH_CURVE.getPointAt(u);
    const tan = APPROACH_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z), inquire: 0 };
  }

  const faceMessenger = smoothstep((t - T_MESSAGE) / 4);
  const plazaYaw = yawToward(
    DAVID_PLAZA_POS[0],
    DAVID_PLAZA_POS[1],
    ELDER_PLAZA_POS[0],
    ELDER_PLAZA_POS[1],
  );
  const eastYaw = yawToward(
    DAVID_PLAZA_POS[0],
    DAVID_PLAZA_POS[1],
    MESSENGER_EXIT_POS[0],
    MESSENGER_EXIT_POS[1],
  );
  return {
    x: DAVID_PLAZA_POS[0],
    z: DAVID_PLAZA_POS[1],
    yaw: lerp(plazaYaw, eastYaw, faceMessenger),
    inquire: 0,
  };
}

export interface AbiatharPose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

/** Abiathar is staged only for the inquiry vignette — once the column gets
 * underway he is not tracked further (he becomes part of the retinue, per
 * the same "leadership reads by staging only" convention jabesh-burial
 * used for its column). Exported for unit tests. */
export function abiatharPose(t: number): AbiatharPose {
  const x = INQUIRY_POS[0] + ABIATHAR_OFFSET[0];
  const z = INQUIRY_POS[1] + ABIATHAR_OFFSET[1];
  return {
    x,
    z,
    yaw: yawToward(x, z, INQUIRY_POS[0], INQUIRY_POS[1]),
    visible: t < T_INQUIRY_END + ABIATHAR_FADE_AFTER,
  };
}

// ---------------------------------------------------------------------------
// The anointing (2:4): an unnamed elder figure (no individual elder is
// invented — see claim-judah-anointing, claim-anointing-rite-form) performs
// a brief pour gesture near David at the plaza. Design-placeholder
// choreography; the horn prop (AnointingProps.tsx) keys off the same
// envelope.

export const ANOINTING_POUR_DUR = 6;

/** 0..1 bell-curve envelope for the anointing pour gesture, centered on
 * `T_ANOINTING`. Exported for unit tests. */
export function anointingPourEnvelope(t: number): number {
  const rampUp = smoothstep((t - T_ANOINTING) / 1.5);
  const fadeStart = T_ANOINTING + ANOINTING_POUR_DUR;
  const fade = 1 - smoothstep((t - fadeStart) / 2);
  return clamp01(rampUp) * clamp01(fade);
}

export interface ElderPose {
  x: number;
  z: number;
  yaw: number;
  pour: number;
}

/** The elder stands fixed at the plaza throughout — no travel choreography,
 * matching the brief's "static/ceremonial crowd" cost note; only the pour
 * gesture is time-varying. Exported for unit tests. */
export function elderPose(t: number): ElderPose {
  return {
    x: ELDER_PLAZA_POS[0],
    z: ELDER_PLAZA_POS[1],
    yaw: yawToward(ELDER_PLAZA_POS[0], ELDER_PLAZA_POS[1], DAVID_PLAZA_POS[0], DAVID_PLAZA_POS[1]),
    pour: anointingPourEnvelope(t),
  };
}

// ---------------------------------------------------------------------------
// The messenger dispatch (2:5-7): staged as correspondence — messengers
// appear at the plaza once David sends them, then walk the Hebron-side road
// east until they are out of frame. Never shown arriving at, or traveling
// within, Jabesh-gilead (hard scope guard).

export const MESSENGER_COUNT = 3;
export const MESSENGER_DEPART_DUR = 24;
const MESSENGER_SPAWN_FADE = 1.5;

export interface MessengerPose {
  x: number;
  z: number;
  yaw: number;
  scale: number;
  visible: boolean;
}

/** `stagger` (seconds, small per-figure jitter) staggers the messengers'
 * departure so they don't move in perfect lockstep. Exported for unit
 * tests. */
export function messengerDeparturePose(t: number, stagger: number): MessengerPose {
  const startAt = T_MESSAGE + stagger;
  if (t < startAt) {
    return { x: DAVID_PLAZA_POS[0], z: DAVID_PLAZA_POS[1], yaw: 0, scale: 0, visible: false };
  }
  const spawnScale = smoothstep((t - startAt) / MESSENGER_SPAWN_FADE);
  const u = clamp01(smoothstep((t - startAt) / MESSENGER_DEPART_DUR));
  const pos = MESSENGER_ROAD_CURVE.getPointAt(u);
  const tan = MESSENGER_ROAD_CURVE.getTangentAt(Math.max(0.001, u));
  return {
    x: pos.x,
    z: pos.z,
    yaw: Math.atan2(tan.x, tan.z),
    scale: spawnScale,
    visible: true,
  };
}
