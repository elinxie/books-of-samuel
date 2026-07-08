import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { LAAGER_SLOTS, NORTH_CURVE, REUNION_POS, SOUTH_CURVE } from './layout';

/**
 * Scripted reenactment of 1 Samuel 30:9–10, 21 for the crowd (~1:10 of the
 * narrated six hundred, split two hundred/four hundred — see
 * claim-600-men, claim-two-hundred-stay). Pure pose functions per ADR-007;
 * beat times below are derived from scenes.ts's besor-crossing beats.
 */

const HEAD_START = 20; // meters from the ford at t=0
const MARCH_SPEED = 3.4;
const DEPART_SPEED = 8;
const RANK_SPACING = 1.3;
const CLUSTER_U = 0.42; // south-curve fraction where the four hundred wait
const EXIT_U = 0.9;
const RETURN_START_U = 0.32;
const DEPART_SOUTH_T = 108; // scenes.ts b-depart-south
const RETURN_T = 122; // scenes.ts b-return (explicit time-skip)
const SPOIL_T = 136; // scenes.ts b-spoil-ruling

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}
function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export interface CrowdFigureState {
  rank: number;
  group: 'stay' | 'cross';
  lane: number;
  slot: [number, number];
  clusterJitter: [number, number];
  reunionJitter: [number, number];
  bobPhase: number;
}

const tmpVec = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

export interface CrowdPose {
  x: number;
  z: number;
  yaw: number;
  kneel: number;
  moving: boolean;
  visible: boolean;
}

/** Position/yaw/rest-pose for one crowd figure at scene time t. Exported for unit tests. */
export function crowdFigurePose(
  t: number,
  fig: CrowdFigureState,
  northLen: number,
  southLen: number,
): CrowdPose {
  const arrivalT = (HEAD_START + fig.rank * RANK_SPACING) / MARCH_SPEED;

  if (fig.group === 'stay') {
    if (t < arrivalT) {
      const s = northLen - (arrivalT - t) * MARCH_SPEED;
      const u = clamp01(s / northLen);
      NORTH_CURVE.getPointAt(u, tmpVec);
      NORTH_CURVE.getTangentAt(Math.max(u, 0.001), tmpTan);
      const yaw = Math.atan2(tmpTan.x, tmpTan.z);
      const px = Math.cos(yaw) * fig.lane;
      const pz = -Math.sin(yaw) * fig.lane;
      return { x: tmpVec.x + px, z: tmpVec.z + pz, yaw, kneel: 0, moving: true, visible: s > -5 };
    }

    NORTH_CURVE.getPointAt(1, tmpVec);
    const fromX = tmpVec.x;
    const fromZ = tmpVec.z;
    const [slotX, slotZ] = fig.slot;
    const dist = Math.hypot(slotX - fromX, slotZ - fromZ) || 1;
    const fan = Math.min(((t - arrivalT) * MARCH_SPEED) / dist, 1);
    const settled = fan >= 1;
    let kneel = settled ? smoothstep((t - arrivalT - dist / MARCH_SPEED - 2) / 2.5) : 0;

    if (t >= RETURN_T) {
      const rb = smoothstep((t - RETURN_T) / (SPOIL_T - RETURN_T));
      const [jx, jz] = fig.reunionJitter;
      const tx = REUNION_POS[0] + jx;
      const tz = REUNION_POS[1] + jz;
      const x = slotX + (tx - slotX) * rb;
      const z = slotZ + (tz - slotZ) * rb;
      kneel *= 1 - rb;
      const yaw = rb > 0.02 && rb < 0.98 ? Math.atan2(tx - slotX, tz - slotZ) : 0;
      return { x, z, yaw, kneel, moving: rb > 0.01 && rb < 0.99, visible: true };
    }

    const x = fromX + (slotX - fromX) * fan;
    const z = fromZ + (slotZ - fromZ) * fan;
    const yaw = settled ? 0 : Math.atan2(slotX - fromX, slotZ - fromZ);
    return { x, z, yaw, kneel, moving: !settled, visible: true };
  }

  // Cross group (the four hundred)
  if (t >= RETURN_T) {
    const rb = smoothstep((t - RETURN_T) / (SPOIL_T - RETURN_T));
    const u = RETURN_START_U * (1 - rb);
    SOUTH_CURVE.getPointAt(u, tmpVec);
    SOUTH_CURVE.getTangentAt(Math.max(u, 0.001), tmpTan);
    let x = tmpVec.x;
    let z = tmpVec.z;
    const yaw = Math.atan2(-tmpTan.x, -tmpTan.z);
    if (t >= SPOIL_T) {
      const settle = smoothstep((t - SPOIL_T) / 6);
      const [jx, jz] = fig.reunionJitter;
      x = tmpVec.x + (REUNION_POS[0] + jx - tmpVec.x) * settle;
      z = tmpVec.z + (REUNION_POS[1] + jz - tmpVec.z) * settle;
    }
    return { x, z, yaw, kneel: 0, moving: true, visible: true };
  }

  if (t < arrivalT) {
    const s = northLen - (arrivalT - t) * MARCH_SPEED;
    const u = clamp01(s / northLen);
    NORTH_CURVE.getPointAt(u, tmpVec);
    NORTH_CURVE.getTangentAt(Math.max(u, 0.001), tmpTan);
    const yaw = Math.atan2(tmpTan.x, tmpTan.z);
    const px = Math.cos(yaw) * fig.lane;
    const pz = -Math.sin(yaw) * fig.lane;
    return { x: tmpVec.x + px, z: tmpVec.z + pz, yaw, kneel: 0, moving: true, visible: s > -5 };
  }

  const elapsed = t - arrivalT;
  let uEff: number;
  let waiting: boolean;
  if (t < DEPART_SOUTH_T) {
    uEff = Math.min((elapsed * MARCH_SPEED) / southLen, CLUSTER_U);
    waiting = uEff >= CLUSTER_U - 0.001;
  } else {
    const resume = CLUSTER_U + ((t - DEPART_SOUTH_T) * DEPART_SPEED) / southLen;
    uEff = Math.min(Math.max((elapsed * MARCH_SPEED) / southLen, resume), 1);
    waiting = false;
  }
  if (uEff >= EXIT_U) {
    return { x: 0, z: 0, yaw: 0, kneel: 0, moving: false, visible: false };
  }
  SOUTH_CURVE.getPointAt(uEff, tmpVec);
  SOUTH_CURVE.getTangentAt(Math.max(uEff, 0.001), tmpTan);
  const yaw = Math.atan2(tmpTan.x, tmpTan.z);
  let x = tmpVec.x;
  let z = tmpVec.z;
  if (waiting) {
    const [jx, jz] = fig.clusterJitter;
    x += jx;
    z += jz;
  } else {
    x += Math.cos(yaw) * fig.lane;
    z += -Math.sin(yaw) * fig.lane;
  }
  return { x, z, yaw, kneel: 0, moving: !waiting, visible: true };
}

function makeFigureGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 1.0, 4, 8);
  body.translate(0, 0.86, 0);
  const head = new THREE.SphereGeometry(0.15, 8, 6);
  head.translate(0, 1.68, 0);
  const merged = mergeGeometries([body, head]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();

export function Crossing({ figureCount, shadows }: { figureCount: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const stayCount = Math.max(1, Math.round(figureCount / 3));
  const crossCount = Math.max(1, figureCount - stayCount);
  const total = stayCount + crossCount;

  const figures = useMemo<CrowdFigureState[]>(() => {
    const rng = mulberry32(7300);
    const out: CrowdFigureState[] = [];
    for (let i = 0; i < stayCount; i++) {
      out.push({
        rank: i + 1,
        group: 'stay',
        lane: (i % 2 === 0 ? -1 : 1) * (0.8 + rng() * 0.3),
        slot: LAAGER_SLOTS[i % LAAGER_SLOTS.length],
        clusterJitter: [0, 0],
        reunionJitter: [(rng() - 0.5) * 12, (rng() - 0.5) * 10],
        bobPhase: rng() * Math.PI * 2,
      });
    }
    for (let i = 0; i < crossCount; i++) {
      out.push({
        rank: i + 1,
        group: 'cross',
        lane: (i % 2 === 0 ? -1 : 1) * (0.8 + rng() * 0.3),
        slot: [0, 0],
        clusterJitter: [(rng() - 0.5) * 22, (rng() - 0.5) * 18],
        reunionJitter: [(rng() - 0.5) * 12, (rng() - 0.5) * 10],
        bobPhase: rng() * Math.PI * 2,
      });
    }
    return out;
  }, [stayCount, crossCount]);

  const lengths = useMemo(
    () => ({ north: NORTH_CURVE.getLength(), south: SOUTH_CURVE.getLength() }),
    [],
  );

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(7301);
    const color = new THREE.Color();
    for (let i = 0; i < total; i++) {
      color.set(TUNIC_PALETTE[Math.floor(rng() * TUNIC_PALETTE.length)]);
      color.offsetHSL(0, 0, (rng() - 0.5) * 0.08);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [total]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = crowdFigurePose(t, fig, lengths.north, lengths.south);
      if (!pose.visible) {
        dummy.position.set(0, -50, 0);
        dummy.scale.setScalar(0.001);
      } else {
        const y = terrain.heightAt(pose.x, pose.z);
        const bob = pose.moving ? Math.abs(Math.sin(t * 4.2 + fig.bobPhase)) * 0.07 : 0;
        dummy.position.set(pose.x, y + bob, pose.z);
        const kneelScale = 1 - pose.kneel * 0.4;
        dummy.scale.set(0.95, 0.95 * kneelScale, 0.95);
        dummy.rotation.set(pose.kneel * 0.35, pose.yaw, 0);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, total]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
