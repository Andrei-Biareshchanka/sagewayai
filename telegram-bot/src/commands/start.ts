import { Context } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { ensureSubscriber } from '../lib/subscriber';
import { t } from '../lib/i18n';
import { syncUserCommands } from '../lib/syncCommands';
import { buildOnboardLangKeyboard } from './onboarding';

export async function handleStart(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language, isNew } = await ensureSubscriber(
    chatId,
    ctx.from?.username ?? null,
    ctx.from?.language_code,
  );

  if (isNew) {
    await ctx.reply(t(language, 'onboardChooseLang'), {
      reply_markup: buildOnboardLangKeyboard(),
    });
    return;
  }

  await Promise.all([
    ctx.reply(t(language, 'welcome'), { reply_markup: buildKeyboard(language) }),
    syncUserCommands(ctx, subscribed, language),
  ]);
}
