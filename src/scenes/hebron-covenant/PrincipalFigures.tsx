import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abnerCovenantPose, davidCovenantPose } from './poses';

/**
 * David and Abner (claim-covenant-feast) — the scene's two principals,
 * ADR-010 procedural rigs, posed as rigid groups via the pure pose functions
 * in ./poses.ts (ADR-007). Same undifferentiated Israelite dress convention
 * as gibeon-pool (claim-dress) — no invented Judah/Benjamin kit distinction.
 * Abner's pledge (3:21a) is carried as a gentle forward-lean/speaking
 * posture on his own rig, the same "whole-rig rotation gesture" convention
 * as hebron-anointing's `elderPose`'s pour tilt — not a new claim, this is
 * ordinary staging within claim-covenant-feast's scope.
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
  shoulders: 1.05,
  skinColor: '#8f5b3d',
  hairColor: '#3a332a',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5f4a2e',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#a89670',
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
      const d = davidCovenantPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(0, d.yaw, 0);
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerCovenantPose(t);
      abner.position.set(a.x, terrain.heightAt(a.x, a.z), a.z);
      abner.rotation.set(-a.pledge * 0.32, a.yaw, 0);
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
