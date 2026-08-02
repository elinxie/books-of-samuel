import { describe, expect, it } from 'vitest';
import { DEATH_ROUTE_U, pursuitPointAt } from './layout';
import {
  abnerPrincipalPose,
  abnerStrikePose,
  asahelPrincipalPose,
  championPairPose,
  contingentFigurePose,
  duskBlend,
  joabAbishaiPose,
  pursuitClock,
  STAND_STILL_DUR,
  T_ABNER_WARNS,
  T_ASAHEL_DEATH,
  T_ASAHEL_PURSUIT,
  T_BATTLE_SPREADS,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
  type ContingentFigureParams,
} from './poses';

/**
 * Beat-invariant timing checks against `src/data/scenes.ts`'s `gibeon-pool`
 * beat times, mirroring gilboa-battle/poses.test.ts's density. Exercised for
 * both violenceMode values per docs/design/gibeon-pool-brief.md's
 * standard/reduced treatment table.
 */

describe('pursuitClock (the "stood still" reaction beat, 2:23b)', () => {
  it('tracks raw time before the death beat', () => {
    expect(pursuitClock(T_ASAHEL_DEATH - 5)).toBe(T_ASAHEL_DEATH - 5);
  });

  it('freezes at the death beat throughout the hold window', () => {
    expect(pursuitClock(T_ASAHEL_DEATH)).toBe(T_ASAHEL_DEATH);
    expect(pursuitClock(T_ASAHEL_DEATH + STAND_STILL_DUR / 2)).toBe(T_ASAHEL_DEATH);
    expect(pursuitClock(T_ASAHEL_DEATH + STAND_STILL_DUR)).toBe(T_ASAHEL_DEATH);
  });

  it('resumes continuously right after the hold window', () => {
    const after = T_ASAHEL_DEATH + STAND_STILL_DUR + 4;
    expect(pursuitClock(after)).toBe(after - STAND_STILL_DUR);
  });
});

