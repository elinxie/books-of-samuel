# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-08-27, M7 RELEASED — Sonnet sign-off + release cascade, branch `claude/focused-mccarthy-wooqyk`)

**M7 (2 Samuel 6) is fully released.** Same session, continuing directly from
`ark-into-jerusalem`'s merge. Ran the M7 sign-off review per
`docs/fable-review-checklist.md` (Sonnet directly, no Fable, per `CLAUDE.md`).

**Queue #25 (Uzzah's no-assailant death template) confirmed**, including
the one flagged implementation question: reduced mode's ~3s fade-from-view
(rather than an instant cut) is **ratified as-is** — an explorable 3D scene
has no true film "cut," so a brief structured fade is the more restrained
elision, and every hard bar (no reach, no fall, identical captions) holds
regardless. Ruled the template for any future no-assailant death (2 Sam
24's plague deaths are the likely next case) without a fresh review each
time. **Queue #26 (Exodus 25 cross-book citation for the ark's form, no
cherubim)** confirmed held unchanged across both scenes — grep-reconfirmed
independently, not just trusted from either build note. Both moved to
`docs/fable-review-queue.md`'s Resolved table.

Release cascade executed per the M3–M6 precedent: `perez-uzzah`/
`ark-into-jerusalem` → `released`; `2sam-6` → `released`; `kiriath-jearim` →
`released`; new feature `f-2sam-6` added directly as `done` (M7 had no
feature entry at build time, same gap M5/M6 had); `M7` milestone →
`released`. All three of `2sam-6`'s ESV excerpts are now live-verified.
Full gate re-run green after the flips: format, lint, typecheck, 608
vitest, build, 19/19 e2e.

**Non-blocking gaps carried forward** (same treatment as every prior
milestone's honestly-hedged citation gaps — not release blockers):
`mccarter-1984-ii-samuel`'s extension to 2 Samuel 6 (three disputed
questions stay hedged, unattributed); `king-stager-2001`'s coverage of
musical-instrument construction/form (`claim-music-instruments` stays
`design-placeholder`); a dedicated Kiriath-jearim source card.

**What's next (Sonnet), in priority order:**

1. **Scope M8 (2 Samuel 7 onward — the dynastic oracle/Nathan's prophecy)**
   — no milestone entry, briefs, or scope decision exist yet. This is
   Sonnet's to run directly (`world-director` agent, `model: sonnet`, per
   `CLAUDE.md`'s Fable-retirement policy) before any M8 build work. 2 Samuel
   7 is a markedly different kind of chapter than 1–6 (a prophetic oracle
   and a dynastic promise, not a narrated event with physical action to
   stage) — worth reading closely for what, if anything, has scene-scale
   action to render versus what stays card-only.
2. Researcher pass on the M7 gaps above (parallelizable, doesn't block M8
   scoping): extend `mccarter-1984-ii-samuel` to 2 Samuel 6, check
   `king-stager-2001` for instrument coverage, open a dedicated
   Kiriath-jearim source card.
3. (Carried forward, still open, non-blocking) Live ESV wording verification
   for M6's three quotes (5:6b, 5:8a, 5:24) — still not checked against a
   live source.
4. (Carried forward, still open, non-blocking) Real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — long-standing,
   carried since M3.

## State before this slice (2026-08-27, M7 BOTH SCENES BUILT — `ark-into-jerusalem`, branch `claude/focused-mccarthy-wooqyk`)

**`ark-into-jerusalem` (2 Sam 6:12–23) is built** — second and last of M7's
two scenes, closing the milestone's build phase, `status: 'in-progress'`
(provisional pending M7 review). Same session, continuing directly from
`perez-uzzah`'s merge (`main` at `d6d56fd`). Dispatched `threejs-engineer`
per `docs/design/ark-into-jerusalem-brief.md`; built almost entirely from
reuse per the brief's design: `jerusalem-stronghold`'s terrain/enclosure/
palette/unfinished-house imported unchanged, `perez-uzzah`'s ark reused
unchanged, the same disclosed procession population reused and repositioned
(not doubled) for the Jerusalem arrival. New geometry limited to the tent
(explicitly not the Gibeon tabernacle), an offering ground, and Michal's
window/confrontation ground. ≈209 high-tier figures, within the 190–250
target and under `gilboa-battle`'s ~330 ceiling. `depictsDeath: false`; new
e2e test confirms no violence advisory. `michal` transitions from
referenced-only to staged for the first time in the project. David's dance
stages fully clothed at every camera distance in every mode — backed by a
genuinely structural test (`exposure.test.ts`) proving the character-rig
pipeline has no code path for bare-torso rendering, not just a policy
comment.

**Two real defects caught and fixed at this session's independent
re-verification** (orchestrating session had `WebSearch`, the build agent
did not): the 6:21–22 ESV excerpt was entered as "...I will be abased in
**my own** eyes," but every live ESV source (ESV.org, Bible.com, Biblia,
BibleHub) reads "abased in **your** eyes" (Michal's eyes) — fixed in
`passages.ts`, `scenes.ts`'s caption, `claims.ts`'s paraphrase, and the
brief itself (which had suggested the same wrong wording). Separately,
`claim-michal-confrontation` cited `mccarter-1984-ii-samuel` in its
top-level `sourceIds` despite its own notes correctly stating that source
hasn't been extended to 2 Samuel 6 — a real citation-integrity
inconsistency, not just a hedge; removed. The 6:20 quote was checked and
was already correct. Full reasoning in `docs/fable-review-queue.md`'s
2026-08-27 `ark-into-jerusalem` build note and same-day addendum.

Full gate independently re-run after the fixes: format, lint, typecheck,
608 vitest, build, 19/19 e2e — all green. `sources/source-index.json`
regenerated, byte-identical (no source-card changes). Committed and pushed
next; PR to follow the same pattern as `perez-uzzah`'s (#71): draft, CI
subscribed, merged once green per `CLAUDE.md`'s no-human-gate policy.

**What's next (Sonnet), in priority order:**

1. **A Sonnet M7 sign-off review** — both scenes are now built; this is the
   next real gate before either flips past `in-progress`. Confirm or revise
   queue #25 (Uzzah's no-assailant death template, including the
   fade-vs-instant-cut reduced-mode reading flagged in `perez-uzzah`'s own
   build note) and #26 (the Exodus cross-book ark-form citation) per
   `docs/fable-review-checklist.md`. If both hold, execute the M7 release
   cascade: `perez-uzzah`/`ark-into-jerusalem` → `released`, `2sam-6` →
   `released`, `kiriath-jearim` → `released`, a new `f-2sam-6` feature entry
   → `done`, `M7` → `released` (matching the M3–M6 cascade pattern).
2. **Live-source follow-up, non-blocking to the sign-off itself but gating
   `released`**: extend `mccarter-1984-ii-samuel` to 2 Samuel 6 — the
   cart-vs-carrying-method dispute (`perez-uzzah`), the "uncovered himself"
   literal-vs-rhetorical dispute and the 6:23 causation dispute (both
   `ark-into-jerusalem`'s `claim-michal-confrontation`) all currently carry
   unattributed `scholarlyViews`. Also confirm whether `king-stager-2001`
   covers musical-instrument construction/form specifically
   (`claim-music-instruments` stays `design-placeholder` pending this). A
   dedicated Kiriath-jearim source card is still missing too (interim
   `rainey-notley-2006` citation only).
3. (Carried forward, still open, non-blocking) Live ESV wording verification
   for M6's three quotes (5:6b, 5:8a, 5:24) — still not checked against a
   live source.
4. (Carried forward, still open, non-blocking) Real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — long-standing,
   carried since M3.

## State before this slice (2026-08-27, M7 first scene BUILT — `perez-uzzah`, branch `claude/focused-mccarthy-wooqyk`)

**`perez-uzzah` (2 Sam 6:1–11) is built** — first of M7's two scenes, the
project's first-ever staging of the ark of the covenant, `status:
'in-progress'` (provisional pending M7 review). Scheduled/automated session;
`main` (already carrying M7's scope commit, `e135d33`/PR #70) verified with a
clean baseline (`npm install` + full `npm run verify` green) before
dispatching `threejs-engineer` per `docs/design/perez-uzzah-brief.md`. Per
`CLAUDE.md`'s standing "Model policy — do not invoke Fable," this ran on
Sonnet directly, no Fable call attempted despite the scheduled prompt's offer.

New scene folder `src/scenes/perez-uzzah/` (terrain, layout, poses, entities,
`Ark.tsx` — a clean, independent, reusable ark component with no cherubim
geometry, built to be reused unchanged by the not-yet-built
`ark-into-jerusalem`). New passage `2sam-6` (shared with `ark-into-jerusalem`;
this scene spends 1 of its 3-quote ESV budget — 6:9, live-verified via
WebSearch against ESV.org/BibleHub, verbatim match). New location
`kiriath-jearim` (`identification.disputed: false`, interim
`rainey-notley-2006` citation, no dedicated source card yet — flagged gap).
**No `LocationEntry`** for the threshing floor of Nacon/Perez-uzzah or
Obed-edom's house, per the Baal-perazim precedent. New characters `uzzah`,
`ahio`, `obed-edom`; `david` extended. 9 new claims per the brief's Required
source basis list. `depictsDeath: true`; ADR-009 advisory wired and
e2e-tested (both standard and reduced mode).

**Uzzah's death (queue #25/ADR-013's own named test case) is built as
specified**: the reach is shown as gesture (his own act), then a collapse/fall
at documentary distance, no wound geometry, no visual stand-in for the divine
strike in any mode. Grep-confirmed clean: no cherubim geometry anywhere
outside disclaiming comments/direct-quote text, no light/glow/particle/wind
code at the strike beat, no 2 Sam 6:12+/7+ content anywhere. One
implementation reading flagged for the M7 review in
`docs/fable-review-queue.md`'s 2026-08-27 build note: reduced mode was built
as a ~3s fade-from-view after the stumble rather than an instant cut to a
still frame — both satisfy the hard bar, the brief doesn't fully disambiguate
which is intended.

Figure count ≈207 at high tier (180 column + 16 ambient Kiriath-jearim + 7
Obed-edom household + 4 principals) — within the brief's ≈180–235 target,
well under `gilboa-battle`'s measured ~330 high-tier ceiling (still open on
its real-hardware check). Full gate independently re-verified by the
orchestrating session after the build agent's own pass (not just taken from
its report): format, lint, typecheck, 568 vitest, build, 18/18 e2e
(`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
for e2e, same standing sandbox note). `sources/source-index.json` regenerated,
byte-identical (no source-card changes this pass). Not yet committed as of
this doc-sync edit — see next action below.

