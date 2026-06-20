import { Bot } from 'grammy';
import { prisma } from './prisma';
import { getDailyParable } from './daily';

function formatParable(parable: {
  title: string;
  content: string;
  source?: string | null;
}): string {
  const lines: string[] = [
    `📖 *${escapeMarkdown(parable.title)}*`,
    '',
    escapeMarkdown(parable.content),
  ];

  if (parable.source) {
    lines.push('', `_— ${escapeMarkdown(parable.source)}_`);
  }

  return lines.join('\n');
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

export async function broadcastDailyParable(bot: Bot): Promise<void> {
  const parable = await getDailyParable();
  const message = formatParable(parable);

  const subscribers = await prisma.telegramSubscriber.findMany({
    where: { active: true },
  });

  for (const subscriber of subscribers) {
    try {
      await bot.api.sendMessage(Number(subscriber.chatId), message, {
        parse_mode: 'MarkdownV2',
      });
    } catch {
      await prisma.telegramSubscriber.update({
        where: { id: subscriber.id },
        data: { active: false },
      });
    }
  }
}
