import { describe, expect, it } from 'vitest';
import {
  ABNER_FEAST_SLOTS,
  DAVID_ESCORT_SLOTS,
  FEAST_GROUND_CENTER,
  FEAST_PROP_SLOTS,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  RECEPTION_POS,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
} from './layout';

describe('hebron-covenant layout', () => {
  it('reuses hebron-anointing town/gate-plaza constants verbatim (hard continuity rule)', () => {
    expect(TOWN_CENTER).toEqual([0, -70]);
    expect(GATE_PLAZA_CENTER).toEqual([0, -14]);
    expect(RECEPTION_POS).toEqual(GATE_PLAZA_CENTER);
  });

  it('the feast ground sits on distinct ground from the reception point', () => {
    const dist = Math.hypot(
      FEAST_GROUND_CENTER[0] - RECEPTION_POS[0],
      FEAST_GROUND_CENTER[1] - RECEPTION_POS[1],
    );
    expect(dist).toBeGreaterThan(15);
  });

  it('the northern road runs from deep north (large negative z) to the reception point', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    expect(start.z).toBeLessThan(-250);
    expect(end.x).toBeCloseTo(RECEPTION_POS[0], 3);
    expect(end.z).toBeCloseTo(RECEPTION_POS[1], 3);
  });

  it('keeps three distinct crowd slot pools at their target scales (brief: never conflate them)', () => {
    // Abner's twenty men, literal count, no ratio — buffer pool >= 20.
    expect(ABNER_FEAST_SLOTS.length).toBeGreaterThanOrEqual(20);
    // David's escort, disclosed ~15-25 design count.
    expect(DAVID_ESCORT_SLOTS.length).toBeGreaterThanOrEqual(25);
    // Ambient townspeople, disclosed ~20-30 design count.
    expect(TOWN_AMBIENT_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps town-ambient slots from coinciding', () => {
    for (const [ax, az] of TOWN_AMBIENT_SLOTS.slice(0, 30)) {
      for (const [bx, bz] of TOWN_AMBIENT_SLOTS.slice(0, 30)) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(2.3);
      }
    }
  });

  it('feast-prop slots stay near the feast ground, a small buffer pool', () => {
    expect(FEAST_PROP_SLOTS.length).toBeGreaterThanOrEqual(8);
    for (const [x, z] of FEAST_PROP_SLOTS) {
      const dist = Math.hypot(x - FEAST_GROUND_CENTER[0], z - FEAST_GROUND_CENTER[1]);
      expect(dist).toBeLessThan(15);
    }
  });
});
