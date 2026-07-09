import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildRetinueSlots, type FigureSlot } from './layout';
import { retinueFallPose } from './poses';

/**
 * Crest bodyguard/retinue (M3 Step 3): a thin ring of generic Israelite
 * figures around the five named principals, per the brief's "Focal masses"
 * (a). At the `b-sons` beat, a seeded fraction of the retinue collapses
 * alongside the sons — "the line collapsing over them" — staggered by a
 * per-figure delay so it reads as a ripple, not a single cut; the rest hold
 * position. Bare/generic dress (claim-dress), one instanced mesh, same
 * crowd-figure convention as CampCrowd.tsx/Crossing.tsx.
 */

interface RetinueFigure extends FigureSlot {
  scale: number;
  color: THREE.Color;
  falls: boolean;
  fallDelay: number;
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

/** Deterministic retinue roster: position, scale/tint, and fall assignment. */
function buildRetinueFigures(count: number, seed = 31001): RetinueFigure[] {
  const slots = buildRetinueSlots(count, seed);
  const scaleRng = mulberry32(31006);
  const fallRng = mulberry32(31009);
  const color = new THREE.Color();
  return slots.map((slot) => {
    color.set(TUNIC_PALETTE[Math.floor(scaleRng() * TUNIC_PALETTE.length)]);
    color.offsetHSL(0, 0, (scaleRng() - 0.5) * 0.08);
    return {
      ...slot,
      scale: 0.95 + scaleRng() * 0.1,
      color: color.clone(),
      // Roughly a third of the thin bodyguard line goes down with the sons;
      // the rest hold the ground (brief: "partially collapses").
      falls: fallRng() < 0.35,
      fallDelay: fallRng() * 3,
    };
  });
}

const dummy = new THREE.Object3D();

export function CrestRetinue({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const figures = useMemo(() => buildRetinueFigures(count), [count]);
  const total = figures.length;

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = retinueFallPose(t, violenceMode, fig.falls, fig.fallDelay);
      const y = terrain.heightAt(fig.x, fig.z) - pose.fallen * 0.12;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(-pose.fallen * 1.35, fig.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
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
      args={[geometry, undefined, total]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
