import { describe, expect, it } from 'vitest';
import {
  AMBIENT_DISTRIBUTION_SLOTS,
  ARRIVAL_CURVE,
  CONFRONTATION_POS,
  CONSTRUCTION_GROUND_CENTER,
  DANCE_GATHER_CENTER,
  DANCE_GATHER_SLOTS,
  DISTRIBUTION_CENTER,
  DISTRIBUTION_SLOTS,
  ENCLOSURE_RADIUS,
  GATE_X,
  GATE_Z,
  HOUSEHOLD_POS,
  OFFERING_GROUND_POS,
  STRONGHOLD_CENTER,
  TENT_POS,
  WINDOW_POS,
} from './layout';

function distFromCenter(p: [number, number]): number {
  return Math.hypot(p[0] - STRONGHOLD_CENTER[0], p[1] - STRONGHOLD_CENTER[1]);
}

describe('ark-into-jerusalem layout', () => {
  it('every new focal point sits inside the reused enclosure', () => {
    for (const p of [TENT_POS, OFFERING_GROUND_POS, DANCE_GATHER_CENTER, DISTRIBUTION_CENTER]) {
      expect(distFromCenter(p)).toBeLessThan(ENCLOSURE_RADIUS);
    }
    // The household room sits inside the enclosure too, with margin from the wall.
    expect(distFromCenter(HOUSEHOLD_POS)).toBeLessThan(ENCLOSURE_RADIUS - 1);
  });

  it('the tent and the offering ground are clearly distinct, non-overlapping points', () => {
    const d = Math.hypot(
      TENT_POS[0] - OFFERING_GROUND_POS[0],
      TENT_POS[1] - OFFERING_GROUND_POS[1],
    );
    expect(d).toBeGreaterThan(8);
  });

  it('the household room never overlaps the reused Hiram construction ground', () => {
    const d = Math.hypot(
      HOUSEHOLD_POS[0] - CONSTRUCTION_GROUND_CENTER[0],
      HOUSEHOLD_POS[1] - CONSTRUCTION_GROUND_CENTER[1],
    );
    expect(d).toBeGreaterThan(8);
  });

  it("Michal's window sits close to the household room, not floating free of it", () => {
    const d = Math.hypot(WINDOW_POS[0] - HOUSEHOLD_POS[0], WINDOW_POS[1] - HOUSEHOLD_POS[1]);
    expect(d).toBeLessThan(4);
  });

  it('the confrontation ground is close to the household, a short conversation-scale walk', () => {
    const d = Math.hypot(
      CONFRONTATION_POS[0] - HOUSEHOLD_POS[0],
      CONFRONTATION_POS[1] - HOUSEHOLD_POS[1],
    );
    expect(d).toBeGreaterThan(2);
    expect(d).toBeLessThan(12);
  });

  it('the arrival curve starts well south, off-composition, and ends at the dance-gather ground', () => {
    const start = ARRIVAL_CURVE.getPointAt(0);
    expect(start.z).toBeLessThan(-250);
    const end = ARRIVAL_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(DANCE_GATHER_CENTER[0], 5);
    expect(end.z).toBeCloseTo(DANCE_GATHER_CENTER[1], 5);
  });

  it('the arrival curve passes through the one reused gate', () => {
    let bestD = Infinity;
    for (let i = 0; i <= 240; i++) {
      const p = ARRIVAL_CURVE.getPointAt(i / 240);
      bestD = Math.min(bestD, Math.hypot(p.x - GATE_X, p.z - GATE_Z));
    }
    expect(bestD).toBeLessThan(2);
  });

  it('provides pools large enough for the disclosed design-choice crowds at high tier', () => {
    // Procession dance/distribution slots ~150-200 (claim-ark-procession-cast
    // -scale, reused); ambient distribution convergence slots ~20-30
    // (claim-ark-into-jerusalem-cast-scale).
    expect(DANCE_GATHER_SLOTS.length).toBeGreaterThanOrEqual(200);
    expect(DISTRIBUTION_SLOTS.length).toBeGreaterThanOrEqual(200);
    expect(AMBIENT_DISTRIBUTION_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps dance-gather slots from coinciding', () => {
    for (let i = 0; i < DANCE_GATHER_SLOTS.length; i++) {
      const [ax, az] = DANCE_GATHER_SLOTS[i];
      for (let j = i + 1; j < DANCE_GATHER_SLOTS.length; j++) {
        const [bx, bz] = DANCE_GATHER_SLOTS[j];
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.6);
      }
    }
  });
});
