import { describe, expect, it } from 'vitest';
import {
  boneBundlePose,
  burialMoundProgress,
  columnTorchPresence,
  formPose,
  PYRE_COVERED_AT,
  pyreCoverProgress,
  pyreFireIntensity,
  sevenDayShimmerEnvelope,
  sevenDayShimmerOscillation,
  SEVEN_DAYS_END,
  T_BONES,
  T_CLOSE,
  T_NIGHT_MARCH,
  T_PYRE,
  T_RECEIVED,
  T_SEVEN_DAYS,
  T_TAMARISK,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's jabesh-burial entry (b-night-march 0 / b-received 24
 * / b-pyre 55 / b-bones 82 / b-tamarisk 104 / b-seven-days 122 / b-close
 * 142). The pyre's covered-before-flame sequencing and the wrapped-form
 * hiding are asserted as unconditional — not mode-dependent — per the
 * brief's hard constraint.
 */

describe('formPose', () => {
  it('is on the wadi path, carried, at the start of the scene', () => {
    const pose = formPose(T_NIGHT_MARCH, 0);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeGreaterThan(0);
  });

  it('is laid at the reception slot by b-received', () => {
    const pose = formPose(T_RECEIVED + 2, 0);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBe(0);
  });

  it('is carried during the transit to the pyre', () => {
    const pose = formPose(T_PYRE + 3, 0);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeGreaterThan(0);
  });

  it('is never visible once the pyre timber has fully covered it', () => {
    for (const formIndex of [0, 1, 2, 3]) {
      const pose = formPose(PYRE_COVERED_AT + 0.01, formIndex);
      expect(pose.visible).toBe(false);
    }
  });

  it('stays hidden for the rest of the scene once covered', () => {
    expect(formPose(T_BONES, 0).visible).toBe(false);
    expect(formPose(T_TAMARISK, 0).visible).toBe(false);
    expect(formPose(T_CLOSE, 0).visible).toBe(false);
  });

  it('the four forms stagger rather than moving in perfect lockstep', () => {
    const t = T_RECEIVED + 0.5;
    const first = formPose(t, 0).carried;
    const last = formPose(t, 3).carried;
    // With the per-form delay, the first form has already been laid down
    // (carried=0) while the last is still mid-approach (carried=1) at the
    // same instant.
    expect(first).not.toBe(last);
  });
});

describe('pyre cover/flame timing', () => {
  it('is uncovered before b-pyre', () => {
    expect(pyreCoverProgress(T_PYRE)).toBe(0);
  });

  it('reaches full coverage by PYRE_COVERED_AT', () => {
    expect(pyreCoverProgress(PYRE_COVERED_AT)).toBeCloseTo(1, 5);
  });

  it('no flame renders before the timber has fully covered the forms, in either mode', () => {
    expect(pyreFireIntensity(PYRE_COVERED_AT - 0.01, 'standard')).toBe(0);
    expect(pyreFireIntensity(PYRE_COVERED_AT - 0.01, 'reduced')).toBe(0);
  });

  it('flame is present shortly after full coverage in standard mode', () => {
    expect(pyreFireIntensity(PYRE_COVERED_AT + 3, 'standard')).toBeGreaterThan(0.5);
  });

  it('reduced mode never shows a full blaze — capped at an embers level throughout', () => {
    expect(pyreFireIntensity(PYRE_COVERED_AT + 3, 'reduced')).toBeLessThan(0.4);
    expect(pyreFireIntensity(PYRE_COVERED_AT + 3, 'reduced')).toBeGreaterThan(0);
  });

  it('fades toward embers as the bones are gathered, in every mode', () => {
    expect(pyreFireIntensity(T_BONES + 10, 'standard')).toBeLessThan(0.1);
    expect(pyreFireIntensity(T_BONES + 10, 'reduced')).toBeLessThan(0.1);
  });
});

describe('boneBundlePose — standard mode', () => {
  it('is not present before b-bones', () => {
    expect(boneBundlePose(T_BONES - 1, 'standard').visible).toBe(false);
  });

  it('appears and is carried toward the tamarisk after b-bones', () => {
    const pose = boneBundlePose(T_BONES + 2, 'standard');
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeGreaterThan(0);
  });

  it('is buried and hidden after the burial beat completes', () => {
    const pose = boneBundlePose(T_TAMARISK + 8, 'standard');
    expect(pose.visible).toBe(false);
    expect(pose.buried).toBe(1);
  });
});

describe('boneBundlePose — reduced mode', () => {
  it('elides the gathering entirely — not present during b-bones', () => {
    expect(boneBundlePose(T_BONES + 2, 'reduced').visible).toBe(false);
  });

  it('is simply present at the grave, not carried, once b-tamarisk begins', () => {
    const pose = boneBundlePose(T_TAMARISK + 1, 'reduced');
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBe(0);
  });

  it('is buried and hidden after the burial beat completes, same as standard mode', () => {
    const pose = boneBundlePose(T_TAMARISK + 8, 'reduced');
    expect(pose.visible).toBe(false);
    expect(pose.buried).toBe(1);
  });
});

describe('burialMoundProgress', () => {
  it('is zero before the burial beat', () => {
    expect(burialMoundProgress(T_TAMARISK - 1)).toBe(0);
  });

  it('reaches full growth shortly after the burial beat starts', () => {
    expect(burialMoundProgress(T_TAMARISK + 8)).toBeCloseTo(1, 3);
  });
});

describe('columnTorchPresence', () => {
  it('is present while a bearer is still on the path', () => {
    expect(columnTorchPresence(T_NIGHT_MARCH, T_RECEIVED)).toBe(1);
  });

  it('fades out after that bearer arrives', () => {
    expect(columnTorchPresence(T_RECEIVED + 8, T_RECEIVED)).toBeLessThan(0.1);
  });
});

describe('seven-day shimmer', () => {
  it('is zero outside the seven-day-fast window', () => {
    expect(sevenDayShimmerEnvelope(T_SEVEN_DAYS - 1)).toBe(0);
    expect(sevenDayShimmerEnvelope(SEVEN_DAYS_END + 1)).toBe(0);
  });

  it('rises inside the window', () => {
    const mid = (T_SEVEN_DAYS + SEVEN_DAYS_END) / 2;
    expect(sevenDayShimmerEnvelope(mid)).toBeGreaterThan(0.8);
  });

  it('oscillates through several cycles across the window (multiple sign changes)', () => {
    const samples: number[] = [];
    for (let t = T_SEVEN_DAYS + 0.1; t < SEVEN_DAYS_END; t += 0.25) {
      samples.push(sevenDayShimmerOscillation(t) - 0.5);
    }
    let signChanges = 0;
    for (let i = 1; i < samples.length; i++) {
      if (Math.sign(samples[i]) !== 0 && Math.sign(samples[i - 1]) !== 0) {
        if (Math.sign(samples[i]) !== Math.sign(samples[i - 1])) signChanges++;
      }
    }
    expect(signChanges).toBeGreaterThanOrEqual(4);
  });

  it('is a neutral, non-shimmering value outside the window (a stable base rig)', () => {
    expect(sevenDayShimmerOscillation(T_NIGHT_MARCH)).toBe(0.5);
    expect(sevenDayShimmerOscillation(T_CLOSE)).toBe(0.5);
  });
});
