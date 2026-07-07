import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { terrainHeight } from '../../engine/terrain';
import { mulberry32 } from '../../engine/noise';
import { APPROACH_CURVE, EXIT_CURVE, PLAZA_SLOTS } from './layout';

/**
 * Scripted reenactment of 1 Samuel 30:1–9: the column returns from the north,
 * gathers on the open center, grieves, and finally departs south toward the
 * Besor. Figures are placeholder capsules rendered at ~1:10 of the narrated
 * six hundred (see claim-600-men, asset-figure-capsule).
 *
 * Timeline constants are derived from the beats in scenes.ts.
 */

const MARCH_SPEED = 2.2; // m/s, urgent pace
const EXIT_SPEED = 2.6;
const HEAD_START_DIST = 100; // meters from column head to plaza at t=0
const RANK_SPACING = 2.0;
const GRIEF_T = 57;
const STAND_T = 132;
const DEPART_T = 136;

const WOOL_PALETTE = [
  '#8a7a62',
  '#6f5b43',
  '#7d6a52',
  '#9c8a6c',
  '#5f5142',
  '#7a4a3a',
  '#54504a',
  '#8f8168',
];

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
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

interface FigureState {
  rank: number;
  lane: number;
  laneOffset: number;
  slot: [number, number];
  kneeler: boolean;
  bobPhase: number;
}

const dummy = new THREE.Object3D();
const tmpVec = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

/** Position/yaw/pose for one figure at scene time t. Exported for unit tests. */
export function figurePose(
  t: number,
  fig: FigureState,
  curveLen: number,
  exitLen: number,
): { x: number; z: number; yaw: number; kneel: number; moving: boolean; visible: boolean } {
  const sHead = curveLen - HEAD_START_DIST + t * MARCH_SPEED;
  const s = sHead - fig.rank * RANK_SPACING;
  const arrivalT = (HEAD_START_DIST + fig.rank * RANK_SPACING) / MARCH_SPEED;

  // Departure south
  const sOut = (t - DEPART_T - fig.rank * 0.8) * EXIT_SPEED;
  if (t >= DEPART_T && sOut > 0) {
    const u = Math.min(sOut / exitLen, 1);
    EXIT_CURVE.getPointAt(u, tmpVec);
    EXIT_CURVE.getTangentAt(u, tmpTan);
    let x = tmpVec.x + fig.laneOffset;
    let z = tmpVec.z;
    // Blend out of the plaza slot over the first meters.
    if (sOut < 8) {
      const b = smoothstep(sOut / 8);
      x = fig.slot[0] + (x - fig.slot[0]) * b;
      z = fig.slot[1] + (z - fig.slot[1]) * b;
    }
    return { x, z, yaw: Math.atan2(tmpTan.x, tmpTan.z), kneel: 0, moving: true, visible: true };
  }

  if (t >= arrivalT) {
    // Fan out from the curve end to the assigned slot at marching speed.
    APPROACH_CURVE.getPointAt(1, tmpVec);
    const dx = fig.slot[0] - tmpVec.x;
    const dz = fig.slot[1] - tmpVec.z;
    const dist = Math.hypot(dx, dz) || 1;
    const fan = Math.min(((t - arrivalT) * MARCH_SPEED) / dist, 1);
    const x = tmpVec.x + dx * fan;
    const z = tmpVec.z + dz * fan;
    const settled = fan >= 1;
    // Grieving pose: kneel/slump between GRIEF_T and STAND_T once settled.
    let kneel = 0;
    if (settled) {
      const kneelStart = Math.max(GRIEF_T, arrivalT + dist / MARCH_SPEED + 2);
      kneel = smoothstep((t - kneelStart) / 2.5) * (1 - smoothstep((t - STAND_T) / 2));
    }
    const yaw = settled ? Math.atan2(-x, -(z + 6)) : Math.atan2(dx, dz);
    return { x, z, yaw, kneel, moving: !settled, visible: true };
  }

  // Marching along the approach curve, two abreast.
  const u = Math.min(Math.max(s / curveLen, 0), 1);
  APPROACH_CURVE.getPointAt(u, tmpVec);
  APPROACH_CURVE.getTangentAt(u, tmpTan);
  const yaw = Math.atan2(tmpTan.x, tmpTan.z);
  // Perpendicular lane offset
  const px = Math.cos(yaw) * fig.lane;
  const pz = -Math.sin(yaw) * fig.lane;
  return { x: tmpVec.x + px, z: tmpVec.z + pz, yaw, kneel: 0, moving: true, visible: s > 0 };
}

