import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abishaiGatePose, abnerGatePose, davidGatePose, joabPose } from './poses';

/**
 * David, Joab, Abner, and Abishai (`claim-joab-return-protest`,
 * `claim-abner-killing`, `claim-david-disavowal`, `claim-abner-funeral`) —
 * principal-detail rigs (ADR-010), posed as rigid groups via the pure pose
 * functions in `./poses.ts`, never bone-driven skeletal animation. Dress
 * params are kept identical to gibeon-pool's/hebron-covenant's own principal
 * params for the same characters — the same Abner, Joab, and Abishai the
 * observer has already seen, deliberately recognizable across scenes.
 *
 * Joab is the one figure with a second, mourning-dress geometry
 * (`claim-mourning-dress`, reused from ziklag-lament): a discrete crossfade
 * between his ordinary dress and a muted, sackcloth-toned tunic once the
 * mourning command lands (3:31) — the same double-mesh, cross-faded-by-
 * visibility device gibeon-pool uses for Abner's reversed spear grip, not a
 * literal cloth-tearing animation.
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

const JOAB_MOURNING_PARAMS: CharacterParams = {
  ...JOAB_PARAMS,
  dress: { tunicColor: '#6e6252', beltColor: '#4a3a26', headwear: 'bare' },
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
  const joabMourningGeo = useRigGeometry(JOAB_MOURNING_PARAMS);
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);

  const davidRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const joabNormalMeshRef = useRef<THREE.Mesh>(null);
  const joabMourningMeshRef = useRef<THREE.Mesh>(null);
  const abnerRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const david = davidRef.current;
    if (david) {
      const d = davidGatePose(t);
      david.position.set(d.x, terrain.heightAt(d.x, d.z), d.z);
      david.rotation.set(-d.grieve * 0.28, d.yaw, 0);
    }

    const joab = joabRef.current;
    if (joab) {
      const j = joabPose(t, violenceMode);
      joab.position.set(j.x, terrain.heightAt(j.x, j.z), j.z);
      // The drawing-aside lean and the (standard-only) strike lean are both
      // small, orientation-only forward tilts — never a weapon gesture, per
      // the brief's ADR-009 note that the aside itself is the one specific
      // detail shown as gesture here.
      joab.rotation.set(-(j.leadGesture * 0.16 + j.strikeLean * 0.22), j.yaw, 0);
      if (joabNormalMeshRef.current) joabNormalMeshRef.current.visible = j.mourning < 0.5;
      if (joabMourningMeshRef.current) joabMourningMeshRef.current.visible = j.mourning >= 0.5;
    }

    const abner = abnerRef.current;
    if (abner) {
      const a = abnerGatePose(t, violenceMode);
      abner.visible = a.visible;
      const settle = a.fallen * 0.12;
      abner.position.set(a.x, terrain.heightAt(a.x, a.z) - settle, a.z);
      abner.rotation.set(-a.fallen * 1.3, a.yaw, 0);
      const squash = 1 - a.fallen * 0.5;
      abner.scale.set(1, squash, 1);
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const ab = abishaiGatePose(t);
      abishai.visible = ab.visible;
      abishai.position.set(ab.x, terrain.heightAt(ab.x, ab.z), ab.z);
      abishai.rotation.set(0, ab.yaw, 0);
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
        <mesh ref={joabMourningMeshRef} geometry={joabMourningGeo} castShadow={shadows}>
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
