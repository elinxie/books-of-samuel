import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GATE_TOWERS, WALL_HEIGHT, WALL_SEGMENTS } from './layout';

/**
 * The wall above the gate plaza (claim-beth-shan-wall, asset-beth-shan-wall)
 * — a modest mudbrick-on-stone perimeter belt with two flanking gate towers,
 * rendered as narrated and disclosed as archaeologically thin (never an
 * excavated-verified fortification). One instanced mesh per part family
 * (stone socle, mudbrick upper course), per-instance material jitter via
 * vertex color rather than per-mesh materials (Ziklag precedent).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function WallAndGate({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const count = WALL_SEGMENTS.length;

  const matrices = useMemo(() => {
    const rng = mulberry32(65501);
    const socle: THREE.Matrix4[] = [];
    const upper: THREE.Matrix4[] = [];
    const socleColor: THREE.Color[] = [];
    const upperColor: THREE.Color[] = [];
    for (const w of WALL_SEGMENTS) {
      const y = terrain.heightAt(w.x, w.z);
      const h = WALL_HEIGHT * (0.85 + rng() * 0.3);

      dummy.position.set(w.x, y + 0.5, w.z);
      dummy.rotation.set(0, w.rot, 0);
      dummy.scale.set(w.len, 1, 1.3);
      dummy.updateMatrix();
      socle.push(dummy.matrix.clone());
      tmpColor.setHSL(0.08, 0.05 + rng() * 0.03, 0.48 + rng() * 0.08);
      socleColor.push(tmpColor.clone());

      dummy.position.set(w.x, y + 1 + (h - 1) / 2, w.z);
      dummy.rotation.set(0, w.rot, 0);
      dummy.scale.set(w.len, h - 1, 1.0);
      dummy.updateMatrix();
      upper.push(dummy.matrix.clone());
      tmpColor.setHSL(0.1, 0.2 + rng() * 0.06, 0.62 + rng() * 0.08);
      upperColor.push(tmpColor.clone());
    }
    return { socle, upper, socleColor, upperColor };
  }, [terrain]);

  const towerMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#9a8a68', roughness: 0.95 }),
    [],
  );

  return (
    <group>
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          matrices.socle.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.socleColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
        args={[undefined, undefined, count]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          matrices.upper.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.upperColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
        args={[undefined, undefined, count]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.92} />
      </instancedMesh>

      {GATE_TOWERS.map(([x, z], i) => {
        const y = terrain.heightAt(x, z);
        return (
          <mesh
            key={`tower-${i}`}
            position={[x, y + (WALL_HEIGHT + 1.2) / 2, z]}
            material={towerMaterial}
            castShadow={shadows}
            receiveShadow
          >
            <boxGeometry args={[3, WALL_HEIGHT + 1.2, 3]} />
          </mesh>
        );
      })}
    </group>
  );
}
