import { Bot } from 'grammy';
import { prisma } from './prisma';
import { Digest, fetchDailyDigest } from './digestApi';
import { formatDigest } from './formatDigest';
import { formatChannelDigest, formatChannelDigestCaption } from './formatChannelDigest';
import { buildKeyboard, buildChannelKeyboard, buildShareUrl } from './keyboard';
import { isSupportedLanguage, Language, t } from './i18n';
import { trackEvent } from './analytics';

const CHANNEL_LANGUAGE: Language = 'ru';
const CHANNEL_BASE_URL = 'https://sagewayai.com';
const ADMIN_CHAT_ID = process.env['ADMIN_CHAT_ID'];
const CHANNEL_PUBLISH_DELAY_MS = 15 * 60 * 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ChannelPublishResult =
  | { status: 'published'; slug: string }
  | { status: 'skipped'; reason: 'no_channel_id' | 'no_slug' }
  | { status: 'error'; message: string };

async function getDigestCached(cache: Map<Language, Digest>, language: Language): Promise<Digest> {
  const cached = cache.get(language);
  if (cached) return cached;

  const digest = await fetchDailyDigest(language);
  cache.set(language, digest);
  return digest;
}

async function publishToChannel(bot: Bot, digestCache: Map<Language, Digest>): Promise<ChannelPublishResult> {
  const channelId = process.env['TELEGRAM_CHANNEL_ID'];
  if (!channelId) {
    process.stderr.write('Skipped channel publish: TELEGRAM_CHANNEL_ID is not set\n');
    return { status: 'skipped', reason: 'no_channel_id' };
  }

  try {
    const digest = await getDigestCached(digestCache, CHANNEL_LANGUAGE);
    if (!digest.slug) {
      process.stderr.write(`Skipped channel publish: digest has no slug (date=${digest.date})\n`);
      return { status: 'skipped', reason: 'no_slug' };
    }

    const siteUrl = `${CHANNEL_BASE_URL}/ru/d/${digest.slug}?utm_source=telegram&utm_medium=social&utm_campaign=channel_post`;

    if (digest.imageUrl) {
      // Single message so the whole post — photo + text — forwards/shares as one unit.
      // Uses the shorter caption format (no "Вывод" — a caption is capped at 1024 chars,
      // far tighter than a plain message; the reflection becomes a reason to click through
      // to the site instead). The CTA line inside the caption is itself the link, so no
      // separate inline keyboard button — one click-through path, not two.
      await bot.api.sendPhoto(channelId, digest.imageUrl, {
        caption: formatChannelDigestCaption(digest, siteUrl),
        parse_mode: 'MarkdownV2',
      });
    } else {
      // No image yet, so no in-caption CTA link exists — the button is still the only
      // click-through path here.
      await bot.api.sendMessage(channelId, formatChannelDigest(digest), {
        parse_mode: 'MarkdownV2',
        reply_markup: buildChannelKeyboard(siteUrl),
      });
    }
    process.stdout.write(`Published digest to channel: ${digest.slug}\n`);
    return { status: 'published', slug: digest.slug };
  } catch (error) {
    process.stderr.write(`Failed to publish digest to channel: ${error}\n`);
    return { status: 'error', message: String(error).slice(0, 500) };
  }
}

function buildBroadcastReport(sent: number, total: number, deactivated: number, channel: ChannelPublishResult): string {
  const channelLine =
    channel.status === 'published'
      ? `✅ Channel: published (${channel.slug})`
      : channel.status === 'skipped'
        ? `⏭️ Channel: skipped (${channel.reason === 'no_channel_id' ? 'TELEGRAM_CHANNEL_ID not set' : 'digest has no slug'})`
        : `⚠️ Channel: FAILED — ${channel.message}`;

  return ['📣 Daily broadcast report', '', `✅ Subscribers: ${sent}/${total} (${deactivated} deactivated)`, channelLine].join(
    '\n',
  );
}

async function notifyAdmin(bot: Bot, message: string): Promise<void> {
  if (!ADMIN_CHAT_ID) return;
  try {
    await bot.api.sendMessage(Number(ADMIN_CHAT_ID), message);
  } catch (error) {
    process.stderr.write(`Failed to notify admin: ${error}\n`);
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
      if (digest.imageUrl) {
        await bot.api.sendPhoto(chatIdNumber, digest.imageUrl);
      }

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

  // Deliberate offset from the subscriber broadcast: the exact cause of the 2026-07-11
  // missing channel post was never conclusively identified from logs. If it was a
  // transient issue tied to the 8:00 broadcast window itself (server cold start, load),
  // spacing the channel post out reduces the chance of hitting the same window twice.
  await sleep(CHANNEL_PUBLISH_DELAY_MS);

  const channelResult = await publishToChannel(bot, digestCache);
  await notifyAdmin(bot, buildBroadcastReport(sent, subscribers.length, deactivated, channelResult));
}
