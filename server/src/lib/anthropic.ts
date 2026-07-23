import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const MODEL = 'claude-sonnet-4-6';

// Parable insights are a one-time backfill baked permanently into canonical
// parable pages, not a recurring daily generation like DailyDigest's
// reflections/titles above — worth the extra cost/latency of Opus for the
// best quality on a 400-700 word, three-level piece, since it never runs again.
const PARABLE_INSIGHT_MODEL = 'claude-opus-4-8';

const reflectionSchema = z.object({
  conclusion: z.string(),
  question: z.string(),
});

export type Reflection = z.infer<typeof reflectionSchema>;

const parableInsightSchema = z.object({
  conclusion: z.string(),
  questions: z.array(z.string()).length(3),
});

export type ParableInsight = z.infer<typeof parableInsightSchema>;

export type ParableInsightContent = {
  title: string;
  content: string;
  moral: string;
};

export type ParableInsightQuote = {
  text: string;
  author: string;
};

const TITLE_INSTRUCTION_EN =
  'Write ONE short evocative page title (4–7 words) capturing the unique connection between this quote and parable. No generic phrases, no quotes or punctuation at the end. Essay/book chapter tone. Respond with ONLY the title.';

const TITLE_INSTRUCTION_RU =
  'Напиши ОДИН короткий выразительный заголовок (4–7 слов), передающий уникальную связь между цитатой и притчей. Без общих фраз, без кавычек. Тон эссе или главы книги. Ответь ТОЛЬКО заголовком.';

function buildTitleContext(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): string {
  return language === 'ru'
    ? `Цитата: "${quoteText}" — ${author}\nПритча: "${parableTitle}". Мораль: ${moral}${theme ? `\nТема: ${theme}` : ''}`
    : `Quote: "${quoteText}" — ${author}\nParable: "${parableTitle}". Moral: ${moral}${theme ? `\nTheme: ${theme}` : ''}`;
}

function buildTitlePrompt(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): string {
  const instruction = language === 'ru' ? TITLE_INSTRUCTION_RU : TITLE_INSTRUCTION_EN;
  const context = buildTitleContext(quoteText, author, parableTitle, moral, theme, language);
  return `${instruction}\n\n${context}`;
}

function extractTitle(response: Anthropic.Message): string {
  const block = response.content[0];
  if (block?.type !== 'text') throw new Error(`Unexpected response block type: ${block?.type}`);
  return block.text.trim().replace(/^["«]|["»]$/g, '').trim();
}

export async function generateDigestTitle(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): Promise<string> {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 50,
    temperature: 0.8,
    messages: [{ role: 'user', content: buildTitlePrompt(quoteText, author, parableTitle, moral, theme, language) }],
  });
  return extractTitle(response);
}

function getClient(): Anthropic {
  const apiKey = process.env['ANTHROPIC_API_KEY'];
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
  return new Anthropic({ apiKey });
}

function buildPrompt(quoteText: string, parableText: string, language: 'en' | 'ru'): string {
  const languageName = language === 'ru' ? 'Russian' : 'English';
  return `You are writing for a daily wisdom app called SagewayAI. A user just read this quote and parable, paired because they reinforce the same idea:

Quote: "${quoteText}"

Parable: "${parableText}"

Write, in ${languageName}:
1. "conclusion" — a short (2-4 sentences) reflective insight that connects the quote and the parable into one wise takeaway. Write it so the reader can compare it with their own interpretation, not as a lecture.
2. "question" — one open reflection question (1 sentence) that invites the reader to apply this idea to their own life.`;
}

const SUBMIT_REFLECTION_TOOL: Anthropic.Tool = {
  name: 'submit_reflection',
  description: 'Submit the reflective conclusion and reflection question for this quote and parable pairing.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      conclusion: { type: 'string' },
      question: { type: 'string' },
    },
    required: ['conclusion', 'question'],
    additionalProperties: false,
  },
};

export async function generateReflection(
  quoteText: string,
  parableText: string,
  language: 'en' | 'ru',
): Promise<Reflection> {
  const client = getClient();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    temperature: 0.7,
    tools: [SUBMIT_REFLECTION_TOOL],
    tool_choice: { type: 'tool', name: 'submit_reflection' },
    messages: [{ role: 'user', content: buildPrompt(quoteText, parableText, language) }],
  });

  const block = response.content[0];
  if (block?.type !== 'tool_use') {
    throw new Error(`Unexpected response block type: ${block?.type}`);
  }

  const result = reflectionSchema.safeParse(block.input);
  if (!result.success) {
    throw new Error(`Invalid reflection shape: ${result.error.issues[0]?.message}`);
  }
  return result.data;
}