**What's next (Sonnet), in priority order:**

1. Commit and push this build (branch `claude/focused-mccarthy-wooqyk`),
   open/update its PR as draft, subscribe to CI.
2. **Build `ark-into-jerusalem`** per its brief (`threejs-engineer`) — second
   and last of M7's two scenes, reuses `jerusalem-stronghold`'s terrain/
   enclosure/palette and `perez-uzzah`'s ark asset and procession population
   unchanged. Read its dance/exposure (fully clothed, no exposure rendered in
   any mode) and sacrifice-restraint sections closely — both new kinds of
   restrained content for the project. Spends the remaining 2 of `2sam-6`'s
   ESV budget (6:20b, 6:21–22) — live-verify wording via WebSearch, don't
   enter from memory.
3. `researcher` pass on the open gaps (parallelizable, doesn't block the
   `ark-into-jerusalem` build): a dedicated Kiriath-jearim source card
   (currently none), extending `mccarter-1984-ii-samuel` to 2 Samuel 6 (named
   attribution for the cart-vs-carrying-method dispute, the 6:20b
   exposure-reading dispute, and the 6:23 causation question — the last two
   needed by `ark-into-jerusalem`, not this scene), and confirming whether
   `king-stager-2001` covers musical-instrument construction/form
   specifically (currently unconfirmed, `claim-music-instruments` stays
   `design-placeholder`).
4. (Carried forward, still open, non-blocking) Live ESV wording verification
   for M6's three quotes (5:6b, 5:8a, 5:24) — still not checked against a
   live source.
5. (Carried forward, still open, non-blocking) Real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — long-standing,
   carried since M3.
6. Then a Sonnet M7 sign-off review after both scenes are built — confirm or
   revise queue #25/#26 (including the reduced-mode fade-vs-cut reading flagged
   above) as part of that review, per `docs/fable-review-checklist.md`.

## State before this slice (2026-08-26, M7 SCOPED — Sonnet world-director pass, two ark scene briefs, no build yet, branch `claude/focused-mccarthy-yvcpud`, PR #70 draft)

**M7 (2 Samuel 6) is defined and briefed.** Scheduled/automated session;
baseline verified clean first (`npm install` + full `npm run verify` green,
using the standing `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/
chrome-linux/chrome` e2e workaround). Per `CLAUDE.md`'s "Model policy — do not
invoke Fable" (still standing, still checked first this session despite the
scheduled prompt's offer to run Fable "if needed" — that offer is superseded
by the repo's own binding instructions), this scope pass ran directly on
Sonnet via the `world-director` agent (`model: sonnet`), which now carries
the architecture/creative authority formerly routed to Fable.

**Scope decision: two scenes, split at the chapter's own three-month hinge
(6:11)** — the ark's diversion to Obed-edom's house is a stated narrative
gap, not an invented seam like M6's topical-arrangement uncertainty:

1. `perez-uzzah` (2 Sam 6:1–11) — the gathering, the departure from
   Baale-judah/Kiriath-jearim, the new cart, Uzzah and Ahio driving it, the
   music, Uzzah's death at the threshing floor of Nacon, the naming of
   Perez-uzzah, David's anger and fear, the diversion to Obed-edom's house.
   The project's first-ever staging of the ark of the covenant as a physical
   object. `depictsDeath: true`. Brief: `docs/design/perez-uzzah-brief.md`.
2. `ark-into-jerusalem` (2 Sam 6:12–23) — the ark brought up from
   Obed-edom's house into the City of David with sacrifices, David's dance in
   a linen ephod, Michal watching from the window and despising him, the
   tent, the offerings and communal distribution, the Michal/David
   confrontation, ending on her childlessness. **Reuses
   `jerusalem-stronghold`'s terrain, enclosure, palette, and unfinished-house
   asset unchanged** — the M5 Hebron-reuse discipline applied a second time,
   and also the strongest argument for splitting here rather than building
   one monolithic scene. `depictsDeath: false`. Brief:
   `docs/design/ark-into-jerusalem-brief.md`.

**Two genuinely new design problems resolved this pass, both logged as
provisional `docs/fable-review-queue.md` items for a later confirmation pass
(neither blocks the build):**

- **#25 — Uzzah's death.** ADR-013 itself names 2 Sam 6:7 as "the clearest
  future test" of the stated-never-visualized line: the death is depictable
  under ADR-009, the divine strike the text says caused it is not. Every
  prior ADR-009 named killing (Asahel, Abner, Rechab/Baanah) has a human
  assailant with a gesture to render; Uzzah's death has none. Resolved as a
  new no-assailant template variant: the reaching gesture (6:6, his own act)
  shown, then a collapse/fall at documentary distance, no wound geometry, no
  visual stand-in for the divine cause in any mode (no light, glow, wind, or
  camera language implying presence). Reduced mode elides the reach-and-fall
  entirely.
- **#26 — the ark's physical form.** No prior scene has staged the ark and 2
  Samuel 6 gives no construction detail; the only descriptive basis anywhere
  is Exodus 25:10–22 — the project's first citation of a Torah passage for an
  object's own established form (distinct from the Samuel/Chronicles
  same-event-retold-differently pattern used elsewhere). Resolved: a plain
  gold-toned chest with carrying poles, basis `biblical-text` (Exodus),
  confidence `moderate`, **no cherubim geometry in any mode** (the text names
  them, gives no visual detail, and rendering specific ANE composite-creature
  iconography would invent an artistic program no evidence attests).

**Other resolved calls worth knowing:** David's dance stages fully (vigorous,
joyful movement); Michal's exposure accusation is carried entirely by
caption/dialogue, never enacted, in any mode, at any distance — the
`jerusalem-stronghold` taunt precedent ("spoken, never enacted") extended to a
new kind of content. Sacrifice (6:13, 6:17) is depicted with the same
restraint ADR-009 applies to human death, by reasoned extension rather than a
new ADR: ritual activity conveys the offering, slaughter itself elided in
every mode. `kiriath-jearim` gets a full `LocationEntry` (Deir el-Azhar/Abu
Ghosh, reasonably confident, but **no dedicated source card exists yet** —
flagged as a researcher gap); the threshing floor of Nacon/Perez-uzzah and
Obed-edom's house both get **no** `LocationEntry` — staged with disclosed
placeholder positions only, the Baal-perazim precedent, not Mahanaim's. New
characters needed at build time: `uzzah`, `ahio`, `obed-edom` (all new);
`michal` transitions from referenced-only to staged for the first time — her
first appearance in the project as an active figure rather than a card
reference. `mccarter-1984-ii-samuel` currently covers only through 2 Samuel
5 and needs extending to 2 Samuel 6 — flagged as a researcher-pass item, same
gap noted in both briefs, not yet done.

`src/data/milestones.ts` gained the `M7` entry (`status: 'planned'`,
`passageRefs: ['2 Samuel 6']`) with the full dated scope-decision comment,
matching M4–M6's style. `src/data/scenes.ts`/`claims.ts`/`characters.ts`/
`locations.ts` were **not touched** — per every prior milestone's convention,
those get created at build time by a `threejs-engineer` pass, not at scoping
time. Full `npm run verify` green (format, lint, 546 vitest — unchanged, this
is a docs/scope-only change — build, 16/16 e2e). Commit `e2ff0ad`, pushed;
PR #70 opened as draft, CI subscribed.

**What's next (Sonnet), in priority order:**

