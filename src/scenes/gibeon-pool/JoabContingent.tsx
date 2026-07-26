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
import { HILL_BASE_SLOTS, JUDAH_BANK_SLOTS, JUDAH_BATTLE_SLOTS } from './layout';
import { joabContingentPose } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Joab/Judah's wider contingent (claim-gibeon-battle-scale): a disclosed
 * design-choice headcount (~30-40 at high tier). Seated at the pool's south
 * bank, scattered into the spreading battle once it ignites (2:17), then
 * pursues to the hill of Ammah's base — never the summit, held below the
 * rallying Benjaminites, per the brief's deliberate visual irony (the
 * numerically losing side holds the high ground). A smaller, seeded
 * fraction "falls" during the battle-spread beat than Abner's side —
 * directionally lopsided, but never scaled to the exact 19/360 casualty
 * figures delivered as text at b-casualty-count (claim-gibeon-casualties).
 * See `joabContingentPose` in poses.ts.
 */

const JOAB_FALL_FRACTION = 0.06;

const GENERIC_JUDAH_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#5a3722', headwear: 'bare' },
};

export interface JoabFigureState {
  bank: [number, number];
  battle: [number, number];
  hillBase: [number, number];
  fallsInBattle: boolean;
  fallDelay: number;
  scale: number;
  color: THREE.Color;
}

export function buildJoabContingentFigures(count: number, seed = 220602): JoabFigureState[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();

  const out: JoabFigureState[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      bank: JUDAH_BANK_SLOTS[i % JUDAH_BANK_SLOTS.length],
      battle: JUDAH_BATTLE_SLOTS[i % JUDAH_BATTLE_SLOTS.length],
      hillBase: HILL_BASE_SLOTS[i % HILL_BASE_SLOTS.length],
      fallsInBattle: rng() < JOAB_FALL_FRACTION,
      fallDelay: rng() * 8,
      scale: 0.94 + paletteRng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function JoabContingent({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_JUDAH_PARAMS), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const figures = useMemo(() => buildJoabContingentFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const spear = spearRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = joabContingentPose(
        t,
        fig.bank,
        fig.battle,
        fig.hillBase,
        fig.fallsInBattle,
        fig.fallDelay,
        violenceMode,
      );
      if (!pose.visible) {
        dummy.position.set(0, -80, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(-pose.fallen * 1.3, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
      spear?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (spear) spear.instanceMatrix.needsUpdate = true;
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
        ref={spearRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a8a86" roughness={0.6} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
