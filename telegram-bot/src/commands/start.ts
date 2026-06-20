import { CommandContext, Context } from 'grammy';

export async function handleStart(ctx: CommandContext<Context>): Promise<void> {
  await ctx.reply(
    `Welcome to SagewayAI 🌿\n\nA daily parable that resonates.\n\n` +
    `Commands:\n` +
    `/daily — today's parable\n` +
    `/help — show this message`,
  );
}
