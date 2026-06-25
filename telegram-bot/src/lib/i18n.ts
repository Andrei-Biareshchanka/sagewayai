export type Language = "en" | "ru";

const translations = {
  en: {
    welcome: "Welcome to SagewayAI 🌿\n\nA daily parable that resonates.",
    dailyButton: "📖 Daily parable",
    subscribeButton: "🔔 Subscribe",
    unsubscribeButton: "🔕 Unsubscribe",
    alreadySubscribed:
      "You are already subscribed. You will receive a daily parable every morning.",
    subscribed:
      "Subscribed! You will receive a daily parable every morning at 8:00. 🌿",
    notSubscribed: "You are not subscribed.",
    unsubscribed: "Unsubscribed. You will no longer receive daily parables.",
    dailyError: "Could not load today's wisdom. Please try again later.",
    chooseLanguage: "Choose your language:",
    languageSet: "Language set to English 🇬🇧",
    revealButton: "💡 Show wise conclusion",
  },
  ru: {
    welcome:
      "Добро пожаловать в SagewayAI 🌿\n\nЕжедневная притча, которая откликается.",
    dailyButton: "📖 Притча дня",
    subscribeButton: "🔔 Подписаться",
    unsubscribeButton: "🔕 Отписаться",
    alreadySubscribed:
      "Вы уже подписаны. Вы будете получать притчу каждое утро.",
    subscribed:
      "Подписка оформлена! Вы будете получать притчу каждое утро в 8:00. 🌿",
    notSubscribed: "Вы не подписаны.",
    unsubscribed: "Подписка отменена. Вы больше не будете получать притчи.",
    dailyError: "Не удалось загрузить мудрость дня. Попробуйте позже.",
    chooseLanguage: "Выберите язык:",
    languageSet: "Язык изменён на русский 🇷🇺",
    revealButton: "💡 Показать вывод",
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