1. **Build `perez-uzzah`** per its brief (`threejs-engineer`) — first of M7's
   two scenes, and the project's first-ever staging of the ark. Read its
   Resolved-design-calls section closely before starting: the no-assailant
   death template (queue #25) and the ark's physical form (queue #26) are
   both load-bearing and both new precedent, not routine application of an
   existing template.
2. Build `ark-into-jerusalem` per its brief (`threejs-engineer`) — reuses
   `jerusalem-stronghold`'s terrain; read its dance/exposure and sacrifice
   sections closely, both new kinds of restrained content for the project.
3. `researcher` pass on the open gaps: a dedicated Kiriath-jearim source
   card (currently none), extending `mccarter-1984-ii-samuel` to 2 Samuel 6
   (named attribution for the cart-vs-carrying-method dispute, the
   6:20b exposure-reading dispute, and the 6:23 causation question), and
   `king-stager-2001`'s coverage (or lack of it) for musical instruments and
   the distribution-beat household/courtyard conventions — parallelizable,
   doesn't block either build.
4. (Carried forward, still open, non-blocking) Live ESV wording verification
   for M6's three quotes (5:6b, 5:8a, 5:24) — still not checked against a
   live source.
5. (Carried forward, still open, non-blocking) Real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — long-standing,
   carried since M3.
6. Then a Sonnet M7 sign-off review before any status flips past `planned`/
   `in-progress` — confirm or revise queue #25/#26 as part of that review,
   per their own notes, following `docs/fable-review-checklist.md`.

## State before this slice (2026-08-25, M6 RELEASED — queue #24 closed as ADR-013, release cascade executed, branch `claude/focused-mccarthy-sqz8z0`)

**M6 (2 Samuel 5) is fully released.** This session closed the one item
`docs/fable-review-queue.md` #24 left open at the 2026-08-24 build/
sign-off pass: wrote `docs/architecture-decisions/adr-013-narrated-
supernatural-depiction.md`, ratifying `rephaim-valley`'s "stated, never
visualized" default (2 Sam 5:24) as project-wide policy for any narrated
divine/supernatural event with no described physical mechanism — it governs
the supernatural _mechanism_ only, not a text's separately-stated worldly
outcome, so it composes with ADR-009's death-depiction rules rather than
replacing them (e.g. it will not itself decide how Uzzah's death at 2 Sam
6:7 renders — that stays ADR-009's call). `claim-divine-sign-depiction`'s
notes now point to ADR-013 instead of carrying the open ratification
question. `docs/fable-review-queue.md` updated: #21/#23/#24 moved Open →
Resolved, Open table now empty.

With nothing left open, ran the M6 release cascade (M3/M4/M5 pattern):
`jerusalem-stronghold`/`rephaim-valley` scenes → `released`; `2sam-5`
passage → `released`; `jerusalem`/`valley-of-rephaim` locations →
`released`; `M6` milestone → `released`; new feature `f-2sam-5` added
directly as `done` (M6 had no feature entry at build time — same gap M5's
sign-off found and fixed for `f-2sam-3-4`). Full `npm run verify` gate
green after the flips: format, lint, 546 vitest, build, 16/16 e2e
(`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
needed for e2e in this sandbox, same standing note as every prior session).

Commits this session: `075d765` (ADR-013 + queue closure + release
cascade), on top of `c3e686a` (PR #67, the M6 build, merged into `main`
this session). Working tree is clean; both commits are local, not yet
pushed as of this doc-sync pass.

**What's next (Sonnet), in priority order:**

1. **Scope M7 (2 Samuel 6 onward)** — no milestone entry, briefs, or scope
   decision exist yet in `src/data/milestones.ts`. This is genuinely
   Sonnet's to run directly now (Fable retired project-wide, see
   `docs/model-handoff.md`) — a `world-director`-style scoping pass
   (`model: sonnet`) before any M7 build work. 2 Samuel 6 (the ark's
   return to Jerusalem, Uzzah's death) is the natural start; note ADR-013
   now governs any narrated-sign/supernatural element there, and ADR-009
   still governs Uzzah's death depiction specifically — the two compose,
   neither one alone.
2. (Carried forward, still open, non-blocking) Live ESV wording
   verification for M6's three quotes (5:6b, 5:8a, 5:24) — not yet checked
   against a live source this session, same standing caveat as prior
   milestones' releases.
3. (Carried forward, still open, non-blocking) Real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — long-standing,
   carried since M3.

## State before this slice (2026-08-24, M6 BUILT, Sonnet sign-off — queue #24 still open, branch `claude/focused-mccarthy-m17xzl`, PR #67 draft)

**Fable is not used on this project as of this session — see `CLAUDE.md`'s
"Model policy — do not invoke Fable" (user directive). Everything below that
still says "wait for Fable" or "real Fable sign-off" is superseded: Sonnet
decides queue #24 directly, next session, no waiting.**

**All M6 build work is done and gate-green.** Scheduled/automated session;
baseline verified clean first (`npm install` + `npm run verify`, e2e needs
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
— the pinned Playwright version wants a `1228` browser build, `1194` is
what's preinstalled). Four items built by dispatched subagents, each
independently re-verified by the orchestrating session (full gate re-run +
targeted greps against every brief's "Not allowed" list) before pushing:

1. `jerusalem-stronghold` (2 Sam 5:1–16, commit `e1350dd`) — ~120 figures
   high-tier, `depictsDeath: false`. New location `jerusalem`, 11 new
   claims, new passage `2sam-5`. Grepped clean for capture-mechanism
   geometry, Joab, Hebron geometry, 2 Sam 6+ content.
2. `rephaim-valley` (2 Sam 5:17–25, commit `994ec72`) — ~131 figures
   high-tier, `depictsDeath: true`, standard/reduced-mode fork, no
   fight-stance pose buckets. New location `valley-of-rephaim`
   (Baal-perazim deliberately unlocated). Grepped clean for divination
   apparatus, visualized-sign language, named commanders, triumphal
   staging, 2 Sam 6+ content.
3. Atlas M6 phase (commit `b8e4e1c`) — third `DividedKingdomMap` phase,
   regions merge, capital moves Hebron→Jerusalem, captioned as allegiance
   not territorial extent. M4/M5 phases confirmed pixel-unchanged.
4. Queue #22 researcher pass (commit `00d17b7`) — closed the Jerusalem-
   period source-card gap cluster, 7 new source cards,
   `mccarter-1984-ii-samuel` extended to 2 Sam 5. `claim-jebusite-
stronghold-form` raised design-placeholder/speculative →
   scholarly-reconstruction/low (no geometry change).

Full gate green after every commit: 546 vitest, 16/16 e2e, format/lint/
build clean (independently re-run by the orchestrating session each time,
not just taken from build-agent reports).

**M6 sign-off review ran this session** (`fable-architect`'s first call hit
a since-retired Fable spend limit — that model is no longer used on this
project at all, see the notice above). The orchestrating session ran the
review itself: **confirmed queue #21 and #23 as built** (independently
re-checked against the actual committed code — 5:1–5 stays cards-only per
#21; no capture-mechanism geometry anywhere per #23) but **left #24 open**
(the narrated-divine-sign depiction policy — the brief flags it as possibly
needing its own ADR, and this session judged that call worth a dedicated
pass rather than deciding it inline mid-review). **No status flips were made
anywhere** — `jerusalem-stronghold`, `rephaim-valley`, the atlas M6 phase,
`2sam-5`, `jerusalem`, `valley-of-rephaim`, `M6` all stay
`in-progress`/`planned` until #24 is decided. Full reasoning:
`docs/fable-review-queue.md`'s 2026-08-24 note.

A `performance-reviewer` pass on both new scenes ran this session (commit
`28f517b`) and found/fixed one real issue in each: an unhoisted
`Vector3` allocation per figure per frame in the curve-sampling pose
functions, most consequential in `rephaim-valley`'s flanking-march beat
(the brief's own flagged risk). Fixed via the established
`tmpVec`/`tmpTan` hoisting pattern; no behavior change; independently
re-verified (546 vitest, 16/16 e2e, clean build). Everything else
(terrain budgets, instancing, static-crowd baking, quality-tier scaling)
checked out clean.

**What's next (Sonnet), in priority order:**

1. **Decide queue #24 directly** — this is the single blocking item for M6
   to reach `released`. Ratify the stated-never-visualized default as-is,
   revise it, or promote it to a dedicated ADR (it will recur constantly
   from 2 Samuel 6 onward: the ark narratives, 2 Samuel 7, 2 Samuel 24).
   Then re-confirm #21/#23 hold and, if everything still holds, execute the
   release cascade: `jerusalem-stronghold`/`rephaim-valley` → `released`,
   `2sam-5` → `released`, `jerusalem`/`valley-of-rephaim` → `released`, the
   M6 feature entry → `done`, `M6` → `released`. Follow the M3/M4/M5
   sign-off checklist (`docs/fable-review-checklist.md`).
2. (Carried forward, still open, non-blocking) real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — see Environment
   notes below, unchanged.
3. Optional, non-gating: the hook/grappling-implement _tsinnôr_ view's
   Albright attribution is flagged TO VERIFY (queue #22's researcher pass
   couldn't cross-corroborate it); the M6 scenes' ESV quotes (5:6b, 5:8a,
   5:24) were entered from careful recollection with mixed WebSearch
   availability across the build sessions — worth a live-source check
   before `released`, same standing caveat several prior scenes carried at
   this stage.

## State before this slice (2026-08-23, M6 SCOPED — Fable world-director pass, briefs done, no build yet, branch `claude/focused-mccarthy-9ryrl9`)

**M6 (2 Samuel 5) is defined and briefed.** Automated/scheduled session;
baseline verified clean first (`npm install` + full `npm run verify` green)
before dispatching `world-director` (Fable-tier). Scope decision: unlike
M4/M5, no chapter-bundling was needed — 2 Sam 5 has two full, distinct,
buildable settings the project has never rendered. **Two scenes + one atlas
extension, no 4th scene:**

1. `jerusalem-stronghold` (2 Sam 5:6–16) — the milestone's load-bearing and
   most contested scene: the Jebusite stronghold capture, the _tsinnor_
   crux (rendered as a genuine unresolved crux — **no capture-route/
   water-shaft geometry in any mode, ever**), the Millo (named as a
   question, never labeled in geometry), City of David naming, Hiram's
   cedar/craftsmen folded in as a closing construction-not-palace beat
   (5:11–12), 5:13–16 card-only. `depictsDeath: false`.
   Brief: `docs/design/jerusalem-stronghold-brief.md`.
2. `rephaim-valley` (2 Sam 5:17–25) — both Philistine engagements as one
   two-phase scene (the contrast between the two answers David gets is the
   point). Deliberately lighter violence than `gilboa-battle`: no melee
   choreography, no fight-stance pose buckets, no invented divination
   apparatus, and the divine sign at 5:24 is stated by caption/stillness,
   **never visualized**. `depictsDeath: true`, ADR-009 advisory wired.
   Brief: `docs/design/rephaim-valley-brief.md`.
3. 5:1–5 (all-Israel covenant, anointing over the united kingdom, at
   Hebron) gets **no fourth Hebron scene** — carried as `jerusalem-
stronghold`'s opening cards plus a `/atlas` M6 phase (Hebron → Jerusalem
   capital shift, the two regions unify). This is the milestone's one
   genuinely contested call, logged as **fable-review-queue #21** for
   confirmation at the M6 review, and deliberately reversible (Hebron
   geometry already exists).

Both scenes state explicitly that **no figure ratio is claimed** (2 Sam 5
narrates no counts, same as `gilboa-battle`'s precedent) and both cap at or
below `gilboa-battle`'s high-tier instance count while its real-hardware
perf check stays open. Three more fable-review-queue items opened, none
blocking build: **#22** a Jerusalem/Jebusite-period source-card gap cluster
(the project currently has zero Jerusalem-period cards — Millo, _tsinnor_
philology, Rephaim/Baal-perazim geography, Phoenician cedar trade, the
unidentified _bĕkā'îm_ tree species); **#23** the _tsinnor_ identification +
the no-invented-capture-route rendering bar (extends the M5-ratified
no-invented-method restraint from killing-method to assault-method); **#24**
the new narrated-divine-sign depiction policy (stated, never visualized) —
a genuine first for the project, escalated for ratification, may deserve its
own ADR. Full reasoning in both briefs and the M6 milestone comment in
`src/data/milestones.ts`; hard guard in both: no 2 Samuel 6+ content
(ark/oracle/Bathsheba/temple) anywhere, and neither scene asserts a
chronological order relative to the other.

`src/data/scenes.ts`/`claims.ts` were **not touched** — scenes stay out of
`scenes.ts` until a `threejs-engineer` build pass, per every prior
milestone's convention. `npm run format` applied (docs table padding); full
`npm run verify` green (format, lint, 484 vitest, build, 12/12 e2e).

**What's next (Sonnet), in priority order:**

1. **Build `jerusalem-stronghold`** per its brief (`threejs-engineer`) —
   the milestone's load-bearing scene; read its Resolved-design-calls and
   Not-allowed sections closely before starting (the _tsinnor_/capture-route
   ban and the no-monumental-gate/no-finished-palace bars are load-bearing).
2. Build `rephaim-valley` per its brief (`threejs-engineer`) — second
   battle scene after Gilboa, deliberately lighter; read its
   no-divination-apparatus and no-visualized-sign sections closely.
3. Atlas `/atlas` M6 phase extension (`ui-engineer`, small) — capital shift
   Hebron → Jerusalem, region unification, per both briefs' "Companion atlas
   extension" notes.
4. `researcher` pass on queue #22's gap cluster (parallelizable, doesn't
   block the builds above — it upgrades attributions and may lift specific
   claims off `design-placeholder`, per the M5 #20 pattern).
5. (Carried forward, still open, non-blocking) real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — see Environment
   notes below, unchanged.
6. Then a Fable M6 sign-off review before any status flips past `planned`/
   `in-progress` — confirm/reverse queue #21's 5:1–5 treatment as part of
   that review, per its own note.

## State before this slice (2026-08-12, M5 RELEASED — Fable release pass, branch `claude/focused-mccarthy-hwagel`, PR #57 draft)

**M5 is fully released.** The 2026-08-12 Fable release pass confirmed queue
#20's closures as sufficient (spot-checked in `claims.ts`, not just from the
queue row: no forced basis/confidence upgrades — `claim-hebron-gate-form`/
`claim-feast-form` land at `comparative-ane`/`low` with the
regional-not-site-specific limit disclosed, renderings unchanged; the two
"checked, permanently thin" closures are genuine negative findings per the
#13/#19c standard; all five ESV quoted spans live-verified) and executed the
cascade per M3/M4 precedent: `hebron-covenant`/`hebron-gate`/
`hebron-reckoning` → `released`; `2sam-3`/`2sam-4` → `released`;
`f-2sam-3-4` → `done`; `M5` → `released`. `hebron` location unchanged
(already `released` from M4). Full reasoning in
`docs/fable-review-queue.md`'s 2026-08-12 status-flip note and
`docs/run-log.md`. Full verify gate green after the flips.

**What's next (Sonnet), in priority order:**

1. **(Top, still open, non-blocking to any release) Real-hardware perf
   check** of `gilboa-battle` at high tier + the Pages-live check — both
   still need a non-sandboxed environment; see Environment notes below,
   unchanged. Carried forward from M3 onward; do not re-litigate, just do
   them when an environment with real hardware/outbound access exists.
2. **M6 (2 Samuel 5+) needs a Fable/world-director scope pass before any
   build work** — same pattern as M3/M4/M5: no M6 milestone entry exists yet
   in `src/data/milestones.ts` (M5's comment already notes "M6 starts at
   2 Sam 5"); defining it is itself Fable-tier scope work. Do not start M6
   scene geometry without briefs.
3. Optional, non-gating: `TO VERIFY` pagination hedges on source cards if
   primary copies become accessible; DEM refinement under ADR-012;
   `f-overview-map`'s wider scope beyond the shipped `/atlas` overlay.

## State before this slice (2026-08-10, M5 SIGNED OFF — approved as built, M5 → `in-progress`, branch `claude/focused-mccarthy-97j7ef`, PR #55 draft)

**The M5 sign-off review is done.** It ran on **Opus standing in for Fable**
at the user's explicit direction, Fable's monthly spend limit still being
hit — a deliberate, authorized model substitution and a full
`docs/fable-review-checklist.md` pass. **It is not provisional in the
2026-07-22 sense and does NOT need a Fable re-review.** Full reasoning in
`docs/run-log.md`'s 2026-08-10 sign-off entry.

**Verdict: all three scenes and the `/atlas` M5 phase approved as built.**
Flips landed: `M5` `planned` → `in-progress`; new feature `f-2sam-3-4`
(`in-progress`, M5 had no feature entry at all). The three scenes and
`2sam-3`/`2sam-4` correctly stay `in-progress`; `hebron` is already
`released` from M4. Every checklist section passed. ADR-009's dismemberment
bar was re-verified against the code (not the build reports):
`hebron-reckoning`'s `AssassinPose` has only `presented`/`fallen`, no
strike/gesture field, and hands/feet occur only in comments and captions —
the no-invented-method restraint is now **ratified** as ADR-009's reading for
any future killing the text narrates without method detail.

**Two rider items were closed, not carried:** (a) the ~79-figure
`MourningAssembly` perf worry is **cleared** — one draw call, 79 matrix
updates/frame, no walk cycle, an order of magnitude under `gilboa-battle`'s
measured precedent; the `performance-reviewer` pass is optional, not a gate.
(b) The two build-agent staging calls (west-staged "northern road";
`asset-bier-props` reuse) are both **approved as shipped**.

**Two real defects were found and fixed at the review** — neither appeared in
any doc summary: `/atlas`'s M5 lede presented a _paraphrase_ of 2 Samuel 3:1
inside quotation marks with a verse citation (ESV actually reads "There was a
long war… And David grew stronger and stronger, while the house of Saul
became weaker and weaker"); and `atlasRegions.ts`'s user-visible legend
caption advertised a "dashed outline" on the headless region that
`DividedKingdomMap` deliberately renders as `stroke="none"`. Both fixed.
**ADR-003 was amended** as a result: quoted-means-verbatim, and page/UI copy
is now a third budgeted ESV surface (budgeted per page, not pooled per
passage — pooling would retroactively break released M4 content), manually
enforced for now.

**What's next (Sonnet), in priority order:**

1. ~~Queue #20 (all five items + the ADR-003 rider)~~ — **fully resolved
   2026-08-12 (Sonnet).** `mccarter-1984-ii-samuel` extended to 2 Sam 3–4;
   `claim-abner-killing`'s rival-elimination view now cites McKenzie
   (2000)/Halpern (2001) by name, `claim-public-response`'s apologia view
   cites McCarter's own 1980 "Apology of David" article directly (new card
   `mccarter-1980-apology-of-david`), `claim-abner-break`'s
   concubine-as-throne-claim note cites a new public-domain card
   (`ellicott-commentary-1878`), and `claim-ish-bosheth-assassination`'s 4:6
   MT/LXX divergence closed **checked, permanently thin** for named
   attribution (both views stay unattributed). `herzog-1997` landed a real
   gate-typology citation for `claim-hebron-gate-form` (→
   `comparative-ane`/`low`, rendering unchanged). `king-stager-2001` landed
   real coverage for `claim-feast-form` (→ `comparative-ane`/`low`) and
   corroborates `claim-abner-funeral`/`claim-mourning-dress` (basis/confidence
   unchanged on those two). `claim-hebron-pool-feature` closed **checked,
   permanently thin** (the expected #13/#19c outcome) — Birket es-Sultan
   stays not adoptable. **Item (e)**, the live ESV wording check that had
   been stuck since 2026-07-14 on this sandbox's outbound-network block: this
   session found `WebSearch` (unlike direct `WebFetch`/`curl`) actually
   reaches live Bible-text sites via search-result snippets — all five M5
   quoted spans (3:21a, 3:33b–34a, 3:38, the 4:10 fragment, 4:11a) checked
   and matched the live ESV text verbatim, no errors found. **ADR-003
   automation rider**: decided, not automated — kept manually enforced (risk
   of false positives on ordinary `.tsx` quoted strings outweighs the benefit
   for a non-blocking rider, per the 2026-07-07 priority note). Four new
   source cards; `sources/source-index.json` regenerated via
   `npm run build:sources` and the full `npm run verify` gate independently
   re-run green by the orchestrating session (format, lint, 484 vitest,
   build, 12/12 e2e — two prettier issues from the researcher pass fixed
   first; needed `npm install` since `node_modules` was missing, and
   `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
   for e2e per the standing Environment note). See `docs/fable-review-queue.md`
   #20 (moved to Resolved) and `docs/uncertainty-register.md` #16/#17 for the
   full writeup.
2. **The M5 release flip** — nothing under queue #20 gates it any longer.
   Per the M3/M4 precedent (`docs/fable-review-queue.md`'s 2026-07-19/
   2026-08-02 status-flip notes), this flip itself was done by a **Fable
   release pass** both prior times, not a bare Sonnet confirmation — run
   `fable-architect` to confirm and execute: flip the three scenes
   (`hebron-covenant`, `hebron-gate`, `hebron-reckoning`), `2sam-3`/`2sam-4`,
   `f-2sam-3-4` → `done`, and `M5` → `released` together.
3. (Carried forward, still open, non-blocking) real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — see Environment
   notes below, unchanged.

## State before this slice (2026-08-10, all M5 build work done — 3 scenes + atlas extension, branch `claude/focused-mccarthy-97j7ef`, PR #55 draft)

**The atlas M5 phase extension is DONE and gate-green** (commits
`30d1ea2`/`a8734eb`/`0e5f446`/`c9fa57c`/`aba27e6`/`37cee59`; this section
previously described it as in-progress mid-checkpoint — it finished shortly
after). A `ui-engineer` pass added an M5 phase toggle to `/atlas`
(`src/pages/AtlasPage.tsx`, reusing `DividedKingdomMap`): Judah's region
carried over unchanged from M4; the Israel-writ region gets a `headless`
variant (fainter fill only, no stroke/dashed outline, "no king" sub-label —
never removed, reassigned, or merged toward Judah's shading) reflecting
Abner's break/death and Ish-bosheth's assassination with no heir positioned
to rule. New claim `claim-atlas-m5-phase` (design-placeholder/speculative,
cross-referencing rather than re-deriving `claim-long-war`,
`claim-abner-break`, `claim-abner-killing`, `claim-public-response`,
`claim-ish-bosheth-assassination`); `claim-divided-kingdom-atlas-overlay`'s
notes updated to say it covers the M4 phase only. New store state
(`AtlasPhase`, `src/state/store.ts`), extended `DividedKingdomMap` props
(`regions`/`emphasizedIds`/`ariaLabel`, all defaulting to the existing M4
values so the M4 phase is pixel-unchanged). Hard scope guard held: no
unified/merged kingdom drawn, shaded, or captioned anywhere — 2 Samuel 5
stays entirely out, verified by dedicated test assertions (structural
guards: exactly two regions, no stroke on the headless ellipse, "2 Samuel
5 ... out of scope" disclosure present). One test-fix round was needed
(an overly brittle regex assertion false-positived; replaced with the
structural guards above, see `aba27e6`). Full gate green: format, lint,
typecheck, 484 vitest, build, 12/12 e2e (new atlas-M5-phase e2e test
included) — independently re-verified by the orchestrating session, not
just taken from the build agent's report.

**This closes out all M5 build work.** A Fable M5 sign-off review was
attempted immediately after and **failed on the first call: "You've hit
your monthly spend limit."** Same recurring constraint as the 2026-07-22 M4
incident. Unlike that one, M5's three briefs were already Fable-authored
(2026-08-03) and all three builds are plain implementation of those
already-approved briefs — no Sonnet-fallback scope/creative judgment was
attempted or needed here, only the sign-off review itself, which needs an
actual Fable pass and was not substituted. **Next session's first priority:
retry the Fable M5 sign-off** (`fable-architect`, full
`docs/fable-review-checklist.md` pass) once the spend limit has reset —
batch it, don't burn a partial session chasing it if it's still hit. The
researcher pass on five open gap clusters (non-blocking, can run before or
after the sign-off) is priority two. See the priority list further down
this section for the researcher-gap detail (still accurate — item 1 there,
the atlas extension itself, is done; item 2, the researcher pass, and item
3, the Fable sign-off, are both still open, sign-off now blocked on the
spend limit rather than on unbuilt work).

**`hebron-reckoning` (2 Sam 4) is built** — third and last of M5's three
scenes, closing the milestone, `status: 'in-progress'` (provisional, pending
Fable M5 sign-off). Commit `9fa2784`. Third application of ADR-009's
named-killing template, the strictest yet: the hands-and-feet display (4:12a)
renders not at all, caption-only — confirmed by grep that no
geometry-producing code anywhere in the scene references
hands/feet/dismemberment, only comments/captions; `AssassinPose` has only
`presented`/`fallen` fields, no strike/gesture field (unlike `gibeon-pool`'s
`reverseGrip`/`strikeExtend` or `hebron-gate`'s `strikeLean`) since 4:12a
gives no method to invent. The head renders only as a small covered/wrapped
bundle (`buildWrappedFormGeometry`). No Mahanaim geometry anywhere; the 4:6
MT/LXX entry divergence surfaced as `scholarlyViews`, hedged pending a
researcher pass. This scene is `ziklag-lament`'s deliberate textual twin
(David retells the Ziklag episode himself, 4:10) — cross-linked in claim
notes. Reuses `hebron-anointing`/`hebron-gate`'s Hebron/tomb continuity
directly; one new feature, the pool of Hebron (basin + flat water plane, no
shader, `gibeon-pool`'s exact convention, `claim-hebron-pool-feature`,
Birket es-Sultan not adopted). ~33 figures at high tier (attendants ~12,
ambient ~18, 3 principals — David, Rechab, Baanah), by far the smallest and
cheapest M5 scene, conversation-scale like `ziklag-lament`. New passage
`2sam-4` (`in-progress`, first M5 scene under it). New claims:
`claim-ish-bosheth-assassination` (scholarlyViews on the 4:6 divergence),
`claim-david-judgment`, `claim-hebron-pool-feature` (design-placeholder),
`claim-reckoning-cast-scale` (design-placeholder). New characters: `rechab`,
`baanah` (staged), `mephibosheth` (referenced-only, confined to 4:4, no
forward pointer to 2 Sam 9). `2sam-4`'s fresh ESV budget: 4:11a + the 4:10
Ziklag retelling fragment. Closing card states only what 4:12 states — no
2 Sam 5+ content anywhere, confirmed by checking the literal caption string.
New e2e test confirms the ADR-009 advisory fires for `hebron-reckoning`
specifically. Full gate green: format, lint, typecheck, 478 vitest, build,
11/11 e2e (independently re-verified).

**`hebron-gate` (2 Sam 3:22–39) is built** — second of M5's three scenes,
the milestone's load-bearing one, `status: 'in-progress'` (provisional,
pending Fable M5 sign-off). Commit `50f4253`. Second application of ADR-009's
named-character-killing template (first was Asahel, `gibeon-pool`):
documentary distance throughout, no wound/blood geometry in any mode, the
drawing-aside gesture staged as the one specific gesture, reduced mode elides
the strike entirely (verified by `poses.test.ts`: reduced-mode `strikeLean`
stays 0 through the strike window, `fallen` lands measurably earlier).
David's curse (3:29) stated plainly in caption, never visualized. Refuge-city
irony (Josh 20:7) deliberately omitted — no named citation exists yet. Gate
rendered as a modest two-chamber passage, not a monumental six-chamber type.
Reuses `hebron-anointing`/`hebron-covenant`'s Hebron continuity (same
gate-plaza); one new structure, the gate-passage interior
(`asset-hebron-gate-passage`). ~127 figures at high tier (raid party ~22,
mourning assembly ~79, ambient ~22, 4 principals — David/Joab/Abner/Abishai,
strike staged as Joab's alone), largest M5 scene. New claims:
`claim-joab-return-protest`, `claim-abner-killing` (scholarlyViews:
blood-vengeance-for-Asahel w/ legal complication noted, vs. political
rival-elimination, both hedged pending named citations),
`claim-david-disavowal`, `claim-abner-funeral`, `claim-public-response`
(scholarlyViews: apologia vs. plain-report, hedged pending
`mccarter-1984-ii-samuel`'s extension to 2 Sam 3), `claim-hebron-gate-form`,
`claim-abner-tomb-form` (rock-cut entry, medieval "Tomb of Abner" tradition
explicitly not adopted), `claim-gate-cast-scale`. No new characters (reuses
`david`/`joab`/`abner`/`abishai`). `2sam-3`'s ESV budget: `hebron-covenant`
spent one quote, this scene spent the remaining two (3:33b–34a lament core,
3:38) — both entered from memory, not live-source-verified (this sandbox has
no outbound access to Bible-text sites, same standing caveat as every prior
scene's quotes). New e2e test confirms the ADR-009 advisory fires on first
visit to `hebron-gate` specifically. Full gate green: format, lint,
typecheck, 444 vitest, build, 10/10 e2e (independently re-verified).

**`hebron-covenant` (2 Sam 3:1–21, staged from 3:20) is built** — first of
M5's three scenes, `status: 'in-progress'`. Commit `5e735e6`. Reuses
`hebron-anointing`'s Hebron terrain/town-form/terrace constants directly.
Abner's twenty rendered literally 1:1; ≈71 figures total, the smallest cast
of any scene so far. New claims: `claim-long-war`, `claim-abner-break`,
`claim-abner-overture`, `claim-covenant-feast`, `claim-feast-form`
(design-placeholder), `claim-covenant-cast-scale` (design-placeholder). New
referenced-only-by-card characters `michal`/`paltiel`/`rizpah` (never
staged). New passage `2sam-3` (`in-progress`); `hebron` location's
`sceneIds` extended. New asset `asset-feast-props`.

All three were build-only slices — no new scope/creative decisions. The
Fable world-director pass that approved M5's scope and all three briefs
already happened 2026-08-03 (see below and `docs/run-log.md`). **All three
M5 scenes are now built** (`hebron-covenant`, `hebron-gate`,
`hebron-reckoning`), each `status: 'in-progress'`, each provisional pending
a Fable M5 sign-off.

**What's next (Sonnet), in priority order — item 1 is DONE, see the state
block above; start from item 2:**

1. ~~Atlas `/atlas` M5 phase extension~~ — **done**, see the state block
   above (commits `30d1ea2` through `37cee59`).
2. Researcher pass on the five gap clusters (parallelizable): extend
   `mccarter-1984-ii-samuel` to 2 Sam 3–4
   (Davidic-apologia reading, 4:6 MT/LXX divergence, refuge-city irony,
   Abner-killing motive views — this would let
   `claim-abner-killing`/`claim-public-response`/
   `claim-ish-bosheth-assassination` attach named citations instead of their
   current hedged "e.g., scholars following..." language); extend
   `herzog-1997` with a checkable gate-typology citation for
   `claim-hebron-gate-form`; check `king-stager-2001` for feasting/mourning
   material culture — `claim-feast-form` specifically still needs this
   check; Iron Age water installations at Hebron for
   `claim-hebron-pool-feature` (likely permanently thin, same evidentiary
   state as `claim-gibeon-pool-form`).
3. Then a Fable M5 sign-off review before any status flips past
   `in-progress` — all three scenes, the atlas extension, `M5`, `f-2sam`
   (if shared with M4's feature or its own), `2sam-3`/`2sam-4` passages.
4. Non-blocking, worth a look before sign-off: `performance-reviewer` pass on
   `hebron-gate`'s ~79-figure procession crowd (`MourningAssembly.tsx` uses
   per-frame position updates on a single un-bucketed `InstancedMesh`,
   mirroring `hebron-covenant/AbnerParty.tsx`'s cost precedent at a smaller
   scale — not yet confirmed to scale cleanly at 79-90 figures;
   `hebron-reckoning` is the cheapest scene built so far and not expected to
   be a risk). Also: live ESV wording verification for all three built M5
   scenes' quotes, when an environment with outbound access to Bible-text
   sites is available.
5. (Carried forward, still open, non-blocking) real-hardware perf check of
   `gilboa-battle` at high tier + the Pages-live check — see Environment
   notes below, unchanged.

## State before this slice (2026-08-03, M5 SCOPED — Fable world-director pass, briefs done, no build yet)

**M5 (2 Samuel 3–4) is defined and fully briefed.** Fable scope decision
(reasoning in `src/data/milestones.ts` M5 comment + `docs/run-log.md`
2026-08-03): chapters 3 and 4 bundled (M4 precedent — ch. 4 alone is too
thin since its murder site is the unbuildable Mahanaim; 3–4 are one
narrative unit ending the house of Saul at 4:12; all staged action shares
the already-built Hebron). **Three scenes, all at Hebron, + one atlas
extension (no 4th scene):**

1. `hebron-covenant` — 2 Sam 3:1–21 (staged from 3:20): Abner's twenty-man
   delegation, the feast, "he went in peace." `depictsDeath: false`.
   Brief: `docs/design/hebron-covenant-brief.md`.
2. `hebron-gate` — 2 Sam 3:22–39: the recall, the killing in the midst of
   the gate (2nd application of ADR-009 §Named-character killings), David's
   disavowal/curse, funeral procession, lament, fast. The milestone's
   load-bearing scene. Brief: `docs/design/hebron-gate-brief.md`.
3. `hebron-reckoning` — 2 Sam 4: murder narrated by cards only (no Mahanaim
   geometry), assassins' arrival, David's judgment (the text's own
   `ziklag-lament` twin, 4:10), execution + burial in Abner's tomb.
   Hands-and-feet display is caption-only, absolutely (ADR-009
   dismemberment bar); the head renders only as a covered bundle.
   Brief: `docs/design/hebron-reckoning-brief.md`.
4. Atlas extension (`ui-engineer`, small): `/atlas` gains the 2 Sam 3–4
   phase — the long-war trend (3:1) and the northern house's collapse —
   same soft-region/no-borders constraints as the M4 overlay.

**Build order for Sonnet: `hebron-covenant` first** (cheapest, no death,
establishes the Hebron-continuity/asset-reuse pattern the other two depend
on), then `hebron-gate`, then `hebron-reckoning`, then the atlas extension.
Same discipline as M3/M4: scenes stay out of `scenes.ts` until built;
claims/characters/passages (`2sam-3`, `2sam-4`) created at build time per
each brief's Required source basis; passage status → `in-progress` when its
first scene leaves `planned` (confirmed convention). Hard continuity rule
in all three briefs: reuse `hebron-anointing`'s Hebron palette/massing/
layout constants — do not re-invent the town.

**Known researcher gaps flagged by the briefs (fold into a `researcher`
pass; none block the builds, all gate named attributions before release):**

- Extend `mccarter-1984-ii-samuel` coverage to 2 Sam 3–4: the
  Davidic-apologia reading (`claim-public-response` scholarlyViews), the 4:6
  MT/LXX entry divergence (`claim-ish-bosheth-assassination`), the
  refuge-city (Josh 20:7) irony note (omit entirely if no citation lands),
  and the Abner-killing motive views.
- Extend `herzog-1997` with a checkable gate-typology citation if
  `claim-hebron-gate-form` is to move past pure `design-placeholder`.
- Check `king-stager-2001` for feasting/meal material culture
  (`claim-feast-form` upgrade path) and mourning/burial customs.
- Iron Age water installations at Hebron for `claim-hebron-pool-feature`
  (likely permanently thin — Birket es-Sultan explicitly not adoptable).

No new fable-review-queue items opened: the contested calls (Michal/Paltiel
text-only, deception staged literally-and-minimally, apologia dispute as
scholarlyViews, dismemberment handling) were resolved in this Fable pass and
are recorded in the briefs. Release-gate queue items get opened at the M5
review, per the M3/M4 pattern.

**What's next (Sonnet), in priority order:**

1. Build `hebron-covenant` per its brief (`threejs-engineer`).
2. Build `hebron-gate`, then `hebron-reckoning`, per their briefs.
3. Atlas `/atlas` M5 phase extension (`ui-engineer`).
4. `researcher` pass on the four gap clusters above (parallelizable;
   doesn't block builds).
5. (Carried forward, still open, non-blocking) real-hardware perf check of
   `gilboa-battle` at high tier + Pages-live check — see Environment notes.
6. Then a Fable M5 sign-off review before any status flips past
   `in-progress`.

## State before this slice (2026-08-02, M4 RELEASED — Fable release pass, branch `claude/focused-mccarthy-n2fea6`)

**M4 is fully released.** The 2026-08-02 Fable release pass confirmed queue
#19's four citation closures as sufficient (full reasoning in
`docs/fable-review-queue.md`'s 2026-08-02 status-flip note: (a)/(b)/(d)
affirmative, (c) Tell Rumeida closed as "checked, permanently thin" per the
#13 permanent-evidentiary-state standard), verified the `/atlas` overlay had
landed (M4 goal 4), and executed the cascade per M2/M3 precedent:
`ziklag-lament`/`hebron-anointing`/`gibeon-pool` → `released`; `M4` →
`released`; `f-2sam` → `done`; `2sam-1`/`2sam-2` → `released`;
`hebron`/`gibeon` → `released`; `ziklag` → `released` (both its scenes now
released — closed an M1/M2-era oversight, jabesh-gilead precedent).
`mahanaim` stays `planned` (never built, disputed site — deliberate).
Source-index sync re-verified (regenerated = committed); full gate green
after the flips.

**What's next (Sonnet), in priority order:**

1. **(Top, still open, non-blocking to any release) Real-hardware perf check**
   of `gilboa-battle` at high tier + the Pages-live check — still need a
   non-sandboxed environment; see Environment notes below.
2. **M5 (2 Samuel 3+ or next scope) needs a Fable/world-director
   scene-direction pass before any build work** — same pattern as M2/M3/M4:
   briefs first, then Sonnet builds. Do not start M5 scene geometry without
   briefs. No M5 milestone entry exists yet in `src/data/milestones.ts`;
   defining it is itself Fable-tier scope work.
3. Optional, non-gating: `TO VERIFY` pagination hedges on source cards if
   primary copies become accessible; DEM refinement under ADR-012;
   `f-overview-map`'s wider (Philistia/Amalekite-fringe) scope beyond the
   shipped `/atlas` overlay.

## State before this slice (2026-07-22, ziklag-lament + hebron-anointing built, branch `claude/focused-mccarthy-ybp2iz`, PR #42 draft)

**Fable hit its monthly spend limit mid-session** (the very first `fable-architect` call this session errored with "You've hit your monthly spend limit"). Everything below (scope, all three briefs, and two of the three scene builds) was done by Sonnet under `docs/model-handoff.md`'s documented fallback policy and is marked **provisional** in `docs/fable-review-queue.md` #18 — it needs a real Fable pass before any M4 scene goes past `in-progress`. Do not treat any of these creative/scope calls as settled.

**`ziklag-lament` (2 Sam 1) is built** (`threejs-engineer`, this session): `status: 'in-progress'`, `depictsDeath: true`, 17 beats, 3 viewpoints (`vp-plaza`/`vp-gate`/`vp-lament`), ~12-figure cast (the project's first conversation-scale, non-crowd scene). The brief's hardest constraint held: the Amalekite's account of killing Saul is delivered as speech only, never visually corroborated against `gilboa-battle`'s own 1 Sam 31:4 — enforced by a dedicated test. New scene folder `src/scenes/ziklag-lament/`; new claims `claim-lords-anointed-principle`/`claim-execution-messenger`/`claim-royal-tokens`/`claim-mourning-dress`/`claim-song-of-the-bow`/`claim-lament-evening`; `claim-amalekite-messenger-account` gained its brief-requested `scholarlyViews`.

**`hebron-anointing` (2 Sam 2:1–7) is also built** (`threejs-engineer`, same session): `status: 'in-progress'`, `depictsDeath: false`, 6 beats, 4 viewpoints (`vp-approach-ridge` default, `vp-anointing-plaza`, `vp-household-camp`, `vp-messenger-departure`). New Judean-highland `TerrainSpec` (the project's fifth regional palette). Figure counts at high tier ≈303 (72 David's-men + 45 household + 180 assembly + 6 principals/messengers), matching the brief's ~250–310 target; the ~150–200-figure `JudahAssembly` is fully static (baked pose-bucket `InstancedMesh`es, zero per-frame cost) — deliberately cheaper per-figure than Gilboa's animated combat crowd. The "house of Judah only, not Israel" qualifier is carried in every caption touching the anointing beat, and `poses.ts` carries an explicit code-comment constraint that nothing in this scene ever stages Abner/Ish-bosheth/Mahanaim geometry (verified by the orchestrating session via grep, not just trusted from the build report). 8 new claims per the brief's list (`claim-hebron-identification`, `claim-hebron-town-form` [stays `design-placeholder`], `claim-hebron-inquiry`, `claim-david-move-hebron`, `claim-judah-anointing`, `claim-jabesh-commendation`, `claim-anointing-rite-form` [stays `design-placeholder`, `king-stager-2001` checked and doesn't cover investiture rites], `claim-judah-assembly-scale`); new `men-of-judah` group character (no invented named elders, per the brief).

**New project convention established (worth knowing, not itself a bug):** both scene builds bumped their passage's status (`2sam-1`, `2sam-2`) to `in-progress` as soon as one of their scenes left `planned`. This deliberately diverges from what `1sam-31` actually did historically (stayed `planned` through all three M3 scene builds, jumping straight to `released` at the very end — confirmed via `git log -p -- src/data/passages.ts`) — that older pattern looks like an oversight, not a deliberate policy, since scenes/features/milestones all use `in-progress` as a real intermediate state elsewhere. Treated as the correct convention going forward; not retroactively touching `1sam-31` since it's already `released`. Worth a one-line mention if a Fable pass ever reviews `docs/reconstruction-method.md`'s status-field conventions.

`f-2sam` feature is `in-progress`. Gate green on both builds: format:check, lint, typecheck, 315 vitest (after `hebron-anointing`), build, 8/8 e2e — **independently re-verified by the orchestrating session after each build, not just taken from the build agents' own reports.**

**Open verification items:**

- `ziklag-lament`'s three ESV quotes (1:23, 1:26, 1:27) were entered from model/brief recollection, not checked against a live ESV source — this sandbox has no outbound access to Bible-text sites (confirmed: proxy 403s on biblegateway/esv.org). Cross-checked against the orchestrating session's own knowledge and reads as correct ESV phrasing, but this is not the same as a live-source check.
- `claim-hebron-town-form` stays `design-placeholder` — no source card yet covers excavated early Iron IIA town form at Tell Rumeida; `rainey-notley-2006` only supports the site _identification_.

**Known open citation/sourcing gaps, not yet closed (fold into a future `researcher` pass, not blocking the remaining build below):**

- `claim-gibeon-pool-form`: whether the excavated Gibeon pool/water-tunnel predates or postdates the early Iron IIA setting of 2 Sam 2 is not established by `pritchard-gibeon-1962` as currently cataloged.
- `claim-hebron-town-form`: no source card yet covers excavated early Iron IIA town form at Tell Rumeida specifically; `rainey-notley-2006` only supports the site _identification_.
- `claim-amalekite-messenger-account`: a named critical commentary (e.g. McCarter's Anchor Bible _II Samuel_) on the Gilboa/2 Sam 1 discrepancy would strengthen sourcing beyond the text itself.
- `ziklag-lament`'s three ESV quotes need a live-source wording check (see above).

**What's next (Sonnet), in priority order:**

1. **Build the last scene, `gibeon-pool`** — `threejs-engineer` per `docs/design/gibeon-pool-brief.md`, same pattern as the two builds above. Most violence-heavy M4 scene, first named-character-kills-named-character death (Asahel) — read its Asahel-death section closely before implementing, it sets a new restraint precedent. Its "Not allowed"/scope-guard section (no 2 Sam 3+ content) is load-bearing.
2. **The atlas/map UI overlay** for M4's 4th goal (divided-kingdom context view) — not started, `ui-engineer` work once scoped further (or fold into a Fable pass first, since the atlas-vs-scene call itself is still provisional).
3. **Close the four open citation gaps above** — `researcher` pass, doesn't block the `gibeon-pool` build.
4. **A real Fable pass** to confirm/revise the whole M4 scope+briefs+build package (queue #18) once Fable's spend limit resets — batch it, don't spend a partial Fable session on it. Do this before flipping any M4 scene to `released`.
5. **(Still open, unrelated to M4, carried forward)** Real-hardware performance check of `gilboa-battle` at high tier, and the Pages-live check — both still blocked from sandboxes; see Environment notes below, unchanged.

## State before this slice (2026-07-19, M3 released — Fable release pass, branch `claude/focused-mccarthy-o8d4os`)

**M3 is fully released.** The 2026-07-19 Fable release pass confirmed the
resolved #16/#17 citation gates and made the #13 judgment call (headdress:
corroborated-adjacent citation state + `scholarlyViews` dispute label is
sufficient — full reasoning in `docs/fable-review-queue.md`'s #13 Resolved
row and `docs/run-log.md` 2026-07-19). Flips, all landed in data:
`gilboa-battle`/`beth-shan-walls`/`jabesh-burial` → `released`; `M3` →
`released`; `f-gilboa`/`f-beth-shan`/`f-jabesh` → `done`; `1sam-31` passage
and `mount-gilboa`/`beth-shan`/`jabesh-gilead` locations → `released`.
**The fable-review-queue Open table is empty.** `npm run verify` green after
the flips (status-field/doc-only diff).

**What's next (Sonnet), in priority order:**

1. **(Top, still open) Real-hardware performance check** of `gilboa-battle`
   at high quality tier — the one thing no sandboxed session can do. Ruled
   non-blocking for `released` (twice: 2026-07-16 sign-off and the
   2026-07-19 release pass), but it is the last open M3 rider. The sandboxed
   measurement only showed a ~1.5x relative frame-time regression on a
   GPU-less SwiftShader renderer — evidence it's not catastrophic, not proof
   it's fine. Load the deployed scene on a real device; if it's bad, the
   likely fixes are fewer pose buckets (4 instead of 6-8), lower figure-count
   ratios, or a capsule-fallback LOD at distance — see the 2026-07-09 state
   notes below.
2. **Pages-live check** of `https://elinxie.github.io/books-of-samuel/` —
   still blocked from sandboxes by proxy policy (see Environment notes);
   natural to fold into item 1 since both need a real browser on real
   hardware.
3. Optional, non-gating: DEM refinement for Beth-shan under ADR-012 (source
   card first); villager route-curve walking in `jabesh-burial`; the narrow
   `TO VERIFY` pagination hedges on several source cards if primary copies
   ever become accessible (no queue items — fold in opportunistically).
4. **M4 (2 Samuel 1–2) is the next milestone** — needs a Fable/world-director
   scene-direction pass before any build work (same pattern as M2/M3: briefs
   first, then Sonnet builds). Do not start M4 scene geometry without briefs.

## State before this slice (2026-07-16, M3 Fable sign-off done, branch `claude/focused-mccarthy-o8d4os`)

**The M3 sign-off review is done** (full `docs/fable-review-checklist.md`
pass — see `docs/run-log.md`'s 2026-07-16 entry). PR #30 is merged (`bebb88e`);
`main` was at `3d72f3d` when the review ran. Outcomes: M3 → `in-progress`
(approved as built; `released` gated only by page-verification),
`f-gilboa`/`f-beth-shan`/`f-jabesh` → `in-progress`; queue #12 resolved
(**ADR-012**, DEM sourcing policy), #14 resolved (battle-scale chain
approved), #15's stale duplicate row removed, #17 narrowed (**ADR-009 now
carries the funerary-burning extension** — future violence-adjacent scenes
inherit it as policy). All four build-agent-flagged ambiguities (dual-range
confidence picks, no-guard staging, even beat pacing, villager
lerp/cross-fade transit) approved as shipped — the villager transit may be
upgraded to route-curve walking as ordinary Sonnet work, no review needed.
`npm run verify` green this session (269 vitest, 8/8 e2e with the sandbox
`PLAYWRIGHT_CHROMIUM_PATH`; note: run `npm install` first in a fresh
sandbox — a missing `node_modules` makes `format:check` fall back to a
stale global prettier and fail spuriously on `src/scenes/ziklag/terrain.ts`).

**What's next (Sonnet), in priority order:**

1. **Page-verification research to clear the three `released` gates** —
   `researcher`-agent work, then a short Fable confirmation:
   - Queue **#13**: Philistine plumed-headdress attribution (gates
     `gilboa-battle`).
   - Queue **#16**: the four Beth-shan archaeological-horizon specifics
     against `mazar-beth-shean-2006` (gates `beth-shan-walls`).
   - Queue **#17** (narrowed): cremation-scholarship citations + a commentary
     source card for `claim-burning-bodies` (gates `jabesh-burial`).
     When all three clear, flip the three scenes, M3, and the three features
     to `released` together.
2. **(Still open) Real-hardware performance check** of `gilboa-battle` at
   high tier — see item 0 below; no sandbox can substitute for it.
3. Optional, non-gating: DEM refinement for Beth-shan under **ADR-012**'s
   policy (source card first); villager route-curve walking in
   `jabesh-burial`.

## State before this slice (2026-07-15, both M3 scenes built, branch `claude/focused-mccarthy-dhkjpx`, PR #30 — since merged)

**Both remaining M3 scenes are built and gate-green** (format:check, lint,
269 vitest, build, 8/8 e2e — full `npm run verify` re-run after each commit):
`beth-shan-walls` (commit `6e48f90`) and `jabesh-burial` (commit `68813b6`),
each `status: 'in-progress'`, `depictsDeath: true`, following their
world-director briefs (`docs/design/beth-shan-walls-brief.md`,
`docs/design/jabesh-burial-brief.md`) closely. Both performance-reviewed:
`beth-shan-walls` passed clean (57 figures high-tier, 24 draw calls, no
fixes needed); `jabesh-burial`'s review was in flight when this session
checkpointed — **check its result before assuming it's clean** (a
`performance-reviewer` agent was mid-run against a specific flagged concern:
possible per-frame `.clone()` calls in `JabeshBurialScene.tsx`'s
`BeatLighting` seven-day-shimmer branch, an ~18s window — may have already
applied a mechanical fix, or may still need one; check
`git log -1 --stat` on this branch for a follow-up commit before starting
new work).

New shared engine piece: `src/engine/characters/wrappedForm.ts`
(`buildWrappedFormGeometry(lengthScale)`) — a lathe-revolved wrapped-cloth
silhouette with no limb/head articulation, used for Beth-shan's four wall
display forms/biers and reused at bundle scale (`lengthScale≈0.3`) for
Jabesh's bone bundle. `claim-jabesh-retrieval` and the `men-of-jabesh`
character are shared by id across both scenes (created once, by
`beth-shan-walls`, reused by `jabesh-burial` — not duplicated).

**Not yet done this session (do next):**

1. Confirm/finish the `jabesh-burial` performance-reviewer pass (see above).
2. **Doc sync** — `docs/progress.md`, `docs/asset-roadmap.md` (new
   placeholder assets from both scenes need entries),
   `docs/uncertainty-register.md` (register #8's Jabesh composite note may
   need a "now built" update), `docs/fable-review-queue.md` (#16/#17 stay
   open — both scenes intentionally ship `in-progress` not `released`,
   gated by existing queue items, no new queue items needed unless a build
   ambiguity below warrants one). None of this was touched by the build
   agents or this orchestrating session — it's genuinely undone, not
   forgotten-and-done.
3. Update draft PR #30's body/checklist to mark `jabesh-burial` done, then
   decide: keep as draft for a Fable pass (queue #13/#16/#17 all still open
   and non-blocking-to-build, blocking-to-`released`) or mark ready — my
   read is keep it draft; nothing here needs to ship `released` yet.
4. **Build-agent-flagged ambiguities worth a second look** (both agents
   resolved these on their own judgement, flagged for review, not
   necessarily wrong): beth-shan-walls' confidence picks from the brief's
   dual-value ranges (`claim-beth-shan-town-form` moderate/low →
   `moderate`; `claim-beth-shan-control` low/moderate → `low`); the
   retrieval-party staging with no guard at all (brief says "no invented
   guard fight," agent read that as "no guard staged," not "an implied but
   unshown guard"); jabesh-burial's evenly-paced 150s beat timing (brief
   gives beat order, not seconds); the villager crowd's direct
   lerp/cross-fade transit between locations rather than route-curve
   walking.
5. Fable-review-queue #13 (Gilboa headdress citation) — still open, still
   unrelated to this session's work, still not blocking.

## State before this slice (2026-07-14, four independent slices, branch `claude/focused-mccarthy-ckjcuh`)

Landed and gate-green (format:check, lint, 151 vitest, build, 8/8 e2e), not yet
merged at doc-sync time: ADR-009 first-visit violence advisory built
(`src/ui/ViolenceAdvisory.tsx`, `SceneDef.depictsDeath`, wired for
`gilboa-battle`); ESV excerpt-budget test now also scans beat captions
(`src/data/integrity.test.ts`); "not a game" copy reworded to ADR-011 framing
(`LandingPage.tsx`/`SiteChrome.tsx`/`FeaturesPage.tsx`); two new M3
world-director briefs (`docs/design/beth-shan-walls-brief.md`,
`docs/design/jabesh-burial-brief.md` — briefs only, scenes still `planned`/
empty). Full detail: `docs/run-log.md`'s 2026-07-14 entry.

## State before this slice (2026-07-10, rig-conversion/melee-combat branch merged to main)

`claude/resolve-merge-conflicts-nqbqn8` had continued past what PR #23
actually merged (PR #23 only captured an earlier ancestor of the branch —
the simple gilboa-battle build) — 12 more commits (melee-combat, full
rig-conversion to real limbed figures, sandboxed performance measurement)
were sitting unmerged on that branch. Merged cleanly onto `main` (no
conflicts) via `claude/continue-unmerged-work-4xucqr`; full gate re-run and
green: format, lint, 144 vitest, build, 7 e2e. See "State right now
(2026-07-09, post rig-conversion slice)" below for the actual content —
nothing about it has changed, just confirming it's now on `main`. Item 0
below (real-hardware perf check) is still open; this session's gate re-run
was sandboxed/software-rendered same as before.

## State right now (2026-07-09, post rig-conversion slice)

**All five Gilboa crowd components now use real limbed figures**
(`buildCrowdLimbedGeometry`, `src/engine/characters/bodyGeometry.ts`), not
capsule+sphere blobs — the last two (`CrestRetinue`, `PhilistinePress`) were
converted this slice, completing what the melee-combat slice below started.
`DefenderLine`/`EngagedPhilistines`/`RoutingIsraelites` additionally animate
legs via baked walk-cycle/fight-stance pose buckets (`sampleWalkPoses`/
`sampleFightPoses`, `engine/characters/animation.ts`), cycling through 6-8
InstancedMesh buckets per component selected by phase each frame
(`mesh.count` set to actual per-bucket occupancy). `CrestRetinue`/
`PhilistinePress` stay single-bucket (static/idle formations, no stride to
animate). Full detail across 4 commits in `docs/run-log.md`.

**Performance: measured, not just estimated — real signal, but incomplete.**
Frame-time sampled via a headless-Chromium `requestAnimationFrame` harness
(`performance.now()` deltas, high quality tier), comparing this session's
final state against a `git worktree` checkout of `2a41aca` (the pre-session
Gilboa build) at the same scene point (rout window, the one beat that exists
unchanged in both versions): **avg frame time went from ~222ms to ~333ms, a
~1.5x regression** — real but milder than the naive worst-case math below
would suggest (figure count ~2.5x, per-figure triangles ~4x, draw calls
roughly doubled ~20→~40; costs don't compound linearly here, and a large
fixed cost — terrain/vegetation/dust, unchanged by this session — dilutes
the relative impact).

**This sandbox has no GPU** (`WEBGL_debug_renderer_info` reports `SwiftShader
Device`, a pure CPU software rasterizer) — the absolute numbers (~3-4.5 fps
either way) are meaningless for real hardware and were not reported as if
they were. The ~1.5x _relative_ regression is a real, transferable signal,
but software-rasterizer bottlenecks (fill rate, per-pixel cost) don't
necessarily scale the same way a real GPU's would (GPUs handle instanced
draw-call/triangle scaling far more gracefully) — so this is genuine
evidence the change isn't catastrophic, not proof it's fine on an actual
device. **Someone should still check the live/deployed scene on real
hardware before calling this fully safe** — that's the one thing no
sandboxed session here can substitute for.

If a real-device check does turn up a problem, the fix is likely: fewer pose
buckets (e.g. 4 instead of 6-8), reduced `defenderCount`/
`engagedInfantryCount`/general figure-count ratios, or geometry LOD (fall
back to capsules below a distance threshold) — not necessarily reverting the
real-figure/leg-animation work itself, since the measured regression is
modest relative to how large the underlying changes were.

## State before the rig-conversion slice (2026-07-09, post melee-combat slice)

**`gilboa-battle` now renders real mutual combat**, not just a rout/death
sequence: a new `DefenderLine`/`EngagedPhilistines` pair engages in a
scripted (non-interactive) swing/block/stagger clash from a new `b-line-clash`
beat (t=8) through `b-rout` (t=18), per `claim-line-defense`. User-directed —
revises the original brief's "not blow-by-blow fighting" call; logged
`docs/fable-review-queue.md` #15, non-blocking, flagged for a Fable sanity
check. Figure-count ratios were also bumped to actually match
`claim-battle-scale`'s already-landed ~1:20 ratio (previously only the claim
text said this, the render didn't) — **~325 figures at high tier, up from
~127, well above the original brief's 120–140 cap** (`docs/design/gilboa-
battle-brief.md` "Scale assumptions"). Literal draw-call count only grew
modestly (~6 new instancedMesh draw calls, DefenderLine + EngagedPhilistines,
on top of ~17-20 existing — everything here is instanced, so draw calls don't
scale with figure count), but total instanced triangle count and the
per-frame `useFrame` matrix-update cost are ~2.5x. Full `npm run verify`
equivalent (format/lint/130 vitest/build/7 e2e) is green and a manual headless
console-error check of `/observe/gilboa-battle` showed 0 errors, but **no
actual FPS/frame-time measurement has been taken** — a real
`performance-reviewer` pass (not just the self-check above) is the next
priority, not deferred further.

Still outstanding from this slice, explicitly told to the user: crowd figures
are still capsule+sphere primitives, not the real procedural rig
(`src/engine/characters/`) — no leg animation, not "real figures." The
forward-kinematics groundwork (`poseJointPositions`/`CrowdLimbPose` in
`src/engine/characters/skeleton.ts`) landed but isn't wired into any scene
component yet. This was the previous background agent's task before it
failed on an account monthly-spend-limit cutoff (not a code issue) — same
spend limit is a live constraint for whoever picks this up next.

## State before this slice (2026-07-09, post-scope-policy change + post-Gilboa-build-pass)

**Policy change landed (Fable, user-directed):** the project is now an
**atlas-first historical world with constrained game-like affordances** —
ADR-011 (`docs/architecture-decisions/adr-011-atlas-first-game-affordances.md`)
replaces the blanket "not a game" rule. Nothing about claims/sources/
anachronism/violence/ESV discipline changed. Battle stays scripted reenactment
(no player combat) unless separately approved.

**`gilboa-battle` is built** (`status: 'in-progress'`, not `planned`): this
policy branch had diverged from `main` before the build landed there (the
build session's own run-log entry notes it checked for and didn't find this
policy branch), so the two ran independently and are reconciled by this merge.
The scene is now a real, playable one — terrain shell, ~127-figure battlefield
population, beat-driven pose choreography (death sequence + rout),
military-kit attachments (incl. the disputed Philistine headdress,
principal-tier only, behind a `scholarlyViews` label), and a rout-dust
atmosphere pass. Full detail: `docs/run-log.md`'s 2026-07-09 "Gilboa build,
Steps 1–5" entry. Five commits, each independently build/lint/vitest-checked;
full gate (vitest 117/117, build, e2e 7/7, plus a manual console-error check of
`/observe/gilboa-battle` specifically) run once at the end. `npm run verify` as
a single command was not invoked — its constituent checks were run
individually instead (see run-log for exact commands); re-run the actual
`npm run verify` script next session to confirm nothing about the combined
gate itself (e.g. its own script wiring) has drifted.

Open fable-review-queue items (both non-blocking, neither newly resolved by
the build): #12 DEM sourcing ADR (deferred — v1 uses procedural `ridge`), #13
Philistine plumed-headdress verification (must clear before the scene ships
`released`).

## Next session (Sonnet): build `beth-shan-walls` and `jabesh-burial`

Items 1, "not a game" copy, and the test-gap backlog (formerly items 1/4/
small-follow-up below) are **done** as of 2026-07-14 — see `docs/run-log.md`.
Remaining:

0. **(Still open) Real-hardware performance check.** A sandboxed relative
   measurement is done (see the 2026-07-09 state note further down: ~1.5x
   frame-time regression, milder than the raw figure/triangle/draw-call
   multipliers alone would suggest) — but it was taken on a GPU-less software
   renderer (SwiftShader), so it's evidence the change isn't catastrophic, not
   proof it's fine on a real device. Someone should load the actual deployed
   scene on real hardware at high quality tier before calling this settled. If
   it turns out bad: fewer pose buckets (4 instead of 6-8), lower
   `defenderCount`/`engagedInfantryCount`/figure-count ratios, or a
   capsule-fallback LOD at distance are the likely fixes — probably not
   reverting the real-figure/leg-animation work itself, given how modest the
   measured regression was relative to how large the underlying changes were.
1. **Fable-review-queue #13** (headdress citation page-verification) — still
   open, still blocking `gilboa-battle` → `released` (not blocking further
   build work). Needs primary-source page inspection, not just bibliographic
   lookup; batch with #12 (DEM data-sourcing ADR) if both are ready for a
   Fable pass.
2. **Build `beth-shan-walls` and `jabesh-burial`** — both now have completed
   M3 world-director briefs (`docs/design/beth-shan-walls-brief.md`,
   `docs/design/jabesh-burial-brief.md`, 2026-07-14) but are still fully
   `planned`/empty in `src/data/scenes.ts` (no beats/viewpoints). This is the
   next Sonnet/`threejs-engineer` build task, mirroring how `gilboa-battle`'s
   build followed its brief. Each scene carries its own non-blocking-to-build
   queue item that gates only its path to `released`, not the build itself:
   Beth-shan → queue #16 (archaeological-horizon page-verification against
   `mazar-beth-shean-2006`); Jabesh → queue #17 (ADR-009 funerary-burning
   extension ratification + cremation-scholarship citations). Build per each
   brief's calls (wall as narrated-but-thin, four wrapped body forms, no
   dismemberment for Beth-shan; covered-before-flame pyre, wrapped bone bundle
   for Jabesh) and leave the queue items open for a later Fable pass.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- **Quick Pages-live check**: still open — the sandbox's network proxy
  returns a policy-level 403 (`connect_rejected`, confirmed via
  `/root/.ccr/__agentproxy/status`) for `elinxie.github.io`, not a transient
  error. This is a sandbox-network-policy block, not something fixable from
  inside this environment; needs checking from a session/environment with
  outbound access to that host (2026-07-14).
- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI). In the 2026-07-09 remote web session, plain
  `/opt/pw-browsers/chromium` also worked directly.
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.

**2026-08-10 late checkpoint (critical context usage):** atlas M5 extension
is now fully wired (store.ts, DividedKingdomMap.tsx, app.css, claims.ts,
atlasRegions.ts, AtlasPage.tsx, AtlasPage.test.tsx all touched — commits
30d1ea2/a8734eb/0e5f446) but **2 vitest assertions in AtlasPage.test.tsx
currently fail** (a regex expecting the page never says "David
rules/controls..." is matching current page text — not yet diagnosed).
The `ui-engineer` background agent that did this work may still be running
or may have finished and fixed it — check `ListAgents`/git log for a later
commit before re-diagnosing from scratch. If not fixed: read the failing
assertions at `AtlasPage.test.tsx` (search "David (now )?(rules...", "out
of scope"), find what text in `AtlasPage.tsx` trips them, fix, then run
the full verify gate (format, lint, typecheck, vitest, build, e2e) before
this is done. This is the very last M5 build item once fixed.