const INSIGHT_LENSES = [
  {
    key: 'bodily',
    instruction:
      "Anchor the second level of insight in a specific bodily or sensory sensation — what tightens, what the breath does, what the eyes catch — in the exact moment the deeper truth becomes visible.",
  },
  {
    key: 'relational',
    instruction:
      "Anchor the insight in a specific relationship dynamic — a coworker, a parent, a partner, a stranger — rather than a general 'people'.",
  },
  {
    key: 'threshold',
    instruction:
      "Anchor the insight in the single second BEFORE the reader's usual reaction — the pause, the hesitation, the choice point most people never notice they have.",
  },
  {
    key: 'paradox',
    instruction:
      "Anchor the insight in a paradox: a moment where the 'virtuous' or expected response actually makes things worse, not better.",
  },
  {
    key: 'retrospective',
    instruction:
      "Build the conclusion so it retroactively re-frames something ordinary from the reader's past week — not hypothetical, something that plausibly already happened.",
  },
  {
    key: 'cost',
    instruction:
      "Anchor the insight in a DELAYED price — not an immediate backfire, but something that quietly costs the reader later, weeks or years down the line, because of the easy choice made now.",
  },
  {
    key: 'witness',
    instruction:
      "Anchor the insight in being SEEN — not what the reader feels internally, but what shifts in a specific moment when another person notices what they did or didn't do.",
  },
] as const;

export type InsightLens = (typeof INSIGHT_LENSES)[number];

// Deterministic by parable, not random: the same parable always gets the same
// lens, and — critically — a regeneration retry (2c) must reuse the same lens
// rather than rolling a new one, or the retry would just be a different essay
// instead of a corrected one.
export function getInsightLens(parableIndexInDb: number): InsightLens {
  return INSIGHT_LENSES[parableIndexInDb % INSIGHT_LENSES.length]!;
}

const INSIGHT_LENGTH_BY_LANGUAGE = {
  en: {
    min: 400,
    max: 700,
    instruction: 'Total length: 400-700 words.',
  },
  ru: {
    min: 350,
    max: 600,
    instruction:
      'Total length: 350-600 words — Russian is naturally more compact; do NOT pad to reach a word count. Shorter and denser is better than longer and thin.',
  },
} as const;

const ROLE_FRAME =
  "You are a senior essayist writing about wisdom for adult readers — not a coach, not a guru, not a motivational speaker. Write the way a thoughtful person writes, not the way a model generates.";

// Em-dash count deliberately is NOT in this list — it moved to a deterministic,
// code-computed check (see EM_DASH_REJECT_THRESHOLD) after a real backfill run
// showed Opus reliably produces 3 em-dashes in a 500-700 word essay and the
// review gate rejected 100% of a 5-parable/10-language batch almost entirely
// on this one line, even though 3 is normal density for this prose style, not
// overuse. The soft "prefer periods and commas" nudge stays in the generation
// prompt only (EM_DASH_GENERATION_NUDGE) — a target to aim for, not a hard cap.
const DO_NOT_USE_BLOCK = `Do not use:
- Triads / rule-of-three phrasing (e.g. 'deeply, honestly, and mindfully').
- Stock connective phrases: 'it's important to note', 'ultimately', 'in the end', 'not surprisingly' (RU: 'важно понимать', 'в конечном счёте', 'стоит отметить', 'не случайно').
- Inflated meaning-signaling: 'this ancient wisdom teaches us', 'resonates with', 'reminds us that', 'profound' (RU: 'эта древняя мудрость учит нас', 'резонирует', 'поистине').
- Direct-address clichés like 'dear reader'.
- Restating the parable's moral in different words as the ending — the conclusion must end on the reader's own life, not a summary of the lesson.
- More than one 'not X, but Y' construction in the whole text.
- Mixing alphabets within a single word, or stray words in the wrong language (e.g. Latin letters inside a Russian word) — hard failure, re-read your own output before finalizing.`;

const EM_DASH_GENERATION_NUDGE = 'Prefer periods and commas over em-dashes — aim for no more than 2 per piece where it reads naturally.';

