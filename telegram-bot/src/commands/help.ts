import { Context } from 'grammy';
import { getSubscriberState } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleHelp(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { language } = await getSubscriberState(chatId);
  await ctx.reply(t(language, 'helpText'), { parse_mode: 'MarkdownV2' });
}
