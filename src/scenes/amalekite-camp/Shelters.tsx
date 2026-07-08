import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { AWNING_SLOTS, HEAP_SLOTS, POST_SLOTS, WINDBREAK_SLOTS, type PropSlot } from './layout';

/**
 * Camp shelters and props, all static instanced meshes: low ridge-awnings
 * and brush windbreaks (deliberately NOT goat-hair tents — the classic
 * bedouin form is not securely attested this early; claim-camp-shelters,
 * asset-camp-shelter-placeholder), plus spoil heaps and tether posts
 * (claim-camp-sprawl, asset-camp-props).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function makeAwningGeometry(): THREE.BufferGeometry {
  // Low ridge-awning: two sloped cloth panels over four poles.
  const panelL = new THREE.BoxGeometry(3.0, 0.05, 1.55);
  panelL.rotateX(0.62);
  panelL.translate(0, 1.12, -0.62);
  const panelR = new THREE.BoxGeometry(3.0, 0.05, 1.55);
  panelR.rotateX(-0.62);
  panelR.translate(0, 1.12, 0.62);
  const poleGeo = () => new THREE.CylinderGeometry(0.045, 0.05, 1.15, 5);
  const poles = [
    [1.35, 0.58, 1.1],
    [1.35, 0.58, -1.1],
    [-1.35, 0.58, 1.1],
    [-1.35, 0.58, -1.1],
  ].map(([x, y, z]) => {
    const g = poleGeo();
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries([panelL, panelR, ...poles]);
  merged.computeVertexNormals();
  return merged;
}

/** Places one static instanced mesh from prop slots with per-instance color. */
function useStaticPlacement(
  ref: React.RefObject<THREE.InstancedMesh | null>,
  slots: PropSlot[],
  seed: number,
  yOffset: number,
  colorFn: (rng: () => number, c: THREE.Color) => void,
  flatten = false,
) {
  const terrain = useAppStore((s) => s.terrain);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const rng = mulberry32(seed);
    for (let i = 0; i < slots.length; i++) {
      const s = slots[i];
      dummy.position.set(s.x, terrain.heightAt(s.x, s.z) + yOffset * s.scale, s.z);
      dummy.rotation.set(0, s.yaw, 0);
      if (flatten) dummy.scale.set(s.scale * 1.15, s.scale * 0.5, s.scale);
      else dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      colorFn(rng, tmpColor);
      mesh.setColorAt(i, tmpColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [ref, slots, seed, yOffset, colorFn, flatten, terrain]);
}

const awningColor = (rng: () => number, c: THREE.Color) =>
  c.setHSL(0.09 + rng() * 0.03, 0.18 + rng() * 0.1, 0.5 + rng() * 0.12);
const windbreakColor = (rng: () => number, c: THREE.Color) =>
  c.setHSL(0.1 + rng() * 0.04, 0.22 + rng() * 0.08, 0.3 + rng() * 0.08);
const heapColor = (rng: () => number, c: THREE.Color) => {
  // Mostly earth-toned goods; occasional muted dyed cloth in the loot.
  const roll = rng();
  if (roll < 0.15) c.setHSL(0.02, 0.35, 0.32 + rng() * 0.06);
  else if (roll < 0.28) c.setHSL(0.62, 0.18, 0.32 + rng() * 0.06);
  else c.setHSL(0.08 + rng() * 0.04, 0.25, 0.4 + rng() * 0.14);
};
const postColor = (rng: () => number, c: THREE.Color) => c.setHSL(0.08, 0.25, 0.26 + rng() * 0.08);

export function Shelters({ shadows }: { shadows: boolean }) {
  const awningRef = useRef<THREE.InstancedMesh>(null);
  const windbreakRef = useRef<THREE.InstancedMesh>(null);
  const heapRef = useRef<THREE.InstancedMesh>(null);
  const postRef = useRef<THREE.InstancedMesh>(null);
  const awningGeo = useMemo(() => makeAwningGeometry(), []);

  useStaticPlacement(awningRef, AWNING_SLOTS, 4411, 0, awningColor);
  useStaticPlacement(windbreakRef, WINDBREAK_SLOTS, 4413, 0.5, windbreakColor);
  useStaticPlacement(heapRef, HEAP_SLOTS, 4417, 0.28, heapColor, true);
  useStaticPlacement(postRef, POST_SLOTS, 4419, 0.5, postColor);

  return (
    <group>
      <instancedMesh
        ref={awningRef}
        args={[awningGeo, undefined, AWNING_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh
        ref={windbreakRef}
        args={[undefined, undefined, WINDBREAK_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        {/* Brush windbreak: an open arc, low to the ground */}
        <cylinderGeometry args={[1.7, 1.8, 1.05, 9, 1, true, 0, 2.3]} />
        <meshStandardMaterial roughness={1} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh
        ref={heapRef}
        args={[undefined, undefined, HEAP_SLOTS.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={postRef}
        args={[undefined, undefined, POST_SLOTS.length]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.05, 0.06, 1.0, 5]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
    </group>
  );
}
