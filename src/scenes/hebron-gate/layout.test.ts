import { describe, expect, it } from 'vitest';
import { TOWN_HOUSES as ANOINTING_TOWN_HOUSES } from '../hebron-anointing/layout';
import { NORTH_ROAD_CURVE as COVENANT_NORTH_ROAD_CURVE } from '../hebron-covenant/layout';
import {
  GATE_ASIDE_POCKET,
  GATE_PASSAGE_CENTER,
  GATE_WALLS,
  JOAB_RAID_RETURN_CURVE,
  JOAB_RAID_SLOTS,
  NORTH_ROAD_CURVE,
  PLAZA_WATCH_SLOTS,
  PROCESSION_CURVE,
  TOMB_ENTRANCE_INSET,
  TOMB_POS,
  TOMB_WATCH_SLOTS,
  TOWN_HOUSES,
} from './layout';

describe('hebron-gate layout', () => {
  it('reuses hebron-anointing town massing and hebron-covenant’s north road by reference, not a recomputed copy', () => {
    expect(TOWN_HOUSES).toBe(ANOINTING_TOWN_HOUSES);
    expect(NORTH_ROAD_CURVE).toBe(COVENANT_NORTH_ROAD_CURVE);
  });

  it('the gate passage is centered on the same spot hebron-anointing’s simple gate posts marked', () => {
    expect(GATE_PASSAGE_CENTER).toEqual([0, -42]);
  });

  it('the gate walls form a deep-enough interior — at least one alcove wall recessed from the outer wall', () => {
    const outerXs = GATE_WALLS.map((w) => Math.abs(w.x)).filter((x) => x > 7);
    expect(outerXs.length).toBeGreaterThanOrEqual(2);
    expect(GATE_WALLS.length).toBeGreaterThanOrEqual(4);
  });

  it('the aside pocket sits inside the passage, off the plaza’s own open sightline (not at either mouth)', () => {
    expect(GATE_ASIDE_POCKET[1]).toBeLessThan(-38);
    expect(GATE_ASIDE_POCKET[1]).toBeGreaterThan(-46);
    expect(Math.abs(GATE_ASIDE_POCKET[0])).toBeGreaterThan(1);
  });

  it('produces the raid party’s requested slot count', () => {
    expect(JOAB_RAID_SLOTS.length).toBeGreaterThanOrEqual(25);
  });

  it('keeps the mourning-assembly watch/tomb pools at their disclosed design-choice scale (buffers >= high-tier target)', () => {
    expect(PLAZA_WATCH_SLOTS.length).toBeGreaterThanOrEqual(85);
    expect(TOMB_WATCH_SLOTS.length).toBeGreaterThanOrEqual(85);
  });

  it('minimum-spacing rejection sampling keeps raid-party slots from coinciding', () => {
    for (const [ax, az] of JOAB_RAID_SLOTS) {
      for (const [bx, bz] of JOAB_RAID_SLOTS) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.7);
      }
    }
  });

  it('Joab’s raid-return road enters from the east, distinct from Abner’s own north road', () => {
    const start = JOAB_RAID_RETURN_CURVE.getPointAt(0);
    expect(start.x).toBeGreaterThan(200);
    const northStart = NORTH_ROAD_CURVE.getPointAt(0);
    expect(northStart.z).toBeLessThan(-250);
  });

  it('the procession route starts at the aside pocket (where Abner fell) and ends at the tomb', () => {
    const start = PROCESSION_CURVE.getPointAt(0);
    const end = PROCESSION_CURVE.getPointAt(1);
    expect(start.x).toBeCloseTo(GATE_ASIDE_POCKET[0], 5);
    expect(start.z).toBeCloseTo(GATE_ASIDE_POCKET[1], 5);
    expect(end.x).toBeCloseTo(TOMB_POS[0], 5);
    expect(end.z).toBeCloseTo(TOMB_POS[1], 5);
  });

  it('the tomb sits well clear of the town-house scatter radius (max 55m from TOWN_CENTER)', () => {
    const dist = Math.hypot(TOMB_POS[0] - 0, TOMB_POS[1] - -70);
    expect(dist).toBeGreaterThan(55);
    const entranceDist = Math.hypot(
      TOMB_ENTRANCE_INSET[0] - TOMB_POS[0],
      TOMB_ENTRANCE_INSET[1] - TOMB_POS[1],
    );
    expect(entranceDist).toBeLessThan(3);
  });
});
