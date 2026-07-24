import { describe, expect, it } from 'vitest';
import {
  abishaiPose,
  abnerPose,
  asahelPose,
  championPose,
  contingentFigurePose,
  joabPose,
  T_ABNER_WARNS,
  T_ASAHEL_DEATH,
  T_ASAHEL_PURSUIT,
  T_BATTLE_SPREAD,
  T_CHAMPIONS,
  T_JOAB_HALTS,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
  type ContingentFigureConfig,
} from './poses';

describe('championPose', () => {
  it('starts apart and unfallen before the beat begins', () => {
    const p = championPose(T_CHAMPIONS - 1, 'standard');
    expect(p.reach).toBe(0);
    expect(p.fallen).toBe(0);
  });

  it('grasps then falls together in standard mode', () => {
    const grasped = championPose(T_CHAMPIONS + 5, 'standard');
    expect(grasped.reach).toBeGreaterThan(0.9);
    const fallen = championPose(T_CHAMPIONS + 20, 'standard');
    expect(fallen.fallen).toBeGreaterThan(0.9);
  });

  it('reduced mode still shows the pairing but collapses to fallen much faster', () => {
    const t = T_CHAMPIONS + 7.6;
    const standard = championPose(t, 'standard');
    const reduced = championPose(t, 'reduced');
    expect(reduced.reach).toBeCloseTo(standard.reach, 5); // the pairing itself is identical in both modes
    expect(reduced.fallen).toBeGreaterThan(standard.fallen);
  });

  it('staggers pairs by phaseOffset without changing the eventual outcome', () => {
    const early = championPose(T_CHAMPIONS + 30, 'standard', 0);
    const late = championPose(T_CHAMPIONS + 30, 'standard', 3);
    expect(early.fallen).toBeGreaterThanOrEqual(late.fallen);
  });
});

function baseContingentConfig(
  overrides: Partial<ContingentFigureConfig> = {},
): ContingentFigureConfig {
  return {
    bankX: 0,
    bankZ: 34,
    bankYaw: 0,
    targetX: 150,
    targetZ: 40,
    targetYaw: 1,
    arriveDelay: 0,
    driftDuration: 20,
    falls: false,
    fallProgress: 0.5,
    ...overrides,
  };
}

describe('contingentFigurePose', () => {
  it('holds at the bank slot before the battle spreads', () => {
    const cfg = baseContingentConfig();
    const p = contingentFigurePose(T_BATTLE_SPREAD - 5, cfg, 'standard');
    expect(p).toMatchObject({ x: 0, z: 34, visible: true });
  });

  it('drifts toward the spread target once the battle ignites', () => {
    const cfg = baseContingentConfig();
    const early = contingentFigurePose(T_BATTLE_SPREAD + 2, cfg, 'standard');
    const late = contingentFigurePose(T_BATTLE_SPREAD + 25, cfg, 'standard');
    expect(late.x).toBeGreaterThan(early.x);
    expect(late.x).toBeCloseTo(150, 0);
  });

  it('a falling figure crumples and stays down in standard mode', () => {
    const cfg = baseContingentConfig({ falls: true, fallProgress: 0.3 });
    const p = contingentFigurePose(T_BATTLE_SPREAD + 15, cfg, 'standard');
    expect(p.fallen).toBeGreaterThan(0.9);
    expect(p.visible).toBe(true);
  });

  it('a falling figure fades/thins instead of collapsing in reduced mode', () => {
    const cfg = baseContingentConfig({ falls: true, fallProgress: 0.3 });
    const p = contingentFigurePose(T_BATTLE_SPREAD + 15, cfg, 'reduced');
    expect(p.fallen).toBe(0);
    expect(p.visible).toBe(false);
  });

  it('a hill-bound figure continues from its spread target to the hill slot after T_STANDOFF', () => {
    const cfg = baseContingentConfig({ hillX: 460, hillZ: 5, hillYaw: 2 });
    const beforeHill = contingentFigurePose(T_STANDOFF - 1, cfg, 'standard');
    expect(beforeHill.x).toBeCloseTo(150, 0);
    const atHill = contingentFigurePose(T_STANDOFF + 15, cfg, 'standard');
    expect(atHill.x).toBeCloseTo(460, 0);
    expect(atHill.z).toBeCloseTo(5, 0);
  });
});

