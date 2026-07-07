# Sonnet continuation checklist

You are continuing the Books of Samuel project, usually as Sonnet 5 (or another
available coding-capable model — see `docs/model-handoff.md` if Sonnet isn't
available).

## 1. Read first

- `README.md`
- `CLAUDE.md`
- `docs/model-handoff.md`
- `docs/progress.md`
- `docs/next-run.md`
- `docs/fable-review-queue.md`
- `docs/architecture.md`
- `docs/uncertainty-register.md`
- `docs/asset-roadmap.md`

## 2. Orient

1. `git status` and `git log --oneline -10`.
2. `npm install` if `node_modules` is missing or `package-lock.json` changed.
3. `npm run verify` (format check + lint + unit tests + build + e2e). If e2e fails
   only because of the sandboxed browser path, see the note in
   `docs/architecture.md` § Testing layers (`PLAYWRIGHT_CHROMIUM_PATH`).
4. Fix any failures before starting new work, unless `docs/next-run.md` explicitly
   says a failure is known and deferred.

## 3. Pick the next task

Read `docs/next-run.md` first — it should name one concrete next task. If it's
stale or already done, pick the next smallest coherent item from:

- `docs/progress.md` (open milestone goals), or
- the `planned` entries in `src/data/features.ts`, ordered by milestone.

**Do not require Fable** unless the task is listed in `docs/fable-review-queue.md`
as needing Fable-level judgment, or falls under "Fixed for now" in
`docs/model-handoff.md`. If it does and Fable isn't available, implement the most
defensible option, mark it provisional, and add/update the queue entry.

## 4. Implement

Follow `docs/reconstruction-method.md` for anything historical (new claims, scenes,
sources). Keep changes scoped to the chosen task — don't opportunistically expand
into adjacent milestones.

## 5. Test

- Add/extend Vitest coverage for new data, state logic, or pure functions.
- Add/extend Playwright coverage if you added new interactive surface.
- Re-run `npm run verify`.

## 6. Update docs

At minimum:

- `docs/progress.md` — reflect what actually shipped.
- `docs/next-run.md` — overwrite with the next concrete task.
- `docs/run-log.md` — append a compact entry (see its own format note).
- `docs/asset-roadmap.md` — if you added/resolved a placeholder.
- `docs/uncertainty-register.md` — if you touched a disputed question.
- `docs/fable-review-queue.md` — if you made a provisional call needing later review.

Keep these updates terse — bullet points and short lines, not prose essays. This
keeps future sessions cheap to re-orient from.

## 7. Commit and push

Standard commit (see repo-level git safety rules — new commit, not amend, unless
told otherwise). Push to the designated branch.

## 8. Leave a next-run note

`docs/next-run.md` should let the _next_ session start working within one read,
with no memory of this conversation required.

## Session checkpoints (long sessions)

If a session runs long, write a checkpoint to
`docs/session-checkpoints/<date>-<short-slug>.md` covering: current milestone,
completed tasks, in-progress tasks, known failures, test/build status, next
recommended action, open research questions, and most-recently-changed files. Do
this before context runs out, not after.
