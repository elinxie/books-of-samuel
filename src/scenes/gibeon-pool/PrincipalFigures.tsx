import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { abishaiPose, abnerPose, asahelPose, joabPose } from './poses';
import { buildHornGeometry, buildSpearGeometry } from './kitMeshes';

/**
 * The four named principals (claim-mahanaim-installation,
 * claim-champions-contest, claim-gibeon-battle, claim-asahel-pursuit-death,
 * claim-ammah-standoff): Abner, Joab, Abishai, and Asahel. Ish-bosheth is
 * deliberately absent — he is referenced only (2:8-10), never staged at
 * Gibeon (brief's hard "not allowed" list).
 *
 * Principal-detail rigs per ADR-010 (asset-david-marker), posed as rigid
 * groups whose transform is driven entirely by the pure pose functions in
 * `./poses.ts` — position/orientation/collapse changes only, never wound
 * geometry, in either violence mode (ADR-009). Asahel's death is this
 * project's first named-character-kills-named-character rendering: the
 * camera does not move in for the strike, and the only weapon-specific
 * gesture shown is Abner's spear-grip reversal (`AbnerPose.reversedGrip`) —
 * a rotation of the held prop (a plain child of Abner's own group, so it
 * inherits his position/orientation automatically) never a penetration mesh.
 */

const PRINCIPAL_KIT_STATURE = 1.72;

const ABNER_PARAMS: CharacterParams = {
  stature: 1.76,
  build: 0.6,
  shoulders: 1.06,
  skinColor: '#8f5b3d',
  hairColor: '#241a12',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#6d5138',
    cloakColor: '#4a3a2a',
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#c7b98c',
  },
};

const JOAB_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.55,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#7a5a35', beltColor: '#3b2416', headwear: 'bare' },
};

const ABISHAI_PARAMS: CharacterParams = {
  stature: 1.69,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
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
  dress: { tunicColor: '#b69b6d', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);
  const spearGeo = useMemo(() => buildSpearGeometry(PRINCIPAL_KIT_STATURE, 'handR'), []);
  const hornGeo = useMemo(() => buildHornGeometry(PRINCIPAL_KIT_STATURE), []);

  const abnerRef = useRef<THREE.Group>(null);
  const abnerSpearRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const hornRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const place = (
      ref: React.RefObject<THREE.Group | null>,
      x: number,
      z: number,
      yaw: number,
      fallen: number,
      lean = 0,
    ) => {
      const g = ref.current;
      if (!g) return;
      const settle = fallen * 0.12;
      g.position.set(x, terrain.heightAt(x, z) - settle, z);
      g.rotation.set(lean - fallen * 1.35, yaw, 0);
      const squash = 1 - fallen * 0.55;
      g.scale.set(1, squash, 1);
    };

    const abner = abnerPose(t);
    place(abnerRef, abner.x, abner.z, abner.yaw, 0, abner.plea * 0.15);
    // The reversed spear-grip gesture (2:23): the held prop rotates about
    // Abner's own frame as the grip envelope ramps up at the strike — a
    // gesture/orientation change on the existing prop, never a new
    // penetration mesh or a second body pose.
    if (abnerSpearRef.current)
      abnerSpearRef.current.rotation.z = abner.reversedGrip * Math.PI * 0.7;

    const joab = joabPose(t);
    place(joabRef, joab.x, joab.z, joab.yaw, 0);
    if (hornRef.current) {
      const s = joab.trumpet;
      hornRef.current.visible = s > 0.02;
      hornRef.current.scale.setScalar(0.7 + s * 0.5);
    }

    const abishai = abishaiPose(t);
    place(abishaiRef, abishai.x, abishai.z, abishai.yaw, 0);

    const asahel = asahelPose(t, violenceMode);
    place(asahelRef, asahel.x, asahel.z, asahel.yaw, asahel.fallen);
  });

  return (
    <group>
      <group ref={abnerRef}>
        <mesh geometry={abnerGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <group ref={abnerSpearRef}>
          <mesh geometry={spearGeo} castShadow={shadows}>
            <meshStandardMaterial color="#7a5a35" roughness={0.9} />
          </mesh>
        </group>
      </group>
      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
        <mesh geometry={spearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
        <group ref={hornRef}>
          <mesh geometry={hornGeo} castShadow={shadows}>
            <meshStandardMaterial color="#c9a86a" roughness={0.7} />
          </mesh>
        </group>
      </group>
      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
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
