import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { buildShieldGeometry, buildSpearGeometry } from '../gilboa-battle/kitMeshes';
import { abishaiPose, abnerPose, asahelPose, joabPose, joabTrumpetGesture } from './poses';

/**
 * The four named principals actually staged at Gibeon: Abner, Joab,
 * Abishai, Asahel. Ish-bosheth is referenced only (2:8-10) and is never
 * built here, per the brief. Principal-detail rigs per ADR-010, posed as
 * rigid groups via the pure pose functions in `./poses.ts` (ADR-007) — no
 * bone-driven skeletal animation. Same undifferentiated spear/oval-shield
 * kit convention as gilboa-battle's principals (`claim-israelite-muster-
 * kit`), reused here for both sides alike.
 *
 * Asahel's death (`b-asahel-death`) is the load-bearing beat: Abner's
 * `strike` gesture swings his spear kit instance through an extra half-turn
 * (a disclosed, placeholder-fidelity stand-in for the text's one specific
 * detail — the reversed/butt-end grip, 2:23) while his body only leans;
 * Asahel's own pose never produces a wound — only the existing collapse
 * transform (rotation + squash), identical convention to every prior death
 * in this project.
 */

const ABNER_PARAMS: CharacterParams = {
  stature: 1.72,
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
    headwrapColor: '#c2af86',
  },
};

const JOAB_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.56,
  shoulders: 1.02,
  skinColor: '#a66d48',
  hairColor: '#1f1712',
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
  dress: { tunicColor: '#8a6a3f', beltColor: '#3b2416', headwear: 'bare' },
};

const ASAHEL_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.42,
  shoulders: 0.9,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#3b2416', headwear: 'bare' },
};

const PRINCIPAL_KIT_STATURE = 1.7;
const PRINCIPAL_COUNT = 4;

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);
  const spearGeo = useMemo(() => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(PRINCIPAL_KIT_STATURE, 'oval', 'handL'), []);

  const abnerRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;

    const apply = (
      ref: React.RefObject<THREE.Group | null>,
      kitIndex: number,
      x: number,
      z: number,
      yaw: number,
      fallen: number,
      opts?: { spearFlip?: number; lean?: number },
    ) => {
      const g = ref.current;
      if (!g) return;
      const settle = fallen * 0.1;
      const lean = opts?.lean ?? 0;
      g.position.set(x, terrain.heightAt(x, z) - settle, z);
      g.rotation.set(-fallen * 1.3 - lean, yaw, 0);
      const squash = 1 - fallen * 0.5;
      g.scale.set(1, squash, 1);
      g.updateMatrix();
      spearMesh?.setMatrixAt(kitIndex, g.matrix);
      shieldMesh?.setMatrixAt(kitIndex, g.matrix);
      const spearFlip = opts?.spearFlip ?? 0;
      if (spearFlip !== 0 && spearMesh) {
        const flip = new THREE.Object3D();
        flip.position.copy(g.position);
        flip.rotation.set(-fallen * 1.3 - lean + spearFlip * Math.PI, yaw, 0);
        flip.scale.copy(g.scale);
        flip.updateMatrix();
        spearMesh.setMatrixAt(kitIndex, flip.matrix);
      }
    };

    const abner = abnerPose(t);
    apply(abnerRef, 0, abner.x, abner.z, abner.yaw, 0, { spearFlip: abner.strike });

    const joab = joabPose(t);
    const trumpet = joabTrumpetGesture(t);
    apply(joabRef, 1, joab.x, joab.z, joab.yaw, 0, { lean: trumpet * 0.3 });

    const abishai = abishaiPose(t);
    apply(abishaiRef, 2, abishai.x, abishai.z, abishai.yaw, 0);

    const asahel = asahelPose(t, violenceMode);
    apply(asahelRef, 3, asahel.x, asahel.z, asahel.yaw, asahel.fallen);

    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={asahelRef}>
        <mesh geometry={asahelGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, PRINCIPAL_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, PRINCIPAL_COUNT]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
