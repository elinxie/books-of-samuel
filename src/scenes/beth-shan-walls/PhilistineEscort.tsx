import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildCrowdLimbedGeometry, type CharacterParams } from '../../engine/characters';
import {
  buildShieldGeometry,
  buildStraightSwordGeometry,
  CROWD_KIT_STATURE,
} from '../gilboa-battle/kitMeshes';
import { ESCORT_GATE_SLOTS, VALLEY_ROAD_CURVE } from './layout';
import {
  clamp01,
  escortWithdrawProgress,
  lerp,
  messengerDepartProgress,
  processionArrivalProgress,
  smoothstep,
  T_MESSENGERS,
} from './poses';

/**
 * The Philistine detachment/escort (claim-philistine-kit reused, including
 * its headdress dispute discipline — no headdress instances here, since no
 * kit-differentiated principal is staged at Beth-shan): appears far off on
 * the valley road at b-next-day, arrives at the gate by b-procession, a
 * small messenger subset departs at b-messengers, and the remainder
 * withdraws before the night retrieval — the text narrates no guard presence
 * at the wall that night, and none is staged.
 */

const GENERIC_PHILISTINE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: '#8f8a72', beltColor: '#5a3722', headwear: 'bare' },
};

interface EscortFigure {
  rank: number;
  lane: number;
  isMessenger: boolean;
  slot: [number, number];
  color: THREE.Color;
}

export function buildEscortFigures(count: number, seed = 65701): EscortFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const messengerCount = Math.min(3, Math.max(1, Math.round(count * 0.24)));
  const out: EscortFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      rank: Math.floor(i / 2) + 1,
      lane: (i % 2 === 0 ? -1 : 1) * (0.7 + rng() * 0.3),
      isMessenger: i < messengerCount,
      slot: ESCORT_GATE_SLOTS[i % ESCORT_GATE_SLOTS.length],
      color: color.clone(),
    });
  }
  return out;
}

export interface EscortPose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

const RANK_DELAY = 0.35; // seconds of stagger per rank

/** Position/visibility for one escort figure at scene time t. Exported for
 * unit tests (reenactment.test.ts). */
export function escortPose(t: number, fig: EscortFigure): EscortPose {
  const rankT = t - fig.rank * RANK_DELAY;

  if (fig.isMessenger && t >= T_MESSENGERS) {
    // Departs back down the valley road, retracing the approach.
    const depart = messengerDepartProgress(t);
    const u = clamp01(1 - depart);
    const pos = VALLEY_ROAD_CURVE.getPointAt(u);
    const tan = VALLEY_ROAD_CURVE.getTangentAt(u);
    const blend = smoothstep(depart / 0.06);
    const x = lerp(fig.slot[0], pos.x + fig.lane, blend);
    const z = lerp(fig.slot[1], pos.z, blend);
    return { x, z, yaw: Math.atan2(-tan.x, -tan.z), visible: depart < 1 };
  }

  if (!fig.isMessenger) {
    const withdraw = escortWithdrawProgress(t);
    if (withdraw > 0) {
      const u = clamp01(1 - withdraw);
      const pos = VALLEY_ROAD_CURVE.getPointAt(u);
      const tan = VALLEY_ROAD_CURVE.getTangentAt(u);
      const blend = smoothstep(withdraw / 0.06);
      const x = lerp(fig.slot[0], pos.x + fig.lane, blend);
      const z = lerp(fig.slot[1], pos.z, blend);
      return { x, z, yaw: Math.atan2(-tan.x, -tan.z), visible: withdraw < 1 };
    }
  }

  const arrival = processionArrivalProgress(rankT);
  if (arrival >= 1) {
    return { x: fig.slot[0], z: fig.slot[1], yaw: 0, visible: true };
  }
  const u = clamp01(arrival * 0.94);
  const pos = VALLEY_ROAD_CURVE.getPointAt(u);
  const tan = VALLEY_ROAD_CURVE.getTangentAt(u);
  return {
    x: pos.x + fig.lane,
    z: pos.z,
    yaw: Math.atan2(tan.x, tan.z),
    visible: rankT > -8,
  };
}

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function PhilistineEscort({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PHILISTINE_PARAMS), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'), []);
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);
  const figures = useMemo(() => buildEscortFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = escortPose(t, fig);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        shieldMesh?.setMatrixAt(i, HIDDEN);
        swordMesh?.setMatrixAt(i, HIDDEN);
        continue;
      }
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.97);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
      swordMesh?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6e5c3d" roughness={0.8} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.55} metalness={0.35} />
      </instancedMesh>
    </group>
  );
}
