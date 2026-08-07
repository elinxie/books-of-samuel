import { describe, expect, it } from 'vitest';
import { ASIDE_POINT, DAVID_GATE_POS, GATE_SOUTH_THRESHOLD, TOMB_POS } from './layout';
import {
  abishaiPrincipalPose,
  abnerPrincipalPose,
  bierPose,
  davidPrincipalPose,
  duskBlend,
  gateAsidePose,
  joabPrincipalPose,
  T_ABNER_DEATH,
  T_BURIAL_WEEP,
  T_CLOSE,
  T_DAVID_HEARS,
  T_FAST,
  T_GATE_ASIDE,
  T_JOAB_RETURNS,
  T_MOURNING_CMD,
  T_PROCESSION,
  T_PROTEST,
  T_RECALL,
  DURATION_SEC,
} from './poses';

/**
 * Beat-invariant timing checks against `src/data/scenes.ts`'s `hebron-gate`
 * beat times, mirroring gibeon-pool/ziklag-lament's poses.test.ts density.
 *
 * The hardest invariants this file guards (ADR-009's second named-killing
 * template application, `docs/design/hebron-gate-brief.md`'s placeholder
 * policy):
 *  - The strike beat never carries a "wound"/"blood"/weapon field on any
 *    pose — `AbnerRigPose` and `GateAsidePose` are structurally limited to
 *    position/orientation/collapse fields, and this file asserts that
 *    directly against the actual returned objects' own keys, not just by
 *    trusting the TypeScript interface.
 *  - The strike is staged as Joab's alone: at the death beat, Joab is
 *    co-located with `ASIDE_POINT` while Abishai stays meaningfully apart
 *    from it.
 *  - David is never staged near the killing ground before he hears of it
 *    ("but David did not know it," 3:26b) — his position at the death beat
 *    is unchanged from his pre-recall position and stays far from
 *    `ASIDE_POINT`.
 *  - Reduced mode actually elides the strike (reaches the fallen aftermath
 *    far faster than standard, the ADR-009 "cut to the aftermath"
 *    convention), never a different final pose.
 */

function dist(ax: number, az: number, bx: number, bz: number): number {
  return Math.hypot(ax - bx, az - bz);
}

describe('sanity: beat times', () => {
  it('fall inside the scene duration, in order', () => {
    const times = [
      T_JOAB_RETURNS,
      T_PROTEST,
      T_RECALL,
      T_GATE_ASIDE,
      T_ABNER_DEATH,
      T_DAVID_HEARS,
      T_MOURNING_CMD,
      T_PROCESSION,
      T_BURIAL_WEEP,
      T_FAST,
      T_CLOSE,
    ];
    for (let i = 1; i < times.length; i++) {
      expect(times[i]).toBeGreaterThan(times[i - 1]);
    }
    expect(T_CLOSE).toBeLessThanOrEqual(DURATION_SEC);
  });
});

