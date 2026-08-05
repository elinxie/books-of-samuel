import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { NORTH_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain (reused, see terrain.ts) plus the one road this scene adds:
 * the northern approach/departure road Abner's party uses twice (brief's
 * "Focal masses" (a) and (d)). The town/terrace geometry itself is rendered
 * by the reused `TerraceWalls`/`TownAndPlaza` components
 * (`../hebron-anointing`), not here — this file owns only the terrain mesh
 * and the new road strip.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const roadPoints = useMemo(() => samplePath(NORTH_ROAD_CURVE), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {roadPoints.map((p, i) => (
        <mesh
          key={`north-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.4, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
