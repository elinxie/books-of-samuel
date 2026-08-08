import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { JOAB_RAID_RETURN_CURVE, NORTH_ROAD_CURVE, PROCESSION_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh (reused unchanged from hebron-anointing, see
 * ./terrain.ts) plus three worn paths this scene threads across it: Abner's
 * own north road (hebron-covenant's, reused for continuity — he "re-enters
 * the scene already returning through" it), Joab's raid-return approach
 * from the east, and the funeral procession's own route to the tomb.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const northRoadPoints = useMemo(() => samplePath(NORTH_ROAD_CURVE), []);
  const raidRoadPoints = useMemo(() => samplePath(JOAB_RAID_RETURN_CURVE), []);
  const processionPoints = useMemo(() => samplePath(PROCESSION_CURVE, 5), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {northRoadPoints.map((p, i) => (
        <mesh
          key={`north-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.6, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {raidRoadPoints.map((p, i) => (
        <mesh
          key={`raid-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.2, 0.05, 7.6]} />
          <meshStandardMaterial color="#c3b587" roughness={1} />
        </mesh>
      ))}

      {processionPoints.map((p, i) => (
        <mesh
          key={`procession-path-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.03, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[1.7, 0.04, 5.4]} />
          <meshStandardMaterial color="#b9ab86" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
