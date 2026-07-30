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
import { CHAMPION_PAIR_SLOTS, yawToward } from './layout';
import { championPose } from './poses';
import { buildSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The champions' contest (2:14-16, claim-champions-contest): twelve pairs,
 * rendered literally 1:1 (24 figures total) — the text's own exact number,
 * small enough to need no ratio (brief's "Resolved design calls"). Both
 * sides share the identical body geometry, dress palette, and weapon prop —
 * deliberately no invented "Judah kit" vs. "Benjamin kit" distinction
 * (claim-dress, reused as-is). Sides read only by which bank of the pool
 * they stand on and which way they face.
 *
 * Each pair shares one grapple/fall envelope (`championPose`), staggered by
 * a small per-pair offset so the line doesn't fall in perfect unison — the
 * brief's "12 paired grapple/fall cycles sharing one animation function
 * parameterized by pair offset." No blade-entry, blood, or dismemberment
 * geometry in either violence mode (ADR-009); the sword is a held prop only.
 */

const GENERIC_CHAMPION_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

/** A small per-pair stagger (seconds) so all twelve pairs don't fall in
 * lockstep. Exported for unit tests. */
export function pairStagger(pairIndex: number): number {
  return (pairIndex % 4) * 0.6 + (pairIndex % 3) * 0.3;
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function ChampionsContest({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_CHAMPION_PARAMS), []);
  const swordGeo = useMemo(() => buildSwordGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const total = CHAMPION_PAIR_SLOTS.length * 2;

  const jitter = useMemo(() => {
    const rng = mulberry32(230501);
    return CHAMPION_PAIR_SLOTS.map(() => 0.94 + rng() * 0.12);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    const swordMesh = swordMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let p = 0; p < CHAMPION_PAIR_SLOTS.length; p++) {
      const slot = CHAMPION_PAIR_SLOTS[p];
      const stagger = pairStagger(p);
      const pose = championPose(t, violenceMode, stagger);
      const scale = jitter[p];

      const place = (side: 'benjamin' | 'judah', index: number) => {
        const z = side === 'benjamin' ? slot.benjaminZ : slot.judahZ;
        const facingYaw = yawToward(
          slot.x,
          z,
          slot.x,
          side === 'benjamin' ? slot.judahZ : slot.benjaminZ,
        );
        const y = terrain.heightAt(slot.x, z) - pose.fallen * 0.12;
        dummy.position.set(slot.x, y, z);
        // Lean forward into the grasp, then collapse into the shared fall
        // transform — the same rotation+squash convention as every prior
        // death in the project (asset-figure-fallen), never wound geometry.
        const lean = pose.grasp * 0.3 - pose.fallen * 1.4;
        dummy.rotation.set(lean, facingYaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(scale, scale * squash, scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);

        weaponDummy.position.copy(dummy.position);
        weaponDummy.rotation.set(lean + pose.grasp * 0.4, facingYaw, 0);
        weaponDummy.scale.copy(dummy.scale);
        weaponDummy.updateMatrix();
        swordMesh?.setMatrixAt(index, weaponDummy.matrix);
      };

      place('benjamin', p * 2);
      place('judah', p * 2 + 1);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#9a8a6a" roughness={0.85} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}
