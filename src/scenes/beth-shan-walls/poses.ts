import type { ViolenceMode } from '../../state/store';

/**
 * Pure, beat-driven pose choreography for Beth-shan (ADR-007 convention,
 * mirroring gilboa-battle/poses.ts). Beat times match `src/data/scenes.ts`'s
 * `beth-shan-walls` entry exactly (`b-next-day` through `b-empty-wall`) — see
 * docs/design/beth-shan-walls-brief.md, "Camera / observer experience", for
 * the standard/reduced treatment table this file implements.
 *
 * ADR-009: one choreography, two treatments, never a second timeline. No
 * function here ever produces wound, blood, dismemberment, or head geometry
 * — the display forms are a body-orientation/position transform on a single
 * wrapped-silhouette shape (`engine/characters/wrappedForm.ts`), never an
 * anatomical figure.
 */

export const T_NEXT_DAY = 0;
export const T_PROCESSION = 20;
export const T_MESSENGERS = 40;
export const T_DISPLAY = 55;
export const T_WALL_WATCH = 75;
export const T_NEWS_EAST = 95;
export const T_RETRIEVAL = 115;
export const T_EMPTY_WALL = 140;
export const DURATION_SEC = 150;

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

// ---------------------------------------------------------------------------
// The procession: appears far off at b-next-day, arrives at the gate by
// b-procession, and a messenger party departs again at b-messengers.

/** 0..1 progress along the valley road, from "far off" (t=T_NEXT_DAY) to the gate (t=T_PROCESSION). */
export function processionArrivalProgress(t: number): number {
  return smoothstep((t - T_NEXT_DAY) / (T_PROCESSION - T_NEXT_DAY));
}

/** 0..1 progress of the messenger party's departure back down the valley road,
 * starting at b-messengers, gone from view within DEPART_DUR seconds. */
export const MESSENGER_DEPART_DUR = 18;
export function messengerDepartProgress(t: number): number {
  return smoothstep((t - T_MESSENGERS) / MESSENGER_DEPART_DUR);
}

/** The rest of the escort lingers at the gate through daylight, then
 * withdraws back down the road well before the night retrieval — the text
 * narrates no guard presence at the retrieval, and none is staged (brief:
 * "no invented guard fight"). */
export const ESCORT_WITHDRAW_START = T_NEWS_EAST - 6;
export const ESCORT_WITHDRAW_DUR = 16;
export function escortWithdrawProgress(t: number): number {
  return smoothstep((t - ESCORT_WITHDRAW_START) / ESCORT_WITHDRAW_DUR);
}

// ---------------------------------------------------------------------------
// The four wrapped display forms (`claim-body-display`): raised and fastened
// at b-display, held through daylight, lowered at b-retrieval, then borne
// away as wrapped biers. In reduced mode nothing is ever raised — the wall
// stays bare and the retrieval beat reads only as the men coming and going
// with covered biers (ADR-009's own reduced-mode wording for this scene).

export const DISPLAY_RAISE_DUR = 7;
export const DISPLAY_LOWER_DUR = 9;
/** Per-form stagger so the four don't move in perfect lockstep. */
export const DISPLAY_FORM_STAGGER = 1.4;
export const CARRY_START_GAP = 1.5;
export const CARRY_DURATION = 13;

export interface FormTransform {
  /** 0 = at the wall's foot, 1 = fastened at the wall top. Only meaningful while `horizontal` is 0. */
  heightFrac: number;
  /** 0 = upright against the wall face, 1 = lying flat, borne on the bier. */
  horizontal: number;
  /** 0..1 progress carried away along the retrieval path once grounded. */
  carryProgress: number;
  /** Whether the form (or its bier) should render at all this frame. */
  visible: boolean;
  /** Whether the bier prop under it should render. */
  bierVisible: boolean;
}

const HOLD_EPS = 0.0005;

/**
 * `formIndex` (0..3) staggers each of the four forms slightly, both in the
 * raise/lower on the wall and in the carry-out — see the brief's note on the
 * 31:9–10 singular / 31:12 plural progression: four forms, not perfectly
 * synchronized props.
 */
