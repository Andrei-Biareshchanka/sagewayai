import { Prisma, Quote } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { notifyAdmin } from '../lib/adminAlert';

const QUOTES_PER_PARABLE = 3;

// Flips the daily-digest selection pipeline from quote-first (pick a
// quote, vector-search a matching parable — see services/digest.ts's
// findParableForQuote, still present but no longer called from the
// publish flow) to parable-first: draw a parable at random from everything
// outside the cooldown window, then rotate through its 3 pre-assigned quotes
// (findQuoteForParable, below). Rendering (DigestBlock) and the daily
// short-reflection generation are untouched — only which parable+quote
// gets selected changes.

export const COOLDOWN_DAYS = 70;

// Fixed-length ladder, same defensive-relaxation pattern as
// PARABLE_COOLDOWN_STEPS in services/digest.ts: only step down to a shorter
// window when the stricter one has zero candidates. The last step (0)
// disables the cooldown exclusion entirely, so as long as the Parable table
// holds at least one REVIEWED row this loop is guaranteed to terminate with a
// result.
//
// The ladder is not decorative: an audit of production on 2026-08-11 found the
// previous 60-day head had never actually held — repeats had landed 21-32 days
// apart (once at 4), because the eligible REVIEWED pool was still small while
// the library was being built out. It degraded silently for weeks. Hence
// reportCooldownStep below, which makes any future degradation visible the day
// it happens instead of only discoverable by querying the archive afterwards.
const COOLDOWN_STEPS = [COOLDOWN_DAYS, 60, 45, 30, 21, 14, 7, 0] as const;

const CANDIDATE_FIELDS = {
  id: true,
  title: true,
  titleRu: true,
  content: true,
  moral: true,
  source: true,
  readTime: true,
  categoryId: true,
  conclusionEn: true,
  conclusionRu: true,
  questionsEn: true,
  questionsRu: true,
} as const;

export type DailyParableCandidate = {
  id: string;
  title: string;
  titleRu: string | null;
  content: string;
  moral: string;
  source: string | null;
  readTime: number;
  categoryId: string;
  conclusionEn: string | null;
  conclusionRu: string | null;
  questionsEn: Prisma.JsonValue;
  questionsRu: Prisma.JsonValue;
};

function buildExcludeClause(parableIds: string[]): Prisma.Sql {
  return parableIds.length > 0 ? Prisma.sql`AND p.id NOT IN (${Prisma.join(parableIds)})` : Prisma.empty;
}

async function getRecentlyShownParableIds(cooldownDays: number): Promise<string[]> {
  if (cooldownDays <= 0) return [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - cooldownDays);
  const rows = await prisma.dailyDigest.findMany({
    where: { date: { gte: cutoff } },
    select: { parableId: true },
  });
  return rows.map((r) => r.parableId);
}

type EligibleParable = { id: string; lastShown: Date | null };

