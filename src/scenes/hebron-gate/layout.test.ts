import { describe, expect, it } from 'vitest';
import {
  ABNER_RETURN_GATE_U,
  ASIDE_POINT,
  GATE_PASSAGE_INNER_Z,
  GATE_PASSAGE_OUTER_Z,
  GATE_PLAZA_CENTER,
  GATE_WAIT_POS,
  MOURNING_GATHER_SLOTS,
  MOURNING_TOMB_SLOTS,
  NORTH_ROAD_CURVE,
  PROCESSION_ROUTE_CURVE,
  RAID_PARTY_SLOTS,
  RAID_ROAD_CURVE,
  TOMB_CENTER,
  TOWN_CENTER,
  TOWN_HOUSES,
} from './layout';

describe('hebron-gate layout', () => {
  it('reuses hebron-anointing’s town houses (continuity, not a re-invented town)', () => {
    expect(TOWN_HOUSES.length).toBeGreaterThan(8);
  });

  it('the aside point sits inside the gate passage interior, between the outer and inner threshold', () => {
    expect(ASIDE_POINT[1]).toBeLessThan(GATE_PASSAGE_OUTER_Z);
    expect(ASIDE_POINT[1]).toBeGreaterThan(GATE_PASSAGE_INNER_Z);
  });

  it('the aside point is off the corridor centerline (an aside must actually go aside)', () => {
    expect(Math.abs(ASIDE_POINT[0])).toBeGreaterThan(1);
  });

  it('Joab waits outside the gate’s outer threshold, not already inside', () => {
    expect(GATE_WAIT_POS[1]).toBeGreaterThan(GATE_PASSAGE_OUTER_Z);
  });

  it('Abner’s return re-enters the composition close to the same gate plaza he departed from', () => {
    const p = NORTH_ROAD_CURVE.getPointAt(ABNER_RETURN_GATE_U);
    const d = Math.hypot(p.x - GATE_PLAZA_CENTER[0], p.z - GATE_PLAZA_CENTER[1]);
    expect(d).toBeLessThan(5);
  });

  it('the raid road enters from a distinct exterior axis from Abner’s north road', () => {
    const raidStart = RAID_ROAD_CURVE.getPointAt(0);
    const northStart = NORTH_ROAD_CURVE.getPointAt(0);
    expect(Math.hypot(raidStart.x - northStart.x, raidStart.z - northStart.z)).toBeGreaterThan(200);
  });

  it('the procession route ends at the tomb ground, on the hill’s flank away from the town houses', () => {
    const end = PROCESSION_ROUTE_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(TOMB_CENTER[0], 5);
    expect(end.z).toBeCloseTo(TOMB_CENTER[1], 5);
    const distFromTown = Math.hypot(
      TOMB_CENTER[0] - TOWN_CENTER[0],
      TOMB_CENTER[1] - TOWN_CENTER[1],
    );
    expect(distFromTown).toBeGreaterThan(50);
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // ~15-25 raid party, ~60-90 mourning assembly (brief's "Scale assumptions").
    expect(RAID_PARTY_SLOTS.length).toBeGreaterThanOrEqual(25);
    expect(MOURNING_GATHER_SLOTS.length).toBeGreaterThanOrEqual(90);
    expect(MOURNING_TOMB_SLOTS.length).toBeGreaterThanOrEqual(90);
  });

  it('the mourning gather and tomb slot pools are the same size (one continuous per-figure journey)', () => {
    expect(MOURNING_TOMB_SLOTS.length).toBe(MOURNING_GATHER_SLOTS.length);
  });

  it('minimum-spacing rejection sampling keeps mourning slots from coinciding', () => {
    for (let i = 0; i < MOURNING_GATHER_SLOTS.length; i++) {
      for (let j = i + 1; j < MOURNING_GATHER_SLOTS.length; j++) {
        const [ax, az] = MOURNING_GATHER_SLOTS[i];
        const [bx, bz] = MOURNING_GATHER_SLOTS[j];
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(2.0);
      }
    }
  });
});
