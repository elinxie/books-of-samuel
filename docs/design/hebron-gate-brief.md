# Scene brief — Joab, Abner, and the killing at the Hebron gate (`hebron-gate`, M5)

World-director pass, Fable, 2026-08-03. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second scene of Milestone 5, and its load-bearing
one — the second application of ADR-009's named-character-killing template
(§Named-character killings, ratified 2026-08-02), the template this killing's
own victim's death (Asahel, `gibeon-pool`) established.

Scope guard: this brief covers **2 Samuel 3:22–39** — Joab's return and protest,
the secret recall of Abner, the killing in the midst of the gate, David's public
disavowal and curse, Abner's funeral and burial at Hebron, the lament, the fast,
and the people's response. It stops at 3:39. Abner's overture and the feast
(3:1–21) belong to `hebron-covenant`; Ish-bosheth's assassination and everything
in 2 Samuel 4 belongs to `hebron-reckoning`. **Nothing from 2 Samuel 5 onward
may appear, depicted or textually foreshadowed** — including the eventual fates
of Joab (1 Kgs 2) or any later payoff of David's curse. The closing card may
point forward to `hebron-reckoning` only.

## Historical intent

The observer should come away understanding four things:

1. **This killing is presented as a breach, not a battle.** Abner left Hebron
   under safe-conduct — the narrative says "he went in peace" three times
   (3:21, 22, 23) before letting Joab act. The killing happens inside David's
   own capital, at its gate, against a guest whose negotiation David had just
   accepted. The staging must make the breach legible: no combat framing, no
   confrontation staging, no drawn-weapons standoff — a man drawn aside for a
   private word and struck. This is categorically different from `gibeon-pool`'s
   battlefield death, and the scene should feel different.
2. **The text gives two motives and adjudicates neither fully.** 3:27 says Joab
   struck Abner "for the blood of Asahel his brother"; 3:24–25 gives Joab's own
   stated reason (Abner came to deceive you, to spy). Scholars additionally read
   a third motive the text leaves implicit (Abner as Joab's obvious rival for
   command of a united army). Blood-vengeance for a battlefield killing is
   itself legally contested in the narrative's own world — Asahel died in open
   war after warnings, which is exactly why David's verdict (and later
   1 Kgs 2:5's "avenging in peacetime blood shed in war") treats this as
   murder, not lawful vengeance. Surface this as `scholarlyViews` on the
   killing claim; do not editorialize Joab into a simple villain or a simple
   avenger. What the captions may assert as fact is what the text asserts:
   the recall, the aside, the strike, the stated Asahel connection, and
   David's verdict _as David's verdict_.
3. **David's innocence is the narrative's insistence — present it as the
   narrative's.** 3:26b ("but David did not know it"), the curse on Joab's
   house, the commanded public mourning, the lament, the fast, and 3:36–37's
   explicit "all the people understood that it had not been the king's will"
   form one of the clearest examples of what scholarship (McCarter and others)
   calls the apology of David — a narrative visibly concerned to clear David
   of a politically convenient death. Whether that reflects accurate reporting
   or apologetic shaping is a genuine scholarly dispute: carry it as
   `scholarlyViews` (apologia reading vs. plain-report reading) on the
   public-response claim, per the never-fake-consensus rule. The scene stages
   what the text narrates; the dispute about _why the text narrates it so
   emphatically_ lives in the claim layer.
4. **The funeral is the scene's gravitational center, not an epilogue.** The
   text spends more verses on the mourning (3:31–39) than the murder (3:26–27).
   Its most striking detail: David orders **Joab himself** to tear his clothes
   and mourn before Abner's bier (3:31) — the killer made a public mourner at
   his victim's funeral. Stage it exactly as narrated, without caption
   commentary on Joab's interior state (the text gives none). David walking
   behind the bier, the weeping at the grave, the lament, and the sundown fast
   carry the scene's second half at funeral pace — do not compress.

## Resolved design calls (this pass)

- **The recall from the cistern of Sirah is narrated, not staged.** 3:26's
  messengers overtake Abner off-scene at an unbuilt, unidentified site; a
  caption carries it (including "but David did not know it" — load-bearing,
  stated at the point the text states it). Abner re-enters the scene already
  returning through the gate.
