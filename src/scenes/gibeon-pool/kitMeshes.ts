import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Military-kit and prop attachment geometries for gibeon-pool
 * (asset-gibeon-kit-props): a plain sword (the champions' contest, 2:16 —
 * "thrust his sword in his opponent's side," shown as a held prop only,
 * never as blade-entry geometry), a spear (Abner's death-thrust, 2:23, and
 * generic principal/crowd arms), and a small horn (Joab's halt signal,
 * 2:28). No dress or kit differentiation between the two sides — both are
 * Israelite (claim-dress, reused as-is; no new kit claim, per the brief's
 * "Resolved design calls"). Simple primitive geometry, same convention as
 * gilboa-battle/kitMeshes.ts.
 */

export const CROWD_KIT_STATURE = 1.72;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand — reused for both the
 * champions' contest sword-substitute stance prop and the crowd's generic
 * spear-carrying figures. */
export function buildSpearGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const shaftLen = stature * 0.9;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0);
  const tip = new THREE.ConeGeometry(shaftR * 2.2, stature * 0.075, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip]);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.1);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/**
 * A short straight blade + cross-guard + handle, gripped in the off-hand —
 * the champions' contest weapon (2:16). No blade-entry/wound geometry is
 * ever produced anywhere in this scene; the sword is only ever a held prop.
 */
export function buildSwordGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const bladeLen = stature * 0.3;
  const blade = new THREE.BoxGeometry(stature * 0.026, bladeLen, stature * 0.006);
  blade.translate(0, bladeLen / 2, 0);
  const guard = new THREE.BoxGeometry(stature * 0.08, stature * 0.014, stature * 0.011);
  const handle = new THREE.CylinderGeometry(stature * 0.011, stature * 0.011, stature * 0.08, 6);
  handle.translate(0, -stature * 0.045, 0);

  const sword = mergeParts([blade, guard, handle]);
  sword.rotateZ(hand === 'handR' ? -0.3 : 0.3);
  sword.translate(grip.x, grip.y, grip.z);
  return sword;
}

/**
 * A small curved horn — Joab's halt signal (2:28, the "trumpet"/shophar). A
 * single instance, not a crowd attachment; well-attested ANE instrument
 * form, kept generic (no comparative-ANE source consulted for this specific
 * geometry, so it stays a design-placeholder prop like the anointing horn
 * in hebron-anointing's `asset-anointing-props`).
 */
export function buildHornGeometry(stature: number): THREE.BufferGeometry {
  const grip = jointPositions(stature).handR;
  const radius = stature * 0.1;
  const horn = new THREE.TorusGeometry(radius, stature * 0.018, 6, 10, Math.PI * 0.85);
  horn.rotateY(Math.PI / 2);
  horn.translate(grip.x, grip.y + radius * 0.3, grip.z + radius * 0.4);
  return horn;
}
