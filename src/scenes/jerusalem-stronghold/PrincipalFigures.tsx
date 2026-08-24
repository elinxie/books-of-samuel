import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { davidPrincipalPose } from './poses';

/**
 * David (`david`, `claim-jerusalem-capture`, `claim-city-of-david-naming`)
 * — the scene's one principal-detail rig. **No Joab, no Hiram, and no
 * Abner geometry anywhere in this file** — 2 Samuel 5 names no one who went
 * up with David (the tsinnôr crux, `claim-tsinnor-crux`), Hiram is
 * referenced-only and never staged, and Abner is already dead by this point
 * in the narrative (the brief's hard scope guards). Posed as a rigid group
 * via the pure pose function in ./poses.ts (ADR-007), never bone-driven
 * skeletal animation.
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

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const davidRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const david = davidRef.current;
    if (david) {
      const d = davidPrincipalPose(t);
      const y = terrain.heightAt(d.x, d.z);
      david.position.set(d.x, y, d.z);
      david.rotation.set(0, d.yaw, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
