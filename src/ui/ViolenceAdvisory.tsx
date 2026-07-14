import type { SceneDef } from '../data/types';
import { useAppStore } from '../state/store';
import type { ViolenceMode } from '../state/store';

/**
 * First-visit violence advisory (ADR-009). For any scene whose `SceneDef`
 * sets `depictsDeath`, this blocks entry until the viewer answers once —
 * standard or reduced rendering. The choice sets `violenceMode` and is
 * persisted so the advisory never reappears; it stays changeable any time
 * from Settings.
 */
export function ViolenceAdvisory({ scene }: { scene: SceneDef }) {
  const acknowledge = useAppStore((s) => s.acknowledgeViolenceAdvisory);

  const choose = (mode: ViolenceMode) => acknowledge(mode);

  return (
    <div
      className="violence-advisory"
      data-testid="violence-advisory"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="violence-advisory-title"
    >
      <div className="violence-advisory-panel">
        <h2 id="violence-advisory-title">Before you continue</h2>
        <p>
          This scene — {scene.title} — depicts death in battle, drawn from the biblical narrative.
          Two rendering treatments are available for how these moments are shown; both follow the
          same recorded events and choreography. Reduced mode changes depiction only, never the
          events themselves, and no gore or dismemberment is shown in either mode.
        </p>
        <div className="violence-advisory-choices">
          <button
            type="button"
            className="violence-advisory-btn"
            data-testid="violence-advisory-standard"
            onClick={() => choose('standard')}
          >
            Continue in standard mode
          </button>
          <button
            type="button"
            className="violence-advisory-btn"
            data-testid="violence-advisory-reduced"
            onClick={() => choose('reduced')}
          >
            Switch to reduced mode
          </button>
        </div>
        <p className="panel-sub" style={{ marginTop: 12, marginBottom: 0 }}>
          Either choice can be changed any time from Settings.
        </p>
      </div>
    </div>
  );
}
