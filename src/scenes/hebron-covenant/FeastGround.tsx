import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { FEAST_PROPS } from './layout';

/**
 * The feast dressing (new asset-feast-props, claim-feast-form): low mats and
 * shared vessels at the feast ground. "David made Abner and the men who were
 * with him a feast" (3:20b) — the text gives no hall, no throne room, no
 * vessel form; a modest open-air meal is the disclosed staging choice, kept
 * consistent with hebron-anointing's town-form placeholder (no banquet-hall
 * architecture is introduced here). Two small instanced families (mats,
 * vessels), static — this is plaza dressing, not a per-frame animated prop.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function FeastGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.InstancedMesh>(null);
  const vesselRef = useRef<THREE.InstancedMesh>(null);

  const mats = FEAST_PROPS.filter((p) => p.kind === 'mat');
  const vessels = FEAST_PROPS.filter((p) => p.kind === 'vessel');

  useEffect(() => {
    const rng = mulberry32(230601);
    const matMesh = matRef.current;
    if (matMesh) {
      for (let i = 0; i < mats.length; i++) {
        const p = mats[i];
        const y = terrain.heightAt(p.x, p.z);
        dummy.position.set(p.x, y + 0.03, p.z);
        dummy.rotation.set(0, p.rot, 0);
        dummy.scale.set(3.2 + rng() * 1.1, 0.06, 1.6 + rng() * 0.5);
        dummy.updateMatrix();
        matMesh.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.09, 0.22 + rng() * 0.08, 0.4 + rng() * 0.1);
        matMesh.setColorAt(i, tmpColor);
      }
      matMesh.instanceMatrix.needsUpdate = true;
      if (matMesh.instanceColor) matMesh.instanceColor.needsUpdate = true;
    }

    const vesselMesh = vesselRef.current;
    if (vesselMesh) {
      for (let i = 0; i < vessels.length; i++) {
        const p = vessels[i];
        const y = terrain.heightAt(p.x, p.z);
        const s = 0.16 + rng() * 0.08;
        dummy.position.set(p.x, y + s * 0.5, p.z);
        dummy.rotation.set(0, p.rot, 0);
        dummy.scale.set(s, s * (0.8 + rng() * 0.5), s);
        dummy.updateMatrix();
        vesselMesh.setMatrixAt(i, dummy.matrix);
        tmpColor.setHSL(0.08, 0.15 + rng() * 0.08, 0.34 + rng() * 0.14);
        vesselMesh.setColorAt(i, tmpColor);
      }
      vesselMesh.instanceMatrix.needsUpdate = true;
      if (vesselMesh.instanceColor) vesselMesh.instanceColor.needsUpdate = true;
    }
  }, [mats, vessels, terrain]);

  return (
    <group>
      <instancedMesh
        ref={matRef}
        args={[undefined, undefined, Math.max(1, mats.length)]}
        frustumCulled={false}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={vesselRef}
        args={[undefined, undefined, Math.max(1, vessels.length)]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.5, 0.6, 1, 8]} />
        <meshStandardMaterial vertexColors roughness={0.7} />
      </instancedMesh>
    </group>
  );
}
