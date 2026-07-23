import { describe, expect, it } from 'vitest';
import { DAVID_PLAZA_POS, ELDER_PLAZA_POS } from './layout';
import {
  abiatharPose,
  anointingPourEnvelope,
  davidPose,
  DAVID_ARRIVE,
  elderPose,
  INQUIRY_POS,
  messengerDeparturePose,
  T_ANOINTING,
  T_ARRIVAL,
  T_CLOSE,
  T_INQUIRY,
  T_INQUIRY_END,
  T_MESSAGE,
  T_SETTLING,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-anointing entry. The hardest invariants this
 * file guards: (1) the anointing pour gesture never fires before/after its
 * beat window, since every caption touching it must carry the
 * house-of-Judah-only qualifier and the render must match; (2) the
 * messenger never appears before being dispatched, and the pose function
 * never produces a Jabesh-side position (it only ever samples the Hebron
 * -> east road, layout.ts's MESSENGER_ROAD_CURVE).
 */

describe('davidPose', () => {
  it('is at the inquiry position, inquiring, at scene start', () => {
    const pose = davidPose(T_INQUIRY + 1);
    expect(pose.x).toBeCloseTo(INQUIRY_POS[0], 5);
    expect(pose.z).toBeCloseTo(INQUIRY_POS[1], 5);
    expect(pose.inquire).toBeGreaterThan(0);
  });

  it('is no longer inquiring once the inquiry beat ends', () => {
    expect(davidPose(T_INQUIRY_END + 0.5).inquire).toBe(0);
  });

  it('is underway (off the inquiry position) during the arrival beat', () => {
    const pose = davidPose(T_ARRIVAL);
    expect(pose.x !== INQUIRY_POS[0] || pose.z !== INQUIRY_POS[1]).toBe(true);
  });

  it('has reached the plaza by the settling beat and stays there through the anointing beat', () => {
    for (const t of [T_SETTLING, T_ANOINTING, T_ANOINTING + 4]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_PLAZA_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_PLAZA_POS[1], 5);
    }
  });

  it('turns toward the messenger road only after the message beat', () => {
    const beforeYaw = davidPose(T_MESSAGE - 1).yaw;
    const afterYaw = davidPose(T_MESSAGE + 6).yaw;
    expect(afterYaw).not.toBeCloseTo(beforeYaw, 2);
  });

  it('never reaches DAVID_ARRIVE before it travels (sanity on the timing constant)', () => {
    expect(DAVID_ARRIVE).toBeGreaterThan(T_INQUIRY_END);
    expect(DAVID_ARRIVE).toBeLessThan(T_SETTLING);
  });
});

describe('abiatharPose', () => {
  it('is visible during the inquiry vignette', () => {
    expect(abiatharPose(T_INQUIRY + 1).visible).toBe(true);
  });

  it('is not tracked (invisible) once the column is well underway', () => {
    expect(abiatharPose(T_ARRIVAL).visible).toBe(false);
  });
});

describe('anointingPourEnvelope / elderPose', () => {
  it('is zero well before the anointing beat', () => {
    expect(anointingPourEnvelope(T_ANOINTING - 20)).toBe(0);
  });

  it('rises during the anointing beat', () => {
    expect(anointingPourEnvelope(T_ANOINTING + 1)).toBeGreaterThan(0.2);
  });

  it('fades back to zero well after the anointing beat', () => {
    expect(anointingPourEnvelope(T_ANOINTING + 20)).toBe(0);
  });

  it('the elder stands fixed at the plaza throughout, only the pour gesture varies', () => {
    const early = elderPose(T_INQUIRY);
    const late = elderPose(T_CLOSE);
    expect(early.x).toBeCloseTo(ELDER_PLAZA_POS[0], 5);
    expect(early.z).toBeCloseTo(ELDER_PLAZA_POS[1], 5);
    expect(late.x).toBeCloseTo(early.x, 5);
    expect(late.z).toBeCloseTo(early.z, 5);
  });
});

describe('messengerDeparturePose', () => {
  it('is not visible before the message beat', () => {
    expect(messengerDeparturePose(T_MESSAGE - 1, 0).visible).toBe(false);
  });

  it('appears at the plaza once dispatched', () => {
    const pose = messengerDeparturePose(T_MESSAGE + 0.2, 0);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(DAVID_PLAZA_POS[0], 0);
  });

  it('moves east and away from the plaza well after being dispatched', () => {
    const pose = messengerDeparturePose(T_MESSAGE + 20, 0);
    expect(pose.x).toBeGreaterThan(DAVID_PLAZA_POS[0] + 50);
  });

  it('a later stagger delays visibility (figures do not move in lockstep)', () => {
    expect(messengerDeparturePose(T_MESSAGE + 0.5, 3).visible).toBe(false);
  });
});
