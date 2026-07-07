import { NavLink, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { DEFAULT_SCENE_ID } from '../data/scenes';

export function SiteNav() {
  return (
    <header className="site-nav">
      <Link to="/" className="brand">
        Books of Samuel
      </Link>
      <nav className="nav-links">
        <NavLink to={`/observe/${DEFAULT_SCENE_ID}`}>Observe</NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/sources">Sources</NavLink>
        <NavLink to="/method">Method</NavLink>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), ©
        2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All
        rights reserved. This project stores references, its own summaries, and brief excerpts only
        — see the <Link to="/sources">Sources page</Link> for the full permissions statement.
      </p>
      <p>
        This is a study aid, not a game: a first-person, neutral-observer reconstruction that is
        explicit about what is evidenced, what is inferred, and what is placeholder.
      </p>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <SiteNav />
      <main className="page-body">{children}</main>
      <SiteFooter />
    </div>
  );
}
