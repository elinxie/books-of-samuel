import { describe, expect, it } from 'vitest';
import { DAVID_PRINCIPAL_SEAT, NORTH_ROAD_END, NORTH_ROAD_START } from './layout';
import {
  abnerPartyFigurePose,
  abnerPrincipalPose,
  davidPrincipalPose,
  DURATION_SEC,
  FEAST_SEAT_DUR,
  T_ARRIVAL,
  T_CLOSE,
  T_DEPART_WALK,
  T_FEAST,
  T_PEACE,
  T_PLEDGE,
} from './poses';

const BASE_FIG = {
  laneOffset: 0,
  arriveStagger: 0,
  feastSlot: [10, -10] as [number, number],
  departStagger: 0,
};

describe('hebron-covenant poses', () => {
  it('sanity: beat times fall inside the scene duration, in order', () => {
    expect(T_CLOSE).toBeLessThanOrEqual(DURATION_SEC);
    expect(T_ARRIVAL).toBeLessThan(T_FEAST);
    expect(T_FEAST).toBeLessThan(T_PLEDGE);
    expect(T_PLEDGE).toBeLessThan(T_PEACE);
    expect(T_PEACE).toBeLessThan(T_CLOSE);
  });

  it('Abner’s men stay hidden before the scene’s own arrival beat (never staged before 3:20)', () => {
    const pose = abnerPartyFigurePose(0, BASE_FIG);
    expect(pose.visible).toBe(false);
    const pose2 = abnerPartyFigurePose(T_ARRIVAL - 0.1, BASE_FIG);
    expect(pose2.visible).toBe(false);
  });

  it('a figure walks the road during arrival and becomes visible', () => {
    const early = abnerPartyFigurePose(T_ARRIVAL + 1, BASE_FIG);
    expect(early.visible).toBe(true);
    // Close to the road's start, not yet at the gate plaza.
    expect(Math.hypot(early.x - NORTH_ROAD_START.x, early.z - NORTH_ROAD_START.z)).toBeLessThan(30);
  });

  it('settles at its own feast slot through the feast and pledge beats', () => {
    const [sx, sz] = BASE_FIG.feastSlot;
    const seated = abnerPartyFigurePose(T_PLEDGE, BASE_FIG);
    expect(seated.x).toBeCloseTo(sx, 5);
    expect(seated.z).toBeCloseTo(sz, 5);
  });

  it('leaves the feast slot after the peace beat and holds at the road’s far-north start by the close', () => {
    const departing = abnerPartyFigurePose(T_DEPART_WALK + 1, BASE_FIG);
    const [sx, sz] = BASE_FIG.feastSlot;
    expect(Math.hypot(departing.x - sx, departing.z - sz)).toBeGreaterThan(0.5);

    const atClose = abnerPartyFigurePose(T_CLOSE, BASE_FIG);
    expect(atClose.x).toBeCloseTo(NORTH_ROAD_START.x, 3);
    expect(atClose.z).toBeCloseTo(NORTH_ROAD_START.z, 3);
    expect(atClose.visible).toBe(true);
  });

  it('per-figure stagger delays arrival without changing the destination slot', () => {
    const staggered = { ...BASE_FIG, arriveStagger: 6 };
    expect(abnerPartyFigurePose(T_ARRIVAL + 1, staggered).visible).toBe(false);
    const seated = abnerPartyFigurePose(T_PLEDGE, staggered);
    expect(seated.x).toBeCloseTo(BASE_FIG.feastSlot[0], 5);
    expect(seated.z).toBeCloseTo(BASE_FIG.feastSlot[1], 5);
  });

  it('Abner’s pledge gesture envelope is zero outside its window and positive inside it', () => {
    expect(abnerPrincipalPose(T_PLEDGE - 5).pledge).toBe(0);
    expect(abnerPrincipalPose(T_PLEDGE + 3).pledge).toBeGreaterThan(0.5);
    expect(abnerPrincipalPose(T_PEACE - 0.5).pledge).toBeCloseTo(0, 1);
  });

  it('Abner leads his men in — arrives at the gate-plaza end of the road slightly ahead of the walk beat’s end', () => {
    const nearArrival = abnerPrincipalPose(T_ARRIVAL + 18);
    expect(
      Math.hypot(nearArrival.x - NORTH_ROAD_END.x, nearArrival.z - NORTH_ROAD_END.z),
    ).toBeLessThan(40);
  });

  it('David stays fixed at his own seat the whole scene — only his facing changes', () => {
    for (const t of [0, T_ARRIVAL, T_FEAST, T_PLEDGE, T_PEACE, T_CLOSE]) {
      const pose = davidPrincipalPose(t);
      expect(pose.x).toBeCloseTo(DAVID_PRINCIPAL_SEAT[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_PRINCIPAL_SEAT[1], 5);
    }
  });

  it('David turns toward the road for the arrival, toward Abner for the feast, and back to the road for the departure', () => {
    // +10s (past the 6s turn duration) so the turn envelope is fully settled.
    const arrivalYaw = davidPrincipalPose(T_ARRIVAL + 10).yaw;
    const feastYaw = davidPrincipalPose(T_PLEDGE).yaw;
    const peaceYaw = davidPrincipalPose(T_CLOSE).yaw;
    expect(Math.abs(arrivalYaw - feastYaw)).toBeGreaterThan(0.03);
    expect(peaceYaw).toBeCloseTo(arrivalYaw, 4);
  });

  it('feast seating transition finishes before the pledge beat begins', () => {
    expect(T_FEAST + FEAST_SEAT_DUR).toBeLessThan(T_PLEDGE);
  });
});
