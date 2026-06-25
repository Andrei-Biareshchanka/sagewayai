import { Bot, InlineKeyboard } from 'grammy';
import { prisma } from './prisma';
import { Digest, fetchDailyDigest } from './digestApi';
import { formatDigestTeaser } from './formatDigest';
import { isSupportedLanguage, Language, t } from './i18n';

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
    const keyboard = new InlineKeyboard().text(t(language, 'revealButton'), 'digest:reveal');

    try {
      await bot.api.sendMessage(Number(subscriber.chatId), formatDigestTeaser(digest.quote, digest.parable), {
        parse_mode: 'MarkdownV2',
        reply_markup: keyboard,
      });
    } catch {
      await prisma.telegramSubscriber.update({
        where: { id: subscriber.id },
        data: { active: false },
      });
    }
  }
}
