import { Keyboard } from 'grammy';
import { Language, t } from './i18n';

export function buildKeyboard(subscribed: boolean, language: Language): Keyboard {
  const keyboard = new Keyboard().text(t(language, 'dailyButton')).row();
  keyboard.text(subscribed ? t(language, 'unsubscribeButton') : t(language, 'subscribeButton'));

  return keyboard.resized().persistent();
}
