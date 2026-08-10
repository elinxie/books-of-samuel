import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abnerPrincipalPose, davidPrincipalPose } from './poses';

/**
 * David and Abner (`claim-covenant-feast`, `claim-abner-break`,
 * `claim-abner-overture`) — principal-detail rigs (ADR-010), posed as rigid
 * groups via the pure pose functions in ./poses.ts (ADR-007), never
 * bone-driven skeletal animation. No Joab, Michal, Paltiel, or Rizpah
 * geometry anywhere in this component or file — the brief's hard scope
 * guard.
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
  shoulders: 1.04,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#6d5138',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#b69b6d',
  },
};

const SIT_LOWER = 0.42;
const SIT_SQUASH = 0.4;

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
      const d = davidPrincipalPose(t);
      const y = terrain.heightAt(d.x, d.z) - d.seated * SIT_LOWER;
      david.position.set(d.x, y, d.z);
      david.rotation.set(0, d.yaw, 0);
      david.scale.set(1, 1 - d.seated * SIT_SQUASH, 1);
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerPrincipalPose(t);
      const y = terrain.heightAt(a.x, a.z) - a.seated * SIT_LOWER;
      abner.position.set(a.x, y, a.z);
      // A brief forward lean carries the pledge gesture (3:21a) — the same
      // kind of rigid-group tilt already used for the anointing pour
      // gesture in hebron-anointing (never bone-driven).
      abner.rotation.set(-a.pledge * 0.3, a.yaw, 0);
      abner.scale.set(1, 1 - a.seated * SIT_SQUASH, 1);
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
