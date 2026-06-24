import { Context } from 'grammy';
import { getDailyParable } from '../lib/daily';
import { formatParable } from '../lib/formatParable';
import { getSubscriberState } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleDaily(ctx: Context): Promise<void> {
  await ctx.replyWithChatAction('typing');

  const chatId = ctx.chat?.id;
  const { language } = chatId ? await getSubscriberState(chatId) : { language: 'en' as const };

  try {
    const parable = await getDailyParable();
    await ctx.reply(formatParable(parable, language), { parse_mode: 'MarkdownV2' });
  } catch {
    await ctx.reply(t(language, 'dailyError'));
  }
}
