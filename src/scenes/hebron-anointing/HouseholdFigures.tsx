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
import { APPROACH_CURVE, HOUSEHOLD_SLOTS } from './layout';
import { clamp01, lerp, smoothstep, T_SETTLING } from './poses';

/**
 * David's men's households — "his men and their households" (2:2-3), a
 * disclosed design-choice headcount of roughly 40-50 figures at high
 * quality tier (mixed adults and children), not a ratio of `claim-600-men`'s
 * six hundred (claim-david-move-hebron). Travels the same highland road as
 * ApproachColumn.tsx, then disperses to the two satellite household-camp
 * clusters ("the towns of Hebron", 2:3b) — a quieter, domestic beat,
 * deliberately distinct from the men's retinue and from the Judah assembly.
 */

const HOUSEHOLD_DISPERSE_DUR = 10;
const CHILD_FRACTION = 0.32;

const ADULT_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.42,
  shoulders: 0.9,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[1],
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

export interface HouseholdFigure {
  laneOffset: number;
  arriveStagger: number;
  destSlot: [number, number];
  isChild: boolean;
  color: THREE.Color;
}

export function buildHouseholdFigures(count: number, seed = 221201): HouseholdFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: HouseholdFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      laneOffset: (rng() - 0.5) * 5,
      arriveStagger: rng() * 4,
      destSlot: HOUSEHOLD_SLOTS[i % HOUSEHOLD_SLOTS.length],
      isChild: rng() < CHILD_FRACTION,
      color: color.clone(),
    });
  }
  return out;
}

export interface HouseholdPose {
  x: number;
  z: number;
  yaw: number;
}

/** Position/orientation for one household figure at scene time `t`: climbs
 * the same approach road as the men, then disperses to a household-camp
 * slot from `T_SETTLING` (2:3b's "settled in the towns of Hebron").
 * Exported for unit tests. */
export function householdFigurePose(t: number, fig: HouseholdFigure): HouseholdPose {
  const arriveAt = T_SETTLING + fig.arriveStagger;
  const curveEnd = APPROACH_CURVE.getPointAt(1);

  if (t < arriveAt) {
    const u = clamp01(smoothstep(t / arriveAt));
    const pos = APPROACH_CURVE.getPointAt(u);
    const tan = APPROACH_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + fig.laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }

  const disperseEnd = arriveAt + HOUSEHOLD_DISPERSE_DUR;
  const [dx, dz] = fig.destSlot;
  if (t < disperseEnd) {
    const p = smoothstep((t - arriveAt) / HOUSEHOLD_DISPERSE_DUR);
    return {
      x: lerp(curveEnd.x + fig.laneOffset, dx, p),
      z: lerp(curveEnd.z, dz, p),
      yaw: Math.atan2(dx, dz),
    };
  }

  return { x: dx, z: dz, yaw: 0 };
}

const dummy = new THREE.Object3D();

export function HouseholdFigures({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(ADULT_PARAMS), []);
  const figures = useMemo(() => buildHouseholdFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = householdFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      const scale = fig.isChild ? 0.62 : 0.92 + (i % 5) * 0.015;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(scale);
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
