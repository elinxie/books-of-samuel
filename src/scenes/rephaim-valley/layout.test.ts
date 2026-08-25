import { describe, expect, it } from 'vitest';
import {
  ADVANCE_ROUTE_CURVE,
  DAVIDS_RIM_SLOTS,
  ENGAGE_TWO_ROUTE_CURVE,
  FLANK_ROUTE_CURVE,
  GROVE_WAIT_POS,
  PHILISTINE_SPREAD_SLOTS,
  RIM_EDGE,
} from './layout';

describe('rephaim-valley layout', () => {
  it('both the advance and the flanking routes step off from the same rim edge', () => {
    const advStart = ADVANCE_ROUTE_CURVE.getPointAt(0);
    const flankStart = FLANK_ROUTE_CURVE.getPointAt(0);
    expect(advStart.x).toBeCloseTo(RIM_EDGE[0], 5);
    expect(advStart.z).toBeCloseTo(RIM_EDGE[1], 5);
    expect(flankStart.x).toBeCloseTo(RIM_EDGE[0], 5);
    expect(flankStart.z).toBeCloseTo(RIM_EDGE[1], 5);
  });

  it('the flanking route ends at the grove wait position, which the second-engagement route starts from', () => {
    const flankEnd = FLANK_ROUTE_CURVE.getPointAt(1);
    expect(flankEnd.x).toBeCloseTo(GROVE_WAIT_POS[0], 5);
    expect(flankEnd.z).toBeCloseTo(GROVE_WAIT_POS[1], 5);

    const engage2Start = ENGAGE_TWO_ROUTE_CURVE.getPointAt(0);
    expect(engage2Start.x).toBeCloseTo(GROVE_WAIT_POS[0], 5);
    expect(engage2Start.z).toBeCloseTo(GROVE_WAIT_POS[1], 5);
  });

  it('the flanking route actually circles wide of the direct advance route (a real detour, not a shortcut)', () => {
    // Sample the flanking route's midpoint and confirm it lies well off the
    // straight line the advance route takes — "circle around" per 5:23b.
    const mid = FLANK_ROUTE_CURVE.getPointAt(0.5);
    const advEnd = ADVANCE_ROUTE_CURVE.getPointAt(1);
    const distFromAdvanceEnd = Math.hypot(mid.x - advEnd.x, mid.z - advEnd.z);
    expect(distFromAdvanceEnd).toBeGreaterThan(80);
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // ~55-70 Philistines, ~45-60 David's force.
    expect(PHILISTINE_SPREAD_SLOTS.length).toBeGreaterThanOrEqual(70);
    expect(DAVIDS_RIM_SLOTS.length).toBeGreaterThanOrEqual(60);
  });

  it('minimum-spacing rejection sampling keeps Philistine spread slots from coinciding', () => {
    for (let i = 0; i < PHILISTINE_SPREAD_SLOTS.length; i++) {
      const [ax, az] = PHILISTINE_SPREAD_SLOTS[i];
      for (let j = i + 1; j < PHILISTINE_SPREAD_SLOTS.length; j++) {
        const [bx, bz] = PHILISTINE_SPREAD_SLOTS[j];
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(4);
      }
    }
  });

  it('the Philistine spread is wide and loose (elongated footprint), not a tight block', () => {
    const xs = PHILISTINE_SPREAD_SLOTS.map(([x]) => x);
    const zs = PHILISTINE_SPREAD_SLOTS.map(([, z]) => z);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanZ = Math.max(...zs) - Math.min(...zs);
    expect(spanX).toBeGreaterThan(80);
    expect(spanZ).toBeGreaterThan(40);
  });
});
