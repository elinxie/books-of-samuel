import { describe, expect, it } from 'vitest';
import {
  armorBearerPose,
  retinueFallPose,
  saulPose,
  sonFallPose,
  T_ARCHERS,
  T_ARMORBEARER_FOLLOWS,
  T_ARMORBEARER_REFUSES,
  T_SAUL_DEATH,
  T_SILENCE,
  T_SONS,
} from './poses';
import { buildRoutFigures, routFigurePose } from './RoutingIsraelites';

/**
 * Beat-invariant timing checks for the Gilboa death-sequence/rout pose
 * choreography, against the beat times in scenes.ts's gilboa-battle entry
 * (b-lines 0 / b-rout 18 / b-sons 45 / b-archers 72 /
 * b-armorbearer-refuses 95 / b-saul-death 112 / b-armorbearer-follows 126 /
 * b-silence 140). Exercised for both violenceMode values per the brief's
 * standard/reduced treatment table.
 */

describe('sonFallPose (b-sons)', () => {
  it('is standing before the beat, in both modes', () => {
    expect(sonFallPose(T_SONS - 1, 'standard').fallen).toBe(0);
    expect(sonFallPose(T_SONS - 1, 'reduced').fallen).toBe(0);
  });

  it('standard collapses gradually; reduced cuts to fallen quickly', () => {
    const t = T_SONS + 1.5;
    const standard = sonFallPose(t, 'standard').fallen;
    const reduced = sonFallPose(t, 'reduced').fallen;
    expect(standard).toBeGreaterThan(0);
    expect(standard).toBeLessThan(0.6);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes settle fully fallen well before the next beat', () => {
    expect(sonFallPose(T_ARCHERS - 5, 'standard').fallen).toBeCloseTo(1, 1);
    expect(sonFallPose(T_ARCHERS - 5, 'reduced').fallen).toBeCloseTo(1, 1);
  });
});

describe('retinueFallPose (b-sons, partial collapse)', () => {
  it('figures not flagged to fall never collapse', () => {
    expect(retinueFallPose(T_SONS + 20, 'standard', false, 0).fallen).toBe(0);
    expect(retinueFallPose(T_SONS + 20, 'reduced', false, 0).fallen).toBe(0);
  });

  it('flagged figures fall after their individual delay, both modes', () => {
    const delay = 2;
    expect(retinueFallPose(T_SONS + delay - 0.1, 'standard', true, delay).fallen).toBe(0);
    expect(retinueFallPose(T_SONS + delay + 10, 'standard', true, delay).fallen).toBeCloseTo(1, 1);
    expect(retinueFallPose(T_SONS + delay + 3, 'reduced', true, delay).fallen).toBeCloseTo(1, 1);
  });
});

