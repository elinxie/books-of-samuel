import { describe, expect, it } from 'vitest';
import {
  DAVID_RECEIVING_POS,
  PRESENTATION_POS,
  RECHAB_EXECUTION_POS,
  BAANAH_EXECUTION_POS,
} from './layout';
import { TOMB_POS } from '../hebron-gate/layout';
import {
  baanahPose,
  davidPose,
  fallDuration,
  headBundlePose,
  rechabPose,
  T_ARRIVAL,
  T_BURIAL,
  T_CLOSE,
  T_COURAGE_FAILS,
  T_EXECUTION,
  T_MEPHIBOSHETH,
  T_MURDER_CARD,
  T_PRESENTATION,
  T_VERDICT,
  DURATION_SEC,
} from './poses';

/**
 * Beat-invariant timing checks against `src/data/scenes.ts`'s
 * `hebron-reckoning` beat times, mirroring hebron-gate/gibeon-pool/
 * ziklag-lament's poses.test.ts density.
 *
 * The hardest invariant this file guards is ADR-009's absolute dismemberment
 * bar, triggered here for the first time (docs/architecture-decisions/adr-009
 * -violence-depiction-defaults.md): no pose function anywhere in this scene
 * may carry a field describing severed anatomy, a hands-and-feet display, or
 * a beheading — structurally verified against the actual returned objects'
 * own keys, not just trusted from the TypeScript interfaces. `headBundlePose`
 * in particular must never grow a field beyond position/orientation/
 * carry-and-burial-progress: it is the only geometry Ish-bosheth's head ever
 * gets, and it must stay a covered bundle, never anatomy.
 */

function dist(ax: number, az: number, bx: number, bz: number): number {
  return Math.hypot(ax - bx, az - bz);
}

const FORBIDDEN_FIELD_PATTERN = /wound|blood|gore|weapon|dagger|knife|hand|feet|foot|head|anatom/i;

describe('sanity: beat times', () => {
  it('fall inside the scene duration, in order', () => {
    const times = [
      T_COURAGE_FAILS,
      T_MEPHIBOSHETH,
      T_MURDER_CARD,
      T_ARRIVAL,
      T_PRESENTATION,
      T_VERDICT,
      T_EXECUTION,
      T_BURIAL,
      T_CLOSE,
    ];
    for (let i = 1; i < times.length; i++) {
      expect(times[i]).toBeGreaterThan(times[i - 1]);
    }
    expect(T_CLOSE).toBeLessThanOrEqual(DURATION_SEC);
  });
});

describe('ADR-009 absolute dismemberment bar — structural guard', () => {
  it('rechabPose/baanahPose never carry a wound/blood/weapon/anatomy field — only position, orientation, and a collapse scalar', () => {
    for (const pose of [
      rechabPose(T_EXECUTION + 1, 'standard'),
      baanahPose(T_EXECUTION + 1, 'standard'),
    ]) {
      const keys = Object.keys(pose);
      expect(keys.sort()).toEqual(['fallen', 'visible', 'x', 'yaw', 'z']);
      for (const k of keys) {
        expect(k).not.toMatch(FORBIDDEN_FIELD_PATTERN);
      }
    }
  });

  it('headBundlePose never carries any field beyond position/orientation/carry/burial-progress — no anatomy field of any kind', () => {
    const pose = headBundlePose(T_PRESENTATION + 1);
    const keys = Object.keys(pose);
    expect(keys.sort()).toEqual(['carried', 'sink', 'visible', 'x', 'yaw', 'z']);
    for (const k of keys) {
      expect(k).not.toMatch(FORBIDDEN_FIELD_PATTERN);
    }
  });

  it('davidPose never carries any field beyond position/orientation', () => {
    const pose = davidPose(T_VERDICT);
    expect(Object.keys(pose).sort()).toEqual(['x', 'yaw', 'z']);
  });

  it('no pose function in this module ever exposes a "display" or "dismember" field — a whole-module sweep', async () => {
    const mod = await import('./poses');
    const sampleT = T_EXECUTION + 5;
    const samples: unknown[] = [
      mod.davidPose(sampleT),
      mod.rechabPose(sampleT, 'standard'),
      mod.baanahPose(sampleT, 'standard'),
      mod.rechabPose(sampleT, 'reduced'),
      mod.baanahPose(sampleT, 'reduced'),
      mod.headBundlePose(sampleT),
    ];
    for (const sample of samples) {
      for (const key of Object.keys(sample as Record<string, unknown>)) {
        expect(key).not.toMatch(/display|dismember|sever|strike|cut/i);
      }
    }
  });
});