const EM_DASH_PATTERN = /[—–]/g;

function countEmDashes(text: string): number {
  return (text.match(EM_DASH_PATTERN) ?? []).length;
}

// Generous relative to the generation nudge's target of 2 — mirrors how word
// count works: the generation prompt aims for 400-700 words, but the review
// gate's own reject range (380-720) is wider than the target, not identical
// to it. Reject only on clear overuse (observed real essays land at 3-4).
const EM_DASH_REJECT_THRESHOLD = 5;

const INCLUDE_BLOCK = `Include:
- Second-person address ('you') grounding the insight in the reader's experience.
- At least one concrete, sensory or bodily detail.
- Exactly one insight that is NOT the obvious lesson someone would expect.
- Leave question 3 genuinely open — do not answer it within the conclusion.`;

function buildParableInsightPrompt(
  quote: ParableInsightQuote,
  parable: ParableInsightContent,
  language: 'en' | 'ru',
  lens: InsightLens,
): string {
  const languageName = language === 'ru' ? 'Russian' : 'English';
  const length = INSIGHT_LENGTH_BY_LANGUAGE[language];
  return `${ROLE_FRAME}

You are writing for a daily wisdom app called SagewayAI. A reader just read this quote and parable, paired because they reinforce the same idea:

Quote: "${quote.text}" — ${quote.author}

Parable: "${parable.title}". ${parable.content} Moral: ${parable.moral}

Write, in ${languageName}, a "conclusion" — one continuous piece of flowing prose (no headers, no "Level 1/2/3" labels) that deepens across three ascending levels of insight:
- first, name the surface lesson the quote and parable share;
- then examine the tension, paradox, or harder truth beneath that surface lesson;
- then turn the insight toward the reader's own life — concrete enough to sit with, not another platitude.
${lens.instruction}
${length.instruction}

Also write exactly 3 "questions" in ${languageName}, in increasing order of difficulty:
1. an easy, low-stakes question that points to a specific detail, word, or choice in the parable or quote — not a plot-recall question with one correct answer, but a small invitation to notice something and wonder about it;
2. a question that asks the reader to examine their own experience;
3. a hard, personal question that pushes past the easy answer — the kind that's uncomfortable to sit with honestly.

${DO_NOT_USE_BLOCK}
- ${EM_DASH_GENERATION_NUDGE}

${INCLUDE_BLOCK}`;
}

const SUBMIT_PARABLE_INSIGHT_TOOL: Anthropic.Tool = {
  name: 'submit_parable_insight',
  description: 'Submit the deep three-level conclusion and three graduated reflection questions for this parable.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      conclusion: { type: 'string' },
      questions: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: ['conclusion', 'questions'],
    additionalProperties: false,
  },
};

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Thrown only after MAX_GENERATION_ATTEMPTS all fail the sanity check below —
// carries enough of the last attempt for a caller (the 2d backfill script) to
// log parableId/language/lens alongside the raw model output and mark
// reflectionStatus=FAILED for manual review, instead of the whole batch
// crashing on one bad parable.
export class ParableInsightGenerationError extends Error {
  constructor(
    message: string,
    public readonly attempts: number,
    public readonly lastRawResponse: unknown,
  ) {
    super(message);
    this.name = 'ParableInsightGenerationError';
  }
}

const MAX_GENERATION_ATTEMPTS = 3;

// Conservative: matches any HTML/XML-like tag fragment, not just the specific
// '<parameter>'/'</parameter>' pair seen in the wild — catches the same class
// of tool-call-syntax leakage generally, since the exact fragment that leaks
// isn't guaranteed to repeat verbatim next time. `\/?` is required — an
// earlier version of this pattern only matched opening tags and silently
// missed a closing-tag-only artifact ("</antml parameter>") caught live while
// testing reviewDeepReflection, since `<` followed by `/` isn't `[a-z_]`.
const TOOL_CALL_ARTIFACT_PATTERN = /<\/?[a-z_]+[^>]*>/i;

// Exported for testability — same reason isWrongLanguage() above is exported.
export function containsToolCallArtifact(text: string): boolean {
  return TOOL_CALL_ARTIFACT_PATTERN.test(text);
}

const WORD_PATTERN = /[\p{L}]+/gu;
const CYRILLIC_PATTERN_IN_WORD = /\p{Script=Cyrillic}/u;
const LATIN_PATTERN_IN_WORD = /\p{Script=Latin}/u;

