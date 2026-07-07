import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Settlement } from './Settlement';
import { SmokeColumns } from './SmokeColumns';
import { Vegetation } from './Vegetation';
import { ReturningMen } from './ReturningMen';
import { ZIKLAG_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('ziklag-aftermath')!;

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
      <color attach="background" args={['#dcc9a4']} />
      <fog attach="fog" args={['#dcc9a4', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[-2400, 620, -900]}
          turbidity={5.5}
          rayleigh={2.2}
          mieCoefficient={0.006}
          mieDirectionalG={0.8}
        />
      )}
      {/* Late-afternoon light — a legibility choice, see claim-time-of-day */}
      <hemisphereLight args={['#e8d9b8', '#6b5a44', 0.55]} />
      <directionalLight
        position={[-260, 180, -110]}
        intensity={1.6}
        color="#ffd9a8"
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
      <ambientLight intensity={0.14} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function ZiklagScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Settlement shadows={profile.shadows} />
      <SmokeColumns key={`smoke-${quality}`} particlesPerColumn={profile.smokeParticlesPerColumn} />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <ReturningMen figureCount={profile.figureCount} shadows={profile.shadows} />
      {showLabels && ZIKLAG_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
