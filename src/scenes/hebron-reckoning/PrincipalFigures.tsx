import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { baanahPose, davidPose, rechabPose } from './poses';

/**
 * David, Rechab, and Baanah (`claim-david-judgment`,
 * `claim-ish-bosheth-assassination`) — principal-detail rigs (ADR-010),
 * posed as rigid groups whose transform is driven entirely by the pure pose
 * functions in `./poses.ts`, never bone-driven skeletal animation.
 *
 * ADR-009's strictest application: unlike every prior named-killing scene,
 * no gesture of any kind is modeled for the strike — the text gives no
 * method detail to show (docs/design/hebron-reckoning-brief.md, "Resolved
 * design calls"), so Rechab and Baanah's own collapse (`fallen`) is the only
 * transform the execution produces, identical in kind to Abner's at
 * hebron-gate and Asahel's at gibeon-pool. Ish-bosheth himself is never
 * modeled as a rig anywhere in this scene (referenced-only, per the brief);
 * his head renders only as the wrapped bundle in `./HeadBundle.tsx`.
 */

const DAVID_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.56,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5b3a2a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#b69b6d',
  },
};

const RECHAB_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.53,
  shoulders: 0.99,
  skinColor: '#a66d48',
  hairColor: '#241a10',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#6d5a3a', beltColor: '#3b2416', headwear: 'bare' },
};

const BAANAH_PARAMS: CharacterParams = {
  stature: 1.69,
  build: 0.52,
  shoulders: 0.98,
  skinColor: '#8f5b3d',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a6a45', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const rechabGeo = useRigGeometry(RECHAB_PARAMS);
  const baanahGeo = useRigGeometry(BAANAH_PARAMS);

  const davidRef = useRef<THREE.Group>(null);
  const rechabRef = useRef<THREE.Group>(null);
  const baanahRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const pose = davidPose(t);
      david.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      david.rotation.set(0, pose.yaw, 0);
    }

    const rechab = rechabRef.current;
    if (rechab) {
      const pose = rechabPose(t, violenceMode);
      rechab.visible = pose.visible;
      if (pose.visible) {
        const settle = pose.fallen * 0.12;
        rechab.position.set(pose.x, terrain.heightAt(pose.x, pose.z) - settle, pose.z);
        rechab.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        rechab.scale.set(1, squash, 1);
      }
    }

    const baanah = baanahRef.current;
    if (baanah) {
      const pose = baanahPose(t, violenceMode);
      baanah.visible = pose.visible;
      if (pose.visible) {
        const settle = pose.fallen * 0.12;
        baanah.position.set(pose.x, terrain.heightAt(pose.x, pose.z) - settle, pose.z);
        baanah.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        baanah.scale.set(1, squash, 1);
      }
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={rechabRef}>
        <mesh geometry={rechabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={baanahRef}>
        <mesh geometry={baanahGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
