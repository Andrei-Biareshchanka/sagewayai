import { prisma } from './prisma';
import { Language, detectLanguage, isSupportedLanguage } from './i18n';

export interface SubscriberState {
  subscribed: boolean;
  language: Language;
}

function toState(subscriber: { active: boolean; language: string } | null): SubscriberState {
  return {
    subscribed: subscriber?.active ?? false,
    language: isSupportedLanguage(subscriber?.language) ? subscriber.language : 'en',
  };
}

export async function getSubscriberState(chatId: number): Promise<SubscriberState> {
  const subscriber = await prisma.telegramSubscriber.findUnique({ where: { chatId: BigInt(chatId) } });
  return toState(subscriber);
}

export async function ensureSubscriber(
  chatId: number,
  username: string | null,
  languageCode: string | undefined,
): Promise<SubscriberState & { isNew: boolean }> {
  const subscriber = await prisma.telegramSubscriber.findUnique({ where: { chatId: BigInt(chatId) } });
  if (subscriber) return { ...toState(subscriber), isNew: false };

  const language = detectLanguage(languageCode);
  await prisma.telegramSubscriber.create({
    data: { chatId: BigInt(chatId), username, active: false, language },
  });
  return { subscribed: false, language, isNew: true };
}

export async function setActive(chatId: number, username: string | null, active: boolean): Promise<void> {
  await prisma.telegramSubscriber.upsert({
    where: { chatId: BigInt(chatId) },
    create: { chatId: BigInt(chatId), username, active },
    update: { active, username },
  });
}

export async function setLanguage(chatId: number, username: string | null, language: Language): Promise<void> {
  await prisma.telegramSubscriber.upsert({
    where: { chatId: BigInt(chatId) },
    create: { chatId: BigInt(chatId), username, active: false, language },
    update: { language },
  });
}
