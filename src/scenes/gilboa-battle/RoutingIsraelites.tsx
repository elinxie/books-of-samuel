import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore, type ViolenceMode } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildRoutSlots } from './layout';
import { clamp01, lerp, smoothstep, T_ROUT } from './poses';

/**
 * Routing Israelites (M3 Step 3): figures streaming down the eastern escape
 * slope from the `b-rout` beat onward, per the brief's "Focal masses" (c)
 * and the beat table's `b-rout` row — the rout reads by motion and dust
 * (claim-battle-scale), not by headcount. Each figure begins drifting down
 * the slope at an individually staggered time; in standard mode a seeded
 * fraction crumples at distance partway down the draw (no gore/wound
 * geometry — a collapse transform only). In reduced mode that same fraction
 * never falls: the fall is elided and the figure simply fades from the
 * scene mid-drift instead, reading as the rout "thinning and draining"
 * rather than a depicted death.
 */

export interface RoutFigureState {
  startX: number;
  startZ: number;
  targetX: number;
  targetZ: number;
  arriveDelay: number;
  driftDuration: number;
  falls: boolean;
  fallProgress: number;
  yaw: number;
  scale: number;
  color: THREE.Color;
}

export interface RoutPose {
  x: number;
  z: number;
  yaw: number;
  fallen: number;
  moving: boolean;
  visible: boolean;
}

/** Where the drift begins: just past the crest, before the slope steepens. */
const START_X = 14;

/** Deterministic rout roster scaled by the quality tier's figure count. */
export function buildRoutFigures(count: number, seed = 31005): RoutFigureState[] {
  const slots = buildRoutSlots(count, seed);
  const rng = mulberry32(seed + 500);
  const paletteRng = mulberry32(31008);
  const color = new THREE.Color();
  return slots.map((slot) => {
    color.set(TUNIC_PALETTE[Math.floor(paletteRng() * TUNIC_PALETTE.length)]);
    color.offsetHSL(0, 0, (paletteRng() - 0.5) * 0.08);
    return {
      startX: START_X,
      startZ: slot.z * 0.35,
      targetX: slot.x,
      targetZ: slot.z,
      arriveDelay: rng() * 20,
      driftDuration: 40 + rng() * 55,
      falls: rng() < 0.45,
      fallProgress: 0.25 + rng() * 0.5,
      yaw: slot.yaw,
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    };
  });
}

/** Real-time (not drift-fraction) window a crumple/fade takes once triggered. */
const FALL_WINDOW_SEC = 2.5;
const DRAIN_WINDOW_SEC = 3.5;

/** Position/pose for one rout figure at scene time t. Exported for unit tests. */
export function routFigurePose(t: number, fig: RoutFigureState, mode: ViolenceMode): RoutPose {
  const startT = T_ROUT + fig.arriveDelay;
  if (t < startT) {
    return { x: fig.startX, z: fig.startZ, yaw: fig.yaw, fallen: 0, moving: false, visible: true };
  }
  const progress = clamp01((t - startT) / fig.driftDuration);
  const x = lerp(fig.startX, fig.targetX, progress);
  const z = lerp(fig.startZ, fig.targetZ, progress);
  // Absolute scene-time this figure would cross its fall point, independent
  // of its own drift duration, so the crumple/fade always takes a fixed,
  // legible real-time window once triggered.
  const fallStartT = startT + fig.fallProgress * fig.driftDuration;

  if (fig.falls && t >= fallStartT) {
    if (mode === 'standard') {
      // Crumples at distance where it is overtaken and stays down.
      const fallX = lerp(fig.startX, fig.targetX, fig.fallProgress);
      const fallZ = lerp(fig.startZ, fig.targetZ, fig.fallProgress);
      const fallen = smoothstep((t - fallStartT) / FALL_WINDOW_SEC);
      return { x: fallX, z: fallZ, yaw: fig.yaw, fallen, moving: false, visible: true };
    }
    // Reduced: the fall is elided. The figure keeps moving but the rout
    // thins — it fades from the scene rather than being shown falling.
    const drain = smoothstep((t - fallStartT) / DRAIN_WINDOW_SEC);
    return { x, z, yaw: fig.yaw, fallen: 0, moving: true, visible: drain < 0.97 };
  }

  return { x, z, yaw: fig.yaw, fallen: 0, moving: progress < 1, visible: true };
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

export function RoutingIsraelites({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const figures = useMemo(() => buildRoutFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = routFigurePose(t, fig, violenceMode);
      if (!pose.visible) {
        dummy.position.set(0, -60, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
        // A slight forward lean reads as motion at documentary distance.
        const lean = pose.moving ? -0.08 : 0;
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(lean - pose.fallen * 1.35, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      }
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
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
