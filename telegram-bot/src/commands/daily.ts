import { CommandContext, Context } from 'grammy';
import { getDailyParable } from '../lib/daily';

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

export async function handleDaily(ctx: CommandContext<Context>): Promise<void> {
  await ctx.replyWithChatAction('typing');

  try {
    const parable = await getDailyParable();
    await ctx.reply(formatParable(parable), { parse_mode: 'MarkdownV2' });
  } catch {
    await ctx.reply('Could not load today\'s parable. Please try again later.');
  }
}
