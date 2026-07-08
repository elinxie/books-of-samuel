# /checkpoint — commit current work before limits interrupt

Run this when the statusline/hook says SOON/NOW/CRITICAL, before any long risky
operation, or whenever a slice is complete. Steps:

1. Run `node scripts/session-usage.mjs` and note the context % and level.
2. If mid-edit, bring the working tree to the nearest coherent state (finish the
   current file; stub with a TODO rather than leaving a syntax error). Run
   `npm run format:check && npm run lint && npm run test` if the change plausibly
   affects them — skip the full verify gate if the level is CRITICAL.
3. Commit everything meaningful (`git add` the intended files, conventional
   commit message per `.claude/skills/caveman-commit`). Never leave finished
   work uncommitted while starting something new.
4. Push: `git push -u origin <current branch>` (retry up to 4x with backoff on
   network failure).
5. Update `docs/next-run.md` with the exact next action if it changed, and — if
   ending or nearly out of budget — append a compact note to
   `docs/session-checkpoints/<date>-<model>-<slug>.md`: done / in-progress /
   next / gate status / files touched. Include the usage line from step 1.
6. If a PR exists for the branch, no comment needed — the diff is the record.

Keep the whole checkpoint under ~2 minutes of work. A cheap checkpoint you
actually run beats a thorough one you never reach.
