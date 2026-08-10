import { describe, expect, it } from 'vitest';
import {
  ARABAH_ROAD_CURVE,
  ATTENDANT_SLOTS,
  BUNDLE_PROCESSION_CURVE,
  BUNDLE_REST_POS,
  EXECUTION_ROUTE_CURVE,
  NORTH_ROAD_CURVE,
  POOL_BANK_POS,
  POOL_CENTER,
  POOL_RADIUS,
  PRESENTATION_POS,
  TOMB_CENTER,
  TOWN_CENTER,
} from './layout';

describe('hebron-reckoning layout', () => {
  it('the Arabah road ends exactly at the presentation point', () => {
    const end = ARABAH_ROAD_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(PRESENTATION_POS[0], 5);
    expect(end.z).toBeCloseTo(PRESENTATION_POS[1], 5);
  });

  it('the Arabah road enters from a distinct exterior axis from the north road (hebron-covenant)', () => {
    const arabahStart = ARABAH_ROAD_CURVE.getPointAt(0);
    const northStart = NORTH_ROAD_CURVE.getPointAt(0);
    expect(Math.hypot(arabahStart.x - northStart.x, arabahStart.z - northStart.z)).toBeGreaterThan(
      200,
    );
  });

  it('the execution route ends outside the pool basin’s rim, not inside the depression', () => {
    const end = EXECUTION_ROUTE_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(POOL_BANK_POS[0], 5);
    expect(end.z).toBeCloseTo(POOL_BANK_POS[1], 5);
    const distFromPoolCenter = Math.hypot(end.x - POOL_CENTER[0], end.z - POOL_CENTER[1]);
    expect(distFromPoolCenter).toBeGreaterThan(POOL_RADIUS);
  });

  it('the bundle procession starts at its rest point and ends at the tomb of Abner — the same ground hebron-gate built', () => {
    const start = BUNDLE_PROCESSION_CURVE.getPointAt(0);
    const end = BUNDLE_PROCESSION_CURVE.getPointAt(1);
    expect(start.x).toBeCloseTo(BUNDLE_REST_POS[0], 5);
    expect(start.z).toBeCloseTo(BUNDLE_REST_POS[1], 5);
    expect(end.x).toBeCloseTo(TOMB_CENTER[0], 5);
    expect(end.z).toBeCloseTo(TOMB_CENTER[1], 5);
  });

  it('the pool sits clear of the town center — "near the town," not on top of its other staged ground', () => {
    const distFromTown = Math.hypot(
      POOL_CENTER[0] - TOWN_CENTER[0],
      POOL_CENTER[1] - TOWN_CENTER[1],
    );
    expect(distFromTown).toBeGreaterThan(60);
    expect(distFromTown).toBeLessThan(200);
  });

  it('provides an attendant pool large enough for the disclosed 8-14 design count at high tier', () => {
    expect(ATTENDANT_SLOTS.length).toBeGreaterThanOrEqual(14);
  });

  it('minimum-spacing rejection sampling keeps attendant slots from coinciding', () => {
    for (let i = 0; i < ATTENDANT_SLOTS.length; i++) {
      for (let j = i + 1; j < ATTENDANT_SLOTS.length; j++) {
        const [ax, az] = ATTENDANT_SLOTS[i];
        const [bx, bz] = ATTENDANT_SLOTS[j];
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.9);
      }
    }
  });
});
