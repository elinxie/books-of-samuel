import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { HOUSEHOLD_CAMP_STRUCTURES } from './layout';

/**
 * The satellite household camp structures — "they lived in the towns of
 * Hebron" (2:3b), staged as a dispersed settling-in rather than a single
 * walled interior (new asset-household-camp). A simple ridge-shelter/lean
 * form (two sloped cloth panels over four poles), deliberately not asserted
 * as a specific excavated or ethnographically attested tent type — the
 * text gives no structural detail at all for this beat.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function makeShelterGeometry(): THREE.BufferGeometry {
  const panelL = new THREE.BoxGeometry(2.6, 0.05, 1.4);
  panelL.rotateX(0.6);
  panelL.translate(0, 1.0, -0.56);
  const panelR = new THREE.BoxGeometry(2.6, 0.05, 1.4);
  panelR.rotateX(-0.6);
  panelR.translate(0, 1.0, 0.56);
  const poleGeo = () => new THREE.CylinderGeometry(0.04, 0.045, 1.05, 5);
  const poles = [
    [1.2, 0.52, 1.0],
    [1.2, 0.52, -1.0],
    [-1.2, 0.52, 1.0],
    [-1.2, 0.52, -1.0],
  ].map(([x, y, z]) => {
    const g = poleGeo();
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries([panelL, panelR, ...poles]);
  merged.computeVertexNormals();
  return merged;
}

export function HouseholdCamp({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useRef<THREE.BufferGeometry>(makeShelterGeometry());

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(221001);
    for (let i = 0; i < HOUSEHOLD_CAMP_STRUCTURES.length; i++) {
      const s = HOUSEHOLD_CAMP_STRUCTURES[i];
      const y = terrain.heightAt(s.x, s.z);
      dummy.position.set(s.x, y, s.z);
      dummy.rotation.set(0, s.rot, 0);
      dummy.scale.setScalar(s.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.setHSL(0.09 + rng() * 0.03, 0.16 + rng() * 0.08, 0.44 + rng() * 0.12);
      mesh.setColorAt(i, tmpColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [terrain]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry.current, undefined, HOUSEHOLD_CAMP_STRUCTURES.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
