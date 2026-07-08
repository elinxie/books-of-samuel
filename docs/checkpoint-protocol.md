# Checkpoint protocol (token/usage limits)

Purpose: no session — Fable, Sonnet, Codex, or anything else — should ever lose
finished work to a context-window compaction, a usage-limit cutoff, or a closed
browser tab. Work is only "done" when it is committed and pushed.

## The one rule

**Commit and push after every completed slice, even if you plan to keep
working.** Everything else in this doc is instrumentation to make that easier.

## Instrumentation (Claude Code sessions)

`scripts/session-usage.mjs` reads the live session transcript (no deps, no AI
estimation) and reports context %, cumulative tokens, an estimated cost, and a
verdict. It is wired into `.claude/settings.json` three ways:

- **Statusline** — every turn shows
  `ctx 93k/200k (47%) | session in 676k / out 19k | ~$4.61 | OK | branch +N dirty`.
- **Stop hook** — if the session tries to end a turn at NOW/CRITICAL with
  uncommitted changes, the hook blocks the stop and tells the agent to
  checkpoint first (loop-safe via `stop_hook_active`).
- **SessionStart hook** — a fresh/resumed session gets one orientation line
  with current usage and a pointer here.
- **PreCompact hook** — a reminder fires before compaction.

Run it manually any time: `node scripts/session-usage.mjs` (or `--json`).

## Verdict levels

| Level    | Context % of window | Required behavior                                                        |
| -------- | ------------------- | ------------------------------------------------------------------------ |
| OK       | < 55%               | Normal work. Still commit per completed slice.                           |
| SOON     | 55–70%              | Finish the current slice, checkpoint, then decide whether to start more. |
| NOW      | 70–82%              | Stop starting things. Bring tree coherent, commit, push, update docs.    |
| CRITICAL | ≥ 82%               | Commit + push immediately, write a session-checkpoint note, wrap up.     |

Auto-compaction typically fires in the low 90s%; a compacted session _can_
continue, but summaries lose detail — never bet uncommitted work on one.

Thresholds live in `THRESHOLDS` in `scripts/session-usage.mjs`; window size
defaults to 200k (override with `CLAUDE_CONTEXT_WINDOW` for 1M-window models).

## What the numbers can and can't tell you

- **Context %** is exact (read from the transcript's own usage records).
- **Cost** is an estimate from published per-MTok rates — spend awareness only.
- **Plan usage limits** (5-hour/weekly windows on claude.ai plans) are
  account-level and _not visible_ to any tool in the session. The cumulative
  in/out totals are your best proxy: a session that has already pushed
  millions of input tokens through a Fable-tier model is a session that should
  be checkpointing aggressively. When in doubt, assume the cutoff can come at
  any turn — which is exactly what the one rule already assumes.

## Slice sizing

Plan work so any single slice — implement, test, docs, commit — fits
comfortably inside one OK→SOON span (roughly 25–30k tokens of context growth).
If a task can't fit, split it and land the pieces in dependency order. This is
the same "small, single-session slices" discipline as
`docs/visual-fidelity-roadmap.md`, applied universally.

## Checkpoint contents (when ending or nearly out)

Append `docs/session-checkpoints/<date>-<model>-<slug>.md`, compact:

- usage line from `session-usage.mjs`, gate status (`npm run verify` or which
  subset ran)
- done / in-progress (with exact file + what's left) / next action
- any provisional decision made near the limit → also flag in
  `docs/fable-review-queue.md`

`/checkpoint` (`.claude/commands/checkpoint.md`) walks all of this.

## Sessions without the instrumentation (Codex web, other agents)

Codex and other non-Claude-Code agents can't read these transcripts. The
protocol degrades to its manual form, stated in `AGENTS.md`:

- One task = one slice = one commit+push. Never batch multiple slices into one
  uncommitted run.
- Prefer several small tasks over one long one; a cutoff then costs at most
  the current slice.
- End every task by updating `docs/next-run.md` (and a session-checkpoint note
  if the task ended early or left anything half-done).

## Interaction with merges

Checkpoint commits go to the session's feature branch, never directly to
`main`. Frequent small commits are fine — the PR squash-merges into one clean
commit per `CLAUDE.md`'s git workflow, so checkpoint granularity never
pollutes `main` history.
