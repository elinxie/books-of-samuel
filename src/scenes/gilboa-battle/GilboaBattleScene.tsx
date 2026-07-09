import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { PrincipalFigures } from './PrincipalFigures';
import { CrestRetinue } from './CrestRetinue';
import { PhilistinePress } from './PhilistinePress';
import { RoutingIsraelites } from './RoutingIsraelites';
import { RoutDust } from './RoutDust';
import { GILBOA_BATTLE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('gilboa-battle')!;

/**
 * M3 terrain + figures + choreography (Step 5 of 5, final slice). Terrain,
 * vegetation, and entity labels are Step 1; Step 2 populated the ridge with
 * figures (count, grouping, positioning); Step 3 added the beat-driven
 * death-sequence/rout pose choreography (`./poses.ts`, `RoutingIsraelites.tsx`,
 * `CrestRetinue.tsx`, `PrincipalFigures.tsx`) gated by `violenceMode`
 * (standard/reduced, ADR-009); Step 4 added military-kit attachment meshes
 * (`kitMeshes.ts`). This step adds the rout-dust system (`RoutDust.tsx`) per
 * the brief's "Visual composition" — dust reads the mass movement of the
 * rout and, lighter, the Philistine press. See
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

  // Scene-specific scaling on top of the shared figureCount tier, following
  // the amalekite-camp pattern (camelCount = figureCount * 0.55), tuned to
  // land the high-tier total in the brief's ~120-140 combat-figure band
  // (see "Scale assumptions" — claim-battle-scale).
  const retinueCount = Math.max(1, Math.round(profile.figureCount * 0.18));
  const archerCount = Math.max(1, Math.round(profile.figureCount * 0.19));
  const infantryCount = Math.max(1, Math.round(profile.figureCount * 0.62));
  const philistinePrincipalCount = Math.max(1, Math.round(profile.figureCount * 0.07));
  const routCount = Math.max(1, Math.round(profile.figureCount * 0.62));

  // Rout-dust sprite counts (Step 5): no dedicated quality-profile field, so
  // this scales off the existing figureCount tier per the brief's
  // performance target, same convention as the counts above. Rout density is
  // heavier (the primary "mass movement" the brief calls out); press density
  // is deliberately lighter so it doesn't compete with the crest sightline.
  const routDustCount = Math.max(1, Math.round(profile.figureCount * 5));
  const pressDustCount = Math.max(1, Math.round(profile.figureCount * 2.5));

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
      />
      <PrincipalFigures shadows={profile.shadows} />
      <CrestRetinue count={retinueCount} shadows={profile.shadows} />
      <PhilistinePress
        archerCount={archerCount}
        infantryCount={infantryCount}
        principalCount={philistinePrincipalCount}
        shadows={profile.shadows}
      />
      <RoutingIsraelites count={routCount} shadows={profile.shadows} />
      <RoutDust routCount={routDustCount} pressCount={pressDustCount} />
      {showLabels && GILBOA_BATTLE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
