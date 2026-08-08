import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abnerPose, davidPose } from './poses';

/**
 * David and Abner, the scene's two principals (ADR-010 principal-detail
 * rigs, posed as rigid groups via the pure pose functions in ./poses.ts,
 * ADR-007 — no bone-driven skeletal animation). Abner's rig is hidden
 * before he arrives and after he has fully departed, matching
 * `abnerPose`'s own `visible` flag; his pledge gesture (3:21a) is a brief
 * forward lean/address tilt, the same register as hebron-anointing's
 * anointing-pour tilt.
 */

const DAVID_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.55,
  shoulders: 1.0,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const ABNER_PARAMS: CharacterParams = {
  stature: 1.74,
  build: 0.58,
  shoulders: 1.06,
  skinColor: '#8f5b3d',
  hairColor: '#3a2c1d',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5c6b47',
    beltColor: '#4a3a26',
    headwear: 'wrap',
    headwrapColor: '#8c7c62',
  },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
  const abnerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(0, d.yaw, 0);
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerPose(t);
      abner.visible = a.visible;
      abner.position.set(a.x, terrain.heightAt(a.x, a.z), a.z);
      abner.rotation.set(-a.pledge * 0.3, a.yaw, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
