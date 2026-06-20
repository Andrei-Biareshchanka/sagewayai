import { Context } from 'grammy';
import { prisma } from '../lib/prisma';
import { buildKeyboard } from '../lib/keyboard';

async function replyWithKeyboard(ctx: Context, text: string, subscribed: boolean): Promise<void> {
  await ctx.reply(text, { reply_markup: buildKeyboard(subscribed) });
}

async function isActiveSubscriber(chatId: number): Promise<boolean> {
  const sub = await prisma.telegramSubscriber.findUnique({ where: { chatId: BigInt(chatId) } });
  return sub?.active ?? false;
}

async function upsertSubscriber(chatId: number, username: string | null): Promise<void> {
  await prisma.telegramSubscriber.upsert({
    where: { chatId: BigInt(chatId) },
    create: { chatId: BigInt(chatId), username, active: true },
    update: { active: true, username },
  });
}

export async function handleSubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  if (await isActiveSubscriber(chatId)) {
    await replyWithKeyboard(ctx, 'You are already subscribed. You will receive a daily parable every morning.', true);
    return;
  }

  await upsertSubscriber(chatId, ctx.from?.username ?? null);
  await replyWithKeyboard(ctx, 'Subscribed! You will receive a daily parable every morning at 8:00. 🌿', true);
}

export async function handleUnsubscribe(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  if (!(await isActiveSubscriber(chatId))) {
    await replyWithKeyboard(ctx, 'You are not subscribed.', false);
    return;
  }

  await prisma.telegramSubscriber.update({ where: { chatId: BigInt(chatId) }, data: { active: false } });
  await replyWithKeyboard(ctx, 'Unsubscribed. You will no longer receive daily parables.', false);
}
