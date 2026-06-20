import { Context } from 'grammy';
import { buildKeyboard, getSubscriptionStatus } from '../lib/keyboard';

export async function handleStart(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  const subscribed = chatId ? await getSubscriptionStatus(chatId) : false;

  await ctx.reply(
    'Welcome to SagewayAI 🌿\n\nA daily parable that resonates.',
    { reply_markup: buildKeyboard(subscribed) },
  );
}
