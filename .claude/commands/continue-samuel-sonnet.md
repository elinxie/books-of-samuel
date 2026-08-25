You are continuing the Books of Samuel project, usually as Sonnet 5.

First read:

- `README.md`
- `CLAUDE.md`
- `/docs/model-handoff.md`
- `/docs/sonnet-continuation.md`
- `/docs/progress.md`
- `/docs/next-run.md`
- `/docs/fable-review-queue.md`
- `/docs/architecture.md`
- `/docs/uncertainty-register.md`
- `/docs/asset-roadmap.md`

Then:

1. Check git status.
2. Run install if needed.
3. Run lint/tests/build (`npm run verify` runs the full gate including e2e).
4. Identify the next smallest coherent task.
5. Implement it.
6. Test it.
7. Update docs.
8. Commit.
9. Leave a concise next-run note.

**Do not invoke Fable — see `CLAUDE.md`'s "Model policy — do not invoke Fable."**
For anything listed in `/docs/fable-review-queue.md` as needing review-tier
judgment, or listed under "Fixed for now" in `/docs/model-handoff.md`: implement
the most defensible option yourself, mark it provisional in the relevant
claim/doc, add it to `/docs/fable-review-queue.md` if not already there, and
keep moving.
