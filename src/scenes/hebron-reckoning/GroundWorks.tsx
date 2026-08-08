import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { ARABAH_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh (reused from hebron-anointing plus this scene's own
 * pool-basin feature, see ./terrain.ts) plus the one new road this scene
 * threads across it: the assassins' Arabah-road approach from the east.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const roadPoints = useMemo(() => samplePath(ARABAH_ROAD_CURVE), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {roadPoints.map((p, i) => (
        <mesh
          key={`arabah-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.4, 0.05, 7.6]} />
          <meshStandardMaterial color="#c6b78e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
