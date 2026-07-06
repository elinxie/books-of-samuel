import type { SceneDef } from '../../data/types';
import { resolveClaims } from '../../data';
import { useAppStore } from '../../state/store';
import { CONFIDENCE_LABELS, CONFIDENCE_ORDER } from '../basisMeta';
import { ClaimCard } from '../ClaimCard';

/** "What is certain vs reconstructed?" — every claim behind the current scene, grouped by confidence. */
export function CertaintyPanel({ scene }: { scene: SceneDef }) {
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const claims = resolveClaims(scene.claimIds);

  return (
    <aside className="hud-panel" data-testid="panel-certainty">
      <button
        type="button"
        className="panel-close"
        onClick={() => setActivePanel('none')}
        aria-label="Close panel"
      >
        ✕
      </button>
      <h2>Certain vs reconstructed</h2>
      <p className="panel-sub">
        Everything asserted by this scene, from best-evidenced to openly speculative. “Biblical text
        · high” describes what the narrative states, not independent corroboration.
      </p>
      {CONFIDENCE_ORDER.map((level) => {
        const group = claims.filter((c) => c.confidence === level);
        if (group.length === 0) return null;
        return (
          <section key={level}>
            <h3>{CONFIDENCE_LABELS[level]}</h3>
            {group.map((c) => (
              <ClaimCard key={c.id} claim={c} />
            ))}
          </section>
        );
      })}
    </aside>
  );
}
