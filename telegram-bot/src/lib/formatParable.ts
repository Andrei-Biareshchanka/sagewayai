import { Parable } from '@prisma/client';
import { Language } from './i18n';

type LocalizedParable = Pick<Parable, 'title' | 'content' | 'source' | 'titleRu' | 'contentRu'>;

export function formatParable(parable: LocalizedParable, language: Language): string {
  const title = language === 'ru' && parable.titleRu ? parable.titleRu : parable.title;
  const content = language === 'ru' && parable.contentRu ? parable.contentRu : parable.content;

  const lines: string[] = [
    `📖 *${escapeMarkdown(title)}*`,
    '',
    escapeMarkdown(content),
  ];

  if (parable.source) {
    lines.push('', `_— ${escapeMarkdown(parable.source)}_`);
  }

  return lines.join('\n');
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}
