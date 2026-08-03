import { describe, expect, it } from 'vitest';
import {
  ABNER_BANK_CENTER,
  buildAbnerBankSlots,
  buildAbnerSpreadSlots,
  buildAmmahRallySlots,
  buildChampionPairSlots,
  buildJoabBankSlots,
  buildJoabSpreadSlots,
  buildPursuerBaseSlots,
  CHAMPION_PAIR_COUNT,
  DEATH_POINT,
  DEATH_ROUTE_U,
  JOAB_BANK_CENTER,
  POOL_CENTER,
  POOL_RADIUS,
  pursuitPointAt,
  PURSUIT_ROUTE_CURVE,
} from './layout';

describe('champion pair slots (2:14-16, twelve a side)', () => {
  const pairs = buildChampionPairSlots();

  it('renders exactly twelve pairs', () => {
    expect(pairs.length).toBe(CHAMPION_PAIR_COUNT);
  });

  it('each pair starts symmetric across the pool axis and meets at its midpoint', () => {
    for (const pair of pairs) {
      expect(pair.benjaminStart[1]).toBeLessThan(0);
      expect(pair.judahStart[1]).toBeGreaterThan(0);
      expect(pair.meet[1]).toBe(0);
      expect(pair.benjaminStart[0]).toBe(pair.x);
      expect(pair.judahStart[0]).toBe(pair.x);
    }
  });
});

describe('bank slots (b-arrival, 2:13)', () => {
  it("Abner's company gathers on the negative-z bank, Joab's on the positive-z bank", () => {
    expect(ABNER_BANK_CENTER[1]).toBeLessThan(0);
    expect(JOAB_BANK_CENTER[1]).toBeGreaterThan(0);
    for (const [, z] of buildAbnerBankSlots(20)) expect(z).toBeLessThan(0);
    for (const [, z] of buildJoabBankSlots(20)) expect(z).toBeGreaterThan(0);
  });

  it('produces the requested count with no duplicate coordinates', () => {
    const slots = buildAbnerBankSlots(15);
    expect(slots.length).toBe(15);
    const unique = new Set(slots.map(([x, z]) => `${x.toFixed(3)},${z.toFixed(3)}`));
    expect(unique.size).toBe(15);
  });
});

describe('battle-spread slots stay clear of the pool footprint', () => {
  it('no Abner-side or Joab-side spread slot lands inside the pool + margin', () => {
    const margin = POOL_RADIUS + 4;
    for (const [x, z] of [...buildAbnerSpreadSlots(40), ...buildJoabSpreadSlots(40)]) {
      const d = Math.hypot(x - POOL_CENTER[0], z - POOL_CENTER[1]);
      expect(d).toBeGreaterThanOrEqual(margin - 0.01);
    }
  });
});

describe('the pursuit route and the death point', () => {
  it('starts and ends at the curve control points', () => {
    const start = pursuitPointAt(0);
    const end = pursuitPointAt(1);
    const curveStart = PURSUIT_ROUTE_CURVE.getPointAt(0);
    const curveEnd = PURSUIT_ROUTE_CURVE.getPointAt(1);
    expect(start.x).toBeCloseTo(curveStart.x, 5);
    expect(start.z).toBeCloseTo(curveStart.z, 5);
    expect(end.x).toBeCloseTo(curveEnd.x, 5);
    expect(end.z).toBeCloseTo(curveEnd.z, 5);
  });

  it('clamps out-of-range fractions', () => {
    expect(pursuitPointAt(-1)).toEqual(pursuitPointAt(0));
    expect(pursuitPointAt(2)).toEqual(pursuitPointAt(1));
  });

  it('the death point sits at DEATH_ROUTE_U along the route, not at either end', () => {
    const expected = pursuitPointAt(DEATH_ROUTE_U);
    expect(DEATH_POINT.x).toBeCloseTo(expected.x, 5);
    expect(DEATH_POINT.z).toBeCloseTo(expected.z, 5);
    expect(DEATH_ROUTE_U).toBeGreaterThan(0);
    expect(DEATH_ROUTE_U).toBeLessThan(1);
  });
});

describe('the hill of Ammah rally/pursuer slots', () => {
  it('produces the requested counts', () => {
    expect(buildAmmahRallySlots(14).length).toBe(14);
    expect(buildPursuerBaseSlots(12).length).toBe(12);
  });
});
