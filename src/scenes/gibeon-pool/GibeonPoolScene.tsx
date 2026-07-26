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
import { AbnerContingent } from './AbnerContingent';
import { JoabContingent } from './JoabContingent';
import { PrincipalFigures } from './PrincipalFigures';
import { BattleDust } from './BattleDust';
import { duskFactor } from './poses';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * Gibeon: Benjamin-highland terrain + the pool basin/rim/water-plane +
 * vegetation + the champions' contest (24 figures, literal count) + the two
 * wider contingents (disclosed design counts, claim-gibeon-battle-scale) +
 * the four named principals (Abner, Joab, Abishai, Asahel) whose
 * choreography carries the scene's real narrative geography — pool,
 * champions' ground, spreading battlefield, pursuit route, hill of Ammah —
 * more a journey than a single wide shot. See
 * docs/design/gibeon-pool-brief.md.
 *
 * Lighting: daylight through the pool/contest/battle beats, shifting to
 * dusk from `b-pursuit-continues` onward (2:24's own "as the sun was going
 * down" detail, used directly rather than a placeholder hour — `duskFactor`
 * in poses.ts).
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
  const timeSec = useAppStore((s) => s.timeSec);
  const dusk = duskFactor(timeSec);

  const skyColor = dusk > 0.5 ? '#e3c9a6' : '#dfe3dc';
  const sunPos: [number, number, number] = [420 - dusk * 260, 700 - dusk * 520, -260 + dusk * 180];

  return (
    <>
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[skyColor, profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={sunPos}
          turbidity={2.6 + dusk * 2}
          rayleigh={2.1}
          mieCoefficient={0.005 + dusk * 0.01}
          mieDirectionalG={0.78}
        />
      )}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.58 - dusk * 0.22]} />
      <directionalLight
        position={sunPos}
        intensity={1.5 - dusk * 0.55}
        color={dusk > 0.5 ? '#f2b177' : '#fff6e0'}
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
      <ambientLight intensity={0.22 - dusk * 0.06} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function GibeonPoolScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // The champions render literally 1:1 (24, ChampionsContest.tsx's own
  // fixed count) — no ratio, no quality-tier scaling. The two wider
  // contingents scale off the shared figureCount tier, tuned so the
  // high-tier total (24 + Abner's + Joab's) lands ~90-115, noticeably below
  // gilboa-battle's 120-140 (claim-gibeon-battle-scale).
  const abnerContingentCount = Math.max(1, Math.round(profile.figureCount * 0.56));
  const joabContingentCount = Math.max(1, Math.round(profile.figureCount * 0.49));
  const battleDustCount = Math.max(1, Math.round(profile.figureCount * 1.4));

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
      <AbnerContingent count={abnerContingentCount} shadows={profile.shadows} />
      <JoabContingent count={joabContingentCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <BattleDust count={battleDustCount} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
