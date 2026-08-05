import { describe, expect, it } from 'vitest';
import { ABNER_FEAST_POS, DAVID_FEAST_POS, NORTH_ROAD_CURVE, RECEPTION_POS } from './layout';
import {
  abnerPrincipalPose,
  davidPose,
  DURATION_SEC,
  partyMemberPose,
  pledgeGestureEnvelope,
  T_ARRIVAL,
  T_CLOSE,
  T_ELDERS,
  T_FEAST,
  T_LONG_WAR,
  T_PEACE,
  T_PLEDGE,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-covenant entry. The hardest invariants this
 * file guards: (1) Abner's party never appears at the feast slot before the
 * arrival march is underway, and never stays there past the peace beat; (2)
 * the pledge gesture only fires inside its own beat window; (3) David
 * returns to the reception point (never the feast ground) for the held
 * closing image, per the brief's "no dread staging" rule.
 */

const HEAD_FIGURE = { laneOffset: 0.5, feastSlot: ABNER_FEAST_POS as [number, number] };
const TAIL_FIGURE = { laneOffset: -1.8, feastSlot: ABNER_FEAST_POS as [number, number] };

describe('partyMemberPose', () => {
  it('sits at the road start during the context-card beats (no geometry beat)', () => {
    const roadStart = NORTH_ROAD_CURVE.getPointAt(0);
    for (const t of [T_LONG_WAR, T_ELDERS]) {
      const pose = partyMemberPose(t, HEAD_FIGURE);
      expect(pose.x).toBeCloseTo(roadStart.x + HEAD_FIGURE.laneOffset, 5);
      expect(pose.z).toBeCloseTo(roadStart.z, 5);
    }
  });

  it('is underway on the road during the arrival beat, for head and tail figures alike', () => {
    for (const fig of [HEAD_FIGURE, TAIL_FIGURE]) {
      const pose = partyMemberPose(T_ARRIVAL + 15, fig);
      const roadStart = NORTH_ROAD_CURVE.getPointAt(0);
      expect(pose.z).toBeGreaterThan(roadStart.z);
      expect(pose.z).toBeLessThan(RECEPTION_POS[1]);
    }
  });

  it('has settled at its feast slot by the feast beat and stays through the pledge beat', () => {
    for (const t of [T_FEAST, T_PLEDGE, T_PEACE - 1]) {
      const pose = partyMemberPose(t, HEAD_FIGURE);
      expect(pose.x).toBeCloseTo(HEAD_FIGURE.feastSlot[0], 5);
      expect(pose.z).toBeCloseTo(HEAD_FIGURE.feastSlot[1], 5);
    }
  });

  it('has left the feast slot and is receding up the road well into the peace beat', () => {
    const pose = partyMemberPose(T_CLOSE, HEAD_FIGURE);
    expect(pose.x === HEAD_FIGURE.feastSlot[0] && pose.z === HEAD_FIGURE.feastSlot[1]).toBe(false);
    // Receding: closer to the road's north end than the reception point.
    const distToReception = Math.hypot(pose.x - RECEPTION_POS[0], pose.z - RECEPTION_POS[1]);
    expect(distToReception).toBeGreaterThan(20);
  });

  it('never leaves DURATION_SEC before the scene actually closes (sanity on the timing constants)', () => {
    expect(T_CLOSE).toBeLessThanOrEqual(DURATION_SEC);
  });
});

describe('abnerPrincipalPose', () => {
  it('is seated at ABNER_FEAST_POS through the feast and pledge beats', () => {
    const pose = abnerPrincipalPose(T_PLEDGE);
    expect(pose.x).toBeCloseTo(ABNER_FEAST_POS[0], 5);
    expect(pose.z).toBeCloseTo(ABNER_FEAST_POS[1], 5);
  });
});

describe('pledgeGestureEnvelope', () => {
  it('is zero well before the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE - 20)).toBe(0);
  });

  it('rises during the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE + 1)).toBeGreaterThan(0.2);
  });

  it('fades back to zero well after the pledge beat', () => {
    expect(pledgeGestureEnvelope(T_PLEDGE + 20)).toBe(0);
  });
});

describe('davidPose', () => {
  it('stands at the reception point through the context-card and arrival beats', () => {
    for (const t of [T_LONG_WAR, T_ARRIVAL]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(RECEPTION_POS[0], 5);
      expect(pose.z).toBeCloseTo(RECEPTION_POS[1], 5);
    }
  });

  it('moves to the feast ground for the feast and pledge beats', () => {
    for (const t of [T_FEAST, T_PLEDGE]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_FEAST_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_FEAST_POS[1], 5);
    }
  });

  it('returns to, and holds at, the reception point for the peace/close beats — no dread staging', () => {
    const pose = davidPose(T_CLOSE);
    expect(pose.x).toBeCloseTo(RECEPTION_POS[0], 5);
    expect(pose.z).toBeCloseTo(RECEPTION_POS[1], 5);
  });
});
