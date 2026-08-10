import { describe, expect, it } from 'vitest';
import { ASIDE_POINT, DAVID_GRAVE_POS, MOURNING_GATHER_SLOTS, TOMB_CENTER } from './layout';
import {
  abishaiGatePose,
  abnerGatePose,
  bierPose,
  davidGatePose,
  duskBlend,
  fallDuration,
  joabPose,
  mournerFigurePose,
  raidFigurePose,
  T_ABNER_DEATH,
  T_BURIAL_WEEP,
  T_CLOSE,
  T_FAST,
  T_GATE_ASIDE,
  T_MOURNING_CMD,
  T_PEOPLE_NOTE,
  T_PROCESSION,
  T_PROTEST,
  T_RECALL,
  DURATION_SEC,
} from './poses';

/**
 * Beat-invariant timing checks against the beat table in
 * src/data/scenes.ts's hebron-gate entry. Per ADR-009 (and this scene's own
 * brief, "the milestone's load-bearing" application of the named-character-
 * killing template), the hardest invariants this file guards:
 *
 * - Abner is never rendered before his silent re-entry, and never rendered
 *   once the bier takes over (no lingering focus on the body).
 * - The strike itself never carries a weapon gesture in either mode; reduced
 *   mode's collapse is dramatically faster (the "elide the strike" brief
 *   requirement), never merely the same speed with detail hidden.
 * - Joab alone performs the strike lean; Abishai never enters the passage.
 * - David is always behind the bier during the procession, never ahead of it.
 */

describe('raidFigurePose', () => {
  const fig = { arriveStagger: 0, laneOffset: 0, destSlot: [12, -6] as [number, number] };

  it('reaches and holds its destination slot well after arriving', () => {
    const pose = raidFigurePose(30, fig);
    expect(pose.x).toBeCloseTo(12, 3);
    expect(pose.z).toBeCloseTo(-6, 3);
  });

  it('is still short of the destination during the raid-road walk', () => {
    const pose = raidFigurePose(2, fig);
    const dist = Math.hypot(pose.x - 12, pose.z - -6);
    expect(dist).toBeGreaterThan(5);
  });
});

describe('mournerFigurePose', () => {
  const fig = {
    gather: MOURNING_GATHER_SLOTS[0],
    gatherYaw: 0,
    tomb: [TOMB_CENTER[0] + 2, TOMB_CENTER[1]] as [number, number],
    tombYaw: 0,
    stagger: 0,
    laneOffset: 0,
  };

  it('stays at its gather slot before the procession begins', () => {
    const pose = mournerFigurePose(T_PROCESSION - 1, fig);
    expect(pose.x).toBeCloseTo(fig.gather[0], 4);
    expect(pose.z).toBeCloseTo(fig.gather[1], 4);
    expect(pose.moving).toBe(false);
  });

  it('reaches its tomb slot and stops moving by the burial beat', () => {
    const pose = mournerFigurePose(T_BURIAL_WEEP, fig);
    expect(pose.x).toBeCloseTo(fig.tomb[0], 2);
    expect(pose.z).toBeCloseTo(fig.tomb[1], 2);
    expect(pose.moving).toBe(false);
  });

  it('is moving partway through the procession window', () => {
    const pose = mournerFigurePose((T_PROCESSION + T_BURIAL_WEEP) / 2, fig);
    expect(pose.moving).toBe(true);
  });
});

describe('joabPose (the strike is Joab’s alone)', () => {
  it('has no lead gesture or strike lean before the gate-aside beat', () => {
    const pose = joabPose(T_RECALL, 'standard');
    expect(pose.leadGesture).toBe(0);
    expect(pose.strikeLean).toBe(0);
  });

  it('the protest gesture rises during the protest beat', () => {
    expect(joabPose(T_PROTEST + 1, 'standard').protest).toBeGreaterThan(0.2);
  });

  it('the drawing-aside gesture is fully engaged by the time of the strike', () => {
    expect(joabPose(T_ABNER_DEATH, 'standard').leadGesture).toBeCloseTo(1, 2);
  });

  it('carries a brief strike lean in standard mode at the moment of the strike', () => {
    expect(joabPose(T_ABNER_DEATH, 'standard').strikeLean).toBeGreaterThan(0.3);
  });

  it('never carries any strike lean in reduced mode (elided per ADR-009)', () => {
    for (const t of [
      T_GATE_ASIDE,
      T_ABNER_DEATH - 1,
      T_ABNER_DEATH,
      T_ABNER_DEATH + 1,
      T_MOURNING_CMD,
    ]) {
      expect(joabPose(t, 'reduced').strikeLean).toBe(0);
    }
  });

  it('rises into the mourning posture once the mourning command begins', () => {
    expect(joabPose(T_MOURNING_CMD - 1, 'standard').mourning).toBe(0);
    expect(joabPose(T_MOURNING_CMD + 4, 'standard').mourning).toBeGreaterThan(0.5);
  });
});