export function ReturningMen({ figureCount, shadows }: { figureCount: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const davidRef = useRef<THREE.Group>(null);
  const abiatharRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => makeFigureGeometry(), []);
  const figures = useMemo<FigureState[]>(() => {
    const rng = mulberry32(1030);
    return Array.from({ length: figureCount }, (_, i) => ({
      rank: Math.floor(i / 2) + 1,
      lane: (i % 2 === 0 ? -1 : 1) * (0.8 + rng() * 0.3),
      laneOffset: (rng() - 0.5) * 2.4,
      slot: PLAZA_SLOTS[(i + 2) % PLAZA_SLOTS.length],
      kneeler: i % 3 === 0,
      bobPhase: rng() * Math.PI * 2,
    }));
  }, [figureCount]);

  const lengths = useMemo(
    () => ({ curve: APPROACH_CURVE.getLength(), exit: EXIT_CURVE.getLength() }),
    [],
  );

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(808);
    const color = new THREE.Color();
    for (let i = 0; i < figureCount; i++) {
      color.set(WOOL_PALETTE[Math.floor(rng() * WOOL_PALETTE.length)]);
      color.offsetHSL(0, 0, (rng() - 0.5) * 0.06);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [figureCount]);

  useFrame(() => {
    const t = useAppStore.getState().timeSec;
    const mesh = meshRef.current;
    if (mesh) {
      for (let i = 0; i < figures.length; i++) {
        const fig = figures[i];
        const pose = figurePose(t, fig, lengths.curve, lengths.exit);
        if (!pose.visible) {
          dummy.position.set(0, -50, 0);
          dummy.scale.setScalar(0.001);
        } else {
          const y = terrainHeight(pose.x, pose.z);
          const bob = pose.moving ? Math.abs(Math.sin(t * 4.5 + fig.bobPhase)) * 0.07 : 0;
          dummy.position.set(pose.x, y + bob, pose.z);
          const kneelScale = fig.kneeler ? 1 - pose.kneel * 0.45 : 1 - pose.kneel * 0.12;
          dummy.scale.set(0.95, 0.95 * kneelScale, 0.95);
          dummy.rotation.set(pose.kneel * 0.3, pose.yaw, 0);
        }
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    // David: marches ahead of the column, stands apart at the strengthen beat.
    const david = davidRef.current;
    if (david) {
      const sHead = lengths.curve - HEAD_START_DIST + t * MARCH_SPEED + 6;
      const arrivalT = (HEAD_START_DIST - 6) / MARCH_SPEED;
      let x: number;
      let z: number;
      let yaw: number;
      if (t >= DEPART_T - 1.5) {
        const sOut = (t - (DEPART_T - 1.5)) * EXIT_SPEED;
        const u = Math.min(sOut / lengths.exit, 1);
        EXIT_CURVE.getPointAt(u, tmpVec);
        EXIT_CURVE.getTangentAt(u, tmpTan);
        const b = smoothstep(sOut / 8);
        x = 14 + (tmpVec.x - 14) * b;
        z = -1 + (tmpVec.z - -1) * b;
        yaw = Math.atan2(tmpTan.x, tmpTan.z);
      } else if (t >= 105) {
        const f = smoothstep((t - 105) / 5);
        x = 2.5 + (14 - 2.5) * f;
        z = -7 + (-1 - -7) * f;
        yaw = Math.atan2(-x, -z - 40); // facing away, toward the north road
      } else if (t >= arrivalT) {
        const f = smoothstep(((t - arrivalT) * MARCH_SPEED) / 12);
        APPROACH_CURVE.getPointAt(1, tmpVec);
        x = tmpVec.x + (2.5 - tmpVec.x) * f;
        z = tmpVec.z + (-7 - tmpVec.z) * f;
        yaw = Math.atan2(0 - x, -6 - z);
      } else {
        const u = Math.min(Math.max(sHead / lengths.curve, 0), 1);
        APPROACH_CURVE.getPointAt(u, tmpVec);
        APPROACH_CURVE.getTangentAt(u, tmpTan);
        x = tmpVec.x;
        z = tmpVec.z;
        yaw = Math.atan2(tmpTan.x, tmpTan.z);
      }
      const moving = t < arrivalT || t >= DEPART_T - 1.5 || (t >= 105 && t < 110);
      const bob = moving ? Math.abs(Math.sin(t * 4.5)) * 0.07 : 0;
      david.position.set(x, terrainHeight(x, z) + bob, z);
      david.rotation.set(0, yaw, 0);
    }

    // Abiathar: appears in the crowd, brings the ephod to David at the inquiry beat.
    const abiathar = abiatharRef.current;
    if (abiathar) {
      const appear = smoothstep((t - 64) / 2);
      let x = -7;
      let z = 5;
      if (t >= 122) {
        const f = smoothstep((t - 122) / 4);
        x = -7 + (12.4 - -7) * f;
        z = 5 + (0.6 - 5) * f;
      }
      if (t >= DEPART_T + 1.6) {
        const sOut = (t - (DEPART_T + 1.6)) * EXIT_SPEED;
        const u = Math.min(sOut / lengths.exit, 1);
        EXIT_CURVE.getPointAt(u, tmpVec);
        const b = smoothstep(sOut / 8);
        x = 12.4 + (tmpVec.x - 12.4) * b;
        z = 0.6 + (tmpVec.z - 0.6) * b;
      }
      abiathar.position.set(x, terrainHeight(x, z), z);
      abiathar.scale.setScalar(appear * 0.95 + 0.001);
      abiathar.rotation.set(0, Math.atan2(14 - x, -1 - z), 0);
    }
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figureCount]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
      </instancedMesh>

      {/* David — narrative figure, distinguished by cloak tone only */}
      <group ref={davidRef}>
        <mesh geometry={geometry} castShadow={shadows} scale={[1, 1.06, 1]}>
          <meshStandardMaterial color="#7a3b2e" roughness={1} />
        </mesh>
      </group>

      {/* Abiathar the priest — linen tone */}
      <group ref={abiatharRef}>
        <mesh geometry={geometry} castShadow={shadows}>
          <meshStandardMaterial color="#d8d2c0" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
