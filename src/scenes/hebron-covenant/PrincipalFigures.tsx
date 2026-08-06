import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abnerPrincipalPose, davidPose, pledgeGestureEnvelope } from './poses';

/**
 * David and Abner (`claim-covenant-feast`) — principal-detail rigs (ADR-010),
 * posed as rigid groups via the pure pose functions in `./poses.ts`
 * (ADR-007), never bone-driven skeletal animation. David never travels (he
 * is already at Hebron); Abner travels the northern road, settles at the
 * feast, delivers the pledge gesture (`pledgeGestureEnvelope`), and departs
 * the same road in peace. No Joab rig exists anywhere in this file or scene
 * — the text states he was away (2 Samuel 3:22); his return belongs to
 * `hebron-gate`, a separate scene.
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
      const d = davidPose(t);
      david.visible = true;
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(0, d.yaw, 0);
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerPrincipalPose(t);
      abner.visible = a.visible;
      const gesture = pledgeGestureEnvelope(t);
      const y = terrain.heightAt(a.x, a.z) - a.seated * 0.22;
      const squash = 1 - a.seated * 0.32;
      abner.position.set(a.x, y, a.z);
      abner.rotation.set(-gesture * 0.32, a.yaw, 0);
      abner.scale.set(1, squash, 1);
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
