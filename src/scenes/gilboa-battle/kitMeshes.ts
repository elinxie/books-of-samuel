import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Military-kit attachment geometries (M3 Step 4 of 5): spear, shield (oval
 * Israelite / round Philistine — the silhouette distinction is load-bearing
 * per docs/design/gilboa-battle-brief.md's "Dress review"), bow, a straight
 * sword (Philistine), and the Philistine principal-tier plumed headdress.
 * Simple cylinder/cone/box/torus/sphere primitives, not modeled assets
 * (claim-israelite-muster-kit, claim-philistine-kit;
 * asset-military-kit-israelite, asset-military-kit-philistine).
 *
 * Every geometry is baked in the SAME figure-local space the body geometry
 * uses (`engine/characters/bodyGeometry.ts` positions body parts from
 * `jointPositions`) — the grip/wear point is translated directly into the
 * mesh at build time. That means a kit instance can reuse the exact same
 * per-instance position/rotation/scale transform already computed for the
 * figure it belongs to (see PrincipalFigures.tsx, CrestRetinue.tsx,
 * PhilistinePress.tsx), rather than needing an independent placement or
 * bone-attachment system.
 */

/** A representative stature for crowd figures, which have no literal skeleton. */
export const CROWD_KIT_STATURE = 1.74;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand and angled forward/up. */
export function buildSpearGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const shaftLen = stature * 0.92;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0); // grip sits below the shaft's midpoint
  const tip = new THREE.ConeGeometry(shaftR * 2.4, stature * 0.08, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip]);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.12);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/**
 * A flattened board: oval (Israelite, `claim-israelite-muster-kit`) or round
 * (Philistine, `claim-philistine-kit`) — deliberately different silhouettes.
 */
export function buildShieldGeometry(
  stature: number,
  shape: 'oval' | 'round',
  hand: 'handL' | 'handR' = 'handL',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const board = new THREE.SphereGeometry(stature * 0.19, 10, 8);
  board.scale(shape === 'oval' ? 0.58 : 0.72, shape === 'oval' ? 0.92 : 0.72, 0.16);
  const sideSign = hand === 'handL' ? 1 : -1;
  board.translate(grip.x + sideSign * stature * 0.05, grip.y * 1.05, grip.z + stature * 0.12);
  return board;
}

/** A bent-arc bow, held roughly vertical in the off-hand. */
export function buildBowGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handL',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const radius = stature * 0.34;
  const arc = new THREE.TorusGeometry(radius, stature * 0.009, 5, 12, Math.PI * 1.15);
  arc.rotateZ(Math.PI / 2 + Math.PI * 0.075); // stand the arc upright
  arc.translate(grip.x, grip.y + radius * 0.05, grip.z);
  return arc;
}

/**
 * Straight blade + cross-guard + handle, worn sheathed at the hip
 * (Philistine only — `claim-philistine-kit`; Israelites stay spear/shield/
 * bow per the brief).
 */
export function buildStraightSwordGeometry(stature: number): THREE.BufferGeometry {
  const hip = jointPositions(stature).hips;
  const bladeLen = stature * 0.34;
  const blade = new THREE.BoxGeometry(stature * 0.028, bladeLen, stature * 0.006);
  blade.translate(0, -bladeLen / 2, 0);
  const guard = new THREE.BoxGeometry(stature * 0.09, stature * 0.015, stature * 0.012);
  const handle = new THREE.CylinderGeometry(stature * 0.012, stature * 0.012, stature * 0.09, 6);
  handle.translate(0, stature * 0.05, 0);

  const sword = mergeParts([blade, guard, handle]);
  sword.rotateZ(0.35); // angled, sheathed at the hip
  sword.translate(stature * 0.16, hip.y * 0.55, hip.z + stature * 0.08);
  return sword;
}

/**
 * A simple crown of thin vertical plumes atop the head — the Medinet Habu
 * "Sea Peoples" feathered-headdress marker. Philistine PRINCIPAL-TIER ONLY
 * (never crowd/infantry/archer instances); the ethnic/temporal attribution
 * is disputed, see `claim-philistine-kit`'s `scholarlyViews` and
 * `docs/fable-review-queue.md` item #13.
 */
export function buildHeaddressGeometry(stature: number): THREE.BufferGeometry {
  const head = jointPositions(stature).head;
  const headR = stature * 0.072 * 1.05;
  const parts: THREE.BufferGeometry[] = [];

  const band = new THREE.TorusGeometry(headR * 0.95, headR * 0.16, 5, 12);
  band.rotateX(Math.PI / 2);
  parts.push(band);

  const plumeCount = 6;
  const plumeLen = stature * 0.16;
  for (let i = 0; i < plumeCount; i++) {
    const angle = (i / plumeCount) * Math.PI * 2;
    const plume = new THREE.ConeGeometry(headR * 0.1, plumeLen, 5);
    plume.translate(Math.cos(angle) * headR * 0.85, plumeLen / 2, Math.sin(angle) * headR * 0.85);
    parts.push(plume);
  }

  const headdress = mergeParts(parts);
  headdress.translate(head.x, head.y + headR * 0.55, head.z);
  return headdress;
}

export type RetinueKit = 'spear' | 'shield' | 'spear-shield' | 'bow';

/**
 * Deterministic, non-uniform kit assignment for the Israelite crest retinue
 * (`claim-israelite-muster-kit`: "simple, non-uniform arms — spears,
 * shields, some bows", no uniform asserted). Pure function of the rng
 * stream so it stays unit-testable per the project's ADR-007 convention.
 */
export function assignRetinueKit(rng: () => number): RetinueKit {
  const r = rng();
  if (r < 0.15) return 'bow';
  if (r < 0.55) return 'spear-shield';
  if (r < 0.8) return 'spear';
  return 'shield';
}
