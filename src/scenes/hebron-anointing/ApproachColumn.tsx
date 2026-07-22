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
import { APPROACH_CURVE, RETINUE_SLOTS } from './layout';
import { clamp01, lerp, smoothstep, T_SETTLING } from './poses';

/**
 * David's ~600 fighting men (davids-band, claim-600-men, reused by
 * reference — not duplicated): the project's standard ~1:10 narrated-army
 * ratio, matching the Ziklag precedent. Distinct from the household column
 * (HouseholdFigures.tsx, a disclosed design-choice headcount) and the
 * Judah assembly (JudahAssembly.tsx, a representative civic gathering) —
 * three separate crowd-scale treatments the brief is explicit about never
 * conflating. They climb the approach road (b-arrival) and settle into a
 * retinue near the plaza (b-settling onward) — present through the
 * anointing and dispatch beats, but they are not the ones performing the
 * anointing; that is staged as the Judah assembly's act (2:4).
 */

const RETINUE_SETTLE_DUR = 6;

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export interface ApproachFigure {
  laneOffset: number;
  arriveStagger: number;
  destSlot: [number, number];
  color: THREE.Color;
}

export function buildApproachFigures(count: number, seed = 221101): ApproachFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: ApproachFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      laneOffset: (rng() - 0.5) * 4.2,
      arriveStagger: rng() * 4,
      destSlot: RETINUE_SLOTS[i % RETINUE_SLOTS.length],
      color: color.clone(),
    });
  }
  return out;
}

export interface ApproachPose {
  x: number;
  z: number;
  yaw: number;
}

/** Position/orientation for one of David's men at scene time `t`: climbs the
 * approach road, then fans out to a retinue slot near the plaza by
 * `T_SETTLING`. Exported for unit tests. */
export function approachFigurePose(t: number, fig: ApproachFigure): ApproachPose {
  const arriveAt = T_SETTLING + fig.arriveStagger;
  const curveEnd = APPROACH_CURVE.getPointAt(1);

  if (t < arriveAt) {
    const u = clamp01(smoothstep(t / arriveAt));
    const pos = APPROACH_CURVE.getPointAt(u);
    const tan = APPROACH_CURVE.getTangentAt(Math.max(0.001, u));
    return { x: pos.x + fig.laneOffset, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
  }

  const settleEnd = arriveAt + RETINUE_SETTLE_DUR;
  const [dx, dz] = fig.destSlot;
  if (t < settleEnd) {
    const p = smoothstep((t - arriveAt) / RETINUE_SETTLE_DUR);
    return {
      x: lerp(curveEnd.x + fig.laneOffset, dx, p),
      z: lerp(curveEnd.z, dz, p),
      yaw: Math.atan2(dx, dz),
    };
  }

  return { x: dx, z: dz, yaw: 0 };
}

const dummy = new THREE.Object3D();

export function ApproachColumn({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildApproachFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = approachFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.94 + (i % 7) * 0.015);
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
