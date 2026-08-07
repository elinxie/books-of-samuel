import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abnerPrincipalPose, davidPrincipalPose } from './poses';

/**
 * David and Abner (`claim-covenant-feast`, `claim-abner-break`,
 * `claim-abner-overture`) — principal-detail rigs (ADR-010), posed as rigid
 * groups via the pure pose functions in `./poses.ts`, mirroring
 * hebron-anointing/PrincipalFigures.tsx and gibeon-pool/PrincipalFigures.tsx.
 * Both reuse the exact same appearance params as their earlier scene
 * appearances (hebron-anointing's David, gibeon-pool's Abner) — the same
 * figures, consistently rendered, not a fresh design. No Joab: the text is
 * explicit he was away (3:22), and Joab's return belongs to `hebron-gate`.
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
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(0, d.yaw, 0);
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerPrincipalPose(t);
      abner.position.set(a.x, terrain.heightAt(a.x, a.z), a.z);
      // A brief raised-forward lean during the pledge gesture (b-pledge,
      // 3:21a) — a plain spoken-oath posture, never aggressive.
      abner.rotation.set(-a.pledge * 0.18, a.yaw, 0);
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
