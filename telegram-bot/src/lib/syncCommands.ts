import { Context } from 'grammy';
import { Language, t } from './i18n';

export async function syncUserCommands(ctx: Context, subscribed: boolean, language: Language): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const base = [
    { command: 'digest', description: t(language, 'cmdDigest') },
    { command: 'language', description: t(language, 'cmdLanguage') },
  ];

  const subscriptionCmd = subscribed
    ? { command: 'unsubscribe', description: t(language, 'cmdUnsubscribe') }
    : { command: 'subscribe', description: t(language, 'cmdSubscribe') };

  const commands = [...base, subscriptionCmd, { command: 'help', description: t(language, 'cmdHelp') }];

  await ctx.api.setMyCommands(commands, { scope: { type: 'chat', chat_id: chatId } });
}
