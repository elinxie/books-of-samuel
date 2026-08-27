import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  jointPositions,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { COLUMN_GATHER_SLOTS, COLUMN_SETTLE_SLOTS } from './layout';
import { routeTravelPose, T_MUSIC, type RouteTravelSpec } from './poses';

/**
 * The marching column (`claim-ark-procession-cast-scale`): a disclosed
 * representative gathering (~150-200 at high tier) standing for "all the
 * chosen men of Israel, thirty thousand" (6:1) — not a literal muster and
 * not a fixed ratio of it, the same departure `claim-judah-assembly-scale`
 * already established. A visible musician subset (~10-15, drawn from this
 * total, not additional) carries generic disclosed-placeholder instrument
 * forms — lyre/harp-type, frame drum, hand rattles/castanets, small cymbals
 * (6:5, `claim-music-instruments`) — the project's first extended
 * depiction of Israelite music. Every figure rides the same shared
 * `routeTravelPose` (poses.ts) with its own lane offset and stagger — no
 * per-figure independent pathing, the hebron-gate/rephaim-valley procession
 * pattern.
 */

const GENERIC_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export type InstrumentKit = 'none' | 'lyre' | 'drum' | 'rattle' | 'cymbals';

export interface ColumnFigure extends RouteTravelSpec {
  scale: number;
  color: THREE.Color;
  kit: InstrumentKit;
}

/** Deterministic roster: gather/settle slots paired by index (a continuous
 * walk from one pool to the other, the mourning-assembly convention), a
 * per-figure lane offset and stagger, and a musician subset scattered
 * through the crowd rather than clustered at the roster's start. */
export function buildColumnFigures(
  count: number,
  musicianCount: number,
  seed = 260701,
): ColumnFigure[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 400);
  const kitOrder = Array.from({ length: count }, (_, i) => i);
  for (let i = kitOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [kitOrder[i], kitOrder[j]] = [kitOrder[j], kitOrder[i]];
  }
  const musicianIndices = new Set(kitOrder.slice(0, Math.min(musicianCount, count)));
  const kits: InstrumentKit[] = ['lyre', 'drum', 'rattle', 'cymbals'];

  const color = new THREE.Color();
  const out: ColumnFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      gather: COLUMN_GATHER_SLOTS[i % COLUMN_GATHER_SLOTS.length],
      entryStart: T_MUSIC + rng() * 4,
      entryDur: 4,
      laneOffset: (rng() - 0.5) * 46,
      settle: COLUMN_SETTLE_SLOTS[i % COLUMN_SETTLE_SLOTS.length],
      scale: 0.94 + paletteRng() * 0.12,
      color: color.clone(),
      kit: musicianIndices.has(i) ? kits[i % kits.length] : 'none',
    });
  }
  return out;
}

const CROWD_KIT_STATURE = 1.7;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** A small lyre/harp-type stringed instrument silhouette — generic disclosed
 * placeholder, no specific construction/tuning/decoration asserted. */
function buildLyreGeometry(): THREE.BufferGeometry {
  const grip = jointPositions(CROWD_KIT_STATURE).handL;
  const armGeo = () => new THREE.CylinderGeometry(0.012, 0.016, 0.32, 5);
  const parts: THREE.BufferGeometry[] = [];
  for (const side of [-1, 1]) {
    const arm = armGeo();
    arm.rotateZ(side * 0.5);
    arm.translate(side * 0.09, 0.15, 0);
    parts.push(arm);
  }
  const crossbar = new THREE.CylinderGeometry(0.01, 0.01, 0.22, 5);
  crossbar.rotateX(Math.PI / 2);
  crossbar.translate(0, 0.29, 0);
  parts.push(crossbar);
  const soundbox = new THREE.BoxGeometry(0.16, 0.14, 0.06);
  soundbox.translate(0, 0.02, 0);
  parts.push(soundbox);
  const lyre = mergeParts(parts);
  lyre.rotateX(-0.3);
  lyre.translate(grip.x, grip.y, grip.z + 0.1);
  return lyre;
}

/** A frame drum, held up near shoulder height. */
function buildDrumGeometry(): THREE.BufferGeometry {
  const grip = jointPositions(CROWD_KIT_STATURE).handR;
  const drum = new THREE.CylinderGeometry(0.14, 0.14, 0.035, 16);
  drum.rotateZ(Math.PI / 2);
  drum.translate(grip.x - 0.05, grip.y + 0.1, grip.z + 0.08);
  return drum;
}

