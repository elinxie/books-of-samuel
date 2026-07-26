import { describe, expect, it } from 'vitest';
import {
  AMMAH_HILL_POS,
  buildChampionPairSlots,
  CHAMPIONS_PAIR_COUNT,
  HILL_BASE_SLOTS,
  HILL_BASE_U,
  HILL_TOP_SLOTS,
  ISRAEL_BANK_SLOTS,
  JUDAH_BANK_SLOTS,
  POOL_CENTER,
  samplePursuitPoint,
} from './layout';

describe('buildChampionPairSlots', () => {
  it('returns the literal text count (twelve pairs), each starting on its own bank', () => {
    const slots = buildChampionPairSlots();
    expect(slots.length).toBe(CHAMPIONS_PAIR_COUNT);
    expect(slots.length).toBe(12);
    for (const s of slots) {
      expect(s.benjStart[1]).toBeLessThan(0);
      expect(s.judStart[1]).toBeGreaterThan(0);
      // Both meet close to the pool center line, not still back at the bank.
      expect(Math.abs(s.benjMeet[1])).toBeLessThan(Math.abs(s.benjStart[1]));
      expect(Math.abs(s.judMeet[1])).toBeLessThan(Math.abs(s.judStart[1]));
    }
  });

  it('is deterministic for a given seed', () => {
    expect(buildChampionPairSlots(12, 7)).toEqual(buildChampionPairSlots(12, 7));
  });
});

describe('bank slots', () => {
  it('Israel/Benjamin gathers on the north bank (negative z), Judah on the south (positive z)', () => {
    for (const [, z] of ISRAEL_BANK_SLOTS) expect(z).toBeLessThan(0);
    for (const [, z] of JUDAH_BANK_SLOTS) expect(z).toBeGreaterThan(0);
  });
});

describe('samplePursuitPoint / HILL_BASE_U', () => {
  it('starts near the pool-adjacent battlefield at u=0', () => {
    const p = samplePursuitPoint(0);
    expect(Math.hypot(p.x - POOL_CENTER[0], p.z - POOL_CENTER[1])).toBeLessThan(60);
  });

  it('reaches the hill of Ammah at u=1', () => {
    const p = samplePursuitPoint(1);
    expect(p.x).toBeCloseTo(AMMAH_HILL_POS[0], 0);
    expect(p.z).toBeCloseTo(AMMAH_HILL_POS[1], 0);
  });

  it('the hill-base cap (Joab/Abishai) sits short of the summit', () => {
    const base = samplePursuitPoint(HILL_BASE_U);
    const summit = samplePursuitPoint(1);
    const dist = Math.hypot(base.x - summit.x, base.z - summit.z);
    expect(dist).toBeGreaterThan(10);
  });

  it('clamps outside [0,1]', () => {
    const below = samplePursuitPoint(-1);
    const at0 = samplePursuitPoint(0);
    expect(below.x).toBeCloseTo(at0.x, 4);
    const above = samplePursuitPoint(2);
    const at1 = samplePursuitPoint(1);
    expect(above.x).toBeCloseTo(at1.x, 4);
  });
});

describe('hill slots', () => {
  it('HILL_TOP_SLOTS cluster tightly around the summit (Abner rallies here)', () => {
    for (const [x, z] of HILL_TOP_SLOTS) {
      expect(Math.hypot(x - AMMAH_HILL_POS[0], z - AMMAH_HILL_POS[1])).toBeLessThan(25);
    }
  });

  it('HILL_BASE_SLOTS cluster around the base, distinctly short of the summit (Joab halts here)', () => {
    const summit = samplePursuitPoint(1);
    for (const [x, z] of HILL_BASE_SLOTS) {
      const distToSummit = Math.hypot(x - summit.x, z - summit.z);
      expect(distToSummit).toBeGreaterThan(10);
    }
  });
});