// Catches the "паrable" class of bug: a single word mixing Cyrillic and Latin
// letters (e.g. model output drifting mid-word into the wrong alphabet).
// Checked word-by-word, not on the text as a whole, since RU/EN text
// legitimately mixing whole words (a quoted English term inside Russian
// prose) is normal — only a mix *within one word* is always a defect.
// expectedLang is accepted for interface parity with the rest of this
// generation pipeline (every other check here takes language) and for future
// language-specific rules, but is not needed for this specific check: a word
// mixing two scripts is wrong regardless of which language was requested.
export function detectMixedScript(text: string, expectedLang: 'en' | 'ru'): boolean {
  void expectedLang;
  const words = text.match(WORD_PATTERN) ?? [];
  return words.some((word) => CYRILLIC_PATTERN_IN_WORD.test(word) && LATIN_PATTERN_IN_WORD.test(word));
}

// Single point of "is this response usable" — covers all defects seen in
// dry-run testing: questions.length !== 3 (zod's .length(3) already rejects
// this, just routed through retry instead of throwing), leaked tool-call-like
// text, and mixed-alphabet words in the conclusion or any question.
export function findValidationIssue(input: unknown, language: 'en' | 'ru'): string | null {
  const result = parableInsightSchema.safeParse(input);
  if (!result.success) return `schema: ${result.error.issues[0]?.message ?? 'invalid shape'}`;

  if (containsToolCallArtifact(result.data.conclusion)) {
    return 'conclusion contains a tool-call-like artifact (e.g. "<parameter...>")';
  }
  const badQuestion = result.data.questions.find(containsToolCallArtifact);
  if (badQuestion) {
    return `question contains a tool-call-like artifact: "${badQuestion.slice(0, 80)}"`;
  }

  if (detectMixedScript(result.data.conclusion, language)) {
    return 'conclusion contains a word mixing Cyrillic and Latin letters';
  }
  const mixedScriptQuestion = result.data.questions.find((q) => detectMixedScript(q, language));
  if (mixedScriptQuestion) {
    return `question contains a word mixing Cyrillic and Latin letters: "${mixedScriptQuestion.slice(0, 80)}"`;
  }

  return null;
}

export type TokenUsage = { inputTokens: number; outputTokens: number };

const ZERO_USAGE: TokenUsage = { inputTokens: 0, outputTokens: 0 };

function addUsage(a: TokenUsage, b: Anthropic.Usage): TokenUsage {
  return { inputTokens: a.inputTokens + b.input_tokens, outputTokens: a.outputTokens + b.output_tokens };
}

export async function generateParableInsight(
  quote: ParableInsightQuote,
  parable: ParableInsightContent,
  language: 'en' | 'ru',
  lens: InsightLens,
): Promise<ParableInsight & { usage: TokenUsage }> {
  const client = getClient();
  const prompt = buildParableInsightPrompt(quote, parable, language, lens);

  let lastRawResponse: unknown;
  // Every attempt costs real tokens, including ones rejected by the sanity
  // check — cost tracking must sum across all attempts, not just the one
  // that ends up returned.
  let usage: TokenUsage = ZERO_USAGE;

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt++) {
    const response = await client.messages.create({
      model: PARABLE_INSIGHT_MODEL,
      max_tokens: 2000,
      // `temperature` is deprecated on this model (Opus 4.8) — omitted rather than
      // set, unlike the other MODEL-based calls above which still accept it.
      tools: [SUBMIT_PARABLE_INSIGHT_TOOL],
      tool_choice: { type: 'tool', name: 'submit_parable_insight' },
      messages: [{ role: 'user', content: prompt }],
    });
    usage = addUsage(usage, response.usage);

    const block = response.content[0];
    lastRawResponse = block?.type === 'tool_use' ? block.input : response;

    if (block?.type !== 'tool_use') continue;

    const issue = findValidationIssue(block.input, language);
    if (!issue) {
      // findValidationIssue already ran safeParse internally to get here — parse
      // again with safeParse (not the throwing .parse()) rather than trust that
      // internal result blindly. If this somehow disagrees, fall through and
      // retry instead of throwing.
      const parsed = parableInsightSchema.safeParse(block.input);
      if (parsed.success) return { ...parsed.data, usage };
    }
  }

  throw new ParableInsightGenerationError(
    `generateParableInsight: no valid response after ${MAX_GENERATION_ATTEMPTS} attempts`,
    MAX_GENERATION_ATTEMPTS,
    lastRawResponse,
  );
}

