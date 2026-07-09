import { useAppStore } from '../../state/store';
import type { QualityMode, NavMode, ViolenceMode } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';

/** Navigation mode, quality mode, and the study-layer toggles. */
export function SettingsPanel() {
  const s = useAppStore();

  const toggle = (
    label: string,
    hint: string,
    value: boolean,
    onToggle: () => void,
    testId: string,
    disabled = false,
  ) => (
    <div className="toggle-row">
      <span>
        {label}
        <span className="toggle-hint">{hint}</span>
      </span>
      <button
        type="button"
        className="switch"
        role="switch"
        aria-checked={value}
        aria-pressed={value}
        aria-label={label}
        data-testid={testId}
        disabled={disabled}
        onClick={onToggle}
      />
    </div>
  );

  return (
    <aside className="hud-panel" data-testid="panel-settings">
      <button
        type="button"
        className="panel-close"
        onClick={() => s.setActivePanel('none')}
        aria-label="Close panel"
      >
        ✕
      </button>
      <h2>Settings</h2>
      <p className="panel-sub">
        Study with the layers on; turn them off to simply inhabit the scene.
      </p>

      <h3>Study layers</h3>
      {toggle(
        'Sources',
        'Evidence badges on labels and citations in panels.',
        s.showSources,
        s.toggleSources,
        'toggle-sources',
      )}
      {toggle(
        'Scholarly notes',
        'Uncertainty notes and competing scholarly views.',
        s.showScholarlyNotes,
        s.toggleScholarlyNotes,
        'toggle-notes',
      )}
      {toggle(
        'Labels',
        'In-scene labels for places, groups, and routes.',
        s.showLabels,
        s.toggleLabels,
        'toggle-labels',
      )}
      {toggle(
        'Theological commentary',
        'Coming in a later milestone — kept separate from historical layers.',
        s.theologicalCommentary,
        () => {},
        'toggle-theological',
        true,
      )}

      <h3>Violence rendering</h3>
      <p className="panel-sub">
        Battle and death-sequence scenes (e.g. Mount Gilboa) follow one choreography in
        two treatments — reduction abstracts how a moment is shown, never the facts. No
        gore or dismemberment in either mode.
      </p>
      <div className="radio-row">
        {(
          [
            ['standard', 'Standard', 'Restrained, documentary-distance transitions.'],
            ['reduced', 'Reduced', 'Animated transitions elided; cuts to the resulting pose.'],
          ] as [ViolenceMode, string, string][]
        ).map(([mode, label, desc]) => (
          <label key={mode}>
            <input
              type="radio"
              name="violenceMode"
              checked={s.violenceMode === mode}
              data-testid={`violence-${mode}`}
              onChange={() => s.setViolenceMode(mode)}
            />
            <span>
              {label}
              <span className="radio-desc">{desc}</span>
            </span>
          </label>
        ))}
      </div>

      <h3>Navigation</h3>
      <div className="radio-row">
        {(
          [
            ['inspect', 'Inspect', 'Orbit and pan with the mouse; labels stay clickable.'],
            ['walk', 'Walk', 'First-person at eye height: click to look, WASD to move.'],
          ] as [NavMode, string, string][]
        ).map(([mode, label, desc]) => (
          <label key={mode}>
            <input
              type="radio"
              name="navmode"
              checked={s.navMode === mode}
              data-testid={`nav-${mode}`}
              onChange={() => s.setNavMode(mode)}
            />
            <span>
              {label}
              <span className="radio-desc">{desc}</span>
            </span>
          </label>
        ))}
      </div>

      <h3>Quality</h3>
      <div className="radio-row">
        {(Object.keys(QUALITY_PROFILES) as QualityMode[]).map((mode) => (
          <label key={mode}>
            <input
              type="radio"
              name="quality"
              checked={s.quality === mode}
              data-testid={`quality-${mode}`}
              onChange={() => s.setQuality(mode)}
            />
            <span>
              {QUALITY_PROFILES[mode].label}
              <span className="radio-desc">{QUALITY_PROFILES[mode].description}</span>
            </span>
          </label>
        ))}
      </div>

      <h3>Keys</h3>
      <p className="panel-sub" style={{ marginBottom: 0 }}>
        Space — play/pause · H — hide interface · WASD + Shift — walk (in Walk mode)
      </p>
    </aside>
  );
}
