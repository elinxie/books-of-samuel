# Bibliography

The canonical, machine-readable bibliography is `sources/source-cards/*.json`
(schema: `SourceCard` in `src/data/types.ts`; generated summary index:
`sources/source-index.json`, rebuilt via `npm run build:sources`). The in-app,
human-facing version is the [Sources page](../src/pages/SourcesPage.tsx), which
also carries the full ESV attribution and copyright/permissions statement.

This file exists so the bibliography is browsable without running the app. Do not
hand-maintain a duplicate list here — see "Keeping this in sync" below.

## Sources currently cited

| ID                           | Title                                                                 | Type                 |
| ---------------------------- | --------------------------------------------------------------------- | -------------------- |
| `esv-bible`                  | The Holy Bible, English Standard Version (ESV)                        | biblical-text        |
| `rainey-notley-2006`         | The Sacred Bridge: Carta's Atlas of the Biblical World                | historical-geography |
| `king-stager-2001`           | Life in Biblical Israel                                               | material-culture     |
| `borowski-1987`              | Agriculture in Iron Age Israel                                        | material-culture     |
| `faust-2012`                 | The Archaeology of Israelite Society in Iron Age II                   | archaeology          |
| `finkelstein-silberman-2001` | The Bible Unearthed                                                   | archaeology          |
| `mazar-1990`                 | Archaeology of the Land of the Bible, 10,000–586 B.C.E.               | archaeology          |
| `mazar-2005-chronology`      | The Debate over the Chronology of the Iron Age in the Southern Levant | scholarly-article    |
| `herzog-1997`                | Archaeology of the City: Urban Planning in Ancient Israel             | archaeology          |
| `biran-naveh-1993`           | An Aramaic Stele Fragment from Tel Dan                                | scholarly-article    |
| `sapir-hen-ben-yosef-2013`   | The Introduction of Domestic Camels to the Southern Levant            | scholarly-article    |
| `garfinkel-ganor-2019`       | Khirbet al-Ra'i — proposed identification with Ziklag                 | archaeology          |
| `oren-tel-sera-1993`         | Sera', Tel (NEAEHL entry)                                             | archaeology          |
| `maeir-safi-2012`            | Tell es-Safi/Gath I: The 1996–2005 Seasons                            | archaeology          |
| `mazar-beth-shean-2006`      | Excavations at Tel Beth-Shean 1989–1996, Vol. I                       | archaeology          |
| `yadin-1963`                 | The Art of Warfare in Biblical Lands                                  | material-culture     |

Two cards (`garfinkel-ganor-2019`, `oren-tel-sera-1993`) are flagged `TO VERIFY` in
their `confidenceNotes` — seeded from team knowledge, pending a page-level citation
check. See `/docs/uncertainty-register.md` item 10.

## Keeping this in sync

This table should list every file in `sources/source-cards/`. It is not currently
enforced by a test (the JSON cards and `source-index.json` are the enforced source
of truth — see `src/data/sourceCards.test.ts`). If you add a source card, add a row
here in the same PR.

## Ingestion policy

Full policy: `/docs/source-ingestion-policy.md`. Summary: no full copyrighted texts
are stored; ESV is reference + short excerpt only (budget enforced by
`integrity.test.ts`); everything else is a structured source card with an original
summary and explicit `copyrightStatus`.
