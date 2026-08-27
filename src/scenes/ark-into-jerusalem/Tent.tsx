import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { TENT_HEIGHT, TENT_POS, TENT_RADIUS } from './layout';

/**
 * The tent David pitched for the ark (2 Samuel 6:17, `claim-ark-tent-form`)
 * — a simple woven/leather tent form, modest and not monumental, at the
 * enclosure's own central ground. **Explicitly not the tabernacle at
 * Gibeon**: 1 Chronicles 16:39 states the tabernacle and its altar remained
 * at Gibeon at this time, a different structure in a different text — this
 * geometry never stands in for it and nothing here implies it is present in
 * Jerusalem. A disclosed placeholder form: a low conical/pyramidal canopy
 * over four corner poles, simple merged-primitive geometry, no woven-pattern
 * texture or specific ancient Near Eastern tent typology asserted.
 */

function buildTentGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const canopy = new THREE.ConeGeometry(TENT_RADIUS * 1.15, TENT_HEIGHT * 0.85, 8, 1, true);
  canopy.translate(0, TENT_HEIGHT * 0.58, 0);
  parts.push(canopy);

  const skirt = new THREE.CylinderGeometry(
    TENT_RADIUS * 1.18,
    TENT_RADIUS * 1.28,
    TENT_HEIGHT * 0.28,
    8,
    1,
    true,
  );
  skirt.translate(0, TENT_HEIGHT * 0.14, 0);
  parts.push(skirt);

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const pole = new THREE.CylinderGeometry(0.05, 0.06, TENT_HEIGHT * 1.05, 6);
    pole.translate(
      Math.cos(angle) * TENT_RADIUS * 0.92,
      (TENT_HEIGHT * 1.05) / 2,
      Math.sin(angle) * TENT_RADIUS * 0.92,
    );
    parts.push(pole);
  }

  const centerPole = new THREE.CylinderGeometry(0.07, 0.08, TENT_HEIGHT * 1.15, 6);
  centerPole.translate(0, (TENT_HEIGHT * 1.15) / 2, 0);
  parts.push(centerPole);

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export function Tent({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const geometry = useMemo(() => buildTentGeometry(), []);
  const y = terrain.heightAt(TENT_POS[0], TENT_POS[1]);

  return (
    <mesh
      position={[TENT_POS[0], y, TENT_POS[1]]}
      geometry={geometry}
      castShadow={shadows}
      receiveShadow
    >
      <meshStandardMaterial color="#8a6c46" roughness={0.92} side={THREE.DoubleSide} />
    </mesh>
  );
}
