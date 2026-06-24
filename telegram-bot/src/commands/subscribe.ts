import { Context } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { getSubscriberState, setActive } from '../lib/subscriber';
import { Language, t, TranslationKey } from '../lib/i18n';

async function replyWithKeyboard(
  ctx: Context,
  key: TranslationKey,
  language: Language,
  subscribed: boolean,
): Promise<void> {
  await ctx.reply(t(language, key), { reply_markup: buildKeyboard(subscribed, language) });
}

export async function handleSubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await getSubscriberState(chatId);

  if (subscribed) {
    await replyWithKeyboard(ctx, 'alreadySubscribed', language, true);
    return;
  }

  await setActive(chatId, ctx.from?.username ?? null, true);
  await replyWithKeyboard(ctx, 'subscribed', language, true);
}

export async function handleUnsubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await getSubscriberState(chatId);

  if (!subscribed) {
    await replyWithKeyboard(ctx, 'notSubscribed', language, false);
    return;
  }

  await setActive(chatId, ctx.from?.username ?? null, false);
  await replyWithKeyboard(ctx, 'unsubscribed', language, false);
}
