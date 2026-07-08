import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { EGYPTIAN_POS, FORD_POS, NORTH_CURVE, REUNION_POS, SOUTH_CURVE } from './layout';

/**
 * Named-figure reenactment (ADR-007 §6, "named figures too"): David,
 * Abiathar, and the Egyptian servant, each their own pure pose function.
 * Principal-detail rigs per ADR-010/the besor-crossing brief — posed as
 * rigid groups, not skeletally animated (applyClipPose is still a stub; see
 * asset-david-marker). Beat times below mirror scenes.ts's besor-crossing
 * beats.
 */

const FORD_ARRIVE_T = 6;
const EGYPTIAN_FOUND_T = 58;
const REVIVAL_T = 74;
const OATH_T = 92;
const DEPART_SOUTH_T = 108;
const DEPART_VANISH_T = 120;
const RETURN_T = 122;
const SPOIL_T = 136;

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface Pose {
  x: number;
  z: number;
  yaw: number;
  recline: number;
  visible: boolean;
}

const tmpVec = new THREE.Vector3();

/** Shared column progress (0..1 along the north approach) — David leads it. */
function fordApproach(t: number): { x: number; z: number; yaw: number } {
  const u = smoothstep(t / FORD_ARRIVE_T);
  NORTH_CURVE.getPointAt(Math.max(u, 0.001), tmpVec);
  const tan = NORTH_CURVE.getTangentAt(Math.max(u, 0.001));
  return { x: tmpVec.x, z: tmpVec.z, yaw: Math.atan2(tan.x, tan.z) };
}

/** David: leads the column, present at the Egyptian's revival and oath, delivers the spoil ruling. */
export function davidPose(t: number): Pose {
  const nearEgyptian: [number, number] = [EGYPTIAN_POS[0] - 2.2, EGYPTIAN_POS[1] - 1.4];

  if (t < FORD_ARRIVE_T) {
    const p = fordApproach(t);
    return { x: p.x, z: p.z, yaw: p.yaw, recline: 0, visible: true };
  }
  if (t < EGYPTIAN_FOUND_T) {
    const b = smoothstep((t - FORD_ARRIVE_T) / (EGYPTIAN_FOUND_T - FORD_ARRIVE_T));
    const x = lerp(FORD_POS[0], nearEgyptian[0], b);
    const z = lerp(FORD_POS[1], nearEgyptian[1], b);
    return {
      x,
      z,
      yaw: Math.atan2(nearEgyptian[0] - x, nearEgyptian[1] - z),
      recline: 0,
      visible: true,
    };
  }
  if (t < DEPART_SOUTH_T) {
    return {
      x: nearEgyptian[0],
      z: nearEgyptian[1],
      yaw: Math.atan2(EGYPTIAN_POS[0] - nearEgyptian[0], EGYPTIAN_POS[1] - nearEgyptian[1]),
      recline: 0,
      visible: true,
    };
  }
  if (t < DEPART_VANISH_T) {
    const b = smoothstep((t - DEPART_SOUTH_T) / (DEPART_VANISH_T - DEPART_SOUTH_T));
    SOUTH_CURVE.getPointAt(0.55 + b * 0.1, tmpVec);
    const tan = SOUTH_CURVE.getTangentAt(0.55);
    return { x: tmpVec.x, z: tmpVec.z, yaw: Math.atan2(tan.x, tan.z), recline: 0, visible: true };
  }
  if (t < RETURN_T) {
    return { x: 0, z: 0, yaw: 0, recline: 0, visible: false };
  }
  const rb = smoothstep((t - RETURN_T) / (SPOIL_T - RETURN_T));
  SOUTH_CURVE.getPointAt(0.2 * (1 - rb), tmpVec);
  const x = lerp(tmpVec.x, REUNION_POS[0] - 3, rb);
  const z = lerp(tmpVec.z, REUNION_POS[1] - 3, rb);
  return {
    x,
    z,
    yaw: Math.atan2(REUNION_POS[0] - x, REUNION_POS[1] - z),
    recline: 0,
    visible: true,
  };
}

