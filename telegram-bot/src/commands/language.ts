import { Context, InlineKeyboard } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { getSubscriberState, setLanguage } from '../lib/subscriber';
import { isSupportedLanguage, t } from '../lib/i18n';
import { syncUserCommands } from '../lib/syncCommands';
import { trackEvent } from '../lib/analytics';

export async function handleLanguageCommand(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { language } = await getSubscriberState(chatId);
  const keyboard = new InlineKeyboard()
    .text('🇬🇧 English', 'lang:en')
    .text('🇷🇺 Русский', 'lang:ru');

  await ctx.reply(t(language, 'chooseLanguage'), { reply_markup: keyboard });
}

export async function handleLanguageCallback(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  const selected = ctx.callbackQuery?.data?.split(':')[1];
  if (!chatId || !isSupportedLanguage(selected)) return;

  const { language: previousLanguage, subscribed } = await getSubscriberState(chatId);
  await setLanguage(chatId, ctx.from?.username ?? null, selected);
  trackEvent(BigInt(chatId), 'language_changed', { from: previousLanguage, to: selected });

  await ctx.answerCallbackQuery();
  await Promise.all([
    ctx.reply(t(selected, 'languageSet'), { reply_markup: buildKeyboard(selected) }),
    syncUserCommands(ctx, subscribed, selected),
  ]);
}
