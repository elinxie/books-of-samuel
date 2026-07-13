import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildCrowdLimbedGeometry, type CharacterParams } from '../../engine/characters';
import {
  buildArcherSlots,
  buildInfantrySlots,
  buildPhilistinePrincipalSlots,
  type FigureSlot,
} from './layout';
import { archerDrawPose } from './poses';
import {
  buildBowGeometry,
  buildHeaddressGeometry,
  buildShieldGeometry,
  buildStraightSwordGeometry,
  CROWD_KIT_STATURE,
} from './kitMeshes';

/**
 * The Philistine force (M3 Step 2): the archer element (1 Samuel 31:3 — a
 * distinct forward line climbing the northern slope), the pursuing infantry
 * mass behind/around it, and a small kit-differentiated principal cluster —
 * per the brief's "Focal masses" (b). One instanced mesh for the whole
 * press, grouped internally (same pattern as CampCrowd.tsx's
 * raider/attacker/captive groups).
 *
 * M3 Step 4 adds the Philistine kit profile (`claim-philistine-kit`): the
 * archer element gets a bow only; infantry gets a round shield + straight
 * sword; the small kit-differentiated principal cluster additionally gets
 * the plumed headdress (Medinet Habu "Sea Peoples" marker — principal-tier
 * ONLY, never crowd/infantry/archer, behind the dispute label carried on
 * `claim-philistine-kit`'s `scholarlyViews`; see
 * docs/fable-review-queue.md item #13, which stays open). Since
 * `buildPhilistineFigures` orders the roster archers-then-infantry-then-
 * principals, each kit InstancedMesh is sized to exactly its role's count
 * and indexed by a fixed arithmetic offset — no hidden/off-scene instances
 * needed here (contrast CrestRetinue.tsx's non-uniform per-figure kit).
 *
 * The archer-volley beat (`b-archers`, `ArrowVolley.tsx`) adds a small
 * per-frame lean on just the archer subset (indices `[0, archerCount)`),
 * driven by `archerDrawPose` in `./poses.ts`: a whole-figure draw/release
 * tilt, synchronized to the volley waves — a gesture/orientation change on
 * the existing static bow-holding pose, never new geometry. Only the archer
 * indices are rewritten each frame; infantry/principal instances stay as set
 * once in the setup effect below.
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

const dummy = new THREE.Object3D();

/** A single generic crowd-tier Philistine preset — a static idle formation
 * needs no pose-bucket cycling, just one real limbed rest-pose geometry
 * instead of the old capsule blob. A cooler, undyed-linen-leaning tunic
 * distinguishes the Philistine press from the Israelite crowd at a glance
 * without asserting a documented "uniform" — the kit itself is a later,
 * comparative/disputed step. Per-instance variety still comes from
 * `mesh.setColorAt` tinting. */
const GENERIC_PHILISTINE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: '#8f8a72', beltColor: '#5a3722', headwear: 'bare' },
};

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
  const bowMeshRef = useRef<THREE.InstancedMesh>(null);
  const roundShieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const headdressMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PHILISTINE_PARAMS), []);
  const bowGeo = useMemo(() => buildBowGeometry(CROWD_KIT_STATURE, 'handL'), []);
  const roundShieldGeo = useMemo(
    () => buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'),
    [],
  );
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);
  const headdressGeo = useMemo(() => buildHeaddressGeometry(CROWD_KIT_STATURE), []);
  const figures = useMemo(
    () => buildPhilistineFigures(archerCount, infantryCount, principalCount),
    [archerCount, infantryCount, principalCount],
  );
  const meleeCount = infantryCount + principalCount;
  const terrain = useAppStore((s) => s.terrain);
  // Base (undrawn) transform for each archer, captured once so the
  // per-frame draw-lean pass doesn't need to recompute the roster's rng/
  // terrain sampling every frame — see the archer-volley useFrame below.
  const archerBaseRef = useRef<{ x: number; y: number; z: number; yaw: number; scale: number }[]>(
    [],
  );

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const bowMesh = bowMeshRef.current;
    const shieldMesh = roundShieldMeshRef.current;
    const swordMesh = swordMeshRef.current;
    const headdressMesh = headdressMeshRef.current;
    const rng = mulberry32(31007);
    const color = new THREE.Color();
    const archerBases: { x: number; y: number; z: number; yaw: number; scale: number }[] = [];
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(0, fig.yaw, 0);
      // Principals stand marginally taller/set apart; otherwise uniform scale.
      const scale = fig.role === 'principal' ? 1.04 : 0.95 + rng() * 0.1;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (fig.role === 'archer') {
        archerBases.push({ x: fig.x, y, z: fig.z, yaw: fig.yaw, scale });
      }
      // The body geometry now bakes its own tunic/skin vertex colors
      // (`buildCrowdLimbedGeometry`); this instance color multiplies
      // against those, so it stays a near-white brightness jitter rather
      // than a full hue pick (which would double-tint against the baked
      // colors).
      color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
      mesh.setColorAt(i, color);

      // Archers come first, then infantry, then the principal cluster
      // (see `buildPhilistineFigures`), so each role's kit index is a fixed
      // offset from `i` rather than a separate running counter.
      if (fig.role === 'archer') {
        bowMesh?.setMatrixAt(i, dummy.matrix);
      } else {
        const meleeIdx = i - archerCount;
        shieldMesh?.setMatrixAt(meleeIdx, dummy.matrix);
        swordMesh?.setMatrixAt(meleeIdx, dummy.matrix);
        if (fig.role === 'principal') {
          const principalIdx = i - archerCount - infantryCount;
          headdressMesh?.setMatrixAt(principalIdx, dummy.matrix);
        }
      }
    }
    archerBaseRef.current = archerBases;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (bowMesh) bowMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
    if (headdressMesh) headdressMesh.instanceMatrix.needsUpdate = true;
  }, [figures, terrain, archerCount, infantryCount]);

  // Archer-volley draw/release lean (`b-archers`): only the archer subset's
  // matrices are rewritten each frame — infantry/principal instances stay as
  // the setup effect above left them. Cheap: archerCount tops out around 30
  // even at the highest quality tier.
  useFrame(() => {
    const mesh = meshRef.current;
    const bowMesh = bowMeshRef.current;
    if (!mesh) return;
    const bases = archerBaseRef.current;
    if (bases.length === 0) return;
    const { timeSec: t } = useAppStore.getState();
    const { draw } = archerDrawPose(t);
    for (let i = 0; i < bases.length; i++) {
      const base = bases[i];
      dummy.position.set(base.x, base.y, base.z);
      // Leans back on the draw, snaps forward slightly through release —
      // a whole-figure gesture, never new bow/body geometry.
      dummy.rotation.set(draw * -0.18, base.yaw, 0);
      dummy.scale.setScalar(base.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      bowMesh?.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
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
        ref={bowMeshRef}
        args={[bowGeo, undefined, archerCount]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#5c4023" roughness={0.85} />
      </instancedMesh>
      <instancedMesh
        ref={roundShieldMeshRef}
        args={[roundShieldGeo, undefined, meleeCount]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6e5c3d" roughness={0.8} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, meleeCount]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.55} metalness={0.35} />
      </instancedMesh>
      <instancedMesh
        ref={headdressMeshRef}
        args={[headdressGeo, undefined, principalCount]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#c9b27a" roughness={0.8} />
      </instancedMesh>
    </group>
  );
}
