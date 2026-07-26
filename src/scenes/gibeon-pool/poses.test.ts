import { describe, expect, it } from 'vitest';
import {
  abishaiPose,
  abnerContingentPose,
  abnerPose,
  abnerProgress,
  abnerWarnGlance,
  asahelPose,
  asahelProgress,
  ASAHEL_DEATH_U,
  championPose,
  duskFactor,
  effectiveTime,
  joabContingentPose,
  joabPose,
  STAND_STILL_DUR,
  stillnessActive,
  T_ABNER_PLEA,
  T_ABNER_WARNS,
  T_ARRIVAL,
  T_ASAHEL_DEATH,
  T_BATTLE_SPREADS,
  T_CHAMPIONS,
  T_JOAB_HALTS,
  T_PROPOSAL,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
} from './poses';
import { ABNER_POOL_POS, AMMAH_HILL_POS, JOAB_POOL_POS } from './layout';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's gibeon-pool entry, and the champions'/Asahel's-death
 * pose functions specifically called out by the brief (the paired
 * grapple/fall function, and the "stood still" held reaction beat).
 */

describe('championPose (b-proposal, b-champions)', () => {
  const start: [number, number] = [0, -17];
  const meet: [number, number] = [0, -2];
  const facingMeet: [number, number] = [0, 2];

  it('stands at the bank-side start position before stepping forward', () => {
    const pose = championPose(T_PROPOSAL, start, meet, facingMeet, 'standard');
    expect(pose.x).toBeCloseTo(start[0], 4);
    expect(pose.z).toBeCloseTo(start[1], 4);
    expect(pose.engage).toBe(0);
    expect(pose.fallen).toBe(0);
  });

  it('has reached the meet position and begun grappling by the champions beat', () => {
    const pose = championPose(T_CHAMPIONS - 0.5, start, meet, facingMeet, 'standard');
    expect(pose.x).toBeCloseTo(meet[0], 1);
    expect(pose.z).toBeCloseTo(meet[1], 1);
    expect(pose.engage).toBeGreaterThan(0.5);
    expect(pose.fallen).toBe(0);
  });

  it('is never fallen before the champions beat, in either mode', () => {
    expect(championPose(T_CHAMPIONS - 1, start, meet, facingMeet, 'standard').fallen).toBe(0);
    expect(championPose(T_CHAMPIONS - 1, start, meet, facingMeet, 'reduced').fallen).toBe(0);
  });

  it('standard mode falls gradually after the champions beat; reduced cuts to fallen', () => {
    const t = T_CHAMPIONS + 1;
    const standard = championPose(t, start, meet, facingMeet, 'standard').fallen;
    const reduced = championPose(t, start, meet, facingMeet, 'reduced').fallen;
    expect(standard).toBeGreaterThan(0);
    expect(standard).toBeLessThan(0.6);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes settle fully fallen (still) well after the beat, and stay together', () => {
    const t = T_CHAMPIONS + 15;
    const a = championPose(t, start, meet, facingMeet, 'standard');
    const b = championPose(t, start, meet, facingMeet, 'reduced');
    expect(a.fallen).toBeCloseTo(1, 1);
    expect(b.fallen).toBeCloseTo(1, 1);
    expect(a.x).toBeCloseTo(b.x, 4);
    expect(a.z).toBeCloseTo(b.z, 4);
  });

  it('one shared function produces mirrored poses for the paired opponent', () => {
    const benj = championPose(T_CHAMPIONS - 0.5, [0, -17], [0, -2], [0, 2], 'standard');
    const jud = championPose(T_CHAMPIONS - 0.5, [0, 17], [0, 2], [0, -2], 'standard');
    // Both champions have advanced toward each other and are facing one another.
    expect(benj.z).toBeLessThan(0);
    expect(jud.z).toBeGreaterThan(0);
  });
});

describe('effectiveTime / stillnessActive (2:23b, the held reaction beat)', () => {
  it('passes time through unchanged before Asahel falls', () => {
    expect(effectiveTime(T_ASAHEL_DEATH - 5)).toBe(T_ASAHEL_DEATH - 5);
  });

  it('freezes for STAND_STILL_DUR seconds starting the instant Asahel falls', () => {
    expect(effectiveTime(T_ASAHEL_DEATH)).toBe(T_ASAHEL_DEATH);
    expect(effectiveTime(T_ASAHEL_DEATH + 2)).toBe(T_ASAHEL_DEATH);
    expect(effectiveTime(T_ASAHEL_DEATH + STAND_STILL_DUR - 0.01)).toBeCloseTo(T_ASAHEL_DEATH, 1);
  });

  it('resumes advancing once the hold ends', () => {
    const t = T_ASAHEL_DEATH + STAND_STILL_DUR + 4;
    expect(effectiveTime(t)).toBeCloseTo(t - STAND_STILL_DUR, 6);
  });

  it('stillnessActive is true only during the hold window', () => {
    expect(stillnessActive(T_ASAHEL_DEATH - 0.1)).toBe(false);
    expect(stillnessActive(T_ASAHEL_DEATH + 1)).toBe(true);
    expect(stillnessActive(T_ASAHEL_DEATH + STAND_STILL_DUR + 1)).toBe(false);
  });
});

