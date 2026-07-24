import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abishaiPose, abnerPose, asahelPose, joabPose } from './poses';
import { buildSpearGeometry, buildSwordGeometry } from './kitMeshes';

/**
 * The four named principals of gibeon-pool: Abner, Joab, Abishai, and
 * Asahel (2:8-32) — principal-detail rigs per ADR-010, posed as rigid
 * groups via the pure pose functions in ./poses.ts (ADR-007), same
 * convention as every prior scene's principal cast. Ish-bosheth is
 * deliberately *not* rendered here — he does not appear at Gibeon in the
 * text (see claim-mahanaim-installation's notes) and is referenced only,
 * via the b-context beat's caption.
 *
 * Abner alone carries the scene's one load-bearing prop gesture: his spear,
 * reversed grip, at the moment of Asahel's death (2:23) — the text's own
 * specific, non-graphic detail (see the brief's "Asahel's death" section).
 * No blade-entry, blood, or wound geometry is ever produced here, in either
 * violence mode.
 */

const ABNER_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.6,
  shoulders: 1.05,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#5a5638', beltColor: '#3b2416', headwear: 'bare' },
};

const JOAB_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.58,
  shoulders: 1.02,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#6d4a34', beltColor: '#3b2416', headwear: 'bare' },
};

const ABISHAI_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#7a5c3e',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#a89670',
  },
};

const ASAHEL_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.4,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#8c7c50', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);
  const abnerSpearGeo = useMemo(() => buildSpearGeometry(ABNER_PARAMS.stature, 'handR'), []);
  const joabSwordGeo = useMemo(() => buildSwordGeometry(JOAB_PARAMS.stature, 'handR'), []);
  const abishaiSwordGeo = useMemo(() => buildSwordGeometry(ABISHAI_PARAMS.stature, 'handR'), []);

  const abnerRef = useRef<THREE.Group>(null);
  const abnerSpearRef = useRef<THREE.Mesh>(null);
  const joabRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const abner = abnerRef.current;
    if (abner) {
      const p = abnerPose(t, violenceMode);
      abner.position.set(p.x, terrain.heightAt(p.x, p.z), p.z);
      abner.rotation.set(0, p.yaw, 0);
      const spear = abnerSpearRef.current;
      if (spear) {
        // Reversed grip: the shaft swings through ~180deg about the grip
        // point (a gesture/orientation change on the existing spear prop,
        // never new wound geometry). The brief-specified detail — grip
        // reversal, not penetration — is exactly what this rotates.
        spear.rotation.z = p.spearReversed * Math.PI;
        spear.rotation.x = -p.strike * 0.7;
      }
    }

    const joab = joabRef.current;
    if (joab) {
      const p = joabPose(t);
      joab.position.set(p.x, terrain.heightAt(p.x, p.z), p.z);
      joab.rotation.set(-p.trumpet * 0.15, p.yaw, 0);
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const p = abishaiPose(t);
      abishai.position.set(p.x, terrain.heightAt(p.x, p.z), p.z);
      abishai.rotation.set(0, p.yaw, 0);
    }

    const asahel = asahelRef.current;
    if (asahel) {
      const p = asahelPose(t, violenceMode);
      const settle = p.fallen * 0.1;
      asahel.position.set(p.x, terrain.heightAt(p.x, p.z) - settle, p.z);
      asahel.rotation.set(-p.fallen * 1.35, p.yaw, 0);
      const squash = 1 - p.fallen * 0.55;
      asahel.scale.set(1, squash, 1);
    }
  });

  return (
    <group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh ref={abnerSpearRef} geometry={abnerSpearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
      </group>
      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh geometry={joabSwordGeo} castShadow={shadows}>
          <meshStandardMaterial color="#8a8a8a" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>
      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh geometry={abishaiSwordGeo} castShadow={shadows}>
          <meshStandardMaterial color="#8a8a8a" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>
      <group ref={asahelRef}>
        <mesh geometry={asahelGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
