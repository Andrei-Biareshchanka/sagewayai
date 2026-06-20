import { Keyboard } from 'grammy';
import { prisma } from './prisma';

export function buildKeyboard(subscribed: boolean): Keyboard {
  const keyboard = new Keyboard().text('📖 Daily parable').row();

  if (subscribed) {
    keyboard.text('🔕 Unsubscribe');
  } else {
    keyboard.text('🔔 Subscribe');
  }

  return keyboard.resized().persistent();
}

export async function getSubscriptionStatus(chatId: number): Promise<boolean> {
  const subscriber = await prisma.telegramSubscriber.findUnique({
    where: { chatId: BigInt(chatId) },
  });
  return subscriber?.active ?? false;
}
