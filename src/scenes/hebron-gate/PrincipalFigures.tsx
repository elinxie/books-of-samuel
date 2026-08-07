import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import {
  abishaiPrincipalPose,
  abnerPrincipalPose,
  davidPrincipalPose,
  gateAsidePose,
  joabPrincipalPose,
} from './poses';

/**
 * David, Joab, Abner, and Abishai (`claim-abner-killing`,
 * `claim-david-disavowal`, `claim-abner-funeral`) — principal-detail rigs
 * (ADR-010), posed as rigid groups whose transform is driven entirely by the
 * pure pose functions in `./poses.ts`, never bone-driven skeletal animation
 * — the same convention gibeon-pool's PrincipalFigures.tsx established.
 *
 * ADR-009, second application: no weapon is modeled for the strike (unlike
 * Gibeon's reversed-grip spear) — the one gesture this scene stages is
 * Joab's drawing-aside lean (`gateAsidePose`), not a distinct strike
 * animation. Abner's collapse (`abnerPrincipalPose`'s `fallen`) is a
 * body-orientation/collapse transform only, identical in kind to Asahel's at
 * Gibeon and to Gilboa's fallen figures — no wound, blood, or dismemberment
 * geometry in either violence mode. Abner's rig hides the instant the bier
 * (`Bier.tsx`) picks the body up for the procession, so the two are never
 * rendered at once.
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

const JOAB_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.54,
  shoulders: 1.0,
  skinColor: '#a66d48',
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

const ABISHAI_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.97,
  skinColor: '#8f5b3d',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);

  const davidRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const abnerRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const pose = davidPrincipalPose(t);
      david.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      david.rotation.set(0, pose.yaw, 0);
    }

    const joab = joabRef.current;
    if (joab) {
      const pose = joabPrincipalPose(t);
      const aside = gateAsidePose(t);
      joab.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      // The drawing-aside lean — a hand-on-the-shoulder privacy gesture, the
      // scene's one specific ADR-009 gesture detail. Never a strike pose.
      joab.rotation.set(aside.asideLean * 0.14, pose.yaw, 0);
    }

    const abner = abnerRef.current;
    if (abner) {
      const pose = abnerPrincipalPose(t, violenceMode);
      abner.visible = pose.visible;
      if (pose.visible) {
        const settle = pose.fallen * 0.12;
        abner.position.set(pose.x, terrain.heightAt(pose.x, pose.z) - settle, pose.z);
        abner.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        abner.scale.set(1, squash, 1);
      }
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const pose = abishaiPrincipalPose(t);
      abishai.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      abishai.rotation.set(0, pose.yaw, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
