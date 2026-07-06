import { Page } from '../ui/SiteChrome';
import { FEATURES } from '../data';
import type { FeatureStatus } from '../data/types';

const GROUPS: { status: FeatureStatus; title: string; blurb: string }[] = [
  {
    status: 'done',
    title: 'Available now',
    blurb: 'Working in the current release (early-stage visuals, clearly labeled placeholders).',
  },
  { status: 'in-progress', title: 'In progress', blurb: 'Actively being built or verified.' },
  {
    status: 'planned',
    title: 'Planned',
    blurb: 'On the roadmap, ordered by milestone — see the Progress page.',
  },
];

export function FeaturesPage() {
  return (
    <Page>
      <h1>Features</h1>
      <p className="page-lede">
        The feature set serves observation and study — navigation, replay, labeling, and honest
        sourcing — not gameplay. Combat mechanics, inventories, quests, and win states are
        deliberately out of scope.
      </p>
      {GROUPS.map((g) => {
        const items = FEATURES.filter((f) => f.status === g.status);
        if (items.length === 0) return null;
        return (
          <section key={g.status} className="feature-group" data-testid={`features-${g.status}`}>
            <h2>{g.title}</h2>
            <p className="page-lede">{g.blurb}</p>
            <ul>
              {items.map((f) => (
                <li key={f.id}>
                  <strong>{f.title}</strong>{' '}
                  <span className={`status-chip status-${f.status}`}>{f.milestoneId}</span>
                  <p>{f.description}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Page>
  );
}
