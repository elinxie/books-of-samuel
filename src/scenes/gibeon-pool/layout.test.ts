import { describe, expect, it } from 'vitest';
import {
  ABNER_BANK_SLOTS,
  ABNER_FLIGHT_CURVE,
  ASAHEL_DEATH_POS,
  ASAHEL_FLIGHT_CURVE,
  CHAMPION_PAIR_SLOTS,
  curvePose,
  curvePoseOffset,
  HILL_BASE_SLOTS,
  HILL_CREST_SLOTS,
  JOAB_BANK_SLOTS,
  JOAB_FLIGHT_CURVE,
  JOAB_U_AT_DEATH_POINT,
} from './layout';

describe('gibeon-pool layout', () => {
  it('the champions ground has one slot per pair, straddling the pool on both sides', () => {
    expect(CHAMPION_PAIR_SLOTS.length).toBe(12);
    for (const slot of CHAMPION_PAIR_SLOTS) {
      expect(slot.benjaminZ).toBeLessThan(0);
      expect(slot.judahZ).toBeGreaterThan(0);
    }
  });

  it('keeps distinct bank crowd pools large enough for the brief’s scale targets', () => {
    // Abner ~35-45 at high tier; Joab ~30-40 — buffer pools exceed both.
    expect(ABNER_BANK_SLOTS.length).toBeGreaterThanOrEqual(45);
    expect(JOAB_BANK_SLOTS.length).toBeGreaterThanOrEqual(40);
  });

  it('the hill-crest and hill-base slot pools cover the brief’s 12-18 band target', () => {
    expect(HILL_CREST_SLOTS.length).toBeGreaterThanOrEqual(18);
    expect(HILL_BASE_SLOTS.length).toBeGreaterThanOrEqual(12);
  });

  it('minimum-spacing rejection sampling keeps bank slots from coinciding', () => {
    for (const [ax, az] of ABNER_BANK_SLOTS.slice(0, 30)) {
      for (const [bx, bz] of ABNER_BANK_SLOTS.slice(0, 30)) {
        if (ax === bx && az === bz) continue;
        expect(Math.hypot(ax - bx, az - bz)).toBeGreaterThan(1.9);
      }
    }
  });

  it('Abner flees from his bank (north, negative z) toward the hill of Ammah (large +x)', () => {
    const start = ABNER_FLIGHT_CURVE.getPointAt(0);
    const end = ABNER_FLIGHT_CURVE.getPointAt(1);
    expect(start.z).toBeLessThan(0);
    expect(end.x).toBeGreaterThan(start.x + 200);
  });

  it('Asahel’s pursuit curve ends exactly at Abner’s death point', () => {
    const end = ASAHEL_FLIGHT_CURVE.getPointAt(1);
    expect(end.x).toBeCloseTo(ASAHEL_DEATH_POS[0], 6);
    expect(end.z).toBeCloseTo(ASAHEL_DEATH_POS[1], 6);
  });

  it('Joab’s pursuit curve passes near the death point around its designated u', () => {
    const near = JOAB_FLIGHT_CURVE.getPointAt(JOAB_U_AT_DEATH_POINT);
    expect(Math.hypot(near.x - ASAHEL_DEATH_POS[0], near.z - ASAHEL_DEATH_POS[1])).toBeLessThan(15);
  });

  it('curvePose returns a finite position and yaw at any u in [0,1]', () => {
    for (const u of [0, 0.25, 0.5, 0.75, 1]) {
      const pose = curvePose(ABNER_FLIGHT_CURVE, u);
      expect(Number.isFinite(pose.x)).toBe(true);
      expect(Number.isFinite(pose.z)).toBe(true);
      expect(Number.isFinite(pose.yaw)).toBe(true);
    }
  });

  it('curvePoseOffset shifts a figure sideways from the base curve sample', () => {
    const base = curvePose(JOAB_FLIGHT_CURVE, 0.4);
    const offset = curvePoseOffset(JOAB_FLIGHT_CURVE, 0.4, 3);
    expect(Math.hypot(base.x - offset.x, base.z - offset.z)).toBeCloseTo(3, 1);
  });
});
