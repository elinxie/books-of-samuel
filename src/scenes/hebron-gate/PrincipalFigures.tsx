import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { ABISHAI_GATE_POS } from './layout';
import {
  abishaiGatePose,
  abnerGatePose,
  davidGatePose,
  joabGatePose,
  mourningDressBlend,
} from './poses';

/**
 * David, Joab, Abner, and Abishai (`claim-abner-killing`,
 * `claim-david-disavowal`, `claim-abner-funeral`) — principal-detail rigs
 * (ADR-010), posed as rigid groups driven entirely by the pure pose
 * functions in `./poses.ts` (ADR-007), never bone-driven skeletal
 * animation. Joab's dress is the one deliberately double-modeled principal
 * geometry here: an ordinary-dress mesh and a sackcloth mesh
 * (`claim-mourning-dress`), cross-faded by visibility rather than blended —
 * the same discrete-swap technique gibeon-pool used for Abner's normal/
 * reversed spear grip, since 3:31's detail (Joab himself torn and
 * sackclothed) is a discrete change of state, not a continuous motion.
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

const JOAB_SACKCLOTH_PARAMS: CharacterParams = {
  ...JOAB_PARAMS,
  dress: { tunicColor: '#362f26', beltColor: '#241f18', headwear: 'bare' },
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
  const joabSackclothGeo = useRigGeometry(JOAB_SACKCLOTH_PARAMS);
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);

  const davidRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const joabNormalMeshRef = useRef<THREE.Mesh>(null);
  const joabSackclothMeshRef = useRef<THREE.Mesh>(null);
  const abnerRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidGatePose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.address * 0.14, d.yaw, 0);
    }

    const joab = joabRef.current;
    if (joab) {
      const j = joabGatePose(t, violenceMode);
      joab.visible = j.visible;
      joab.position.set(j.x, terrain.heightAt(j.x, j.z), j.z);
      joab.rotation.set(-j.tear * 0.35, j.yaw, 0);
      const mourning = mourningDressBlend(t);
      if (joabNormalMeshRef.current) joabNormalMeshRef.current.visible = mourning < 0.5;
      if (joabSackclothMeshRef.current) joabSackclothMeshRef.current.visible = mourning >= 0.5;
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerGatePose(t, violenceMode);
      abner.visible = a.visible;
      const settle = a.fallen * 0.12;
      abner.position.set(a.x, terrain.heightAt(a.x, a.z) - settle, a.z);
      abner.rotation.set(-a.fallen * 1.35, a.yaw, 0);
      const squash = 1 - a.fallen * 0.55;
      abner.scale.set(1, squash, 1);
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const p = abishaiGatePose(t, ABISHAI_GATE_POS);
      abishai.position.set(p.x, terrain.heightAt(p.x, p.z), p.z);
      abishai.rotation.set(0, p.yaw, 0);
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
        <mesh ref={joabNormalMeshRef} geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh ref={joabSackclothMeshRef} geometry={joabSackclothGeo} castShadow={shadows}>
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
