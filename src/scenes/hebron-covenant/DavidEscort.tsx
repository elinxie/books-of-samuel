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
import { DAVID_ESCORT_SLOTS } from './layout';
import { escortSeatedEnvelope } from './poses';

/**
 * David's household/escort presence at the feast (`claim-covenant-cast-scale`)
 * — a disclosed design count (~15-25 figures at high quality tier), never a
 * headcount the text gives. Present at Hebron the whole scene (no travel
 * choreography, unlike Abner's party): only a shared standing/seated blend,
 * ramping in with the feast beat. Kept visually distinct from Abner's twenty
 * men and from the town background, per the brief's "never conflate the
 * three crowds" convention (carried over from hebron-anointing).
 */

const ADULT_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.46,
  shoulders: 0.94,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[1],
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

export interface EscortFigure {
  x: number;
  z: number;
  baseYaw: number;
  scale: number;
  color: THREE.Color;
}

export function buildEscortFigures(count: number, seed = 53301): EscortFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: EscortFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = DAVID_ESCORT_SLOTS[i % DAVID_ESCORT_SLOTS.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      x,
      z,
      baseYaw: rng() * Math.PI * 2,
      scale: 0.92 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function DavidEscort({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(ADULT_PARAMS), []);
  const figures = useMemo(() => buildEscortFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const seated = escortSeatedEnvelope(t);
    const squash = 1 - seated * 0.32;
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const y = terrain.heightAt(fig.x, fig.z) - seated * 0.22;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.baseYaw, 0);
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
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
