import { describe, expect, it } from 'vitest';
import {
  buildArcherSlots,
  buildDefenderSlots,
  buildEngagedInfantrySlots,
  buildInfantrySlots,
  buildPhilistinePrincipalSlots,
  buildRetinueSlots,
  buildRoutSlots,
} from './layout';

/**
 * Placement invariants for the Gilboa battlefield's figure groups (M3 Step
 * 2: count/grouping/positioning only). See "Focal masses" and "Scale
 * assumptions" in docs/design/gilboa-battle-brief.md — Philistines climb the
 * northern slope (negative z), the rout drains down the eastern slope
 * (positive x), the retinue clusters tight at the crest (near the origin).
 */

describe('buildRetinueSlots', () => {
  it('returns the requested count, clustered near the crest', () => {
    const slots = buildRetinueSlots(13);
    expect(slots.length).toBe(13);
    for (const s of slots) {
      expect(Math.hypot(s.x, s.z)).toBeLessThan(30);
    }
  });

  it('is deterministic for a given seed', () => {
    expect(buildRetinueSlots(10, 5)).toEqual(buildRetinueSlots(10, 5));
  });
});

describe('buildArcherSlots', () => {
  it('places the whole line on the northern (negative-z) slope', () => {
    const slots = buildArcherSlots(14);
    expect(slots.length).toBe(14);
    for (const s of slots) expect(s.z).toBeLessThan(0);
  });

  it('stays forward of (closer to the crest than) the infantry band', () => {
    const archers = buildArcherSlots(14);
    const infantry = buildInfantrySlots(45);
    const archerMinZ = Math.min(...archers.map((s) => s.z));
    const infantryMaxZ = Math.max(...infantry.map((s) => s.z));
    // The archer line's nearest point to the plain should not be deeper
    // than the infantry mass's nearest point to the crest.
    expect(archerMinZ).toBeGreaterThanOrEqual(-95);
    expect(infantryMaxZ).toBeGreaterThanOrEqual(archerMinZ - 40);
  });
});

describe('buildInfantrySlots', () => {
  it('returns the requested count on the northern slope', () => {
    const slots = buildInfantrySlots(45);
    expect(slots.length).toBe(45);
    for (const s of slots) expect(s.z).toBeLessThan(0);
  });
});

describe('buildPhilistinePrincipalSlots', () => {
  it('clusters a small group near the archer/infantry line', () => {
    const slots = buildPhilistinePrincipalSlots(5);
    expect(slots.length).toBe(5);
    for (const s of slots) {
      expect(s.z).toBeLessThan(0);
      expect(Math.hypot(s.x, s.z - -78)).toBeLessThan(15);
    }
  });
});

describe('buildDefenderSlots', () => {
  it('holds a close clash-front short of the crest', () => {
    const slots = buildDefenderSlots(30);
    expect(slots.length).toBe(30);
    for (const s of slots) {
      expect(s.z).toBeLessThan(0);
      expect(s.z).toBeGreaterThanOrEqual(-46);
      expect(s.z).toBeLessThanOrEqual(-40);
    }
  });

  it('is deterministic for a given seed', () => {
    expect(buildDefenderSlots(20, 7)).toEqual(buildDefenderSlots(20, 7));
  });
});

describe('buildEngagedInfantrySlots', () => {
  it('stages Philistines within weapon range of the defender front', () => {
    const defenders = buildDefenderSlots(30);
    const engaged = buildEngagedInfantrySlots(30);
    expect(engaged.length).toBe(30);
    for (const s of engaged) expect(s.z).toBeLessThan(0);

    const nearestDistances = engaged.map((p) =>
      Math.min(...defenders.map((d) => Math.hypot(d.x - p.x, d.z - p.z))),
    );
    expect(Math.max(...nearestDistances)).toBeLessThan(4.5);
    expect(
      Math.min(...engaged.map((p) => Math.min(...defenders.map((d) => p.z - d.z)))),
    ).toBeLessThan(0);
  });

  it('is deterministic for a given seed', () => {
    expect(buildEngagedInfantrySlots(20, 11)).toEqual(buildEngagedInfantrySlots(20, 11));
  });
});

describe('buildRoutSlots', () => {
  it('streams figures down the eastern (positive-x) slope', () => {
    const slots = buildRoutSlots(45);
    expect(slots.length).toBe(45);
    for (const s of slots) expect(s.x).toBeGreaterThan(0);
  });

  it('spreads figures across a range of distances down the slope', () => {
    const slots = buildRoutSlots(45);
    const xs = slots.map((s) => s.x);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(100);
  });

  it('is deterministic for a given seed', () => {
    expect(buildRoutSlots(20, 9)).toEqual(buildRoutSlots(20, 9));
  });
});
