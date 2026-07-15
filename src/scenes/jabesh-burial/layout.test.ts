import { describe, expect, it } from 'vitest';
import {
  distanceToChannel,
  GRAVE_POS,
  HOUSES,
  PYRE_BIER_SLOTS,
  PYRE_GATHER_SLOTS,
  PYRE_POS,
  RECEPTION_BIER_SLOTS,
  RECEPTION_CENTER,
  RETRIEVAL_ARRIVAL_SLOTS,
  TAMARISK_GATHER_SLOTS,
  TAMARISK_POS,
  VILLAGE_CENTER,
  VILLAGE_YARD_SLOTS,
} from './layout';

/**
 * Placement invariants for Jabesh-gilead's scene-local layout (ADR-006: a
 * fresh generator — a small, open, unwalled hamlet cluster, distinct from
 * both Ziklag's enclosed ring and Beth-shan's dense tell quarter).
 */

describe('HOUSES', () => {
  it('produces a hamlet-scale cluster (8-12 structures)', () => {
    expect(HOUSES.length).toBeGreaterThanOrEqual(8);
    expect(HOUSES.length).toBeLessThanOrEqual(12);
  });

  it('keeps a clear open yard at the village center', () => {
    for (const h of HOUSES) {
      expect(Math.hypot(h.x - VILLAGE_CENTER[0], h.z - VILLAGE_CENTER[1])).toBeGreaterThanOrEqual(
        16,
      );
    }
  });

  it('is loosely spaced (open cluster, not a dense quarter)', () => {
    for (const a of HOUSES) {
      const closest = HOUSES.filter((b) => a !== b).reduce(
        (min, b) => Math.min(min, Math.hypot(a.x - b.x, a.z - b.z)),
        Infinity,
      );
      expect(closest).toBeGreaterThanOrEqual(10.9);
    }
  });

  it('is deterministic', () => {
    expect(HOUSES.map((h) => [h.x, h.z])).toEqual(HOUSES.map((h) => [h.x, h.z]));
  });
});

describe('reception and pyre bier slots', () => {
  it('places exactly four bier slots at reception and at the pyre', () => {
    expect(RECEPTION_BIER_SLOTS.length).toBe(4);
    expect(PYRE_BIER_SLOTS.length).toBe(4);
  });

  it('reception slots are centered on RECEPTION_CENTER', () => {
    const meanX = RECEPTION_BIER_SLOTS.reduce((s, [x]) => s + x, 0) / 4;
    expect(meanX).toBeCloseTo(RECEPTION_CENTER[0], 1);
  });

  it('pyre bier slots are centered on PYRE_POS', () => {
    const meanX = PYRE_BIER_SLOTS.reduce((s, [x]) => s + x, 0) / 4;
    expect(meanX).toBeCloseTo(PYRE_POS[0], 1);
  });
});

describe('crowd gathering slot pools', () => {
  it('village yard slots sit close to the village center', () => {
    expect(VILLAGE_YARD_SLOTS.length).toBeGreaterThan(20);
    for (const [x, z] of VILLAGE_YARD_SLOTS) {
      expect(Math.hypot(x - VILLAGE_CENTER[0], z - VILLAGE_CENTER[1])).toBeLessThan(16);
    }
  });

  it('pyre-gather slots hold documentary distance from the pyre ground', () => {
    expect(PYRE_GATHER_SLOTS.length).toBeGreaterThan(20);
    for (const [x, z] of PYRE_GATHER_SLOTS) {
      const d = Math.hypot(x - PYRE_POS[0], z - PYRE_POS[1]);
      expect(d).toBeGreaterThanOrEqual(12);
      expect(d).toBeLessThan(28);
    }
  });

  it('tamarisk-gather slots cluster around the tamarisk', () => {
    expect(TAMARISK_GATHER_SLOTS.length).toBeGreaterThan(20);
    for (const [x, z] of TAMARISK_GATHER_SLOTS) {
      expect(Math.hypot(x - TAMARISK_POS[0], z - TAMARISK_POS[1])).toBeLessThan(23);
    }
  });

  it('retrieval-arrival slots cluster near the reception point', () => {
    expect(RETRIEVAL_ARRIVAL_SLOTS.length).toBeGreaterThan(5);
    for (const [x, z] of RETRIEVAL_ARRIVAL_SLOTS) {
      expect(Math.hypot(x - (RECEPTION_CENTER[0] - 9), z - (RECEPTION_CENTER[1] - 6))).toBeLessThan(
        10,
      );
    }
  });

  it('minimum spacing holds within each pool (no overlapping slots)', () => {
    for (const [x, z] of VILLAGE_YARD_SLOTS) {
      const close = VILLAGE_YARD_SLOTS.filter(
        ([ox, oz]) => ox !== x && oz !== z && Math.hypot(ox - x, oz - z) < 1.95,
      );
      expect(close.length).toBe(0);
    }
  });
});

describe('distanceToChannel', () => {
  it('is zero-ish on the channel centerline and grows with distance from it', () => {
    const onLine = distanceToChannel(-190, -50);
    const farAway = distanceToChannel(-190, 250);
    expect(onLine).toBeLessThan(5);
    expect(farAway).toBeGreaterThan(onLine);
  });
});

describe('grave position', () => {
  it('sits near the tamarisk', () => {
    expect(Math.hypot(GRAVE_POS[0] - TAMARISK_POS[0], GRAVE_POS[1] - TAMARISK_POS[1])).toBeLessThan(
      6,
    );
  });
});
