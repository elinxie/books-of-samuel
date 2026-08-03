import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { HILL_CENTER, PURSUER_BASE_CENTER } from './layout';
import { abnerPrincipalPose, abnerStrikePose, asahelPrincipalPose, joabAbishaiPose } from './poses';
import { buildShieldGeometry, buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Abner, Joab, Abishai, and Asahel (`claim-gibeon-contest`,
 * `claim-asahel-death`, `claim-abner-pursuit-halted`) — principal-detail
 * rigs (ADR-010), posed as rigid groups whose transform is driven entirely
 * by the pure pose functions in `./poses.ts`, never bone-driven skeletal
 * animation. Ish-bosheth is referenced only (2:8-10) and is never staged
 * here, per the brief.
 *
 * Abner's spear is the one deliberately double-modeled kit item: a normal-
 * grip mesh and a reversed-grip mesh (`kitMeshes.ts`'s `reversed` flag),
 * cross-faded by visibility rather than blended, since 2:23's detail is a
 * discrete gesture, not a continuous motion — the text's one specific,
 * legible, non-graphic detail for the strike (ADR-009: no penetration/wound
 * geometry, in either mode).
 */

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

const ASAHEL_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.42,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#c2ad82', beltColor: '#3b2416', headwear: 'bare' },
};

const ABNER_BANK: [number, number] = [0, -20];
const ABNER_SPREAD: [number, number] = [8, -10];

const JOAB_BANK: [number, number] = [0, 20];
const JOAB_SPREAD: [number, number] = [8, 10];
const JOAB_PURSUER_SLOT: [number, number] = [
  PURSUER_BASE_CENTER[0] - 3,
  PURSUER_BASE_CENTER[1] - 2,
];

const ABISHAI_BANK: [number, number] = [4, 24];
const ABISHAI_SPREAD: [number, number] = [12, 14];
const ABISHAI_PURSUER_SLOT: [number, number] = [
  PURSUER_BASE_CENTER[0] + 3,
  PURSUER_BASE_CENTER[1] + 3,
];
const ABISHAI_ARRIVE_OFFSET = 3;

const ASAHEL_BANK: [number, number] = [-4, 18];
const ASAHEL_SPREAD: [number, number] = [4, 8];

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

const PRINCIPAL_KIT_STATURE = CROWD_KIT_STATURE;

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);

  const spearNormalGeo = useMemo(
    () => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR', false),
    [],
  );
  const spearReversedGeo = useMemo(
    () => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR', true),
    [],
  );
  const shieldGeo = useMemo(() => buildShieldGeometry(PRINCIPAL_KIT_STATURE, 'handL'), []);
  const companionSpearGeo = useMemo(() => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR'), []);

  const abnerRef = useRef<THREE.Group>(null);
  const abnerSpearNormalRef = useRef<THREE.Mesh>(null);
  const abnerSpearReversedRef = useRef<THREE.Mesh>(null);
  const joabRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);
  const companionSpearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    const shieldMesh = shieldMeshRef.current;
    const companionSpearMesh = companionSpearMeshRef.current;

    const abner = abnerRef.current;
    if (abner) {
      const pose = abnerPrincipalPose(t, {
        bank: ABNER_BANK,
        spread: ABNER_SPREAD,
        rallySlot: HILL_CENTER,
      });
      const strike = abnerStrikePose(t, violenceMode);
      abner.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      abner.rotation.set(0, pose.yaw + strike.reluctanceTurn * -0.5, 0);
      abner.updateMatrix();
      if (abnerSpearNormalRef.current)
        abnerSpearNormalRef.current.visible = strike.reverseGrip < 0.5;
      if (abnerSpearReversedRef.current)
        abnerSpearReversedRef.current.visible = strike.reverseGrip >= 0.5;
      shieldMesh?.setMatrixAt(0, abner.matrix);
    }

    const joab = joabRef.current;
    if (joab) {
      const pose = joabAbishaiPose(t, {
        bank: JOAB_BANK,
        spread: JOAB_SPREAD,
        pursuerSlot: JOAB_PURSUER_SLOT,
      });
      joab.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      joab.rotation.set(0, pose.yaw, 0);
      joab.updateMatrix();
      companionSpearMesh?.setMatrixAt(0, joab.matrix);
      shieldMesh?.setMatrixAt(1, joab.matrix);
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const pose = joabAbishaiPose(
        t,
        { bank: ABISHAI_BANK, spread: ABISHAI_SPREAD, pursuerSlot: ABISHAI_PURSUER_SLOT },
        ABISHAI_ARRIVE_OFFSET,
      );
      abishai.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      abishai.rotation.set(0, pose.yaw, 0);
      abishai.updateMatrix();
      companionSpearMesh?.setMatrixAt(1, abishai.matrix);
      shieldMesh?.setMatrixAt(2, abishai.matrix);
    }

    const asahel = asahelRef.current;
    if (asahel) {
      const pose = asahelPrincipalPose(t, violenceMode, {
        bank: ASAHEL_BANK,
        spread: ASAHEL_SPREAD,
      });
      const settle = pose.fallen * 0.12;
      asahel.position.set(pose.x, terrain.heightAt(pose.x, pose.z) - settle, pose.z);
      asahel.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      asahel.scale.set(1, squash, 1);
      asahel.updateMatrix();
      companionSpearMesh?.setMatrixAt(2, asahel.matrix);
    }

    if (companionSpearMesh) companionSpearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh ref={abnerSpearNormalRef} geometry={spearNormalGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
        <mesh ref={abnerSpearReversedRef} geometry={spearReversedGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
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
        ref={companionSpearMeshRef}
        args={[companionSpearGeo, undefined, 3]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, 3]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
