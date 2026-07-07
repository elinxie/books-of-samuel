import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SceneDef } from '../../data/types';
import { PASSAGES_BY_ID, PERIODS_BY_ID } from '../../data';
import { useAppStore } from '../../state/store';
import { TimelinePanel } from './TimelinePanel';
import { SettingsPanel } from './SettingsPanel';
import { TeleportPanel } from './TeleportPanel';
import { InspectorPanel } from './InspectorPanel';
import { CertaintyPanel } from './CertaintyPanel';

/** All 2D interface over the 3D viewport. Press H to hide everything. */
export function Hud({ scene }: { scene: SceneDef }) {
  const hudHidden = useAppStore((s) => s.hudHidden);
  const toggleHud = useAppStore((s) => s.toggleHud);
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.code === 'KeyH') toggleHud();
      if (e.code === 'Space' && !hudHidden) {
        e.preventDefault();
        const s = useAppStore.getState();
        s.setPlaying(!s.playing);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleHud, hudHidden]);

  if (hudHidden) {
    return (
      <button type="button" className="hud-restore" onClick={toggleHud}>
        Show interface (H)
      </button>
    );
  }

  const passage = PASSAGES_BY_ID.get(scene.passageIds[0]);
  const period = PERIODS_BY_ID.get(scene.periodId);

  const panelButton = (id: 'settings' | 'teleport' | 'certainty', label: string) => (
    <button
      type="button"
      data-testid={`open-${id}`}
      aria-expanded={activePanel === id}
      onClick={() => setActivePanel(activePanel === id ? 'none' : id)}
    >
      {label}
    </button>
  );

  return (
    <>
      <header className="hud-top">
        <Link to="/" className="brand">
          Books of Samuel
        </Link>
        <div className="scene-heading">
          <span className="scene-title" data-testid="scene-title">
            {scene.title}
          </span>
          {passage && <span className="scene-ref">{passage.reference} (ESV)</span>}
          {period && <span className="scene-period">{period.approxRange}</span>}
        </div>
        <nav className="nav-links">
          <Link to="/progress">Progress</Link>
          <Link to="/features">Features</Link>
          <Link to="/sources">Sources</Link>
          <Link to="/method">Method</Link>
        </nav>
      </header>

      <div className="hud-side">
        {panelButton('teleport', 'Teleport')}
        {panelButton('certainty', 'Certain vs reconstructed')}
        {panelButton('settings', 'Settings')}
        <button type="button" onClick={toggleHud} title="Hide all interface (H)">
          Hide UI (H)
        </button>
      </div>

      {activePanel === 'settings' && <SettingsPanel />}
      {activePanel === 'teleport' && <TeleportPanel scene={scene} />}
      {activePanel === 'certainty' && <CertaintyPanel scene={scene} />}
      {activePanel === 'inspector' && <InspectorPanel />}

      <TimelinePanel scene={scene} />
    </>
  );
}
