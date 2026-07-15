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
import { NIGHT_WORK_SLOTS, RETRIEVAL_PATH_CURVE } from './layout';
import { clamp01, retrievalStage, smoothstep } from './poses';

/**
 * The men of Jabesh (men-of-jabesh, claim-jabesh-retrieval): ~8–10 figures
 * who walk in from the east brow across the night, work briefly at the
 * wall's foot (the taking-down — kept to an abstract kneel/lift gesture, no
 * rope/nail detail per the brief), then carry the forms home the way they
 * came. No guard fight is narrated or staged; this is the whole of their
 * choreography.
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

export interface RetrievalFigure {
  arrivalDelay: number;
  laneOffset: number;
  workSlot: [number, number];
  color: THREE.Color;
}

export function buildRetrievalFigures(count: number, seed = 65801): RetrievalFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: RetrievalFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.1);
    out.push({
      arrivalDelay: rng() * 4,
      laneOffset: (rng() - 0.5) * 3,
      workSlot: NIGHT_WORK_SLOTS[i % NIGHT_WORK_SLOTS.length],
      color: color.clone(),
    });
  }
  return out;
}

export interface RetrievalPose {
  x: number;
  z: number;
  yaw: number;
  kneel: number;
  visible: boolean;
}

/** Position/gesture for one man of Jabesh at scene time t. Exported for
 * unit tests (reenactment.test.ts). */
export function retrievalPose(t: number, fig: RetrievalFigure): RetrievalPose {
  const stage = retrievalStage(t, fig.arrivalDelay);

  if (stage.phase === 'approach') {
    // Not yet visible until the news has actually reached Jabesh and the
    // party sets out (progress stays at 0 before that point).
    if (stage.progress <= 0.001) return { x: 0, z: 0, yaw: 0, kneel: 0, visible: false };
    const u = clamp01(stage.progress);
    const pos = RETRIEVAL_PATH_CURVE.getPointAt(u);
    const tan = RETRIEVAL_PATH_CURVE.getTangentAt(u);
    return {
      x: pos.x + fig.laneOffset,
      z: pos.z,
      yaw: Math.atan2(tan.x, tan.z),
      kneel: 0,
      visible: true,
    };
  }

  if (stage.phase === 'work') {
    const [sx, sz] = fig.workSlot;
    const kneel = smoothstep(stage.progress / 0.4) * (1 - smoothstep((stage.progress - 0.6) / 0.4));
    return { x: sx, z: sz, yaw: Math.PI, kneel, visible: true };
  }

  if (stage.phase === 'depart') {
    const u = clamp01(1 - stage.progress);
    const pos = RETRIEVAL_PATH_CURVE.getPointAt(u);
    const tan = RETRIEVAL_PATH_CURVE.getTangentAt(u);
    return {
      x: pos.x + fig.laneOffset,
      z: pos.z,
      yaw: Math.atan2(-tan.x, -tan.z),
      kneel: 0,
      visible: true,
    };
  }

  return { x: 0, z: 0, yaw: 0, kneel: 0, visible: false };
}

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function RetrievalParty({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_JABESH_PARAMS), []);
  const figures = useMemo(() => buildRetrievalFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = retrievalPose(t, fig);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
      const y = terrain.heightAt(pose.x, pose.z) - pose.kneel * 0.2;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(pose.kneel * 0.3, pose.yaw, 0);
      const squash = 1 - pose.kneel * 0.2;
      dummy.scale.set(0.97, 0.97 * squash, 0.97);
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
