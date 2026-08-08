import { describe, expect, it } from 'vitest';
import { BAANAH_STAND_POS, DAVID_PLAZA_POS, PRESENTATION_POS, RECHAB_STAND_POS } from './layout';
import {
  ATTENDANT_ESCORT_INDICES,
  assassinPose,
  attendantPose,
  BAANAH_SPEC,
  bundlePose,
  davidPose,
  RECHAB_SPEC,
  T_ARRIVAL,
  T_BURIAL,
  T_CLOSE,
  T_EXECUTION,
  T_PRESENTATION,
  T_VERDICT,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-reckoning entry. The hardest invariants this
 * file guards (ADR-009's absolute bar, per the brief): Rechab and Baanah
 * never linger, fallen, in a way that could read as the hands-and-feet
 * display — they fade from view well before the burial beat, in both
 * modes — and the bundle only ever moves as a single small object, never
 * exposing a "fallen"/anatomical state of its own.
 */

describe('assassinPose (Rechab/Baanah)', () => {
  it('is hidden before the arrival beat (the murder itself is narrated, never staged)', () => {
    const pose = assassinPose(T_ARRIVAL - 1, 'standard', RECHAB_SPEC);
    expect(pose.visible).toBe(false);
  });

  it('has settled at its own stand position by the presentation beat', () => {
    const rechab = assassinPose(T_PRESENTATION + 0.5, 'standard', RECHAB_SPEC);
    expect(rechab.x).toBeCloseTo(RECHAB_STAND_POS[0], 0);
    expect(rechab.z).toBeCloseTo(RECHAB_STAND_POS[1], 0);
    const baanah = assassinPose(T_PRESENTATION + 0.5, 'standard', BAANAH_SPEC);
    expect(baanah.x).toBeCloseTo(BAANAH_STAND_POS[0], 0);
    expect(baanah.z).toBeCloseTo(BAANAH_STAND_POS[1], 0);
  });

  it('is not fallen through the verdict beat, in either mode', () => {
    expect(assassinPose(T_VERDICT + 4, 'standard', RECHAB_SPEC).fallen).toBe(0);
    expect(assassinPose(T_VERDICT + 4, 'reduced', RECHAB_SPEC).fallen).toBe(0);
  });

  it('is fallen well after the execution beat, in both modes', () => {
    const t = T_EXECUTION + 12;
    expect(assassinPose(t, 'standard', RECHAB_SPEC).fallen).toBeGreaterThan(0.9);
    expect(assassinPose(t, 'reduced', RECHAB_SPEC).fallen).toBeGreaterThan(0.9);
  });

  it('reduced mode reaches the fallen aftermath faster than standard mode (elided strike)', () => {
    const soonAfterEscort = T_EXECUTION + 8;
    const standard = assassinPose(soonAfterEscort, 'standard', RECHAB_SPEC).fallen;
    const reduced = assassinPose(soonAfterEscort, 'reduced', RECHAB_SPEC).fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('fades from view well before the burial beat, in both modes — never lingers as a display', () => {
    expect(assassinPose(T_BURIAL - 1, 'standard', RECHAB_SPEC).visible).toBe(false);
    expect(assassinPose(T_BURIAL - 1, 'reduced', RECHAB_SPEC).visible).toBe(false);
    expect(assassinPose(T_BURIAL - 1, 'standard', BAANAH_SPEC).visible).toBe(false);
  });
});

describe('bundlePose', () => {
  it('is hidden before the arrival beat', () => {
    expect(bundlePose(T_ARRIVAL - 1).visible).toBe(false);
  });

  it('is carried (lifted) on the Arabah-road approach', () => {
    const pose = bundlePose(T_ARRIVAL + 5);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeGreaterThan(0.9);
  });

  it('is lowered (not held up) at the presentation spot shortly after presentation', () => {
    const pose = bundlePose(T_PRESENTATION + 3);
    expect(pose.x).toBeCloseTo(PRESENTATION_POS[0], 0);
    expect(pose.z).toBeCloseTo(PRESENTATION_POS[1], 0);
    expect(pose.carried).toBeLessThan(0.1);
  });

  it('stays resting at the presentation spot through the execution beat', () => {
    const pose = bundlePose(T_EXECUTION + 2);
    expect(pose.x).toBeCloseTo(PRESENTATION_POS[0], 0);
    expect(pose.z).toBeCloseTo(PRESENTATION_POS[1], 0);
    expect(pose.buried).toBe(0);
  });

  it('is fully interred (hidden) by the close beat — the milestone’s final image', () => {
    const pose = bundlePose(T_CLOSE + 2);
    expect(pose.buried).toBe(1);
    expect(pose.visible).toBe(false);
  });
});

describe('davidPose', () => {
  it('stands at the receiving ground throughout — never travels', () => {
    for (const t of [T_PRESENTATION, T_VERDICT, T_EXECUTION, T_BURIAL, T_CLOSE]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_PLAZA_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_PLAZA_POS[1], 5);
    }
  });

  it('shows an address gesture during the verdict beat (the ESV-spend beat)', () => {
    expect(davidPose(T_VERDICT + 15).address).toBeGreaterThan(0.5);
  });
});

describe('attendantPose', () => {
  const slot: [number, number] = [-9, -22];

  it('non-escort attendants stay at their slot throughout', () => {
    const nonEscort = Math.max(...ATTENDANT_ESCORT_INDICES) + 1;
    for (const t of [T_PRESENTATION, T_EXECUTION + 8]) {
      const pose = attendantPose(t, nonEscort, slot, 'standard');
      expect(pose.x).toBeCloseTo(slot[0], 5);
      expect(pose.z).toBeCloseTo(slot[1], 5);
    }
  });

  it('an escort index walks to the pool ground in standard mode after the execution beat', () => {
    const escortIndex = ATTENDANT_ESCORT_INDICES[0];
    const pose = attendantPose(T_EXECUTION + 7, escortIndex, slot, 'standard');
    expect(Math.hypot(pose.x - slot[0], pose.z - slot[1])).toBeGreaterThan(5);
  });

  it('reduced mode never moves an escort to the pool ground at all (elided per the brief)', () => {
    const escortIndex = ATTENDANT_ESCORT_INDICES[0];
    const pose = attendantPose(T_EXECUTION + 7, escortIndex, slot, 'reduced');
    expect(pose.x).toBeCloseTo(slot[0], 5);
    expect(pose.z).toBeCloseTo(slot[1], 5);
  });

  it('escorts stay at their slot before the execution beat', () => {
    const escortIndex = ATTENDANT_ESCORT_INDICES[0];
    const pose = attendantPose(T_VERDICT, escortIndex, slot, 'standard');
    expect(pose.x).toBeCloseTo(slot[0], 5);
    expect(pose.z).toBeCloseTo(slot[1], 5);
  });
});
