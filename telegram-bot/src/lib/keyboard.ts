import { Keyboard } from 'grammy';
import { Digest } from './digestApi';
import { Language, t } from './i18n';
import { getBotUsername } from './botInfo';

export function buildKeyboard(language: Language): Keyboard {
  return new Keyboard()
    .text(t(language, 'situationButton'))
    .resized()
    .persistent();
}

export function buildShareUrl(language: Language, digest: Digest, chatId?: number): string {
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

  const botLink = chatId
    ? `https://t.me/${getBotUsername()}?start=ref_${chatId}`
    : `https://t.me/${getBotUsername()}`;

  return `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent(shareText)}`;
}
