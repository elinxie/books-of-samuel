import { Page } from '../ui/SiteChrome';
import { SOURCE_CARDS } from '../data';
import type { SourceType } from '../data/types';

const TYPE_TITLES: Record<SourceType, string> = {
  'biblical-text': 'Biblical text',
  archaeology: 'Archaeology',
  'historical-geography': 'Historical geography',
  'material-culture': 'Material culture',
  'scholarly-article': 'Scholarly articles',
  documentation: 'Technical documentation',
  reference: 'Reference works',
  other: 'Other',
};

const COPYRIGHT_LABEL: Record<string, string> = {
  'public-domain': 'Public domain',
  licensed: 'Licensed',
  'copyrighted-limited-use': 'Copyrighted — limited use',
  unknown: 'Copyright status unknown',
};

export function SourcesPage() {
  const types = Array.from(new Set(SOURCE_CARDS.map((s) => s.sourceType)));

  return (
    <Page>
      <h1>Sources &amp; permissions</h1>
      <p className="page-lede">
        Every historical claim rendered in a scene traces to one or more of the source cards below
        (the full machine-readable cards live in <code>/sources/source-cards/</code> in the
        repository). Cards marked for verification are seeded citations awaiting a page-level check
        — the uncertainty is disclosed rather than hidden.
      </p>

      <h2>Scripture — ESV</h2>
      <div className="copyright-note" data-testid="esv-attribution">
        <p>
          Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®),
          © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All
          rights reserved.
        </p>
        <p>
          Policy: this site stores and displays{' '}
          <strong>canonical references, its own summaries, and brief excerpts only</strong> — never
          full chapters. If full passage text is added later, it will be served through Crossway’s
          ESV API under its terms, with compliant attribution (tracked as feature{' '}
          <code>f-esv-api</code>).
        </p>
      </div>

      <h2>Bibliography</h2>
      {types.map((t) => (
        <section key={t}>
          <h3>{TYPE_TITLES[t]}</h3>
          {SOURCE_CARDS.filter((s) => s.sourceType === t).map((s) => (
            <div key={s.id} className="source-entry">
              <div>
                {s.author && <span>{s.author}. </span>}
                <span className="source-title">{s.title}</span>
                {s.datePublished && <span> ({s.datePublished})</span>}
              </div>
              <div className="source-meta">
                {s.publisher && <span>{s.publisher} · </span>}
                <span>{COPYRIGHT_LABEL[s.copyrightStatus]}</span>
                {s.url && (
                  <span>
                    {' '}
                    ·{' '}
                    <a href={s.url} target="_blank" rel="noreferrer">
                      link
                    </a>
                  </span>
                )}
              </div>
              <p className="source-summary">{s.summary}</p>
              {s.confidenceNotes.toUpperCase().includes('TO VERIFY') && (
                <p className="source-verify">⚠ {s.confidenceNotes}</p>
              )}
            </div>
          ))}
        </section>
      ))}

      <h2>Ingestion policy (summary)</h2>
      <p className="page-lede">
        No full copyrighted books, articles, or Bible chapters are stored in the repository. Raw
        text snapshots are kept only for public-domain or explicitly permitted material; for
        everything else the project keeps structured source cards — bibliographic data, original
        summaries, and extracted claims. The full policy is in{' '}
        <code>/docs/source-ingestion-policy.md</code>.
      </p>
    </Page>
  );
}
