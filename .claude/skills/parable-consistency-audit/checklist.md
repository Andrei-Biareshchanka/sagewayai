# Per-parable consistency checklist

Run in this order; a parable can stop early if it's clean end-to-end.

## A. RU ↔ EN text agreement (`content`/`contentRu`, `title`/`titleRu`, `moral`/`moralRu`)

Compare **facts, not prose**. For every character and object:

1. **Gender** — e.g. `учительница` vs `teacher`/`her`; `мастер` vs `she`.
2. **Age** — `старик` vs `a man`; `юноша` vs `a student`.
3. **Role/occupation** — teacher/master/monk/farmer must be the same role in both languages.
4. **Number of characters** — 2 in RU, 3 in EN is a flag.
5. **Objects** — arrow/bow/stone/bowl/candle: same objects, same count.
6. **Actions & who performs them** — who speaks first, who asks, who answers.
7. **Setting** — room/river/mountain/road.
8. **The moral's logical claim** — the RU moral must assert the same thing as the EN moral, not a related-but-different thing.

**Flag:** any factual divergence in 1–7, or a moral asserting a different claim.
**Not a flag:** wording/sentence-count differences, RU dialogue-dash formatting, idiomatic rephrasing that preserves all facts.

## B. Image ↔ RU text — **RU is authoritative**

The site is `lang="ru"` first; RU is the primary-audience text.

**Before looking at `imageAltRu`/`imageAltEn` or `imagePromptEn` at all, re-read `contentRu` cold and write down (mentally or literally) exactly who/what the scene should contain — count the characters the text actually names, note what it explicitly states vs. only implies rhetorically.** Only then open the image and alt text. This order matters: alt text and the delivered image are frequently *already consistent with each other* while both being a wrong reading of the source parable (e.g. `pryzhok-lyagushki` — alt and image agreed on 6 frogs, but the text names exactly 5 and never introduces a sixth; the "frog who truly understood" is a rhetorical aside about one of the five, not a distinct character to depict). Checking image-against-alt alone cannot catch this class of error — only re-deriving the scene from the parable text itself can.

Then compare the actual downloaded PNG against `contentRu`:

1. **Gender of each depicted human** vs RU nouns/verb endings (`сказала`, `улыбнулась`).
2. **Age** (child/young/old) vs RU.
3. **Role signalling** — is the depicted person plausibly the stated role?
4. **Character count** vs RU (also check against the ≤2-character brief convention) — count against what you derived from the text *before* opening the alt/image, not against what the alt claims.
5. **Key object present and correct** — the *specific* object the parable turns on (the cracked bowl, the drawn bow, the stone), not just "something roughly right."
6. **Action/pose** matches the depicted moment in the text.
7. **Setting** matches.
8. **No contradiction of the moral** — e.g. a parable about letting go of imaginary burdens must not be illustrated by someone visibly straining under a real sack.
9. **No invented character, object, or detail** that the text doesn't actually establish — including ones a rhetorical/philosophical aside in the text might superficially suggest (a "the one who understood" line is usually about an already-named character, not license to add a new figure).
10. **No text/lettering baked into the image.**

**Flag:** wrong gender, wrong age bracket, wrong/missing key object, wrong character count (against the text, not against the alt), image contradicts the moral, any invented character/object not in the text.
**Not a flag:** clothing style, ethnicity, exact background architecture, palette drift, "the room feels bigger/smaller than I imagined."

## C. Alt text ↔ image (`imageAltRu`, `imageAltEn`)

Alt describes **what is in the delivered PNG**, not what the brief asked for and not the theme.

**Flag:** alt says a role/gender the image doesn't show (the `strela-i-luk` case exactly); alt mentions an object not visible in the image; alt is thematic ("Иллюстрация к притче о…") instead of literal; alt is over ~125 chars; RU and EN alts appear to describe different pictures.

## D. `imagePromptEn` ↔ RU text (the root-cause field)

**Flag:** the prompt uses a gender-neutral English role noun where the RU text is explicitly gendered; the prompt describes more than 2 characters; the prompt's object/action disagrees with the RU text. Flag this **even when the delivered image happens to be correct anyway** — an unflagged prompt will produce the wrong image the next time it's regenerated.

## E. Deep reflection ↔ parable (`conclusionEn/Ru`, `questionsEn/Ru`)

Check *grounding*, not craft — craft (length, dash overuse, alphabet mixing) is already covered by `server/scripts/audit-manual-insights-*.ts`.

1. Every concrete detail the conclusion attributes to the parable is **actually in the parable text** (e.g. if a conclusion leans on "the master puts the stone in the student's hand," that action must actually appear in `contentRu`).
2. Characters are referenced with the correct gender/role.
3. Question 1 (the "observational, from the text" question) must be answerable **from the parable as written**, without outside assumptions.
4. RU conclusion should be grounded in `contentRu`; EN conclusion in `content` — they were generated as separate passes, not translations of each other.

**Not a flag:** RU and EN conclusions making somewhat different arguments from each other, or a conclusion inviting the reader's own life examples (that's the intended lens design, not a defect).