describe('abnerPose — the reluctant-killer precedent', () => {
  it('never shows the reversed spear grip or the strike in reduced mode', () => {
    for (const t of [T_ABNER_WARNS, T_ABNER_WARNS + 5, T_ASAHEL_DEATH, T_ASAHEL_DEATH + 1]) {
      const p = abnerPose(t, 'reduced');
      expect(p.spearReversed).toBe(0);
      expect(p.strike).toBe(0);
    }
  });

  it('shows the reversed grip ramping in during the warning beat in standard mode', () => {
    const early = abnerPose(T_ABNER_WARNS + 1, 'standard');
    const late = abnerPose(T_ASAHEL_DEATH - 1, 'standard');
    expect(late.spearReversed).toBeGreaterThan(early.spearReversed);
  });

  it('the strike is a brief pulse right at the moment of the blow, standard mode only', () => {
    const before = abnerPose(T_ASAHEL_DEATH - 2, 'standard');
    const at = abnerPose(T_ASAHEL_DEATH + 0.5, 'standard');
    const longAfter = abnerPose(T_ASAHEL_DEATH + 5, 'standard');
    expect(before.strike).toBe(0);
    expect(at.strike).toBeGreaterThan(0);
    expect(longAfter.strike).toBeLessThan(0.1);
  });

  it('holds at the death spot from the warning through the pursuit continuing, then flees to the hill', () => {
    const holding = abnerPose(T_ASAHEL_DEATH + 3, 'standard');
    expect(holding.x).toBeCloseTo(340, 0);
    const atHill = abnerPose(T_STANDOFF + 1, 'standard');
    expect(atHill.x).toBeCloseTo(460, 0);
  });
});

describe('asahelPose — documentary distance, no wound geometry', () => {
  it('is upright and moving before the death beat', () => {
    const p = asahelPose(T_ASAHEL_DEATH - 5, 'standard');
    expect(p.fallen).toBe(0);
  });

  it('standard mode collapses gradually; reduced mode cuts to already-fallen', () => {
    const t = T_ASAHEL_DEATH + 0.6;
    const standard = asahelPose(t, 'standard');
    const reduced = asahelPose(t, 'reduced');
    expect(standard.fallen).toBeLessThan(0.9);
    expect(reduced.fallen).toBeGreaterThan(0.9);
  });

  it('stays fallen and in place for the rest of the scene, in both modes', () => {
    const standard = asahelPose(T_STANDOFF + 20, 'standard');
    const reduced = asahelPose(T_STANDOFF + 20, 'reduced');
    expect(standard.fallen).toBeCloseTo(1, 3);
    expect(reduced.fallen).toBeCloseTo(1, 3);
    expect(standard.x).toBe(reduced.x);
    expect(standard.z).toBe(reduced.z);
  });
});

describe('joabPose / abishaiPose — the held reaction beat (2:23b)', () => {
  it('stands still at the place Asahel fell through T_PURSUIT_CONTINUES', () => {
    const a = joabPose(T_ASAHEL_DEATH + 6);
    const b = joabPose(T_PURSUIT_CONTINUES - 1);
    expect(a.x).toBeCloseTo(b.x, 5);
    expect(a.z).toBeCloseTo(b.z, 5);
  });

  it('resumes moving toward the hill base after T_PURSUIT_CONTINUES', () => {
    const held = joabPose(T_PURSUIT_CONTINUES - 1);
    const later = joabPose(T_STANDOFF + 1);
    expect(later.x).toBeGreaterThan(held.x);
  });

  it('sounds the trumpet as a brief gesture at the halt', () => {
    const before = joabPose(T_JOAB_HALTS - 3);
    const at = joabPose(T_JOAB_HALTS + 0.5);
    expect(at.trumpet).toBeGreaterThan(before.trumpet);
  });

  it('abishai follows the same pursuit path as Joab', () => {
    const j = abishaiPose(T_ASAHEL_PURSUIT + 5);
    const a = abishaiPose(T_ASAHEL_PURSUIT + 5);
    expect(a.x).toBe(j.x);
  });
});
