import { Context } from 'grammy';
import { buildShareKeyboard } from '../lib/keyboard';
import { fetchSituationDigest } from '../lib/digestApi';
import { formatDigest } from '../lib/formatDigest';
import { t } from '../lib/i18n';
import { getSubscriberState, getSituationUsedAt, setSituationUsedAt } from '../lib/subscriber';

const RATE_LIMIT_MS = 24 * 60 * 60 * 1000;
const MIN_LENGTH = 20;
const MAX_LENGTH = 800;

const waitingForSituation = new Map<number, true>();

function formatTimeRemaining(ms: number, language: 'en' | 'ru'): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);

  if (language === 'ru') {
    if (hours > 0) return `${hours}ч ${minutes}м`;
    return `${minutes}м`;
  }

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export async function handleSituationButton(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { language } = await getSubscriberState(chatId);
  const usedAt = await getSituationUsedAt(chatId);

  if (usedAt) {
    const elapsed = Date.now() - usedAt.getTime();
    if (elapsed < RATE_LIMIT_MS) {
      const remaining = RATE_LIMIT_MS - elapsed;
      const timeStr = formatTimeRemaining(remaining, language);
      await ctx.reply(`${t(language, 'situationRateLimitPrefix')} ${timeStr}`);
      return;
    }
  }

  waitingForSituation.set(chatId, true);
  await ctx.reply(t(language, 'situationPrompt'));
}

export function isWaitingForSituation(chatId: number): boolean {
  return waitingForSituation.has(chatId);
}

export async function handleSituationText(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  const text = ctx.message?.text;
  if (!chatId || !text) return;

  const { language } = await getSubscriberState(chatId);

  if (text.length < MIN_LENGTH) {
    const msg = t(language, 'situationTooShort')
      .replace('{current}', String(text.length))
      .replace('{min}', String(MIN_LENGTH));
    await ctx.reply(msg);
    return;
  }

  if (text.length > MAX_LENGTH) {
    const msg = t(language, 'situationTooLong')
      .replace('{current}', String(text.length))
      .replace('{max}', String(MAX_LENGTH));
    await ctx.reply(msg);
    return;
  }

  waitingForSituation.delete(chatId);
  const loadingMsg = await ctx.reply(t(language, 'situationLoading'));

  try {
    await ctx.api.sendChatAction(chatId, 'typing');
    const digest = await fetchSituationDigest(text, language);
    await setSituationUsedAt(chatId);

    const labels = {
      revealHint: t(language, 'revealHint'),
      labelReflection: t(language, 'labelReflection'),
      labelQuestion: t(language, 'labelQuestion'),
    };

    await ctx.api.deleteMessage(chatId, loadingMsg.message_id);
    await ctx.reply(formatDigest(digest, labels), {
      parse_mode: 'MarkdownV2',
      reply_markup: buildShareKeyboard(language, digest),
    });
  } catch {
    await ctx.api.deleteMessage(chatId, loadingMsg.message_id);
    await ctx.reply(t(language, 'situationError'));
  }
}