describe('abnerPose / asahelPose (b-asahel-pursuit, b-abner-warns, b-asahel-death)', () => {
  it('Abner is reluctant: the warning beat produces backward glances before the strike', () => {
    expect(abnerWarnGlance(T_ABNER_WARNS - 1)).toBe(0);
    expect(abnerWarnGlance(T_ABNER_WARNS + 2)).toBeGreaterThan(0);
    expect(abnerWarnGlance(T_ASAHEL_DEATH + 1)).toBe(0);
  });

  it('Asahel is standing (never fallen) before the death beat, in either mode', () => {
    expect(asahelPose(T_ASAHEL_DEATH - 1, 'standard').fallen).toBe(0);
    expect(asahelPose(T_ASAHEL_DEATH - 1, 'reduced').fallen).toBe(0);
  });

  it("Asahel's pursuit converges on Abner's own position at the exact moment of the strike", () => {
    const abner = abnerPose(T_ASAHEL_DEATH, 'standard');
    const asahel = asahelPose(T_ASAHEL_DEATH, 'standard');
    expect(asahelProgress(T_ASAHEL_DEATH)).toBeCloseTo(ASAHEL_DEATH_U, 6);
    expect(asahel.x).toBeCloseTo(abner.x, 3);
    expect(asahel.z).toBeCloseTo(abner.z, 3);
  });

  it('standard mode falls gradually after the death beat; reduced cuts to fallen quickly', () => {
    const t = T_ASAHEL_DEATH + 1;
    const standard = asahelPose(t, 'standard').fallen;
    const reduced = asahelPose(t, 'reduced').fallen;
    expect(standard).toBeGreaterThan(0);
    expect(standard).toBeLessThan(0.8);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('Asahel stays fallen and still (never rises again) for the rest of the scene', () => {
    expect(asahelPose(T_STANDOFF, 'standard').fallen).toBeCloseTo(1, 1);
    expect(asahelPose(T_ABNER_PLEA, 'standard').fallen).toBeCloseTo(1, 1);
  });

  it('the reversed-spear-grip gesture is brief, centered on the death beat, in both modes', () => {
    expect(abnerPose(T_ASAHEL_DEATH - 3, 'standard').spearReverse).toBe(0);
    expect(abnerPose(T_ASAHEL_DEATH + 0.5, 'standard').spearReverse).toBeGreaterThan(0);
    expect(abnerPose(T_ASAHEL_DEATH + 30, 'standard').spearReverse).toBeCloseTo(0, 1);
  });

  it('Abner pauses (does not advance toward the hill) during the stillness hold', () => {
    const atDeath = abnerProgress(T_ASAHEL_DEATH);
    const duringHold = abnerProgress(T_ASAHEL_DEATH + STAND_STILL_DUR - 0.5);
    expect(duringHold).toBeCloseTo(atDeath, 4);
  });

  it('Abner resumes toward the hill of Ammah after the hold ends', () => {
    const afterHold = abnerProgress(T_ASAHEL_DEATH + STAND_STILL_DUR + 20);
    expect(afterHold).toBeGreaterThan(abnerProgress(T_ASAHEL_DEATH));
  });

  it('Abner leans into the plea gesture at the hill (2:26), not before', () => {
    expect(abnerPose(T_ABNER_PLEA - 5, 'standard').lean).toBe(0);
    expect(abnerPose(T_ABNER_PLEA + 2, 'standard').lean).toBeGreaterThan(0);
  });

  it('never produces wound/blood/dismemberment fields — the pose shape stays position/rotation only', () => {
    const pose = asahelPose(T_ASAHEL_DEATH + 2, 'standard');
    expect(Object.keys(pose).sort()).toEqual(['fallen', 'x', 'yaw', 'z']);
  });
});

describe('joabPose / abishaiPose (b-pursuit-continues, b-standoff, b-joab-halts)', () => {
  it('holds at the pool through the champions/battle-spreads beats', () => {
    const pose = joabPose(T_CHAMPIONS);
    expect(pose.x).toBeCloseTo(JOAB_POOL_POS[0], 3);
    expect(pose.z).toBeCloseTo(JOAB_POOL_POS[1], 3);
  });

  it('is short of the hill of Ammah summit even once halted (stays at the base)', () => {
    const pose = joabPose(T_JOAB_HALTS + 5);
    const distToSummit = Math.hypot(pose.x - AMMAH_HILL_POS[0], pose.z - AMMAH_HILL_POS[1]);
    expect(distToSummit).toBeGreaterThan(15);
  });

  it('Abishai stays near Joab throughout, never coincident with him', () => {
    const t = T_JOAB_HALTS + 2;
    const joab = joabPose(t);
    const abishai = abishaiPose(t);
    const dist = Math.hypot(joab.x - abishai.x, joab.z - abishai.z);
    expect(dist).toBeGreaterThan(0.5);
    expect(dist).toBeLessThan(15);
  });
});

describe('abnerContingentPose (b-arrival through b-standoff)', () => {
  const bank: [number, number] = [3, -30];
  const battle: [number, number] = [58, -22];
  const hillTop: [number, number] = [228, 48];

  it('stays at the bank slot before the battle spreads', () => {
    const pose = abnerContingentPose(T_ARRIVAL, bank, battle, hillTop, false, 0, 'standard');
    expect(pose.x).toBeCloseTo(bank[0], 3);
    expect(pose.z).toBeCloseTo(bank[1], 3);
    expect(pose.visible).toBe(true);
  });

  it('a falling figure crumples in standard mode but fades in reduced mode', () => {
    const t = T_BATTLE_SPREADS + 20;
    const standard = abnerContingentPose(t, bank, battle, hillTop, true, 1, 'standard');
    const reduced = abnerContingentPose(t, bank, battle, hillTop, true, 1, 'reduced');
    expect(standard.fallen).toBeGreaterThan(0.5);
    expect(standard.visible).toBe(true);
    expect(reduced.fallen).toBe(0);
    expect(reduced.visible).toBe(false);
  });

  it('a rallying, surviving figure advances to the hill of Ammah by the standoff beat', () => {
    const pose = abnerContingentPose(T_STANDOFF, bank, battle, hillTop, false, 0, 'standard');
    expect(pose.x).toBeCloseTo(hillTop[0], 0);
    expect(pose.z).toBeCloseTo(hillTop[1], 0);
    expect(pose.visible).toBe(true);
  });

  it('a non-rallying, surviving figure disperses (fades) rather than climbing the hill', () => {
    const pose = abnerContingentPose(T_STANDOFF, bank, battle, null, false, 0, 'standard');
    expect(pose.visible).toBe(false);
  });
});

describe('joabContingentPose (b-arrival through b-joab-halts)', () => {
  const bank: [number, number] = [-3, 30];
  const battle: [number, number] = [58, 22];
  const hillBase: [number, number] = [200, 44];

  it('stays at the bank slot before the battle spreads', () => {
    const pose = joabContingentPose(T_ARRIVAL, bank, battle, hillBase, false, 0, 'standard');
    expect(pose.x).toBeCloseTo(bank[0], 3);
    expect(pose.z).toBeCloseTo(bank[1], 3);
  });

  it('reaches the hill base (never rallying up the hill) by the halt beat', () => {
    const pose = joabContingentPose(T_JOAB_HALTS + 5, bank, battle, hillBase, false, 0, 'standard');
    expect(pose.x).toBeCloseTo(hillBase[0], 0);
    expect(pose.z).toBeCloseTo(hillBase[1], 0);
  });

  it('a falling figure crumples in standard mode but fades in reduced mode', () => {
    const t = T_BATTLE_SPREADS + 20;
    const standard = joabContingentPose(t, bank, battle, hillBase, true, 1, 'standard');
    const reduced = joabContingentPose(t, bank, battle, hillBase, true, 1, 'reduced');
    expect(standard.fallen).toBeGreaterThan(0.5);
    expect(reduced.visible).toBe(false);
  });
});

describe('duskFactor (2:24 "as the sun was going down")', () => {
  it('is daylight through the champions/battle beats', () => {
    expect(duskFactor(T_CHAMPIONS)).toBeLessThan(0.1);
  });

  it('has settled to dusk by the pursuit-continues/standoff beats', () => {
    expect(duskFactor(T_PURSUIT_CONTINUES)).toBeGreaterThan(0.5);
    expect(duskFactor(T_STANDOFF)).toBeGreaterThan(0.9);
  });
});

describe('layout sanity', () => {
  it('Abner and Joab start on opposite banks of the pool', () => {
    expect(ABNER_POOL_POS[1]).toBeLessThan(0);
    expect(JOAB_POOL_POS[1]).toBeGreaterThan(0);
  });
});
