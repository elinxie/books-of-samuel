import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { APPROACH_CURVE, EXIT_CURVE, FIELDS, THRESHING_FLOOR, samplePath } from './layout';

/** Terrain, worn paths, field plots, and threshing floor (all placeholder-tier). */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const pathPoints = useMemo(() => [...samplePath(APPROACH_CURVE), ...samplePath(EXIT_CURVE)], []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {/* Worn dirt paths along the north approach and south departure routes */}
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

      {/* Grain plots (illustrative placement; see claim-agriculture) */}
      {FIELDS.map((f, i) => (
        <mesh
          key={`field-${i}`}
          position={[f.x, terrain.heightAt(f.x, f.z) + 0.06, f.z]}
          rotation={[0, f.rot, 0]}
        >
          <boxGeometry args={[f.w, 0.08, f.d]} />
          <meshStandardMaterial color={i % 2 ? '#96784f' : '#8a6f4d'} roughness={1} />
        </mesh>
      ))}

      {/* Threshing floor outside the gate */}
      <mesh
        position={[
          THRESHING_FLOOR.x,
          terrain.heightAt(THRESHING_FLOOR.x, THRESHING_FLOOR.z) + 0.05,
          THRESHING_FLOOR.z,
        ]}
      >
        <cylinderGeometry args={[THRESHING_FLOOR.r, THRESHING_FLOOR.r, 0.1, 24]} />
        <meshStandardMaterial color="#d9cdb2" roughness={1} />
      </mesh>
    </group>
  );
}
