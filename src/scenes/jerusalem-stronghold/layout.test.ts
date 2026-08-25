import { describe, expect, it } from 'vitest';
import {
  AMBIENT_SETTLEMENT_SLOTS,
  APPROACH_CURVE,
  ASCENT_CURVE,
  DAVIDS_OCCUPY_SLOTS,
  ENCLOSURE_RADIUS,
  GATE_POSTS,
  GATE_X,
  GATE_Z,
  GIHON_CENTER,
  JEBUSITE_WALL_SLOTS,
  STRONGHOLD_CENTER,
  TERRACE_SEGMENTS,
  TYRIAN_CRAFTSMEN_SLOTS,
  WALL_RING_SEGMENTS,
} from './layout';

describe('jerusalem-stronghold layout', () => {
  it('the approach road ends exactly at the enclosure gate', () => {
    const end = APPROACH_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(GATE_X, 5);
    expect(end.z).toBeCloseTo(GATE_Z, 5);
  });

  it('the approach road starts far outside the ridge composition (a real approach, not a teleport)', () => {
    const start = APPROACH_CURVE.getPointAt(0);
    const distFromGate = Math.hypot(start.x - GATE_X, start.z - GATE_Z);
    expect(distFromGate).toBeGreaterThan(250);
  });

  it('the ascent curve is distinct geometry from the approach curve (never the same route)', () => {
    const ascentStart = ASCENT_CURVE.getPointAt(0);
    const approachStart = APPROACH_CURVE.getPointAt(0);
    const dist = Math.hypot(ascentStart.x - approachStart.x, ascentStart.z - approachStart.z);
    expect(dist).toBeGreaterThan(100);
  });

  it('the ascent curve runs from the Gihon spring to the stronghold center', () => {
    const start = ASCENT_CURVE.getPointAt(0);
    const end = ASCENT_CURVE.getPointAt(1);
    expect(start.x).toBeCloseTo(GIHON_CENTER[0], 5);
    expect(start.z).toBeCloseTo(GIHON_CENTER[1], 5);
    expect(end.x).toBeCloseTo(STRONGHOLD_CENTER[0], 5);
    expect(end.z).toBeCloseTo(STRONGHOLD_CENTER[1], 5);
  });

  it('the gate posts flank the gate gap, close to the enclosure radius', () => {
    for (const [x, z] of GATE_POSTS) {
      const d = Math.hypot(x - STRONGHOLD_CENTER[0], z - STRONGHOLD_CENTER[1]);
      expect(d).toBeGreaterThan(ENCLOSURE_RADIUS - 5);
      expect(d).toBeLessThan(ENCLOSURE_RADIUS + 6);
    }
  });

  it('every wall-ring segment sits at roughly the enclosure radius from the stronghold center', () => {
    for (const seg of WALL_RING_SEGMENTS) {
      const d = Math.hypot(seg.x - STRONGHOLD_CENTER[0], seg.z - STRONGHOLD_CENTER[1]);
      expect(d).toBeCloseTo(ENCLOSURE_RADIUS, 1);
    }
  });

  it('the wall ring leaves a real gap at the gate (no segment sits inside the gate arc)', () => {
    for (const seg of WALL_RING_SEGMENTS) {
      const dToGate = Math.hypot(seg.x - GATE_X, seg.z - GATE_Z);
      expect(dToGate).toBeGreaterThan(1);
    }
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // ~40-60 David's force, ~25-40 Jebusites, ~10-15 craftsmen, ~20-30 ambient.
    expect(DAVIDS_OCCUPY_SLOTS.length).toBeGreaterThanOrEqual(60);
    expect(JEBUSITE_WALL_SLOTS.length).toBeGreaterThanOrEqual(40);
    expect(TYRIAN_CRAFTSMEN_SLOTS.length).toBeGreaterThanOrEqual(12);
    expect(AMBIENT_SETTLEMENT_SLOTS.length).toBeGreaterThanOrEqual(25);
  });

  it('minimum-spacing rejection sampling keeps occupying slots from coinciding', () => {
    for (const [ax, az] of DAVIDS_OCCUPY_SLOTS) {
      for (const [bx, bz] of DAVIDS_OCCUPY_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.85);
      }
    }
  });

  it('Jebusite wall slots sit just outside the enclosure radius (on the wall, not inside it)', () => {
    for (const slot of JEBUSITE_WALL_SLOTS) {
      const d = Math.hypot(slot.x - STRONGHOLD_CENTER[0], slot.z - STRONGHOLD_CENTER[1]);
      expect(d).toBeGreaterThan(ENCLOSURE_RADIUS);
      expect(d).toBeLessThan(ENCLOSURE_RADIUS + 4);
    }
  });

  it('terrace segments sit east of the ridge crest, on the slope the Millo question is about', () => {
    for (const seg of TERRACE_SEGMENTS) {
      expect(seg.x).toBeGreaterThan(0);
    }
  });
});
