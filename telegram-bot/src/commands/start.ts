import { Context } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { ensureSubscriber, setReferredBy } from '../lib/subscriber';
import { t } from '../lib/i18n';
import { syncUserCommands } from '../lib/syncCommands';
import { buildOnboardLangKeyboard } from './onboarding';
import { trackEvent } from '../lib/analytics';

function parseStartPayload(text: string | undefined): string | null {
  const parts = text?.split(' ') ?? [];
  return parts.length > 1 ? (parts[1] ?? null) : null;
}

export async function handleStart(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const payload = parseStartPayload(ctx.message?.text);
  const source = payload?.startsWith('ref_') ? 'referral' : (payload ?? 'organic');

  const { subscribed, language, isNew } = await ensureSubscriber(
    chatId,
    ctx.from?.username ?? null,
    ctx.from?.language_code,
  );

  if (isNew) {
    trackEvent(BigInt(chatId), 'start', { source });

    if (payload?.startsWith('ref_')) {
      const referrerId = BigInt(payload.slice(4));
      await setReferredBy(chatId, referrerId);
      trackEvent(referrerId, 'referral', { newUserId: String(chatId) });
    }

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
