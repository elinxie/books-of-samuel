import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { NORTH_ROAD_CURVE, PROCESSION_ROUTE_CURVE, RAID_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh (reused hebron-anointing spec, see terrain.ts) plus
 * this scene's three roads: the raid road Joab's party returns by, a short
 * stub of hebron-covenant's own north road near the gate (the direction
 * Abner's silent return comes from — his actual journey stays unstaged, per
 * the brief), and the funeral procession's own route to the tomb ground.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const raidRoadPoints = useMemo(() => samplePath(RAID_ROAD_CURVE), []);
  const processionPoints = useMemo(() => samplePath(PROCESSION_ROUTE_CURVE, 6), []);
  // Only the last stretch of the north road, near the gate — a legible
  // continuity cue (the same road Abner departed on, hebron-covenant), not
  // a re-rendering of the whole journey, which stays off-scene.
  const northRoadStubPoints = useMemo(() => {
    const all = samplePath(NORTH_ROAD_CURVE);
    return all.slice(Math.max(0, all.length - 8));
  }, []);

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
          <boxGeometry args={[2.4, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {northRoadStubPoints.map((p, i) => (
        <mesh
          key={`north-road-stub-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.6, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {processionPoints.map((p, i) => (
        <mesh
          key={`procession-route-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.03, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.0, 0.04, 6.4]} />
          <meshStandardMaterial color="#bfae8a" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
