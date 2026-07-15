import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { RETRIEVAL_ARRIVAL_SLOTS, WADI_PATH_CURVE } from './layout';
import { clamp01, smoothstep, T_RECEIVED } from './poses';

/**
 * The men of Jabesh (men-of-jabesh, claim-jabesh-retrieval, claim-night-march):
 * ~10-12 figures who climb the wadi path by torchlight and arrive at the
 * village edge by dawn. No named leader is singled out — leadership reads
 * only by a slight stagger/lead position in the column (the brief's
 * "leadership reads by staging only"). Once arrived, they settle into the
 * town's population and are not tracked individually for the rest of the
 * scene (the caption at b-received carries the reception, not further
 * per-figure choreography).
 */

const GENERIC_JABESH_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[2],
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

export interface ColumnFigure {
  laneOffset: number;
  arrivalStagger: number;
  arrivalSlot: [number, number];
  hasTorch: boolean;
  color: THREE.Color;
}

export function buildColumnFigures(count: number, seed = 71401): ColumnFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: ColumnFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.1);
    out.push({
      laneOffset: (rng() - 0.5) * 3.2,
      // A slight lead/stagger reads as who is out front, without naming anyone.
      arrivalStagger: i === 0 ? 0 : rng() * 3.5,
      arrivalSlot: RETRIEVAL_ARRIVAL_SLOTS[i % RETRIEVAL_ARRIVAL_SLOTS.length],
      hasTorch: i % 2 === 0,
      color: color.clone(),
    });
  }
  return out;
}

export interface ColumnPose {
  x: number;
  z: number;
  yaw: number;
  visible: boolean;
}

/** Position/orientation for one man of Jabesh at scene time t. Exported for
 * unit tests (reenactment.test.ts). */
export function columnFigurePose(t: number, fig: ColumnFigure): ColumnPose {
  const arriveAt = T_RECEIVED + fig.arrivalStagger;
  if (t >= arriveAt) {
    const [sx, sz] = fig.arrivalSlot;
    return { x: sx, z: sz, yaw: 0, visible: true };
  }
  const u = clamp01(smoothstep(t / arriveAt));
  const pos = WADI_PATH_CURVE.getPointAt(u);
  const tan = WADI_PATH_CURVE.getTangentAt(Math.max(0.001, u));
  return { x: pos.x + fig.laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z), visible: true };
}

const dummy = new THREE.Object3D();

export function RetrievalColumn({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_JABESH_PARAMS), []);
  const figures = useMemo(() => buildColumnFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = columnFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.97);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
