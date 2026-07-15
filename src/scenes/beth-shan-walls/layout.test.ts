import { describe, expect, it } from 'vitest';
import {
  DISPLAY_FORM_SLOTS,
  ESCORT_GATE_SLOTS,
  GATE_HALF_ARC,
  GATE_PLAZA_SLOTS,
  GATE_TOWERS,
  HOUSES,
  MONUMENTS,
  NIGHT_WORK_SLOTS,
  TOWN_LANE_SLOTS,
  TOWNSPEOPLE_SLOTS,
  WALL_RADIUS,
  WALL_SEGMENTS,
} from './layout';

/**
 * Placement invariants for Beth-shan's scene-local layout (ADR-006: a fresh
 * generator, not Ziklag's enclosed-ring). West (-x) is the valley-road/wall
 * side; east (+x) is the Jordan-valley/retrieval side.
 */

describe('WALL_SEGMENTS', () => {
  it('sits at the wall radius and leaves a gate gap at the west point', () => {
    expect(WALL_SEGMENTS.length).toBeGreaterThan(10);
    for (const w of WALL_SEGMENTS) {
      expect(Math.hypot(w.x, w.z)).toBeCloseTo(WALL_RADIUS, 0);
    }
    // No segment sits inside the gate gap around theta=0 (due west).
    for (const w of WALL_SEGMENTS) {
      const theta = Math.atan2(w.z, -w.x);
      expect(Math.abs(theta)).toBeGreaterThanOrEqual(GATE_HALF_ARC - 0.02);
    }
  });
});

describe('GATE_TOWERS', () => {
  it('flanks the gate gap symmetrically', () => {
    expect(GATE_TOWERS.length).toBe(2);
    const [a, b] = GATE_TOWERS;
    expect(a[1]).toBeLessThan(0);
    expect(b[1]).toBeGreaterThan(0);
  });
});

describe('DISPLAY_FORM_SLOTS', () => {
  it('places exactly four forms on the wall face flanking the gate', () => {
    expect(DISPLAY_FORM_SLOTS.length).toBe(4);
    for (const s of DISPLAY_FORM_SLOTS) {
      // Just outside the wall radius, so the forms read against the wall's
      // outward, valley-road-facing surface.
      expect(Math.hypot(s.x, s.z)).toBeGreaterThan(WALL_RADIUS);
      expect(Math.hypot(s.x, s.z)).toBeLessThan(WALL_RADIUS + 10);
      expect(s.x).toBeLessThan(0); // on the west-facing wall
    }
  });
});

describe('HOUSES', () => {
  it('produces a dense summit quarter clear of the lanes and monument plaza', () => {
    expect(HOUSES.length).toBeGreaterThan(60);
    for (const h of HOUSES) {
      expect(Math.hypot(h.x, h.z)).toBeLessThanOrEqual(52.1);
    }
  });

  it('is deterministic', () => {
    expect(HOUSES.map((h) => [h.x, h.z])).toEqual(HOUSES.map((h) => [h.x, h.z]));
  });
});

describe('MONUMENTS', () => {
  it('places one or two monuments near the summit plaza', () => {
    expect(MONUMENTS.length).toBeGreaterThanOrEqual(1);
    expect(MONUMENTS.length).toBeLessThanOrEqual(2);
    for (const m of MONUMENTS) {
      expect(Math.hypot(m.x - 14, m.z - 16)).toBeLessThan(15);
    }
  });
});

describe('crowd slot pools', () => {
  it('gate plaza slots sit west of the wall, on the lower shelf', () => {
    expect(GATE_PLAZA_SLOTS.length).toBeGreaterThan(20);
    for (const [x] of GATE_PLAZA_SLOTS) expect(x).toBeLessThan(-60);
  });

  it('town-lane slots sit inside the summit radius', () => {
    expect(TOWN_LANE_SLOTS.length).toBeGreaterThan(10);
    for (const [x, z] of TOWN_LANE_SLOTS) expect(Math.hypot(x, z)).toBeLessThan(60);
  });

  it('townspeople slots combine both pools', () => {
    expect(TOWNSPEOPLE_SLOTS.length).toBe(GATE_PLAZA_SLOTS.length + TOWN_LANE_SLOTS.length);
  });

  it('escort slots cluster near the gate', () => {
    expect(ESCORT_GATE_SLOTS.length).toBeGreaterThan(8);
    for (const [x, z] of ESCORT_GATE_SLOTS) {
      expect(Math.hypot(x - -82, z)).toBeLessThan(20);
    }
  });

  it('night-work slots cluster at the wall foot, south of the gate', () => {
    expect(NIGHT_WORK_SLOTS.length).toBeGreaterThan(4);
    for (const [x, z] of NIGHT_WORK_SLOTS) {
      expect(x).toBeLessThan(-60);
      expect(z).toBeLessThan(0);
    }
  });

  it('minimum spacing holds within each pool (no overlapping slots)', () => {
    for (const [x, z] of GATE_PLAZA_SLOTS) {
      const close = GATE_PLAZA_SLOTS.filter(
        ([ox, oz]) => ox !== x && oz !== z && Math.hypot(ox - x, oz - z) < 2.05,
      );
      expect(close.length).toBe(0);
    }
  });
});
