import { Bot } from 'grammy';
import { prisma } from './prisma';
import { Digest, fetchDailyDigest } from './digestApi';
import { formatDigest } from './formatDigest';
import { formatChannelDigest } from './formatChannelDigest';
import { buildKeyboard, buildChannelKeyboard, buildShareUrl } from './keyboard';
import { isSupportedLanguage, Language, t } from './i18n';
import { trackEvent } from './analytics';

const CHANNEL_LANGUAGE: Language = 'ru';
const CHANNEL_BASE_URL = 'https://sagewayai.com';

async function getDigestCached(cache: Map<Language, Digest>, language: Language): Promise<Digest> {
  const cached = cache.get(language);
  if (cached) return cached;

  const digest = await fetchDailyDigest(language);
  cache.set(language, digest);
  return digest;
}

async function publishToChannel(bot: Bot, digestCache: Map<Language, Digest>): Promise<void> {
  const channelId = process.env['TELEGRAM_CHANNEL_ID'];
  if (!channelId) return;

  try {
    const digest = await getDigestCached(digestCache, CHANNEL_LANGUAGE);
    if (!digest.slug) return;

    await bot.api.sendMessage(channelId, formatChannelDigest(digest), {
      parse_mode: 'MarkdownV2',
      reply_markup: buildChannelKeyboard(`${CHANNEL_BASE_URL}/ru/d/${digest.slug}`),
    });
    process.stdout.write(`Published digest to channel: ${digest.slug}\n`);
  } catch (error) {
    process.stderr.write(`Failed to publish digest to channel: ${error}\n`);
  }
}

export async function broadcastDailyParable(bot: Bot): Promise<void> {
  const subscribers = await prisma.telegramSubscriber.findMany({
    where: { active: true },
  });

  const digestCache = new Map<Language, Digest>();
  let sent = 0;
  let deactivated = 0;

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
      sent++;
    } catch {
      deactivated++;
      await prisma.telegramSubscriber.update({
        where: { id: subscriber.id },
        data: { active: false },
      });
    }
  }

  process.stdout.write(`Daily broadcast: sent to ${sent}/${subscribers.length} subscribers (${deactivated} deactivated)\n`);

  await publishToChannel(bot, digestCache);
}
