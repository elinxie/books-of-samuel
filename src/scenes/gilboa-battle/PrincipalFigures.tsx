import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';

/**
 * Named-figure crest group (M3 Step 2): Saul, Jonathan, Abinadab, Malchi-
 * shua, and the armor-bearer, held together as the composition's still
 * center at the ridge crest (`terrain.ts` origin) per the brief's "Focal
 * masses" (a). Principal-detail rigs per ADR-010 (asset-david-marker
 * pattern extended to `asset-saul-marker`), posed as rigid, static groups —
 * simple standing poses only. The death-sequence pose functions (rout
 * crumpling, the sons falling, the archers' volley, the armor-bearer's
 * refusal, Saul's death) are a later step; see
 * docs/design/gilboa-battle-brief.md.
 */

/** Fixed crest-cluster offsets (x, z) from the ridge crest at the origin. */
const SAUL_POS: [number, number] = [0, 0];
const JONATHAN_POS: [number, number] = [-2.4, 1.8];
const ABINADAB_POS: [number, number] = [2.6, 1.3];
const MALCHI_SHUA_POS: [number, number] = [1.1, -2.4];
const ARMOR_BEARER_POS: [number, number] = [-1.6, -1.9];

const SAUL_PARAMS: CharacterParams = {
  stature: 1.74,
  build: 0.6,
  shoulders: 1.05,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5a3b52',
    cloakColor: '#3f2a3a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const JONATHAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const ABINADAB_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#6d5138', beltColor: '#5a3722', headwear: 'bare' },
};

const MALCHI_SHUA_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.45,
  shoulders: 0.94,
  skinColor: '#75462f',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

const ARMOR_BEARER_PARAMS: CharacterParams = {
  stature: 1.65,
  build: 0.55,
  shoulders: 1.0,
  skinColor: '#a66d48',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#b69b6d', beltColor: '#5a3722', headwear: 'wrap', headwrapColor: '#d1c09a' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const saulGeo = useRigGeometry(SAUL_PARAMS);
  const jonathanGeo = useRigGeometry(JONATHAN_PARAMS);
  const abinadabGeo = useRigGeometry(ABINADAB_PARAMS);
  const malchiShuaGeo = useRigGeometry(MALCHI_SHUA_PARAMS);
  const armorBearerGeo = useRigGeometry(ARMOR_BEARER_PARAMS);

  const saulRef = useRef<THREE.Group>(null);
  const jonathanRef = useRef<THREE.Group>(null);
  const abinadabRef = useRef<THREE.Group>(null);
  const malchiShuaRef = useRef<THREE.Group>(null);
  const armorBearerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { terrain } = useAppStore.getState();
    const apply = (
      ref: React.RefObject<THREE.Group | null>,
      [x, z]: [number, number],
      yaw: number,
    ) => {
      const g = ref.current;
      if (!g) return;
      g.position.set(x, terrain.heightAt(x, z), z);
      g.rotation.set(0, yaw, 0);
    };
    // Simple standing poses this slice; each faces roughly toward Saul, the
    // group's visual center.
    apply(saulRef, SAUL_POS, 0);
    apply(jonathanRef, JONATHAN_POS, Math.atan2(SAUL_POS[0] - JONATHAN_POS[0], SAUL_POS[1] - JONATHAN_POS[1]));
    apply(abinadabRef, ABINADAB_POS, Math.atan2(SAUL_POS[0] - ABINADAB_POS[0], SAUL_POS[1] - ABINADAB_POS[1]));
    apply(
      malchiShuaRef,
      MALCHI_SHUA_POS,
      Math.atan2(SAUL_POS[0] - MALCHI_SHUA_POS[0], SAUL_POS[1] - MALCHI_SHUA_POS[1]),
    );
    apply(
      armorBearerRef,
      ARMOR_BEARER_POS,
      Math.atan2(SAUL_POS[0] - ARMOR_BEARER_POS[0], SAUL_POS[1] - ARMOR_BEARER_POS[1]),
    );
  });

  return (
    <group>
      <group ref={saulRef}>
        <mesh geometry={saulGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={jonathanRef}>
        <mesh geometry={jonathanGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abinadabRef}>
        <mesh geometry={abinadabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={malchiShuaRef}>
        <mesh geometry={malchiShuaGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={armorBearerRef}>
        <mesh geometry={armorBearerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