// Image style is fixed brand identity, not per-parable creative choice — the
// model only ever describes the SCENE (this parable's specific moment); style,
// palette, and format are appended by code so every parable illustration stays
// visually consistent regardless of what the model generates.
export const IMAGE_STYLE_PREFIX =
  "Flat, soft illustration in the style of a children's parable book — not a photograph, no photorealism, but with simple, warm, distinguishable character faces (eyes, eyebrows, gentle expression). Skin and clothing in soft warm neutral tones. Near-black (#1A1A1A) used only as a thin outline, never as a fill. No text, letters, writing, or lettering anywhere in the image.";

export const IMAGE_STYLE_PALETTE =
  'Palette (use as a base, not literally): background/sky: warm near-white (#FAFAF8); midground surfaces, structures: muted sage green (#5C9E65), shadows in dark sage (#3E7048); light planes: (#EBF5EC), (#DFF0E1); warm accent (light source): muted ochre/amber (#E8A33D), soft variant (#FBF0DF); outlines on faces and figures: near-black (#1A1A1A), used sparingly; background/haze/distance: warm neutral gray (#6B7280). No acid, neon, or cool blue tones. Exactly one warm light accent.';

export const IMAGE_STYLE_FORMAT = 'Format: 16:9, 2K (2048x1152).';

const imageBriefSchema = z.object({
  scene: z.string(),
  imageAltEn: z.string(),
  imageAltRu: z.string(),
});

export type ParableImageBrief = {
  imagePromptEn: string;
  imageAltEn: string;
  imageAltRu: string;
  usage: TokenUsage;
};

function buildImageBriefPrompt(parable: ParableInsightContent): string {
  return `Describe, in English, a single concrete visual scene depicting one specific moment from this parable — its characters, their poses, the composition, and the light. 3-5 sentences. Do not mention art style, color palette, or image format — those are handled separately; describe only the scene itself.

Parable: "${parable.title}". ${parable.content} Moral: ${parable.moral}

Also write two short alt-text descriptions, each under 125 characters, describing what is visually depicted in the scene — not the parable's moral, and without phrases like "изображение"/"image of":
- imageAltEn: in English
- imageAltRu: in Russian`;
}

const SUBMIT_IMAGE_BRIEF_TOOL: Anthropic.Tool = {
  name: 'submit_image_brief',
  description: 'Submit the scene description and bilingual alt text for this parable illustration.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      scene: { type: 'string' },
      imageAltEn: { type: 'string' },
      imageAltRu: { type: 'string' },
    },
    required: ['scene', 'imageAltEn', 'imageAltRu'],
    additionalProperties: false,
  },
};

// Sonnet, not Opus — this is a short descriptive brief (3-5 sentences plus two
// alt strings), not a nuanced long-form essay, so the top-tier model that
// generateParableInsight uses would be paying for quality this task doesn't need.
export async function generateParableImageBrief(parable: ParableInsightContent): Promise<ParableImageBrief> {
  const client = getClient();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 500,
    temperature: 0.7,
    tools: [SUBMIT_IMAGE_BRIEF_TOOL],
    tool_choice: { type: 'tool', name: 'submit_image_brief' },
    messages: [{ role: 'user', content: buildImageBriefPrompt(parable) }],
  });

  const block = response.content[0];
  if (block?.type !== 'tool_use') {
    throw new Error(`Unexpected response block type: ${block?.type}`);
  }

  const result = imageBriefSchema.safeParse(block.input);
  if (!result.success) {
    throw new Error(`Invalid image brief shape: ${result.error.issues[0]?.message}`);
  }

  return {
    imagePromptEn: `${IMAGE_STYLE_PREFIX} ${result.data.scene} ${IMAGE_STYLE_PALETTE} ${IMAGE_STYLE_FORMAT}`,
    imageAltEn: result.data.imageAltEn,
    imageAltRu: result.data.imageAltRu,
    usage: { inputTokens: response.usage.input_tokens, outputTokens: response.usage.output_tokens },
  };
}

// Haiku, not Opus/Sonnet — this is a classification task (does this text violate
// a checklist?), not a generation task, so the cheapest capable model is right.
const REVIEW_MODEL = 'claude-haiku-4-5-20251001';

