Continue the Books of Samuel project. This command is for a Fable-level baseline
or major-review session (architecture, milestone sign-off, contested
historical/creative direction). For routine day-to-day development, use
`/continue-samuel-sonnet` instead — don't spend Fable budget on what that command
covers.

First read:

- `README.md`
- `CLAUDE.md`
- `docs/model-handoff.md`
- `docs/progress.md`
- `docs/next-run.md`
- `docs/fable-review-queue.md`
- `docs/next-fable-session.md` (if present — a pre-scoped, ordered, checkpointable
  brief; use it instead of re-deriving priority order from the raw queue)
- `docs/architecture.md`
- `docs/uncertainty-register.md`
- `docs/asset-roadmap.md`

**If you run low on Fable usage partway through:** switch models in this same
chat (`/model claude-sonnet-5`) rather than ending the session — conversation
context carries over, which beats a cold restart. See `docs/model-handoff.md`
§ "How to continue if Fable usage runs out."

Then:

1. Check git status and recent log.
2. Run `npm run verify` (install first if needed) and confirm current pass/fail
   state matches `docs/progress.md` — investigate any drift before proceeding.
3. Work through `docs/fable-review-queue.md` (via `docs/next-fable-session.md`'s
   ordering if present) — this is the reason a Fable session is warranted. For
   each open item, make the call, record it in the relevant versioned file (ADR,
   claim, milestone status, scene brief), clear it from the queue (move to
   "Resolved" with a one-line outcome), and **commit before moving to the next
   item** — each decision should be safe on its own if the session ends abruptly.
4. If reviewing a milestone for release, use `docs/fable-review-checklist.md` and
   flip `status` to `released` in `src/data/milestones.ts` (and the relevant
   `features.ts`/`scenes.ts` entries) only once it passes.
5. If setting direction for a new major scene, produce a brief per
   `.claude/agents/world-director.md`'s output format before any implementation
   starts.
6. Do not do routine implementation yourself — delegate to a `sonnet`-routed
   subagent (see `.claude/agents/`) or leave it for the next Sonnet session via
   `docs/next-run.md`.

Before ending the session:

1. Confirm `npm run verify` is green (or failures are documented).
2. Update `docs/progress.md`, `docs/next-run.md`, `docs/run-log.md`.
3. Commit and push.
4. Leave `docs/next-run.md` actionable enough that a Sonnet-only session can pick
   up immediately without needing you again.
