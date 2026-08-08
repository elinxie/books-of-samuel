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
import { PLAZA_WATCH_SLOTS, TOMB_WATCH_SLOTS } from './layout';
import { mournerPose, type MournerFigureSpec } from './poses';

/**
 * "All the people" (2 Samuel 3:31-32, 35-36): a disclosed representative
 * crowd (`claim-gate-cast-scale`, ~60-90 at high tier — the same no-
 * narrated-count convention as `claim-judah-assembly-scale`), present near
 * the plaza from the scene's start as ordinary bystanders (the brief's
 * "figures at distance noticing" bridge across the killing, since the text
 * supplies no bystander reaction of its own here), then — from the
 * mourning-command beat — dressed in sackcloth and following the bier to
 * the tomb (`claim-abner-funeral`, `claim-mourning-dress`).
 *
 * Two baked geometry variants (ordinary dress, sackcloth), visibility
 * toggled together at the mourning-command beat — the same "swap the whole
 * mesh" technique gibeon-pool used for Abner's normal/reversed spear —
 * rather than an animated per-vertex color blend, since dress colors are
 * baked into the geometry at build time.
 */

const BASE_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.46,
  shoulders: 0.95,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[2],
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const SACKCLOTH_PARAMS: CharacterParams = {
  ...BASE_PARAMS,
  dress: { tunicColor: '#3f372c', beltColor: '#2b2419', headwear: 'bare' },
};

interface MournerFigure extends MournerFigureSpec {
  scale: number;
  color: THREE.Color;
}

export function buildMournerFigures(count: number, seed = 240501): MournerFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: MournerFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
    out.push({
      watchSlot: PLAZA_WATCH_SLOTS[i % PLAZA_WATCH_SLOTS.length],
      tombSlot: TOMB_WATCH_SLOTS[i % TOMB_WATCH_SLOTS.length],
      stagger: rng() * 6,
      laneOffset: (rng() - 0.5) * 4,
      scale: 0.9 + rng() * 0.16,
      color: color.clone(),
    });
  }
  return out;
}

export function MourningAssembly({ count, shadows }: { count: number; shadows: boolean }) {
  const normalRef = useRef<THREE.InstancedMesh>(null);
  const sackclothRef = useRef<THREE.InstancedMesh>(null);
  const normalGeo = useMemo(() => buildCrowdLimbedGeometry(BASE_PARAMS), []);
  const sackclothGeo = useMemo(() => buildCrowdLimbedGeometry(SACKCLOTH_PARAMS), []);
  const figures = useMemo(() => buildMournerFigures(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const normal = normalRef.current;
    const sackcloth = sackclothRef.current;
    if (!normal || !sackcloth) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    let mourning = 0;

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = mournerPose(t, fig);
      mourning = pose.mourning;
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      normal.setMatrixAt(i, dummy.matrix);
      normal.setColorAt(i, fig.color);
      sackcloth.setMatrixAt(i, dummy.matrix);
      sackcloth.setColorAt(i, fig.color);
    }
    normal.instanceMatrix.needsUpdate = true;
    if (normal.instanceColor) normal.instanceColor.needsUpdate = true;
    sackcloth.instanceMatrix.needsUpdate = true;
    if (sackcloth.instanceColor) sackcloth.instanceColor.needsUpdate = true;

    normal.visible = mourning < 0.5;
    sackcloth.visible = mourning >= 0.5;
  });

  return (
    <group>
      <instancedMesh
        ref={normalRef}
        args={[normalGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={sackclothRef}
        args={[sackclothGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
    </group>
  );
}
