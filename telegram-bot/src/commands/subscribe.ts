import { Context } from 'grammy';
import { getSubscriberState, setActive } from '../lib/subscriber';
import { Language, t, TranslationKey } from '../lib/i18n';
import { syncUserCommands } from '../lib/syncCommands';
import { trackEvent } from '../lib/analytics';

async function reply(ctx: Context, key: TranslationKey, language: Language): Promise<void> {
  await ctx.reply(t(language, key));
}

export async function handleSubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await getSubscriberState(chatId);

  if (subscribed) {
    await reply(ctx, 'alreadySubscribed', language);
    return;
  }

  await setActive(chatId, ctx.from?.username ?? null, true);
  trackEvent(BigInt(chatId), 'subscribe');
  await Promise.all([
    reply(ctx, 'subscribed', language),
    syncUserCommands(ctx, true, language),
  ]);
}

export async function handleUnsubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await getSubscriberState(chatId);

  if (!subscribed) {
    await reply(ctx, 'notSubscribed', language);
    return;
  }

  await setActive(chatId, ctx.from?.username ?? null, false);
  trackEvent(BigInt(chatId), 'unsubscribe');
  await Promise.all([
    reply(ctx, 'unsubscribed', language),
    syncUserCommands(ctx, false, language),
  ]);
}
