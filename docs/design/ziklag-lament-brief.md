# Scene brief — News of Saul's death and David's lament (`ziklag-lament`, M4)

**PROVISIONAL — written by Sonnet, not Fable.** A world-director/Fable pass on
Milestone 4 was attempted this session (2026-07-21) and failed on launch: the
account hit its **monthly spend limit** before any work was done (not a code or
data issue — `/model to switch models` was the reported remedy). Per
`docs/model-handoff.md`'s explicit fallback ("implement the most defensible
option, mark it clearly as provisional... don't block the whole project on
Fable availability"), this brief was written by Sonnet standing in for the
`world-director` role. It follows the same section structure and depth as
`docs/design/gilboa-battle-brief.md` and is internally consistent, but **every
judgment call in it needs a Fable read before `threejs-engineer` builds from
it** — flagged in `docs/fable-review-queue.md`. Treat this as a strong draft,
not a ruling.

Scope guard: this brief covers **2 Samuel 1 only** — the Amalekite's arrival at
Ziklag with news of Saul's and Jonathan's deaths, his claimed role and
execution, and David's lament (the Song of the Bow). It does not cover Hebron
(2 Sam 2:1–7) or Ish-bosheth/Abner at Mahanaim (2 Sam 2:8–11), which need their
own briefs — see the M4 scoping note logged in `docs/fable-review-queue.md` for
the full milestone breakdown and the still-open question of whether the
pool-of-Gibeon skirmish (2 Sam 2:12–32) belongs to M4 at all.

## Historical intent

The observer should come away understanding four things:

1. **This is the same Ziklag location, a different moment.** The Amalekite
   arrives at David's camp "on the third day" after David's return from the
   Amalekite-camp campaign (1:1-2; cf. 1 Sam 30) — geographically the existing
   `ziklag` location and its M1 settlement geometry (`src/scenes/ziklag/`), not
   a new place. Reuse the settlement layout/terrain as-is; this scene is a new
   `SceneDef` at a later narrative time, not a new location build.
2. **The text gives two different accounts of Saul's death, and the gap is the
   point, not an error to silently reconcile.** 1 Samuel 31:4-5 (already built,
   `gilboa-battle`) narrates Saul falling on his own sword after his
   armor-bearer refuses to kill him. The Amalekite here claims *he* finished
   Saul off at Saul's own request (1:6-10) — most plausibly a self-serving
   fabrication to claim a reward, which David's response (execution, 1:14-16)
   treats as at minimum a confessed act of striking "the LORD's anointed,"
   whether or not the claim itself was true. Render the messenger's account as
   *reported speech inside this scene* (a dialogue/narration beat, not a
   re-enacted flashback with its own pose choreography) so the scene never
   visually asserts a second, competing version of Saul's death alongside
   Gilboa's. `claim-amalekite-account-discrepancy` should state this plainly
   per `docs/reconstruction-method.md`'s narrated-vs-corroborated discipline:
   the text presents both accounts; the project does not adjudicate which (if
   either) detail is literally true, and says so in `notes`.
3. **The execution is swift, deliberate, and about the office, not the man.**
   David's charge — "your blood be on your own head, for your own mouth has
   testified against you" (1:16) — frames this as upholding the anointed
   kingship Saul held, consistent with David's repeated refusal to harm Saul
   earlier in 1 Samuel. This is a single execution of one man, not a battle;
   ADR-009's standard/reduced split still applies (documentary distance, no
   gore, ADR-009's absolute no-dismemberment/no-blood-geometry-in-any-mode
   bar), but the scale is intimate, not a crowd scene.
4. **The lament (1:17-27) is the emotional center and should get the most
   compositional weight, not the execution.** "How the mighty have fallen" is
   one of the most quoted lines in the corpus so far; the scene should be
   staged so the observer's attention lands there — likely a stiller, more
   contemplative final beat than anything M2/M3 have used (no combat, no
   crowd motion, no dust). Consider whether a spoken/sung treatment (audio) is
   in scope or a text-forward staged recitation (David before an assembled but
   still camp) — **this specific staging choice is exactly the kind of call
   that should go back to a real Fable pass**, flagged below.

## Open design calls (flagged for Fable, not resolved here)

