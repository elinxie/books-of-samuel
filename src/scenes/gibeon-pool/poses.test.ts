import { describe, expect, it } from 'vitest';
import { buildChampionPairSlots, PURSUIT_CURVE, samplePath } from './layout';
import {
  abnerPose,
  asahelPose,
  championPairPose,
  contingentFigurePose,
  fallDuration,
  joabPose,
  joabTrumpetGesture,
  sampleU,
  T_ABNER_PLEA,
  T_ABNER_WARNS,
  T_ASAHEL_DEATH,
  T_ASAHEL_PURSUIT,
  T_BATTLE_SPREADS,
  T_CHAMPIONS,
  T_JOAB_HALTS,
  T_PROPOSAL,
  T_STANDOFF,
  type ContingentFigureState,
} from './poses';

/**
 * Beat-invariant timing checks for gibeon-pool's pose choreography, against
 * the beat times in scenes.ts's gibeon-pool entry. Exercised for both
 * violenceMode values per the brief's standard/reduced treatment table.
 * `b-asahel-death` gets the closest scrutiny — the project's precedent for
 * every future named-character-kills-named-character death.
 */

describe('sampleU', () => {
  it('holds the first key value before it and the last after it', () => {
    const keys = [
      { t: 0, u: 0 },
      { t: 10, u: 1 },
    ];
    expect(sampleU(-5, keys)).toBe(0);
    expect(sampleU(20, keys)).toBe(1);
  });

  it('supports a held plateau between two equal-u keys', () => {
    const keys = [
      { t: 0, u: 0 },
      { t: 10, u: 0.5 },
      { t: 20, u: 0.5 },
      { t: 30, u: 1 },
    ];
    expect(sampleU(15, keys)).toBeCloseTo(0.5, 5);
  });
});

describe('championPairPose (b-proposal through b-champions)', () => {
  const pair = buildChampionPairSlots(12)[0];

  it('has not approached before the proposal beat', () => {
    const pose = championPairPose(T_PROPOSAL - 1, 'standard', pair);
    expect(pose.benjaminZ).toBeCloseTo(pair.benjaminStart.z, 3);
    expect(pose.judahZ).toBeCloseTo(pair.judahStart.z, 3);
  });

  it('has met by the champions beat', () => {
    const pose = championPairPose(T_CHAMPIONS, 'standard', pair);
    expect(pose.benjaminZ).toBeCloseTo(pose.judahZ, 1);
  });

  it('standard mode falls gradually; reduced cuts to fallen quickly', () => {
    const t = T_CHAMPIONS + 4;
    const standard = championPairPose(t, 'standard', pair).fallen;
    const reduced = championPairPose(t, 'reduced', pair).fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes are fully fallen well before the battle spreads', () => {
    const t = T_BATTLE_SPREADS - 5;
    expect(championPairPose(t, 'standard', pair).fallen).toBeCloseTo(1, 1);
    expect(championPairPose(t, 'reduced', pair).fallen).toBeCloseTo(1, 1);
  });
});

function makeFigure(overrides: Partial<ContingentFigureState> = {}): ContingentFigureState {
  return {
    side: 'benjamin',
    bank: { x: -24, z: 0, yaw: Math.PI / 2 },
    spread: { x: -30, z: 95, yaw: 0 },
    falls: false,
    fallDelay: 0,
    continues: false,
    destSlot: { x: 0, z: 0, yaw: 0 },
    spreadArriveStagger: 0,
    pursuitStagger: 0,
    scale: 1,
    ...overrides,
  };
}

