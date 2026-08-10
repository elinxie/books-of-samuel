import { describe, expect, it } from 'vitest';
import { ABNER_FEAST_POS, NORTH_ROAD_CURVE } from './layout';
import {
  abnerPrincipalPose,
  davidPrincipalPose,
  partyFigurePose,
  pledgeEnvelope,
  T_ARRIVAL,
  T_FEAST,
  T_PEACE,
  T_PLEDGE,
  DURATION_SEC,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-covenant entry. The hardest invariant this
 * file guards: the departure (b-peace) never reverses before `T_PEACE`, and
 * never speeds up relative to the arrival — "he went in peace" must read as
 * steady and unhurried, per the brief.
 */

const CURVE_END = NORTH_ROAD_CURVE.getPointAt(1);

describe('partyFigurePose', () => {
  const fig = {
    arriveStagger: 0,
    departStagger: 0,
    laneOffset: 0,
    destSlot: [12, -18] as [number, number],
  };

  it('is walking in (on the road, not yet seated) during the arrival beat', () => {
    const pose = partyFigurePose(T_ARRIVAL, fig);
    expect(pose.seated).toBe(0);
  });

  it('reaches its feast slot and stays seated through the feast/pledge beats', () => {
    for (const t of [T_FEAST, T_PLEDGE]) {
      const pose = partyFigurePose(t, fig);
      expect(pose.x).toBeCloseTo(fig.destSlot[0], 4);
      expect(pose.z).toBeCloseTo(fig.destSlot[1], 4);
      expect(pose.seated).toBeCloseTo(1, 4);
    }
  });

  it('rises and returns toward the road well after being dismissed', () => {
    const risen = partyFigurePose(T_PEACE + 30, fig);
    expect(risen.seated).toBe(0);
    const stillAtSeat = Math.hypot(risen.x - fig.destSlot[0], risen.z - fig.destSlot[1]);
    expect(stillAtSeat).toBeGreaterThan(1);
  });

  it('never reverses direction before T_PEACE (the peace departure is not anticipated)', () => {
    const midFeast = partyFigurePose((T_FEAST + T_PLEDGE) / 2, fig);
    expect(midFeast.x).toBeCloseTo(fig.destSlot[0], 4);
    expect(midFeast.z).toBeCloseTo(fig.destSlot[1], 4);
  });

  it('is still visible (on the scene’s own road) at the end of the scene duration', () => {
    const atEnd = partyFigurePose(DURATION_SEC, fig);
    // Somewhere between the feast ground and the curve's far end — not
    // teleported, not vanished.
    const distFromEnd = Math.hypot(atEnd.x - CURVE_END.x, atEnd.z - CURVE_END.z);
    expect(distFromEnd).toBeGreaterThan(0);
  });
});

describe('abnerPrincipalPose', () => {
  it('settles at Abner’s own feast position by the feast beat', () => {
    const pose = abnerPrincipalPose(T_FEAST);
    expect(pose.x).toBeCloseTo(ABNER_FEAST_POS[0], 3);
    expect(pose.z).toBeCloseTo(ABNER_FEAST_POS[1], 3);
    expect(pose.seated).toBeCloseTo(1, 4);
  });

  it('the pledge gesture is zero well outside the pledge beat', () => {
    expect(abnerPrincipalPose(T_FEAST).pledge).toBe(0);
    expect(abnerPrincipalPose(T_PEACE + 20).pledge).toBe(0);
  });

  it('the pledge gesture rises during the pledge beat', () => {
    expect(abnerPrincipalPose(T_PLEDGE + 1).pledge).toBeGreaterThan(0.2);
  });
});

describe('davidPrincipalPose', () => {
  it('is standing (not seated) before the party is received', () => {
    expect(davidPrincipalPose(T_ARRIVAL).seated).toBe(0);
  });

  it('is seated with Abner through the feast and pledge beats', () => {
    expect(davidPrincipalPose(T_FEAST).seated).toBeGreaterThan(0.5);
    expect(davidPrincipalPose(T_PLEDGE).seated).toBeGreaterThan(0.5);
  });

  it('stands again well after the peace dismissal', () => {
    expect(davidPrincipalPose(T_PEACE + 20).seated).toBeCloseTo(0, 4);
  });

  it('turns from watching the road to facing Abner as the party settles', () => {
    const early = davidPrincipalPose(T_ARRIVAL).yaw;
    const late = davidPrincipalPose(T_FEAST).yaw;
    expect(late).not.toBeCloseTo(early, 2);
  });
});

describe('pledgeEnvelope', () => {
  it('is zero well before the pledge beat', () => {
    expect(pledgeEnvelope(T_PLEDGE - 20)).toBe(0);
  });

  it('fades back to zero well after the pledge beat', () => {
    expect(pledgeEnvelope(T_PLEDGE + 20)).toBe(0);
  });
});
