import { useNavigate, Link } from 'react-router-dom';
import { Page } from '../ui/SiteChrome';
import { LOCATIONS, PASSAGES, PERIODS, SCENES_BY_ID, DEFAULT_SCENE_ID } from '../data';

function firstEnterableScene(sceneIds: string[]): string | null {
  for (const id of sceneIds) {
    const scene = SCENES_BY_ID.get(id);
    if (scene && scene.status !== 'planned') return scene.id;
  }
  return null;
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <section className="hero">
        <p className="eyebrow">A historical observer for 1–2 Samuel</p>
        <h1>Books of Samuel</h1>
        <p>
          Walk the world around David and Saul as an invisible, neutral observer — frontier towns,
          wilderness roads, farms, and battlegrounds of the early Iron Age southern Levant. Every
          scene distinguishes what the biblical text states, what archaeology grounds, what scholars
          reconstruct (and dispute), and what is placeholder design.
        </p>
        <div className="hero-actions">
          <Link
            className="btn btn-primary"
            to={`/observe/${DEFAULT_SCENE_ID}`}
            data-testid="enter-default"
          >
            Enter Ziklag — 1 Samuel 30
          </Link>
          <Link className="btn" to="/method">
            How this is reconstructed
          </Link>
        </div>
      </section>

      <section className="entry-grid">
        <div className="entry-card">
          <h3>Enter by passage</h3>
          <p>Chapters open as their scenes are built, milestone by milestone.</p>
          <div className="entry-list">
            {PASSAGES.map((p) => {
              const sceneId = firstEnterableScene(p.sceneIds);
              return (
                <button
                  key={p.id}
                  type="button"
                  className="entry-item"
                  data-testid={`enter-passage-${p.id}`}
                  disabled={!sceneId}
                  onClick={() => sceneId && navigate(`/observe/${sceneId}`)}
                >
                  <span>{p.reference}</span>
                  <span className="entry-note">
                    {sceneId ? 'Enter' : `Planned — ${p.milestoneId}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="entry-card">
          <h3>Enter by location</h3>
          <p>Sites of the narrative, with disputed identifications kept visible.</p>
          <div className="entry-list">
            {LOCATIONS.map((l) => {
              const sceneId = firstEnterableScene(l.sceneIds);
              return (
                <button
                  key={l.id}
                  type="button"
                  className="entry-item"
                  data-testid={`enter-location-${l.id}`}
                  disabled={!sceneId}
                  onClick={() => sceneId && navigate(`/observe/${sceneId}`)}
                >
                  <span>
                    {l.name}
                    {l.identification.disputed ? ' *' : ''}
                  </span>
                  <span className="entry-note">{sceneId ? 'Enter' : 'Planned'}</span>
                </button>
              );
            })}
          </div>
          <p style={{ marginTop: 10 }}>* site identification disputed</p>
        </div>

        <div className="entry-card">
          <h3>Enter by period</h3>
          <p>Approximate years; absolute dating of this horizon is itself debated.</p>
          <div className="entry-list">
            {PERIODS.map((per) => {
              const enterable = per.id === 'iron-i-iia-transition';
              return (
                <button
                  key={per.id}
                  type="button"
                  className="entry-item"
                  data-testid={`enter-period-${per.id}`}
                  disabled={!enterable}
                  onClick={() => enterable && navigate(`/observe/${DEFAULT_SCENE_ID}`)}
                >
                  <span>{per.label}</span>
                  <span className="entry-note">{per.approxRange}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <h2>What this is — and is not</h2>
        <p className="page-lede">
          This is not a game. There is no combat, inventory, or winning: you observe, pause, replay,
          and study scripted reenactments in reconstructed places. Current coverage is the 1 Samuel
          30 vertical slice (Ziklag after the Amalekite raid); the roadmap continues through 1
          Samuel 31 and into 2 Samuel chapter by chapter — see <Link to="/progress">Progress</Link>.
          Early scenes lean on clearly labeled placeholder assets; every labeled element traces to
          sources on the <Link to="/sources">Sources page</Link>.
        </p>
      </section>
    </Page>
  );
}
