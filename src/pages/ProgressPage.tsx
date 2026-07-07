import { Link } from 'react-router-dom';
import { Page } from '../ui/SiteChrome';
import { MILESTONES, PASSAGES, SCENES, SCENES_BY_ID } from '../data';

const STATUS_LABEL: Record<string, string> = {
  released: 'Released',
  'in-progress': 'In progress',
  planned: 'Planned',
};

export function ProgressPage() {
  return (
    <Page>
      <h1>Progress</h1>
      <p className="page-lede">
        Coverage advances on two axes at once: biblical chapters (the content) and release
        milestones (the engineering). A chapter is only “released” when its scenes, sources, and
        uncertainty notes are in place.
      </p>

      <h2>By biblical chapter</h2>
      <table className="data-table" data-testid="chapter-table">
        <thead>
          <tr>
            <th>Passage</th>
            <th>Status</th>
            <th>Scenes</th>
            <th>Milestone</th>
          </tr>
        </thead>
        <tbody>
          {PASSAGES.map((p) => (
            <tr key={p.id}>
              <td>{p.reference}</td>
              <td>
                <span className={`status-chip status-${p.status}`}>{STATUS_LABEL[p.status]}</span>
              </td>
              <td>
                {p.sceneIds.length === 0 && <span style={{ color: 'var(--faint)' }}>—</span>}
                {p.sceneIds.map((id) => {
                  const s = SCENES_BY_ID.get(id);
                  if (!s) return null;
                  return (
                    <div key={id} style={{ margin: '2px 0' }}>
                      {s.status !== 'planned' ? (
                        <Link to={`/observe/${s.id}`}>{s.title}</Link>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>{s.title}</span>
                      )}{' '}
                      <span className={`status-chip status-${s.status}`}>
                        {STATUS_LABEL[s.status]}
                      </span>
                    </div>
                  );
                })}
              </td>
              <td>{p.milestoneId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: 'var(--muted)', fontSize: 13 }}>
        After 2 Samuel 2, coverage continues chapter by chapter; passages are added to this table as
        their milestones open.
      </p>

      <h2>By release milestone</h2>
      {MILESTONES.map((m) => (
        <div key={m.id} className="milestone-card" data-testid={`milestone-${m.id}`}>
          <h3>
            {m.label}{' '}
            <span className={`status-chip status-${m.status}`}>{STATUS_LABEL[m.status]}</span>
          </h3>
          {m.passageRefs.length > 0 && (
            <p style={{ color: 'var(--muted)', fontSize: 13, margin: '6px 0 0' }}>
              Passages: {m.passageRefs.join('; ')}
            </p>
          )}
          <ul>
            {m.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Scenes</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Scene</th>
            <th>Status</th>
            <th>Milestone</th>
          </tr>
        </thead>
        <tbody>
          {SCENES.map((s) => (
            <tr key={s.id}>
              <td>
                {s.status !== 'planned' ? <Link to={`/observe/${s.id}`}>{s.title}</Link> : s.title}
              </td>
              <td>
                <span className={`status-chip status-${s.status}`}>{STATUS_LABEL[s.status]}</span>
              </td>
              <td>{s.milestoneId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
