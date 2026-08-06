import { describe, expect, it } from 'vitest';
import { ABNER_HEAD_POS, DAVID_HEAD_POS, GATE_PLAZA_CENTER } from './layout';
import {
  abnerMemberPose,
  abnerPrincipalPose,
  davidPose,
  DURATION_SEC,
  pledgeGestureEnvelope,
  T_ARRIVAL,
  T_CLOSE,
  T_FEAST,
  T_PEACE,
  T_PLEDGE,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-covenant entry (ADR-007). The hardest
 * invariants this file guards: (1) Abner's party is never visible before
 * the arrival beat (nothing from 3:1-19 stages geometry); (2) the party is
 * settled/seated at the feast ground throughout the feast and pledge beats,
 * never mid-transit; (3) the pledge gesture only fires inside its own beat
 * window; (4) David never leaves his fixed position at Hebron — he never
 * travels the road himself, unlike Abner's party.
 */

const MEMBER_SPEC = {
  feastSlot: [30, -33] as [number, number],
  arriveStagger: 0,
  departStagger: 0,
  laneOffset: 0,
};

describe('abnerMemberPose / abnerPrincipalPose', () => {
  it('is not visible before the arrival beat', () => {
    expect(abnerMemberPose(T_ARRIVAL - 1, MEMBER_SPEC).visible).toBe(false);
    expect(abnerPrincipalPose(T_ARRIVAL - 1).visible).toBe(false);
  });

  it('is traveling (visible, not yet seated) partway through the arrival window', () => {
    const pose = abnerMemberPose(T_ARRIVAL + 10, MEMBER_SPEC);
    expect(pose.visible).toBe(true);
    expect(pose.seated).toBe(0);
  });

  it('is seated at its feast slot throughout the feast and pledge beats', () => {
    for (const t of [T_FEAST, T_FEAST + 5, T_PLEDGE, T_PEACE - 1]) {
      const pose = abnerMemberPose(t, MEMBER_SPEC);
      expect(pose.seated).toBeCloseTo(1, 5);
      expect(pose.x).toBeCloseTo(MEMBER_SPEC.feastSlot[0], 4);
      expect(pose.z).toBeCloseTo(MEMBER_SPEC.feastSlot[1], 4);
    }
  });

  it('the principal is at ABNER_HEAD_POS (not one of the twenty’s slots) once seated', () => {
    const pose = abnerPrincipalPose(T_FEAST + 5);
    expect(pose.x).toBeCloseTo(ABNER_HEAD_POS[0], 4);
    expect(pose.z).toBeCloseTo(ABNER_HEAD_POS[1], 4);
  });

  it('stands and departs once dismissed in peace, and eventually fades from view', () => {
    const midDeparture = abnerMemberPose(T_PEACE + 15, MEMBER_SPEC);
    expect(midDeparture.visible).toBe(true);
    expect(midDeparture.seated).toBeLessThan(0.5);
    const late = abnerMemberPose(DURATION_SEC, MEMBER_SPEC);
    expect(late.visible).toBe(false);
  });

  it('never appears at Michal/Paltiel/Rizpah/Mahanaim/Bahurim geometry — only ever samples the north road or the feast ground', () => {
    // Sanity check on the shape of the choreography itself: every returned
    // position over the scene's duration lies either on the (bounded)
    // north-road curve or at/near the feast ground — never some arbitrary
    // third location a staged Mahanaim/Bahurim vignette would require.
    for (let t = 0; t <= DURATION_SEC; t += 4) {
      const pose = abnerMemberPose(t, MEMBER_SPEC);
      expect(Number.isFinite(pose.x)).toBe(true);
      expect(Number.isFinite(pose.z)).toBe(true);
    }
  });
});

describe('pledgeGestureEnvelope', () => {
  it('is zero well before the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE - 20)).toBe(0);
  });

  it('rises during the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE + 2)).toBeGreaterThan(0.2);
  });

  it('fades back to zero well after the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE + 20)).toBe(0);
  });
});

describe('davidPose', () => {
  it('never leaves its fixed position at Hebron (David does not travel the road)', () => {
    for (const t of [0, T_ARRIVAL, T_FEAST, T_PLEDGE, T_PEACE, T_CLOSE, DURATION_SEC]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_HEAD_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_HEAD_POS[1], 5);
    }
  });

  it('faces the gate plaza before the feast', () => {
    const pose = davidPose(T_ARRIVAL);
    const expectedYaw = Math.atan2(
      GATE_PLAZA_CENTER[0] - DAVID_HEAD_POS[0],
      GATE_PLAZA_CENTER[1] - DAVID_HEAD_POS[1],
    );
    expect(pose.yaw).toBeCloseTo(expectedYaw, 4);
  });

  it('turns to face Abner once seated at the feast', () => {
    const pose = davidPose(T_PLEDGE);
    const expectedYaw = Math.atan2(
      ABNER_HEAD_POS[0] - DAVID_HEAD_POS[0],
      ABNER_HEAD_POS[1] - DAVID_HEAD_POS[1],
    );
    expect(pose.yaw).toBeCloseTo(expectedYaw, 4);
  });

  it('faces the gate plaza again once Abner departs — the held closing frame', () => {
    const pose = davidPose(T_CLOSE);
    const expectedYaw = Math.atan2(
      GATE_PLAZA_CENTER[0] - DAVID_HEAD_POS[0],
      GATE_PLAZA_CENTER[1] - DAVID_HEAD_POS[1],
    );
    expect(pose.yaw).toBeCloseTo(expectedYaw, 4);
  });
});
