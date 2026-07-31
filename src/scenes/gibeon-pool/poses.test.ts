import { describe, expect, it } from 'vitest';
import { ASAHEL_DEATH_U, pursuitPointAt } from './layout';
import {
  abnerFigurePose,
  abnerPose,
  asahelPose,
  championPose,
  chaseU,
  curveThenSettle,
  duskProgress,
  elapsedWithHold,
  joabAbishaiU,
  joabFigurePose,
  T_ABNER_PLEA,
  T_ASAHEL_DEATH,
  T_BATTLE_SPREADS,
  T_CASUALTY_COUNT,
  T_CHAMPIONS,
  T_JOAB_HALTS,
  T_PROPOSAL,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
} from './poses';

describe('championPose', () => {
  it('is invisible/ungripped before its pair-offset window opens', () => {
    const pose = championPose(T_CHAMPIONS - 1, 0, 'standard');
    expect(pose.grip).toBe(0);
    expect(pose.fallen).toBe(0);
  });

  it('appears during the proposal beat, before the fight itself', () => {
    expect(championPose(T_PROPOSAL + 2, 0, 'standard').appear).toBeGreaterThan(0);
  });

  it('grips, then falls, in standard mode', () => {
    const gripPeak = championPose(T_CHAMPIONS + 1, 0, 'standard');
    expect(gripPeak.grip).toBeGreaterThan(0.5);
    expect(gripPeak.fallen).toBe(0);
    const fallen = championPose(T_CHAMPIONS + 8, 0, 'standard');
    expect(fallen.fallen).toBeGreaterThan(0.9);
  });

  it('reduced mode reaches the same fallen fact much sooner', () => {
    const standard = championPose(T_CHAMPIONS + 2.5, 0, 'standard').fallen;
    const reduced = championPose(T_CHAMPIONS + 2.5, 0, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('a later pair-offset staggers the same envelope shape', () => {
    const early = championPose(T_CHAMPIONS + 1, 0, 'standard').grip;
    const late = championPose(T_CHAMPIONS + 1, 1.5, 'standard').grip;
    expect(late).toBeLessThan(early);
  });
});

describe('chaseU / abnerPose / asahelPose', () => {
  it('both Abner and Asahel converge on the same point at the death beat', () => {
    const a = abnerPose(T_ASAHEL_DEATH, 'standard');
    const s = asahelPose(T_ASAHEL_DEATH, 'standard');
    expect(a.x).toBeCloseTo(s.x, 1);
    expect(a.z).toBeCloseTo(s.z, 1);
    const expected = pursuitPointAt(ASAHEL_DEATH_U);
    expect(a.x).toBeCloseTo(expected.x, 1);
  });

  it('chaseU never exceeds the death-point fraction', () => {
    expect(chaseU(T_ASAHEL_DEATH + 50)).toBeCloseTo(ASAHEL_DEATH_U, 5);
    expect(chaseU(0)).toBe(0);
  });

  it('Asahel is not fallen before the death beat and fully fallen well after', () => {
    expect(asahelPose(T_ASAHEL_DEATH - 5, 'standard').fallen).toBe(0);
    expect(asahelPose(T_ASAHEL_DEATH + 10, 'standard').fallen).toBeGreaterThan(0.95);
  });

  it('Abner’s reversed grip and strike gestures are zero long before the death beat', () => {
    const early = abnerPose(T_BATTLE_SPREADS + 1, 'standard');
    expect(early.reversedGrip).toBe(0);
    expect(early.strike).toBe(0);
  });

  it('Abner’s plea gesture only rises at the hill, between the plea and halt beats', () => {
    expect(abnerPose(T_ABNER_PLEA - 5, 'standard').plea).toBe(0);
    expect(abnerPose(T_ABNER_PLEA + 1, 'standard').plea).toBeGreaterThan(0);
    expect(abnerPose(T_JOAB_HALTS + 10, 'standard').plea).toBeLessThan(0.05);
  });

  it('Abner reaches the hill of Ammah by the standoff beat', () => {
    const pose = abnerPose(T_STANDOFF + 1, 'standard');
    expect(Math.hypot(pose.x - 346, pose.z - -180)).toBeLessThan(40);
  });
});

describe('joabAbishaiU', () => {
  it('reaches the death-point fraction right as pursuit-continues begins', () => {
    expect(joabAbishaiU(T_PURSUIT_CONTINUES)).toBeCloseTo(ASAHEL_DEATH_U, 1);
  });

  it('reaches 1 by the standoff beat', () => {
    expect(joabAbishaiU(T_STANDOFF)).toBeCloseTo(1, 5);
  });

  it('is monotonically non-decreasing', () => {
    let prev = 0;
    for (let t = 0; t <= T_STANDOFF + 20; t += 5) {
      const u = joabAbishaiU(t);
      expect(u).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = u;
    }
  });
});

describe('curveThenSettle', () => {
  it('follows the curve exactly below the settle threshold', () => {
    const onCurve = curveThenSettle(0.3, 0.8, [999, 999]);
    const expected = pursuitPointAt(0.3);
    expect(onCurve.x).toBeCloseTo(expected.x, 5);
    expect(onCurve.z).toBeCloseTo(expected.z, 5);
  });

  it('blends fully to the target once u reaches 1', () => {
    const settled = curveThenSettle(1, 0.8, [42, -7]);
    expect(settled.x).toBeCloseTo(42, 1);
    expect(settled.z).toBeCloseTo(-7, 1);
  });
});

describe('elapsedWithHold', () => {
  it('freezes elapsed time during the hold window', () => {
    const beforeHold = elapsedWithHold(20, 0, 30, 40);
    const duringHold = elapsedWithHold(35, 0, 30, 40);
    const afterHold = elapsedWithHold(45, 0, 30, 40);
    expect(beforeHold).toBe(20);
    expect(duringHold).toBe(30); // frozen at the hold-start elapsed value
    expect(afterHold).toBe(35); // 30 (frozen) + (45-40) resumed
  });
});

describe('duskProgress', () => {
  it('is day well before the pursuit-continues beat and full dusk by the casualty count', () => {
    expect(duskProgress(T_BATTLE_SPREADS)).toBe(0);
    expect(duskProgress(T_CASUALTY_COUNT)).toBeCloseTo(1, 5);
  });

  it('is monotonically non-decreasing', () => {
    let prev = 0;
    for (let t = 0; t <= T_CASUALTY_COUNT + 20; t += 5) {
      const d = duskProgress(t);
      expect(d).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = d;
    }
  });
});

describe('abnerFigurePose', () => {
  const bank: [number, number, number] = [1, -50, 0];

  it('stays at the bank before the battle spreads, regardless of role', () => {
    for (const role of ['falls', 'band', 'scatter'] as const) {
      const pose = abnerFigurePose(
        T_BATTLE_SPREADS - 1,
        {
          role,
          bank,
          fallDelay: 0,
          pursuitDelay: 0,
          scatterTargetU: 0.4,
          settleTarget: [0, 0],
        },
        'standard',
      );
      expect(pose.x).toBe(bank[0]);
      expect(pose.z).toBe(bank[1]);
    }
  });

  it('a "falls" figure collapses at the bank and never moves', () => {
    const pose = abnerFigurePose(
      T_BATTLE_SPREADS + 10,
      {
        role: 'falls',
        bank,
        fallDelay: 0,
        pursuitDelay: 0,
        scatterTargetU: 0.4,
        settleTarget: [0, 0],
      },
      'standard',
    );
    expect(pose.fallen).toBeGreaterThan(0);
    expect(pose.x).toBe(bank[0]);
  });

  it('a "band" figure reaches its settle target well after the trek', () => {
    const target: [number, number] = [340, -195];
    const pose = abnerFigurePose(
      T_STANDOFF + 30,
      {
        role: 'band',
        bank,
        fallDelay: 0,
        pursuitDelay: 0,
        scatterTargetU: 0.4,
        settleTarget: target,
      },
      'standard',
    );
    expect(Math.hypot(pose.x - target[0], pose.z - target[1])).toBeLessThan(2);
  });

  it('a "scatter" figure stops well short of the hill', () => {
    const pose = abnerFigurePose(
      T_STANDOFF + 30,
      {
        role: 'scatter',
        bank,
        fallDelay: 0,
        pursuitDelay: 0,
        scatterTargetU: 0.35,
        settleTarget: [0, 0],
      },
      'standard',
    );
    const dist = Math.hypot(pose.x - 360, pose.z - -190);
    expect(dist).toBeGreaterThan(80);
  });
});

describe('joabFigurePose', () => {
  const bank: [number, number, number] = [-1, 50, Math.PI];

  it('a "stay" figure never leaves the bank', () => {
    const pose = joabFigurePose(T_CASUALTY_COUNT, {
      role: 'stay',
      bank,
      pursuitDelay: 0,
      settleTarget: [0, 0],
    });
    expect(pose.x).toBe(bank[0]);
    expect(pose.z).toBe(bank[1]);
  });

  it('a "pursue" figure holds still during the 2:23b bystander window', () => {
    const target: [number, number] = [300, -170];
    const before = joabFigurePose(T_ASAHEL_DEATH - 1, {
      role: 'pursue',
      bank,
      pursuitDelay: 0,
      settleTarget: target,
    });
    const duringA = joabFigurePose(T_ASAHEL_DEATH + 1, {
      role: 'pursue',
      bank,
      pursuitDelay: 0,
      settleTarget: target,
    });
    const duringB = joabFigurePose(T_ASAHEL_DEATH + 5, {
      role: 'pursue',
      bank,
      pursuitDelay: 0,
      settleTarget: target,
    });
    expect(duringA.moving).toBe(false);
    expect(duringA.x).toBeCloseTo(duringB.x, 3);
    expect(duringA.z).toBeCloseTo(duringB.z, 3);
    expect(before.x).not.toBeCloseTo(duringA.x, 1);
  });

  it('a "pursue" figure eventually reaches its settle target', () => {
    const target: [number, number] = [300, -170];
    const pose = joabFigurePose(T_CASUALTY_COUNT, {
      role: 'pursue',
      bank,
      pursuitDelay: 0,
      settleTarget: target,
    });
    expect(Math.hypot(pose.x - target[0], pose.z - target[1])).toBeLessThan(2);
  });
});
