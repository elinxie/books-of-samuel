import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { MONUMENTS } from './layout';

/**
 * Curated Egyptian monuments near the summit (claim-egyptian-monuments,
 * asset-egyptian-monuments) — a weathered stela slab and an abstract statue
 * block. Additive, not load-bearing: strongest "this is a real place with a
 * real past" detail available, but the curated-into-Iron-I reading needs
 * page-verification before this scene ships released (queue #16). Kept
 * deliberately abstract (no facial/anatomical detail on the statue block) at
 * this placeholder fidelity.
 */
export function Monuments({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#5b5a52', roughness: 0.9 }),
    [],
  );

  return (
    <group>
      {MONUMENTS.map((m, i) => {
        const y = terrain.heightAt(m.x, m.z);
        if (m.kind === 'stela') {
          return (
            <mesh
              key={`monument-${i}`}
              position={[m.x, y + 1.1, m.z]}
              rotation={[0.03, i * 0.4, 0.02]}
              material={material}
              castShadow={shadows}
              receiveShadow
            >
              <boxGeometry args={[0.7, 2.2, 0.28]} />
            </mesh>
          );
        }
        return (
          <group key={`monument-${i}`} position={[m.x, y, m.z]}>
            <mesh position={[0, 0.3, 0]} material={material} castShadow={shadows} receiveShadow>
              <cylinderGeometry args={[0.55, 0.65, 0.6, 8]} />
            </mesh>
            <mesh position={[0, 1.15, 0]} material={material} castShadow={shadows}>
              <capsuleGeometry args={[0.32, 1.1, 4, 8]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
