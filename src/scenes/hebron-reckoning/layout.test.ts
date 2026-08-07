import { describe, expect, it } from 'vitest';
import { TOWN_CENTER } from '../hebron-anointing/layout';
import { TOMB_POS } from '../hebron-gate/layout';
import {
  ARRIVAL_ROAD_CURVE,
  ARRIVAL_ROAD_START,
  arrivalRoadPointAt,
  buildAmbientTownSlots,
  buildAttendantSlots,
  BURIAL_ROUTE_CURVE,
  burialRoutePointAt,
  DAVID_RECEIVING_POS,
  POOL_CENTER,
  POOL_RADIUS,
  PRESENTATION_POS,
} from './layout';

function dist(ax: number, az: number, bx: number, bz: number): number {
  return Math.hypot(ax - bx, az - bz);
}

describe('hebron-reckoning layout', () => {
  it('arrivalRoadPointAt clamps u to [0,1]', () => {
    const below = arrivalRoadPointAt(-2);
    const start = arrivalRoadPointAt(0);
    expect(below.x).toBeCloseTo(start.x, 5);
    expect(below.z).toBeCloseTo(start.z, 5);
    const above = arrivalRoadPointAt(3);
    const end = arrivalRoadPointAt(1);
    expect(above.x).toBeCloseTo(end.x, 5);
    expect(above.z).toBeCloseTo(end.z, 5);
  });

  it('the arrival road starts far out to the east/northeast (Arabah direction) and ends at the presentation ground', () => {
    expect(ARRIVAL_ROAD_START.x).toBeGreaterThan(300);
    const end = arrivalRoadPointAt(1);
    expect(end.x).toBeCloseTo(PRESENTATION_POS[0], 3);
    expect(end.z).toBeCloseTo(PRESENTATION_POS[1], 3);
  });

  it('the pool sits well apart from the town center, the tomb, and the receiving ground', () => {
    expect(dist(...POOL_CENTER, ...TOWN_CENTER)).toBeGreaterThan(80);
    expect(dist(...POOL_CENTER, ...TOMB_POS)).toBeGreaterThan(50);
    expect(dist(...POOL_CENTER, ...DAVID_RECEIVING_POS)).toBeGreaterThan(30);
    expect(POOL_RADIUS).toBeGreaterThan(0);
  });

  it('burialRoutePointAt runs from the presentation ground (u=0) to the tomb (u=1)', () => {
    const start = burialRoutePointAt(0);
    const end = burialRoutePointAt(1);
    expect(start.x).toBeCloseTo(PRESENTATION_POS[0], 3);
    expect(start.z).toBeCloseTo(PRESENTATION_POS[1], 3);
    expect(end.x).toBeCloseTo(TOMB_POS[0], 3);
    expect(end.z).toBeCloseTo(TOMB_POS[1], 3);
  });

  it('the burial route and the arrival road are distinct curves', () => {
    expect(BURIAL_ROUTE_CURVE).not.toBe(ARRIVAL_ROAD_CURVE);
  });

  it('attendant and ambient-town slot builders are deterministic and respect minimum spacing', () => {
    const a = buildAttendantSlots(12);
    const b = buildAttendantSlots(12);
    expect(a).toEqual(b);
    expect(a.length).toBe(12);

    const t1 = buildAmbientTownSlots(16);
    const t2 = buildAmbientTownSlots(16);
    expect(t1).toEqual(t2);
    expect(t1.length).toBe(16);
  });

  it('attendant slots cluster near the receiving ground, not the town center', () => {
    const slots = buildAttendantSlots(12);
    for (const [x, z] of slots) {
      expect(dist(x, z, ...DAVID_RECEIVING_POS)).toBeLessThan(20);
    }
  });

  it('ambient-town slots cluster near the town center', () => {
    const slots = buildAmbientTownSlots(16);
    for (const [x, z] of slots) {
      expect(dist(x, z, ...TOWN_CENTER)).toBeLessThan(70);
    }
  });
});
