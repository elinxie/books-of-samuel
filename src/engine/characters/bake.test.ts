import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../noise';
import { randomCharacterParams } from './anthropometry';
import { buildCharacterRig } from './bodyGeometry';
import { makeClips } from './animation';
import { bakePoseBuckets } from './bake';

function crowdRig() {
  const params = randomCharacterParams(mulberry32(4), { detail: 'crowd' });
  return buildCharacterRig(params);
}

describe('bakePoseBuckets', () => {
  it('returns exactly the requested bucket counts', () => {
    const rig = crowdRig();
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips, { walk: 5, kneel: 3, idle: 2 });
    expect(buckets.walk).toHaveLength(5);
    expect(buckets.kneel).toHaveLength(3);
    expect(buckets.idle).toHaveLength(2);
  });

  it('respects the default counts (walk 8, kneel 4, idle 3)', () => {
    const rig = crowdRig();
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips);
    expect(buckets.walk).toHaveLength(8);
    expect(buckets.kneel).toHaveLength(4);
    expect(buckets.idle).toHaveLength(3);
  });

  it('every baked geometry has position, color and normal attributes but no skin attributes', () => {
    const rig = crowdRig();
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips, { walk: 2, kneel: 2, idle: 2 });
    for (const set of [buckets.walk, buckets.kneel, buckets.idle]) {
      for (const geo of set) {
        expect(geo.getAttribute('position')).toBeDefined();
        expect(geo.getAttribute('color')).toBeDefined();
        expect(geo.getAttribute('normal')).toBeDefined();
        expect(geo.getAttribute('skinIndex')).toBeUndefined();
        expect(geo.getAttribute('skinWeight')).toBeUndefined();
      }
    }
  });

  it('walk bucket positions differ across phases but vertex counts stay equal', () => {
    const rig = crowdRig();
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips, { walk: 4, kneel: 2, idle: 2 });

    const counts = buckets.walk.map((g) => g.getAttribute('position').count);
    for (const c of counts) expect(c).toBe(counts[0]);

    const a = buckets.walk[0].getAttribute('position');
    const b = buckets.walk[1].getAttribute('position');
    let anyDiffer = false;
    for (let i = 0; i < a.count; i++) {
      if (
        Math.abs(a.getX(i) - b.getX(i)) > 1e-5 ||
        Math.abs(a.getY(i) - b.getY(i)) > 1e-5 ||
        Math.abs(a.getZ(i) - b.getZ(i)) > 1e-5
      ) {
        anyDiffer = true;
        break;
      }
    }
    expect(anyDiffer).toBe(true);
  });

  it('kneel bucket positions differ across progress slices', () => {
    const rig = crowdRig();
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips, { walk: 2, kneel: 4, idle: 2 });

    const first = buckets.kneel[0].getAttribute('position');
    const last = buckets.kneel[buckets.kneel.length - 1].getAttribute('position');
    let maxDelta = 0;
    for (let i = 0; i < first.count; i++) {
      maxDelta = Math.max(maxDelta, Math.abs(first.getY(i) - last.getY(i)));
    }
    expect(maxDelta).toBeGreaterThan(0.05);
  });
});
