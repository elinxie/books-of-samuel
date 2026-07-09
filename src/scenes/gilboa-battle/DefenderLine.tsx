import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildDefenderSlots, type FigureSlot } from './layout';
import { defenderClashPose, defenderFallPose } from './poses';
import { buildShieldGeometry, buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Israel's defensive line (`claim-line-defense`, `b-line-clash`): a rank
 * holding ground short of the crest, engaging the facing Philistine press
 * directly (`EngagedPhilistines.tsx` mirrors this on the Philistine side)
 * before the position gives way into the existing rout at `T_ROUT`. Reuses
 * the routing-Israelites capsule figure look and the principal spear/oval-
 * shield kit (`claim-israelite-muster-kit`) rather than inventing a new
 * figure system for this group.
 */

export interface DefenderFigureState extends FigureSlot {
  phaseOffset: number;
  falls: boolean;
  fallDelay: number;
  scale: number;
  color: THREE.Color;
}

export function buildDefenderFigures(count: number, seed = 31006): DefenderFigureState[] {
  const slots = buildDefenderSlots(count, seed);
  const rng = mulberry32(seed + 700);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();
  return slots.map((slot) => {
    color.set(TUNIC_PALETTE[Math.floor(paletteRng() * TUNIC_PALETTE.length)]);
    color.offsetHSL(0, 0, (paletteRng() - 0.5) * 0.08);
    return {
      ...slot,
      phaseOffset: rng(),
      // A minority of the line goes down as the position breaks — the
      // majority hold and transition into the (separately rendered) rout.
      falls: rng() < 0.3,
      fallDelay: rng() * 4,
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    };
  });
}

function makeFigureGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 1.0, 4, 8);
  body.translate(0, 0.86, 0);
  const head = new THREE.SphereGeometry(0.15, 8, 6);
  head.translate(0, 1.68, 0);
  const merged = mergeGeometries([body, head]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function DefenderLine({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'), []);
  const figures = useMemo(() => buildDefenderFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const clash = defenderClashPose(t, fig.phaseOffset);
      const fall = defenderFallPose(t, violenceMode, fig.falls, fig.fallDelay);
      // Body: a forward/back lean on the swing beat, a small twist on the
      // stagger reaction, settling into the same collapse transform the
      // rest of the scene's fall poses use (rotation + squash, never a new
      // mesh or wound geometry).
      const lean = clash.swing * 0.22 - fall.fallen * 1.35;
      const twist = fig.yaw + clash.stagger * 0.35;
      const y = terrain.heightAt(fig.x, fig.z) - fall.fallen * 0.12;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(lean, twist, 0);
      const squash = 1 - fall.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      // Weapon rides the same position/twist but with an exaggerated swing
      // extension so the spear itself reads as thrusting/withdrawing —
      // independent of the body's smaller lean, without a full limb rig.
      const weaponSwing = clash.swing * 0.55;
      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.set(lean + weaponSwing, twist, 0);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      spearMesh?.setMatrixAt(i, weaponDummy.matrix);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
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
    </group>
  );
}
