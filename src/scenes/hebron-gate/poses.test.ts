import { describe, expect, it } from 'vitest';
import { GATE_ASIDE_POCKET, GATE_SOUTH_MOUTH, TOMB_ENTRANCE_INSET } from './layout';
import {
  abishaiGatePose,
  abnerGatePose,
  bierPose,
  davidGatePose,
  duskBlend,
  gateStrikePose,
  joabGatePose,
  mournerPose,
  mourningDressBlend,
  raidPartyMemberPose,
  T_ABNER_DEATH,
  T_CLOSE,
  T_DAVID_HEARS,
  T_FAST,
  T_GATE_ASIDE,
  T_JOAB_RETURNS,
  T_MOURNING_CMD,
  T_PEOPLE_NOTE,
  T_PROCESSION,
  T_PROTEST,
  T_RECALL,
  tearGestureEnvelope,
} from './poses';

/**
 * Beat-invariant timing checks against `src/data/scenes.ts`'s `hebron-gate`
 * entry, mirroring gibeon-pool/hebron-covenant's poses.test.ts density. The
 * hardest invariants guarded here: (1) Abner is never visible before
 * `T_GATE_ASIDE` — the cistern-of-Sirah recall stays narrated-only, never
 * staged (2) the strike is staged as Joab's alone, with `thrust` always zero
 * in reduced mode (ADR-009's elided-strike discipline) (3) the wrapped bier
 * only ever appears once Abner's own fallen rig has finished its role, never
 * both visible at once (4) the mourning dress swap and the funeral
 * procession only ever begin at their own beats, never earlier.
 */

describe('raidPartyMemberPose (3:22)', () => {
  it('arrives and settles at its destination slot, staying there', () => {
    const fig = { laneOffset: 0, arriveStagger: 0, destSlot: [26, -9] as const };
    const early = raidPartyMemberPose(T_JOAB_RETURNS + 1, fig);
    const late = raidPartyMemberPose(T_PROTEST + 10, fig);
    expect(late.x).toBeCloseTo(26, 1);
    expect(late.z).toBeCloseTo(-9, 1);
    expect(early.x).not.toBeCloseTo(26, 0);
  });
});

