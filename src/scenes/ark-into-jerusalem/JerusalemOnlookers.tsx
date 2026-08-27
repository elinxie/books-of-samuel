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
import { AMBIENT_DISTRIBUTION_SLOTS, AMBIENT_SETTLEMENT_SLOTS } from './layout';
import { onlookerPose } from './poses';

/**
 * The reused Jerusalem ambient population (`claim-ark-into-jerusalem-cast-
 * scale`, cross-referencing `jerusalem-stronghold`'s own `claim-stronghold-
 * cast-scale`): the same ~20-30-figure design count and the same
 * `AMBIENT_SETTLEMENT_SLOTS` positions that scene's `AmbientSettlement.tsx`
 * used, reused here as **active onlookers and distribution recipients**
 * rather than static background — the one place this scene's brief calls
 * out as adding meaningfully to on-screen figure activity relative to a
 * static reuse. Not doubled with the procession: this is a separate,
 * smaller, distinctly-positioned population, not a second copy of the same
 * crowd.
 */

const GENERIC_SETTLED_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

interface OnlookerFigure {
  home: [number, number];
  distSlot: [number, number];
  scale: number;
  color: THREE.Color;
}

export function buildOnlookerFigures(count: number, seed = 270801): OnlookerFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: OnlookerFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      home: AMBIENT_SETTLEMENT_SLOTS[i % AMBIENT_SETTLEMENT_SLOTS.length],
      distSlot: AMBIENT_DISTRIBUTION_SLOTS[i % AMBIENT_DISTRIBUTION_SLOTS.length],
      scale: 0.92 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function JerusalemOnlookers({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_SETTLED_PARAMS), []);
  const figures = useMemo(() => buildOnlookerFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = onlookerPose(t, fig.home, fig.distSlot);
      const y = terrain.heightAt(pose.x, pose.z);
      const bob = pose.moving ? Math.abs(Math.sin(t * 3.2 + i)) * 0.035 : 0;
      dummy.position.set(pose.x, y + bob, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(fig.scale);
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
