import { Context } from 'grammy';
import { fetchDailyDigest } from '../lib/digestApi';
import { formatDigestReveal } from '../lib/formatDigest';
import { getSubscriberState } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleDigestReveal(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();

  const chatId = ctx.chat?.id;
  const { language } = chatId ? await getSubscriberState(chatId) : { language: 'en' as const };

  try {
    const digest = await fetchDailyDigest(language);
    await ctx.reply(formatDigestReveal(digest.conclusion, digest.question), {
      parse_mode: 'MarkdownV2',
    });
  } catch {
    await ctx.reply(t(language, 'dailyError'));
  }
}
