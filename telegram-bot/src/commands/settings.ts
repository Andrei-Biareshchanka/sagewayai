import { Context } from 'grammy';
import { getSubscriberState } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleSettings(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const { subscribed, language } = await getSubscriberState(chatId);

  const lines = [
    t(language, 'settingsTitle'),
    '',
    t(language, 'settingsLang'),
    subscribed ? t(language, 'settingsActive') : t(language, 'settingsInactive'),
  ];

  await ctx.reply(lines.join('\n'));
}
