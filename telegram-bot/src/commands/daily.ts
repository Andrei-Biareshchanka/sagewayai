import { Context } from 'grammy';
import { fetchDailyDigest } from '../lib/digestApi';
import { formatDigest } from '../lib/formatDigest';
import { buildShareKeyboard } from '../lib/keyboard';
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
    const labels = {
      revealHint: t(language, 'revealHint'),
      labelReflection: t(language, 'labelReflection'),
      labelQuestion: t(language, 'labelQuestion'),
    };
    await ctx.reply(formatDigest(digest, labels), {
      parse_mode: 'MarkdownV2',
      reply_markup: buildShareKeyboard(language),
    });
  } catch {
    await ctx.reply(t(language, 'dailyError'));
  }
}
