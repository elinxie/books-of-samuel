import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * The pool of Hebron (`claim-hebron-pool-feature`, `asset-hebron-pool-basin`,
 * `asset-hebron-pool-water`): a flat, minimally-lit water plane over the
 * basin depression `terrain.ts` carves — the exact `gibeon-pool` convention
 * (no reflection/refraction shader) at a modest, disclosed scale. A handful
 * of static boulders mark the rim, the same primitive-boulder language
 * `TombGround.tsx` uses, for legibility only — not a claim about any
 * specific installation form. Nothing here renders the hands-and-feet
 * display (4:12a) — that fact is caption-only, absolutely, per ADR-009's
 * dismemberment bar; only the pool itself renders.
 */
export function PoolGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const [px, pz] = POOL_CENTER;
  const waterY = useMemo(() => terrain.heightAt(px, pz) + 0.1, [terrain, px, pz]);

  const boulders = useMemo(
    () =>
      [
        { dx: -POOL_RADIUS - 1.2, dz: 1.5, s: 1.4, ry: 0.3 },
        { dx: POOL_RADIUS + 0.8, dz: -2.2, s: 1.7, ry: 1.4 },
        { dx: 2.4, dz: POOL_RADIUS + 1.4, s: 1.3, ry: 2.2 },
        { dx: -2.8, dz: -(POOL_RADIUS + 1.6), s: 1.5, ry: 3.0 },
      ] as const,
    [],
  );

  return (
    <group>
      <mesh position={[px, waterY, pz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[POOL_RADIUS * 0.82, 40]} />
        <meshStandardMaterial color="#3c5a5e" roughness={0.55} metalness={0} />
      </mesh>
      {boulders.map((b, i) => {
        const bx = px + b.dx;
        const bz = pz + b.dz;
        const by = terrain.heightAt(bx, bz);
        return (
          <mesh
            key={`pool-boulder-${i}`}
            position={[bx, by + b.s * 0.4, bz]}
            rotation={[0.1, b.ry, 0.08]}
            scale={[b.s, b.s * 0.8, b.s * 0.9]}
            castShadow={shadows}
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#a89778" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}
