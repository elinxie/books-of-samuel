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
import { buildChampionPairSlots, CHAMPIONS_COUNT } from './layout';
import { championPose } from './poses';
import { buildSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The champions' contest (b-champions, 2:14-16): twelve chosen young men a
 * side, rendered literally 1:1 (24 figures total, `claim-champions-contest`)
 * — the text's own exact, small, countable number, not a design-choice
 * ratio. Each pair grapples (a head-grasp gesture) and falls together, a
 * simultaneous mutual killing repeated twelve times over ("Helkath-hazzurim",
 * the place-name the event itself produces — carried by the beat caption,
 * not new geometry). No blade-entry, blood, or dismemberment geometry in
 * either violence mode (ADR-009); reduced mode still shows the pairing, only
 * eliding the fall itself (`championPose`'s `fallDuration`).
 *
 * Both sides use the identical body/kit — no invented "Judah kit" vs.
 * "Benjamin kit" (see the brief's dress-review call). The two figures in a
 * pair are distinguished only by which side of the pair they stand, a
 * grouping cue, not a costume difference.
 */

const CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.55,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function ChampionsGround({ shadows }: { shadows: boolean }) {
  const bodyMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const bodyGeo = useMemo(() => buildCrowdLimbedGeometry(CHAMPION_PARAMS), []);
  const swordGeo = useMemo(() => buildSwordGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const pairs = useMemo(() => buildChampionPairSlots(), []);
  const phaseOffsets = useMemo(() => {
    const rng = mulberry32(220307);
    return pairs.map(() => rng() * 3);
  }, [pairs]);

  useFrame(() => {
    const bodyMesh = bodyMeshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!bodyMesh || !swordMesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < pairs.length; i++) {
      const { israel, judah } = pairs[i];
      const pose = championPose(t, violenceMode, phaseOffsets[i]);
      const reachLean = pose.reach * 0.3;
      const fallenLean = pose.fallen * 1.3;

      const setInstance = (
        slot: { x: number; z: number; yaw: number },
        index: number,
        mirror: number,
      ) => {
        const y = terrain.heightAt(slot.x, slot.z) - pose.fallen * 0.12;
        dummy.position.set(slot.x, y, slot.z);
        dummy.rotation.set(reachLean - fallenLean, slot.yaw, mirror * pose.reach * 0.12);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(1, squash, 1);
        dummy.updateMatrix();
        bodyMesh.setMatrixAt(index, dummy.matrix);

        weaponDummy.position.copy(dummy.position);
        weaponDummy.rotation.set(reachLean - fallenLean + pose.reach * 0.3, slot.yaw, 0);
        weaponDummy.scale.copy(dummy.scale);
        weaponDummy.updateMatrix();
        swordMesh.setMatrixAt(index, weaponDummy.matrix);
      };

      setInstance(israel, i * 2, 1);
      setInstance(judah, i * 2 + 1, -1);
    }

    bodyMesh.instanceMatrix.needsUpdate = true;
    swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={bodyMeshRef}
        args={[bodyGeo, undefined, CHAMPIONS_COUNT * 2]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, CHAMPIONS_COUNT * 2]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a8a8a" roughness={0.6} metalness={0.4} />
      </instancedMesh>
    </group>
  );
}
