import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { randomCharacterParams } from './anthropometry';
import { buildSkeleton, jointPositions } from './skeleton';
import type { CharacterParams, CharacterRig } from './types';

/**
 * Static (unrigged) body silhouettes. `applyClipPose` in bake.ts is still a
 * stub — nothing here is bone-driven yet; scenes pose these as rigid groups
 * via the ADR-007 pure-pose-function pattern, same as the crowd. See
 * asset-david-marker for the disclosure.
 */

function paintColor(geo: THREE.BufferGeometry, color: string): THREE.BufferGeometry {
  const c = new THREE.Color(color);
  const count = geo.attributes.position.count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function limbGeometry(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  radialSegments: number,
  color: string,
): THREE.BufferGeometry {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const geo = new THREE.CapsuleGeometry(
    radius,
    Math.max(len - radius * 2, 0.02),
    3,
    radialSegments,
  );
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize(),
  );
  geo.applyQuaternion(quat);
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  geo.translate(mid.x, mid.y, mid.z);
  return paintColor(geo, color);
}

/** Simple single-capsule silhouette, used for crowd detail (cheap to instance/bake). */
function buildCrowdGeometry(params: CharacterParams): THREE.BufferGeometry {
  const radius = 0.14 * (0.9 + params.build * 0.25);
  const geometry = new THREE.CapsuleGeometry(radius, params.stature - radius * 2, 6, 8);
  geometry.translate(0, params.stature / 2, 0);
  return paintColor(geometry, params.dress.tunicColor);
}

/**
 * Segmented merged silhouette for principal figures: torso, head, upper
 * arms (tunic-sleeve tone), forearms/hands (skin), thighs (tunic-covered),
 * shins/feet (skin/sandal), belt band, optional head wrap. Placed from the
 * same joint positions the (currently unbound) skeleton uses, so a future
 * skin-binding pass can reuse this layout without rework.
 */
function buildPrincipalGeometry(params: CharacterParams): THREE.BufferGeometry {
  const h = params.stature;
  const build = 0.9 + params.build * 0.25;
  const radial = 10;
  const j = jointPositions(h);
  const { tunicColor, beltColor, headwear, headwrapColor } = params.dress;
  const { skinColor, hairColor } = params;

  const parts: THREE.BufferGeometry[] = [];

  const torsoR = 0.115 * h * build;
  const torso = new THREE.CapsuleGeometry(torsoR, (j.chest.y - j.hips.y) * 0.85, 4, radial);
  torso.translate(0, (j.hips.y + j.chest.y) / 2, 0);
  parts.push(paintColor(torso, tunicColor));

  const headR = 0.072 * h;
  const head = new THREE.SphereGeometry(headR, radial, Math.max(4, radial - 4));
  head.translate(j.head.x, j.head.y, j.head.z);
  parts.push(paintColor(head, skinColor));

  if (params.beard) {
    const beard = new THREE.SphereGeometry(headR * 0.55, 6, 5);
    beard.scale(1, 0.7, 0.8);
    beard.translate(j.head.x, j.head.y - headR * 0.55, j.head.z + headR * 0.35);
    parts.push(paintColor(beard, hairColor));
  }

  if (headwear === 'wrap') {
    const wrap = new THREE.TorusGeometry(headR * 0.92, headR * 0.28, 6, radial);
    wrap.rotateX(Math.PI / 2);
    wrap.translate(j.head.x, j.head.y + headR * 0.15, j.head.z);
    parts.push(paintColor(wrap, headwrapColor ?? tunicColor));
  }

  const belt = new THREE.TorusGeometry(torsoR * 1.05, torsoR * 0.22, 6, radial);
  belt.rotateX(Math.PI / 2);
  belt.translate(0, j.hips.y + (j.chest.y - j.hips.y) * 0.08, 0);
  parts.push(paintColor(belt, beltColor));

  const armR = 0.045 * h * build;
  parts.push(limbGeometry(j.upperArmL, j.forearmL, armR, 8, tunicColor));
  parts.push(limbGeometry(j.upperArmR, j.forearmR, armR, 8, tunicColor));
  parts.push(limbGeometry(j.forearmL, j.handL, armR * 0.82, 6, skinColor));
  parts.push(limbGeometry(j.forearmR, j.handR, armR * 0.82, 6, skinColor));

  const legR = 0.06 * h * build;
  parts.push(limbGeometry(j.thighL, j.shinL, legR, 8, tunicColor));
  parts.push(limbGeometry(j.thighR, j.shinR, legR, 8, tunicColor));
  parts.push(limbGeometry(j.shinL, j.footL, legR * 0.78, 6, skinColor));
  parts.push(limbGeometry(j.shinR, j.footR, legR * 0.78, 6, skinColor));

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export function buildBodyGeometry(
  params: CharacterParams = randomCharacterParams(),
): THREE.BufferGeometry {
  return params.detail === 'principal'
    ? buildPrincipalGeometry(params)
    : buildCrowdGeometry(params);
}

export function buildCharacterRig(params: CharacterParams = randomCharacterParams()): CharacterRig {
  const built = buildSkeleton(params.stature);
  return {
    geometry: buildBodyGeometry(params),
    skeleton: built.skeleton,
    root: built.root,
    bones: built.bones,
    params,
  };
}