describe('abnerPrincipalPose (3:26-27, the strike)', () => {
  it('is invisible before the gate-aside beat, in both modes', () => {
    expect(abnerPrincipalPose(T_GATE_ASIDE - 5, 'standard').visible).toBe(false);
    expect(abnerPrincipalPose(T_GATE_ASIDE - 5, 'reduced').visible).toBe(false);
  });

  it('walks from the south threshold to the aside point before the strike', () => {
    const early = abnerPrincipalPose(T_GATE_ASIDE + 1, 'standard');
    expect(early.visible).toBe(true);
    expect(dist(early.x, early.z, ...GATE_SOUTH_THRESHOLD)).toBeLessThan(10);

    const atAside = abnerPrincipalPose(T_ABNER_DEATH - 1, 'standard');
    expect(atAside.x).toBeCloseTo(ASIDE_POINT[0], 1);
    expect(atAside.z).toBeCloseTo(ASIDE_POINT[1], 1);
    expect(atAside.fallen).toBe(0);
  });

  it('never carries any wound/blood/weapon field — only position, orientation, and a collapse scalar', () => {
    const pose = abnerPrincipalPose(T_ABNER_DEATH + 1, 'standard');
    const keys = Object.keys(pose).map((k) => k.toLowerCase());
    expect(keys.sort()).toEqual(['fallen', 'visible', 'x', 'yaw', 'z']);
    for (const k of keys) {
      expect(k).not.toMatch(/wound|blood|gore|weapon|dagger|knife/);
    }
  });

  it('standard mode falls gradually after the strike', () => {
    const justAfter = abnerPrincipalPose(T_ABNER_DEATH + 0.5, 'standard').fallen;
    const later = abnerPrincipalPose(T_ABNER_DEATH + 4, 'standard').fallen;
    expect(justAfter).toBeGreaterThan(0);
    expect(justAfter).toBeLessThan(0.9);
    expect(later).toBeCloseTo(1, 1);
  });

  it('reduced mode reaches the fallen aftermath far faster than standard — "cut to the aftermath," never a different final pose', () => {
    const t = T_ABNER_DEATH + 0.6;
    const standard = abnerPrincipalPose(t, 'standard').fallen;
    const reduced = abnerPrincipalPose(t, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
    expect(reduced).toBeGreaterThan(0.8);
    // Same eventual pose, in both modes.
    const standardEnd = abnerPrincipalPose(T_ABNER_DEATH + 6, 'standard').fallen;
    const reducedEnd = abnerPrincipalPose(T_ABNER_DEATH + 6, 'reduced').fallen;
    expect(standardEnd).toBeCloseTo(reducedEnd, 1);
  });

  it('stays fallen at the aside point through the disavowal/mourning-command beats', () => {
    const pose = abnerPrincipalPose(T_MOURNING_CMD - 1, 'standard');
    expect(pose.visible).toBe(true);
    expect(pose.fallen).toBeCloseTo(1, 1);
    expect(pose.x).toBeCloseTo(ASIDE_POINT[0], 1);
    expect(pose.z).toBeCloseTo(ASIDE_POINT[1], 1);
  });

  it('hides at the exact instant the bier picks the body up (T_PROCESSION), identically in both modes', () => {
    expect(abnerPrincipalPose(T_PROCESSION - 0.01, 'standard').visible).toBe(true);
    expect(abnerPrincipalPose(T_PROCESSION, 'standard').visible).toBe(false);
    expect(abnerPrincipalPose(T_PROCESSION - 0.01, 'reduced').visible).toBe(true);
    expect(abnerPrincipalPose(T_PROCESSION, 'reduced').visible).toBe(false);
  });
});

describe('gateAsidePose (3:27a, the drawing-aside gesture)', () => {
  it('never carries any strike/weapon field — only the lean envelope', () => {
    const pose = gateAsidePose(T_GATE_ASIDE + 2);
    expect(Object.keys(pose)).toEqual(['asideLean']);
  });

  it('is zero before the gate-aside beat and positive mid-window', () => {
    expect(gateAsidePose(T_GATE_ASIDE - 1).asideLean).toBe(0);
    expect(gateAsidePose(T_GATE_ASIDE + 3).asideLean).toBeGreaterThan(0);
  });

  it('resolves back toward zero by the strike itself — a privacy gesture, never a strike pose', () => {
    expect(gateAsidePose(T_ABNER_DEATH).asideLean).toBeCloseTo(0, 1);
  });
});

describe("the strike is staged as Joab's alone (3:27, 30)", () => {
  it('Joab is co-located with the aside point at the moment of the strike', () => {
    const joab = joabPrincipalPose(T_ABNER_DEATH);
    expect(dist(joab.x, joab.z, ...ASIDE_POINT)).toBeLessThan(2.5);
  });

  it('Abishai stays meaningfully apart from the aside point throughout the killing beats', () => {
    for (const t of [T_GATE_ASIDE + 2, T_ABNER_DEATH, T_ABNER_DEATH + 5]) {
      const abishai = abishaiPrincipalPose(t);
      expect(dist(abishai.x, abishai.z, ...ASIDE_POINT)).toBeGreaterThan(3);
    }
  });

  it('Abishai never approaches as close to the aside point as Joab does at the strike', () => {
    const joab = joabPrincipalPose(T_ABNER_DEATH);
    const abishai = abishaiPrincipalPose(T_ABNER_DEATH);
    const joabDist = dist(joab.x, joab.z, ...ASIDE_POINT);
    const abishaiDist = dist(abishai.x, abishai.z, ...ASIDE_POINT);
    expect(abishaiDist).toBeGreaterThan(joabDist);
  });
});

describe('"but David did not know it" (3:26b) — David never approaches the killing ground before he hears of it', () => {
  it('David holds his plaza position, unmoved, through the strike', () => {
    const beforeRecall = davidPrincipalPose(T_RECALL - 1);
    const atStrike = davidPrincipalPose(T_ABNER_DEATH);
    expect(atStrike.x).toBeCloseTo(beforeRecall.x, 5);
    expect(atStrike.z).toBeCloseTo(beforeRecall.z, 5);
    expect(atStrike.x).toBeCloseTo(DAVID_GATE_POS[0], 5);
    expect(atStrike.z).toBeCloseTo(DAVID_GATE_POS[1], 5);
  });

  it('David stays far from the aside point through every pre-death beat', () => {
    for (const t of [T_JOAB_RETURNS, T_PROTEST, T_RECALL, T_GATE_ASIDE, T_ABNER_DEATH]) {
      const pose = davidPrincipalPose(t);
      expect(dist(pose.x, pose.z, ...ASIDE_POINT)).toBeGreaterThan(15);
    }
  });

  it('only moves toward the gate once the disavowal beat begins', () => {
    const beforeHears = davidPrincipalPose(T_DAVID_HEARS - 0.5);
    const atMourningWalk = davidPrincipalPose(T_MOURNING_CMD + 4);
    expect(dist(atMourningWalk.x, atMourningWalk.z, ...ASIDE_POINT)).toBeLessThan(
      dist(beforeHears.x, beforeHears.z, ...ASIDE_POINT),
    );
  });

  it('eventually reaches the graveside, near the tomb, by the close', () => {
    const pose = davidPrincipalPose(T_CLOSE);
    expect(dist(pose.x, pose.z, ...TOMB_POS)).toBeLessThan(12);
  });
});

describe('bierPose (b-procession, b-burial-weep) — the wrapped-form funerary standard', () => {
  it('is invisible before the procession beat', () => {
    expect(bierPose(T_PROCESSION - 1).visible).toBe(false);
  });

  it('is carried along the route once the procession begins', () => {
    const pose = bierPose(T_PROCESSION + 5);
    expect(pose.visible).toBe(true);
    expect(pose.carried).toBeGreaterThan(0);
  });

  it('arrives at the tomb and sinks (burial) shortly after the burial-weep beat begins', () => {
    const justArrived = bierPose(T_BURIAL_WEEP + 0.1);
    expect(justArrived.x).toBeCloseTo(TOMB_POS[0], 1);
    expect(justArrived.z).toBeCloseTo(TOMB_POS[1], 1);
    expect(justArrived.sink).toBeGreaterThanOrEqual(0);

    const settled = bierPose(T_BURIAL_WEEP + 10);
    expect(settled.sink).toBe(1);
    expect(settled.visible).toBe(false);
  });
});

describe('duskBlend (3:35, "till the sun goes down")', () => {
  it('is at the daytime rig before the fast beat', () => {
    expect(duskBlend(T_FAST - 1)).toBe(0);
  });

  it('ramps toward dusk after the fast beat begins', () => {
    expect(duskBlend(T_FAST + 6)).toBeGreaterThan(0);
    expect(duskBlend(T_FAST + 6)).toBeLessThan(1);
  });

  it('holds at full dusk by the close', () => {
    expect(duskBlend(T_CLOSE)).toBeCloseTo(1, 5);
  });
});
