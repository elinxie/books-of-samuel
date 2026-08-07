# Session checkpoint — 2026-08-07, Sonnet 5, automated/scheduled session

Usage at checkpoint: `ctx 200k/200k (100%) | session in 11468k / out 41k |
~$4.93 | CRITICAL`. Stopping new work per checkpoint protocol.

## Milestone

M5 (2 Samuel 3–4), branch `claude/focused-mccarthy-3pwetx`, PR **#52 open
(draft)** against `main`.

## Done this session

All three M5 scenes built, each by a `threejs-engineer` subagent, each
independently re-verified by this orchestrating session before syncing docs
(not just taken from the build agents' own reports):

1. `hebron-covenant` (2 Sam 3:1–21) — commit `fd1834f`, `depictsDeath: false`.
2. `hebron-gate` (2 Sam 3:22–39) — commit `7aa0ae1`, `depictsDeath: true`,
   ADR-009 named-killing template 2nd application.
3. `hebron-reckoning` (2 Sam 4) — commit `adb50be`, `depictsDeath: true`,
   ADR-009 3rd application, first trigger of the absolute dismemberment bar.

Plus 4 doc-sync commits (`39a57fe`, `6ca5926` prettier-fix, `876ab30`,
`3142e7f`) and one CI fix (prettier formatting on the first doc-sync commit,
caught by PR #52's CI, fixed same session).

Final gate state: **452 vitest passing, 9/9 e2e passing, build/lint/format
clean.** Independently grep-verified each scene's brief-specific "not
allowed" list (wound/blood/weapon/anatomy geometry, killer misattribution,
forbidden site adoptions like Birket es-Sultan/medieval Tomb of Abner/
six-chamber gate, cross-milestone content leakage into 2 Sam 4+/5+) — all
three scenes came back clean.

PR #52 opened as draft, then updated with a full three-scene description
after all builds landed. Session subscribed to PR #52's activity
(`subscribe_pr_activity`) — one CI failure occurred and was fixed
(prettier formatting); no review comments yet as of this checkpoint.

## In progress / not done

- **`/atlas` M5 phase extension** (`ui-engineer`, small) — not started. Last
  piece of M5's actual scope.
- **Researcher pass** — six open citation gaps (see `docs/next-run.md` for
  the full list): McCarter coverage extension to 2 Sam 3–4 (gates
  `claim-abner-break`/`claim-abner-killing`/`claim-public-response`/
  `claim-ish-bosheth-assassination`'s hedged `scholarlyViews`), Herzog gate
  typology, King-Stager feasting/mourning material, Hebron water
  installations, and — new this session — **live ESV wording verification**
  for six new excerpts across `hebron-gate`/`hebron-reckoning` (this
  sandbox's network proxy blocks esv.org/biblegateway.com; `WebFetch`
  returns `EGRESS_BLOCKED`; needs an environment with outbound access).
- **Fable M5 sign-off review** — not started. Do this once the atlas
  extension also lands (M4 precedent: review the whole milestone package
  together). Two items specifically flagged for it: `hebron-covenant`'s
  component-reuse-not-just-constants question (ADR-006), and the
  not-live-verified ESV excerpts.
- **Real-hardware perf check of `gilboa-battle`** — long-carried-forward,
  non-blocking, unrelated to M5, still open.
- PR #52 is still open — a later session should keep watching it (or
  resubscribe) until merged.

## Known failures

None. Gate is fully green at HEAD (`3142e7f`).

## Next recommended action

Read `docs/next-run.md`'s top state section first (it's current as of this
checkpoint). Priority order: (1) atlas M5 extension via `ui-engineer`, (2)
researcher pass — flag that live ESV verification needs non-sandboxed
network access, (3) Fable M5 sign-off once atlas lands.

## Most-recently-changed files

`src/scenes/hebron-reckoning/**` (new), `src/scenes/hebron-gate/**` (new),
`src/scenes/hebron-covenant/**` (new), `src/data/{scenes,claims,characters,
passages,assets,locations,integrity.test}.ts`, `src/pages/ObservePage.tsx`,
`docs/{progress,run-log,next-run,asset-roadmap}.md`.
