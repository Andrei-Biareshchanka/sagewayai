import { Context } from 'grammy';
import { getSubscriberState, getReferralCount } from '../lib/subscriber';
import { t } from '../lib/i18n';

export async function handleSettings(ctx: Context): Promise<void> {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const [{ subscribed, language }, referrals] = await Promise.all([
    getSubscriberState(chatId),
    getReferralCount(chatId),
  ]);

  const referralLine = language === 'ru'
    ? `👥 Привёл друзей: ${referrals}`
    : `👥 Friends referred: ${referrals}`;

  const lines = [
    t(language, 'settingsTitle'),
    '',
    t(language, 'settingsLang'),
    subscribed ? t(language, 'settingsActive') : t(language, 'settingsInactive'),
    referralLine,
  ];

  await ctx.reply(lines.join('\n'));
}
