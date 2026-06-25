export type Language = "en" | "ru";

const translations = {
  en: {
    welcome: "Welcome to SagewayAI 🌿\n\nA daily digest: quote · parable · reflection.",
    dailyButton: "📖 Daily digest",
    subscribeButton: "🔔 Subscribe",
    unsubscribeButton: "🔕 Unsubscribe",
    alreadySubscribed:
      "You are already subscribed. You will receive a daily digest every morning.",
    subscribed:
      "Subscribed! You will receive a daily digest every morning at 8:00. 🌿",
    notSubscribed: "You are not subscribed.",
    unsubscribed: "Unsubscribed. You will no longer receive the daily digest.",
    dailyError: "Could not load today's wisdom. Please try again later.",
    chooseLanguage: "Choose your language:",
    languageSet: "Language set to English 🇬🇧",
    revealHint: "👆 Tap the blurred text below to reveal the wisdom",
  },
  ru: {
    welcome:
      "Добро пожаловать в SagewayAI 🌿\n\nЕжедневный дайджест: цитата · притча · вывод.",
    dailyButton: "📖 Дайджест дня",
    subscribeButton: "🔔 Подписаться",
    unsubscribeButton: "🔕 Отписаться",
    alreadySubscribed:
      "Вы уже подписаны. Вы будете получать дайджест каждое утро.",
    subscribed:
      "Подписка оформлена! Вы будете получать дайджест каждое утро в 8:00. 🌿",
    notSubscribed: "Вы не подписаны.",
    unsubscribed: "Подписка отменена. Вы больше не будете получать дайджест.",
    dailyError: "Не удалось загрузить мудрость дня. Попробуйте позже.",
    chooseLanguage: "Выберите язык:",
    languageSet: "Язык изменён на русский 🇷🇺",
    revealHint: "👆 Нажмите на размытый текст ниже, чтобы открыть вывод",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(language: Language, key: TranslationKey): string {
  return translations[language][key];
}

export function isSupportedLanguage(
  value: string | null | undefined,
): value is Language {
  return value === "en" || value === "ru";
}

export function detectLanguage(languageCode: string | undefined): Language {
  return languageCode?.toLowerCase().startsWith("ru") ? "ru" : "en";
}
