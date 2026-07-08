import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildCharacterRig, type CharacterParams } from '../../engine/characters';
import { APPROACH_CURVE, CAPTIVE_POS, DAVID_STAGE, EGYPTIAN_WAIT } from './layout';
import { COMPRESS_T, DRIVE_T, lerp, RECOVERY_T, smoothstep, STRIKE_T } from './timing';

/**
 * Named-figure reenactment (ADR-007 §6): David leads the approach, the
 * strike, and the northward column; the Egyptian guide brings the force
 * down and waits at the staging line — the text does not put him in the
 * fight, and after the time-compression card his narrative role is over,
 * so he is not rendered past it (claim-egyptian-servant, claim-strike-timing).
 * Principal-detail rigs posed as rigid groups per ADR-010 (no skeletal
 * animation yet — applyClipPose remains a stub).
 */

const APPROACH_ARRIVE_T = 16;
const FEAST_CLUSTER: [number, number] = [5, 25]; // David's strike target
const CHARGE_SPEED = 6.0;
const DRIVE_SPEED = 3.2;

interface Pose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

const tmpVec = new THREE.Vector3();

function approachPose(t: number, lead: number): Pose {
  const u = smoothstep(Math.min(t + lead, APPROACH_ARRIVE_T) / APPROACH_ARRIVE_T);
  APPROACH_CURVE.getPointAt(Math.max(u, 0.001), tmpVec);
  const tan = APPROACH_CURVE.getTangentAt(Math.max(u, 0.001));
  return { x: tmpVec.x, z: tmpVec.z, yaw: Math.atan2(tan.x, tan.z), visible: true };
}

/** David: leads the column down, the twilight strike, and the drive north. */
export function davidPose(t: number): Pose {
  if (t < APPROACH_ARRIVE_T) return approachPose(t, 1.0);
  if (t < STRIKE_T) {
    return { x: DAVID_STAGE[0], z: DAVID_STAGE[1], yaw: 0, visible: true };
  }
  const chargeDist = Math.hypot(
    FEAST_CLUSTER[0] - DAVID_STAGE[0],
    FEAST_CLUSTER[1] - DAVID_STAGE[1],
  );
  const p = Math.min(1, ((t - STRIKE_T) * CHARGE_SPEED) / chargeDist);
  let x = lerp(DAVID_STAGE[0], FEAST_CLUSTER[0], p);
  let z = lerp(DAVID_STAGE[1], FEAST_CLUSTER[1], p);
  let yaw = Math.atan2(FEAST_CLUSTER[0] - DAVID_STAGE[0], FEAST_CLUSTER[1] - DAVID_STAGE[1]);
  if (t >= RECOVERY_T) {
    const g = smoothstep((t - RECOVERY_T) / 10);
    const gx = CAPTIVE_POS[0] - 5;
    const gz = CAPTIVE_POS[1] - 5;
    x = lerp(FEAST_CLUSTER[0], gx, g);
    z = lerp(FEAST_CLUSTER[1], gz, g);
    yaw = g < 0.98 ? Math.atan2(gx - FEAST_CLUSTER[0], gz - FEAST_CLUSTER[1]) : Math.PI * 0.9;
  }
  if (t >= DRIVE_T) {
    const dt = t - DRIVE_T;
    x = lerp(x, -4, smoothstep(dt / 8));
    z -= dt * DRIVE_SPEED;
    yaw = Math.PI;
  }
  return { x, z, yaw, visible: true };
}

/** The Egyptian: guides the approach, waits out the fight at the staging line. */
export function egyptianPose(t: number): Pose {
  if (t >= COMPRESS_T) return { x: 0, z: 0, yaw: 0, visible: false };
  if (t < APPROACH_ARRIVE_T) return approachPose(t, 2.2);
  const settle = smoothstep((t - APPROACH_ARRIVE_T) / 4);
  return {
    x: lerp(0, EGYPTIAN_WAIT[0], settle),
    z: lerp(-70, EGYPTIAN_WAIT[1], settle),
    yaw: 0.3,
    visible: true,
  };
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
  const egyptianGeo = useRigGeometry(EGYPTIAN_PARAMS);
  const davidRef = useRef<THREE.Group>(null);
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
      g.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      g.rotation.set(0, pose.yaw, 0);
    };
    apply(davidRef, davidPose(t));
    apply(egyptianRef, egyptianPose(t));
  });

  return (
    <group>
      <group ref={davidRef}>
        <mesh geometry={davidGeo} castShadow={shadows}>
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