const REVIEW_LENGTH_BY_LANGUAGE = {
  en: { min: 380, max: 720 },
  ru: { min: 330, max: 620 },
} as const;

const reflectionReviewSchema = z.object({
  pass: z.boolean(),
  score: z.number(),
  violations: z.array(z.string()),
  fixHint: z.string(),
});

export type ReflectionReview = z.infer<typeof reflectionReviewSchema>;

// The length/tool-call/mixed-script checks in generateParableInsight's own
// retry loop are cheap, code-level, and unambiguous. This gate catches what
// code cannot: stock AI phrasing, meaning-inflation, restating the moral as
// the ending, more than one "not X, but Y", more than 2 em-dashes, whether the
// conclusion actually grounds itself in a concrete situation, and whether the
// 3 questions are genuinely graduated rather than three variations on the
// same difficulty. Reuses DO_NOT_USE_BLOCK verbatim rather than restating the
// rules, so the generator and the reviewer never drift out of sync on what
// counts as a violation.
function buildReflectionReviewPrompt(conclusion: string, questions: string[], language: 'en' | 'ru'): string {
  const words = countWords(conclusion);
  const emDashes = countEmDashes(conclusion);
  const length = REVIEW_LENGTH_BY_LANGUAGE[language];
  const languageName = language === 'ru' ? 'Russian' : 'English';

  return `You are a strict editorial reviewer for a wisdom essay app called SagewayAI. Evaluate the following "conclusion" (a three-level reflective essay) and its three graduated reflection questions, written in ${languageName}.

Conclusion (${words} words):
"""
${conclusion}
"""

Questions:
1. ${questions[0] ?? ''}
2. ${questions[1] ?? ''}
3. ${questions[2] ?? ''}

Reject (pass: false) if ANY of the following is true:
- Word count is outside ${length.min}-${length.max} words (actual: ${words}).
- Em-dash count is greater than ${EM_DASH_REJECT_THRESHOLD} (actual count: ${emDashes}). Natural literary prose commonly uses 3-4 em-dashes in a piece this length — that is NOT itself a violation, only flag actual overuse past the threshold above.
- Any of these AI-writing markers appears anywhere in the conclusion or questions:

${DO_NOT_USE_BLOCK}

- The conclusion stays abstract/general throughout and never grounds itself in one concrete, specific situation.
- The 3 questions are not genuinely graduated in difficulty (observational → personal experience → hard/vulnerable) — e.g. all three sit at the same difficulty level, or the hardest one isn't last.

Respond with:
- "pass": true only if none of the above apply.
- "score": a 0-100 overall quality score (100 = flawless, publish as-is).
- "violations": a short string per violation actually found (empty array if pass is true).
- "fixHint": one concrete sentence on what to change if pass is false (empty string if pass is true).`;
}

const SUBMIT_REFLECTION_REVIEW_TOOL: Anthropic.Tool = {
  name: 'submit_reflection_review',
  description: 'Submit the editorial review verdict for a parable conclusion and its 3 graduated questions.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      pass: { type: 'boolean' },
      score: { type: 'number' },
      violations: { type: 'array', items: { type: 'string' } },
      fixHint: { type: 'string' },
    },
    required: ['pass', 'score', 'violations', 'fixHint'],
    additionalProperties: false,
  },
};

const MAX_REVIEW_CALL_ATTEMPTS = 3;

// Same tool-call-artifact leak seen in generateParableInsight also showed
// up here, on Haiku, in a live test — confirming it's a general
// Claude tool-use quirk, not specific to Opus. Reuses containsToolCallArtifact
// (not findValidationIssue — that's shaped for {conclusion, questions}, this
// is a different shape). Retries only the reviewer call itself, never the
// text being reviewed — conclusion/questions stay fixed across attempts.
//
// fixHint only matters when pass is false (it's the guidance for the retry/
// manual-review path) — per the prompt's own contract it's supposed to be an
// empty string when pass is true. A live batch run showed Haiku deterministically
// producing the same artifact in fixHint on a pass:true verdict, at temperature 0,
// on every retry — retrying never fixed it and wasted the whole attempt budget.
// So an artifact in fixHint only forces a retry when pass is false (where the
// hint is actually used); on pass:true it's sanitized to '' instead (see below).
function hasArtifactInReview(review: ReflectionReview): boolean {
  const fixHintMatters = !review.pass && containsToolCallArtifact(review.fixHint);
  return fixHintMatters || containsToolCallArtifact(review.violations.join(' '));
}

