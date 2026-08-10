import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { NORTH_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh (reused hebron-anointing spec, see terrain.ts) plus
 * the one road this scene adds: the north road Abner's party arrives and
 * departs by. No south approach or east messenger road is drawn here — this
 * scene stages a few years after hebron-anointing and does not re-render
 * that scene's own arrival/dispatch beats.
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
          <boxGeometry args={[2.6, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
