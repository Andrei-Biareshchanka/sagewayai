# Parable consistency audit — progress log

Resume point for `parable-consistency-audit` skill. Batches of 10, one fresh session per batch — see `.claude/skills/parable-consistency-audit/SKILL.md`.

## Batch 1 (2026-08-07/08) — triage list: son-o-babochke, reka-i-kamen, borba-babochki, strela-i-luk, tri-voprosa-carya, urok-reki, karta-i-mestnost, goncharnyy-krug, nezakonchennyy-most, dva-semeni

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 6 | son-o-babochke | none | — | clean |
| 8 | reka-i-kamen | none (triage false positive — «она» referred to water) | — | clean |
| 11 | borba-babochki | none (triage false positive — «она» referred to the butterfly) | — | clean |
| 16 | strela-i-luk | image showed a man; RU/EN text agree the teacher is a woman. `imageAltRu` was written from the text, not the picture. | A (image regenerated) + C (`imagePromptEn` rewritten to explicit female) | **fixed** — local + prod |
| 27 | tri-voprosa-carya | none | — | clean |
| 36 | urok-reki | **Resolved 2026-08-08 (later session, on user follow-up):** image depicted a human traveler; RU/EN text has no human character at all — a personified river dialogue with an unspecified "voice". Regenerated twice more after user feedback: first pass over-applied the character-face style instruction to the rocks (gave the canyon literal cartoon faces — dropped that instruction entirely for this parable since it has no characters); second pass showed multiple branching rivulets that read as "the river keeps flowing" rather than "disappearing" (user caught this — contradicts `contentRu`'s "снова и снова исчезала, впитываясь"). Final version: single stream, tapers to one damp patch of sand, water visibly ends, mist rising — no people, no continuation. | A (image regenerated, three attempts) + C (`imagePromptEn` rewritten, no people/faces, single stream that terminates) + B (`imageAltRu`/`imageAltEn` rewritten to match) | **fixed** — local + prod |
| 37 | karta-i-mestnost | (a) `contentRu` internally inconsistent: noun "Старый проводник" (masculine) vs. verb/pronoun agreement "сказала"/"она"/"нашёл" (feminine) — EN text and `imageAltRu` both correctly say female. (b) image also showed a man, independently. | D (contentRu: "Старый проводник"→"Старая проводница", "нашёл"→"нашла") + A (image regenerated) + C (`imagePromptEn` rewritten to explicit female) | **fixed** — local + prod |
| 45 | goncharnyy-krug | none | — | clean |
| 70 | nezakonchennyy-most | none | — | clean |
| 76 | dva-semeni | none | — | clean |

Reflection/questions grounding (checklist item E) not yet run for this batch.

## Batch 2 (2026-08-08) — pos order, skipping batch-1 slugs: pustaya-chasha, vtoraya-strela, sol-v-vode, dva-volka, tresnuvshiy-kuvshin, slepye-mudrecy-i-slon, tyazhest-obidy, mech-razlicheniya, bambukovoe-derevo, tot-kto-brosal-morskih-zvezd

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 1 | pustaya-chasha | none | — | clean |
| 2 | vtoraya-strela | none | — | clean |
| 3 | sol-v-vode | none | — | clean |
| 4 | dva-volka | none | — | clean |
| 5 | tresnuvshiy-kuvshin | none | — | clean |
| 7 | slepye-mudrecy-i-slon | none — image shows 2 of the 6 men from the text, but alt matches the image; this is the site's standard ≤2-character illustration convention, not a defect | — | clean |
| 9 | tyazhest-obidy | none — good validation case: RU/EN text explicitly female teacher, `imagePromptEn` already used "her" correctly, delivered image correctly shows a woman | — | clean |
| 10 | mech-razlicheniya | none | — | clean |
| 12 | bambukovoe-derevo | `imagePromptEn` in the DB described a different story moment (empty field, mocking neighbors, nothing grown) than the delivered image and `imageAltRu`/`imageAltEn` (farmer smiling beside an already-sprouted shoot) — image itself was fine, only the stored prompt was stale/wrong | C (`imagePromptEn` rewritten to match the delivered scene; no image regeneration needed) | **fixed** — local + prod |
| 13 | tot-kto-brosal-morskih-zvezd | none | — | clean |

Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 3 (2026-08-08) — pos 14, 15, 17–24 (pos 16 already covered in batch 1)

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 14 | sozhzhennye-korabli | none | — | clean |
| 15 | slomannaya-skripka | none | — | clean |
| 17 | almaz-pod-davleniem | RU/EN text explicitly says the student is female ("Ученица"/"her mentor"); image showed a boy, and `imageAltRu` was also wrongly written as "юный ученик" (masculine) — same alt-written-from-brief-not-picture pattern as strela-i-luk. First regeneration attempt fixed the student's gender but introduced a *new* mismatch: the mentor (grammatically male in RU — "Наставник **взял**") came out as an elderly woman, since the rewritten prompt only specified the student's gender explicitly. Second regeneration with both genders stated explicitly fixed both. | A (image regenerated, twice) + C (`imagePromptEn` rewritten with explicit gender for both characters) | **fixed** — local + prod |
| 18 | alpinistka | none — good validation case, explicitly female throughout (text/alt/prompt), image correctly shows an adult woman | — | clean |
| 19 | spyashchiy-velikan | none | — | clean |
| 20 | vtoraya-popytka | none | — | clean |
| 21 | general-i-povar | none | — | clean |
| 22 | pastuh-stavshiy-korolem | none — validation case for the earlier age-mismatch fix: `imagePromptEn` already has explicit "grown man in his late twenties" language, image correctly shows an adult | — | clean |
| 23 | bambuk-i-dub | none | — | clean |
| 24 | dirizher | `imageAltRu`/`imageAltEn` said "amid empty music stands" / conductor alone in frame, but the delivered image shows silhouetted musicians actively playing in the background — alt didn't describe the actual picture; `imagePromptEn` had the same "players left out of frame" mismatch | B (alt text rewritten to describe the actual image) + C (`imagePromptEn` rewritten to match, for future regenerations) | **fixed** — local + prod |

Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 4 (2026-08-08) — pos 25, 26, 28–35 (pos 27 already covered in batch 1)

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 25 | svecha-i-veter | none | — | clean |
| 26 | kapitan-i-shtorm | none | — | clean |
| 28 | smotritel-mayaka | none | — | clean |
| 29 | smirenie-generala | none — checked with extra care given this parable's earlier age-mismatch history; both characters correctly depicted as adult men | — | clean |
| 30 | sekret-sadovnika | none | — | clean |
| 31 | dva-monaha-i-reka | none | — | clean |
| 32 | palomnik-i-pyl | none | — | clean |
| 33 | poteryannyy-klyuch | none | — | clean |
| 34 | vernuvshiysya-strannik | none | — | clean |
| 35 | razvilka | none | — | clean |

Fully clean batch — zero fixes needed. Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 5 (2026-08-08) — pos 38–44, 46–48 (pos 45 already covered in batch 1)

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 38 | bereg-i-glubina | none | — | clean |
| 39 | dolgiy-put-domoy | none | — | clean |
| 40 | vopros-strannika | none | — | clean |
| 41 | gorchichnoe-zerno | none | — | clean |
| 42 | razbitaya-vaza | none | — | clean |
| 43 | osennie-listya | RU text and the image agree the grandchild is a boy ("спросил **он**"), but the EN `content` used feminine pronouns in three places ("asked **her** grandfather", "turned it over in **her** hands", "**she** asked") — a genuine RU↔EN divergence, not an image issue. | D (EN `content` corrected to match RU/image: "his grandfather" / "his hands" / "he asked", all three instances) | **fixed** — local + prod |
| 44 | pustoe-gnezdo | none | — | clean |
| 46 | iva | none | — | clean |
| 47 | ugasayushchaya-zvezda | none | — | clean |
| 48 | poslednee-pismo | none | — | clean |

Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 6 (2026-08-08) — pos 49–58

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 49 | otkrytaya-ladon | none | — | clean |
| 50 | tayushchaya-svecha | Same pattern as `osennie-listya` (batch 5): RU text and the image agree the grandchild is a boy ("сказал **он**"), but EN `content` used "**she**" in three places ("she said", "Her grandmother", "She looked"). | D (EN `content` corrected to "he said" / "His grandmother" / "He looked", all three instances) | **fixed** — local + prod |
| 51 | pryzhok-lyagushki | **Correction (2026-08-08, later same day):** the original audit call on this parable was wrong. Re-examining the text — "Пять лягушек сидят на бревне... Сколько лягушек осталось на бревне? **Пять**." — the riddle explicitly states the *total* population is five and that all five remain (deciding ≠ doing). "The frog who truly understood this had already leapt" uses a definite reference ("the frog"), not "a sixth frog" — it's best read as a rhetorical aside about one of the five, not a separate character to depict. The image that was live (5 on the log + a 6th swimming, 6 total) invented a frog the text never establishes. Regenerated to show 5 frogs total, all on the log, pond empty and undisturbed — the literal reading of the riddle's own stated answer. | A (image regenerated to 5-frogs-total, none swimming) + C (`imagePromptEn` rewritten to match) + B (`imageAltRu`/`imageAltEn` rewritten to match) | **fixed (corrected) — local + prod** |
| 52 | orel-i-obryv | none | — | clean |
| 53 | semya-i-tma | none | — | clean |
| 54 | kanatohodec | none | — | clean |
| 55 | neraspechatannyy-podarok | none | — | clean |
| 56 | zapertyy-sad | none | — | clean |
| 57 | parashyut | none | — | clean |
| 58 | pereprava-cherez-reku | none | — | clean |

Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 7 (2026-08-08) — pos 59–68

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 59 | nezakonchennaya-kartina | none | — | clean |
| 60 | dve-dveri | none | — | clean |
| 61 | stroitel-mostov | none | — | clean |
| 62 | slepoy-putnik | none | — | clean |
| 63 | semya-i-fermer | none | — | clean |
| 64 | kanat-i-set | none | — | clean |
| 65 | derevenskiy-kolodec | none | — | clean |
| 66 | slovo-kapitana | none — checked with extra care, adult first mate reinforced by prompt language matches image | — | clean |
| 67 | skrytye-korni | none — checked with extra care (female master + male student, same risk pattern as earlier bugs), image correctly shows a woman | — | clean |
| 68 | zaderzhannyy-poezd | none | — | clean |

Fully clean batch — zero fixes needed. Reflection/questions grounding (checklist item E) not yet run for this batch either.

## Batch 8 (2026-08-08) — pos 69, 71–75, 77–80 (pos 70/76 already covered in batch 1) — FINAL BATCH, all 80/80 parables now audited

| pos | slug | defect | fix class | status |
|---|---|---|---|---|
| 69 | odolzhennyy-svet | none | — | clean |
| 71 | kamenotesy | none — checked with extra care given this parable's earlier age-mismatch history; both traveler and stonecutter correctly adult | — | clean |
| 72 | posledniy-urok | Image showed the student as a young child (~8-10) beside the dying professor's bed — text describes university students, not children. `imagePromptEn` only said "a single young student", ambiguous enough to render as a child. | A (image regenerated with explicit "university student — a young adult in their early twenties, clearly grown, not a child") + C (`imagePromptEn` rewritten to match) | **fixed** — local + prod |
| 73 | imya-vysechennoe-v-kamne | `contentRu` internally inconsistent: "Он спросил **смотрителя**" (masculine noun) followed by "— ответила **она**" (feminine verb/pronoun) — same "masculine noun + feminine verb" pattern as `karta-i-mestnost` (batch 1). EN text was already correct ("the caretaker... she said"). Image/alt unaffected — the caretaker isn't depicted in the scene. | D (`contentRu`: "смотрителя"→"смотрительницу") | **fixed** — local + prod |
| 74 | car-sprosivshiy-zachem | none | — | clean |
| 75 | pustoy-tron | none | — | clean |
| 77 | nosilshchik-fonarya | none | — | clean |
| 78 | zabytaya-hudozhnica | `contentRu` internally inconsistent: "ребёнок вырос **художником** и всегда **говорил**... не **был** знаком" (masculine) immediately followed by "**Её** студенты... **говорила она**" (feminine) in the next paragraph, describing the same now-grown character. EN text was already consistently female throughout. Image (a girl, the character's younger self) unaffected either way. | D (`contentRu`: "вырос художником и всегда говорил... не был знаком" → "вырос художницей и всегда говорила... не была знакома") | **fixed** — local + prod |
| 79 | prednaznachenie-reki | none | — | clean |
| 80 | strannica-i-zvezdy | none — checked with extra care, female wanderer correctly depicted throughout | — | clean |

Reflection/questions grounding (checklist item E) was never run across any batch — noted as a follow-up below, not part of this pass.

## Audit complete — all 80/80 parables reviewed (2026-08-08)

Summary across all 8 batches: **11 confirmed defects found and fixed** — 5 image-regeneration fixes (`strela-i-luk`, `karta-i-mestnost`, `almaz-pod-davleniem`, `posledniy-urok`, and `pryzhok-lyagushki` — the last one caught only on a later user re-review, see the corrected note in Batch 6 above), 3 pure RU-text internal gender-agreement bugs found independently of any image issue (`karta-i-mestnost` again, `imya-vysechennoe-v-kamne`, `zabytaya-hudozhnica`), 2 EN-only translation bugs where RU/image were already correct (`osennie-listya`, `tayushchaya-svecha`), plus 2 stale-prompt-only fixes with no actual defect in the delivered image (`bambukovoe-derevo`, `dirizher`). Full list and exact fixes are in the batch tables above.

**Process note:** `pryzhok-lyagushki` was initially marked "clean" based on a misreading of the parable's own internal logic (assumed a "sixth frog" the text never actually establishes) — caught only when the user pushed back on the reasoning afterward, not during the original image review. Worth remembering for any future re-audit: verifying an image against alt text isn't enough if the alt text itself was already fit to a wrong reading of the source text — the parable text is the actual ground truth, not whatever the image/alt already agree on.

## Follow-ups raised, not yet actioned

- **Root cause, not yet fixed in the pipeline itself:** `server/scripts/backfill/backfill-parable-insights.ts`'s call to `generateParableImageBrief()` passes only English `title`/`content`/`moral` — English role nouns carry no gender, so every future parable is at risk of the same defect. Should pass RU fields (or both, with explicit gender/age instructions).
- `urok-reki` (pos 36) — awaiting a decision on whether an invented human illustrating a personified-object parable counts as a defect going forward, or is acceptable creative license (this batch's only case, may recur in later batches with similar "nature speaks" parables).