describe('rechabPose / baanahPose (4:8-12a)', () => {
  it('are invisible before the arrival beat', () => {
    expect(rechabPose(T_ARRIVAL - 1, 'standard').visible).toBe(false);
    expect(baanahPose(T_ARRIVAL - 1, 'standard').visible).toBe(false);
  });

  it('are distinct individuals throughout — never co-located at the same point', () => {
    for (const t of [T_ARRIVAL + 20, T_VERDICT, T_EXECUTION - 1, T_EXECUTION + 5]) {
      const r = rechabPose(t, 'standard');
      const b = baanahPose(t, 'standard');
      expect(dist(r.x, r.z, b.x, b.z)).toBeGreaterThan(0.1);
    }
  });

  it('stand at the presentation ground through the verdict, well away from their own execution ground', () => {
    const pose = rechabPose(T_VERDICT, 'standard');
    expect(dist(pose.x, pose.z, ...PRESENTATION_POS)).toBeLessThan(3);
    expect(dist(pose.x, pose.z, ...RECHAB_EXECUTION_POS)).toBeGreaterThan(5);
  });

  it('reach their own distinct execution positions by the strike', () => {
    const r = rechabPose(T_EXECUTION, 'standard');
    const b = baanahPose(T_EXECUTION, 'standard');
    expect(dist(r.x, r.z, ...RECHAB_EXECUTION_POS)).toBeLessThan(0.5);
    expect(dist(b.x, b.z, ...BAANAH_EXECUTION_POS)).toBeLessThan(0.5);
  });

  it('standard mode falls gradually after the strike', () => {
    const justAfter = rechabPose(T_EXECUTION + 0.5, 'standard').fallen;
    const later = rechabPose(T_EXECUTION + 4, 'standard').fallen;
    expect(justAfter).toBeGreaterThan(0);
    expect(justAfter).toBeLessThan(0.9);
    expect(later).toBeCloseTo(1, 1);
  });

  it('reduced mode reaches the fallen aftermath far faster than standard — same eventual pose', () => {
    const t = T_EXECUTION + 0.6;
    const standard = rechabPose(t, 'standard').fallen;
    const reduced = rechabPose(t, 'reduced').fallen;
    expect(reduced).toBeGreaterThan(standard);
    const standardEnd = rechabPose(T_EXECUTION + 6, 'standard').fallen;
    const reducedEnd = rechabPose(T_EXECUTION + 6, 'reduced').fallen;
    expect(standardEnd).toBeCloseTo(reducedEnd, 1);
  });

  it('fallDuration is shorter in reduced mode than standard, never zero-length in standard', () => {
    expect(fallDuration('reduced', 3.5)).toBeLessThan(fallDuration('standard', 3.5));
    expect(fallDuration('standard', 3.5)).toBeGreaterThan(1);
  });
});

describe('davidPose — present at the receiving ground throughout, never staged at the tomb', () => {
  it('holds the receiving-ground position across every beat', () => {
    for (const t of [T_COURAGE_FAILS, T_ARRIVAL, T_VERDICT, T_EXECUTION + 1, T_BURIAL, T_CLOSE]) {
      const pose = davidPose(t);
      expect(pose.x).toBeCloseTo(DAVID_RECEIVING_POS[0], 5);
      expect(pose.z).toBeCloseTo(DAVID_RECEIVING_POS[1], 5);
    }
  });
});

describe('headBundlePose (b-arrival through b-burial) — the wrapped-form funerary standard, smallest scale yet', () => {
  it('is invisible before the arrival beat', () => {
    expect(headBundlePose(T_ARRIVAL - 1).visible).toBe(false);
  });

  it('is carried low along the arrival road, then held at the presentation ground', () => {
    const mid = headBundlePose(T_ARRIVAL + 7);
    expect(mid.visible).toBe(true);
    const held = headBundlePose(T_VERDICT);
    expect(dist(held.x, held.z, ...PRESENTATION_POS)).toBeLessThan(0.5);
  });

  it('never travels to the execution ground near the pool', () => {
    for (const t of [T_EXECUTION - 1, T_EXECUTION, T_EXECUTION + 5]) {
      const pose = headBundlePose(t);
      expect(dist(pose.x, pose.z, ...RECHAB_EXECUTION_POS)).toBeGreaterThan(10);
    }
  });

  it('travels to the tomb and sinks (burial) once the burial beat begins', () => {
    const midRoute = headBundlePose(T_BURIAL + 7);
    expect(midRoute.visible).toBe(true);
    expect(dist(midRoute.x, midRoute.z, ...PRESENTATION_POS)).toBeGreaterThan(1);

    const settled = headBundlePose(T_BURIAL + 30);
    expect(settled.sink).toBe(1);
    expect(settled.visible).toBe(false);
    expect(settled.x).toBeCloseTo(TOMB_POS[0], 1);
    expect(settled.z).toBeCloseTo(TOMB_POS[1], 1);
  });
});
