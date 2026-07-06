import type { SceneDef } from '../../data/types';
import { useAppStore } from '../../state/store';

function fmt(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Replay controls plus the current beat caption of the scripted reenactment. */
export function TimelinePanel({ scene }: { scene: SceneDef }) {
  const timeSec = useAppStore((s) => s.timeSec);
  const playing = useAppStore((s) => s.playing);
  const speed = useAppStore((s) => s.speed);
  const setTime = useAppStore((s) => s.setTime);
  const setPlaying = useAppStore((s) => s.setPlaying);
  const setSpeed = useAppStore((s) => s.setSpeed);
  const restart = useAppStore((s) => s.restart);

  const beat = [...scene.beats].reverse().find((b) => b.timeSec <= timeSec);

  return (
    <div className="hud-bottom" data-testid="timeline-controls">
      {beat && (
        <div className="beat-caption" data-testid="beat-caption">
          <span className="beat-title">{beat.title}</span>
          <p className="beat-text">{beat.caption}</p>
        </div>
      )}
      <div className="timeline">
        <button
          type="button"
          className="tl-btn"
          aria-label="Restart scene"
          data-testid="btn-restart"
          onClick={restart}
        >
          ⟲
        </button>
        <button
          type="button"
          className="tl-btn"
          aria-label={playing ? 'Pause' : 'Play'}
          data-testid="btn-play-pause"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <span className="tl-time">
          {fmt(timeSec)} / {fmt(scene.durationSec)}
        </span>
        <div className="tl-track">
          {scene.beats.map((b) => (
            <span
              key={b.id}
              className="tl-beat-mark"
              style={{ left: `${(b.timeSec / scene.durationSec) * 100}%` }}
              title={b.title}
            />
          ))}
          <input
            type="range"
            min={0}
            max={scene.durationSec}
            step={0.1}
            value={timeSec}
            aria-label="Scene time"
            data-testid="timeline-scrub"
            onChange={(e) => setTime(Number(e.target.value), scene.durationSec)}
          />
        </div>
        <select
          className="tl-speed"
          value={speed}
          aria-label="Playback speed"
          data-testid="speed-select"
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          <option value={0.5}>0.5×</option>
          <option value={1}>1×</option>
          <option value={2}>2×</option>
          <option value={4}>4×</option>
        </select>
      </div>
    </div>
  );
}
