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
import { CHAMPION_PAIR_SLOTS } from './layout';
import { championPose } from './poses';
import { buildGripSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The twelve-a-side champions' contest (2:14-16, `claim-gibeon-contest`),
 * rendered literally 1:1 — twenty-four figures, one shared brace-stance
 * geometry, one paired grapple/fall pose function (`championPose`)
 * parameterized by a small per-pair time offset. No team-color distinction
 * (brief: "no invented Judah kit vs. Benjamin kit") — both lines share the
 * same tunic palette, legible only by grouping/facing. A gripped sword only
 * (2:16's own detail, `asset-champion-sword`), no shield.
 */

interface ChampionFigure {
  x: number;
  z: number;
  yaw: number;
  pairOffset: number;
  side: -1 | 1;
  scale: number;
  color: THREE.Color;
}

const GENERIC_CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.54,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

function buildChampionFigures(seed = 220701): ChampionFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: ChampionFigure[] = [];
  for (const pair of CHAMPION_PAIR_SLOTS) {
    const pairOffset = rng() * 1.8;
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      x: pair.benjamin.x,
      z: pair.benjamin.z,
      yaw: pair.benjamin.yaw,
      pairOffset,
      side: -1,
      scale: 0.96 + rng() * 0.08,
      color: color.clone(),
    });
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      x: pair.judah.x,
      z: pair.judah.z,
      yaw: pair.judah.yaw,
      pairOffset,
      side: 1,
      scale: 0.96 + rng() * 0.08,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const swordDummy = new THREE.Object3D();

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
  const swordGeo = useMemo(() => buildGripSwordGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const figures = useMemo(() => buildChampionFigures(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = championPose(t, fig.pairOffset, violenceMode);
      const y = terrain.heightAt(fig.x, fig.z) - pose.fallen * 0.1;
      const lean = pose.grip * 0.32 - pose.fallen * 1.4;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(lean, fig.yaw, 0);
      const spawn = pose.appear;
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale * spawn, fig.scale * spawn * squash, fig.scale * spawn);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      if (swordMesh) {
        const thrust = pose.grip * 0.4 * fig.side;
        swordDummy.position.copy(dummy.position);
        swordDummy.rotation.set(lean, fig.yaw + thrust, 0);
        swordDummy.scale.copy(dummy.scale);
        swordDummy.updateMatrix();
        swordMesh.setMatrixAt(i, swordDummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
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
        ref={swordMeshRef}
        args={[swordGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#9a9a92" roughness={0.5} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