describe('abnerGatePose (documentary distance, ADR-009)', () => {
  it('is not rendered before his silent re-entry', () => {
    expect(abnerGatePose(T_RECALL, 'standard').visible).toBe(false);
  });

  it('is not rendered once the bier takes over the body', () => {
    expect(abnerGatePose(T_MOURNING_CMD, 'standard').visible).toBe(false);
  });

  it('is visible and unfallen at the aside point just before the strike', () => {
    const pose = abnerGatePose(T_GATE_ASIDE + 5, 'standard');
    expect(pose.visible).toBe(true);
    expect(pose.fallen).toBe(0);
  });

  it('standard mode falls gradually, not instantly', () => {
    const justAfter = abnerGatePose(T_ABNER_DEATH + 0.3, 'standard');
    expect(justAfter.fallen).toBeGreaterThan(0);
    expect(justAfter.fallen).toBeLessThan(0.9);
  });

  it('reduced mode collapses far faster than standard (the strike itself is elided)', () => {
    const reducedFallen = abnerGatePose(T_ABNER_DEATH + 0.3, 'reduced').fallen;
    const standardFallen = abnerGatePose(T_ABNER_DEATH + 0.3, 'standard').fallen;
    expect(reducedFallen).toBeGreaterThan(standardFallen);
  });

  it('is fully fallen well after the strike in both modes', () => {
    expect(abnerGatePose(T_ABNER_DEATH + 8, 'standard').fallen).toBeCloseTo(1, 2);
    expect(abnerGatePose(T_ABNER_DEATH + 8, 'reduced').fallen).toBeCloseTo(1, 2);
  });

  it('stays at the aside point, never moved into a different chamber, once fallen', () => {
    const pose = abnerGatePose(T_ABNER_DEATH + 8, 'standard');
    expect(Math.hypot(pose.x - ASIDE_POINT[0], pose.z - ASIDE_POINT[1])).toBeLessThan(2);
  });
});

describe('abishaiGatePose (present near the gate, never inside the passage)', () => {
  it('is invisible outside the gate-aside/death window', () => {
    expect(abishaiGatePose(T_RECALL).visible).toBe(false);
    expect(abishaiGatePose(T_MOURNING_CMD).visible).toBe(false);
  });

  it('never enters the aside point itself, staying outside the passage', () => {
    const pose = abishaiGatePose(T_ABNER_DEATH);
    const distFromAside = Math.hypot(pose.x - ASIDE_POINT[0], pose.z - ASIDE_POINT[1]);
    expect(distFromAside).toBeGreaterThan(3);
  });
});

describe('bierPose (funerary handling — never mid-burial)', () => {
  it('is hidden before the mourning command', () => {
    expect(bierPose(T_MOURNING_CMD - 1).visible).toBe(false);
  });

  it('is visible and carried through the procession', () => {
    const pose = bierPose((T_PROCESSION + T_BURIAL_WEEP) / 2);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeCloseTo(1, 2);
  });

  it('is hidden again once burial/interment completes, before the lament', () => {
    expect(bierPose(T_BURIAL_WEEP + 5).visible).toBe(false);
  });
});

describe('davidGatePose (always behind the bier)', () => {
  it('trails the bier’s own arrival at the grave', () => {
    const davidPose = davidGatePose(T_BURIAL_WEEP);
    // David has not yet settled at the grave exactly when the bier does.
    const distFromGrave = Math.hypot(
      davidPose.x - DAVID_GRAVE_POS[0],
      davidPose.z - DAVID_GRAVE_POS[1],
    );
    expect(distFromGrave).toBeGreaterThan(0.5);
  });

  it('settles at the grave well after burial, with a grieving posture through the lament window', () => {
    const pose = davidGatePose(T_BURIAL_WEEP + 6);
    expect(pose.x).toBeCloseTo(DAVID_GRAVE_POS[0], 2);
    expect(pose.grieve).toBeGreaterThan(0);
  });
});

describe('fallDuration', () => {
  it('reduced mode is much shorter than standard', () => {
    expect(fallDuration('reduced', 6)).toBeLessThan(fallDuration('standard', 6) * 0.3);
  });
});

describe('duskBlend', () => {
  it('is zero before the fast beat (flat daylight for the killing/disavowal)', () => {
    expect(duskBlend(T_FAST - 1)).toBe(0);
  });

  it('reaches full dusk by the closing beats', () => {
    expect(duskBlend(T_PEOPLE_NOTE)).toBeCloseTo(1, 4);
    expect(duskBlend(T_CLOSE)).toBeCloseTo(1, 4);
  });
});

describe('scene duration', () => {
  it('holds every named beat time within the scene duration', () => {
    expect(T_CLOSE).toBeLessThan(DURATION_SEC);
  });
});
