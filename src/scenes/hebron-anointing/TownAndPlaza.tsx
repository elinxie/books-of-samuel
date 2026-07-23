import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GATE_POSTS, TOWN_HOUSES } from './layout';

/**
 * Hebron itself: a modest hill-town cluster (claim-hebron-town-form,
 * asset-hebron-town-form) — no wall plan or gate-tower form asserted as
 * excavated, disclosed per the researcher gap (no dedicated Tell Rumeida
 * excavation-results source card exists yet). A simple two-post gate marks
 * the boundary between the town cluster and the open gate plaza where the
 * assembly gathers — a legibility marker, not a fortification claim. One
 * InstancedMesh per structural part (socle/wall/roof), mirroring
 * jabesh-burial's VillageHouses.tsx.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function TownAndPlaza({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const count = TOWN_HOUSES.length;

  const matrices = useMemo(() => {
    const rng = mulberry32(220901);
    const socle: THREE.Matrix4[] = [];
    const wall: THREE.Matrix4[] = [];
    const roof: THREE.Matrix4[] = [];
    const socleColor: THREE.Color[] = [];
    const wallColor: THREE.Color[] = [];
    const roofColor: THREE.Color[] = [];
    for (const h of TOWN_HOUSES) {
      const y = terrain.heightAt(h.x, h.z);

      dummy.position.set(h.x, y + 0.15, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w + 0.25, 0.3, h.d + 0.25);
      dummy.updateMatrix();
      socle.push(dummy.matrix.clone());
      tmpColor.setHSL(0.09, 0.06 + rng() * 0.03, 0.5 + rng() * 0.08);
      socleColor.push(tmpColor.clone());

      dummy.position.set(h.x, y + 0.3 + h.h / 2, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w, h.h, h.d);
      dummy.updateMatrix();
      wall.push(dummy.matrix.clone());
      tmpColor.setHSL(0.1, 0.18 + rng() * 0.06, 0.68 + rng() * 0.08); // pale limestone/mudbrick
      wallColor.push(tmpColor.clone());

      dummy.position.set(h.x, y + 0.3 + h.h + 0.1, h.z);
      dummy.rotation.set(0, h.rot, 0);
      dummy.scale.set(h.w + 0.4, 0.2, h.d + 0.4);
      dummy.updateMatrix();
      roof.push(dummy.matrix.clone());
      tmpColor.setHSL(0.09, 0.16 + rng() * 0.05, 0.6 + rng() * 0.07);
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

      {GATE_POSTS.map(([x, z], i) => {
        const y = terrain.heightAt(x, z);
        return (
          <mesh key={`gate-post-${i}`} position={[x, y + 1.4, z]} castShadow={shadows}>
            <boxGeometry args={[1.4, 2.8, 1.4]} />
            <meshStandardMaterial color="#9a8d76" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}
