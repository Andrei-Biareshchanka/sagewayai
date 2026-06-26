import { Context, InlineKeyboard } from 'grammy';
import { buildKeyboard } from '../lib/keyboard';
import { fetchDailyDigest } from '../lib/digestApi';
import { formatDigest } from '../lib/formatDigest';
import { isSupportedLanguage, t } from '../lib/i18n';
import { getSubscriberState, setActive, setLanguage } from '../lib/subscriber';
import { syncUserCommands } from '../lib/syncCommands';

export function buildOnboardLangKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🇬🇧 English', 'onboard_lang:en')
    .text('🇷🇺 Русский', 'onboard_lang:ru');
}

function buildSubscribeOfferKeyboard(language: Parameters<typeof t>[0]): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(language, 'onboardSubscribeYes'), 'onboard_sub:yes')
    .text(t(language, 'onboardSubscribeLater'), 'onboard_sub:skip');
}

export async function handleOnboardLang(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  const selected = ctx.callbackQuery?.data?.split(':')[1];
  if (!chatId || !isSupportedLanguage(selected)) return;

  await setLanguage(chatId, ctx.from?.username ?? null, selected);
  await ctx.answerCallbackQuery();
  await ctx.reply(t(selected, 'onboardSubscribeOffer'), {
    reply_markup: buildSubscribeOfferKeyboard(selected),
  });
}

export async function handleOnboardSub(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  const action = ctx.callbackQuery?.data?.split(':')[1];
  if (!chatId || !action) return;

  const { language } = await getSubscriberState(chatId);
  await ctx.answerCallbackQuery();

  if (action === 'yes') {
    await setActive(chatId, ctx.from?.username ?? null, true);
    await Promise.all([
      ctx.reply(t(language, 'onboardDone'), {
        parse_mode: 'MarkdownV2',
        reply_markup: buildKeyboard(language),
      }),
      syncUserCommands(ctx, true, language),
    ]);

    try {
      const digest = await fetchDailyDigest(language);
      const labels = {
        revealHint: t(language, 'revealHint'),
        labelReflection: t(language, 'labelReflection'),
        labelQuestion: t(language, 'labelQuestion'),
      };
      await ctx.reply(formatDigest(digest, labels), { parse_mode: 'MarkdownV2' });
    } catch {
      // non-critical — user is subscribed, digest can be fetched manually
    }
  } else {
    await Promise.all([
      ctx.reply(t(language, 'onboardLater'), {
        parse_mode: 'MarkdownV2',
        reply_markup: buildKeyboard(language),
      }),
      syncUserCommands(ctx, false, language),
    ]);
  }
}