// Every parable that survives the cooldown exclusion, not just the single
// least-recently-shown one — the draw happens in drawFromPool below.
// Deliberately selects ids only: the pool is the full REVIEWED library on a
// normal day, and pulling every parable's full body text just to discard all
// but one is wasteful. The winner's fields are loaded separately by
// loadCandidate.
//
// Restricted to REVIEWED parables: the digest reads its conclusion/questions straight
// off the Parable row (see buildReflections in lib/dailyDigest.ts) instead of generating
// them fresh, so a DRAFT/GENERATED parable — which may have null conclusionEn/Ru or
// questionsEn/Ru — must never be selectable here.
async function queryEligibleParables(excludeClause: Prisma.Sql): Promise<EligibleParable[]> {
  return prisma.$queryRaw<EligibleParable[]>`
    SELECT p.id, d."lastShown"
    FROM "Parable" p
    LEFT JOIN (
      SELECT "parableId", MAX(date) AS "lastShown"
      FROM "DailyDigest"
      GROUP BY "parableId"
    ) d ON d."parableId" = p.id
    WHERE p."reflectionStatus" = 'REVIEWED'
      ${excludeClause}
  `;
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

// Random within the pool rather than strict LRU: strict LRU makes the sequence
// fully deterministic and walks the library in a fixed order, which reads as
// mechanical over months. The cooldown already provides the no-repeat
// guarantee, so randomness costs nothing.
//
// Never-shown parables are drawn first as a group, preserving the old
// NULLS FIRST bias — a freshly reviewed parable should reach readers promptly
// rather than wait behind a random draw over the whole library.
function drawFromPool(pool: readonly EligibleParable[]): EligibleParable {
  const neverShown = pool.filter((parable) => parable.lastShown === null);
  return pickRandom(neverShown.length > 0 ? neverShown : pool);
}

async function loadCandidate(parableId: string): Promise<DailyParableCandidate> {
  return prisma.parable.findUniqueOrThrow({ where: { id: parableId }, select: CANDIDATE_FIELDS });
}

// Degradation below the head of the ladder means the eligible pool has shrunk
// past what the intended cooldown can cover — either the library stopped
// growing or parables fell out of REVIEWED. Both are data problems that need a
// human, so this alerts rather than only logging (see the ladder comment above
// for the incident that motivated it). Best-effort by design: notifyAdmin
// swallows its own failures, so a Telegram outage can't fail the daily publish.
async function reportCooldownStep(cooldownDays: number, poolSize: number): Promise<void> {
  if (cooldownDays === COOLDOWN_STEPS[0]) return;

  const message =
    `selectDailyParable: cooldown fallback engaged — used a ${cooldownDays}-day window instead of ` +
    `${COOLDOWN_DAYS} days (every stricter step had an empty pool; ${poolSize} candidates at this one). ` +
    'Parables may now repeat sooner than intended.';
  console.warn(message);
  await notifyAdmin(`⚠️ ${message}`);
}

export async function selectDailyParable(): Promise<DailyParableCandidate> {
  for (const cooldownDays of COOLDOWN_STEPS) {
    const excludeIds = await getRecentlyShownParableIds(cooldownDays);
    const pool = await queryEligibleParables(buildExcludeClause(excludeIds));
    if (pool.length === 0) continue;

    await reportCooldownStep(cooldownDays, pool.length);
    return loadCandidate(drawFromPool(pool).id);
  }

  // Reachable only if no REVIEWED parable exists at all — a real data
  // problem, not a transient cooldown squeeze, so this fails loudly.
  throw new Error('selectDailyParable: no parable available even with cooldown fully relaxed');
}

// Counts every DailyDigest row ever created for this parable (drafts included) — the single
// source of truth for both the quote rotation (findQuoteForParable) and the question
// rotation (pickQuestion in lib/dailyDigest.ts). Must be read before today's DailyDigest row
// is created, or it would count itself and shift both rotations by one.
export async function getTimesShown(parableId: string): Promise<number> {
  return prisma.dailyDigest.count({ where: { parableId } });
}

// Rotates through a parable's 3 pre-assigned quotes (backfilled earlier —
// every parable has exactly ParableQuote positions 0/1/2, one of them
// isPrimary) instead of re-running the vector search each time. First-ever
// show of a parable (timesShown=0) lands on position 0 (primary); each
// subsequent show advances 1 → 2 → 0 → 1 → ...
export async function findQuoteForParable(parable: { id: string }, timesShown: number): Promise<Quote> {
  const position = timesShown % QUOTES_PER_PARABLE;

  const parableQuote = await prisma.parableQuote.findUnique({
    where: { parableId_position: { parableId: parable.id, position } },
    include: { quote: true },
  });

  // Not a soft fallback: every parable should have exactly 3 ParableQuote
  // rows from the 2a backfill. A missing row here means that invariant broke
  // — a real data problem that should fail loudly rather than silently
  // substitute some other quote (or crash later with a confusing null error).
  if (!parableQuote) {
    throw new Error(
      `findQuoteForParable: parable ${parable.id} has no ParableQuote at position ${position} (timesShown=${timesShown}) — every parable is expected to have exactly ${QUOTES_PER_PARABLE} quotes assigned (see the 2a backfill).`,
    );
  }

  return parableQuote.quote;
}
