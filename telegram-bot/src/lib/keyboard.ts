import { InlineKeyboard, Keyboard } from 'grammy';
import { Language, t } from './i18n';
import { getBotUsername } from './botInfo';

export function buildKeyboard(language: Language): Keyboard {
  return new Keyboard().text(t(language, 'dailyButton')).resized().persistent();
}

export function buildShareKeyboard(language: Language): InlineKeyboard {
  const url = encodeURIComponent(`https://t.me/${getBotUsername()}`);
  const text = encodeURIComponent(t(language, 'shareText'));
  const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
  return new InlineKeyboard().url(t(language, 'shareButton'), shareUrl);
}
