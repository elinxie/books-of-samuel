import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  sampleWalkPoses,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import {
  buildAbnerSpreadSlots,
  buildAmmahHillSlots,
  buildIsraelBankSlots,
  buildJoabSpreadSlots,
  buildJudahBankSlots,
} from './layout';
import { contingentFigurePose, type ContingentFigureConfig } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The two wider contingents behind the champions (b-battle-spreads, 2:17):
 * a disclosed design-choice figure count (`claim-gibeon-battle-scale`),
 * deliberately smaller than gilboa-battle's already-modest crowds — this is
 * a contingent-level clash between two commanders' followings at one town,
 * not a national muster. Each figure holds at its pool-bank slot through the
 * arrival/proposal/champions beats, then drifts into a spread-field slot
 * once the wider clash ignites; a seeded fraction crumples (standard) or
 * fades/thins (reduced) in the drift, per `contingentFigurePose`.
 *
 * Abner's contingent alone also carries a hill-bound subset — the rallying
 * Benjaminite band at the hill of Ammah (2:25), drawn from (not additive to)
 * this same contingent, per the brief's explicit "not additive" instruction.
 * Joab's contingent has no hill-bound subset: only the named principals
 * (Joab, Abishai) continue the pursuit that far (PrincipalFigures.tsx).
 *
 * Both sides use the identical body/kit — no invented "Judah kit" vs.
 * "Benjamin kit" (see the brief's dress-review call); grouping (bank side,
 * spread-field z-bias) is what keeps the two civil-war sides legible.
 */

const BUCKET_COUNT = 6;

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

function buildContingentFigures(
  count: number,
  hillCount: number,
  bankBuilder: (count: number) => { x: number; z: number; yaw: number }[],
  spreadBuilder: (count: number) => { x: number; z: number; yaw: number }[],
  seed: number,
  fallChance: number,
): { cfg: ContingentFigureConfig; color: THREE.Color; scale: number; phaseOffset: number }[] {
  const bank = bankBuilder(count);
  const spread = spreadBuilder(count);
  const hill = hillCount > 0 ? buildAmmahHillSlots(hillCount, seed + 1000) : [];
  const rng = mulberry32(seed + 500);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();

  return bank.map((b, i) => {
    const s = spread[i];
    const isHillBound = i < hillCount;
    const cfg: ContingentFigureConfig = {
      bankX: b.x,
      bankZ: b.z,
      bankYaw: b.yaw,
      targetX: s.x,
      targetZ: s.z,
      targetYaw: s.yaw,
      arriveDelay: rng() * 8,
      driftDuration: 16 + rng() * 14,
      // Hill-bound figures are the survivors who make the rally; they never
      // register as a casualty in this scene's staging.
      falls: !isHillBound && rng() < fallChance,
      fallProgress: 0.3 + rng() * 0.5,
      ...(isHillBound ? { hillX: hill[i].x, hillZ: hill[i].z, hillYaw: hill[i].yaw } : {}),
    };
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    return {
      cfg,
      color: color.clone(),
      scale: 0.95 + paletteRng() * 0.1,
      phaseOffset: rng(),
    };
  });
}

const dummy = new THREE.Object3D();
const spearDummy = new THREE.Object3D();
const WALK_CYCLE_SEC = 1.1;

function ContingentInstances({
  figures,
  shadows,
  spearHand,
}: {
  figures: ReturnType<typeof buildContingentFigures>;
  shadows: boolean;
  spearHand: 'handL' | 'handR';
}) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const bucketGeometries = useMemo(
    () =>
      sampleWalkPoses(BUCKET_COUNT).map((pose) =>
        buildCrowdLimbedGeometry(GENERIC_PARAMS, poseJointPositions(GENERIC_PARAMS.stature, pose)),
      ),
    [],
  );
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, spearHand), [spearHand]);

  useFrame(() => {
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const spearMesh = spearMeshRef.current;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const { cfg, color, scale, phaseOffset } = figures[i];
      const pose = contingentFigurePose(t, cfg, violenceMode);
      if (!pose.visible) {
        dummy.position.set(0, -80, 0);
        dummy.scale.setScalar(0.0001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(-pose.fallen * 1.35, pose.yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(scale, scale * squash, scale);
      }
      dummy.updateMatrix();

      const phase = (t / WALK_CYCLE_SEC + phaseOffset) % 1;
      const bucket = Math.min(BUCKET_COUNT - 1, Math.floor(Math.max(0, phase) * BUCKET_COUNT));
      const bucketMesh = bucketMeshRefs.current[bucket]!;
      const slot = bucketCursors.current[bucket]++;
      bucketMesh.setMatrixAt(slot, dummy.matrix);
      bucketMesh.setColorAt(slot, color);

      spearDummy.position.copy(dummy.position);
      spearDummy.rotation.copy(dummy.rotation);
      spearDummy.scale.copy(dummy.scale);
      spearDummy.updateMatrix();
      spearMesh?.setMatrixAt(i, spearDummy.matrix);
    }

    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketMeshRefs.current[b]!;
      mesh.count = bucketCursors.current[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {bucketGeometries.map((geo, b) => (
        <instancedMesh
          key={b}
          ref={(el) => {
            bucketMeshRefs.current[b] = el;
          }}
          args={[geo, undefined, figures.length]}
          frustumCulled={false}
          castShadow={shadows}
        >
          <meshStandardMaterial vertexColors roughness={1} />
        </instancedMesh>
      ))}
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}

export function AbnerContingent({
  count,
  hillCount,
  shadows,
}: {
  count: number;
  hillCount: number;
  shadows: boolean;
}) {
  const figures = useMemo(
    () =>
      buildContingentFigures(
        count,
        Math.min(count, hillCount),
        buildIsraelBankSlots,
        buildAbnerSpreadSlots,
        330301,
        0.4,
      ),
    [count, hillCount],
  );
  return <ContingentInstances figures={figures} shadows={shadows} spearHand="handR" />;
}

export function JoabContingent({ count, shadows }: { count: number; shadows: boolean }) {
  const figures = useMemo(
    () => buildContingentFigures(count, 0, buildJudahBankSlots, buildJoabSpreadSlots, 330401, 0.1),
    [count],
  );
  return <ContingentInstances figures={figures} shadows={shadows} spearHand="handL" />;
}
