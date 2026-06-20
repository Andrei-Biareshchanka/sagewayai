import { Context } from 'grammy';
import { prisma } from '../lib/prisma';
import { mainKeyboard } from './start';

export async function handleSubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const username = ctx.from?.username ?? null;

  const existing = await prisma.telegramSubscriber.findUnique({
    where: { chatId: BigInt(chatId) },
  });

  if (existing?.active) {
    await ctx.reply('You are already subscribed. You will receive a daily parable every morning.', {
      reply_markup: mainKeyboard,
    });
    return;
  }

  await prisma.telegramSubscriber.upsert({
    where: { chatId: BigInt(chatId) },
    create: { chatId: BigInt(chatId), username, active: true },
    update: { active: true, username },
  });

  await ctx.reply('Subscribed! You will receive a daily parable every morning at 8:00. 🌿', {
    reply_markup: mainKeyboard,
  });
}

export async function handleUnsubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const existing = await prisma.telegramSubscriber.findUnique({
    where: { chatId: BigInt(chatId) },
  });

  if (!existing || !existing.active) {
    await ctx.reply('You are not subscribed.', { reply_markup: mainKeyboard });
    return;
  }

  await prisma.telegramSubscriber.update({
    where: { chatId: BigInt(chatId) },
    data: { active: false },
  });

  await ctx.reply('Unsubscribed. You will no longer receive daily parables.', {
    reply_markup: mainKeyboard,
  });
}
