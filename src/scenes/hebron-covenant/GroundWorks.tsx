import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { NORTH_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh — reused unchanged from hebron-anointing
 * (`../hebron-anointing/terrain`, re-exported by `./terrain.ts`) — plus the
 * one road this scene adds: the northern approach/departure road. No south
 * approach or east messenger road is rendered here; those belong to
 * hebron-anointing alone and would misrepresent this scene's own geography
 * (the brief's deliberate "the north comes to him" inversion).
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
