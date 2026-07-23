import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abiatharPose, davidPose, elderPose } from './poses';
import { AnointingProps } from './AnointingProps';

/**
 * David, Abiathar (the inquiry vignette only, 2:1), and the unnamed elder
 * who performs the anointing gesture (2:4 — no individual elder is invented,
 * see claim-judah-anointing). Principal-detail rigs per ADR-010
 * (asset-david-marker), posed as rigid groups via the pure pose functions in
 * ./poses.ts (ADR-007) — no bone-driven skeletal animation.
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

const ABIATHAR_PARAMS: CharacterParams = {
  stature: 1.64,
  build: 0.42,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#8c7c62',
    beltColor: '#4a3a26',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const ELDER_PARAMS: CharacterParams = {
  stature: 1.65,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#5c5148',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#9d8358',
    beltColor: '#4a3a26',
    headwear: 'wrap',
    headwrapColor: '#b69b6d',
  },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const abiatharGeo = useRigGeometry(ABIATHAR_PARAMS);
  const elderGeo = useRigGeometry(ELDER_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
  const abiatharRef = useRef<THREE.Group>(null);
  const elderRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.inquire * 0.28, d.yaw, 0);
    }

    const abiathar = abiatharRef.current;
    if (abiathar) {
      const a = abiatharPose(t);
      abiathar.visible = a.visible;
      abiathar.position.set(a.x, terrain.heightAt(a.x, a.z), a.z);
      abiathar.rotation.set(0, a.yaw, 0);
    }

    const elder = elderRef.current;
    if (elder) {
      const e = elderPose(t);
      elder.position.set(e.x, terrain.heightAt(e.x, e.z), e.z);
      elder.rotation.set(-e.pour * 0.5, e.yaw, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abiatharRef}>
        <mesh geometry={abiatharGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={elderRef}>
        <mesh geometry={elderGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <AnointingProps shadows={shadows} />
    </group>
  );
}
