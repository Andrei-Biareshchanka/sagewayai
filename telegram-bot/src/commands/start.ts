import { Context } from 'grammy';
import { Keyboard } from 'grammy';

const mainKeyboard = new Keyboard()
  .text('📖 Daily parable').row()
  .text('🔔 Subscribe').text('🔕 Unsubscribe')
  .resized()
  .persistent();

export { mainKeyboard };

export async function handleStart(ctx: Context): Promise<void> {
  await ctx.reply(
    'Welcome to SagewayAI 🌿\n\nA daily parable that resonates.',
    { reply_markup: mainKeyboard },
  );
}
