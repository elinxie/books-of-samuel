import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { GILBOA_BATTLE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('gilboa-battle')!;

/**
 * M3 terrain shell (Step 1 of 5). This is deliberately terrain + vegetation +
 * entity labels only — no battlefield figures, no rout dust, no military
 * kit. Those land in later steps of the Gilboa build; see
 * docs/design/gilboa-battle-brief.md.
 */

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
      <color attach="background" args={['#dce4e6']} />
      <fog attach="fog" args={['#dce4e6', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[900, 340, -1400]}
          turbidity={3}
          rayleigh={2.4}
          mieCoefficient={0.006}
          mieDirectionalG={0.8}
        />
      )}
      {/* Hard dawn / mid-morning light, low and raking off the ridge — the
          full dawn-to-dusk beat arc is a later polish pass; this fixed rig
          is a legibility choice, the hour itself unstated in the text. */}
      <hemisphereLight args={['#dfe8e6', '#5c5642', 0.55]} />
      <directionalLight
        position={[900, 340, -1400]}
        intensity={1.6}
        color="#fff0da"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-160}
        shadow-camera-right={160}
        shadow-camera-top={160}
        shadow-camera-bottom={-160}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.2} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function GilboaBattleScene() {
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
      />
      {showLabels && GILBOA_BATTLE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
