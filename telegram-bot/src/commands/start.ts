import { Context } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { ensureSubscriber } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleStart(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await ensureSubscriber(
    chatId,
    ctx.from?.username ?? null,
    ctx.from?.language_code,
  );

  await ctx.reply(t(language, 'welcome'), { reply_markup: buildKeyboard(subscribed, language) });
}
