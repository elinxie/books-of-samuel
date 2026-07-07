# Next Fable session

**The brief that lived here (2026-07-06, "building a reusable 3D-world base")
was completed in full on 2026-07-07.** All six items — terrain generalization,
the settlement-layout call, the reenactment pattern, the asset pipeline plan,
the three Ziklag sign-offs, and the camel + violence-default creative
decisions — are resolved. See ADR-005 through ADR-009,
`docs/fable-review-queue.md`'s Resolved table, and the 2026-07-07 run-log
entry.

No Fable session is queued right now. The next natural Fable spends, in
priority order (per `docs/model-handoff.md`):

1. **Milestone 1 sign-off review** once queue #4 (citation verification)
   closes — a short `docs/fable-review-checklist.md` pass, then flip `M1` to
   `released` in `src/data/milestones.ts`.
2. **Milestone 2 scene direction** (Besor crossing, Amalekite camp) using
   `.claude/agents/world-director.md`'s brief format, before Sonnet builds 3D
   content for them.
3. Whatever accumulates in `docs/fable-review-queue.md`'s Open table.

Sonnet: don't wait on any of this — `docs/next-run.md` has your work, and none
of it is Fable-blocked.
