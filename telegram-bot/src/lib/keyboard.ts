import { InlineKeyboard, Keyboard } from 'grammy';
import { Digest } from './digestApi';
import { Language, t } from './i18n';
import { getBotUsername } from './botInfo';

export function buildKeyboard(language: Language): Keyboard {
  return new Keyboard()
    .text(t(language, 'dailyButton'))
    .text(t(language, 'situationButton'))
    .resized()
    .persistent();
}

export function buildShareKeyboard(language: Language, digest: Digest): InlineKeyboard {
  const shareText = [
    `💬 "${digest.quote.text}"`,
    `— ${digest.quote.author}`,
    '',
    `📖 ${digest.parable.title}`,
    digest.parable.content,
    '',
    `❓ ${digest.question}`,
    '',
    t(language, 'shareTagline'),
  ].join('\n');

  const url = encodeURIComponent(`https://t.me/${getBotUsername()}`);
  const text = encodeURIComponent(shareText);
  const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
  return new InlineKeyboard().url(t(language, 'shareButton'), shareUrl);
}
