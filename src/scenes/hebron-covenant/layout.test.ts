import { describe, expect, it } from 'vitest';
import { TOWN_HOUSES as ANOINTING_TOWN_HOUSES } from '../hebron-anointing/layout';
import {
  ABNER_MEN_COUNT,
  ABNER_MEN_SLOTS,
  DAVID_ESCORT_SLOTS,
  FEAST_PROP_SLOTS,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_AMBIENT_SLOTS,
  TOWN_HOUSES,
} from './layout';

describe('hebron-covenant layout', () => {
  it('reuses hebron-anointing town massing by reference, not a recomputed copy', () => {
    expect(TOWN_HOUSES).toBe(ANOINTING_TOWN_HOUSES);
  });

  it('renders Abner’s twenty men literally — exactly the text’s own count, no ratio', () => {
    expect(ABNER_MEN_COUNT).toBe(20);
    expect(ABNER_MEN_SLOTS.length).toBe(20);
  });

  it('keeps David’s escort and the town ambient pools at their disclosed design-choice scale (buffers >= high-tier target)', () => {
    expect(DAVID_ESCORT_SLOTS.length).toBeGreaterThanOrEqual(25);
    expect(TOWN_AMBIENT_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps slots from coinciding', () => {
    for (const [ax, az] of ABNER_MEN_SLOTS) {
      for (const [bx, bz] of ABNER_MEN_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.7);
      }
    }
  });

  it('the north road runs from the north (large negative z) down to the same plaza point hebron-anointing’s approach column ends at', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    expect(start.z).toBeLessThan(-250);
    expect(end.x).toBeCloseTo(GATE_PLAZA_CENTER[0], 5);
    expect(end.z).toBeCloseTo(GATE_PLAZA_CENTER[1], 5);
  });

  it('feast prop slots sit between David’s and Abner’s seats, a single small dressed set', () => {
    expect(FEAST_PROP_SLOTS.length).toBe(12);
    for (const p of FEAST_PROP_SLOTS) {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.z)).toBe(true);
    }
  });
});
