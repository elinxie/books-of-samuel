import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { CAMEL_STARTS, FLIGHT_DIR, type CamelStart } from './layout';
import { FLIGHT_T } from './timing';

/**
 * The four hundred young men fleeing on camels (1 Samuel 30:17), flight beat
 * ONLY per the resolved register #6 decision — no ambient herds, ~1:10 ratio,
 * minimal early tack (pad only, no frame saddle). Camel + rider are merged
 * into one instanced geometry so the flight costs a single draw call. See
 * claim-camel-depiction, asset-camel-placeholder; period dispute on
 * claim-amalekite-raiders.
 */

const GALLOP_SPEED = 9;
const EXIT_X = 300;

export interface CamelPose {
  x: number;
  z: number;
  visible: boolean;
}

/** Position of one fleeing camel at scene time t. Exported for unit tests. */
export function camelPose(t: number, start: CamelStart): CamelPose {
  const t0 = FLIGHT_T + start.delay;
  if (t < t0) return { x: 0, z: 0, visible: false };
  const run = (t - t0) * GALLOP_SPEED;
  const x = start.x + FLIGHT_DIR[0] * run;
  const z = start.z + FLIGHT_DIR[1] * run;
  return { x, z, visible: x < EXIT_X };
}

function makeCamelGeometry(): THREE.BufferGeometry {
  // Dromedary silhouette: high barrel body, long legs, up-curved neck, hump.
  const body = new THREE.CapsuleGeometry(0.42, 1.1, 4, 8);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 1.45, 0);
  const hump = new THREE.SphereGeometry(0.32, 8, 6);
  hump.scale(1, 0.8, 0.85);
  hump.translate(-0.1, 1.85, 0);
  const neck = new THREE.CapsuleGeometry(0.14, 0.7, 3, 6);
  neck.rotateX(-0.9);
  neck.rotateY(Math.PI / 2);
  neck.translate(0.78, 1.75, 0);
  const head = new THREE.CapsuleGeometry(0.11, 0.3, 2, 6);
  head.rotateX(-0.25);
  head.rotateY(Math.PI / 2);
  head.translate(1.05, 2.12, 0);
  const legGeo = () => new THREE.CylinderGeometry(0.06, 0.075, 1.25, 5);
  const legs = [
    [0.45, 0.62, 0.22],
    [0.45, 0.62, -0.22],
    [-0.5, 0.62, 0.22],
    [-0.5, 0.62, -0.22],
  ].map(([x, y, z]) => {
    const g = legGeo();
    g.translate(x, y, z);
    return g;
  });
  // Minimal tack: a simple pad behind the hump (no frame saddle — register #6).
  const pad = new THREE.BoxGeometry(0.55, 0.1, 0.6);
  pad.translate(-0.45, 1.78, 0);
  // Rider, merged in: torso + head seated on the pad.
  const riderTorso = new THREE.CapsuleGeometry(0.17, 0.45, 3, 6);
  riderTorso.translate(-0.45, 2.15, 0);
  const riderHead = new THREE.SphereGeometry(0.11, 6, 5);
  riderHead.translate(-0.45, 2.55, 0);
  const merged = mergeGeometries([body, hump, neck, head, ...legs, pad, riderTorso, riderHead]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();
const flightYaw = Math.atan2(FLIGHT_DIR[0], FLIGHT_DIR[1]);

export function Camels({ camelCount, shadows }: { camelCount: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeCamelGeometry(), []);
  const count = Math.min(camelCount, CAMEL_STARTS.length);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(4113);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      color.setHSL(0.09 + rng() * 0.02, 0.3 + rng() * 0.1, 0.42 + rng() * 0.12);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const start = CAMEL_STARTS[i];
      const pose = camelPose(t, start);
      if (!pose.visible) {
        dummy.position.set(0, -60, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z);
        const bob = Math.abs(Math.sin(t * 5.2 + start.phase)) * 0.16;
        dummy.position.set(pose.x, y + bob, pose.z);
        dummy.rotation.set(0, flightYaw, Math.sin(t * 5.2 + start.phase) * 0.03);
        dummy.scale.setScalar(1);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