/** Abiathar: follows David (continuity from Ziklag), a step behind and to the side. */
export function abiatharPose(t: number): Pose {
  const d = davidPose(Math.max(t - 1.4, 0));
  if (!d.visible) return d;
  const px = Math.cos(d.yaw) * 1.6;
  const pz = -Math.sin(d.yaw) * 1.6;
  return { ...d, x: d.x - px, z: d.z - pz };
}

/** The Egyptian: found collapsed, revived, questioned, then guides the column south. */
export function egyptianPose(t: number): Pose {
  if (t < EGYPTIAN_FOUND_T || t >= DEPART_VANISH_T) {
    return { x: EGYPTIAN_POS[0], z: EGYPTIAN_POS[1], yaw: 0, recline: 1, visible: false };
  }
  let recline = 1;
  if (t >= REVIVAL_T && t < REVIVAL_T + 8) {
    recline = 1 - smoothstep((t - REVIVAL_T) / 8) * 0.6;
  } else if (t >= REVIVAL_T + 8 && t < OATH_T) {
    recline = 0.4;
  } else if (t >= OATH_T && t < DEPART_SOUTH_T) {
    recline = 0.4 * (1 - smoothstep((t - OATH_T) / (DEPART_SOUTH_T - OATH_T)));
  } else if (t >= DEPART_SOUTH_T) {
    recline = 0;
  }
  if (t >= DEPART_SOUTH_T) {
    const b = smoothstep((t - DEPART_SOUTH_T) / (DEPART_VANISH_T - DEPART_SOUTH_T));
    SOUTH_CURVE.getPointAt(0.58 + b * 0.12, tmpVec);
    const tan = SOUTH_CURVE.getTangentAt(0.58);
    return { x: tmpVec.x, z: tmpVec.z, yaw: Math.atan2(tan.x, tan.z), recline, visible: true };
  }
  return { x: EGYPTIAN_POS[0], z: EGYPTIAN_POS[1], yaw: 0.4, recline, visible: true };
}

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

const ABIATHAR_PARAMS: CharacterParams = {
  stature: 1.63,
  build: 0.45,
  shoulders: 0.94,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: true,
  detail: 'principal',
  dress: {
    tunicColor: '#d8d2c0',
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const EGYPTIAN_PARAMS: CharacterParams = {
  stature: 1.6,
  build: 0.3,
  shoulders: 0.92,
  skinColor: '#75462f',
  hairColor: '#1f1712',
  beard: true,
  detail: 'principal',
  dress: { tunicColor: '#8a7a62', beltColor: '#3b2416', headwear: 'bare' },
};

function useRigGeometry(params: CharacterParams): THREE.BufferGeometry {
  return useMemo(() => buildCharacterRig(params).geometry, [params]);
}

export function PrincipalFigures({ shadows }: { shadows: boolean }) {
  const davidGeo = useRigGeometry(DAVID_PARAMS);
  const abiatharGeo = useRigGeometry(ABIATHAR_PARAMS);
  const egyptianGeo = useRigGeometry(EGYPTIAN_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
  const abiatharRef = useRef<THREE.Group>(null);
  const egyptianRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const apply = (ref: React.RefObject<THREE.Group | null>, pose: Pose) => {
      const g = ref.current;
      if (!g) return;
      if (!pose.visible) {
        g.visible = false;
        return;
      }
      g.visible = true;
      const y = terrain.heightAt(pose.x, pose.z);
      g.position.set(pose.x, y, pose.z);
      g.rotation.set(-pose.recline * (Math.PI / 2.1), pose.yaw, 0);
      if (pose.recline > 0.5) g.position.y += 0.08;
    };
    apply(davidRef, davidPose(t));
    apply(abiatharRef, abiatharPose(t));
    apply(egyptianRef, egyptianPose(t));
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={abiatharRef}>
        <mesh geometry={abiatharGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
      <group ref={egyptianRef}>
        <mesh geometry={egyptianGeo} castShadow={shadows}>
          <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
