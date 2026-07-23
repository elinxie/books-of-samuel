import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { APPROACH_CURVE, MESSENGER_ROAD_CURVE, samplePath } from './layout';

/**
 * Hebron terrain mesh (placeholder-tier — see asset-terrain-hebron-hills,
 * claim-hebron-town-form) plus the two worn roads figures travel: the
 * highland approach from the south, and the messenger road opening east.
 * The terrain's own vertex-color ramp (pale hill-town ground, valley green,
 * rockier highland tint) carries the ground detail for this shell.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const approachPoints = useMemo(() => samplePath(APPROACH_CURVE), []);
  const messengerPoints = useMemo(() => samplePath(MESSENGER_ROAD_CURVE), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {approachPoints.map((p, i) => (
        <mesh
          key={`approach-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.6, 0.05, 7.6]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {messengerPoints.map((p, i) => (
        <mesh
          key={`messenger-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[1.9, 0.05, 7.6]} />
          <meshStandardMaterial color="#bfae86" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
