import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { GATE_APPROACH_CURVE } from './layout';
import { samplePath } from '../ziklag/layout';

/**
 * Terrain (reused, see terrain.ts) plus the worn gate-approach path the
 * messenger walks in on. Deliberately leaner than ziklag-aftermath's
 * GroundWorks: no field plots or threshing floor here — this scene's
 * claimIds/assetIds stay scoped to what the brief actually calls for (no
 * claim-agriculture/claim-well content is asserted by this scene).
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const pathPoints = useMemo(() => samplePath(GATE_APPROACH_CURVE), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {pathPoints.map((p, i) => (
        <mesh
          key={`path-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.4, 0.05, 7.6]} />
          <meshStandardMaterial color="#cfc0a0" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
