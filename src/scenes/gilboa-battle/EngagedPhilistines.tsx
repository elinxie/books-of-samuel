import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildEngagedInfantrySlots } from './layout';
import { infantryEngagedPose } from './poses';
import { buildShieldGeometry, buildStraightSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The facing rank of the Philistine press (`claim-line-defense`,
 * `b-line-clash`): the mirror of `DefenderLine.tsx` on the Philistine side —
 * engages the Israelite defender line directly rather than standing static
 * like the broader infantry mass in `PhilistinePress.tsx`. Same round-
 * shield/straight-sword kit and palette convention as that component.
 */

const PHILISTINE_PALETTE = ['#8f8a72', '#736f5c', '#a39c7e'];

export interface EngagedFigureState {
  x: number;
  z: number;
  yaw: number;
  phaseOffset: number;
  scale: number;
  color: THREE.Color;
}

export function buildEngagedFigures(count: number, seed = 31009): EngagedFigureState[] {
  const slots = buildEngagedInfantrySlots(count, seed);
  const rng = mulberry32(seed + 700);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();
  return slots.map((slot) => {
    color.set(PHILISTINE_PALETTE[Math.floor(paletteRng() * PHILISTINE_PALETTE.length)]);
    color.offsetHSL(0, 0, (paletteRng() - 0.5) * 0.08);
    return {
      x: slot.x,
      z: slot.z,
      yaw: slot.yaw,
      phaseOffset: rng(),
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    };
  });
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
const weaponDummy = new THREE.Object3D();

export function EngagedPhilistines({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'), []);
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);
  const figures = useMemo(() => buildEngagedFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const shieldMesh = shieldMeshRef.current;
    const swordMesh = swordMeshRef.current;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const clash = infantryEngagedPose(t, fig.phaseOffset);
      const lean = clash.swing * 0.22;
      const twist = fig.yaw + clash.stagger * 0.35;
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(lean, twist, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      const weaponSwing = clash.swing * 0.55;
      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.set(lean + weaponSwing, twist, 0);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      swordMesh?.setMatrixAt(i, weaponDummy.matrix);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6e5c3d" roughness={0.8} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.55} metalness={0.35} />
      </instancedMesh>
    </group>
  );
}
