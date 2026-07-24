import { describe, expect, it } from 'vitest';
import {
  AMMAH_HILL_CENTER,
  buildAbnerSpreadSlots,
  buildAmmahHillSlots,
  buildChampionPairSlots,
  buildIsraelBankSlots,
  buildJoabSpreadSlots,
  buildJudahBankSlots,
  CHAMPIONS_COUNT,
  ISRAEL_BANK_Z,
  JUDAH_BANK_Z,
  POOL_CENTER,
  POOL_RADIUS,
} from './layout';

describe('gibeon-pool layout', () => {
  it('is deterministic for a given seed', () => {
    const a = buildIsraelBankSlots(40);
    const b = buildIsraelBankSlots(40);
    expect(a).toEqual(b);
  });

  it('seats Abner’s company on the Israel bank (z > 0) and Joab’s on the Judah bank (z < 0)', () => {
    for (const slot of buildIsraelBankSlots(20)) expect(slot.z).toBeGreaterThan(0);
    for (const slot of buildJudahBankSlots(20)) expect(slot.z).toBeLessThan(0);
  });

  it('keeps both banks outside the pool basin radius', () => {
    for (const slot of [...buildIsraelBankSlots(15), ...buildJudahBankSlots(15)]) {
      const d = Math.hypot(slot.x - POOL_CENTER[0], slot.z - POOL_CENTER[1]);
      expect(d).toBeGreaterThan(POOL_RADIUS);
    }
  });

  it('bank z stays on the correct side of the centerline (grouping, not an invented kit)', () => {
    expect(Math.min(...buildIsraelBankSlots(20).map((s) => s.z))).toBeGreaterThan(
      ISRAEL_BANK_Z - 20,
    );
    expect(Math.max(...buildJudahBankSlots(20).map((s) => s.z))).toBeLessThan(JUDAH_BANK_Z + 20);
  });

  it('builds exactly twelve champion pairs (24 figures, the text’s own count)', () => {
    const pairs = buildChampionPairSlots();
    expect(pairs.length).toBe(CHAMPIONS_COUNT);
    expect(pairs.length * 2).toBe(24);
  });

  it('each champion pair is close together (a grapple), Israel/Judah distinguished only by which side of the pair they stand', () => {
    for (const pair of buildChampionPairSlots()) {
      const dist = Math.hypot(pair.israel.x - pair.judah.x, pair.israel.z - pair.judah.z);
      expect(dist).toBeLessThan(2);
      expect(pair.israel.x).toBeLessThan(pair.judah.x);
    }
  });

  it('spreads Abner’s contingent north of the centerline and Joab’s south of it', () => {
    for (const slot of buildAbnerSpreadSlots(30)) expect(slot.z).toBeGreaterThan(0);
    for (const slot of buildJoabSpreadSlots(30)) expect(slot.z).toBeLessThan(0);
  });

  it('places the Ammah hill band within a modest radius of the hill center', () => {
    for (const slot of buildAmmahHillSlots(15)) {
      const d = Math.hypot(slot.x - AMMAH_HILL_CENTER[0], slot.z - AMMAH_HILL_CENTER[1]);
      expect(d).toBeLessThan(25);
    }
  });
});
