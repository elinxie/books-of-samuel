import { describe, expect, it } from 'vitest';
import {
  DAVID_PLAZA_POS as GATE_DAVID_PLAZA_POS,
  TOMB_POS as GATE_TOMB_POS,
  TOWN_HOUSES as GATE_TOWN_HOUSES,
} from '../hebron-gate/layout';
import {
  ARABAH_ROAD_CURVE,
  ATTENDANT_SLOTS,
  DAVID_PLAZA_POS,
  EXECUTION_GROUND,
  POOL_CENTER,
  POOL_RADIUS,
  TOMB_POS,
  TOWN_CENTER,
  TOWN_HOUSES,
} from './layout';

describe('hebron-reckoning layout', () => {
  it('reuses hebron-gate’s town/receiving-ground/tomb constants by reference, not a recomputed copy', () => {
    expect(TOWN_HOUSES).toBe(GATE_TOWN_HOUSES);
    expect(DAVID_PLAZA_POS).toBe(GATE_DAVID_PLAZA_POS);
    expect(TOMB_POS).toBe(GATE_TOMB_POS);
  });

  it('the pool sits well clear of the town-house scatter radius (>55m from TOWN_CENTER)', () => {
    const dist = Math.hypot(POOL_CENTER[0] - TOWN_CENTER[0], POOL_CENTER[1] - TOWN_CENTER[1]);
    expect(dist).toBeGreaterThan(55);
  });

  it('the execution ground sits a few meters off the pool center, never at the waterline', () => {
    const dist = Math.hypot(
      EXECUTION_GROUND[0] - POOL_CENTER[0],
      EXECUTION_GROUND[1] - POOL_CENTER[1],
    );
    expect(dist).toBeGreaterThan(POOL_RADIUS * 0.5);
    expect(dist).toBeLessThan(POOL_RADIUS * 2);
  });

  it('the Arabah road enters from the east/northeast, distinct from hebron-anointing’s south approach', () => {
    const start = ARABAH_ROAD_CURVE.getPointAt(0);
    expect(start.x).toBeGreaterThan(300);
    const end = ARABAH_ROAD_CURVE.getPointAt(1);
    expect(end.x).toBeLessThan(20);
  });

  it('the Arabah road passes near the pool before reaching the plaza', () => {
    const mid = ARABAH_ROAD_CURVE.getPointAt(0.5);
    const distToPool = Math.hypot(mid.x - POOL_CENTER[0], mid.z - POOL_CENTER[1]);
    expect(distToPool).toBeLessThan(60);
  });

  it('produces the requested attendant slot count, minimum-spacing rejection sampled', () => {
    expect(ATTENDANT_SLOTS.length).toBeGreaterThanOrEqual(14);
    for (const [ax, az] of ATTENDANT_SLOTS) {
      for (const [bx, bz] of ATTENDANT_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.7);
      }
    }
  });
});
