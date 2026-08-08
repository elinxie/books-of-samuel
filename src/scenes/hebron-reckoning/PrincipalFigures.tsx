import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { BAANAH_SPEC, RECHAB_SPEC, assassinPose, davidPose } from './poses';

/**
 * David, Rechab, and Baanah (`claim-david-judgment`,
 * `claim-ish-bosheth-assassination`) — principal-detail rigs (ADR-010),
 * posed as rigid groups driven entirely by the pure pose functions in
 * `./poses.ts` (ADR-007), never bone-driven skeletal animation. David's
 * params match his appearance in `hebron-gate`/`ziklag-lament` for
 * cross-scene continuity. Rechab and Baanah are dressed as ordinary
 * Benjaminite raiding-band captains (`claim-dress`) — the text gives no
 * physical description, and this project does not villain-cartoon them
 * beyond what it states.
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
  stature: 1.72,
  build: 0.52,
  shoulders: 0.98,
  skinColor: '#96684a',
  hairColor: '#241a12',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5f6b45',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#8c7c5a',
  },
};

const BAANAH_PARAMS: CharacterParams = {
  stature: 1.69,
  build: 0.5,
  shoulders: 0.95,
  skinColor: '#a3714f',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#6d5a3c',
    beltColor: '#402a18',
    headwear: 'wrap',
    headwrapColor: '#a89670',
  },
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
      const d = davidPose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.address * 0.14, d.yaw, 0);
    }

    const rechab = rechabRef.current;
    if (rechab) {
      const r = assassinPose(t, violenceMode, RECHAB_SPEC);
      rechab.visible = r.visible;
      const settle = r.fallen * 0.12;
      rechab.position.set(r.x, terrain.heightAt(r.x, r.z) - settle, r.z);
      rechab.rotation.set(r.present * 0.55 - r.fallen * 1.3, r.yaw, 0);
      const squash = 1 - r.fallen * 0.5;
      rechab.scale.set(1, squash, 1);
    }

    const baanah = baanahRef.current;
    if (baanah) {
      const b = assassinPose(t, violenceMode, BAANAH_SPEC);
      baanah.visible = b.visible;
      const settle = b.fallen * 0.12;
      baanah.position.set(b.x, terrain.heightAt(b.x, b.z) - settle, b.z);
      baanah.rotation.set(b.present * 0.55 - b.fallen * 1.3, b.yaw, 0);
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
