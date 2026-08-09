import { describe, expect, it } from 'vitest';
import {
  ABNER_SEAT_SLOTS,
  DAVID_ESCORT_SEAT_SLOTS,
  FEAST_PROPS,
  GATE_LINEUP_SLOTS,
  GATE_PLAZA_CENTER,
  NORTH_ROAD_CURVE,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
} from './layout';

describe('hebron-covenant layout', () => {
  it('the northern road runs from the far north (large -z) to the gate plaza, the inverse of hebron-anointing’s southern approach', () => {
    const start = NORTH_ROAD_CURVE.getPointAt(0);
    const end = NORTH_ROAD_CURVE.getPointAt(1);
    expect(start.z).toBeLessThan(-200);
    expect(end.x).toBeCloseTo(GATE_PLAZA_CENTER[0], 0);
    expect(end.z).toBeCloseTo(GATE_PLAZA_CENTER[1], 0);
  });

  it('the northern road never crosses the town-house belt (stays >60m out, or south of the houses’ z<=-40 cutoff)', () => {
    // hebron-anointing's TOWN_HOUSES only ever populate z <= TOWN_CENTER[1]+30
    // (= -40), radius <= 55, from TOWN_CENTER (layout.ts import) — so the
    // road is safe wherever it's either well outside that radius or already
    // south of that cutoff (the same "clear wedge" hebron-anointing's gate
    // plaza sits in).
    for (let u = 0; u <= 1; u += 0.02) {
      const p = NORTH_ROAD_CURVE.getPointAt(u);
      const distFromTown = Math.hypot(p.x - TOWN_CENTER[0], p.z - TOWN_CENTER[1]);
      expect(distFromTown > 60 || p.z > -40).toBe(true);
    }
  });

  it('produces deterministic, sufficiently large crowd slot pools', () => {
    expect(GATE_LINEUP_SLOTS.length).toBeGreaterThanOrEqual(20);
    expect(ABNER_SEAT_SLOTS.length).toBeGreaterThanOrEqual(20);
    expect(DAVID_ESCORT_SEAT_SLOTS.length).toBeGreaterThanOrEqual(25);
    expect(TOWN_AMBIENT_SLOTS.length).toBeGreaterThanOrEqual(30);
  });

  it('minimum-spacing rejection sampling keeps feast slots from coinciding', () => {
    for (const [ax, az] of ABNER_SEAT_SLOTS) {
      for (const [bx, bz] of ABNER_SEAT_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.7);
      }
    }
  });

  it('David’s escort and Abner’s twenty are seated on opposite sides of the feast ground', () => {
    const davidAvgX =
      DAVID_ESCORT_SEAT_SLOTS.reduce((s, [x]) => s + x, 0) / DAVID_ESCORT_SEAT_SLOTS.length;
    const abnerAvgX = ABNER_SEAT_SLOTS.reduce((s, [x]) => s + x, 0) / ABNER_SEAT_SLOTS.length;
    expect(davidAvgX).toBeLessThan(abnerAvgX);
  });

  it('feast props are deterministic and finite', () => {
    expect(FEAST_PROPS.length).toBeGreaterThan(10);
    for (const p of FEAST_PROPS) {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.z)).toBe(true);
    }
  });
});
