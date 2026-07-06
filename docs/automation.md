# Automation options (documented, not relied upon)

The project must remain resumable by a human running `claude` and pointing it at
the continuation docs — nothing below is required for that to work. These are
optional conveniences if the user wants firing without manually starting a session.

## Claude Code Remote scheduled triggers

If running in an environment with the `claude-code-remote` MCP server available,
a recurring trigger can be created to fire a continuation prompt on a schedule:

- **Self-bound trigger** (fires into the same persistent session): good for a
  "check in every N hours" pattern during an active multi-day push.
- **Fresh-session trigger** (`create_new_session_on_fire: true`): safer default for
  unattended runs — each firing starts clean and reads the same versioned docs
  (`README.md`, `CLAUDE.md`, `docs/sonnet-continuation.md`, `docs/next-run.md`),
  so it never depends on a specific prior conversation still being alive.

Example prompt for a fresh-session trigger:

```
Read /docs/sonnet-continuation.md and continue the Books of Samuel project:
check git status, run npm run verify, pick the next smallest task from
/docs/next-run.md, implement it, test it, update docs, commit, and push.
```

Suggested cadence: not more than a few times a day — this is a research-and-build
project, not a monitoring task, and frequent unattended firings risk shipping
half-considered scene/historical decisions without review.

## GitHub Actions (already relied upon, not optional)

Unlike the above, `.github/workflows/ci.yml` and `.github/workflows/deploy.yml` are
load-bearing: CI gates merges, deploy publishes `main` to GitHub Pages. These are
version-controlled and require no external scheduler.

## What NOT to automate

- Do not automate git pushes to `main` outside of normal PR review.
- Do not automate anything on the Fable review queue
  (`docs/fable-review-queue.md`) — those need a human-in-the-loop or an explicit
  Fable session, not a scheduled Sonnet run.
- Do not automate ESV text ingestion beyond the excerpt budget without a human
  re-reading `docs/source-ingestion-policy.md` first.
