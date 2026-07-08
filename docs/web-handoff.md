# Web handoff — resuming this project in Claude Code web or ChatGPT Codex web

How to continue this project from a browser when a previous session ended (or
hit its usage limit). Everything an agent needs is version-controlled; no chat
memory is required. All state lives in: `docs/next-run.md` (the next task),
`docs/progress.md`, `docs/run-log.md`, `docs/session-checkpoints/` (if a
session ended abruptly), and the open PR diff for any in-flight branch.

## Path A — Claude Code web (claude.ai/code)

1. Go to `claude.ai/code`, pick this repository (`elinxie/books-of-samuel`),
   and start a new session. The default environment works; no setup script is
   required beyond `npm install` (the session will run it itself).
2. **Pick the model by task tier** (see `docs/model-handoff.md`):
   - Day-to-day implementation → **Sonnet**.
   - Items in `docs/fable-review-queue.md`, milestone sign-off, or new-scene
     creative direction → **Fable** (spend sparingly; it should delegate
     routine execution to Sonnet subagents rather than doing chores itself).
3. First message — paste exactly:

   ```
   /continue-samuel-sonnet
   ```

   or, for a Fable-tier session:

   ```
   /continue-samuel
   ```

   If slash commands are unavailable for any reason, paste instead:

   ```
   Read CLAUDE.md, docs/model-handoff.md, and docs/next-run.md, then continue
   the Books of Samuel project: run npm run verify, do the next task from
   docs/next-run.md, test, update docs, commit, push, and open a draft PR.
   ```

4. The repo's `.claude/settings.json` gives every Claude Code session a
   usage statusline, a checkpoint-blocking Stop hook, and a `/checkpoint`
   command automatically — see `docs/checkpoint-protocol.md`. Nothing to
   configure.

## Path B — ChatGPT Codex web (chatgpt.com/codex)

1. Go to `chatgpt.com/codex`, connect the GitHub account, and select
   `elinxie/books-of-samuel`.
2. In the environment settings, set the setup script to:

   ```bash
   npm install
   ```

   Internet access on: Codex reads `AGENTS.md` at the repo root automatically —
   it carries the constraints, role tier, and manual checkpoint protocol.

3. Give **small, single-slice tasks** (Codex has no token meter an agent can
   read, so slice size is the safety mechanism). Task prompt template:

   ```
   Read AGENTS.md and docs/next-run.md. Do exactly the next task described
   there (one slice only). Run npm run verify; if the Playwright browser is
   unavailable in the sandbox, run the rest of the gate and say so in the PR.
   Update docs/next-run.md and docs/run-log.md, commit, and open a PR against
   main.
   ```

4. Review the PR it opens; merge when green (squash). Codex must not make
   Fable-tier calls — if its PR contains one, it should be flagged in
   `docs/fable-review-queue.md` per `AGENTS.md`.

## Which path when

- **Claude Code web** for anything historical/content-heavy, multi-step, or
  needing the subagent roster (reviewers, researcher, world-director) and the
  checkpoint instrumentation. The only path for Fable-tier work.
- **Codex web** as a parallel/overflow implementation lane when Claude usage
  limits are the constraint: visual-fidelity slices, test fixes, refactors,
  doc chores — anything `docs/model-handoff.md` marks Sonnet-tier, sliced
  small.
- Both lanes converge the same way: branch off `main`, PR to `main`,
  squash-merge when green. Don't run both lanes on the _same_ task at once.

## If the previous session was cut off mid-task

1. Check `docs/session-checkpoints/` for the newest note and `git log` on the
   in-flight branch (plus its draft PR) for what actually landed.
2. Anything not committed is gone — assume the checkpoint note's
   "in-progress" item needs redoing from its last commit.
3. Resume on the same branch if its PR is still open; otherwise branch fresh
   from `main`. Then proceed as Path A/B above.
