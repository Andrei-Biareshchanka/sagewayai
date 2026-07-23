import { Prisma, Quote } from '@prisma/client';
import { prisma } from '../lib/prisma';

const QUOTES_PER_PARABLE = 3;

// Flips the daily-digest selection pipeline from quote-first (pick a
// quote, vector-search a matching parable — see services/digest.ts's
// findParableForQuote, still present but no longer called from the
// publish flow) to parable-first: pick the least-recently-shown parable
// under a hard cooldown, then rotate through its 3 pre-assigned quotes
// (findQuoteForParable, below). Rendering (DigestBlock) and the daily
// short-reflection generation are untouched — only which parable+quote
// gets selected changes.

export const COOLDOWN_DAYS = 60;

// Fixed-length ladder, same defensive-relaxation pattern as
// PARABLE_COOLDOWN_STEPS in services/digest.ts: only step down to a shorter
// window when the stricter one has zero candidates. The last step (0)
// disables the cooldown exclusion entirely, so as long as the Parable table
// is non-empty this loop is guaranteed to terminate with a result — the
// "pool empty" case this guards against should be mathematically unreachable
// at 80 parables / 60 days, but the ladder makes it a graceful relaxation
// instead of a hard failure if the pool ever shrinks.
const COOLDOWN_STEPS = [COOLDOWN_DAYS, 45, 30, 21, 14, 7, 0] as const;

export type DailyParableCandidate = {
  id: string;
  title: string;
  content: string;
  moral: string;
  source: string | null;
  readTime: number;
  categoryId: string;
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

// LRU among whatever survives the cooldown exclusion: the parable with the
// oldest last-shown date wins; a parable that has never been shown
// (lastShown IS NULL) outranks every parable that has, via NULLS FIRST.
async function queryLeastRecentlyShown(excludeClause: Prisma.Sql): Promise<DailyParableCandidate | undefined> {
  const [candidate] = await prisma.$queryRaw<DailyParableCandidate[]>`
    SELECT p.id, p.title, p.content, p.moral, p.source, p."readTime", p."categoryId"
    FROM "Parable" p
    LEFT JOIN (
      SELECT "parableId", MAX(date) AS "lastShown"
      FROM "DailyDigest"
      GROUP BY "parableId"
    ) d ON d."parableId" = p.id
    WHERE TRUE
      ${excludeClause}
    ORDER BY d."lastShown" ASC NULLS FIRST
    LIMIT 1
  `;
  return candidate;
}

export async function selectDailyParable(): Promise<DailyParableCandidate> {
  for (const cooldownDays of COOLDOWN_STEPS) {
    const excludeIds = await getRecentlyShownParableIds(cooldownDays);
    const candidate = await queryLeastRecentlyShown(buildExcludeClause(excludeIds));

    if (candidate) {
      if (cooldownDays !== COOLDOWN_STEPS[0]) {
        console.warn(
          `selectDailyParable: cooldown fallback engaged — used ${cooldownDays}-day window instead of the default ${COOLDOWN_DAYS} days (pool was exhausted at every stricter step).`,
        );
      }
      return candidate;
    }
  }

  // Reachable only if the Parable table itself is empty — a real data
  // problem, not a transient cooldown squeeze, so this fails loudly.
  throw new Error('selectDailyParable: no parable available even with cooldown fully relaxed');
}

// Rotates through a parable's 3 pre-assigned quotes (backfilled earlier —
// every parable has exactly ParableQuote positions 0/1/2, one of them
// isPrimary) instead of re-running the vector search each time. First-ever
// show of a parable (timesShown=0) lands on position 0 (primary); each
// subsequent show advances 1 → 2 → 0 → 1 → ... — timesShown counts every
// DailyDigest row for this parable ever created (drafts included, same
// convention as the cooldown counting above), so the rotation position is
// determined purely by history, no state to track separately.
export async function findQuoteForParable(parable: { id: string }): Promise<Quote> {
  const timesShown = await prisma.dailyDigest.count({ where: { parableId: parable.id } });
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
