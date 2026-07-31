import { describe, expect, it } from 'vitest';
import {
  AMMAH_HILL_CENTER,
  AMMAH_BAND_SLOTS,
  AMMAH_PURSUER_SLOTS,
  ASAHEL_DEATH_U,
  CHAMPION_PAIR_COUNT,
  CHAMPION_PAIR_SLOTS,
  ISRAEL_BANK_CENTER,
  ISRAEL_CONTINGENT_SLOTS,
  JUDAH_BANK_CENTER,
  JUDAH_CONTINGENT_SLOTS,
  POOL_CENTER,
  pursuitPointAt,
} from './layout';

describe('champion pairs', () => {
  it('renders exactly twelve pairs (twenty-four figures), the text’s own number', () => {
    expect(CHAMPION_PAIR_SLOTS.length).toBe(CHAMPION_PAIR_COUNT);
    expect(CHAMPION_PAIR_COUNT).toBe(12);
  });

  it('each pair faces its opponent across a short, closeable gap', () => {
    for (const pair of CHAMPION_PAIR_SLOTS) {
      expect(pair.benjamin.x).toBeLessThan(pair.judah.x);
      // Roughly facing each other (opposite yaw sense).
      expect(Math.sign(Math.sin(pair.benjamin.yaw))).not.toBe(Math.sign(Math.sin(pair.judah.yaw)));
      const gap = pair.judah.x - pair.benjamin.x;
      expect(gap).toBeGreaterThan(0);
      expect(gap).toBeLessThan(4);
    }
  });

  it('pairs are spread along z, not stacked on one point', () => {
    const zs = CHAMPION_PAIR_SLOTS.map((p) => p.benjamin.z);
    expect(Math.max(...zs) - Math.min(...zs)).toBeGreaterThan(20);
  });
});

describe('bank contingents', () => {
  it('Israel contingent slots cluster around the north bank', () => {
    for (const [x, z] of ISRAEL_CONTINGENT_SLOTS.slice(0, 45)) {
      expect(Math.hypot(x - ISRAEL_BANK_CENTER[0], z - ISRAEL_BANK_CENTER[1])).toBeLessThan(35);
    }
  });

  it('Judah contingent slots cluster around the south bank', () => {
    for (const [x, z] of JUDAH_CONTINGENT_SLOTS.slice(0, 40)) {
      expect(Math.hypot(x - JUDAH_BANK_CENTER[0], z - JUDAH_BANK_CENTER[1])).toBeLessThan(33);
    }
  });

  it('the two banks sit on opposite sides of the pool (2:13)', () => {
    expect(ISRAEL_BANK_CENTER[1]).toBeLessThan(POOL_CENTER[1]);
    expect(JUDAH_BANK_CENTER[1]).toBeGreaterThan(POOL_CENTER[1]);
  });
});

describe('the hill of Ammah', () => {
  it('the rallying band sits at the hill center, the pursuer halt short of it', () => {
    for (const [x, z] of AMMAH_BAND_SLOTS) {
      expect(Math.hypot(x - AMMAH_HILL_CENTER[0], z - AMMAH_HILL_CENTER[1])).toBeLessThan(20);
    }
    const pursuerDistFromHill = AMMAH_PURSUER_SLOTS.map(([x, z]) =>
      Math.hypot(x - AMMAH_HILL_CENTER[0], z - AMMAH_HILL_CENTER[1]),
    );
    // Pursuers stay outside the band's own tight radius — below the hill,
    // not on top of it (brief's deliberate visual irony).
    expect(Math.min(...pursuerDistFromHill)).toBeGreaterThan(10);
  });
});

describe('pursuit route', () => {
  it('starts at the Israel bank and ends at the hill of Ammah', () => {
    const start = pursuitPointAt(0);
    const end = pursuitPointAt(1);
    expect(start.x).toBeCloseTo(ISRAEL_BANK_CENTER[0], 0);
    expect(start.z).toBeCloseTo(ISRAEL_BANK_CENTER[1], 0);
    expect(end.x).toBeCloseTo(AMMAH_HILL_CENTER[0], 0);
    expect(end.z).toBeCloseTo(AMMAH_HILL_CENTER[1], 0);
  });

  it('moves monotonically away from the pool (increasing distance)', () => {
    const distances = [0, 0.25, 0.5, 0.75, 1].map((u) => {
      const p = pursuitPointAt(u);
      return Math.hypot(p.x - POOL_CENTER[0], p.z - POOL_CENTER[1]);
    });
    for (let i = 1; i < distances.length; i++) {
      expect(distances[i]).toBeGreaterThan(distances[i - 1]);
    }
  });

  it('Asahel’s death point sits well short of the hill, distinct ground from the pool', () => {
    const deathPoint = pursuitPointAt(ASAHEL_DEATH_U);
    const distFromPool = Math.hypot(deathPoint.x - POOL_CENTER[0], deathPoint.z - POOL_CENTER[1]);
    const distFromHill = Math.hypot(
      deathPoint.x - AMMAH_HILL_CENTER[0],
      deathPoint.z - AMMAH_HILL_CENTER[1],
    );
    expect(distFromPool).toBeGreaterThan(40);
    expect(distFromHill).toBeGreaterThan(40);
  });
});
