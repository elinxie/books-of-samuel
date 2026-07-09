import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SCENES_BY_ID } from '../data/scenes';
import type { SceneDef } from '../data/types';
import { useAppStore } from '../state/store';
import { QUALITY_PROFILES } from '../engine/quality';
import type { Terrain } from '../engine/terrain';
import { ZiklagScene } from '../scenes/ziklag/ZiklagScene';
import { ZIKLAG_TERRAIN } from '../scenes/ziklag/terrain';
import { BesorCrossingScene } from '../scenes/besor-crossing/BesorCrossingScene';
import { BESOR_TERRAIN } from '../scenes/besor-crossing/terrain';
import { AmalekiteCampScene } from '../scenes/amalekite-camp/AmalekiteCampScene';
import { AMALEKITE_CAMP_TERRAIN } from '../scenes/amalekite-camp/terrain';
import { GilboaBattleScene } from '../scenes/gilboa-battle/GilboaBattleScene';
import { GILBOA_TERRAIN } from '../scenes/gilboa-battle/terrain';
import { Hud } from '../ui/hud/Hud';
import { Page } from '../ui/SiteChrome';

interface SceneRegistryEntry {
  component: React.ComponentType;
  terrain: Terrain;
}

const SCENE_REGISTRY: Record<string, SceneRegistryEntry> = {
  'ziklag-aftermath': { component: ZiklagScene, terrain: ZIKLAG_TERRAIN },
  'besor-crossing': { component: BesorCrossingScene, terrain: BESOR_TERRAIN },
  'amalekite-camp': { component: AmalekiteCampScene, terrain: AMALEKITE_CAMP_TERRAIN },
  'gilboa-battle': { component: GilboaBattleScene, terrain: GILBOA_TERRAIN },
};

function PlannedScene({ scene }: { scene: SceneDef }) {
  return (
    <Page>
      <div className="planned-scene">
        <div>
          <h1>{scene.title}</h1>
          <p className="synopsis">{scene.synopsis}</p>
          <p>
            <span className={`status-chip status-planned`}>Planned — {scene.milestoneId}</span>
          </p>
          <p>
            <Link className="btn" to="/progress">
              See the roadmap
            </Link>{' '}
            <Link className="btn btn-primary" to="/observe/ziklag-aftermath">
              Enter the current scene
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
}

function WebGLFallback() {
  return (
    <div className="webgl-fallback" data-testid="webgl-fallback">
      <div>
        <h1>3D rendering unavailable</h1>
        <p>
          This browser could not create a WebGL context, which the observer mode requires. The study
          pages still work: <Link to="/progress">Progress</Link>, <Link to="/sources">Sources</Link>
          , <Link to="/method">Method</Link>.
        </p>
      </div>
    </div>
  );
}

export default function ObservePage() {
  const { sceneId } = useParams();
  const scene = sceneId ? SCENES_BY_ID.get(sceneId) : undefined;
  const quality = useAppStore((s) => s.quality);
  const navMode = useAppStore((s) => s.navMode);
  const setScene = useAppStore((s) => s.setScene);
  const setTerrain = useAppStore((s) => s.setTerrain);
  const requestTeleport = useAppStore((s) => s.requestTeleport);

  // Reset playback, activate the scene's terrain, and move the observer to
  // its default viewpoint.
  useEffect(() => {
    if (!scene || scene.status === 'planned') return;
    setScene(scene.id);
    const entry = SCENE_REGISTRY[scene.id];
    if (entry) setTerrain(entry.terrain);
    const vp = scene.viewpoints[0];
    if (vp) requestTeleport({ position: vp.position, lookAt: vp.lookAt });
  }, [scene, setScene, setTerrain, requestTeleport]);

  if (!scene) return <Navigate to="/" replace />;
  if (scene.status === 'planned') return <PlannedScene scene={scene} />;

  const SceneComponent = SCENE_REGISTRY[scene.id]?.component;
  const profile = QUALITY_PROFILES[quality];

  return (
    <div className="observe-root" data-testid="observe-root">
      <Canvas
        shadows={profile.shadows}
        dpr={profile.dpr}
        camera={{ fov: 60, near: 0.3, far: profile.cameraFar, position: [120, 40, -160] }}
        fallback={<WebGLFallback />}
      >
        {SceneComponent ? <SceneComponent /> : null}
      </Canvas>
      {navMode === 'walk' && (
        <div className="walk-hint">
          Click the scene to look around · WASD to walk · Shift to hurry · Esc to release
        </div>
      )}
      <Hud scene={scene} />
    </div>
  );
}
