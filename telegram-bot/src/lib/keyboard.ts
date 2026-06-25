import { Keyboard } from 'grammy';
import { Language, t } from './i18n';

export function buildKeyboard(language: Language): Keyboard {
  return new Keyboard().text(t(language, 'dailyButton')).resized().persistent();
}
