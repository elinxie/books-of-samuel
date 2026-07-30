import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { ChampionsContest } from './ChampionsContest';
import { WiderContingents } from './WiderContingents';
import { PrincipalFigures } from './PrincipalFigures';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * Gibeon: central-Benjamin-highland terrain + the pool basin/water plane +
 * the champions' contest (24 figures, literal) + the two wider contingents
 * (claim-gibeon-battle-scale, disclosed and deliberately smaller than
 * gilboa-battle) + the four named principals' beat-driven choreography
 * (./poses.ts) — Abner's installation, the pool contest, the wider battle,
 * Asahel's pursuit and death, and the halt at the hill of Ammah. See
 * docs/design/gibeon-pool-brief.md.
 *
 * Ish-bosheth is never staged here (referenced only, at Mahanaim, off-scene)
 * and Mahanaim itself carries no geometry in this scene at all — both are
 * hard scope guards from the brief, not implementation choices.
 */

function TimelineDriver({ durationSec }: { durationSec: number }) {
  useFrame((_, dt) => {
    const s = useAppStore.getState();
    if (s.playing) s.advanceTime(Math.min(dt, 0.1), durationSec);
  });
  return null;
}

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
      <color attach="background" args={['#d8ddd0']} />
      <fog attach="fog" args={['#d8ddd0', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[500, 620, 300]}
          turbidity={2.8}
          rayleigh={2.2}
          mieCoefficient={0.0055}
          mieDirectionalG={0.79}
        />
      )}
      {/* Clear daylight throughout, except the pursuit-continues beat's own
          sundown detail (2:24 states it directly — carried by BeatLighting
          in a later pass if the brief's sundown cue needs its own light key;
          the base rig here is a legibility choice for the rest of the
          timeline, hour otherwise unstated in the text). */}
      <hemisphereLight args={['#eef1e4', '#7c8256', 0.56]} />
      <directionalLight
        position={[500, 620, 300]}
        intensity={1.5}
        color="#fff4dc"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-220}
        shadow-camera-right={220}
        shadow-camera-top={220}
        shadow-camera-bottom={-220}
        shadow-camera-far={1000}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.22} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function GibeonPoolScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // The two wider contingents (claim-gibeon-battle-scale): disclosed design
  // counts, not a ratio of any asserted "true" army size, deliberately
  // smaller than gilboa-battle's already-modest high-tier combat totals —
  // together with the 24 fixed champions, this lands the scene's high-tier
  // total around 90-115 (brief's "Scale assumptions"), noticeably below
  // Gilboa's 120-140. The champions themselves are a fixed literal count
  // (2:14-16's own exact number), not scaled by quality tier.
  const abnerCount = Math.max(1, Math.round(profile.figureCount * 0.56));
  const joabCount = Math.max(1, Math.round(profile.figureCount * 0.49));

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
      />
      <ChampionsContest shadows={profile.shadows} />
      <WiderContingents side="abner" count={abnerCount} shadows={profile.shadows} />
      <WiderContingents side="joab" count={joabCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
