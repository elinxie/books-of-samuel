import { describe, expect, it } from 'vitest';
import { CAMEL_STARTS, CAPTIVE_POS } from './layout';
import { buildCampFigures, campFigurePose } from './CampCrowd';
import { camelPose } from './Camels';
import { livestockPose, type AnimalState } from './Livestock';
import { davidPose, egyptianPose } from './PrincipalFigures';

/**
 * Timing sanity for the pose functions against the beat times in scenes.ts's
 * amalekite-camp entry (sprawl 20 / strike 55 / compression 80 / camel
 * flight 100 / recovery 122 / drive north 145). Targeted, not exhaustive —
 * see docs/next-run.md's user priority note on test depth.
 */

const figures = buildCampFigures(60);
const raider = figures.find((f) => f.group === 'raider' && f.falls)!;
const runner = figures.find((f) => f.group === 'raider' && !f.falls)!;
const attacker = figures.find((f) => f.group === 'attacker')!;
const captive = figures.find((f) => f.group === 'captive')!;

describe('campFigurePose timeline', () => {
  it('raiders feast at their cluster spots during the sprawl beat', () => {
    const pose = campFigurePose(30, raider);
    expect(pose.visible).toBe(true);
    expect(pose.moving).toBe(false);
    expect(Math.hypot(pose.x - raider.home[0], pose.z - raider.home[1])).toBeLessThan(0.5);
  });

  it('raiders scatter after the strike beat and the alarm reaches them', () => {
    const t = 55 + runner.alarmDelay + 2;
    const pose = campFigurePose(t, runner);
    expect(pose.moving).toBe(true);
    expect(Math.hypot(pose.x - runner.home[0], pose.z - runner.home[1])).toBeGreaterThan(3);
  });

  it('a falling raider crumples at distance, without gore, before the compression card', () => {
    const t = 55 + raider.alarmDelay + raider.fleeDist / 5 + 2;
    const pose = campFigurePose(Math.min(t, 83), raider);
    expect(pose.fall).toBeGreaterThan(0.5);
    expect(pose.moving).toBe(false);
  });

  it('no raiders are rendered after the time-compression card resolves', () => {
    expect(campFigurePose(90, raider).visible).toBe(false);
    expect(campFigurePose(90, runner).visible).toBe(false);
  });

  it('attackers hold the staging line low until the strike, then close on the camp', () => {
    const staged = campFigurePose(40, attacker);
    expect(staged.moving).toBe(false);
    expect(staged.kneel).toBeGreaterThan(0.2);
    expect(staged.z).toBeLessThan(-55);
    const charging = campFigurePose(58, attacker);
    expect(charging.moving).toBe(true);
    expect(charging.z).toBeGreaterThan(staged.z);
  });

  it('captives sit until the recovery beat, then stand and gather', () => {
    const seated = campFigurePose(100, captive);
    expect(seated.kneel).toBeGreaterThan(0.9);
    expect(seated.moving).toBe(false);
    const freed = campFigurePose(135, captive);
    expect(freed.kneel).toBeLessThan(0.1);
    expect(Math.hypot(freed.x - CAPTIVE_POS[0], freed.z - CAPTIVE_POS[1])).toBeLessThan(16);
  });

  it('attackers and captives walk north together after the drive-north beat', () => {
    const a = campFigurePose(160, attacker);
    const c = campFigurePose(160, captive);
    const aBefore = campFigurePose(146, attacker);
    const cBefore = campFigurePose(146, captive);
    expect(a.z).toBeLessThan(aBefore.z - 20);
    expect(c.z).toBeLessThan(cBefore.z - 20);
  });
});

describe('camel flight (register #6: flight beat only)', () => {
  it('no camels are visible before the camel-flight beat', () => {
    for (const start of CAMEL_STARTS.slice(0, 8)) {
      expect(camelPose(99, start).visible).toBe(false);
    }
  });

  it('camels flee east after the flight beat begins', () => {
    const start = CAMEL_STARTS[0];
    const early = camelPose(100 + start.delay + 1, start);
    const later = camelPose(100 + start.delay + 6, start);
    expect(early.visible).toBe(true);
    expect(later.x).toBeGreaterThan(early.x + 20);
  });

  it('camels exit the scene rather than lingering as an ambient herd', () => {
    const start = CAMEL_STARTS[0];
    expect(camelPose(160, start).visible).toBe(false);
  });
});

describe('livestock drive', () => {
  const animal: AnimalState = {
    home: [60, 20],
    yaw: 1,
    phase: 0,
    driveDelay: 2,
    lane: -10,
    cattle: false,
  };

  it('animals stay penned until the drive-north beat', () => {
    const pose = livestockPose(140, animal);
    expect(pose.moving).toBe(false);
    expect(pose.x).toBe(60);
  });

  it('animals are driven north after the beat', () => {
    const pose = livestockPose(165, animal);
    expect(pose.moving).toBe(true);
    expect(pose.z).toBeLessThan(20 - 30);
  });
});

describe('named-figure pose timeline', () => {
  it('David is at the staging line during the sprawl beat', () => {
    const pose = davidPose(30);
    expect(pose.visible).toBe(true);
    expect(pose.z).toBeLessThan(-55);
  });

  it('David is inside the camp during the strike window', () => {
    const pose = davidPose(75);
    expect(pose.z).toBeGreaterThan(0);
  });

  it('David reaches the captives for the recovery', () => {
    const pose = davidPose(140);
    expect(Math.hypot(pose.x - CAPTIVE_POS[0], pose.z - CAPTIVE_POS[1])).toBeLessThan(12);
  });

  it('the Egyptian guide waits at the staging line and is not rendered after the compression card', () => {
    const waiting = egyptianPose(60);
    expect(waiting.visible).toBe(true);
    expect(waiting.z).toBeLessThan(-55);
    expect(egyptianPose(85).visible).toBe(false);
  });
});
