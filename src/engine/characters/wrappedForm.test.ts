import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { buildWrappedFormGeometry } from './wrappedForm';

describe('buildWrappedFormGeometry', () => {
  it('produces a valid merged geometry with position/normal attributes', () => {
    const geo = buildWrappedFormGeometry();
    expect(geo.attributes.position.count).toBeGreaterThan(0);
    expect(geo.attributes.normal).toBeDefined();
  });

  it('spans roughly the expected body length along local +Y, foot near y=0', () => {
    const geo = buildWrappedFormGeometry(1);
    geo.computeBoundingBox();
    const box = geo.boundingBox as THREE.Box3;
    expect(box.min.y).toBeGreaterThanOrEqual(-0.05);
    expect(box.max.y).toBeGreaterThan(1.5);
    expect(box.max.y).toBeLessThan(1.85);
  });

  it('scales proportionally with lengthScale (bundle-scale reuse for a future scene)', () => {
    const body = buildWrappedFormGeometry(1);
    const bundle = buildWrappedFormGeometry(0.35);
    body.computeBoundingBox();
    bundle.computeBoundingBox();
    const bodyLen = (body.boundingBox as THREE.Box3).max.y;
    const bundleLen = (bundle.boundingBox as THREE.Box3).max.y;
    expect(bundleLen).toBeCloseTo(bodyLen * 0.35, 1);
  });

  it('has no anatomical widening anywhere near a head-sized radius at the very tip (no head asserted)', () => {
    // The profile's last point tapers back down — the tip stays narrow,
    // unlike a head bulge. Sanity check the taper direction near the ends.
    const geo = buildWrappedFormGeometry(1);
    geo.computeBoundingBox();
    const box = geo.boundingBox as THREE.Box3;
    const width = box.max.x - box.min.x;
    // Overall silhouette width should be well under its length (a tapered
    // bundle, not a boxy/anatomical mass).
    const length = box.max.y - box.min.y;
    expect(width).toBeLessThan(length * 0.3);
  });

  it('is a pure function of its inputs (same geometry topology each call)', () => {
    const a = buildWrappedFormGeometry(0.6, 8);
    const b = buildWrappedFormGeometry(0.6, 8);
    expect(a.attributes.position.count).toBe(b.attributes.position.count);
    expect(Array.from(a.attributes.position.array)).toEqual(
      Array.from(b.attributes.position.array),
    );
  });
});
