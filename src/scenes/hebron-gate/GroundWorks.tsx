import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { PROCESSION_CURVE, RAID_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain (reused from hebron-anointing, via the store — see
 * ./terrain.ts) plus the two ground routes this scene adds: Joab's raid
 * party's short arrival road, and the funeral procession's route from the
 * gate to the tomb. Neither the north road nor the south approach ridge
 * road (hebron-covenant/hebron-anointing) is redrawn here.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const raidRoadPoints = useMemo(() => samplePath(RAID_ROAD_CURVE), []);
  const processionPoints = useMemo(() => samplePath(PROCESSION_CURVE, 5), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {raidRoadPoints.map((p, i) => (
        <mesh
          key={`raid-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.4, 0.05, 7.2]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {processionPoints.map((p, i) => (
        <mesh
          key={`procession-route-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.035, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.1, 0.04, 5.4]} />
          <meshStandardMaterial color="#bfae86" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
