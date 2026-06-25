import { Context, InlineKeyboard } from 'grammy';
import { fetchDailyDigest } from '../lib/digestApi';
import { formatDigestTeaser } from '../lib/formatDigest';
import { getSubscriberState } from '../lib/subscriber';
import { Language, t } from '../lib/i18n';

async function resolveLanguage(ctx: Context): Promise<Language> {
  const chatId = ctx.chat?.id;
  if (!chatId) return 'en';
  const { language } = await getSubscriberState(chatId);
  return language;
}

export async function handleDaily(ctx: Context): Promise<void> {
  await ctx.replyWithChatAction('typing');
  const language = await resolveLanguage(ctx);

  try {
    const digest = await fetchDailyDigest(language);
    const keyboard = new InlineKeyboard().text(t(language, 'revealButton'), 'digest:reveal');
    await ctx.reply(formatDigestTeaser(digest.quote, digest.parable), {
      parse_mode: 'MarkdownV2',
      reply_markup: keyboard,
    });
  } catch {
    await ctx.reply(t(language, 'dailyError'));
  }
}
