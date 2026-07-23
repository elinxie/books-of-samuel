import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { davidPose, messengerPose } from './poses';
import { RoyalTokens } from './RoyalTokens';

/**
 * David and the Amalekite messenger: the two principals of this scene's
 * "intimate three-scale composition (principal / secondary principal / small
 * group)" (brief, "Camera / observer experience"). Principal-detail rigs per
 * ADR-010 (asset-david-marker), posed as rigid groups via the pure pose
 * functions in ./poses.ts (ADR-007) — no bone-driven skeletal animation.
 *
 * The messenger's dress carries only "Amalekite" and "torn clothes, dust on
 * his head" (1:2) at placeholder fidelity — a muted, dust-toned palette on
 * the existing procedural rig, not tear/dust geometry (see claim-mourning-dress).
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

const MESSENGER_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.42,
  shoulders: 0.94,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#8c7c62',
    beltColor: '#4a3a26',
    headwear: 'wrap',
    headwrapColor: '#a89670',
  },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const messengerGeo = useRigGeometry(MESSENGER_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
  const messengerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.grieve * 0.3, d.yaw, 0);
    }

    const messenger = messengerRef.current;
    if (messenger) {
      const m = messengerPose(t, violenceMode);
      messenger.visible = m.visible;
      const settle = m.fallen * 0.1;
      messenger.position.set(m.x, terrain.heightAt(m.x, m.z) - settle, m.z);
      messenger.rotation.set(m.prostrate * 0.9 - m.fallen * 1.3, m.yaw, 0);
      const squash = 1 - m.prostrate * 0.15 - m.fallen * 0.5;
      messenger.scale.set(1, squash, 1);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={messengerRef}>
        <mesh geometry={messengerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <RoyalTokens shadows={shadows} />
    </group>
  );
}
