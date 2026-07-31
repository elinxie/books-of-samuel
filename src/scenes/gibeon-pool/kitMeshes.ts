import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Military-kit attachment geometries for gibeon-pool: a spear (the
 * contingents and the named principals — reusing the same undifferentiated
 * Israelite kit family as `claim-israelite-muster-kit`/`asset-military-kit-
 * israelite`, since both sides here are Israelite, per the brief's "no
 * invented Judah kit vs. Benjamin kit") and a gripped short sword (the
 * champions only — 2:16 specifies "each caught his opponent by the head and
 * thrust his sword in his opponent's side," a text-attested detail distinct
 * from the contingents' spears, see `claim-gibeon-contest`). Simple
 * cylinder/cone/box primitives, not modeled assets — see
 * asset-military-kit-israelite (spear, reused) and asset-champion-sword
 * (new, the gripped forward-held blade).
 *
 * Every geometry is baked in the same figure-local space
 * `engine/characters/bodyGeometry.ts` positions body parts from
 * (`jointPositions`), so a kit instance reuses the exact same per-instance
 * transform already computed for the figure it belongs to.
 */

/** A representative stature for crowd-tier figures, which have no literal skeleton. */
export const CROWD_KIT_STATURE = 1.72;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand and angled forward/up
 * — the same silhouette convention as gilboa-battle's Israelite spear.
 * `reversed` flips the shaft end-for-end about the grip point, the one
 * specific detail 2:23 gives for Abner's killing thrust (the butt end, not
 * the point, struck Asahel) — a transform, not a distinct geometry. */
export function buildSpearGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
  reversed = false,
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const shaftLen = stature * 0.94;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0);
  const tip = new THREE.ConeGeometry(shaftR * 2.4, stature * 0.08, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);
  const butt = new THREE.ConeGeometry(shaftR * 1.6, stature * 0.05, 6);
  butt.rotateX(Math.PI);
  butt.translate(0, shaftLen * 0.42 - shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip, butt]);
  if (reversed) spear.rotateX(Math.PI);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(reversed ? Math.PI - 0.12 : -0.12);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/**
 * Same spear silhouette as `buildSpearGeometry`, but left at the hand's
 * local origin (not translated to the grip) — for a principal figure whose
 * spear needs to rotate smoothly about the grip point at render time (a
 * `<group>` positioned at the grip translates/rotates this geometry), rather
 * than a discrete baked reversal. Used only by Abner's own spear
 * (`PrincipalFigures.tsx`), so the reversed-grip gesture can blend
 * continuously instead of snapping between two baked geometries.
 */
export function buildSpearGeometryAtGrip(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const shaftLen = stature * 0.94;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0);
  const tip = new THREE.ConeGeometry(shaftR * 2.4, stature * 0.08, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);
  const butt = new THREE.ConeGeometry(shaftR * 1.6, stature * 0.05, 6);
  butt.rotateX(Math.PI);
  butt.translate(0, shaftLen * 0.42 - shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip, butt]);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.12);
  return spear;
}

/** A flattened oval board — the same shape family as gilboa-battle's
 * Israelite shield, reused here undifferentiated between the two sides. */
export function buildOvalShieldGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handL',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const board = new THREE.SphereGeometry(stature * 0.19, 10, 8);
  board.scale(0.58, 0.92, 0.16);
  const sideSign = hand === 'handL' ? 1 : -1;
  board.translate(grip.x + sideSign * stature * 0.05, grip.y * 1.05, grip.z + stature * 0.12);
  return board;
}

/**
 * A short blade held forward from the hand — the champions' gripped sword
 * (2:16), distinct from a sheathed weapon: extended forward at roughly waist
 * height, as though mid-thrust into an opponent's side (no penetration
 * geometry; the blade never crosses another figure's body — ADR-009).
 */
export function buildGripSwordGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const bladeLen = stature * 0.3;
  const blade = new THREE.BoxGeometry(stature * 0.024, stature * 0.005, bladeLen);
  blade.translate(0, 0, bladeLen / 2);
  const guard = new THREE.BoxGeometry(stature * 0.08, stature * 0.012, stature * 0.012);
  const handle = new THREE.CylinderGeometry(stature * 0.011, stature * 0.011, stature * 0.09, 6);
  handle.rotateX(Math.PI / 2);
  handle.translate(0, 0, -stature * 0.045);

  const sword = mergeParts([blade, guard, handle]);
  const sideSign = hand === 'handR' ? -1 : 1;
  sword.rotateY(sideSign * 0.25);
  sword.translate(grip.x, grip.y * 0.94, grip.z + stature * 0.06);
  return sword;
}
