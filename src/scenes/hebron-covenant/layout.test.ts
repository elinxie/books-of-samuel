import { describe, expect, it } from 'vitest';
import {
  ABNER_FEAST_SLOTS,
  ABNER_MEN_COUNT,
  buildDavidEscortSlots,
  buildTownBackgroundSlots,
  NORTH_ROAD_CURVE,
  NORTH_ROAD_END,
  NORTH_ROAD_START,
  northRoadPointAt,
} from './layout';

describe('hebron-covenant layout', () => {
  it('the northern road runs from the far north (large -z) to the gate plaza (near [0,-14])', () => {
    expect(NORTH_ROAD_START.z).toBeLessThan(-300);
    expect(NORTH_ROAD_END.x).toBeCloseTo(0, 0);
    expect(NORTH_ROAD_END.z).toBeCloseTo(-14, 0);
  });

  it('is the inverse direction of hebron-anointing’s southern approach (this road starts north, not south)', () => {
    expect(NORTH_ROAD_START.z).toBeLessThan(0);
  });

  it('northRoadPointAt clamps u to [0,1]', () => {
    const below = northRoadPointAt(-5);
    const start = northRoadPointAt(0);
    expect(below.x).toBeCloseTo(start.x, 5);
    expect(below.z).toBeCloseTo(start.z, 5);
    const above = northRoadPointAt(5);
    const end = northRoadPointAt(1);
    expect(above.x).toBeCloseTo(end.x, 5);
    expect(above.z).toBeCloseTo(end.z, 5);
  });

  it('the road stays clear of the town/terrace footprint at its closest pass', () => {
    // Sampled at a reasonable step, every point on the road should stay well
    // outside the town mound + terrace radius (60m) around [0,-70], except at
    // its very end where it deliberately reaches the gate plaza (z=-14).
    for (let i = 0; i <= 20; i++) {
      const u = i / 20;
      if (u > 0.85) continue; // approaching the gate plaza itself
      const p = NORTH_ROAD_CURVE.getPointAt(u);
      const dist = Math.hypot(p.x - 0, p.z - -70);
      expect(dist).toBeGreaterThan(58);
    }
  });

  it('Abner’s party renders literal 1:1 (twenty men, 3:20) — one feast slot per man', () => {
    expect(ABNER_MEN_COUNT).toBe(20);
    expect(ABNER_FEAST_SLOTS.length).toBe(20);
  });

  it('feast-slot builders are deterministic and respect minimum spacing', () => {
    const a = buildDavidEscortSlots(22);
    const b = buildDavidEscortSlots(22);
    expect(a).toEqual(b);
    for (const [ax, az] of a) {
      for (const [bx, bz] of a) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.7);
      }
    }
  });

  it('town-background slots scatter around the town hill, deterministically', () => {
    const a = buildTownBackgroundSlots(26);
    const b = buildTownBackgroundSlots(26);
    expect(a).toEqual(b);
    expect(a.length).toBe(26);
  });
});
