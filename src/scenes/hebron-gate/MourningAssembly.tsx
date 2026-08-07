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
import { buildMourningGatherSlots, buildTombGatherSlots } from './layout';
import { mourningFigurePose, type CrowdFigureConfig } from './poses';

/**
 * The mourning assembly — "all the people" (3:31-32, 35-36) —
 * `claim-gate-cast-scale`'s disclosed ≈60-90-figure representative crowd at
 * high quality tier (smaller than hebron-anointing's civic-founding
 * assembly: a funeral, not a founding). Present at the plaza from the start
 * — Hebron's own townspeople, they do not "arrive" — then follows the
 * procession to the tomb at funeral pace and holds there for the rest of
 * the scene. A single InstancedMesh, rigid-body translation per figure
 * (mirrors AbnerParty.tsx): the brief's "single shared route-curve with
 * per-figure offsets — cheaper than per-figure pathing," not a walk-cycle
 * bucket crowd like gibeon-pool's moving contingents.
 */

const GENERIC_MOURNER_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.47,
  shoulders: 0.97,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildMourningFigures(count: number, seed = 44203): CrowdFigureConfig[] {
  const rng = mulberry32(seed);
  const gatherSlots = buildMourningGatherSlots(count);
  const tombSlots = buildTombGatherSlots(count);
  const out: CrowdFigureConfig[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      laneOffset: (rng() - 0.5) * 5,
      arriveStagger: rng() * 8,
      gatherSlot: gatherSlots[i % gatherSlots.length],
      tombSlot: tombSlots[i % tombSlots.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function MourningAssembly({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MOURNER_PARAMS), []);
  const figures = useMemo(() => buildMourningFigures(count), [count]);
  const colors = useMemo(() => {
    const rng = mulberry32(44204);
    const color = new THREE.Color();
    return figures.map(() => {
      color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
      return color.clone();
    });
  }, [figures]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = mourningFigurePose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.92 + (i % 9) * 0.014);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, colors[i]);
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
