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
import { ABNER_BATTLE_SLOTS, HILL_TOP_SLOTS, ISRAEL_BANK_SLOTS } from './layout';
import { abnerContingentPose } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Abner/Benjamin/Israel's wider contingent (claim-gibeon-battle-scale): a
 * disclosed design-choice headcount (~35-45 at high tier), deliberately
 * smaller than Gilboa's already-modest combat groupings — a contingent-level
 * clash between two commanders' followings at one town, not a national
 * muster. Seated at the pool's north bank, scattered into the spreading
 * battle once it ignites (2:17), then a rallying subset (~12-18, drawn from
 * this contingent, never additive) climbs to the hill of Ammah while the
 * rest disperse — see `abnerContingentPose` in poses.ts.
 *
 * A small, seeded fraction "falls" during the battle-spread beat: standard
 * mode crumples in place (asset-figure-fallen, reused), reduced mode fades
 * instead, per the brief's b-battle-spreads reduced treatment. This is
 * staging only, never scaled to the 360-man casualty figure delivered as
 * text at b-casualty-count (claim-gibeon-casualties).
 */

const ABNER_FALL_FRACTION = 0.2;
const RALLY_FRACTION = 0.35;

const GENERIC_ISRAEL_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export interface AbnerFigureState {
  bank: [number, number];
  battle: [number, number];
  hillTop: [number, number] | null;
  fallsInBattle: boolean;
  fallDelay: number;
  scale: number;
  color: THREE.Color;
}

export function buildAbnerContingentFigures(count: number, seed = 220601): AbnerFigureState[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();

  const fallsFlags: boolean[] = [];
  for (let i = 0; i < count; i++) fallsFlags.push(rng() < ABNER_FALL_FRACTION);
  const survivors = fallsFlags.reduce<number[]>((acc, falls, i) => {
    if (!falls) acc.push(i);
    return acc;
  }, []);
  const rallyCount = Math.min(survivors.length, Math.max(1, Math.round(count * RALLY_FRACTION)));
  const rallySet = new Set(survivors.slice(0, rallyCount));

  const out: AbnerFigureState[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      bank: ISRAEL_BANK_SLOTS[i % ISRAEL_BANK_SLOTS.length],
      battle: ABNER_BATTLE_SLOTS[i % ABNER_BATTLE_SLOTS.length],
      hillTop: rallySet.has(i) ? HILL_TOP_SLOTS[i % HILL_TOP_SLOTS.length] : null,
      fallsInBattle: fallsFlags[i],
      fallDelay: rng() * 8,
      scale: 0.94 + paletteRng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function AbnerContingent({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_ISRAEL_PARAMS), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const figures = useMemo(() => buildAbnerContingentFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const spear = spearRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = abnerContingentPose(
        t,
        fig.bank,
        fig.battle,
        fig.hillTop,
        fig.fallsInBattle,
        fig.fallDelay,
        violenceMode,
      );
      if (!pose.visible) {
        dummy.position.set(0, -80, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(-pose.fallen * 1.3, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
      spear?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (spear) spear.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={spearRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a8a86" roughness={0.6} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
