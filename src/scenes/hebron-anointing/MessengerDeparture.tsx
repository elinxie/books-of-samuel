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
import { clamp01, messengerDeparturePose, MESSENGER_COUNT } from './poses';

/**
 * The messengers David dispatches to Jabesh-gilead (2:5-7, claim-jabesh-commendation)
 * — generic, unnamed figures (no individual is named in the text). Staged
 * as correspondence: they appear at the plaza once dispatched and walk the
 * Hebron-side road east until they are out of frame. Hard scope guard:
 * never shown arriving at, or traveling within, Jabesh-gilead — that
 * geometry belongs to jabesh-burial alone; this scene renders only David's
 * side of the exchange.
 */

const GENERIC_MESSENGER_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.46,
  shoulders: 0.94,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[0],
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#a89670',
  },
};

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function MessengerDeparture({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MESSENGER_PARAMS), []);
  const staggers = useMemo(() => {
    const rng = mulberry32(221401);
    return Array.from({ length: MESSENGER_COUNT }, () => rng() * 3);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < staggers.length; i++) {
      const pose = messengerDeparturePose(t, staggers[i]);
      if (!pose.visible || pose.scale <= 0.01) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
      const y = terrain.heightAt(pose.x, pose.z);
      const scale = clamp01(pose.scale) * (0.94 + i * 0.02);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, MESSENGER_COUNT]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
