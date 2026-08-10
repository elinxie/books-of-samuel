import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { assassinPose, davidReckoningPose } from './poses';

/**
 * David, Rechab, and Baanah (`claim-david-judgment`, `claim-ish-bosheth-
 * assassination`) — principal-detail rigs (ADR-010), posed as rigid groups
 * via the pure pose functions in `./poses.ts`, never bone-driven skeletal
 * animation. David's dress params match every prior Hebron scene's own
 * David — the same recognizable figure. Ish-bosheth is never staged as a
 * figure anywhere in this project (referenced-only); no rig exists for him.
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

const RECHAB_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.52,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#8c7a54',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#b69b6d',
  },
};

const BAANAH_PARAMS: CharacterParams = {
  stature: 1.69,
  build: 0.51,
  shoulders: 0.97,
  skinColor: '#9c6a45',
  hairColor: '#241a12',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
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
      const d = davidReckoningPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.address * 0.1, d.yaw, 0);
    }

    const rechab = rechabRef.current;
    if (rechab) {
      const r = assassinPose(t, violenceMode, -1.2);
      const settle = r.fallen * 0.12;
      rechab.position.set(r.x, terrain.heightAt(r.x, r.z) - settle, r.z);
      rechab.rotation.set(-r.fallen * 1.3 - r.presented * 0.15, r.yaw, 0);
      const squash = 1 - r.fallen * 0.5;
      rechab.scale.set(1, squash, 1);
    }

    const baanah = baanahRef.current;
    if (baanah) {
      const b = assassinPose(t, violenceMode, 1.2);
      const settle = b.fallen * 0.12;
      baanah.position.set(b.x, terrain.heightAt(b.x, b.z) - settle, b.z);
      baanah.rotation.set(-b.fallen * 1.3 - b.presented * 0.15, b.yaw, 0);
      const squash = 1 - b.fallen * 0.5;
      baanah.scale.set(1, squash, 1);
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