- **How present/participatory is the Ziklag crowd during the lament?** A
  silent, gathered camp (mirroring `b-grief`'s existing Ziklag mourning beat
  from M1) is the conservative, precedented choice — reuse `people-of-ziklag`
  at the established ~1:10 ratio, no new crowd-scale claim needed. An
  alternative (David alone/near-alone, more interior) is also textually
  defensible (the lament is presented as composed/written, 1:18, "he said it
  should be taught to the people of Judah... the Book of Jashar"). Recommend
  the gathered-camp reading for visual/emotional legibility, but this is a
  composition call, not an execution detail.
- **Should the Amalekite's account get any visual representation at all**,
  even non-diegetic (e.g., a distant, unfocused suggestion of the messenger's
  claimed scene at Gilboa), or should it be text/dialogue only? Recommend
  **text/dialogue only** — any rendered flashback risks being read as the
  scene endorsing the Amalekite's version over Gilboa's built narration, which
  would contradict point 2 above. Flagged for confirmation, not because it's
  genuinely contested, but because it sets a precedent (this is the project's
  first "a character's account differs from what was shown elsewhere") that
  future scenes may follow.
- **Does the execution need its own `depictsDeath`/advisory gate** the way
  `gilboa-battle`/`beth-shan-walls`/`jabesh-burial` do, given it's a single
  named death rather than a battle? Recommend **yes** — ADR-009's advisory is
  keyed to `SceneDef.depictsDeath`, a content flag, not a battle-scale
  threshold; a single execution is still a rendered death. This reads as a
  straightforward application of existing policy, but confirm rather than
  assume, since it would be the first non-battle scene to carry the flag.

## Visual composition

- **Terrain/settlement:** reuse the existing `ziklag` `TerrainSpec` and
  settlement layout (`src/scenes/ziklag/terrain.ts`, `settlement.ts`)
  unmodified — same place, later time. No new terrain feature needed.
- **Focal masses:** (a) the messenger's arrival and audience with
  David — torn clothes and dust on his head per 1:2 (a mourning-signal detail
  already textually explicit, unlike most of this project's costume calls —
  cite `claim-amalekite-messenger-appearance` as `biblical-text`, high
  confidence, not `design-placeholder`); (b) the execution, staged apart from
  the gathered camp, restrained and brief; (c) the lament — David positioned
  where the gathered people can see/hear him, the compositional and emotional
  climax, held longer than any other beat.
- **Lighting:** the existing Ziklag scene uses late-afternoon light
  (register/queue #3, confirmed disclosed `design-placeholder`). Recommend
  carrying that same treatment forward or shifting toward dusk for the lament
  beat specifically — mirrors Gilboa's own dawn-to-dusk arc closing on
  `b-silence`. Not load-bearing; a lighting-only call `threejs-engineer` can
  make within the existing precedent.
- **No new settlement geometry, no new terrain.** This scene should be visually
  the lightest-weight build in the project so far relative to its emotional
  weight — the discipline is restraint and stillness, not new assets.

## Scale assumptions

- **New characters needed:** `amalekite-messenger` (named only as "a young
  man," 1:2-16 — no personal name given, `biblical-text` basis). No new crowd
  claim: reuse `people-of-ziklag` and its established M1 ratio/count if the
  gathered-camp reading (above) is confirmed.
- **David, Jonathan (referenced in the lament, not shown), Saul (referenced,
  not re-shown as a body)** — all existing characters, no new claims needed
  for them individually.
- This is an intimate scene by design: one messenger, David, and a gathered-
  but-not-crowd-scale camp. No battle-scale figure counts apply.

## Camera / observer experience

- Likely three viewpoints, mirroring the M1 Ziklag scene's inspect-emphasis
  pattern rather than M3's battlefield walk emphasis: (1) the audience/arrival
  point where the messenger reports; (2) a slightly removed vantage for the
  execution (documentary distance, consistent with ADR-009); (3) wherever
  David stands or sits for the lament — the scene's primary "stay here and
  read/listen" viewpoint, likely the default.
- Walk mode is probably a minor feature here; this scene rewards standing
  still more than crossing terrain, unlike Besor or Gilboa.

## Performance target

- Trivially within budget — reuses existing Ziklag terrain/settlement
  instancing, one new character (the messenger), and the existing crowd
  system at existing ratios. No new draw-call risk anticipated; a
  `performance-reviewer` pass is still worth running post-build as routine
  practice, not because this scene is expected to be expensive.

## Required source basis

- `claim-amalekite-messenger-appearance` (biblical-text, high — torn clothes,
  dust on head, 1:2).
- `claim-amalekite-account-discrepancy` (biblical-text, high confidence that
  the text presents two accounts; explicitly disclaims adjudicating which
  detail, if either, is literally true — this is the claim that carries the
  historical-intent point 2 above).
- `claim-david-execution-response` (biblical-text, high — 1:14-16, David's
  stated rationale).
- `claim-song-of-the-bow` (biblical-text, high — the lament's existence and
  its instruction to be taught, 1:17-18; no claim about musical
  reconstruction/performance practice unless a source for ANE lament
  conventions is added first).
- No archaeology/comparative-ANE claims anticipated — this scene is entirely
  interior/textual in content, unlike the geography-driven M2/M3 scenes.

## Placeholder policy

- Messenger's dress: the "torn clothes, dust on head" detail is textually
  explicit and should be modeled as stated, not treated as
  `design-placeholder` — this is a rare case where costume detail has direct
  textual warrant.
- Everything else (exact staging distance for the execution, whether the
  lament includes any implied musical/vocal element, the gathered-camp vs.
  interior reading) stays `design-placeholder` / open per the flagged calls
  above until a Fable pass confirms or revises them.