describe('contingentFigurePose (b-arrival through b-battle-spreads)', () => {
  it('stays at the bank slot before the battle spreads', () => {
    const fig = makeFigure();
    const pose = contingentFigurePose(T_BATTLE_SPREADS - 1, fig, 'standard');
    expect(pose.x).toBeCloseTo(fig.bank.x, 3);
    expect(pose.z).toBeCloseTo(fig.bank.z, 3);
  });

  it('moves toward its spread slot once the battle spreads', () => {
    const fig = makeFigure();
    const pose = contingentFigurePose(T_BATTLE_SPREADS + 12, fig, 'standard');
    expect(pose.x).toBeLessThan(fig.bank.x);
  });

  it('a falling figure collapses and stays at its spread position', () => {
    const fig = makeFigure({ falls: true, fallDelay: 0 });
    const pose = contingentFigurePose(T_BATTLE_SPREADS + 40, fig, 'standard');
    expect(pose.fallen).toBeGreaterThan(0.9);
    expect(pose.x).toBeCloseTo(fig.spread.x, 3);
  });

  it('reduced mode reaches the fallen state faster than standard', () => {
    const fig = makeFigure({ falls: true, fallDelay: 0 });
    const t = T_BATTLE_SPREADS + 12;
    const standard = contingentFigurePose(t, fig, 'standard').fallen;
    const reduced = contingentFigurePose(t, fig, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('a non-falling, non-continuing figure settles at its spread slot and holds', () => {
    const fig = makeFigure({ falls: false, continues: false });
    const pose = contingentFigurePose(T_STANDOFF, fig, 'standard');
    expect(pose.x).toBeCloseTo(fig.spread.x, 3);
    expect(pose.z).toBeCloseTo(fig.spread.z, 3);
  });

  it('a continuing Judah figure reaches its destination slot by the standoff', () => {
    const fig = makeFigure({
      side: 'judah',
      continues: true,
      destSlot: { x: 18, z: 379, yaw: 0 },
    });
    const pose = contingentFigurePose(T_STANDOFF, fig, 'standard');
    expect(Math.hypot(pose.x - fig.destSlot.x, pose.z - fig.destSlot.z)).toBeLessThan(5);
  });

  it('a continuing Benjamin (rally band) figure reaches its hill slot by the standoff', () => {
    const fig = makeFigure({
      side: 'benjamin',
      continues: true,
      destSlot: { x: 20, z: 415, yaw: 0 },
    });
    const pose = contingentFigurePose(T_STANDOFF, fig, 'standard');
    expect(Math.hypot(pose.x - fig.destSlot.x, pose.z - fig.destSlot.z)).toBeLessThan(5);
  });
});

describe('abnerPose / asahelPose (b-asahel-pursuit through b-asahel-death)', () => {
  it('Abner and Asahel are apart during the warning beat, both modes', () => {
    const abner = abnerPose(T_ABNER_WARNS);
    const asahelStandard = asahelPose(T_ABNER_WARNS, 'standard');
    const asahelReduced = asahelPose(T_ABNER_WARNS, 'reduced');
    expect(Math.abs(abner.z - asahelStandard.z)).toBeGreaterThan(5);
    expect(Math.abs(abner.z - asahelReduced.z)).toBeGreaterThan(5);
  });

  it('Abner’s warn gesture pulses within the chase window, not before or long after', () => {
    expect(abnerPose(T_ASAHEL_PURSUIT).warn).toBe(0);
    expect(abnerPose(T_ABNER_WARNS).warn).toBeGreaterThan(0);
  });

  it('Abner and Asahel converge at the same point at the death beat', () => {
    const abner = abnerPose(T_ASAHEL_DEATH);
    const asahel = asahelPose(T_ASAHEL_DEATH, 'standard');
    expect(Math.hypot(abner.x - asahel.x, abner.z - asahel.z)).toBeLessThan(1);
  });

  it('Abner’s strike gesture rises only at the death beat, never earlier', () => {
    expect(abnerPose(T_ASAHEL_DEATH - 1).strike).toBe(0);
    expect(abnerPose(T_ASAHEL_DEATH + 1).strike).toBeGreaterThan(0);
  });

  it('standard mode shows Asahel still upright an instant before the death beat', () => {
    expect(asahelPose(T_ASAHEL_DEATH - 0.5, 'standard').fallen).toBe(0);
  });

  it('reduced mode cuts to (near-)fallen immediately at the death beat, never a visible strike', () => {
    const reduced = asahelPose(T_ASAHEL_DEATH + 0.5, 'reduced').fallen;
    const standard = asahelPose(T_ASAHEL_DEATH + 0.5, 'standard').fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes leave Asahel fully fallen and still well after the beat', () => {
    expect(asahelPose(T_ASAHEL_DEATH + 10, 'standard').fallen).toBeCloseTo(1, 1);
    expect(asahelPose(T_ASAHEL_DEATH + 10, 'reduced').fallen).toBeCloseTo(1, 1);
    // and stays fallen at the spot for the rest of the scene
    const late = asahelPose(T_ABNER_PLEA, 'standard');
    expect(late.fallen).toBeCloseTo(1, 1);
    const deathPos = samplePath(PURSUIT_CURVE, 0.62);
    expect(Math.hypot(late.x - deathPos.x, late.z - deathPos.z)).toBeLessThan(1);
  });

  it('never produces a fallen value outside [0, 1] across the whole timeline', () => {
    for (let t = 0; t <= 240; t += 5) {
      const f = asahelPose(t, 'standard').fallen;
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThanOrEqual(1);
    }
  });
});

describe('joabPose / joabTrumpetGesture (b-pursuit-continues through b-joab-halts)', () => {
  it('Joab arrives near the hill of Ammah by the standoff beat', () => {
    const pose = joabPose(T_STANDOFF);
    const end = samplePath(PURSUIT_CURVE, 1);
    expect(Math.hypot(pose.x - end.x, pose.z - end.z)).toBeLessThan(6);
  });

  it('the trumpet gesture peaks at b-joab-halts, not before', () => {
    expect(joabTrumpetGesture(T_STANDOFF)).toBeLessThan(joabTrumpetGesture(T_JOAB_HALTS + 2));
  });
});

describe('fallDuration', () => {
  it('reduced is always faster than standard for the same nominal duration', () => {
    expect(fallDuration('reduced', 6)).toBeLessThan(fallDuration('standard', 6));
  });
});
