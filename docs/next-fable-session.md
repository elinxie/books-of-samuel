# Next Fable session

**The 2026-07-08 session's two items — M1 sign-off and M2 scene direction —
are both done.** M1 (`docs/fable-review-checklist.md` pass) flipped to
`released` in `src/data/milestones.ts`; M2 direction landed as
`docs/design/besor-crossing-brief.md` + `docs/design/amalekite-camp-brief.md`,
with `SceneDef` beats/viewpoints filled in `src/data/scenes.ts` for both
scenes. See `docs/run-log.md`'s 2026-07-08 entry.

No Fable session is queued right now. The next natural Fable spends, in
priority order (per `docs/model-handoff.md`):

1. **Milestone 2 sign-off review** once `besor-crossing` and `amalekite-camp`
   are actually built (Sonnet work, tracked in `docs/next-run.md`) — a short
   `docs/fable-review-checklist.md` pass, then flip `M2` to `released` in
   `src/data/milestones.ts`.
2. **Milestone 3 scene direction** (Gilboa battlefield geography, Beth-shan
   display, Jabesh-gilead night retrieval) once M2 nears completion — this is
   also where ADR-009's violence-intensity default (standard/reduced modes)
   moves from decided to implemented.
3. Whatever accumulates in `docs/fable-review-queue.md`'s Open table (empty
   right now).

Sonnet: don't wait on any of this — `docs/next-run.md` has your work, and none
of it is Fable-blocked.
