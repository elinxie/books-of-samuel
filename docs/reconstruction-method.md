# Reconstruction method

This is the internal companion to the public `/method` page (`src/pages/MethodPage.tsx`).
Read that page for the user-facing explanation; this doc is for whoever (human or
model) is adding new claims, scenes, or sources.

## The pipeline

1. **Anchor the passage.** ESV reference + a short original-words summary in
   `src/data/passages.ts`. Never paste full chapter text (see
   `/docs/source-ingestion-policy.md`).
2. **Raise the historical questions.** What does the passage require the world to
   look like? (settlement scale, route, dress, military scale, etc.)
3. **Write claims, not scenery.** Each question becomes a `ReconstructionClaim` in
   `src/data/claims.ts`: a `statement`, a `basis`, a `confidence`, `sourceIds`, and —
   if disputed — `scholarlyViews`. Write the statement so a reader can tell whether
   it describes what the text says versus what evidence independently supports (see
   "Narrated vs. corroborated" below).
4. **Cite before you model.** A claim needs at least one `sourceIds` entry (enforced
   by `integrity.test.ts`). If no source exists yet, add a source card first
   (`/docs/source-ingestion-policy.md`).
5. **Compose the scene referencing claims**, not the other way around. Scene/location/
   route/character records hold `claimIds`; the 3D components and labels pull
   claim text through `resolveClaims()` (`src/data/index.ts`). If a visual element
   has no claim to point to, it is a `design-placeholder` claim, not an
   uncredited assumption.
6. **Confidence is about the claim, not the pixels.** Rendering something at low
   fidelity doesn't make it "speculative"; asserting something not in evidence does.

## The five bases (`ClaimBasis`)

| Basis                      | Means                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `biblical-text`            | The narrative states this. Says nothing about outside corroboration.                                                   |
| `archaeology`              | Grounded in excavated/surveyed evidence from the region and period.                                                    |
| `comparative-ane`          | Inferred from wider ancient Near Eastern parallels, not site-specific evidence.                                        |
| `scholarly-reconstruction` | A named scholarly synthesis or identification — cite the scholar in `scholarlyViews.proponents` when known.            |
| `design-placeholder`       | A disclosed decision with no evidential basis yet. Must also appear in `src/data/assets.ts` if it renders as geometry. |

## The four confidence levels

`high` / `moderate` / `low` / `speculative` — see `CONFIDENCE_LABELS` in
`src/ui/basisMeta.ts`. A `biblical-text` claim can be `high` confidence (the text
clearly says it) while still being archaeologically uncorroborated — that's normal
and should be spelled out in `notes`, not smoothed over.

## Narrated vs. corroborated

Phrase `biblical-text` statements as "The narrative states/presents..." rather than
asserting the event as settled historical fact. Where corroboration exists (Tel Dan
stele for a Davidic dynasty) or conspicuously doesn't (no material culture is
attributed to Amalekites), say so in `notes`. This is the single most
important discipline in this data model — it's what keeps the project from
collapsing "the text says X" into "X definitely happened this way."

## Disputed claims: never fake consensus

If scholars disagree, populate `scholarlyViews` with each position, its own
`confidence`, and its own `sourceIds`. Do not pick a winner in the claim's main
`statement`. Example: `claim-ziklag-location` carries three candidate sites as
separate views; the rendered scene is explicitly a generic composite, not a portrait
of any one of them.

## Attribution hedging

Where a proponent's exact stance/publication hasn't been page-verified yet, use
"e.g., scholars following..." rather than a bare name, and flag the underlying
source card's `confidenceNotes` with `TO VERIFY`. `/docs/fable-review-queue.md`
and `/docs/uncertainty-register.md` track which of these are outstanding.

## Anachronism discipline

Before any element (clothing, weapon, structure, road, crop, animal, fortification,
religious object, label, or political-geography claim) appears in a scene, it needs
a claim with a real `basis`. When evidence is thin, prefer omission over invention —
e.g., current placeholder figures carry no weapons or armor rather than guessing.

## Violence policy

1 Samuel 31 and later battle scenes must render death honestly but not
sensationally, with a reduced-intensity mode planned (Milestone 3). The study
purpose stays primary — see `/docs/fable-review-queue.md` for the open design
question on default intensity.

## Commentary policy

Historical-literary and observational commentary only, for now.
`theologicalCommentary` exists in the state store but is disabled and not wired to
any UI content — it is a placeholder for a later, clearly-separated milestone, not
a hidden feature.

## Adding a new scene checklist

1. Passage(s) exist in `passages.ts` with `sceneIds` pointing forward.
2. Location exists in `locations.ts` (with `identification.views` if disputed).
3. Period exists in `periods.ts`.
4. Claims exist and are cited.
5. `SceneDef` added to `scenes.ts` (`status: 'planned'` until built).
6. Scene folder under `src/scenes/<id>/` with layout + composition + entities.
7. Register the component in `SCENE_COMPONENTS` (`src/pages/ObservePage.tsx`).
8. Add/extend Playwright coverage if the scene introduces new interactive surface.
9. Update `docs/progress.md`, `docs/asset-roadmap.md`, `docs/uncertainty-register.md`.
