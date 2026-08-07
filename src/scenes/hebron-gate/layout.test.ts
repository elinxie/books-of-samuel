import { describe, expect, it } from 'vitest';
import {
  ASIDE_POINT,
  buildMourningGatherSlots,
  buildRaidPartySlots,
  buildTombGatherSlots,
  buildTownBackgroundSlots,
  GATE_PASSAGE_NORTH_Z,
  GATE_PASSAGE_SOUTH_Z,
  PROCESSION_CURVE,
  processionPointAt,
  raidRoadPointAt,
  RAID_ROAD_CURVE,
  RAID_ROAD_START,
  TOMB_POS,
} from './layout';

describe('hebron-gate layout', () => {
  it('the gate passage has a real interior — south (plaza-facing) threshold is south of the north (town-facing) one', () => {
    expect(GATE_PASSAGE_SOUTH_Z).toBeGreaterThan(GATE_PASSAGE_NORTH_Z);
  });

  it('the aside point sits strictly inside the gate passage interior, off centerline (a chamber recess, not the through-line)', () => {
    expect(ASIDE_POINT[1]).toBeLessThan(GATE_PASSAGE_SOUTH_Z);
    expect(ASIDE_POINT[1]).toBeGreaterThan(GATE_PASSAGE_NORTH_Z);
    expect(Math.abs(ASIDE_POINT[0])).toBeGreaterThan(1);
  });

  it('raidRoadPointAt clamps u to [0,1]', () => {
    const below = raidRoadPointAt(-3);
    const start = raidRoadPointAt(0);
    expect(below.x).toBeCloseTo(start.x, 5);
    expect(below.z).toBeCloseTo(start.z, 5);
    const above = raidRoadPointAt(4);
    const end = raidRoadPointAt(1);
    expect(above.x).toBeCloseTo(end.x, 5);
    expect(above.z).toBeCloseTo(end.z, 5);
  });

  it('the raid road starts well outside the town/terrace footprint', () => {
    const dist = Math.hypot(RAID_ROAD_START.x - 0, RAID_ROAD_START.z - -70);
    expect(dist).toBeGreaterThan(150);
  });

  it('processionPointAt runs from the aside point (u=0) to the tomb (u=1)', () => {
    const start = processionPointAt(0);
    const end = processionPointAt(1);
    expect(start.x).toBeCloseTo(ASIDE_POINT[0], 3);
    expect(start.z).toBeCloseTo(ASIDE_POINT[1], 3);
    expect(end.x).toBeCloseTo(TOMB_POS[0], 3);
    expect(end.z).toBeCloseTo(TOMB_POS[1], 3);
  });

  it('the procession curve and the raid road are distinct routes', () => {
    expect(PROCESSION_CURVE).not.toBe(RAID_ROAD_CURVE);
  });

  it('crowd-slot builders are deterministic and respect minimum spacing', () => {
    const a = buildMourningGatherSlots(60);
    const b = buildMourningGatherSlots(60);
    expect(a).toEqual(b);
    expect(a.length).toBe(60);
    for (const [ax, az] of a) {
      for (const [bx, bz] of a) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.9);
      }
    }
  });

  it('raid-party, tomb-gather, and town-background slot builders are all deterministic', () => {
    expect(buildRaidPartySlots(20)).toEqual(buildRaidPartySlots(20));
    expect(buildTombGatherSlots(60)).toEqual(buildTombGatherSlots(60));
    expect(buildTownBackgroundSlots(22)).toEqual(buildTownBackgroundSlots(22));
  });

  it('tomb-gather slots cluster around the tomb, not the plaza', () => {
    const slots = buildTombGatherSlots(40);
    for (const [x, z] of slots) {
      expect(Math.hypot(x - TOMB_POS[0], z - TOMB_POS[1])).toBeLessThan(30);
    }
  });
});
