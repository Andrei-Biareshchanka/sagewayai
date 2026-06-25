import { Context } from 'grammy';
import { prisma } from '../lib/prisma';

const ADMIN_CHAT_ID = process.env['ADMIN_CHAT_ID'];

function isAdmin(chatId: number): boolean {
  return ADMIN_CHAT_ID !== undefined && String(chatId) === ADMIN_CHAT_ID;
}

export async function handleStats(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId || !isAdmin(chatId)) return;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [total, active, newThisWeek, byLanguage] = await Promise.all([
    prisma.telegramSubscriber.count(),
    prisma.telegramSubscriber.count({ where: { active: true } }),
    prisma.telegramSubscriber.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.telegramSubscriber.groupBy({ by: ['language'], _count: { language: true } }),
  ]);

  const inactive = total - active;
  const langLines = byLanguage
    .map((row) => `  ${row.language.toUpperCase()}: ${row._count.language}`)
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
  ].join('\n');

  await ctx.reply(message);
}