// If the reviewer itself is unreliable even after retries, its pass:true
// cannot be trusted — falling back to a conservative pass:false routes the
// parable to manual review instead of auto-publishing on a shaky verdict.
const UNRELIABLE_REVIEWER_RESULT: ReflectionReview = {
  pass: false,
  score: 0,
  violations: ['reviewer output was unreliable after retries — needs manual review'],
  fixHint: '',
};

export async function reviewDeepReflection(
  conclusion: string,
  questions: string[],
  language: 'en' | 'ru',
): Promise<ReflectionReview & { usage: TokenUsage }> {
  const client = getClient();
  const prompt = buildReflectionReviewPrompt(conclusion, questions, language);
  let usage: TokenUsage = ZERO_USAGE;

  for (let attempt = 1; attempt <= MAX_REVIEW_CALL_ATTEMPTS; attempt++) {
    const response = await client.messages.create({
      model: REVIEW_MODEL,
      max_tokens: 500,
      temperature: 0,
      tools: [SUBMIT_REFLECTION_REVIEW_TOOL],
      tool_choice: { type: 'tool', name: 'submit_reflection_review' },
      messages: [{ role: 'user', content: prompt }],
    });
    usage = addUsage(usage, response.usage);

    const block = response.content[0];
    if (block?.type !== 'tool_use') continue;

    const result = reflectionReviewSchema.safeParse(block.input);
    if (!result.success) continue;
    if (hasArtifactInReview(result.data)) continue;

    // pass:true never uses fixHint downstream — force it empty per contract,
    // rather than accepting whatever (possibly artifact-laden) text arrived.
    const sanitized = result.data.pass ? { ...result.data, fixHint: '' } : result.data;
    return { ...sanitized, usage };
  }

  return { ...UNRELIABLE_REVIEWER_RESULT, usage };
}

// 1 initial generation + up to 2 same-lens regenerations, each re-reviewed.
const MAX_REVIEW_CYCLES = 3;

export type ReviewedParableInsight = {
  insight: ParableInsight;
  review: ReflectionReview;
  passed: boolean;
  attemptsUsed: number;
  // Kept separate, not merged: generateParableInsight runs on Opus and
  // reviewDeepReflection runs on Haiku — different per-token rates, so a
  // blended total would make accurate cost reporting impossible. Each is
  // summed across every attempt in this cycle, including rejected ones.
  insightUsage: TokenUsage;
  reviewUsage: TokenUsage;
};

// Orchestrates generateParableInsight + reviewDeepReflection together. Does
// NOT touch the database or set reflectionStatus — that decision (REVIEWED vs.
// GENERATED-for-manual-queue) belongs to the caller (the 2d backfill script),
// which is the only layer that knows about Parable rows at all. This function
// only ever reuses the SAME lens across regenerations (never rolls a new one),
// so a retry is a corrected attempt at the same essay, not a different one.
export async function generateReviewedParableInsight(
  quote: ParableInsightQuote,
  parable: ParableInsightContent,
  language: 'en' | 'ru',
  lens: InsightLens,
): Promise<ReviewedParableInsight> {
  let insight: (ParableInsight & { usage: TokenUsage }) | undefined;
  let review: (ReflectionReview & { usage: TokenUsage }) | undefined;
  let insightUsage: TokenUsage = ZERO_USAGE;
  let reviewUsage: TokenUsage = ZERO_USAGE;

  for (let attempt = 1; attempt <= MAX_REVIEW_CYCLES; attempt++) {
    insight = await generateParableInsight(quote, parable, language, lens);
    review = await reviewDeepReflection(insight.conclusion, insight.questions, language);
    insightUsage = {
      inputTokens: insightUsage.inputTokens + insight.usage.inputTokens,
      outputTokens: insightUsage.outputTokens + insight.usage.outputTokens,
    };
    reviewUsage = {
      inputTokens: reviewUsage.inputTokens + review.usage.inputTokens,
      outputTokens: reviewUsage.outputTokens + review.usage.outputTokens,
    };
    if (review.pass) {
      return { insight, review, passed: true, attemptsUsed: attempt, insightUsage, reviewUsage };
    }
  }

  return {
    insight: insight!,
    review: review!,
    passed: false,
    attemptsUsed: MAX_REVIEW_CYCLES,
    insightUsage,
    reviewUsage,
  };
}
