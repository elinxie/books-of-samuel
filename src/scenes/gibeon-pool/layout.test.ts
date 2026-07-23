import { describe, expect, it } from 'vitest';
import {
  buildAmmahRallySlots,
  buildBattleSpreadSlots,
  buildBenjaminBankSlots,
  buildChampionPairSlots,
  buildJudahBankSlots,
  buildPursuersHaltSlots,
  PURSUIT_CURVE,
  samplePath,
} from './layout';

/**
 * Placement invariants for gibeon-pool's figure groups (see "Focal masses"
 * and "Scale assumptions" in docs/design/gibeon-pool-brief.md). Benjamin/
 * Abner sits west of the pool (negative x); Judah/Joab sits east (positive
 * x) — legible by grouping/position, never by an invented dress
 * distinction.
 */

describe('buildBenjaminBankSlots / buildJudahBankSlots', () => {
  it('seat the two companies on opposite sides of the pool', () => {
    const benjamin = buildBenjaminBankSlots(20);
    const judah = buildJudahBankSlots(20);
    expect(benjamin.length).toBe(20);
    expect(judah.length).toBe(20);
    for (const s of benjamin) expect(s.x).toBeLessThan(0);
    for (const s of judah) expect(s.x).toBeGreaterThan(0);
  });

  it('is deterministic for a given seed', () => {
    expect(buildBenjaminBankSlots(15, 5)).toEqual(buildBenjaminBankSlots(15, 5));
    expect(buildJudahBankSlots(15, 5)).toEqual(buildJudahBankSlots(15, 5));
  });
});

describe('buildChampionPairSlots', () => {
  it('returns the text’s exact count — twelve pairs, twenty-four figures', () => {
    const pairs = buildChampionPairSlots(12);
    expect(pairs.length).toBe(12);
  });

  it('each pair starts on opposite sides of the meeting line and shares one x', () => {
    const pairs = buildChampionPairSlots(12);
    for (const pair of pairs) {
      expect(pair.benjaminStart.z).toBeLessThan(pair.judahStart.z);
      expect(pair.benjaminStart.x).toBeCloseTo(pair.meetX, 5);
      expect(pair.judahStart.x).toBeCloseTo(pair.meetX, 5);
    }
  });

  it('is deterministic for a given seed', () => {
    expect(buildChampionPairSlots(12, 9)).toEqual(buildChampionPairSlots(12, 9));
  });
});

describe('buildBattleSpreadSlots', () => {
  it('biases each side toward its own half of the field, overlapping near the center', () => {
    const benjamin = buildBattleSpreadSlots(60, 'benjamin', 1);
    const judah = buildBattleSpreadSlots(60, 'judah', 2);
    const benjaminMeanX = benjamin.reduce((s, f) => s + f.x, 0) / benjamin.length;
    const judahMeanX = judah.reduce((s, f) => s + f.x, 0) / judah.length;
    expect(benjaminMeanX).toBeLessThan(0);
    expect(judahMeanX).toBeGreaterThan(0);
  });
});

describe('PURSUIT_CURVE / samplePath', () => {
  it('runs away from the pool (increasing z) as u increases', () => {
    const start = samplePath(PURSUIT_CURVE, 0);
    const mid = samplePath(PURSUIT_CURVE, 0.5);
    const end = samplePath(PURSUIT_CURVE, 1);
    expect(mid.z).toBeGreaterThan(start.z);
    expect(end.z).toBeGreaterThan(mid.z);
  });

  it('clamps u to [0, 1]', () => {
    const under = samplePath(PURSUIT_CURVE, -1);
    const atStart = samplePath(PURSUIT_CURVE, 0);
    const over = samplePath(PURSUIT_CURVE, 2);
    const atEnd = samplePath(PURSUIT_CURVE, 1);
    expect(under.x).toBeCloseTo(atStart.x, 5);
    expect(over.x).toBeCloseTo(atEnd.x, 5);
  });
});

describe('buildAmmahRallySlots', () => {
  it('returns the requested count, clustered on the hill', () => {
    const slots = buildAmmahRallySlots(14);
    expect(slots.length).toBe(14);
  });

  it('is deterministic for a given seed', () => {
    expect(buildAmmahRallySlots(14, 3)).toEqual(buildAmmahRallySlots(14, 3));
  });
});

describe('buildPursuersHaltSlots', () => {
  it('gathers below the hill of Ammah, near the pursuit route’s end', () => {
    const slots = buildPursuersHaltSlots(20);
    const end = samplePath(PURSUIT_CURVE, 1);
    for (const s of slots) {
      expect(Math.hypot(s.x - end.x, s.z - end.z)).toBeLessThan(30);
    }
  });
});
