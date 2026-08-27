import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { Ark } from '../perez-uzzah/Ark';
import {
  arkPose,
  davidDanceTransform,
  davidPose,
  michalPose,
  officiantGesture,
  officiantPose,
} from './poses';

/**
 * David, Michal, and two unnamed offering-ground officiants
 * (`claim-ark-arrival-jerusalem`, `claim-michal-confrontation`,
 * `claim-sacrifice-depiction`) — principal-detail rigs (ADR-010), posed as
 * rigid groups driven entirely by the pure pose functions in `./poses.ts`,
 * never bone-driven skeletal animation. The ark itself
 * (`claim-ark-physical-form`) is `perez-uzzah/Ark.tsx`, reused unchanged,
 * positioned here via `arkPose`.
 *
 * **David's dress params never change across this file, in any mode, at any
 * beat — no field of `DAVID_DANCE_PARAMS` (or any other params object here)
 * ever encodes exposure, partial or implied.** The dance (`b-dance`) is
 * realized entirely as a whole-body rigid-group transform
 * (`davidDanceTransform`'s bounce/spin/lean, applied to position/rotation
 * only) on top of the same fully-clothed procedural rig every other
 * principal figure in this project uses — there is no alternate "exposed"
 * geometry anywhere in this engine to switch to (see `poses.test.ts`'s and
 * `exposure.test.ts`'s dedicated assertions). Michal's accusation (6:20b) is
 * never enacted: `michalPose` only ever produces a still window position, an
 * invisible withdrawal, a walk, and a held confrontation stance — the words
 * themselves are carried entirely by the beat caption/ESV excerpt.
 */

export const DAVID_DANCE_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.55,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  // Linen ephod (6:14) rendered as a plain, undyed-toned tunic — no royal
  // regalia, no crown, no raised-standard prop anywhere in this file or
  // scene (the brief's no-triumphal-grammar bar).
  dress: { tunicColor: '#e4dcc4', beltColor: '#8a7250', headwear: 'bare' },
};

const MICHAL_PARAMS: CharacterParams = {
  stature: 1.6,
  build: 0.46,
  shoulders: 0.88,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: false,
  detail: 'principal',
  dress: {
    tunicColor: '#6d4a5e',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#8a7250',
  },
};

const OFFICIANT_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#b6a06e',
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#8a7250',
  },
};

const OFFICIANT_OFFSETS: [number, number][] = [
  [-1.1, 1.3],
  [1.0, 1.5],
];

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useMemo(() => buildCharacterRig(DAVID_DANCE_PARAMS).geometry, []);
  const michalGeo = useMemo(() => buildCharacterRig(MICHAL_PARAMS).geometry, []);
  const officiantGeo = useMemo(() => buildCharacterRig(OFFICIANT_PARAMS).geometry, []);

  const davidRef = useRef<THREE.Group>(null);
  const michalRef = useRef<THREE.Group>(null);
  const arkRef = useRef<THREE.Group>(null);
  const officiantRefs = useRef<(THREE.Group | null)[]>([null, null]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const pose = davidPose(t);
      const dance = davidDanceTransform(t);
      const y = terrain.heightAt(pose.x, pose.z);
      david.position.set(pose.x, y + dance.bounce * 0.22, pose.z);
      david.rotation.set(dance.lean, pose.yaw + dance.spin, dance.lean * 0.6);
    }

    const michal = michalRef.current;
    if (michal) {
      const pose = michalPose(t);
      const y = terrain.heightAt(pose.x, pose.z);
      michal.position.set(pose.x, y, pose.z);
      michal.rotation.set(0, pose.yaw, 0);
      michal.visible = pose.visible;
    }

    const ark = arkRef.current;
    if (ark) {
      const pose = arkPose(t);
      const y = terrain.heightAt(pose.x, pose.z);
      ark.position.set(pose.x, y, pose.z);
      ark.rotation.set(0, pose.yaw, 0);
    }

    const gesture = officiantGesture(t);
    for (let i = 0; i < OFFICIANT_OFFSETS.length; i++) {
      const off = officiantRefs.current[i];
      if (!off) continue;
      const pos = officiantPose(OFFICIANT_OFFSETS[i]);
      const y = terrain.heightAt(pos.x, pos.z);
      off.position.set(pos.x, y, pos.z);
      off.rotation.set(-gesture * 0.35, i === 0 ? 0.4 : -0.4, 0);
    }
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={michalRef}>
        <mesh geometry={michalGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={arkRef}>
        <Ark shadows={shadows} />
      </group>
      {OFFICIANT_OFFSETS.map((_, i) => (
        <group
          key={`officiant-${i}`}
          ref={(el) => {
            officiantRefs.current[i] = el;
          }}
        >
          <mesh geometry={officiantGeo} castShadow={shadows}>
            <meshStandardMaterial vertexColors roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
