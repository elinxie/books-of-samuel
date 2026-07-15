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
import { PYRE_GATHER_SLOTS, TAMARISK_GATHER_SLOTS, VILLAGE_YARD_SLOTS } from './layout';
import { clamp01, lerp, smoothstep, T_PYRE, T_RECEIVED, T_TAMARISK } from './poses';

/**
 * The people of Jabesh-gilead (men-of-jabesh reused for the general
 * population too — the text names no one; claim-dress): quiet grief poses,
 * no wailing choreography beyond the pose system's restraint (brief). The
 * crowd holds three locations across the scene — the reception yard, the
 * pyre ground (at documentary distance), and the tamarisk — moving between
 * them as a short, soft group transition timed to the same beat boundaries
 * as the biers/bundle, standing in for the elapsed hours the lighting arc
 * already carries (no separate route geometry needed: the terrain here is
 * open, unwalled hillside with nothing to clip through).
 */

const GENERIC_VILLAGER_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

const COME_OUT_DUR = 4;
const TRANSIT_DUR = 8;

interface VillagerFigure {
  villageSlot: [number, number];
  pyreSlot: [number, number];
  tamariskSlot: [number, number];
  yaw: number;
  color: THREE.Color;
  bobPhase: number;
  bobAmount: number;
}

export function buildVillagerFigures(count: number, seed = 71601): VillagerFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: VillagerFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      villageSlot: VILLAGE_YARD_SLOTS[i % VILLAGE_YARD_SLOTS.length],
      pyreSlot: PYRE_GATHER_SLOTS[i % PYRE_GATHER_SLOTS.length],
      tamariskSlot: TAMARISK_GATHER_SLOTS[i % TAMARISK_GATHER_SLOTS.length],
      yaw: rng() * Math.PI * 2,
      color: color.clone(),
      bobPhase: rng() * Math.PI * 2,
      bobAmount: rng() < 0.35 ? 0.03 : 0,
    });
  }
  return out;
}

export interface VillagerPose {
  x: number;
  z: number;
  yaw: number;
  scale: number;
  visible: boolean;
}

/** Position/presence for one villager at scene time t. Exported for unit
 * tests (reenactment.test.ts). */
export function villagerPose(t: number, fig: VillagerFigure): VillagerPose {
  if (t < T_RECEIVED) return { x: 0, z: 0, yaw: fig.yaw, scale: 0, visible: false };

  if (t < T_PYRE) {
    const comeOut = smoothstep((t - T_RECEIVED) / COME_OUT_DUR);
    return {
      x: fig.villageSlot[0],
      z: fig.villageSlot[1],
      yaw: fig.yaw,
      scale: comeOut,
      visible: comeOut > 0.01,
    };
  }

  const toPyreEnd = T_PYRE + TRANSIT_DUR;
  if (t < toPyreEnd) {
    const p = smoothstep((t - T_PYRE) / TRANSIT_DUR);
    return {
      x: lerp(fig.villageSlot[0], fig.pyreSlot[0], p),
      z: lerp(fig.villageSlot[1], fig.pyreSlot[1], p),
      yaw: fig.yaw,
      scale: 1,
      visible: true,
    };
  }

  if (t < T_TAMARISK) {
    return { x: fig.pyreSlot[0], z: fig.pyreSlot[1], yaw: fig.yaw, scale: 1, visible: true };
  }

  const toTamariskEnd = T_TAMARISK + TRANSIT_DUR;
  if (t < toTamariskEnd) {
    const p = smoothstep((t - T_TAMARISK) / TRANSIT_DUR);
    return {
      x: lerp(fig.pyreSlot[0], fig.tamariskSlot[0], p),
      z: lerp(fig.pyreSlot[1], fig.tamariskSlot[1], p),
      yaw: fig.yaw,
      scale: 1,
      visible: true,
    };
  }

  return { x: fig.tamariskSlot[0], z: fig.tamariskSlot[1], yaw: fig.yaw, scale: 1, visible: true };
}

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function Villagers({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_VILLAGER_PARAMS), []);
  const figures = useMemo(() => buildVillagerFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = villagerPose(t, fig);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
      const bob = fig.bobAmount * Math.abs(Math.sin(t * 1.5 + fig.bobPhase));
      const y = terrain.heightAt(pose.x, pose.z);
      const scale = clamp01(pose.scale) * (0.93 + (i % 7) * 0.017);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.set(scale, scale * (1 + bob), scale);
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
