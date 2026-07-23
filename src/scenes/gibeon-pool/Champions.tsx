import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { buildStraightSwordGeometry, CROWD_KIT_STATURE } from '../gilboa-battle/kitMeshes';
import { buildChampionPairSlots } from './layout';
import { championPairPose } from './poses';

/**
 * The champions' contest (2:14-16, `b-champions`): 24 figures rendered
 * literally 1:1 — the text's own exact count (twelve a side), not a
 * "narrated army" needing the project's usual ~1:10 crowd convention. Both
 * sides share the same generic dress (`claim-dress`) and the same straight
 * sword (2:16's "thrust his sword") — no invented Judah/Benjamin kit
 * distinction (brief's "Resolved design calls"). One shared pose function
 * per pair (`championPairPose`), parameterized only by pair offset — the
 * project's cheapest new choreography (brief's "Performance target").
 */

const CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

const dummy = new THREE.Object3D();

export function Champions({ shadows }: { shadows: boolean }) {
  const pairs = useMemo(() => buildChampionPairSlots(12), []);
  const bodyGeo = useMemo(() => buildCrowdLimbedGeometry(CHAMPION_PARAMS), []);
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);

  const bodyMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const total = pairs.length * 2;

  useFrame(() => {
    const bodyMesh = bodyMeshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!bodyMesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < pairs.length; i++) {
      const pose = championPairPose(t, violenceMode, pairs[i]);
      const lean = pose.grapple * 0.5 - pose.fallen * 1.35;
      const squash = 1 - pose.grapple * 0.05 - pose.fallen * 0.55;

      const benjaminY = terrain.heightAt(pose.benjaminX, pose.benjaminZ) - pose.fallen * 0.12;
      dummy.position.set(pose.benjaminX, benjaminY, pose.benjaminZ);
      dummy.rotation.set(lean, pose.benjaminYaw, 0);
      dummy.scale.set(1, squash, 1);
      dummy.updateMatrix();
      bodyMesh.setMatrixAt(i * 2, dummy.matrix);
      swordMesh?.setMatrixAt(i * 2, dummy.matrix);

      const judahY = terrain.heightAt(pose.judahX, pose.judahZ) - pose.fallen * 0.12;
      dummy.position.set(pose.judahX, judahY, pose.judahZ);
      dummy.rotation.set(lean, pose.judahYaw, 0);
      dummy.scale.set(1, squash, 1);
      dummy.updateMatrix();
      bodyMesh.setMatrixAt(i * 2 + 1, dummy.matrix);
      swordMesh?.setMatrixAt(i * 2 + 1, dummy.matrix);
    }

    bodyMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={bodyMeshRef}
        args={[bodyGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.55} metalness={0.35} />
      </instancedMesh>
    </group>
  );
}
