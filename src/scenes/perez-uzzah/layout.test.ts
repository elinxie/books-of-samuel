import { describe, expect, it } from 'vitest';
import {
  COLUMN_GATHER_SLOTS,
  COLUMN_SETTLE_SLOTS,
  KIRIATH_JEARIM_AMBIENT_SLOTS,
  OBED_EDOM_HOUSEHOLD_SLOTS,
  OBED_EDOM_POS,
  ROUTE_CURVE,
  ROUTE_START,
  THRESHING_FLOOR_POS,
  THRESHING_FLOOR_U,
} from './layout';

describe('perez-uzzah layout', () => {
  it('the route curve starts at the departure point and ends at the diversion point', () => {
    const start = ROUTE_CURVE.getPointAt(0);
    expect(start.x).toBeCloseTo(ROUTE_START[0], 5);
    expect(start.z).toBeCloseTo(ROUTE_START[1], 5);

    const end = ROUTE_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(OBED_EDOM_POS[0], 5);
    expect(end.z).toBeCloseTo(OBED_EDOM_POS[1], 5);
  });

  it('THRESHING_FLOOR_U lands on (or very near) the threshing floor point', () => {
    expect(THRESHING_FLOOR_U).toBeGreaterThan(0);
    expect(THRESHING_FLOOR_U).toBeLessThan(1);
    const p = ROUTE_CURVE.getPointAt(THRESHING_FLOOR_U);
    const dist = Math.hypot(p.x - THRESHING_FLOOR_POS[0], p.z - THRESHING_FLOOR_POS[1]);
    expect(dist).toBeLessThan(2);
  });

  it('the threshing floor sits strictly between the departure and diversion points along the route', () => {
    // "on the way" (6:6) — not at either end.
    expect(THRESHING_FLOOR_U).toBeGreaterThan(0.15);
    expect(THRESHING_FLOOR_U).toBeLessThan(0.85);
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // Marching column ~150-200, ambient Kiriath-jearim ~10-20, Obed-edom's
    // household ~5-10 (claim-ark-procession-cast-scale).
    expect(COLUMN_GATHER_SLOTS.length).toBeGreaterThanOrEqual(200);
    expect(COLUMN_SETTLE_SLOTS.length).toBeGreaterThanOrEqual(200);
    expect(KIRIATH_JEARIM_AMBIENT_SLOTS.length).toBeGreaterThanOrEqual(20);
    expect(OBED_EDOM_HOUSEHOLD_SLOTS.length).toBeGreaterThanOrEqual(10);
  });

  it('minimum-spacing rejection sampling keeps column gather slots from coinciding', () => {
    for (let i = 0; i < COLUMN_GATHER_SLOTS.length; i++) {
      const [ax, az] = COLUMN_GATHER_SLOTS[i];
      for (let j = i + 1; j < COLUMN_GATHER_SLOTS.length; j++) {
        const [bx, bz] = COLUMN_GATHER_SLOTS[j];
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.8);
      }
    }
  });

  it("Obed-edom's household slots sit close around the house, distinct from the column's settle ground", () => {
    for (const [x, z] of OBED_EDOM_HOUSEHOLD_SLOTS) {
      expect(Math.hypot(x - OBED_EDOM_POS[0], z - OBED_EDOM_POS[1])).toBeLessThan(20);
    }
  });
});
