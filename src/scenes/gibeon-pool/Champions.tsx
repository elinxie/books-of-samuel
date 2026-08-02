import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  sampleFightPoses,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { buildChampionPairSlots, CHAMPION_PAIR_COUNT } from './layout';
import { championPairPose } from './poses';
import { buildStraightSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The champions' contest (`claim-gibeon-contest`, `b-champions`, 2:14-16):
 * rendered literally 1:1 — twelve pairs, twenty-four figures, the text's own
 * exact number, small enough to need no ratio (brief: "a disclosed small
 * headcount taken directly from the text, not a design choice at all
 * here"). One `InstancedMesh` for the whole cast; twelve paired grapple/fall
 * cycles share `championPairPose` (`poses.ts`), parameterized only by each
 * pair's own stagger. Documentary distance throughout: no blade-entry
 * geometry, no blood, no dismemberment, in either violence mode — the sword
 * 2:16 names is shown gripped and driven forward, never penetrating.
 */

export const CHAMPION_TOTAL = CHAMPION_PAIR_COUNT * 2;

const GENERIC_CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.55,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

export interface ChampionInstance {
  pairIndex: number;
  side: 'benjamin' | 'judah';
  start: [number, number];
  meet: [number, number];
  pairOffset: number;
  scale: number;
  color: THREE.Color;
}

export function buildChampionInstances(seed = 42201): ChampionInstance[] {
  const pairs = buildChampionPairSlots();
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();
  const out: ChampionInstance[] = [];
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const pairOffset = rng() * 3; // per-pair grapple-start stagger, not lockstep
    for (const side of ['benjamin', 'judah'] as const) {
      color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
      out.push({
        pairIndex: i,
        side,
        start: side === 'benjamin' ? pair.benjaminStart : pair.judahStart,
        meet: pair.meet,
        pairOffset,
        scale: 0.95 + paletteRng() * 0.1,
        color: color.clone(),
      });
    }
  }
  return out;
}

/** How far toward the pair's midpoint a champion advances — contact range
 * for the head-grasp gesture, never fully overlapping bodies. */
const MAX_APPROACH_FRACTION = 0.66;

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function Champions({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(
    () =>
      buildCrowdLimbedGeometry(
        GENERIC_CHAMPION_PARAMS,
        poseJointPositions(GENERIC_CHAMPION_PARAMS.stature, sampleFightPoses(1)[0]),
      ),
    [],
  );
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const instances = useMemo(() => buildChampionInstances(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < instances.length; i++) {
      const fig = instances[i];
      const pose = championPairPose(t, violenceMode, fig.pairOffset);
      const approachFrac = Math.min(MAX_APPROACH_FRACTION, pose.approach);
      const x = fig.start[0] + (fig.meet[0] - fig.start[0]) * approachFrac;
      const z = fig.start[1] + (fig.meet[1] - fig.start[1]) * approachFrac;
      const faceSign = fig.side === 'benjamin' ? 0 : Math.PI;
      const y = terrain.heightAt(x, z) - pose.fallen * 0.12;
      dummy.position.set(x, y, z);
      dummy.rotation.set(-pose.fallen * 1.35, faceSign, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      // The sword rides the same transform, driven forward as the grip
      // completes and withdrawn as the fall takes over — a gesture, never
      // shown entering a body (ADR-009).
      const swordExtend = pose.approach * (1 - pose.fallen);
      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.set(-pose.fallen * 1.35, faceSign, -swordExtend * 0.5);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      swordMesh?.setMatrixAt(i, weaponDummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, instances.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, instances.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.5} metalness={0.35} />
      </instancedMesh>
    </group>
  );
}