export function displayFormTransform(
  t: number,
  mode: ViolenceMode,
  formIndex: number,
): FormTransform {
  const delay = formIndex * DISPLAY_FORM_STAGGER;

  if (mode === 'reduced') {
    // The wall renders without body forms throughout (ADR-009). The
    // retrieval beat still reads as the men coming and going with covered
    // biers — there was nothing on the wall to lower, so the bier simply
    // appears at the wall's foot once the party arrives, and is carried out.
    const groundedAt = T_RETRIEVAL + delay;
    const carryStart = groundedAt + CARRY_START_GAP;
    const carryProgress = clamp01((t - carryStart) / CARRY_DURATION);
    const present = t >= groundedAt - 1 && carryProgress < 1;
    return { heightFrac: 0, horizontal: 1, carryProgress, visible: present, bierVisible: present };
  }

  const raiseStart = T_DISPLAY + delay;
  const raised = smoothstep((t - raiseStart) / DISPLAY_RAISE_DUR);
  const lowerStart = T_RETRIEVAL + delay;
  const lowered = smoothstep((t - lowerStart) / DISPLAY_LOWER_DUR);
  const heightFrac = clamp01(raised - raised * lowered);
  const grounded = lowered >= 1 - HOLD_EPS;
  const carryStart = lowerStart + DISPLAY_LOWER_DUR + CARRY_START_GAP;
  const carryProgress = clamp01((t - carryStart) / CARRY_DURATION);

  return {
    heightFrac,
    horizontal: grounded ? 1 : 0,
    carryProgress,
    visible: raised > HOLD_EPS && carryProgress < 1,
    bierVisible: grounded && carryProgress < 1,
  };
}

// ---------------------------------------------------------------------------
// The men of Jabesh: walk in from the east brow across the night, work at
// the wall's foot, then carry the bodies home the way they came.

export const RETRIEVAL_ARRIVE_START = T_NEWS_EAST;
export const RETRIEVAL_ARRIVE_END = T_RETRIEVAL;
export const RETRIEVAL_WORK_DUR = 8;
export const RETRIEVAL_DEPART_DUR = 17;

export type RetrievalPhase = 'approach' | 'work' | 'depart' | 'gone';

export interface RetrievalStage {
  phase: RetrievalPhase;
  /** 0..1 progress within the current phase. */
  progress: number;
}

/** Which phase of the retrieval night a man of Jabesh is in at time `t`,
 * offset by his own small arrival delay (so the party doesn't arrive in
 * perfect lockstep). */
export function retrievalStage(t: number, arrivalDelay: number): RetrievalStage {
  const arriveEnd = RETRIEVAL_ARRIVE_END + arrivalDelay;
  const arriveStart = RETRIEVAL_ARRIVE_START + arrivalDelay * 0.4;
  if (t < arriveEnd) {
    return {
      phase: 'approach',
      progress: smoothstep((t - arriveStart) / (arriveEnd - arriveStart)),
    };
  }
  const workEnd = arriveEnd + RETRIEVAL_WORK_DUR;
  if (t < workEnd) {
    return { phase: 'work', progress: clamp01((t - arriveEnd) / RETRIEVAL_WORK_DUR) };
  }
  const departEnd = workEnd + RETRIEVAL_DEPART_DUR;
  if (t < departEnd) {
    return { phase: 'depart', progress: clamp01((t - workEnd) / RETRIEVAL_DEPART_DUR) };
  }
  return { phase: 'gone', progress: 1 };
}

// ---------------------------------------------------------------------------
// Torches: present only through the retrieval night, per the brief's
// lighting arc (present b-retrieval, gone by the grey pre-dawn of b-empty-wall).

export const TORCH_FADE_IN_START = T_NEWS_EAST + 6;
export const TORCH_FADE_IN_DUR = 6;
export const TORCH_FADE_OUT_START = T_EMPTY_WALL - 4;
export const TORCH_FADE_OUT_DUR = 6;

/** 0..1 torch presence/intensity at time t — fades in at dusk, holds through
 * the night, fades out toward the grey pre-dawn of `b-empty-wall`. */
export function torchPresence(t: number): number {
  const fadeIn = smoothstep((t - TORCH_FADE_IN_START) / TORCH_FADE_IN_DUR);
  const fadeOut = smoothstep((t - TORCH_FADE_OUT_START) / TORCH_FADE_OUT_DUR);
  return clamp01(fadeIn - fadeOut);
}
