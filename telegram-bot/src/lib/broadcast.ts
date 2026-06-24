import { Bot } from 'grammy';
import { prisma } from './prisma';
import { getDailyParable } from './daily';
import { formatParable } from './formatParable';
import { isSupportedLanguage } from './i18n';

export async function broadcastDailyParable(bot: Bot): Promise<void> {
  const parable = await getDailyParable();

  const subscribers = await prisma.telegramSubscriber.findMany({
    where: { active: true },
  });

  for (const subscriber of subscribers) {
    const language = isSupportedLanguage(subscriber.language) ? subscriber.language : 'en';
    const message = formatParable(parable, language);

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
