import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, jointPositions, type CharacterParams } from '../../engine/characters';
import { AMMAH_HILL_CENTER, JUDAH_BANK_CENTER } from './layout';
import {
  abnerPose,
  asahelPose,
  lerp,
  pursuerPrincipalPose,
  T_ABNER_PLEA,
  T_JOAB_HALTS,
  yawToward,
} from './poses';
import { buildSpearGeometryAtGrip } from './kitMeshes';

/**
 * The scene's five named principals (Abner, Ish-bosheth, Joab, Abishai,
 * Asahel — brief's "Scale assumptions": not counted against the crowd
 * totals). Ish-bosheth is referenced only (2:8-10), not staged here — he
 * does not appear at Gibeon in the text. Principal-detail rigs per ADR-010
 * (asset-david-marker family), posed as rigid groups via the pure pose
 * functions in ./poses.ts (ADR-007) — no bone-driven skeletal animation.
 *
 * Abner's spear is the one animated exception to the "static attachment"
 * convention: it rotates continuously about his grip point from a forward
 * to a reversed hold (`buildSpearGeometryAtGrip`, wrapped in a group at the
 * grip position) — the text's one specific, legible, non-graphic detail for
 * the death of Asahel (2:23), never a penetration or wound transform.
 */

const ABNER_PARAMS: CharacterParams = {
  stature: 1.72,
  build: 0.58,
  shoulders: 1.05,
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
  build: 0.55,
  shoulders: 1.02,
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
  dress: { tunicColor: '#8c7c62', beltColor: '#4a3a26', headwear: 'bare' },
};

const ASAHEL_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.4,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'principal',
  dress: { tunicColor: '#9d8358', beltColor: '#4a3a26', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

const JOAB_HILL_FOOT_TARGET: [number, number] = [JUDAH_BANK_CENTER[0], JUDAH_BANK_CENTER[1]];
const ABISHAI_HILL_FOOT_TARGET: [number, number] = [JUDAH_BANK_CENTER[0] + 3, JUDAH_BANK_CENTER[1]];

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const abnerGeo = useRigGeometry(ABNER_PARAMS);
  const joabGeo = useRigGeometry(JOAB_PARAMS);
  const abishaiGeo = useRigGeometry(ABISHAI_PARAMS);
  const asahelGeo = useRigGeometry(ASAHEL_PARAMS);
  const abnerSpearGeo = useMemo(() => buildSpearGeometryAtGrip(ABNER_PARAMS.stature, 'handR'), []);
  const joabSpearGeo = useMemo(() => buildSpearGeometryAtGrip(JOAB_PARAMS.stature, 'handR'), []);
  const abishaiSpearGeo = useMemo(
    () => buildSpearGeometryAtGrip(ABISHAI_PARAMS.stature, 'handR'),
    [],
  );

  const abnerRef = useRef<THREE.Group>(null);
  const abnerSpearRef = useRef<THREE.Group>(null);
  const joabRef = useRef<THREE.Group>(null);
  const joabSpearRef = useRef<THREE.Group>(null);
  const abishaiRef = useRef<THREE.Group>(null);
  const abishaiSpearRef = useRef<THREE.Group>(null);
  const asahelRef = useRef<THREE.Group>(null);

  const abnerGrip = useMemo(() => jointPositions(ABNER_PARAMS.stature).handR, []);
  const joabGrip = useMemo(() => jointPositions(JOAB_PARAMS.stature).handR, []);
  const abishaiGrip = useMemo(() => jointPositions(ABISHAI_PARAMS.stature).handR, []);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    const abner = abnerRef.current;
    if (abner) {
      const p = abnerPose(t, violenceMode);
      const y = terrain.heightAt(p.x, p.z);
      const warnTurn = p.warn * 0.5;
      const pleaLift = -p.plea * 0.22;
      abner.position.set(p.x, y, p.z);
      abner.rotation.set(pleaLift, p.yaw + warnTurn, 0);

      const spear = abnerSpearRef.current;
      if (spear) {
        spear.position.set(p.x + abnerGrip.x, y + abnerGrip.y, p.z + abnerGrip.z);
        // Reversal + a brief thrust extension — a rotation about the grip
        // point only, in the vertical (pitch) plane; the spear never
        // crosses another figure's body (ADR-009).
        const reversalAngle = lerp(0, Math.PI, p.reversedGrip) + p.strike * 0.35;
        spear.rotation.set(reversalAngle, p.yaw + warnTurn, 0);
      }
    }

    const joab = joabRef.current;
    if (joab) {
      const p = pursuerPrincipalPose(t, -1.4, JOAB_HILL_FOOT_TARGET);
      const y = terrain.heightAt(p.x, p.z);
      const halted = t >= T_JOAB_HALTS;
      const facePlea = halted
        ? yawToward(p.x, p.z, AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1])
        : t >= T_ABNER_PLEA
          ? lerp(p.yaw, yawToward(p.x, p.z, AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1]), 0.6)
          : p.yaw;
      joab.position.set(p.x, y, p.z);
      joab.rotation.set(0, facePlea, 0);

      const spear = joabSpearRef.current;
      if (spear) {
        spear.position.set(p.x + joabGrip.x, y + joabGrip.y, p.z + joabGrip.z);
        spear.rotation.set(0, facePlea, 0);
      }
    }

    const abishai = abishaiRef.current;
    if (abishai) {
      const p = pursuerPrincipalPose(t, 1.4, ABISHAI_HILL_FOOT_TARGET);
      const y = terrain.heightAt(p.x, p.z);
      abishai.position.set(p.x, y, p.z);
      abishai.rotation.set(0, p.yaw, 0);

      const spear = abishaiSpearRef.current;
      if (spear) {
        spear.position.set(p.x + abishaiGrip.x, y + abishaiGrip.y, p.z + abishaiGrip.z);
        spear.rotation.set(0, p.yaw, 0);
      }
    }

    const asahel = asahelRef.current;
    if (asahel) {
      const p = asahelPose(t, violenceMode);
      const y = terrain.heightAt(p.x, p.z) - p.fallen * 0.1;
      asahel.position.set(p.x, y, p.z);
      asahel.rotation.set(-p.fallen * 1.3, p.yaw, 0);
      const squash = 1 - p.fallen * 0.5;
      asahel.scale.set(1, squash, 1);
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
        <mesh geometry={abnerSpearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
      </group>
      <group ref={joabRef}>
        <mesh geometry={joabGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={joabSpearRef}>
        <mesh geometry={joabSpearGeo} castShadow={shadows}>
          <meshStandardMaterial color="#7a5a35" roughness={0.9} />
        </mesh>
      </group>
      <group ref={abishaiRef}>
        <mesh geometry={abishaiGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abishaiSpearRef}>
        <mesh geometry={abishaiSpearGeo} castShadow={shadows}>
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
