import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { PEN_CENTERS } from './layout';
import { DRIVE_T, lerp, smoothstep } from './timing';

/**
 * The flocks and herds taken as spoil (1 Samuel 30:20) — mixed sheep/goats
 * plus some cattle, penned near the clusters until the drive-north beat,
 * then driven ahead of the column. Two instanced meshes (smallstock, cattle);
 * counts from the quality tier's livestockCount. See claim-livestock-spoil,
 * asset-livestock-placeholder.
 */

const DRIVE_SPEED = 3.0;

export interface AnimalState {
  home: [number, number];
  yaw: number;
  phase: number;
  driveDelay: number;
  lane: number;
  cattle: boolean;
}

export interface AnimalPose {
  x: number;
  z: number;
  yaw: number;
  moving: boolean;
}

/** Position of one animal at scene time t. Exported for unit tests. */
export function livestockPose(t: number, a: AnimalState): AnimalPose {
  const t0 = DRIVE_T + a.driveDelay;
  if (t < t0) return { x: a.home[0], z: a.home[1], yaw: a.yaw, moving: false };
  const dt = t - t0;
  const settle = smoothstep(dt / 9);
  const x = lerp(a.home[0], a.lane, settle);
  const z = a.home[1] - dt * DRIVE_SPEED;
  return { x, z, yaw: Math.PI, moving: true };
}

/** Deterministic herd roster scaled by the tier's livestockCount. */
export function buildHerd(livestockCount: number): AnimalState[] {
  const rng = mulberry32(4211);
  const out: AnimalState[] = [];
  for (let i = 0; i < livestockCount; i++) {
    const pen = PEN_CENTERS[i % PEN_CENTERS.length];
    out.push({
      home: [pen.x + (rng() * 2 - 1) * 8, pen.z + (rng() * 2 - 1) * 7],
      yaw: rng() * Math.PI * 2,
      phase: rng() * Math.PI * 2,
      driveDelay: rng() * 6,
      lane: -34 + rng() * 52,
      cattle: rng() < 0.18, // "flocks and herds" — mostly smallstock, some cattle
    });
  }
  return out;
}

function makeSmallstockGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.22, 0.42, 3, 7);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 0.48, 0);
  const head = new THREE.CapsuleGeometry(0.09, 0.16, 2, 5);
  head.rotateX(-0.3);
  head.translate(0.34, 0.62, 0);
  const legGeo = () => new THREE.CylinderGeometry(0.03, 0.035, 0.34, 4);
  const legs = [
    [0.17, 0.17, 0.1],
    [0.17, 0.17, -0.1],
    [-0.17, 0.17, 0.1],
    [-0.17, 0.17, -0.1],
  ].map(([x, y, z]) => {
    const g = legGeo();
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries([body, head, ...legs]);
  merged.computeVertexNormals();
  return merged;
}

function makeCattleGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.38, 0.85, 3, 8);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 0.92, 0);
  const head = new THREE.BoxGeometry(0.3, 0.28, 0.24);
  head.translate(0.72, 1.0, 0);
  const legGeo = () => new THREE.CylinderGeometry(0.055, 0.065, 0.68, 5);
  const legs = [
    [0.32, 0.34, 0.17],
    [0.32, 0.34, -0.17],
    [-0.32, 0.34, 0.17],
    [-0.32, 0.34, -0.17],
  ].map(([x, y, z]) => {
    const g = legGeo();
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries([body, head, ...legs]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();

function useHerdMesh(
  animals: AnimalState[],
  cattle: boolean,
): [React.RefObject<THREE.InstancedMesh | null>, AnimalState[]] {
  const ref = useRef<THREE.InstancedMesh>(null);
  const subset = useMemo(() => animals.filter((a) => a.cattle === cattle), [animals, cattle]);
  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < subset.length; i++) {
      const a = subset[i];
      const pose = livestockPose(t, a);
      const y = terrain.heightAt(pose.x, pose.z);
      const bob = pose.moving
        ? Math.abs(Math.sin(t * 3.6 + a.phase)) * 0.05
        : Math.sin(t * 0.9 + a.phase) * 0.012; // idle graze sway
      dummy.position.set(pose.x, y + bob, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.9 + ((i * 37) % 10) * 0.02);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  return [ref, subset];
}

export function Livestock({
  livestockCount,
  shadows,
}: {
  livestockCount: number;
  shadows: boolean;
}) {
  const animals = useMemo(() => buildHerd(livestockCount), [livestockCount]);
  const smallGeo = useMemo(() => makeSmallstockGeometry(), []);
  const cattleGeo = useMemo(() => makeCattleGeometry(), []);
  const [smallRef, smallstock] = useHerdMesh(animals, false);
  const [cattleRef, cattle] = useHerdMesh(animals, true);

  useEffect(() => {
    const rng = mulberry32(4213);
    const color = new THREE.Color();
    const small = smallRef.current;
    if (small) {
      for (let i = 0; i < smallstock.length; i++) {
        // Mixed flock: pale wool sheep and dark goats.
        if (rng() < 0.6) color.setHSL(0.1, 0.14 + rng() * 0.06, 0.66 + rng() * 0.1);
        else color.setHSL(0.07, 0.25, 0.16 + rng() * 0.08);
        small.setColorAt(i, color);
      }
      if (small.instanceColor) small.instanceColor.needsUpdate = true;
    }
    const cows = cattleRef.current;
    if (cows) {
      for (let i = 0; i < cattle.length; i++) {
        color.setHSL(0.07, 0.3 + rng() * 0.1, 0.28 + rng() * 0.12);
        cows.setColorAt(i, color);
      }
      if (cows.instanceColor) cows.instanceColor.needsUpdate = true;
    }
  }, [smallstock, cattle, smallRef, cattleRef]);

  return (
    <group>
      <instancedMesh
        ref={smallRef}
        args={[smallGeo, undefined, smallstock.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={cattleRef}
        args={[cattleGeo, undefined, cattle.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
