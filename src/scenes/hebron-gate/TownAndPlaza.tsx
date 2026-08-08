import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TOWN_HOUSES } from './layout';

/**
 * Hebron's houses, reused unchanged from hebron-anointing (mandatory visual
 * continuity — `TOWN_HOUSES` is imported by reference via this scene's own
 * layout.ts, so the massing is pixel-identical across all three Hebron M5
 * scenes). Unlike hebron-anointing's/hebron-covenant's own TownAndPlaza,
 * this component does not render the simple two-post gate marker at the
 * same spot — `GatePassage.tsx` renders this scene's one new structure, the
 * fuller two-chamber gate passage, there instead.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function TownAndPlaza({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const count = TOWN_HOUSES.length;

  const matrices = useMemo(() => {
    const rng = mulberry32(240901);
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
      tmpColor.setHSL(0.1, 0.18 + rng() * 0.06, 0.68 + rng() * 0.08);
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
    </group>
  );
}
