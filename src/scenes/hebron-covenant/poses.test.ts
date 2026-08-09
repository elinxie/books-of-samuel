import { describe, expect, it } from 'vitest';
import {
  ABNER_FEAST_POS,
  ARRIVAL_MEET_POS,
  DAVID_FEAST_POS,
  DAVID_REST_POS,
  GATE_LINEUP_SLOTS,
  NORTH_ROAD_CURVE,
} from './layout';
import {
  ABNER_ARRIVE,
  abnerCovenantPose,
  abnerEscortPose,
  abnerPledgeEnvelope,
  DAVID_MEET_START,
  davidCovenantPose,
  DURATION_SEC,
  RECEIVE_HOLD_END,
  T_ARRIVAL,
  T_CLOSE,
  T_FEAST,
  T_LONG_WAR,
  T_PEACE,
  T_PLEDGE,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-covenant entry. The hardest invariants this
 * file guards: (1) Abner's twenty and Abner himself never appear staged
 * before the arrival beat (3:1-19 is card-only, never geometry); (2) the
 * pledge gesture only fires around its own beat; (3) the departure never
 * "speeds up" — the same smoothstep-eased travel as the arrival — and David
 * is still standing, watching, at and after the close (no dread staging).
 */

const SAMPLE_ESCORT = {
  laneOffset: 0.5,
  lineupSlot: GATE_LINEUP_SLOTS[0],
  seatSlot: ABNER_FEAST_POS,
};

describe('abnerEscortPose', () => {
  it('is underway on the northern road well before arrival', () => {
    const pose = abnerEscortPose(T_ARRIVAL - 30, SAMPLE_ESCORT);
    const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
    // Not still at the far end of the road, not yet at the gate either.
    expect(Math.hypot(pose.x - curveStart.x, pose.z - curveStart.z)).toBeGreaterThan(5);
  });

  it('has reached the feast seat by the feast beat and stays through the pledge', () => {
    for (const t of [T_FEAST + 1, T_PLEDGE, T_PEACE - 1]) {
      const pose = abnerEscortPose(t, SAMPLE_ESCORT);
      expect(pose.x).toBeCloseTo(SAMPLE_ESCORT.seatSlot[0], 5);
      expect(pose.z).toBeCloseTo(SAMPLE_ESCORT.seatSlot[1], 5);
    }
  });

  it('retraces the northern road outbound and is gone by the end of the scene', () => {
    const pose = abnerEscortPose(DURATION_SEC, SAMPLE_ESCORT);
    const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
    expect(pose.x).toBeCloseTo(curveStart.x + SAMPLE_ESCORT.laneOffset, 5);
    expect(pose.z).toBeCloseTo(curveStart.z, 5);
  });

  it('never depends on anything before scene start (t=0 is on the road, not mid-journey)', () => {
    const atStart = abnerEscortPose(T_LONG_WAR, SAMPLE_ESCORT);
    const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
    expect(atStart.x).toBeCloseTo(curveStart.x + SAMPLE_ESCORT.laneOffset, 5);
    expect(atStart.z).toBeCloseTo(curveStart.z, 5);
  });
});

describe('abnerCovenantPose', () => {
  it('arrives at the meeting point slightly ahead of the twenty (leadership reads by staging)', () => {
    expect(ABNER_ARRIVE).toBeLessThan(T_ARRIVAL);
    const pose = abnerCovenantPose(RECEIVE_HOLD_END);
    expect(pose.x).toBeCloseTo(ARRIVAL_MEET_POS[0], 5);
    expect(pose.z).toBeCloseTo(ARRIVAL_MEET_POS[1], 5);
  });

  it('is seated at the feast position through the pledge beat', () => {
    const pose = abnerCovenantPose(T_PLEDGE);
    expect(pose.x).toBeCloseTo(ABNER_FEAST_POS[0], 5);
    expect(pose.z).toBeCloseTo(ABNER_FEAST_POS[1], 5);
  });
});

describe('abnerPledgeEnvelope', () => {
  it('is zero well before the pledge beat', () => {
    expect(abnerPledgeEnvelope(T_PLEDGE - 20)).toBe(0);
  });

  it('rises during the pledge beat', () => {
    expect(abnerPledgeEnvelope(T_PLEDGE + 1)).toBeGreaterThan(0.2);
  });

  it('fades back to zero well after the pledge beat, before the peace beat closes', () => {
    expect(abnerPledgeEnvelope(T_PEACE + 10)).toBe(0);
  });
});

describe('davidCovenantPose', () => {
  it('rests at home before Abner is on the way to meet him', () => {
    const pose = davidCovenantPose(DAVID_MEET_START - 5);
    expect(pose.x).toBeCloseTo(DAVID_REST_POS[0], 5);
    expect(pose.z).toBeCloseTo(DAVID_REST_POS[1], 5);
  });

  it('is standing at the meeting point exactly when Abner arrives — received, not surprised', () => {
    const pose = davidCovenantPose(ABNER_ARRIVE);
    expect(pose.x).toBeCloseTo(ARRIVAL_MEET_POS[0], 5);
    expect(pose.z).toBeCloseTo(ARRIVAL_MEET_POS[1], 5);
  });

  it('is seated at the feast position through the feast and pledge beats', () => {
    for (const t of [T_FEAST + 1, T_PLEDGE]) {
      const pose = davidCovenantPose(t);
      expect(pose.x).toBeCloseTo(DAVID_FEAST_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_FEAST_POS[1], 5);
    }
  });

  it('holds at the gate, watching, at and after the close — no dread staging, no continued travel', () => {
    const atClose = davidCovenantPose(T_CLOSE);
    const atEnd = davidCovenantPose(DURATION_SEC);
    expect(atClose.x).toBeCloseTo(ARRIVAL_MEET_POS[0], 5);
    expect(atClose.z).toBeCloseTo(ARRIVAL_MEET_POS[1], 5);
    expect(atEnd.x).toBeCloseTo(atClose.x, 5);
    expect(atEnd.z).toBeCloseTo(atClose.z, 5);
  });
});
