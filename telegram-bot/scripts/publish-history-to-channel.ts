import 'dotenv/config';
import { Bot } from 'grammy';
import { prisma } from '../src/lib/prisma';
import { Digest } from '../src/lib/digestApi';
import { formatChannelDigest } from '../src/lib/formatChannelDigest';
import { buildChannelKeyboard } from '../src/lib/keyboard';

const DEFAULT_LIMIT = 5;
const DELAY_BETWEEN_POSTS_MS = 2000;
const CHANNEL_BASE_URL = 'https://sagewayai.com';

function parseLimit(argv: string[]): number {
  const arg = argv.find((value) => value.startsWith('--limit='));
  const parsed = arg ? Number(arg.split('=')[1]) : DEFAULT_LIMIT;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIMIT;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPublishedDigests(limit: number) {
  return prisma.dailyDigest.findMany({
    where: { isPublished: true, slug: { not: null } },
    orderBy: { date: 'asc' },
    take: limit,
    include: { quote: true, parable: true },
  });
}

type PublishedDigest = Awaited<ReturnType<typeof fetchPublishedDigests>>[number];

function toChannelDigest(record: PublishedDigest): Digest {
  return {
    date: record.date.toISOString(),
    slug: record.slug,
    title: record.titleRu ?? record.titleEn,
    quote: {
      text: record.quote.textRu ?? record.quote.text,
      author: record.quote.authorRu ?? record.quote.author,
    },
    parable: {
      title: record.parable.titleRu ?? record.parable.title,
      content: record.parable.contentRu ?? record.parable.content,
    },
    conclusion: record.conclusionRu,
    question: record.questionRu,
  };
}

async function publishDigest(bot: Bot, channelId: string, record: PublishedDigest): Promise<boolean> {
  const digest = toChannelDigest(record);
  if (!digest.slug) return false;

  await bot.api.sendMessage(channelId, formatChannelDigest(digest), {
    parse_mode: 'MarkdownV2',
    reply_markup: buildChannelKeyboard(`${CHANNEL_BASE_URL}/ru/d/${digest.slug}`),
  });
  return true;
}

async function publishAll(bot: Bot, channelId: string, digests: PublishedDigest[]): Promise<void> {
  for (const [index, record] of digests.entries()) {
    const published = await publishDigest(bot, channelId, record);
    const label = record.slug ?? record.id;
    const progress = `${index + 1}/${digests.length}`;
    console.log(published ? `Published ${progress}: ${label}` : `Skipped ${progress} (no slug): ${label}`);
    if (index < digests.length - 1) await sleep(DELAY_BETWEEN_POSTS_MS);
  }
}

async function main(): Promise<void> {
  const limit = parseLimit(process.argv.slice(2));
  const token = process.env['TELEGRAM_BOT_TOKEN'];
  const channelId = process.env['TELEGRAM_CHANNEL_ID'];
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not set');
  if (!channelId) throw new Error('TELEGRAM_CHANNEL_ID is not set');

  const bot = new Bot(token);
  const digests = await fetchPublishedDigests(limit);
  await publishAll(bot, channelId, digests);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
