import { Context, InlineKeyboard } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { getSubscriberState, setLanguage } from '../lib/subscriber';
import { isSupportedLanguage, t } from '../lib/i18n';
import { syncUserCommands } from '../lib/syncCommands';

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

  await setLanguage(chatId, ctx.from?.username ?? null, selected);
  const { subscribed } = await getSubscriberState(chatId);

  await ctx.answerCallbackQuery();
  await Promise.all([
    ctx.reply(t(selected, 'languageSet'), { reply_markup: buildKeyboard(selected) }),
    syncUserCommands(ctx, subscribed, selected),
  ]);
}
