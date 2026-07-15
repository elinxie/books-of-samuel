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
import { TOWNSPEOPLE_SLOTS } from './layout';

/**
 * The local Canaanite town population (claim-beth-shan-control — rendered as
 * a local town, not a "Philistine city"; claim-dress) in the gate plaza and
 * lanes, ~30–40 at high tier. A static idle formation with a small ambient
 * sway/bob — one shared limbed rest-pose geometry, per-instance tint via
 * `mesh.setColorAt`, same convention as gilboa-battle's crowd components.
 */

const GENERIC_TOWNSPERSON_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

interface TownFigure {
  x: number;
  z: number;
  yaw: number;
  scale: number;
  color: THREE.Color;
  bobPhase: number;
  bobAmount: number;
}

function buildTownFigures(count: number, seed = 65601): TownFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: TownFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = TOWNSPEOPLE_SLOTS[i % TOWNSPEOPLE_SLOTS.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      scale: 0.93 + rng() * 0.12,
      color: color.clone(),
      bobPhase: rng() * Math.PI * 2,
      bobAmount: rng() < 0.4 ? 0.04 : 0, // most stand still; a minority shift weight
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function Townspeople({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_TOWNSPERSON_PARAMS), []);
  const figures = useMemo(() => buildTownFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const bob = fig.bobAmount * Math.abs(Math.sin(t * 1.6 + fig.bobPhase));
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.yaw, 0);
      dummy.scale.set(fig.scale, fig.scale * (1 + bob), fig.scale);
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
