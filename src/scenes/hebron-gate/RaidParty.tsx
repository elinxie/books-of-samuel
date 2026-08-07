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
import { buildRaidPartySlots } from './layout';
import { raidPartyFigurePose, type CrowdFigureConfig } from './poses';

/**
 * Joab's returning raid party (3:22, "from a raid, bringing much spoil") —
 * `claim-gate-cast-scale`'s disclosed ≈15-25-figure count at high quality
 * tier, no narrated headcount. A single InstancedMesh, rigid-body
 * translation along the arrival road and into its gather slot (mirrors
 * hebron-covenant's AbnerParty.tsx — no per-frame walk-cycle bucket cycling,
 * a small literal-register cast, not a large moving crowd). No weapons/spoil
 * kit geometry: the fact of the raid is carried by caption text, not staged
 * loot.
 */

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildRaidPartyFigures(count: number, seed = 44102): CrowdFigureConfig[] {
  const rng = mulberry32(seed);
  const slots = buildRaidPartySlots(count);
  const out: CrowdFigureConfig[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      laneOffset: (rng() - 0.5) * 4,
      arriveStagger: rng() * 4,
      gatherSlot: slots[i % slots.length],
      tombSlot: slots[i % slots.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function RaidParty({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildRaidPartyFigures(count), [count]);
  const colors = useMemo(() => {
    const rng = mulberry32(44103);
    const color = new THREE.Color();
    return figures.map(() => {
      color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
      return color.clone();
    });
  }, [figures]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = raidPartyFigurePose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.94 + (i % 7) * 0.015);
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
