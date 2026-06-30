import { Bot } from 'grammy';
import { prisma } from './prisma';
import { Digest, fetchDailyDigest } from './digestApi';
import { formatDigest } from './formatDigest';
import { buildKeyboard, buildShareUrl } from './keyboard';
import { isSupportedLanguage, Language, t } from './i18n';
import { trackEvent } from './analytics';

async function getDigestCached(cache: Map<Language, Digest>, language: Language): Promise<Digest> {
  const cached = cache.get(language);
  if (cached) return cached;

  const digest = await fetchDailyDigest(language);
  cache.set(language, digest);
  return digest;
}

export async function broadcastDailyParable(bot: Bot): Promise<void> {
  const subscribers = await prisma.telegramSubscriber.findMany({
    where: { active: true },
  });

  const digestCache = new Map<Language, Digest>();

  for (const subscriber of subscribers) {
    const language = isSupportedLanguage(subscriber.language) ? subscriber.language : 'en';
    const digest = await getDigestCached(digestCache, language);
    const chatIdNumber = Number(subscriber.chatId);

    try {
      const labels = {
        revealHint: t(language, 'revealHint'),
        labelReflection: t(language, 'labelReflection'),
        labelQuestion: t(language, 'labelQuestion'),
        shareLabel: t(language, 'shareLink'),
        shareUrl: buildShareUrl(language, digest, chatIdNumber),
      };
      await bot.api.sendMessage(chatIdNumber, formatDigest(digest, labels), {
        parse_mode: 'MarkdownV2',
        reply_markup: buildKeyboard(language),
      });
      trackEvent(subscriber.chatId, 'digest_opened');
    } catch {
      await prisma.telegramSubscriber.update({
        where: { id: subscriber.id },
        data: { active: false },
      });
    }
  }
}
