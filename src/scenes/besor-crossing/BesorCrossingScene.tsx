import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { PackDonkeys } from './PackDonkeys';
import { Crossing } from './Crossing';
import { PrincipalFigures } from './PrincipalFigures';
import { BESOR_CROSSING_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('besor-crossing')!;

/** Advances scene time while playing. */
function TimelineDriver({ durationSec }: { durationSec: number }) {
  useFrame((_, dt) => {
    const s = useAppStore.getState();
    if (s.playing) s.advanceTime(Math.min(dt, 0.1), durationSec);
  });
  return null;
}

/** Applies the quality profile's draw distance to the active camera. */
function CameraFar({ far }: { far: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.far = far;
    camera.updateProjectionMatrix();
  }, [camera, far]);
  return null;
}

function SceneEnvironment() {
  const quality = useAppStore((s) => s.quality);
  const profile = QUALITY_PROFILES[quality];
  return (
    <>
      <color attach="background" args={['#e2d3ab']} />
      <fog attach="fog" args={['#e2d3ab', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[1800, 900, -600]}
          turbidity={4}
          rayleigh={1.8}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Bright open-country midday light — hour unstated in the text, a legibility choice */}
      <hemisphereLight args={['#eee2c0', '#7a6c50', 0.62]} />
      <directionalLight
        position={[420, 260, -180]}
        intensity={1.75}
        color="#fff2d8"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-140}
        shadow-camera-right={140}
        shadow-camera-top={140}
        shadow-camera-bottom={-140}
        shadow-camera-far={800}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.18} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function BesorCrossingScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <PackDonkeys shadows={profile.shadows} />
      <Crossing figureCount={profile.figureCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && BESOR_CROSSING_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