describe('saulPose (b-archers, b-armorbearer-refuses, b-saul-death)', () => {
  it('stands before the archers find him', () => {
    const pose = saulPose(T_ARCHERS - 1, 'standard');
    expect(pose.kneel).toBe(0);
    expect(pose.fallen).toBe(0);
  });

  it('staggers gradually to one knee in standard mode; reduced cuts faster', () => {
    const t = T_ARCHERS + 1;
    const standard = saulPose(t, 'standard').kneel;
    const reduced = saulPose(t, 'reduced').kneel;
    expect(standard).toBeGreaterThan(0);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('is on one knee by the refusal beat in both modes', () => {
    expect(saulPose(T_ARMORBEARER_REFUSES, 'standard').kneel).toBeGreaterThan(0.9);
    expect(saulPose(T_ARMORBEARER_REFUSES, 'reduced').kneel).toBeGreaterThan(0.9);
  });

  it('the refusal-beat orientation change is identical in both modes', () => {
    for (const t of [T_ARMORBEARER_REFUSES, T_ARMORBEARER_REFUSES + 1, T_SAUL_DEATH]) {
      expect(saulPose(t, 'standard').faceArmorBearer).toBeCloseTo(
        saulPose(t, 'reduced').faceArmorBearer,
        6,
      );
    }
  });

  it('is not fallen before the death beat', () => {
    expect(saulPose(T_SAUL_DEATH - 1, 'standard').fallen).toBe(0);
    expect(saulPose(T_SAUL_DEATH - 1, 'reduced').fallen).toBe(0);
  });

  it('standard falls gradually after the death beat; reduced cuts to fallen', () => {
    const t = T_SAUL_DEATH + 1;
    const standard = saulPose(t, 'standard').fallen;
    const reduced = saulPose(t, 'reduced').fallen;
    expect(standard).toBeGreaterThanOrEqual(0);
    expect(standard).toBeLessThan(0.5);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes are fully fallen and held still by the silence beat', () => {
    expect(saulPose(T_SILENCE, 'standard').fallen).toBeCloseTo(1, 1);
    expect(saulPose(T_SILENCE, 'reduced').fallen).toBeCloseTo(1, 1);
  });
});

describe('armorBearerPose (b-armorbearer-refuses, b-armorbearer-follows)', () => {
  it('the refusal stance change is identical in both modes', () => {
    for (const t of [T_ARMORBEARER_REFUSES, T_ARMORBEARER_REFUSES + 1.2, T_SAUL_DEATH]) {
      expect(armorBearerPose(t, 'standard').refusalTurn).toBeCloseTo(
        armorBearerPose(t, 'reduced').refusalTurn,
        6,
      );
    }
  });

  it('is not fallen before he follows Saul', () => {
    expect(armorBearerPose(T_ARMORBEARER_FOLLOWS - 1, 'standard').fallen).toBe(0);
    expect(armorBearerPose(T_ARMORBEARER_FOLLOWS - 1, 'reduced').fallen).toBe(0);
  });

  it('standard falls gradually after b-armorbearer-follows; reduced cuts to fallen', () => {
    const t = T_ARMORBEARER_FOLLOWS + 1;
    const standard = armorBearerPose(t, 'standard').fallen;
    const reduced = armorBearerPose(t, 'reduced').fallen;
    expect(standard).toBeLessThan(0.5);
    expect(reduced).toBeGreaterThan(standard);
  });

  it('both modes are fully fallen by the silence beat', () => {
    expect(armorBearerPose(T_SILENCE, 'standard').fallen).toBeCloseTo(1, 1);
    expect(armorBearerPose(T_SILENCE, 'reduced').fallen).toBeCloseTo(1, 1);
  });
});

describe('routFigurePose (b-rout onward)', () => {
  const figures = buildRoutFigures(60);
  const faller = figures.find((f) => f.falls)!;
  const runner = figures.find((f) => !f.falls)!;

  it('holds near the crest before its arrival time', () => {
    const pose = routFigurePose(0, faller, 'standard');
    expect(pose.moving).toBe(false);
    expect(pose.x).toBe(faller.startX);
  });

  it('drifts down the eastern slope once underway, in both modes', () => {
    const t = 18 + faller.arriveDelay + 5;
    expect(routFigurePose(t, faller, 'standard').x).toBeGreaterThan(faller.startX);
    expect(routFigurePose(t, faller, 'reduced').x).toBeGreaterThan(faller.startX);
  });

  it('standard mode crumples a falling figure partway down the draw', () => {
    const startT = 18 + faller.arriveDelay;
    const t = startT + faller.driftDuration * faller.fallProgress + 3;
    const pose = routFigurePose(t, faller, 'standard');
    expect(pose.fallen).toBeGreaterThan(0.5);
    expect(pose.moving).toBe(false);
  });

  it('reduced mode elides the fall — the figure fades out instead of collapsing', () => {
    const startT = 18 + faller.arriveDelay;
    const t = startT + faller.driftDuration * faller.fallProgress + 6;
    const pose = routFigurePose(t, faller, 'reduced');
    expect(pose.fallen).toBe(0);
  });

  it('a non-falling figure keeps moving and stays visible in both modes', () => {
    const t = 18 + runner.arriveDelay + runner.driftDuration * 0.5;
    expect(routFigurePose(t, runner, 'standard').visible).toBe(true);
    expect(routFigurePose(t, runner, 'reduced').visible).toBe(true);
  });
});
