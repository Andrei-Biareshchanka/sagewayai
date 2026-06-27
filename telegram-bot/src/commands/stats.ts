import { Context } from 'grammy';
import { prisma } from '../lib/prisma';

const ADMIN_CHAT_ID = process.env['ADMIN_CHAT_ID'];

function isAdmin(chatId: number): boolean {
  return ADMIN_CHAT_ID !== undefined && String(chatId) === ADMIN_CHAT_ID;
}

function startOfDay(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function computeRetention(cohortStart: Date, cohortEnd: Date, activeFrom: Date): Promise<number> {
  const cohort = await prisma.botEvent.findMany({
    where: { event: 'start', createdAt: { gte: cohortStart, lt: cohortEnd } },
    select: { userId: true },
    distinct: ['userId'],
  });
  if (cohort.length === 0) return 0;

  const cohortIds = cohort.map((r) => r.userId);
  const active = await prisma.botEvent.findMany({
    where: { userId: { in: cohortIds }, createdAt: { gte: activeFrom } },
    select: { userId: true },
    distinct: ['userId'],
  });

  return Math.round((active.length / cohort.length) * 100);
}

async function computeSources(since: Date): Promise<Record<string, number>> {
  const events = await prisma.botEvent.findMany({
    where: { event: 'start', createdAt: { gte: since } },
    select: { meta: true },
  });

  const counts: Record<string, number> = { organic: 0, referral: 0 };
  for (const e of events) {
    const source = (e.meta as { source?: string } | null)?.source ?? 'organic';
    counts[source] = (counts[source] ?? 0) + 1;
  }
  return counts;
}

export async function handleStats(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId || !isAdmin(chatId)) return;

  const sevenDaysAgo = startOfDay(7);
  const today = startOfDay(0);
  const yesterday = startOfDay(1);

  const [total, active, newThisWeek, byLanguage, digestsOpened, situationsUsed, subscriptions, unsubscriptions] =
    await Promise.all([
      prisma.telegramSubscriber.count(),
      prisma.telegramSubscriber.count({ where: { active: true } }),
      prisma.telegramSubscriber.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.telegramSubscriber.groupBy({ by: ['language'], _count: { language: true } }),
      prisma.botEvent.count({ where: { event: 'digest_opened', createdAt: { gte: sevenDaysAgo } } }),
      prisma.botEvent.count({ where: { event: 'situation_result', createdAt: { gte: sevenDaysAgo } } }),
      prisma.botEvent.count({ where: { event: 'subscribe', createdAt: { gte: sevenDaysAgo } } }),
      prisma.botEvent.count({ where: { event: 'unsubscribe', createdAt: { gte: sevenDaysAgo } } }),
    ]);

  const [d1, d7, sources] = await Promise.all([
    computeRetention(yesterday, today, today),
    computeRetention(startOfDay(8), startOfDay(7), sevenDaysAgo),
    computeSources(sevenDaysAgo),
  ]);

  const inactive = total - active;
  const langLines = byLanguage
    .map((row) => `  ${row.language.toUpperCase()}: ${row._count.language}`)
    .join('\n');

  const sourceLines = Object.entries(sources)
    .filter(([, count]) => count > 0)
    .map(([source, count]) => `  — ${source}: ${count}`)
    .join('\n');

  const message = [
    '📊 Bot stats',
    '',
    `👥 Total: ${total} (ever started the bot)`,
    `✅ Active: ${active} (subscribed to daily digest)`,
    `❌ Inactive: ${inactive} (unsubscribed or skipped)`,
    `🆕 New this week: ${newThisWeek}`,
    '',
    '🌐 By language:',
    langLines,
    '',
    '📊 Activity (last 7 days):',
    `  — digests opened: ${digestsOpened}`,
    `  — situation searches: ${situationsUsed}`,
    `  — new subscriptions: ${subscriptions}`,
    `  — unsubscriptions: ${unsubscriptions}`,
    '',
    '🔄 Retention:',
    `  — D1: ${d1}%`,
    `  — D7: ${d7}%`,
    '',
    '📥 New user sources (this week):',
    sourceLines || '  — no data yet',
  ].join('\n');

  await ctx.reply(message);
}
