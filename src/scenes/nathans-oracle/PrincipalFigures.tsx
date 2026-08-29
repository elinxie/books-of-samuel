import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { Ark } from '../perez-uzzah/Ark';
import { TENT_POS } from './layout';
import { davidPose, nathanPose } from './poses';

/**
 * David and Nathan (`claim-nathan-oracle-house-request`, `claim-nathan-
 * oracle`, `claim-david-prayer`) — the scene's only two principals, per the
 * brief's conversation-scale cast (no crowd, procession, or unnamed
 * additional figure anywhere in this scene). Principal-detail rigs
 * (ADR-010), posed as rigid groups via the pure pose functions in
 * ./poses.ts (ADR-007), never bone-driven skeletal animation.
 *
 * **Nathan's night-rest transform (`resting`) is an ordinary settled posture
 * only** — a low, forward/downward lean (`REST_PITCH`, the same sign
 * convention as every prior scene's bowing/prostrate transforms, e.g.
 * ziklag-lament's messenger), never an upward or receptive one. No field
 * here ever drives a listening gesture, a raised head, or any camera-facing
 * cue — the brief's and ADR-013's hard bar (see `claim-oracle-depiction`).
 *
 * The ark (`claim-ark-physical-form`) is `perez-uzzah/Ark.tsx`, reused
 * unchanged and held static at the tent — already settled in its place
 * (2 Samuel 6:17, `ark-into-jerusalem`) well before this chapter opens, so
 * no `arkPose`/animation is needed here.
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

const NATHAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5c6b4a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#8a7250',
  },
};

const SIT_LOWER = 0.42;
const SIT_SQUASH = 0.4;
const SIT_INCLINE = 0.14;

const REST_LOWER = 0.5;
const REST_SQUASH = 0.52;
/** A forward/downward lean, never upward — ordinary settled rest, not a
 * receptive or listening posture (ADR-013, the brief's hard bar). */
const REST_PITCH = 0.55;

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const nathanGeo = useRigGeometry(NATHAN_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
  const nathanRef = useRef<THREE.Group>(null);
  const terrain = useAppStore((s) => s.terrain);
  const arkY = useMemo(() => terrain.heightAt(TENT_POS[0], TENT_POS[1]), [terrain]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidPose(t);
      const y = terrain.heightAt(d.x, d.z) - d.seated * SIT_LOWER;
      david.position.set(d.x, y, d.z);
      david.rotation.set(d.seated * SIT_INCLINE, d.yaw, 0);
      david.scale.set(1, 1 - d.seated * SIT_SQUASH, 1);
    }

    const nathan = nathanRef.current;
    if (nathan) {
      const n = nathanPose(t);
      const y = terrain.heightAt(n.x, n.z) - n.resting * REST_LOWER;
      nathan.position.set(n.x, y, n.z);
      nathan.rotation.set(n.resting * REST_PITCH, n.yaw, 0);
      nathan.scale.set(1, 1 - n.resting * REST_SQUASH, 1);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={nathanRef}>
        <mesh geometry={nathanGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group position={[TENT_POS[0], arkY, TENT_POS[1]]}>
        <Ark shadows={shadows} />
      </group>
    </group>
  );
}
