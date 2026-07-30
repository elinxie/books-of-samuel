import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import {
  ABNER_BANK_SLOTS,
  ABNER_SPREAD_SLOTS,
  HILL_BASE_SLOTS,
  HILL_CREST_SLOTS,
  JOAB_BANK_SLOTS,
  JOAB_SPREAD_SLOTS,
} from './layout';
import { contingentFigurePose, type ContingentFigureState, type ContingentRole } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Abner's Israel/Benjamin company and Joab's Judah company
 * (claim-gibeon-battle-scale): a disclosed, deliberately modest figure count
 * for each — noticeably smaller than gilboa-battle's already-modest
 * high-tier combat totals, since this is one contingent-level clash between
 * two commanders' followings, not a national muster. Both sides share the
 * identical body geometry, dress palette, and generic spear prop —
 * deliberately no invented "Judah kit" vs. "Benjamin/Israel kit" (no new kit
 * claim; claim-dress reused as-is). Sides read only by bank/grouping.
 *
 * The hilltop/pursuer bands (2:25) are drawn from — not additive to — each
 * contingent's own figures (the brief's explicit "not additive" note): a
 * subset of each side's roster continues on to the hill of Ammah rather than
 * new figures being introduced there.
 */

const GENERIC_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export interface ContingentFigureDescriptor extends ContingentFigureState {
  scale: number;
  color: THREE.Color;
}

/**
 * Assigns each contingent figure a bank slot, a spread-ground slot, and a
 * role: the first `bandCount` figures (in slot order — an arbitrary but
 * deterministic assignment, not a narrative distinction) join the hilltop/
 * pursuer band; among the rest, `fallFraction` fall during the wider battle
 * (a disclosed rout-style visual, never sized to match 2:29-31's real
 * casualty figures); the remainder simply hold the spread ground,
 * untracked further. Exported for unit tests.
 */
export function buildContingentFigures(
  side: 'abner' | 'joab',
  count: number,
  bandCount: number,
  fallFraction: number,
  seed: number,
): ContingentFigureDescriptor[] {
  const bankSlots = side === 'abner' ? ABNER_BANK_SLOTS : JOAB_BANK_SLOTS;
  const spreadSlots = side === 'abner' ? ABNER_SPREAD_SLOTS : JOAB_SPREAD_SLOTS;
  const bandSlots = side === 'abner' ? HILL_CREST_SLOTS : HILL_BASE_SLOTS;
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 500);
  const color = new THREE.Color();
  const out: ContingentFigureDescriptor[] = [];
  for (let i = 0; i < count; i++) {
    const bankPos = bankSlots[i % bankSlots.length];
    const spreadPos = spreadSlots[i % spreadSlots.length];
    let role: ContingentRole = 'hold';
    let bandSlot: [number, number] | null = null;
    if (i < bandCount) {
      role = 'band';
      bandSlot = bandSlots[i % bandSlots.length];
    } else if (rng() < fallFraction) {
      role = 'falls';
    }
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      bankPos,
      spreadPos,
      role,
      bandSlot,
      fallDelay: rng() * 5,
      moveDelay: rng() * 6,
      scale: 0.93 + paletteRng() * 0.15,
      color: color.clone(),
    });
  }
  return out;
}

/** Clamps a contingent's hilltop/pursuer band to the brief's 12-18 figure
 * target, never exceeding the contingent's own total (drawn-from, not
 * additive). Exported for unit tests. */
export function bandCountFor(contingentCount: number, fraction: number): number {
  return Math.max(
    1,
    Math.min(18, Math.max(12, Math.round(contingentCount * fraction)), contingentCount),
  );
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function WiderContingents({
  side,
  count,
  shadows,
}: {
  side: 'abner' | 'joab';
  count: number;
  shadows: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PARAMS), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);

  const bandFraction = side === 'abner' ? 0.4 : 0.45;
  const fallFraction = side === 'abner' ? 0.4 : 0.08;
  const seed = side === 'abner' ? 230701 : 230702;
  const band = bandCountFor(count, bandFraction);
  const figures = useMemo(
    () => buildContingentFigures(side, count, band, fallFraction, seed),
    [side, count, band, fallFraction, seed],
  );

  useFrame(() => {
    const mesh = meshRef.current;
    const spearMesh = spearMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = contingentFigurePose(t, fig, violenceMode);
      const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
      const squash = (1 - pose.fallen * 0.55) * pose.spawnScale;
      dummy.scale.set(fig.scale * pose.spawnScale, fig.scale * squash, fig.scale * pose.spawnScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.copy(dummy.rotation);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      spearMesh?.setMatrixAt(i, weaponDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