describe('abnerGatePose (3:26-27) — the recall stays narrated-only', () => {
  it('is invisible before the gate-aside beat, in both modes', () => {
    for (const t of [T_JOAB_RETURNS, T_PROTEST, T_RECALL, T_GATE_ASIDE - 1]) {
      expect(abnerGatePose(t, 'standard').visible).toBe(false);
      expect(abnerGatePose(t, 'reduced').visible).toBe(false);
    }
  });

  it('becomes visible once the gate-aside beat begins', () => {
    expect(abnerGatePose(T_GATE_ASIDE + 0.5, 'standard').visible).toBe(true);
  });

  it('is unfallen right up to the strike, in both modes', () => {
    expect(abnerGatePose(T_ABNER_DEATH - 0.5, 'standard').fallen).toBe(0);
    expect(abnerGatePose(T_ABNER_DEATH - 0.5, 'reduced').fallen).toBe(0);
  });

  it('standard falls gradually; reduced cuts to fallen faster (elided strike, same eventual fact)', () => {
    const t = T_ABNER_DEATH + 1;
    const standard = abnerGatePose(t, 'standard').fallen;
    const reduced = abnerGatePose(t, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
  });

  it('is drawn to the gate’s own shadowed alcove by the time of the strike', () => {
    const pose = abnerGatePose(T_ABNER_DEATH, 'standard');
    expect(pose.x).toBeCloseTo(GATE_ASIDE_POCKET[0], 0);
    expect(pose.z).toBeCloseTo(GATE_ASIDE_POCKET[1], 0);
  });

  it('hands off to the bier at the mourning-command beat (own rig no longer rendered)', () => {
    expect(abnerGatePose(T_MOURNING_CMD, 'standard').visible).toBe(false);
  });
});

describe('gateStrikePose (b-gate-aside, b-abner-death) — ADR-009 elided-strike discipline', () => {
  it('reduced mode never extends the strike thrust, at any point around the death beat', () => {
    for (const t of [T_ABNER_DEATH - 2, T_ABNER_DEATH, T_ABNER_DEATH + 2]) {
      expect(gateStrikePose(t, 'reduced').thrust).toBe(0);
    }
  });

  it('standard mode extends the thrust at the death beat', () => {
    expect(gateStrikePose(T_ABNER_DEATH + 0.6, 'standard').thrust).toBeGreaterThan(0.5);
  });

  it('the aside gesture itself is identical in both modes (the one non-graphic detail shown as gesture)', () => {
    const t = T_GATE_ASIDE + 10;
    expect(gateStrikePose(t, 'standard').asideAmount).toBeCloseTo(
      gateStrikePose(t, 'reduced').asideAmount,
      5,
    );
  });
});

describe('joabGatePose — the strike staged as Joab’s alone', () => {
  it('is near the gate’s south mouth just before being drawn aside', () => {
    const pose = joabGatePose(T_GATE_ASIDE + 5, 'standard');
    expect(Math.hypot(pose.x - GATE_SOUTH_MOUTH[0], pose.z - GATE_SOUTH_MOUTH[1])).toBeLessThan(60);
  });

  it('tears his clothes (a brief gesture) at the mourning-command beat, not earlier', () => {
    expect(joabGatePose(T_PROTEST, 'standard').tear).toBe(0);
    expect(joabGatePose(T_MOURNING_CMD + 1.5, 'standard').tear).toBeGreaterThan(0.5);
  });
});

describe('abishaiGatePose — present, never staged striking anyone', () => {
  it('arrives at and holds its destination slot', () => {
    const dest = [3.4, -39.5] as const;
    const pose = abishaiGatePose(T_PROTEST + 10, dest);
    expect(pose.x).toBeCloseTo(3.4, 1);
    expect(pose.z).toBeCloseTo(-39.5, 1);
  });
});

describe('davidGatePose — present throughout, never traveling before the procession', () => {
  it('stays at the plaza position through the killing and disavowal', () => {
    const p1 = davidGatePose(T_JOAB_RETURNS);
    const p2 = davidGatePose(T_MOURNING_CMD - 1);
    expect(p1.x).toBeCloseTo(p2.x, 5);
    expect(p1.z).toBeCloseTo(p2.z, 5);
  });

  it('gestures (a brief address) at the disavowal beat, not at the raid-return beat', () => {
    expect(davidGatePose(T_JOAB_RETURNS + 1).address).toBe(0);
    expect(davidGatePose(T_DAVID_HEARS + 4).address).toBeGreaterThan(0.5);
  });

  it('gestures again at the close (3:38-39)', () => {
    expect(davidGatePose(T_CLOSE + 3).address).toBeGreaterThan(0.5);
  });

  it('moves during the procession, arriving away from the plaza position', () => {
    const plaza = davidGatePose(T_PROCESSION - 1);
    const atTomb = davidGatePose(T_PROCESSION + 30);
    expect(Math.hypot(atTomb.x - plaza.x, atTomb.z - plaza.z)).toBeGreaterThan(5);
  });
});

describe('mourningDressBlend and tearGestureEnvelope', () => {
  it('is zero before the mourning-command beat, one at and after it', () => {
    expect(mourningDressBlend(T_MOURNING_CMD - 1)).toBe(0);
    expect(mourningDressBlend(T_MOURNING_CMD)).toBe(1);
    expect(mourningDressBlend(T_FAST)).toBe(1);
  });

  it('the tear gesture is a brief bell curve, not a sustained state', () => {
    expect(tearGestureEnvelope(T_MOURNING_CMD - 10)).toBe(0);
    expect(tearGestureEnvelope(T_PROCESSION)).toBe(0);
  });
});

describe('mournerPose — bystanders through the killing, mourners on the procession', () => {
  const fig = {
    watchSlot: [10, -22] as const,
    tombSlot: [-62, -52] as const,
    stagger: 0,
    laneOffset: 0,
  };

  it('holds at the watch slot before the procession beat', () => {
    const pose = mournerPose(T_MOURNING_CMD, fig);
    expect(pose.x).toBeCloseTo(10, 5);
    expect(pose.z).toBeCloseTo(-22, 5);
  });

  it('is dressed for mourning once the mourning-command beat has passed', () => {
    expect(mournerPose(T_MOURNING_CMD, fig).mourning).toBe(1);
    expect(mournerPose(T_PROTEST, fig).mourning).toBe(0);
  });

  it('eventually reaches its tomb-watch slot', () => {
    const pose = mournerPose(T_PROCESSION + 40, fig);
    expect(pose.x).toBeCloseTo(-62, 0);
    expect(pose.z).toBeCloseTo(-52, 0);
  });
});

describe('bierPose (3:31-32) — the ADR-009 funerary standard takes over from Abner’s own rig', () => {
  it('is not visible before the mourning-command beat (Abner’s own rig carries the body until then)', () => {
    expect(bierPose(T_ABNER_DEATH + 1).visible).toBe(false);
    expect(bierPose(T_MOURNING_CMD - 0.1).visible).toBe(false);
  });

  it('appears at the gate once the mourning command is given', () => {
    const pose = bierPose(T_MOURNING_CMD);
    expect(pose.visible).toBe(true);
    expect(pose.x).toBeCloseTo(GATE_ASIDE_POCKET[0], 5);
    expect(pose.z).toBeCloseTo(GATE_ASIDE_POCKET[1], 5);
  });

  it('is carried (lifted) during the procession, then laid at the tomb mouth', () => {
    expect(bierPose(T_PROCESSION + 5).carried).toBe(1);
    const atTomb = bierPose(T_PROCESSION + 25);
    expect(atTomb.x).toBeCloseTo(TOMB_ENTRANCE_INSET[0], 0);
    expect(atTomb.z).toBeCloseTo(TOMB_ENTRANCE_INSET[1], 0);
  });

  it('fades from view once fully interred — never a rendered burial', () => {
    const late = bierPose(T_FAST);
    expect(late.buried).toBe(1);
    expect(late.visible).toBe(false);
  });
});

describe('duskBlend (3:35, "till the sun goes down")', () => {
  it('is at the daytime rig before the fast beat', () => {
    expect(duskBlend(T_FAST - 1)).toBe(0);
  });

  it('ramps to the dusk rig across the fast beat', () => {
    const mid = duskBlend((T_FAST + T_PEOPLE_NOTE) / 2);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });

  it('holds at the dusk rig from the people-note beat onward', () => {
    expect(duskBlend(T_PEOPLE_NOTE)).toBeCloseTo(1, 5);
    expect(duskBlend(T_CLOSE + 5)).toBeCloseTo(1, 5);
  });
});
