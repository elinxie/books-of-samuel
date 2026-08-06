import { describe, expect, it } from 'vitest';
import { GATE_PLAZA_CENTER as ANOINTING_GATE_PLAZA_CENTER } from '../hebron-anointing/layout';
import {
  ABNER_MEN_SLOTS,
  DAVID_ESCORT_SLOTS,
  FEAST_GROUND_CENTER,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  roadPointAt,
  TOWN_BACKGROUND_SLOTS,
  TOWN_CENTER,
} from './layout';

describe('hebron-covenant layout', () => {
  it('reuses hebron-anointing’s gate plaza position exactly (continuity anchor)', () => {
    expect(GATE_PLAZA_CENTER).toEqual(ANOINTING_GATE_PLAZA_CENTER);
  });

  it('the northern road runs from deep in the north (large -z) to the gate plaza', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    expect(start.z).toBeLessThan(-250);
    expect(end.x).toBeCloseTo(GATE_PLAZA_CENTER[0], 0);
    expect(end.z).toBeCloseTo(GATE_PLAZA_CENTER[1], 0);
  });

  it('roadPointAt(0) and roadPointAt(1) match the curve’s own endpoints', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const p0 = roadPointAt(0);
    expect(p0.x).toBeCloseTo(start.x, 5);
    expect(p0.z).toBeCloseTo(start.z, 5);
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    const p1 = roadPointAt(1);
    expect(p1.x).toBeCloseTo(end.x, 5);
    expect(p1.z).toBeCloseTo(end.z, 5);
  });

  it('reverse yaw at a point faces the opposite direction from forward yaw', () => {
    const forward = roadPointAt(0.5, false);
    const reverse = roadPointAt(0.5, true);
    // Opposite headings differ by pi (mod 2pi); check via the cosine of the
    // difference rather than exact equality to avoid wrap-around brittleness.
    expect(Math.cos(forward.yaw - reverse.yaw)).toBeCloseTo(-1, 4);
  });

  it('the feast ground sits near, but is distinct from, the gate plaza', () => {
    const d = Math.hypot(
      FEAST_GROUND_CENTER[0] - GATE_PLAZA_CENTER[0],
      FEAST_GROUND_CENTER[1] - GATE_PLAZA_CENTER[1],
    );
    expect(d).toBeGreaterThan(15);
    expect(d).toBeLessThan(80);
  });

  it('renders Abner’s party literally 1:1 (twenty men’s slots, 2 Samuel 3:20)', () => {
    expect(ABNER_MEN_SLOTS.length).toBe(20);
  });

  it('David’s escort and the town background stay disclosed design counts, not literal counts', () => {
    expect(DAVID_ESCORT_SLOTS.length).toBeGreaterThanOrEqual(25);
    expect(TOWN_BACKGROUND_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps feast-ground slots from coinciding', () => {
    for (const [ax, az] of ABNER_MEN_SLOTS) {
      for (const [bx, bz] of ABNER_MEN_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.6);
      }
    }
  });

  it('town background slots scatter around the reused town center', () => {
    for (const [x, z] of TOWN_BACKGROUND_SLOTS) {
      expect(Math.hypot(x - TOWN_CENTER[0], z - TOWN_CENTER[1])).toBeLessThan(60);
    }
  });
});
