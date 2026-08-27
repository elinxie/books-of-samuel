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
import { DANCE_GATHER_SLOTS, DISTRIBUTION_SLOTS } from './layout';
import { danceEnvelope, processionFigurePose, type ProcessionFigureSpec } from './poses';

/**
 * The procession (`claim-ark-procession-cast-scale`, cross-referenced from
 * `perez-uzzah`): the **same disclosed representative gathering (~150-200 at
 * high tier)**, reused and repositioned for its arrival in Jerusalem — never
 * doubled into a second crowd (the rephaim-valley precedent). This is a
 * fresh instanced population (a different scene, a different terrain, so
 * the geometry itself cannot literally be shared across the two React
 * trees), but it mirrors `perez-uzzah/ProcessionColumn.tsx`'s own design
 * exactly: same generic crowd-tier character params, same count/design
 * discipline, same one-shared-curve-with-lane-offsets choreography
 * (ADR-006/007). No new instrument geometry renders here — 6:15's shouting
 * and horn are carried by caption, not by new placeholder props (the
 * brief's own "New geometry is limited to" list does not include
 * instruments for this scene).
 */

const GENERIC_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export interface ColumnFigure extends ProcessionFigureSpec {
  scale: number;
  color: THREE.Color;
}

/** Deterministic roster: dance-gather and distribution slots paired by
 * index, a per-figure lane offset and entry stagger. */
export function buildColumnFigures(count: number, seed = 270701): ColumnFigure[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 400);
  const color = new THREE.Color();
  const out: ColumnFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      laneOffset: (rng() - 0.5) * 44,
      entryStagger: rng() * 5,
      danceSlot: DANCE_GATHER_SLOTS[i % DANCE_GATHER_SLOTS.length],
      distSlot: DISTRIBUTION_SLOTS[i % DISTRIBUTION_SLOTS.length],
      scale: 0.94 + paletteRng() * 0.12,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function ProcessionColumn({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PARAMS), []);
  const figures = useMemo(() => buildColumnFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const env = danceEnvelope(t);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = processionFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      const walkBob = pose.moving ? Math.abs(Math.sin(t * 3.4 + i)) * 0.04 : 0;
      const danceBob = pose.dancing ? Math.abs(Math.sin(t * 3.6 + i)) * 0.1 * env : 0;
      dummy.position.set(pose.x, y + walkBob + danceBob, pose.z);
      dummy.rotation.set(0, pose.yaw + (pose.dancing ? Math.sin(t * 1.2 + i) * 0.18 * env : 0), 0);
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
