import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  ABNER_FEAST_CLUSTER_CENTER,
  DAVID_FEAST_CLUSTER_CENTER,
  FEAST_GROUND_CENTER,
} from './layout';

/**
 * The feast dressing (`asset-feast-props`, `claim-feast-form`): low mats and
 * a handful of shared vessels between the two facing groups — the only new
 * prop family this scene needs (per the brief's "Performance target"). "The
 * text says only 'David made Abner and the men who were with him a feast'
 * (3:20) — no hall, no throne room, no palace"; staged as a modest, disclosed
 * open-air arrangement, not a reconstruction of any excavated banquet form.
 * Static geometry throughout (no time-gating) — the meal is already
 * prepared when the scene opens, per the text's own phrasing.
 */

const MAT_COUNT = 10;
const VESSEL_COUNT = 8;

const dummy = new THREE.Object3D();

export function FeastGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);

  const mats = useMemo(() => {
    const rng = mulberry32(43301);
    const out: { x: number; z: number; rot: number; w: number; d: number }[] = [];
    const centers = [ABNER_FEAST_CLUSTER_CENTER, DAVID_FEAST_CLUSTER_CENTER, FEAST_GROUND_CENTER];
    for (let i = 0; i < MAT_COUNT; i++) {
      const [cx, cz] = centers[i % centers.length];
      const angle = rng() * Math.PI * 2;
      const r = 2 + rng() * 9;
      out.push({
        x: cx + Math.cos(angle) * r,
        z: cz + Math.sin(angle) * r,
        rot: rng() * Math.PI,
        w: 1.6 + rng() * 0.6,
        d: 1.0 + rng() * 0.4,
      });
    }
    return out;
  }, []);

  const vessels = useMemo(() => {
    const rng = mulberry32(43302);
    const out: { x: number; z: number; s: number }[] = [];
    for (let i = 0; i < VESSEL_COUNT; i++) {
      const angle = rng() * Math.PI * 2;
      const r = 1 + rng() * 6;
      out.push({
        x: FEAST_GROUND_CENTER[0] + Math.cos(angle) * r,
        z: FEAST_GROUND_CENTER[1] + Math.sin(angle) * r,
        s: 0.7 + rng() * 0.5,
      });
    }
    return out;
  }, []);

  const matMatrices = useMemo(() => {
    return mats.map((m) => {
      const y = terrain.heightAt(m.x, m.z);
      dummy.position.set(m.x, y + 0.03, m.z);
      dummy.rotation.set(0, m.rot, 0);
      dummy.scale.set(m.w, 0.05, m.d);
      dummy.updateMatrix();
      return dummy.matrix.clone();
    });
  }, [mats, terrain]);

  const vesselMatrices = useMemo(() => {
    return vessels.map((v) => {
      const y = terrain.heightAt(v.x, v.z);
      dummy.position.set(v.x, y + 0.14 * v.s, v.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(v.s);
      dummy.updateMatrix();
      return dummy.matrix.clone();
    });
  }, [vessels, terrain]);

  return (
    <group>
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          matMatrices.forEach((m, i) => el.setMatrixAt(i, m));
          el.instanceMatrix.needsUpdate = true;
        }}
        args={[undefined, undefined, matMatrices.length]}
        frustumCulled={false}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8c6a3e" roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          vesselMatrices.forEach((m, i) => el.setMatrixAt(i, m));
          el.instanceMatrix.needsUpdate = true;
        }}
        args={[undefined, undefined, vesselMatrices.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.16, 0.22, 0.28, 8]} />
        <meshStandardMaterial color="#a9724a" roughness={0.75} />
      </instancedMesh>
    </group>
  );
}
