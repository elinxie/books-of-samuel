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
import { buildChampionPairSlots } from './layout';
import { championPose } from './poses';
import { buildShortSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The champions' contest (2:14-16, claim-champions-contest): twelve pairs,
 * twenty-four figures rendered literally 1:1 — the text's own exact number,
 * small enough to need no ratio (brief's "Resolved design calls"). One
 * shared InstancedMesh (both sides use the same undifferentiated crowd
 * geometry and dress — claim-dress, no invented "Judah kit" vs.
 * "Benjamin kit" distinction) driven every frame by `championPose`, the one
 * paired grapple/fall pose function the brief calls for
 * ("12 paired grapple/fall cycles sharing one animation function").
 *
 * ADR-009: no blade-entry geometry, no blood, no dismemberment, in either
 * mode. `engage` reads as a forward lean into the grasp; `fallen` is the
 * same rotation/scale collapse transform used everywhere else in the
 * project (asset-figure-fallen, reused).
 */

const GENERIC_CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

const dummy = new THREE.Object3D();

interface ChampionSlot {
  start: [number, number];
  meet: [number, number];
  facingMeet: [number, number];
  scale: number;
  color: THREE.Color;
}

export function buildChampionSlots(seed = 220901): ChampionSlot[] {
  const pairs = buildChampionPairSlots();
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: ChampionSlot[] = [];
  for (const pair of pairs) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      start: pair.benjStart,
      meet: pair.benjMeet,
      facingMeet: pair.judMeet,
      scale: 0.95 + rng() * 0.1,
      color: color.clone(),
    });
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      start: pair.judStart,
      meet: pair.judMeet,
      facingMeet: pair.benjMeet,
      scale: 0.95 + rng() * 0.1,
      color: color.clone(),
    });
  }
  return out;
}

export function ChampionsContest({ shadows }: { shadows: boolean }) {
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const swordRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_CHAMPION_PARAMS), []);
  const swordGeo = useMemo(() => buildShortSwordGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const slots = useMemo(() => buildChampionSlots(), []);

  useFrame(() => {
    const body = bodyRef.current;
    const sword = swordRef.current;
    if (!body) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const pose = championPose(t, slot.start, slot.meet, slot.facingMeet, violenceMode);
      const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
      const lean = pose.engage * (1 - pose.fallen) * 0.18;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(lean - pose.fallen * 1.3, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(slot.scale, slot.scale * squash, slot.scale);
      dummy.updateMatrix();
      body.setMatrixAt(i, dummy.matrix);
      body.setColorAt(i, slot.color);
      sword?.setMatrixAt(i, dummy.matrix);
    }
    body.instanceMatrix.needsUpdate = true;
    if (body.instanceColor) body.instanceColor.needsUpdate = true;
    if (sword) sword.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={bodyRef}
        args={[geometry, undefined, slots.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={swordRef}
        args={[swordGeo, undefined, slots.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a8a86" roughness={0.6} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
