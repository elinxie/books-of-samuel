import type { Milestone } from './types';

export const MILESTONES: Milestone[] = [
  {
    id: 'M0',
    label: 'Milestone 0 — Repo foundation',
    status: 'released',
    passageRefs: [],
    goals: [
      'Stack chosen and documented (Vite + React + TypeScript + Three.js/R3F)',
      'GitHub Pages deployment workflow',
      'Research/source folder structure and ingestion policy',
      'Structured data model (passages, scenes, claims, sources, assets, milestones)',
      'Progress and feature tracking pages',
      'Unit + component + e2e smoke tests',
      'Continuation docs and subagent definitions',
    ],
  },
  {
    id: 'M1',
    label: 'Milestone 1 — 1 Samuel 30 vertical slice (Ziklag)',
    status: 'released',
    passageRefs: ['1 Samuel 30'],
    goals: [
      'Ziklag burned-settlement scene with smoke and ruin state',
      'Scripted return of David and the six hundred with timeline/replay',
      'Passage / location / period entry points',
      'Sources, scholarly notes, and label toggles',
      'First-person observer camera (walk + inspect modes)',
      'Quality modes (study / balanced / high)',
      'Initial bibliography and uncertainty register',
      'Citation verification pass on seeded source cards',
    ],
  },
  {
    id: 'M2',
    label: 'Milestone 2 — 1 Samuel 30 route and recovery',
    status: 'released',
    passageRefs: ['1 Samuel 30'],
    goals: [
      'Route from Ziklag toward the brook Besor',
      'Exhausted two hundred at the wadi',
      'Egyptian servant encounter',
      'Amalekite camp reconstruction (camel-use uncertainty surfaced)',
      'Recovery and spoil-distribution scenes',
      'DEM-based terrain investigation (re-scoped to M3 at the 2026-07-08 sign-off — see run log)',
    ],
  },
  {
    id: 'M3',
    label: 'Milestone 3 — 1 Samuel 31 Gilboa',
    // 2026-07-16 Fable sign-off: all three scenes built, reviewed, and approved
    // against docs/fable-review-checklist.md, with `released` gated only by the
    // page-verification items (fable-review-queue #13/#16/#17). 2026-07-19
    // Fable release pass: #16/#17 resolved 2026-07-16; #13 resolved this pass
    // (corroborated marker + disclosed extrapolation behind a scholarlyViews
    // dispute is a sufficient citation basis) — all three scenes `released`,
    // so M3 flips per the sign-off's own criterion. The gilboa real-hardware
    // perf check stays open as a non-blocking rider (docs/next-run.md).
    status: 'released',
    passageRefs: ['1 Samuel 31'],
    goals: [
      'Mount Gilboa battlefield geography',
      'Saul and his sons — honest, non-sensational death sequence with reduced-intensity mode',
      'Philistine aftermath and Beth-shan display',
      'Jabesh-gilead night retrieval route and burial',
      'Upgraded figures with period dress',
    ],
  },
  {
    id: 'M4',
    label: 'Milestone 4 — 2 Samuel 1–2',
    // 2026-08-02 Fable M4 review (queue #18 resolved): the 3-scene breakdown
    // and the atlas-overlay call for the 4th goal are CONFIRMED — no longer
    // provisional. All three scenes are built and approved as built; the
    // divided-kingdom atlas overlay (4th goal) is also built (`/atlas`).
    // 2026-08-02 Fable M4 release pass: queue #19's four citation gates all
    // closed (three affirmatively, Tell Rumeida as "checked, permanently thin"
    // per the #13 pattern) — all three scenes, both passages, and the
    // hebron/gibeon locations flipped to `released` together per the M2/M3
    // cascade precedent. Real-hardware perf + Pages-live checks stay
    // non-blocking riders (docs/next-run.md).
    status: 'released',
    passageRefs: ['2 Samuel 1', '2 Samuel 2'],
    goals: [
      'News of Saul’s death and David’s lament (`ziklag-lament`)',
      'David at Hebron; Judah anoints David (`hebron-anointing`)',
      'Abner/Ish-bosheth at Mahanaim; the pool of Gibeon and Asahel’s death (`gibeon-pool`)',
      'Early divided-kingdom political geography — built as an atlas/map UI overlay (`/atlas`, `AtlasPage`), not a 4th 3D scene, per the 2026-08-02 Fable review',
    ],
  },
  {
    id: 'M5',
    label: 'Milestone 5 — 2 Samuel 3–4',
    // 2026-08-03 Fable scope pass: 2 Sam 3 and 4 bundled into one milestone
    // (M4 precedent): 4 alone is too thin to stand — its murder site is the
    // unbuildable, disputed Mahanaim, leaving only the Hebron judgment
    // stageable — and 3–4 form one narrative unit (the collapse of the house
    // of Saul, closing at 4:12) with all staged action at the already-built
    // Hebron. Three scenes + an atlas extension; briefs in docs/design/
    // (hebron-covenant, hebron-gate, hebron-reckoning). M6 starts at 2 Sam 5.
    // 2026-08-10 M5 sign-off review (run on Opus standing in for Fable at the
    // user's explicit direction, Fable's monthly spend limit being hit — a
    // deliberate, authorized model substitution, not a provisional pass needing
    // a Fable re-review): all three scenes and the /atlas M5 phase reviewed
    // against docs/fable-review-checklist.md and APPROVED AS BUILT. M5 flips
    // planned → in-progress, not released; `released` gates on queue #20's
    // five closable citation/verification items, per the M3 #16/#17 and M4 #19
    // precedent. Two real defects found and fixed at the review (an ESV
    // paraphrase presented as a verbatim 3:1 quotation in the /atlas M5 lede;
    // atlasRegions' user-visible caption claiming a dashed outline the
    // renderer deliberately does not draw). ADR-009's dismemberment bar
    // verified holding in code, not just in captions.
    // 2026-08-12 Fable M5 release pass: queue #20's five citation gates + the
    // ADR-003 automation rider all closed (see docs/fable-review-queue.md #20
    // Resolved) — spot-checked at this pass: no forced basis/confidence
    // upgrades (herzog-1997 and king-stager-2001 both land at comparative-ane/
    // low with the regional-not-site-specific limit disclosed), and both
    // "checked, permanently thin" closures are genuine negative findings, not
    // shortcuts. Cascade executed per M3/M4 precedent: three scenes +
    // 2sam-3/2sam-4 → released, f-2sam-3-4 → done, M5 → released. hebron
    // location already released from M4, unchanged.
    status: 'released',
    passageRefs: ['2 Samuel 3', '2 Samuel 4'],
    goals: [
      'Abner’s overture and the covenant feast at Hebron (`hebron-covenant`)',
      'Joab’s killing of Abner at the Hebron gate; David’s disavowal, the funeral, and the lament (`hebron-gate`) — second application of ADR-009’s named-character-killing template',
      'Ish-bosheth’s assassination (narrated only — no Mahanaim geometry) and David’s judgment on Rechab and Baanah at Hebron (`hebron-reckoning`)',
      'Atlas overlay extension: the long war’s trend (2 Sam 3:1) and the collapse of the northern house — a `/atlas` phase update per ADR-011, not a 3D scene',
    ],
  },
  {
    id: 'M6',
    label: 'Milestone 6 — 2 Samuel 5',
    // 2026-08-23 Fable/world-director scope pass. 2 Samuel 5 stands alone as
    // one milestone — unlike M4/M5 it needs no bundling, because it contains
    // two full, distinct, buildable settings that the project has never
    // rendered (Jerusalem; the Valley of Rephaim). It resolves to **two
    // scenes plus an atlas extension**, the smallest coherent set:
    //   • 5:6–16 → `jerusalem-stronghold`. The milestone's load-bearing and
    //     most contested scene: the Jebusite stronghold on the southeastern
    //     ridge, the "you will not come in here" taunt, the *tsinnor* crux,
    //     the Millo, and the City of David naming — with Hiram's cedar and
    //     Tyrian craftsmen (5:11–12) folded in as closing beats rather than
    //     given a scene, since they are the same site and the same subject
    //     (the stronghold becoming a capital), and with 5:13–16's wives/sons
    //     list carried card-only, exactly as M5 handled 3:2–5.
    //   • 5:17–25 → `rephaim-valley`. Both Philistine engagements as one
    //     two-phase timeline, not two scenes and not narrated-only: each is
    //     two verses of action and neither stands alone (the M4/M5 bundling
    //     logic), and the text's own point is the contrast between the two
    //     answers David is given on the same ground. Deliberately a lighter
    //     violence treatment than `gilboa-battle` — the text gives one verb
    //     ("struck them"), no casualties and no named deaths, so no melee
    //     choreography is staged.
    //   • 5:1–5 (all Israel's covenant and the anointing over the united
    //     kingdom, at Hebron) gets **no fourth Hebron plaza scene**. It is
    //     compositionally a third repeat of the already-built
    //     `hebron-anointing`/`hebron-covenant` delegation-and-rite staging,
    //     while everything genuinely new about it is political geography —
    //     which the 2026-08-02 M4 review already ruled is atlas work, not
    //     scene work. Carried as `jerusalem-stronghold`'s opening cards plus
    //     a `/atlas` M6 phase (the two regions finally unify; the capital
    //     shifts Hebron → Jerusalem). This is the milestone's one genuinely
    //     contested call and is deliberately reversible — the Hebron geometry
    //     already exists, so adding the scene later is cheap — logged for
    //     confirmation as fable-review-queue #21.
    // Hard scope guard for the whole milestone: nothing from 2 Samuel 6
    // onward — no ark, no dynastic oracle, no Bathsheba, no temple — is
    // depicted or foreshadowed anywhere, including any gloss on the Solomon
    // and Nathan named in 5:14. Neither scene asserts a chronological order
    // relative to the other: 5:17's "stronghold" and the chapter's possibly
    // topical arrangement are disclosed, not resolved.
    // Briefs: docs/design/jerusalem-stronghold-brief.md,
    // docs/design/rephaim-valley-brief.md. Researcher gap cluster (Jerusalem/
    // Jebusite material culture and the extent-of-10th-century-Jerusalem
    // dispute, tsinnor philology, the Millo identification, Rephaim/
    // Baal-perazim geography, Phoenician cedar and craftsmen, the bakaim
    // species) opened as queue #22 — it gates named attributions and any move
    // past `design-placeholder`, not the builds. The tsinnor rendering bar is
    // queue #23; the never-yet-decided depiction policy for narrated divine
    // signs is queue #24, resolved 2026-08-25 as ADR-013 (docs/architecture-
    // decisions/adr-013-narrated-supernatural-depiction.md) — stated, never
    // visualized, project-wide. Released 2026-08-25: #21/#22/#23 already
    // confirmed built, #24 the last open item, closed by the ADR; the M6
    // release cascade follows the M3/M4/M5 pattern. M7 starts at 2 Samuel 6.
    status: 'released',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All Israel’s covenant with David and the anointing over the united kingdom at Hebron (2 Sam 5:1–5) — carried as context cards and a `/atlas` phase update, not a fourth Hebron scene (queue #21)',
      'The capture of the Jebusite stronghold and the founding of the City of David (`jerusalem-stronghold`) — the tsinnor crux, the Millo, and the extent of 10th-century Jerusalem all carried as `scholarlyViews`; no capture-route geometry rendered in any mode',
      'Hiram of Tyre’s cedar, carpenters, and masons, and David’s house shown under construction rather than finished — folded into `jerusalem-stronghold`, not a scene of its own',
      'The two Philistine engagements in the Valley of Rephaim as one two-phase scene (`rephaim-valley`) — a deliberately lighter battle treatment than `gilboa-battle`, with no invented divination apparatus and no visualized divine sign',
      'Atlas overlay extension: the two regions unify and the capital shifts from Hebron to Jerusalem — a `/atlas` M6 phase per ADR-011, not a 3D scene',
    ],
  },
  {
    id: 'M7',
    label: 'Milestone 7 — 2 Samuel 6',
    // 2026-08-26 Sonnet world-director scope pass (per CLAUDE.md's "Model
    // policy — do not invoke Fable" — this pass carries the architecture/
    // creative authority formerly routed to Fable directly). 2 Samuel 6
    // resolves to **two scenes**, split at the chapter's own hinge (the
    // three-month interval at Obed-edom's house, 6:11), not one scene and not
    // three:
    //   • 6:1–11 → `perez-uzzah`. The gathering, the new cart, Uzzah and
    //     Ahio driving it, the music, the death of Uzzah at the threshing
    //     floor of Nacon, the naming of Perez-uzzah, David's anger and fear,
    //     and the diversion to Obed-edom's house. The project's first-ever
    //     staging of the ark of the covenant as a physical object (form
    //     sourced from Exodus 25, a new cross-book citation precedent — queue
    //     #26) and the first working-through of ADR-013's own named "clearest
    //     future test": Uzzah's death is depictable under ADR-009, the divine
    //     strike the text says caused it is not — a new no-assailant template
    //     variant, since (unlike every prior ADR-009 named killing) there is
    //     no striker and no method to render even as elided gesture. Queue
    //     #25 logs this as the ADR-013 test case worked through.
    //   • 6:12–23 → `ark-into-jerusalem`. The ark brought up from Obed-edom's
    //     house into the City of David with sacrifices, David's dance in a
    //     linen ephod, Michal watching from the window and despising him in
    //     her heart, the tent, the offerings, the blessing and distribution
    //     to the whole multitude, the Michal/David confrontation, and the
    //     closing note on her childlessness. **Reuses `jerusalem-stronghold`'s
    //     terrain, enclosure, palette, and unfinished-house asset unchanged**
    //     — the strongest argument for the split at 6:11 rather than one
    //     scene: the observer who watched Uzzah die beside the ark in
    //     `perez-uzzah` and who already walked this exact ridge in
    //     `jerusalem-stronghold` arrives at the ark's arrival "with gladness"
    //     on already-familiar ground, which is both the text's own
    //     danger-then-blessing juxtaposition (6:11) made physical and the
    //     M5-precedent reuse discipline (do not re-invent the town) applied a
    //     second time.
    //   Two scenes, not one: 6:1–11 and 6:12–23 are compositionally distinct
    //   settings (a departure/procession/death sequence on a route corridor,
    //   vs. an arrival/festival/domestic-confrontation sequence inside an
    //   already-built city) separated by a stated three-month narrative gap —
    //   splitting at that seam is the text's own structure, not an invented
    //   one, unlike M6's topical-arrangement uncertainty. Not three scenes:
    //   neither half is thin enough on its own to need further splitting, and
    //   Michal's confrontation is compositionally inseparable from the
    //   procession/dance beats that provoke it.
    // Hard scope guard for the whole milestone: nothing from 2 Samuel 7
    // onward — the Nathan oracle, the dynastic promise, Bathsheba, the
    // temple — appears anywhere, depicted or foreshadowed, including any
    // gloss on David's "house" or "rest from his enemies," language 7:1 reuses
    // directly from this chapter's own close.
    // Briefs: docs/design/perez-uzzah-brief.md,
    // docs/design/ark-into-jerusalem-brief.md. New characters: `uzzah`,
    // `ahio`, `obed-edom` (all new); `michal` transitions from
    // referenced-only to staged for the first time. New location:
    // `kiriath-jearim` (Deir el-Azhar/Tell el-Azhar, reasonably confident
    // identification, but the project currently has no dedicated source card
    // for the site — researcher gap). Deliberately **no** `LocationEntry` for
    // the threshing floor of Nacon/Perez-uzzah or for Obed-edom's house
    // (both unlocated beyond "on the way" from Kiriath-jearim; staged with
    // disclosed placeholder positions, no atlas pin — the Baal-perazim
    // precedent, not the Mahanaim one, since both are staged rather than
    // left unbuilt). Queue #25 (Uzzah's no-assailant death template) and #26
    // (citing Exodus 25 for the ark's physical form) opened as provisional
    // calls for a later confirmation pass; neither blocks the build.
    // `mccarter-1984-ii-samuel` needs extending to 2 Samuel 6 (currently
    // covers only through 2 Samuel 5) — flagged for the researcher pass that
    // will also need to open a dedicated Kiriath-jearim source card.
    //
    // M7 sign-off (2026-08-27, Sonnet, per docs/fable-review-checklist.md —
    // no Fable, per CLAUDE.md). Both scenes built and independently
    // re-verified (grep sweeps + full gate re-run by the orchestrating
    // session after each build agent's pass, not just trusted from its
    // report), with two real defects caught and fixed during
    // ark-into-jerusalem's re-verification: a wrong 6:21-22 ESV word
    // ("my own eyes" -> "your eyes") and a citation-integrity bug
    // (claim-michal-confrontation citing mccarter-1984-ii-samuel despite its
    // own notes disclosing that source doesn't cover 2 Sam 6). Queue #25
    // (Uzzah's no-assailant death template) confirmed as built exactly per
    // brief; the one flagged implementation question — reduced mode as a
    // ~3s fade-from-view rather than an instant cut — is ratified as-is: an
    // explorable 3D scene has no true film "cut," and a brief structured
    // fade is the more restrained way to elide the aftermath without either
    // a jarring pop or Uzzah's figure lingering visibly on the ground; every
    // hard bar (no reach, no fall, identical captions in both modes) holds
    // regardless. Queue #26 (Exodus 25 cross-book citation for the ark's
    // form, no cherubim geometry) confirmed as built and held unchanged
    // across both scenes (perez-uzzah's Ark.tsx reused verbatim by
    // ark-into-jerusalem). Both closed — see docs/fable-review-queue.md's
    // Resolved section. All three of 2sam-6's ESV excerpts are now
    // live-verified (6:9/6:20 correct as entered, 6:21-22 corrected).
    // Non-blocking researcher gaps carried forward per the M3-M6 precedent
    // (honestly hedged scholarlyViews, no misattribution — not a release
    // blocker): mccarter-1984-ii-samuel's extension to 2 Samuel 6, the
    // king-stager-2001 instrument-coverage check, and a dedicated
    // Kiriath-jearim source card. Full verify gate green throughout
    // (format, lint, typecheck, 608 vitest, build, 19/19 e2e). Cascade:
    // perez-uzzah/ark-into-jerusalem -> released, 2sam-6 -> released,
    // kiriath-jearim -> released, f-2sam-6 -> done, M7 -> released.
    status: 'released',
    passageRefs: ['2 Samuel 6'],
    goals: [
      'The ark brought from Kiriath-jearim on a new cart; Uzzah and Ahio driving it; the death of Uzzah at the threshing floor of Nacon and the naming of Perez-uzzah (`perez-uzzah`) — the project’s first staging of the ark itself and the first working-through of ADR-013’s named future test (2 Sam 6:7)',
      'The three months at the house of Obed-edom the Gittite, carried as the bridge between the two scenes',
      'The ark brought up into the City of David with sacrifices, David’s dance in a linen ephod, and the tent David pitched for it (`ark-into-jerusalem`) — reusing `jerusalem-stronghold`’s terrain rather than building new Jerusalem geometry',
      'Michal’s contempt from the window and her confrontation with David, ending on her childlessness (2 Sam 6:23) — Michal’s first staged appearance in the project',
    ],
  },
  {
    id: 'M8',
    label: 'Milestone 8 — 2 Samuel 7',
    // 2026-08-27 Sonnet world-director scope pass (per CLAUDE.md's "Model
    // policy — do not invoke Fable" — this pass carries the architecture/
    // creative authority formerly routed to Fable directly). 2 Samuel 7 is a
    // fundamentally different kind of chapter than anything M1–M7 covered:
    // almost no narrated physical action at all. David sits in his house and
    // tells Nathan he wants to build a house for the ark (7:1–3); Nathan
    // initially assents; that night the word of the LORD comes to Nathan
    // (7:4–17) — a prophetic oracle with no physical mechanism whatsoever,
    // rejecting the temple plan and promising instead to build David a
    // "house" (a dynasty), an heir, and a throne established forever; Nathan
    // reports it to David (7:17); David goes in and sits before the LORD and
    // prays a long prayer of thanksgiving and petition (7:18–29). No crowd,
    // no procession, no death, no battle, no journey between locations — the
    // whole chapter could plausibly be staged as two people talking in one
    // room, then one person praying alone in that same room.
    //
    // **Resolved: one small scene, not zero, and not the established crowd/
    // procession template.** Weighed seriously against a cards-only,
    // no-3D-scene treatment — see docs/design/nathans-oracle-brief.md's
    // "Historical intent" section for the full ADR-011 decision-test
    // reasoning worked through in both directions. A card sequence could
    // honestly carry everything 7:1–29 states, with nothing lost. What tips
    // the balance toward a (very small) scene: the spatial callback of David
    // walking from his own house — now finally shown complete, since 7:1's
    // "when the king lived in his house" is the chapter's own textual license
    // to advance `claim-hiram-building` off the under-construction state
    // `jerusalem-stronghold`/`ark-into-jerusalem` deliberately held it at —
    // to the same ark-tent `ark-into-jerusalem` built, sitting where he
    // danced two milestones earlier. That is an observation a spatial medium
    // delivers and a card sequence cannot, at near-zero marginal build cost
    // (total reuse of `jerusalem-stronghold`'s terrain/palette and
    // `ark-into-jerusalem`'s tent, unchanged). This is a genuinely close call,
    // deliberately reversible (nothing about it is expensive to undo), and is
    // logged provisional as queue #27, parallel to M6's #21.
    //
    // The load-bearing design question is Nathan's oracle itself (7:4–17).
    // ADR-013 already governs narrated divine/supernatural events, but every
    // prior case had *some* physical correlate to withhold an effect from —
    // 5:24's sound in the balsam trees is a natural phenomenon; 6:7's strike
    // on Uzzah has a resulting death. 7:4–17 has neither: "the word of the
    // LORD came to Nathan" is a wholly private, internal reception with no
    // observable trace at all, no natural-phenomenon correlate, and (within
    // this chapter itself) no physical outcome either. Resolved: ADR-013's
    // stillness-only default extends cleanly, and applies more purely here
    // than in either prior case — Nathan is shown settled for the night
    // exactly as anyone would be (no receptive pose, no upward gaze, no
    // light, no camera language implying presence), and the entire content of
    // the oracle is carried by caption/card, not by any staged reception
    // beat. Logged as queue #28 — the purest ADR-013 test case to date, worth
    // a second look precisely because there is nothing at all to hold back
    // from rendering, unlike the two prior cases.
    // One scene: `nathans-oracle`, covering 2 Samuel 7 in full (7:1–29) —
    // conversation-scale (David, Nathan; no crowd claim needed at all, the
    // smallest cast of any scene to date), reusing `jerusalem-stronghold`'s
    // terrain and `ark-into-jerusalem`'s tent unchanged. New character:
    // `nathan` (the prophet) — note the namesake trap: a different Nathan,
    // one of David's sons born in Jerusalem, is already named in 5:13–16's
    // card-only list and must not be conflated with this Nathan in any
    // caption or character record. Brief: docs/design/nathans-oracle-brief.md.
    //
    // A new category of scholarly dispute, also logged provisional (queue
    // #29): whether/how to surface source-/redaction-critical readings of the
    // oracle (e.g., 7:13a's "he shall build a house for my name" is widely
    // read by critical scholars as a later insertion anticipating Solomon,
    // in tension with the surrounding unconditional-sounding promise) as
    // `scholarlyViews`. This is compositional-layering dispute, not
    // identification/historicity/translation/causation — a genuinely new
    // shape of uncertainty for this project's claim model. Decided for this
    // pass: render the received text as a single narrated event, as the
    // project already does everywhere else (it narrates the text as it
    // stands, not a reconstructed compositional history), and surface the
    // redaction-critical reading as an optional `scholarlyViews` entry if a
    // named citation is found — not by fracturing the staged event into
    // "authentic core" vs. "later addition" pieces, which would assert
    // invented certainty about compositional history with no visual
    // correlate to justify staging it differently in the first place.
    //
    // Scope bundling: 2 Samuel 7 alone, not 7 plus 8. 2 Samuel 8 (the wars
    // against Philistia/Moab/Zobah-Aram/Edom and the officials list) is a
    // different kind of unit again — a series of terse summary notices with
    // no narrated blocking either, closer in shape to M4's divided-kingdom
    // material (which became an atlas overlay, not a scene) than to anything
    // stageable here. Likely an M9 atlas-plus-cards treatment; not decided
    // now, and no geometry or claim commitments are made toward it here.
    //
    // Hard scope guard for the whole milestone: nothing from 2 Samuel 8
    // onward — Solomon named or implied as the promised offspring, Bathsheba,
    // the temple's eventual construction, any fulfillment or complication of
    // the throne promise — appears anywhere, depicted or foreshadowed. The
    // milestone renders only what 7:1–29 itself states, including the
    // "rest from his enemies" language 7:1 uses of itself (the M6/M7 hard
    // guards forbade earlier scenes from reaching forward to this exact
    // phrase; here, finally, it is the text in front of the scene, not a
    // forward gloss).
    status: 'planned',
    passageRefs: ['2 Samuel 7'],
    goals: [
      'David’s wish to build a house for the ark, and Nathan’s initial assent (7:1–3), staged in David’s house — shown complete for the first time, on 7:1’s own textual license',
      'Nathan’s night oracle (7:4–17): the LORD’s rejection of the temple plan and the promise of a dynastic “house,” an heir, and a throne established forever — rendered per ADR-013 (stated, never visualized), the project’s first divine-communication event with no physical correlate at all (queue #28)',
      'Nathan’s report of the oracle to David (7:17)',
      'David’s prayer before the LORD (7:18–29), staged at `ark-into-jerusalem`’s tent, reused unchanged',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
