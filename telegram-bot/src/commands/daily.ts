import { Context } from 'grammy';
import { fetchDailyDigest } from '../lib/digestApi';
import { formatDigest } from '../lib/formatDigest';
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
    await ctx.reply(formatDigest(digest, t(language, 'revealHint')), {
      parse_mode: 'MarkdownV2',
    });
  } catch {
    await ctx.reply(t(language, 'dailyError'));
  }
}
