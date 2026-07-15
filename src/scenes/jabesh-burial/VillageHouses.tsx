import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { HOUSES } from './layout';

/**
 * A small open, unwalled hamlet cluster (claim-jabesh-town-form,
 * asset-village-cluster) — 8-12 loosely scattered mudbrick houses around a
 * clear central yard, no wall, no lanes. A different settlement form from
 * both Ziklag's enclosed ring and Beth-shan's dense summit quarter, per
 * ADR-006's per-scene layout rider. One InstancedMesh per structural part
 * (socle/wall/roof).
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function VillageHouses({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const count = HOUSES.length;

  const matrices = useMemo(() => {
    const rng = mulberry32(71301);
    const socle: THREE.Matrix4[] = [];
    const wall: THREE.Matrix4[] = [];
    const roof: THREE.Matrix4[] = [];
    const socleColor: THREE.Color[] = [];
    const wallColor: THREE.Color[] = [];
    const roofColor: THREE.Color[] = [];
    for (const h of HOUSES) {
      const y = terrain.heightAt(h.x, h.z);

      dummy.position.set(h.x, y + 0.15, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w + 0.25, 0.3, h.d + 0.25);
      dummy.updateMatrix();
      socle.push(dummy.matrix.clone());
      tmpColor.setHSL(0.09, 0.05 + rng() * 0.03, 0.48 + rng() * 0.08);
      socleColor.push(tmpColor.clone());

      dummy.position.set(h.x, y + 0.3 + h.h / 2, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w, h.h, h.d);
      dummy.updateMatrix();
      wall.push(dummy.matrix.clone());
      tmpColor.setHSL(0.1, 0.2 + rng() * 0.06, 0.66 + rng() * 0.08); // pale mudbrick
      wallColor.push(tmpColor.clone());

      dummy.position.set(h.x, y + 0.3 + h.h + 0.1, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w + 0.4, 0.2, h.d + 0.4);
      dummy.updateMatrix();
      roof.push(dummy.matrix.clone());
      tmpColor.setHSL(0.09, 0.18 + rng() * 0.05, 0.58 + rng() * 0.07);
      roofColor.push(tmpColor.clone());
    }
    return { socle, wall, roof, socleColor, wallColor, roofColor };
  }, [terrain]);

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
          matrices.wall.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.wallColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
        args={[undefined, undefined, count]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.95} />
      </instancedMesh>
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          matrices.roof.forEach((m, i) => el.setMatrixAt(i, m));
          matrices.roofColor.forEach((c, i) => el.setColorAt(i, c));
          el.instanceMatrix.needsUpdate = true;
          if (el.instanceColor) el.instanceColor.needsUpdate = true;
        }}
        args={[undefined, undefined, count]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
