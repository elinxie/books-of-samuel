import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { buildAmbientTownSlots } from './layout';

/**
 * Ambient townsfolk (`claim-reckoning-cast-scale`) — a working town
 * continuing an ordinary morning around the judgment, a disclosed
 * ≈10-20-figure design count at high quality tier, static throughout — the
 * smallest of the three M5 scenes' ambient-town treatments, matching the
 * brief's "conversation-scale, not a crowd event" framing.
 */

const TOWNSFOLK_PARAMS: CharacterParams = {
  stature: 1.65,
  build: 0.44,
  shoulders: 0.94,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#5a3722', headwear: 'bare' },
};

interface TownFigure {
  x: number;
  z: number;
  yaw: number;
  scale: number;
  color: THREE.Color;
}

export function buildAmbientTownFigures(count: number, seed = 45202): TownFigure[] {
  const rng = mulberry32(seed);
  const slots = buildAmbientTownSlots(count);
  const color = new THREE.Color();
  const out: TownFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = slots[i % slots.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      scale: 0.9 + rng() * 0.16,
      color: color.clone(),
    });
  }
  return out;
}

export function AmbientTown({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(TOWNSFOLK_PARAMS), []);
  const figures = useMemo(() => buildAmbientTownFigures(count), [count]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [figures, terrain]);

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
