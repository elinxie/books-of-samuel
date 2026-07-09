import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildArcherSlots,
  buildInfantrySlots,
  buildPhilistinePrincipalSlots,
  type FigureSlot,
} from './layout';

/**
 * The Philistine force (M3 Step 2): the archer element (1 Samuel 31:3 — a
 * distinct forward line climbing the northern slope), the pursuing infantry
 * mass behind/around it, and a small kit-differentiated principal cluster —
 * per the brief's "Focal masses" (b). One instanced mesh for the whole
 * press, grouped internally (same pattern as CampCrowd.tsx's
 * raider/attacker/captive groups), count/grouping/positioning only: bare/
 * generic dress this slice (claim-dress), no round shields, straight
 * swords, bows, or headdresses yet — those are a later military-kit step.
 */

export type PhilistineRole = 'archer' | 'infantry' | 'principal';

interface PhilistineFigure extends FigureSlot {
  role: PhilistineRole;
}

/** Deterministic Philistine-press roster: archers, infantry, then the small principal cluster. */
export function buildPhilistineFigures(
  archerCount: number,
  infantryCount: number,
  principalCount: number,
): PhilistineFigure[] {
  const archers = buildArcherSlots(archerCount).map((s) => ({ ...s, role: 'archer' as const }));
  const infantry = buildInfantrySlots(infantryCount).map((s) => ({
    ...s,
    role: 'infantry' as const,
  }));
  const principals = buildPhilistinePrincipalSlots(principalCount).map((s) => ({
    ...s,
    role: 'principal' as const,
  }));
  return [...archers, ...infantry, ...principals];
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
// A cooler, undyed-linen-leaning palette distinguishes the Philistine press
// from the Israelite crowd at a glance without asserting a documented
// "uniform" — the kit itself is a later, comparative/disputed step.
const PHILISTINE_PALETTE = ['#8f8a72', '#736f5c', '#a39c7e'];

export function PhilistinePress({
  archerCount,
  infantryCount,
  principalCount,
  shadows,
}: {
  archerCount: number;
  infantryCount: number;
  principalCount: number;
  shadows: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const figures = useMemo(
    () => buildPhilistineFigures(archerCount, infantryCount, principalCount),
    [archerCount, infantryCount, principalCount],
  );
  const terrain = useAppStore((s) => s.terrain);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(31007);
    const color = new THREE.Color();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.yaw, 0);
      // Principals stand marginally taller/set apart; otherwise uniform scale
      // this slice (kit differentiation, not scale, carries the distinction
      // once military kit lands).
      dummy.scale.setScalar(fig.role === 'principal' ? 1.04 : 0.95 + rng() * 0.1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(PHILISTINE_PALETTE[Math.floor(rng() * PHILISTINE_PALETTE.length)]);
      color.offsetHSL(0, 0, (rng() - 0.5) * 0.08);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [figures, terrain]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
