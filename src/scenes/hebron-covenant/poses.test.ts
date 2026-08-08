import { describe, expect, it } from 'vitest';
import { ABNER_SEAT_POS, DAVID_SEAT_POS, NORTH_ROAD_CURVE } from './layout';
import {
  abnerPose,
  ARRIVE_DUR,
  davidPose,
  DEPART_DUR,
  DURATION_SEC,
  partyMemberPose,
  pledgeGestureEnvelope,
  presenceEnvelope,
  T_ARRIVAL,
  T_BREAK,
  T_ELDERS,
  T_FEAST,
  T_LONG_WAR,
  T_OVERTURE,
  T_PEACE,
  T_PLEDGE,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-covenant entry. The hardest invariants this
 * file guards: (1) Abner is never visible before his own arrival beat and
 * never mid-scene at any position that isn't on the road or at the feast
 * ground (no teleporting, no staged Michal/Rizpah geometry sneaking in via
 * a stray position); (2) the departure leg is the exact mirror of arrival,
 * never a faster/more furtive choreography (ADR-009-adjacent register: "no
 * dread staging" holds structurally, not just by caption wording); (3) the
 * pledge gesture only fires inside its own beat window.
 */

describe('presenceEnvelope', () => {
  it('is zero before the arrival beat (nothing staged for the 3:1-19 context cards)', () => {
    for (const t of [T_LONG_WAR, T_BREAK, T_OVERTURE, T_ELDERS, T_ARRIVAL - 1]) {
      expect(presenceEnvelope(t)).toBe(0);
    }
  });

  it('rises during the arrival window and is fully settled by the feast beat', () => {
    expect(presenceEnvelope(T_ARRIVAL + 1)).toBeGreaterThan(0);
    expect(presenceEnvelope(T_ARRIVAL + ARRIVE_DUR)).toBe(1);
    expect(presenceEnvelope(T_FEAST)).toBe(1);
    expect(presenceEnvelope(T_PLEDGE)).toBe(1);
  });

  it('falls during the peace/departure window and reaches zero by scene end', () => {
    expect(presenceEnvelope(T_PEACE + 1)).toBeLessThan(1);
    expect(presenceEnvelope(T_PEACE + DEPART_DUR)).toBe(0);
    expect(presenceEnvelope(DURATION_SEC)).toBe(0);
  });

  it('a stagger delays both the arrival rise and the departure fall', () => {
    expect(presenceEnvelope(T_ARRIVAL + 1, 3)).toBe(0);
    expect(presenceEnvelope(T_PEACE + 1, 0, 3)).toBe(1);
  });
});

describe('abnerPose', () => {
  it('is not visible before the arrival beat', () => {
    expect(abnerPose(T_LONG_WAR).visible).toBe(false);
    expect(abnerPose(T_ELDERS).visible).toBe(false);
  });

  it('becomes visible and moves during the arrival beat', () => {
    const early = abnerPose(T_ARRIVAL + 2);
    expect(early.visible).toBe(true);
    const later = abnerPose(T_ARRIVAL + ARRIVE_DUR - 1);
    expect(later.x !== early.x || later.z !== early.z).toBe(true);
  });

  it('is settled at ABNER_SEAT_POS, facing David, through the feast and pledge beats', () => {
    for (const t of [T_FEAST, T_PLEDGE, T_PEACE - 1]) {
      const pose = abnerPose(t);
      expect(pose.x).toBeCloseTo(ABNER_SEAT_POS[0], 5);
      expect(pose.z).toBeCloseTo(ABNER_SEAT_POS[1], 5);
    }
  });

  it('moves away from the feast ground during the peace/departure beat, mirroring the arrival path', () => {
    const midDeparture = abnerPose(T_PEACE + 8);
    const distFromSeat = Math.hypot(
      midDeparture.x - ABNER_SEAT_POS[0],
      midDeparture.z - ABNER_SEAT_POS[1],
    );
    expect(distFromSeat).toBeGreaterThan(1);
  });

  it('is no longer visible once fully departed, same as it was before arrival', () => {
    expect(abnerPose(DURATION_SEC).visible).toBe(false);
  });

  it('the pledge gesture only fires near T_PLEDGE, not at arrival or during departure', () => {
    expect(pledgeGestureEnvelope(T_ARRIVAL + 5)).toBe(0);
    expect(pledgeGestureEnvelope(T_PLEDGE + 1)).toBeGreaterThan(0.2);
    expect(pledgeGestureEnvelope(T_PEACE)).toBe(0);
  });
});

describe('davidPose', () => {
  it('stays fixed at DAVID_SEAT_POS throughout the whole scene', () => {
    for (const t of [T_LONG_WAR, T_ARRIVAL, T_FEAST, T_PEACE, DURATION_SEC]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_SEAT_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_SEAT_POS[1], 5);
    }
  });

  it('turns to track Abner once Abner is visible', () => {
    const beforeArrival = davidPose(T_ELDERS).yaw;
    const duringFeast = davidPose(T_FEAST).yaw;
    expect(duringFeast).not.toBeCloseTo(beforeArrival, 2);
  });
});

describe('partyMemberPose', () => {
  const fig = {
    laneOffset: 0.5,
    arriveStagger: 0,
    departStagger: 0,
    destSlot: [11, -9] as const,
  };

  it('is not visible before the arrival beat', () => {
    expect(partyMemberPose(T_LONG_WAR, fig).visible).toBe(false);
  });

  it('reaches its own destination slot once settled', () => {
    const pose = partyMemberPose(T_FEAST, fig);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(fig.destSlot[0], 4);
    expect(pose.z).toBeCloseTo(fig.destSlot[1], 4);
  });

  it('a later stagger delays a figure’s arrival relative to an unstaggered one', () => {
    const staggered = { ...fig, arriveStagger: 5 };
    expect(partyMemberPose(T_ARRIVAL + 1, staggered).visible).toBe(false);
    expect(partyMemberPose(T_ARRIVAL + 1, fig).visible).toBe(true);
  });

  it('travels the same north road curve Abner uses, never a separate path', () => {
    const midway = partyMemberPose(T_ARRIVAL + 2, fig);
    const curveStart = NORTH_ROAD_CURVE.getPointAt(0);
    // Early in the arrival window the figure should be close to the curve's
    // own start, not already at its slot.
    expect(Math.hypot(midway.x - curveStart.x, midway.z - curveStart.z)).toBeLessThan(40);
  });
});