- **The aside is staged literally and minimally.** 3:27: Joab "took him aside
  into the midst of the gate to speak with him privately." Stage the
  drawing-aside gesture into the gateway's interior shadow — no invented
  dialogue, no invented struggle, no invented accomplices beyond what 3:30
  states (Abishai is named as sharing responsibility; he may be present near
  the gate but the text attributes the strike to Joab alone — stage the strike
  as Joab's alone).
- **ADR-009 named-killing template, second application:** documentary
  distance; no wound/blood geometry in any mode; the text's one specific
  non-graphic detail shown as gesture — here, **the drawing-aside itself**
  (the privacy pretext is the killing's method the way the reversed grip was
  Asahel's); strike at or behind the gate's shadow line, camera holds at
  distance, fall read by silhouette. **Held reaction beat:** the text supplies
  no bystander freeze here — the reaction the text gives is David's (3:28ff).
  Bridge with a short held still on the gate itself (figures at distance
  noticing, motionless) before cutting to the disavowal; keep it brief and
  unscored, then let David's words carry the reaction. Reduced mode: elide the
  strike — cut from the aside to the aftermath card; caption states plainly
  that Joab struck Abner in the stomach and he died, for the blood of Asahel.
- **The gate is a modest chambered gateway, disclosed as a placeholder.**
  "The midst of the gate" requires an interior — a gateway deep enough to
  draw someone aside into. Tell Rumeida's 11th–10th-century town form is
  permanently thin (queue #19c) and no gate is attested; render a modest
  two-chamber gate passage consistent with `hebron-anointing`'s existing
  gate-plaza massing, claimed as `design-placeholder`, upgradeable to
  `comparative-ane` (generic early Iron II gate typology) only if a researcher
  pass extends `herzog-1997` — his urban-form monograph covers gate types —
  with a checkable citation. Do not model a monumental six-chamber
  Solomonic-type gate; that would be both an over-claim for Hebron and an
  anachronism risk for the period.
- **A refuge-city note may appear only with a named citation.** Hebron is
  listed as a city of refuge (Josh 20:7), and commentators have long noted the
  irony of a blood-killing "in the midst of the gate" of such a city. This is
  a cross-canonical observation the project may surface in claim `notes` —
  but only attributed to a named commentator once a researcher pass attaches
  one (McCarter extension is the natural candidate). If no citation lands by
  release, omit the note entirely; do not ship it as the project's own
  editorial observation.
- **Funeral staging follows the text's own props list and nothing more:**
  torn clothes, sackcloth, a bier, a grave at Hebron, weeping, the lament,
  fasting until sundown. Abner's body on the bier renders as a wrapped,
  anatomically unresolved form (`buildWrappedFormGeometry`, the ADR-009
  funerary standard). The tomb is a simple rock-cut entry, `design-placeholder`
  — do **not** adopt the medieval "Tomb of Abner" tradition in modern Hebron
  as a site or form.
- **David's curse (3:29) is quoted or summarized honestly, not softened.**
  The curse's content is harsh (discharge, leprosy, the spindle, the sword,
  hunger); reduction abstracts depiction, never facts — the caption carries
  what the text says in both modes. No visualization of any curse content.

## Visual composition

- **Terrain/town:** identical Hebron continuity rule as `hebron-covenant` —
  reuse `hebron-anointing`'s palette, massing, and layout constants. The one
  new structure is the gate passage interior (see above).
- **Focal masses, in sequence:** (a) **the gate and its plaza** — the killing
  ground, staged first; the same plaza that hosted the anointing (M4) and
  received Abner in peace (`hebron-covenant`) — the reuse is the point;
  (b) **the procession route** — from the town through the plaza to the tomb,
  the funeral's spine; (c) **the tomb ground** — a modest rock-cut entry on
  the hill's flank; (d) **the mourning assembly** — "all the people" (3:31–32,
  35–36), the scene's one crowd.
- **Sightlines:** the gate vantage frames the passage interior at documentary
  distance — the observer can see _that_ the aside happens, never a close-up
  of the strike. The procession vantage is low and slow, walking pace, David
  visibly _behind_ the bier (3:31's own blocking). The tomb vantage holds the
  weeping and the lament. No triumphal or thriller framing anywhere.
- **Lighting:** the killing and disavowal in flat daylight (hour unstated,
  disclosed placeholder — resist dramatic storm-light); the fast beat
  references sundown (3:35 "till the sun goes down") — the one text-fixed
  lighting cue; use it for the closing beats exactly as `gibeon-pool` used
  2:24's sundown.

## Scale assumptions

- **Principals:** David, Joab, Abner, Abishai (present per 3:30's shared
  culpability; strike is Joab's alone). No other named figures staged.
- **Joab's returning raid party (3:22, "from a raid, bringing much spoil"):
  disclosed design count ≈ 15–25 figures** — enough to read as a returning
  force, no narrated number.
- **The mourning assembly ("all the people," 3:31–36): disclosed
  representative crowd ≈ 60–90 figures** — the same no-narrated-count,
  representative-assembly convention as `claim-judah-assembly-scale`; smaller
  than the anointing crowd (a funeral, not a tribal founding), and mostly
  static pose buckets.
- **Ambient town: ≈ 15–25.**
- **High-tier total ≈ 100–140 figures** — the largest M5 scene, still at or
  below Gilboa's band, and cheaper (procession-pace movement, no combat
  choreography).

## Camera / observer experience

- **Default viewpoint** (`vp-gate-plaza`): the plaza with the gate passage in
  frame — continuity anchor and killing ground in one.
- Additional viewpoints: **the gate interior approach** (`vp-gate-shadow`,
  documentary distance on the aside/strike — never inside arm's reach);
  **the procession route** (`vp-procession`, walk/follow emphasis — a strong
  candidate for ADR-011's guided-path affordance at funeral pace); **the tomb
  ground** (`vp-tomb`, the lament and weeping); **David's vantage**
  (`vp-kings-response`, where the disavowal, curse, and 3:38–39 close are
  delivered).
- **Timeline beats** (`depictsDeath: true`; standard default per ADR-009,
  advisory wires automatically; suggested duration ~180s):

  | Beat             | Text     | Standard                                                                                                                                                                                                                                          | Reduced                                                                                                          |
  | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
  | `b-joab-returns` | 3:22–23  | Joab's party returns with spoil; he is told Abner came and "has gone in peace" (third repetition — keep it in the caption). No violence.                                                                                                          | identical                                                                                                        |
  | `b-protest`      | 3:24–25  | Joab's protest to David — his stated deception/spying reading, carried as his words. Dialogue beat.                                                                                                                                               | identical                                                                                                        |
  | `b-recall`       | 3:26     | Card + staging gap: messengers sent after Abner; the cistern of Sirah narrated only; "but David did not know it" stated here, where the text states it.                                                                                           | identical                                                                                                        |
  | `b-gate-aside`   | 3:27a    | Abner re-enters through the gate; Joab draws him aside into the passage's interior — the privacy-pretext gesture, staged literally, no invented dialogue.                                                                                         | identical                                                                                                        |
  | `b-abner-death`  | 3:27b    | The strike at documentary distance, at/behind the gate's shadow line; fall by silhouette; no wound/blood geometry. Caption: struck "in the stomach... for the blood of Asahel his brother." Short held still on the gate.                         | Strike elided — cut from the aside to the aftermath; caption states the fact, the method, and the stated motive. |
  | `b-david-hears`  | 3:28–30  | David's public self-exculpation and the curse on Joab's house — quoted/summarized honestly, unsoftened, unvisualized. 3:30's Abishai co-responsibility stated.                                                                                    | identical                                                                                                        |
  | `b-mourning-cmd` | 3:31     | David commands mourning; **Joab tears his clothes and puts on sackcloth with the rest** — staged as narrated, no interiority captioning. David takes his place behind the bier.                                                                   | identical                                                                                                        |
  | `b-procession`   | 3:31–32a | The bier (wrapped form) carried to the tomb at funeral pace; the crowd follows; walk/guided-path emphasis.                                                                                                                                        | identical                                                                                                        |
  | `b-burial-weep`  | 3:32b    | Burial at Hebron; David weeps aloud at the grave; all the people weep. Held, unhurried.                                                                                                                                                           | identical                                                                                                        |
  | `b-lament`       | 3:33–34  | The lament sung/spoken over the grave — ESV excerpt spend (see budget). No invented melody (standing `ziklag-lament` rule).                                                                                                                       | identical                                                                                                        |
  | `b-fast`         | 3:35     | The people urge David to eat; his oath to fast till sundown. Sundown lighting begins here per the text.                                                                                                                                           | identical                                                                                                        |
  | `b-people-note`  | 3:36–37  | Card/caption: everything the king did pleased the people; "it had not been the king's will" — presented as the narrative's own insistence (the apologia dispute lives on the claim, not in the caption).                                          | identical                                                                                                        |
  | `b-close`        | 3:38–39  | Closing beats at sundown: "a prince and a great man has fallen this day in Israel"; "these men, the sons of Zeruiah, are more severe than I." Forward pointer to `hebron-reckoning` only. **No 2 Samuel 5+ content, no Joab-fate foreshadowing.** | identical                                                                                                        |

## Performance target

- ≈ 100–140 high-tier figures; the crowd is a static/slow-procession mass —
  budget like `hebron-anointing`'s baked assembly, not Gilboa's animated
  combat. One `InstancedMesh` per family; the bier + wrapped form and the
  gate-passage structure are the only new geometry families
  (`asset-hebron-gate-passage`, `asset-bier`; reuse `wrappedForm.ts`).
- Procession movement can be a single shared route-curve with per-figure
  offsets — cheaper than per-figure pathing; acceptable at this fidelity.
- No new lights (sundown via the existing directional/hemisphere rig, as in
  `gibeon-pool`), no fire, no water. Run `performance-reviewer` after the
  procession beat lands (the one moving crowd).

## Required source basis (before geometry is built)

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`
  (stays `design-placeholder`), `claim-dress`, `claim-david-historical`;
  cross-reference `claim-asahel-pursuit-death` (`gibeon-pool`) from the
  killing claim's notes — the Asahel connection is the text's own stated
  motive and the scenes should link both ways in the inspector.
- **New, narrated (basis `biblical-text`):** `claim-joab-return-protest`
  (3:22–25; Joab's stated reading carried as his words);
  `claim-abner-killing` (3:26–27 — recall, aside, strike; **the milestone's
  most important claim**; `scholarlyViews` carrying at least: (i) blood
  vengeance for Asahel as the text's stated motive, with the
  battlefield-killing legal complication noted, (ii) political
  rival-elimination as a widely held scholarly reading, each with named
  proponents once the researcher pass lands — hedged "e.g., scholars
  following..." until then); `claim-david-disavowal` (3:28–30);
  `claim-abner-funeral` (3:31–35 — command, procession, burial, lament,
  fast); `claim-public-response` (3:36–39; `scholarlyViews`: Davidic-apologia
  reading vs. plain-report reading — **requires the `mccarter-1984-ii-samuel`
  card's coverage extended to 2 Samuel 3 by a researcher pass before named
  attribution**; hedge until then).
- **New, design (basis `design-placeholder`):** `claim-hebron-gate-form`
  (the chambered-gateway placeholder; upgrade path via a `herzog-1997`
  gate-typology extension); `claim-abner-tomb-form` (simple rock-cut entry;
  medieval tradition explicitly not adopted); `claim-gate-cast-scale` (the
  disclosed crowd counts above).
- **Characters:** reuse `david`, `joab`, `abner`, `abishai`. No new named
  characters; the raid party and mourners are anonymous masses.
- **ESV excerpt budget (`2sam-3`, shared with `hebron-covenant` — this scene
  gets the spend):** recommend the lament core (3:33b–34a, "Should Abner die
  as a fool dies? Your hands were not bound...") and 3:38 ("Do you not know
  that a prince and a great man has fallen this day in Israel?"); a third
  only if `hebron-covenant` used none and budget allows. Verify exact ESV
  wording via a live-source check at build time (the #19b lesson: recalled
  wording contained a real error).

## Placeholder policy

- **Allowed placeholders:** gate-passage form/dimensions (disclosed); tomb
  form and placement; bier construction; procession route; crowd composition
  and counts; lighting hour before the text-fixed sundown; mourning-dress
  detail beyond sackcloth/torn clothes (reuse `claim-mourning-dress` from
  `ziklag-lament` where applicable).
- **Not allowed:** wound, blood, or gore geometry in any mode; close-up or
  lingering framing on the strike; invented dialogue in the gate aside;
  staging the strike as anyone's but Joab's; staging the cistern-of-Sirah
  recall; villain-framing Joab or avenger-glorifying him (both readings stay
  in the claim layer); softening or omitting David's curse content in
  captions; any visualization of curse content; adopting the medieval Tomb
  of Abner site/form; a monumental six-chamber gate; refuge-city irony as
  uncited editorial; triumphal or thriller staging anywhere; any 2 Samuel 4
  content beyond the closing pointer; any 2 Samuel 5+ or 1 Kings content,
  depicted or foreshadowed, including any payoff of the curse or Joab's
  eventual fate.
