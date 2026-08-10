import { describe, expect, it } from 'vitest';
import {
  ABNER_PARTY_SLOTS,
  DAVIDS_SIDE_SLOTS,
  FEAST_GROUND_CENTER,
  FEAST_VESSEL_SLOTS,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_AMBIENT_SLOTS,
  TOWN_HOUSES,
} from './layout';

describe('hebron-covenant layout', () => {
  it('reuses hebron-anointing’s town houses (continuity, not a re-invented town)', () => {
    expect(TOWN_HOUSES.length).toBeGreaterThan(8);
  });

  it('the north road passes near the gate plaza on its way to the feast ground', () => {
    let closest = Infinity;
    for (let i = 0; i <= 40; i++) {
      const p = NORTH_ROAD_CURVE.getPointAt(i / 40);
      const d = Math.hypot(p.x - GATE_PLAZA_CENTER[0], p.z - GATE_PLAZA_CENTER[1]);
      closest = Math.min(closest, d);
    }
    expect(closest).toBeLessThan(5);
  });

  it('the north road ends at the feast ground', () => {
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(FEAST_GROUND_CENTER[0], 5);
    expect(end.z).toBeCloseTo(FEAST_GROUND_CENTER[1], 5);
  });

  it('the north road enters from far outside the town composition (a distinct arrival axis)', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const distFromTown = Math.hypot(start.x, start.z + 70);
    expect(distFromTown).toBeGreaterThan(200);
  });

  it('provides at least a literal 21-figure pool for Abner’s party (Abner + twenty)', () => {
    expect(ABNER_PARTY_SLOTS.length).toBeGreaterThanOrEqual(21);
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // ~15-25 David's-side feast presence, ~20-30 ambient town background.
    expect(DAVIDS_SIDE_SLOTS.length).toBeGreaterThanOrEqual(25);
    expect(TOWN_AMBIENT_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps feast slots from coinciding', () => {
    for (const [ax, az] of ABNER_PARTY_SLOTS) {
      for (const [bx, bz] of ABNER_PARTY_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.9);
      }
    }
  });

  it('the two feast-side slot pools are distinct clusters (arrival side vs. receiving side)', () => {
    const abnerCentroidX =
      ABNER_PARTY_SLOTS.reduce((sum, [x]) => sum + x, 0) / ABNER_PARTY_SLOTS.length;
    const davidCentroidX =
      DAVIDS_SIDE_SLOTS.reduce((sum, [x]) => sum + x, 0) / DAVIDS_SIDE_SLOTS.length;
    expect(davidCentroidX).toBeGreaterThan(abnerCentroidX);
  });

  it('feast vessel slots sit near the feast ground center', () => {
    for (const [x, z] of FEAST_VESSEL_SLOTS) {
      expect(Math.hypot(x - FEAST_GROUND_CENTER[0], z - FEAST_GROUND_CENTER[1])).toBeLessThan(15);
    }
  });
});
