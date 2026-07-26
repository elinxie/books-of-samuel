import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abishaiPose, abnerPose, asahelPose, joabPose } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Named principals: Abner, Joab, Abishai, Asahel (ADR-010 principal-detail
 * rigs, rigid-group-posed exactly like gilboa-battle/hebron-anointing's
 * PrincipalFigures.tsx — asset-david-marker's pattern reused, not
 * duplicated as a new asset record). Ish-bosheth is referenced/context only
 * and is never staged here (he does not appear at Gibeon in the text —
 * brief's explicit "not allowed").
 *
 * Abner's spear carries the scene's one load-bearing violence detail: the
 * reversed grip at the death beat (2:23), read as an extra local rotation
 * swinging the shaft from a normal forward-carry angle toward pointing back
 * over his shoulder — a gesture, never penetration geometry (ADR-009).
 */

const ABNER_POS_Y_OFFSET = 0;

const ABNER_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.56,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#5a4a30',
    cloakColor: '#3f3a2a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#c2b088',
  },
};

const JOAB_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.54,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a3b2e', beltColor: '#3b2416', headwear: 'bare' },
};

const ABISHAI_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#6d5138', beltColor: '#5a3722', headwear: 'bare' },
};

const ASAHEL_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.42,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);

  const abnerRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);
  const abnerSpearRef = useRef<THREE.Group>(null);
  const joabSpearRef = useRef<THREE.Group>(null);
  const abishaiSpearRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const abner = abnerPose(t, violenceMode);
    const joab = joabPose(t);
    const abishai = abishaiPose(t);
    const asahel = asahelPose(t, violenceMode);

    const abnerG = abnerRef.current;
    if (abnerG) {
      const y = terrain.heightAt(abner.x, abner.z) + ABNER_POS_Y_OFFSET;
      abnerG.position.set(abner.x, y, abner.z);
      abnerG.rotation.set(-abner.lean * 0.14, abner.yaw, 0);
      abnerG.updateMatrix();
    }
    const abnerSpear = abnerSpearRef.current;
    if (abnerSpear && abnerG) {
      abnerSpear.position.copy(abnerG.position);
      abnerSpear.rotation.set(-abner.lean * 0.14, abner.yaw, 0);
      // The reversed-grip thrust (2:23): swings the shaft from its normal
      // forward-carry angle toward pointing back — a gesture, not
      // penetration geometry.
      abnerSpear.rotateY(Math.PI * abner.spearReverse);
      abnerSpear.rotateX(-0.4 * abner.spearReverse);
    }

    const joabG = joabRef.current;
    if (joabG) {
      joabG.position.set(joab.x, terrain.heightAt(joab.x, joab.z), joab.z);
      joabG.rotation.set(0, joab.yaw, 0);
    }
    const joabSpear = joabSpearRef.current;
    if (joabSpear && joabG) {
      joabSpear.position.copy(joabG.position);
      joabSpear.rotation.copy(joabG.rotation);
    }

    const abishaiG = abishaiRef.current;
    if (abishaiG) {
      abishaiG.position.set(abishai.x, terrain.heightAt(abishai.x, abishai.z), abishai.z);
      abishaiG.rotation.set(0, abishai.yaw, 0);
    }
    const abishaiSpear = abishaiSpearRef.current;
    if (abishaiSpear && abishaiG) {
      abishaiSpear.position.copy(abishaiG.position);
      abishaiSpear.rotation.copy(abishaiG.rotation);
    }

    const asahelG = asahelRef.current;
    if (asahelG) {
      const settle = asahel.fallen * 0.12;
      asahelG.position.set(asahel.x, terrain.heightAt(asahel.x, asahel.z) - settle, asahel.z);
      asahelG.rotation.set(-asahel.fallen * 1.35, asahel.yaw, 0);
      const squash = 1 - asahel.fallen * 0.55;
      asahelG.scale.set(1, squash, 1);
    }
  });

  return (
    <group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abnerSpearRef}>
        <mesh geometry={spearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
      </group>

      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={joabSpearRef}>
        <mesh geometry={spearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
      </group>

      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abishaiSpearRef}>
        <mesh geometry={spearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
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
