export type Language = "en" | "ru";

const translations = {
  en: {
    welcome: "Welcome to SagewayAI 🌿\n\nA daily digest: quote · parable · reflection.",
    dailyButton: "📖 Daily digest",
    alreadySubscribed:
      "You are already subscribed. You will receive a daily digest every day.",
    subscribed:
      "Subscribed! You will receive a daily digest every day. 🌿",
    notSubscribed: "You are not subscribed.",
    unsubscribed: "Unsubscribed. You will no longer receive the daily digest.",
    dailyError: "Could not load today's wisdom. Please try again later.",
    chooseLanguage: "Choose your language:",
    languageSet: "Language set to English 🇬🇧",
    revealHint: "👇 Tap the blurred text to reveal the reflection",
    labelReflection: "💡 Reflection",
    labelQuestion: "❓ Question",
    cmdDigest: "Daily digest: quote · parable · reflection",
    cmdLanguage: "Change language 🇬🇧 🇷🇺",
    cmdSubscribe: "Receive daily digest every day",
    cmdUnsubscribe: "Stop daily digest",
    cmdSettings: "Your settings",
    cmdHelp: "Show all commands",
    onboardChooseLang: "Choose your language to get started:",
    onboardSubscribeOffer: "Want to receive a daily digest every day? 🌿",
    onboardSubscribeYes: "✅ Subscribe",
    onboardSubscribeLater: "Later",
    settingsTitle: "⚙️ Settings",
    settingsLang: "🌐 Language: English 🇬🇧",
    settingsActive: "📬 Daily digest: active ✅",
    settingsInactive: "📬 Daily digest: not subscribed",
  },
  ru: {
    welcome:
      "Добро пожаловать в SagewayAI 🌿\n\nЕжедневный дайджест: цитата · притча · вывод.",
    dailyButton: "📖 Дайджест дня",
    alreadySubscribed:
      "Вы уже подписаны. Вы будете получать дайджест ежедневно.",
    subscribed:
      "Подписка оформлена! Вы будете получать дайджест ежедневно. 🌿",
    notSubscribed: "Вы не подписаны.",
    unsubscribed: "Подписка отменена. Вы больше не будете получать дайджест.",
    dailyError: "Не удалось загрузить мудрость дня. Попробуйте позже.",
    chooseLanguage: "Выберите язык:",
    languageSet: "Язык изменён на русский 🇷🇺",
    revealHint: "👇 Нажмите на размытый текст, чтобы открыть вывод",
    labelReflection: "💡 Вывод",
    labelQuestion: "❓ Вопрос",
    cmdDigest: "Дайджест дня: цитата · притча · вывод",
    cmdLanguage: "Изменить язык 🇬🇧 🇷🇺",
    cmdSubscribe: "Получать дайджест ежедневно",
    cmdUnsubscribe: "Остановить ежедневный дайджест",
    cmdSettings: "Настройки",
    cmdHelp: "Показать все команды",
    onboardChooseLang: "Выберите язык для начала:",
    onboardSubscribeOffer: "Хотите получать дайджест ежедневно? 🌿",
    onboardSubscribeYes: "✅ Подписаться",
    onboardSubscribeLater: "Позже",
    settingsTitle: "⚙️ Настройки",
    settingsLang: "🌐 Язык: Русский 🇷🇺",
    settingsActive: "📬 Дайджест: подписан ✅",
    settingsInactive: "📬 Дайджест: не подписан",
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
