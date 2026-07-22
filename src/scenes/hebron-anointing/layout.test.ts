import { describe, expect, it } from 'vitest';
import {
  APPROACH_CURVE,
  ASSEMBLY_SLOTS,
  HOUSEHOLD_CAMP_CENTERS,
  HOUSEHOLD_SLOTS,
  MESSENGER_ROAD_CURVE,
  RETINUE_SLOTS,
  TERRACE_SEGMENTS,
  TOWN_HOUSES,
} from './layout';

describe('hebron-anointing layout', () => {
  it('produces deterministic town house placements', () => {
    expect(TOWN_HOUSES.length).toBeGreaterThan(8);
    for (const h of TOWN_HOUSES) {
      expect(Number.isFinite(h.x)).toBe(true);
      expect(Number.isFinite(h.z)).toBe(true);
    }
  });

  it('keeps three distinct crowd slot pools at their target scales (brief: never conflate them)', () => {
    // David's ~600 men, standard ~1:10 ratio -> up to ~72 at high tier;
    // buffer pool is larger than any quality tier will draw from.
    expect(RETINUE_SLOTS.length).toBeGreaterThanOrEqual(72);
    // Household column, disclosed ~40-50 design choice.
    expect(HOUSEHOLD_SLOTS.length).toBeGreaterThanOrEqual(50);
    // The representative Judah assembly, target ~150-200 at high tier.
    expect(ASSEMBLY_SLOTS.length).toBeGreaterThanOrEqual(200);
  });

  it('minimum-spacing rejection sampling keeps slots from coinciding', () => {
    for (const [ax, az] of ASSEMBLY_SLOTS.slice(0, 40)) {
      for (const [bx, bz] of ASSEMBLY_SLOTS.slice(0, 40)) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.9);
      }
    }
  });

  it('household slots split across both satellite camp centers', () => {
    const half = HOUSEHOLD_SLOTS.length / 2;
    const firstHalfNearWest = HOUSEHOLD_SLOTS.slice(0, half).every(
      ([x, z]) =>
        Math.hypot(x - HOUSEHOLD_CAMP_CENTERS[0][0], z - HOUSEHOLD_CAMP_CENTERS[0][1]) < 30,
    );
    const secondHalfNearEast = HOUSEHOLD_SLOTS.slice(half).every(
      ([x, z]) =>
        Math.hypot(x - HOUSEHOLD_CAMP_CENTERS[1][0], z - HOUSEHOLD_CAMP_CENTERS[1][1]) < 30,
    );
    expect(firstHalfNearWest).toBe(true);
    expect(secondHalfNearEast).toBe(true);
  });

  it('terrace segments stay on the town-hill-facing (south) flank', () => {
    expect(TERRACE_SEGMENTS.length).toBeGreaterThan(20);
  });

  it('the approach curve runs from the south (large +z) to the gate plaza (near z=-14)', () => {
    const start = APPROACH_CURVE.getPointAt(0);
    const end = APPROACH_CURVE.getPointAt(1);
    expect(start.z).toBeGreaterThan(200);
    expect(end.z).toBeCloseTo(-14, 0);
  });

  it('the messenger road runs from the plaza east/outward, never toward Jabesh geometry', () => {
    const start = MESSENGER_ROAD_CURVE.getPointAt(0);
    const end = MESSENGER_ROAD_CURVE.getPointAt(1);
    expect(end.x).toBeGreaterThan(start.x + 250);
  });
});