/** A pair of small hand rattles/castanets near both hands. */
function buildRattleGeometry(): THREE.BufferGeometry {
  const j = jointPositions(CROWD_KIT_STATURE);
  const parts: THREE.BufferGeometry[] = [];
  for (const hand of [j.handL, j.handR]) {
    const rattle = new THREE.SphereGeometry(0.045, 6, 5);
    rattle.scale(1, 0.6, 0.8);
    rattle.translate(hand.x, hand.y + 0.03, hand.z + 0.04);
    parts.push(rattle);
  }
  return mergeParts(parts);
}

/** A small pair of cymbals, held together near the chest. */
function buildCymbalsGeometry(): THREE.BufferGeometry {
  const j = jointPositions(CROWD_KIT_STATURE);
  const parts: THREE.BufferGeometry[] = [];
  for (const [hand, sign] of [
    [j.handL, -1],
    [j.handR, 1],
  ] as const) {
    const disc = new THREE.CylinderGeometry(0.075, 0.075, 0.018, 12);
    disc.rotateX(Math.PI / 2 + sign * 0.12);
    disc.translate(hand.x, hand.y + 0.16, hand.z + 0.1);
    parts.push(disc);
  }
  return mergeParts(parts);
}

const dummy = new THREE.Object3D();
const HIDDEN_MATRIX = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -1000, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function ProcessionColumn({
  count,
  musicianCount,
  shadows,
}: {
  count: number;
  musicianCount: number;
  shadows: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lyreMeshRef = useRef<THREE.InstancedMesh>(null);
  const drumMeshRef = useRef<THREE.InstancedMesh>(null);
  const rattleMeshRef = useRef<THREE.InstancedMesh>(null);
  const cymbalsMeshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PARAMS), []);
  const lyreGeo = useMemo(() => buildLyreGeometry(), []);
  const drumGeo = useMemo(() => buildDrumGeometry(), []);
  const rattleGeo = useMemo(() => buildRattleGeometry(), []);
  const cymbalsGeo = useMemo(() => buildCymbalsGeometry(), []);
  const figures = useMemo(() => buildColumnFigures(count, musicianCount), [count, musicianCount]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const lyreMesh = lyreMeshRef.current;
    const drumMesh = drumMeshRef.current;
    const rattleMesh = rattleMeshRef.current;
    const cymbalsMesh = cymbalsMeshRef.current;

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = routeTravelPose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      const bob = pose.moving ? Math.abs(Math.sin(t * 3.4 + i)) * 0.04 : 0;
      dummy.position.set(pose.x, y + bob, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      lyreMesh?.setMatrixAt(i, fig.kit === 'lyre' ? dummy.matrix : HIDDEN_MATRIX);
      drumMesh?.setMatrixAt(i, fig.kit === 'drum' ? dummy.matrix : HIDDEN_MATRIX);
      rattleMesh?.setMatrixAt(i, fig.kit === 'rattle' ? dummy.matrix : HIDDEN_MATRIX);
      cymbalsMesh?.setMatrixAt(i, fig.kit === 'cymbals' ? dummy.matrix : HIDDEN_MATRIX);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (lyreMesh) lyreMesh.instanceMatrix.needsUpdate = true;
    if (drumMesh) drumMesh.instanceMatrix.needsUpdate = true;
    if (rattleMesh) rattleMesh.instanceMatrix.needsUpdate = true;
    if (cymbalsMesh) cymbalsMesh.instanceMatrix.needsUpdate = true;
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
        ref={lyreMeshRef}
        args={[lyreGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6b4a2a" roughness={0.8} />
      </instancedMesh>
      <instancedMesh
        ref={drumMeshRef}
        args={[drumGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#c9b285" roughness={0.85} />
      </instancedMesh>
      <instancedMesh
        ref={rattleMeshRef}
        args={[rattleGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a7250" roughness={0.7} />
      </instancedMesh>
      <instancedMesh
        ref={cymbalsMeshRef}
        args={[cymbalsGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#b5924a" roughness={0.4} metalness={0.5} />
      </instancedMesh>
    </group>
  );
}