describe('championPairPose (b-champions, 2:14-16)', () => {
  it('is apart and standing before its own start time', () => {
    const pose = championPairPose(0, 'standard', 0);
    expect(pose.approach).toBe(0);
    expect(pose.fallen).toBe(0);
  });

  it('approaches before falling, both modes', () => {
    const t = 54; // T_CHAMPIONS(52) + 2s into the approach
    expect(championPairPose(t, 'standard', 0).approach).toBeGreaterThan(0);
    expect(championPairPose(t, 'standard', 0).fallen).toBe(0);
  });

  it('standard falls gradually; reduced cuts to fallen faster', () => {
    const t = 52 + 4 + 1; // just past the grapple lead, into the fall window
    const standard = championPairPose(t, 'standard', 0).fallen;
    const reduced = championPairPose(t, 'reduced', 0).fallen;
    expect(standard).toBeGreaterThan(0);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('a later pair (nonzero offset) starts later than the first', () => {
    const t = 53;
    expect(championPairPose(t, 'standard', 3).approach).toBeLessThan(
      championPairPose(t, 'standard', 0).approach,
    );
  });
});

describe('contingentFigurePose', () => {
  const base: ContingentFigureParams = {
    side: 'abner',
    role: 'falls',
    bank: [0, -40],
    spread: [10, -10],
    arriveDelay: 0,
    fallDelay: 2,
    scatterTargetU: 0.3,
    scatterFadeDelay: 0,
    routeDelay: 0,
    routeArriveDelay: 0,
  };

  it('holds at the bank before the battle spreads', () => {
    const pose = contingentFigurePose(0, base, 'standard');
    expect(pose.x).toBe(base.bank[0]);
    expect(pose.z).toBe(base.bank[1]);
    expect(pose.moving).toBe(false);
  });

  it('walks from the bank toward the spread position once the battle spreads', () => {
    const pose = contingentFigurePose(T_BATTLE_SPREADS + 4, base, 'standard');
    expect(pose.moving).toBe(true);
    expect(pose.x).toBeGreaterThan(base.bank[0]);
  });

  it('a "falls" figure collapses after arriving and its fall delay, standard gradual', () => {
    const arriveAt = T_BATTLE_SPREADS + 9 + base.fallDelay;
    expect(contingentFigurePose(arriveAt - 0.1, base, 'standard').fallen).toBe(0);
    expect(contingentFigurePose(arriveAt + 6, base, 'standard').fallen).toBeCloseTo(1, 1);
  });

  it('reduced mode elides the fall entirely — the figure fades instead of collapsing', () => {
    const arriveAt = T_BATTLE_SPREADS + 9 + base.fallDelay;
    const pose = contingentFigurePose(arriveAt + 6, base, 'reduced');
    expect(pose.fallen).toBe(0);
    expect(pose.visible).toBe(false);
  });

  it('a "hold" figure stays at the spread position for the rest of the scene', () => {
    const hold: ContingentFigureParams = { ...base, role: 'hold' };
    const pose = contingentFigurePose(T_STANDOFF + 20, hold, 'standard');
    expect(pose.x).toBe(base.spread[0]);
    expect(pose.z).toBe(base.spread[1]);
    expect(pose.fallen).toBe(0);
  });

  it('a "rally" figure eventually settles into its final slot', () => {
    const rally: ContingentFigureParams = {
      ...base,
      role: 'rally',
      finalSlot: [345, -8],
    };
    const pose = contingentFigurePose(T_STANDOFF + 30, rally, 'standard');
    expect(pose.x).toBeCloseTo(345, 0);
    expect(pose.z).toBeCloseTo(-8, 0);
    expect(pose.visible).toBe(true);
  });

  it('a "scatter" figure eventually fades from the scene, not depicted falling', () => {
    const scatter: ContingentFigureParams = { ...base, role: 'scatter' };
    const pose = contingentFigurePose(T_STANDOFF + 30, scatter, 'standard');
    expect(pose.fallen).toBe(0);
    expect(pose.visible).toBe(false);
  });
});

describe('abnerPrincipalPose (2:19-26)', () => {
  const spec = {
    bank: [0, -40] as [number, number],
    spread: [10, -10] as [number, number],
    rallySlot: [345, -8] as [number, number],
  };

  it('reaches the death point exactly at T_ABNER_WARNS, at DEATH_ROUTE_U along the route', () => {
    const pose = abnerPrincipalPose(T_ABNER_WARNS, spec);
    const expected = pursuitPointAt(DEATH_ROUTE_U);
    expect(pose.x).toBeCloseTo(expected.x, 3);
    expect(pose.z).toBeCloseTo(expected.z, 3);
  });

  it('stays at the death point throughout the held reaction beat', () => {
    const atDeath = abnerPrincipalPose(T_ASAHEL_DEATH, spec);
    const midHold = abnerPrincipalPose(T_ASAHEL_DEATH + 3, spec);
    expect(midHold.x).toBeCloseTo(atDeath.x, 5);
    expect(midHold.z).toBeCloseTo(atDeath.z, 5);
  });

  it('eventually settles at the rally slot on the hill', () => {
    const pose = abnerPrincipalPose(T_STANDOFF + 20, spec);
    expect(pose.x).toBeCloseTo(345, 0);
    expect(pose.z).toBeCloseTo(-8, 0);
  });
});

describe('asahelPrincipalPose (2:18-23)', () => {
  const spec = { bank: [0, 40] as [number, number], spread: [10, 10] as [number, number] };

  it('is standing and unfallen before the death beat, both modes', () => {
    expect(asahelPrincipalPose(T_ASAHEL_DEATH - 1, 'standard', spec).fallen).toBe(0);
    expect(asahelPrincipalPose(T_ASAHEL_DEATH - 1, 'reduced', spec).fallen).toBe(0);
  });

  it('standard falls gradually; reduced cuts to fallen faster', () => {
    const t = T_ASAHEL_DEATH + 1;
    const standard = asahelPrincipalPose(t, 'standard', spec).fallen;
    const reduced = asahelPrincipalPose(t, 'reduced', spec).fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('remains at the death point once fallen, in both modes', () => {
    const expected = pursuitPointAt(DEATH_ROUTE_U);
    const standard = asahelPrincipalPose(T_ASAHEL_DEATH + 10, 'standard', spec);
    expect(standard.x).toBeCloseTo(expected.x, 3);
    expect(standard.z).toBeCloseTo(expected.z, 3);
  });
});

describe('joabAbishaiPose (2:24-28)', () => {
  const spec = {
    bank: [0, 40] as [number, number],
    spread: [10, 10] as [number, number],
    pursuerSlot: [322, 4] as [number, number],
  };

  it('arrives near the pursuer slot by the standoff', () => {
    const pose = joabAbishaiPose(T_STANDOFF + 15, spec);
    expect(pose.x).toBeCloseTo(322, 0);
    expect(pose.z).toBeCloseTo(4, 0);
  });

  it('Abishai (nonzero arriveOffset) can lag slightly behind Joab mid-pursuit', () => {
    const t = T_ASAHEL_PURSUIT + 20;
    const joab = joabAbishaiPose(t, spec, 0);
    const abishai = joabAbishaiPose(t, spec, 3);
    expect(abishai.x).toBeLessThanOrEqual(joab.x + 0.001);
  });
});

describe('duskBlend (2:24, "the sun was going down")', () => {
  it('is at the daytime rig before b-pursuit-continues', () => {
    expect(duskBlend(T_PURSUIT_CONTINUES - 1)).toBe(0);
  });

  it('ramps to the dusk rig across b-pursuit-continues through b-standoff', () => {
    const mid = duskBlend((T_PURSUIT_CONTINUES + T_STANDOFF) / 2);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });

  it('holds at the dusk rig from the standoff onward', () => {
    expect(duskBlend(T_STANDOFF)).toBeCloseTo(1, 5);
    expect(duskBlend(T_STANDOFF + 50)).toBeCloseTo(1, 5);
  });
});

describe('abnerStrikePose (b-abner-warns, b-asahel-death)', () => {
  it('is reluctant (turning back) during the warnings, not before them', () => {
    expect(abnerStrikePose(T_ABNER_WARNS - 5, 'standard').reluctanceTurn).toBe(0);
    expect(abnerStrikePose(T_ABNER_WARNS + 2, 'standard').reluctanceTurn).toBeGreaterThan(0);
  });

  it('reduced mode never shows the grip reversal or strike extension', () => {
    for (const t of [T_ASAHEL_DEATH - 2, T_ASAHEL_DEATH, T_ASAHEL_DEATH + 2]) {
      const pose = abnerStrikePose(t, 'reduced');
      expect(pose.reverseGrip).toBe(0);
      expect(pose.strikeExtend).toBe(0);
    }
  });

  it('standard mode reverses the grip before the strike extends', () => {
    const windup = abnerStrikePose(T_ASAHEL_DEATH - 1, 'standard');
    expect(windup.reverseGrip).toBeGreaterThan(0);
    expect(windup.strikeExtend).toBeLessThan(0.3);
    const strike = abnerStrikePose(T_ASAHEL_DEATH + 1, 'standard');
    expect(strike.strikeExtend).toBeGreaterThan(0.5);
  });

  it('the reluctance turn resolves by the strike, identically in both modes', () => {
    const t = T_ASAHEL_DEATH + 2;
    expect(abnerStrikePose(t, 'standard').reluctanceTurn).toBeCloseTo(
      abnerStrikePose(t, 'reduced').reluctanceTurn,
      5,
    );
  });
});
