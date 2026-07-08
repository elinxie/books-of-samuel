# Books of Samuel

A historically serious, first-person, neutral-observer 3D visualizer for the world
of 1–2 Samuel — the world around David, Saul, Israel, Judah, Philistia, Amalekite
raiding, frontier settlements, and the early monarchy's political geography.

This is **not** a game. There is no combat, inventory, leveling, or win/loss state.
You enter as an invisible observer, walk or orbit a reconstructed scene, replay
scripted reenactments, and study — with every visual element traceable to biblical
text, archaeology, comparative ancient Near Eastern evidence, a named scholarly
reconstruction, or a clearly labeled placeholder.

**Live site:** https://elinxie.github.io/books-of-samuel/ (once GitHub Pages is
enabled for this repo — see Deploying, below).

## Current scope

Milestone 1: **1 Samuel 30** — Ziklag after the Amalekite raid, and the scripted
return of David and his six hundred. See `/progress` in the app, or
`docs/progress.md`, for full status.

## Companion: full-text reader

This project deliberately never stores full ESV chapters (see Scripture and
permissions, below). For reading the complete text of 1–2 Samuel, this repo also
hosts [`/reader/`](reader/README.md) — a self-contained, single-file web reader
with the full King James Version and World English Bible (both public domain),
deployed alongside the visualizer at `/reader/`. It has its own toolchain
(Python, no shared dependencies with the visualizer) and its own docs.

## Running locally

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev            # local dev server
npm run build           # typecheck + production build to dist/
npm run preview         # preview the production build
npm run lint             # eslint
npm run format:check     # prettier check (npm run format to fix)
npm run typecheck        # tsc --noEmit
npm test                 # vitest (unit/data/state tests)
npm run e2e               # playwright smoke tests
npm run verify            # the full gate: format:check + lint + test + build + e2e
npm run build:sources     # regenerate sources/source-index.json after editing source cards
```

## Deploying

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes `dist/` to
GitHub Pages on every push to `main` or the active deployment branch (`work`).
One manual, one-time step is required in the repo: **Settings → Pages → Source:
GitHub Actions** (this can't be set from a workflow file). Once set, pushes to
either deployment branch deploy automatically.

## Project structure

See `docs/architecture.md` for the full layout and stack rationale. Short version:

- `src/data/` — the historical data model (claims, passages, scenes, locations,
  sources) and its schema.
- `sources/source-cards/` — bibliography, one JSON file per source.
- `src/scenes/<name>/` — per-scene 3D composition.
- `src/ui/`, `src/pages/` — HUD and study pages.
- `docs/` — architecture, reconstruction method, progress, and continuation docs.
- `reader/` — the companion full-text KJV/WEB reader, a separate self-contained
  subproject (its own README, own Python toolchain); deployed at `/reader/`.

## Continuing this project across sessions

This project is designed to be picked up cold, by a different model, in a
different chat, with no memory of prior conversations — everything needed is
version-controlled.

```bash
# Baseline architecture / major review (use sparingly — see docs/model-handoff.md)
claude --model claude-fable-5
# then: use the /continue-samuel command

# Normal day-to-day development
claude --model claude-sonnet-5
# then: use the /continue-samuel-sonnet command

# Inside a running session
/model
/status
```

Model switches do not persist automatically across sessions — set explicitly each
time. If neither Fable nor Sonnet is available, any competent coding-capable model
can follow `docs/sonnet-continuation.md` directly.

**Start with `docs/model-handoff.md`** for what's fixed vs. changeable, and a
concrete policy for what to spend Fable's more limited availability on versus what
routine coding-model work (Sonnet or otherwise) can handle. `docs/next-run.md`
always names the next concrete task.

## Scripture and permissions

Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard
Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used
by permission. All rights reserved. This project stores canonical references,
original summaries, and short excerpts only — never full chapters. Full policy:
`docs/source-ingestion-policy.md`. Full attribution and bibliography: the in-app
Sources page (`/sources`) or `docs/bibliography.md`.

## License

Code in this repository is MIT-licensed — see [`LICENSE`](LICENSE). Historical
research content (claims, source cards, summaries) follows the sourcing and
copyright rules in `docs/source-ingestion-policy.md`; ESV excerpts follow the
terms in that same policy, separate from the code license.
