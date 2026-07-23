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
import {
  buildBowGeometry,
  buildShieldGeometry,
  buildSpearGeometry,
  CROWD_KIT_STATURE,
  type RetinueKit,
  assignRetinueKit,
} from '../gilboa-battle/kitMeshes';
import {
  buildAmmahRallySlots,
  buildBattleSpreadSlots,
  buildBenjaminBankSlots,
  buildJudahBankSlots,
  buildPursuersHaltSlots,
} from './layout';
import { contingentFigurePose, type ContingentFigureState } from './poses';

/**
 * The two wider contingents (2:12-13, 2:17 onward): Abner's Benjamin/Israel
 * company and Joab's Judah company. Seated opposite each other across the
 * pool (`b-arrival`), they spread into the wider clash once the contest
 * ignites (`b-battle-spreads`) — a seeded fraction "falls" (a collapse
 * transform only, ADR-009), higher on Benjamin's side than Judah's,
 * reflecting the text's own statement that "Israel was routed before the
 * servants of David" (2:17) qualitatively, not as a rendering of the
 * 360/20 casualty figures (those are text-only, `claim-gibeon-casualties`
 * carried by `claim-abner-pursuit-halted`'s notes). Survivors either settle
 * where they land or continue into the pursuit: all surviving Judah
 * figures gather below the hill of Ammah; a disclosed subset of surviving
 * Benjamin figures (12-18, "drawn from, not additive to" the wider
 * contingent) becomes the rallying band atop it.
 *
 * No invented dress differentiation between the two sides (`claim-dress`,
 * reused as-is) — legible only by grouping and position, per the brief.
 */

const GENERIC_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

const FALL_PROBABILITY: Record<'benjamin' | 'judah', number> = {
  benjamin: 0.42,
  judah: 0.16,
};

export function buildContingentFigures(
  count: number,
  side: 'benjamin' | 'judah',
  rallyBandCount: number,
  seed: number,
): ContingentFigureState[] {
  const banks =
    side === 'benjamin' ? buildBenjaminBankSlots(count, seed) : buildJudahBankSlots(count, seed);
  const spreads = buildBattleSpreadSlots(count, side, seed + 1000);
  const rng = mulberry32(seed + 2000);
  const paletteRng = mulberry32(seed + 3000);

  const destSlots =
    side === 'judah'
      ? buildPursuersHaltSlots(count, seed + 4000)
      : buildAmmahRallySlots(Math.min(rallyBandCount, count), seed + 4000);

  let rallyAssigned = 0;
  const out: ContingentFigureState[] = [];
  for (let i = 0; i < count; i++) {
    const falls = rng() < FALL_PROBABILITY[side];
    const eligibleForRally = side === 'judah' ? !falls : !falls && rallyAssigned < rallyBandCount;
    const continues = side === 'judah' ? !falls : eligibleForRally;
    if (side === 'benjamin' && continues) rallyAssigned++;

    out.push({
      side,
      bank: banks[i],
      spread: spreads[i],
      falls,
      fallDelay: rng() * 4,
      continues,
      destSlot: continues ? destSlots[i % destSlots.length] : { x: 0, z: 0, yaw: 0 },
      spreadArriveStagger: rng() * 6,
      pursuitStagger: rng() * 6,
      scale: 0.95 + paletteRng() * 0.1,
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const HIDDEN_MATRIX = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -1000, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function ContingentGroup({
  side,
  count,
  rallyBandCount,
  seed,
  shadows,
}: {
  side: 'benjamin' | 'judah';
  count: number;
  rallyBandCount: number;
  seed: number;
  shadows: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const bowMeshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PARAMS), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'), []);
  const bowGeo = useMemo(() => buildBowGeometry(CROWD_KIT_STATURE, 'handL'), []);

  const figures = useMemo(
    () => buildContingentFigures(count, side, rallyBandCount, seed),
    [count, side, rallyBandCount, seed],
  );
  const kits = useMemo<RetinueKit[]>(() => {
    const rng = mulberry32(seed + 5000);
    return figures.map(() => assignRetinueKit(rng));
  }, [figures, seed]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const bowMesh = bowMeshRef.current;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = contingentFigurePose(t, fig, violenceMode);
      const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const kit = kits[i];
      const hasSpear = kit === 'spear' || kit === 'spear-shield';
      const hasShield = kit === 'shield' || kit === 'spear-shield';
      const hasBow = kit === 'bow';
      spearMesh?.setMatrixAt(i, hasSpear ? dummy.matrix : HIDDEN_MATRIX);
      shieldMesh?.setMatrixAt(i, hasShield ? dummy.matrix : HIDDEN_MATRIX);
      bowMesh?.setMatrixAt(i, hasBow ? dummy.matrix : HIDDEN_MATRIX);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (bowMesh) bowMesh.instanceMatrix.needsUpdate = true;
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
        ref={spearMeshRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
      <instancedMesh
        ref={bowMeshRef}
        args={[bowGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#5c4023" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
