import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * A bound, wrapped-cloth silhouette: no limb, head, or anatomical
 * articulation of any kind. Built for Beth-shan's four display forms on the
 * wall (`claim-body-display` — "bound, wrapped human silhouettes at
 * wall-top distance, anatomically unresolved"; see
 * docs/design/beth-shan-walls-brief.md's "Resolved design calls" — a
 * headless silhouette would be dismemberment rendering, which ADR-009 bans
 * outright, while a conspicuously intact/detailed body would falsify the
 * text; distance and wrapping are the honest solution here). A single
 * lathe-revolved taper (foot-narrow, torso/shoulder-wide, head-narrow) plus a
 * few thin binding bands reads as a tied cloth bundle without asserting a
 * head, limbs, or any other anatomical feature.
 *
 * Parametrized by `lengthScale` so the same honest shape can be reused at
 * bundle proportions (`jabesh-burial`'s bone bundle is markedly shorter and
 * less tapered than a body-length wrapped form — a scale/proportion
 * difference only, not a different kind of object) rather than forking a
 * near-duplicate builder per scene.
 *
 * Geometry is built along local +Y (the wrap's long axis, foot at y=0, head
 * at y=length) so a scene can render it upright (fastened to a wall) or
 * rotate it 90° to lie flat (borne on a bier) without rebuilding geometry.
 */
export function buildWrappedFormGeometry(
  lengthScale = 1,
  radialSegments = 8,
): THREE.BufferGeometry {
  const length = 1.7 * lengthScale;

  // [fraction of length from the foot end, radius as a fraction of length]
  const profile: [number, number][] = [
    [0.0, 0.014],
    [0.05, 0.05],
    [0.18, 0.082],
    [0.38, 0.098],
    [0.52, 0.092],
    [0.63, 0.108],
    [0.75, 0.09],
    [0.87, 0.058],
    [0.95, 0.042],
    [1.0, 0.018],
  ];

  const radiusAt = (f: number): number => {
    for (let i = 0; i < profile.length - 1; i++) {
      const [f0, r0] = profile[i];
      const [f1, r1] = profile[i + 1];
      if (f >= f0 && f <= f1) {
        const local = f1 === f0 ? 0 : (f - f0) / (f1 - f0);
        return r0 + (r1 - r0) * local;
      }
    }
    return profile[profile.length - 1][1];
  };

  const points = profile.map(
    ([f, rf]) => new THREE.Vector2(Math.max(0.001, rf * length), f * length),
  );
  const wrap = new THREE.LatheGeometry(points, radialSegments);

  const parts: THREE.BufferGeometry[] = [wrap];
  // Binding bands — cloth ties, not a rope-and-nail rigging system (the
  // brief keeps the wall-mounting mechanism itself abstract; these bands are
  // part of the wrapped body, not the fastening).
  for (const f of [0.3, 0.5, 0.7]) {
    const y = f * length;
    const r = radiusAt(f) * length * 1.05;
    const band = new THREE.TorusGeometry(r, length * 0.011, 5, radialSegments);
    band.rotateX(Math.PI / 2);
    band.translate(0, y, 0);
    parts.push(band);
  }

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}
