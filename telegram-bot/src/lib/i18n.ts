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
    shareButton: "🔗 Share",
    shareTagline: "SagewayAI — daily parables and wisdom",
    cmdDigest: "Daily digest: quote · parable · reflection",
    cmdLanguage: "Change language 🇬🇧 🇷🇺",
    cmdSubscribe: "Receive daily digest every day",
    cmdUnsubscribe: "Stop daily digest",
    cmdSettings: "Your settings",
    cmdHelp: "Show all commands",
    helpText: "🌿 *SagewayAI Bot*\n\nDaily digest: quote · parable · reflection · question\n\n/digest \\— read today's digest\n/subscribe \\— receive it every day\n/unsubscribe \\— stop daily delivery\n/settings \\— your language and subscription\n/language \\— change language 🇬🇧 🇷🇺",
    onboardChooseLang: "Choose your language to get started:",
    onboardSubscribeOffer: "🌿 SagewayAI — daily wisdom\n\nEvery day I send you:\n💬 A timeless quote\n📖 A parable that resonates with it\n💡 A reflection — hidden, tap to reveal\n❓ A question to sit with\n\nWant to receive this every day?",
    onboardSubscribeYes: "✅ Subscribe",
    onboardSubscribeLater: "Later",
    onboardDone: "Done\\! Here's your first digest 👇\n\n📖 Daily digest — the same for everyone\\.\n🎯 *For my situation* — tailored to what you're personally going through right now\\.",
    onboardLater: "No problem 🌿 Tap /digest anytime to read today's digest\\.",
    settingsTitle: "⚙️ Settings",
    settingsLang: "🌐 Language: English 🇬🇧",
    settingsActive: "📬 Daily digest: active ✅",
    settingsInactive: "📬 Daily digest: not subscribed",
    situationButton: "🎯 For my situation",
    situationPrompt: "Describe your situation — I'll find a quote, parable and reflection tailored to it.\n\nFor example:\n· had a fight with someone close\n· can't bring myself to take an important step\n· burned out and don't know where to go\n\nType it and press Send.\n\n(1 request per day, up to 800 characters)",
    situationLoading: "Searching for wisdom for your situation...",
    situationError: "Could not find wisdom for your situation. Please try again later.",
    situationRateLimitPrefix: "⏳ Next request available in",
    situationTooShort: "Too short ({current} chars). Write at least {min} characters.",
    situationTooLong: "Too long ({current} chars). Shorten to {max} characters or less.",
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
    shareButton: "🔗 Поделиться",
    shareTagline: "SagewayAI — ежедневные притчи и мудрость",
    cmdDigest: "Дайджест дня: цитата · притча · вывод",
    cmdLanguage: "Изменить язык 🇬🇧 🇷🇺",
    cmdSubscribe: "Получать дайджест ежедневно",
    cmdUnsubscribe: "Остановить ежедневный дайджест",
    cmdSettings: "Настройки",
    cmdHelp: "Показать все команды",
    helpText: "🌿 *SagewayAI Бот*\n\nЕжедневный дайджест: цитата · притча · вывод · вопрос\n\n/digest \\— открыть сегодняшний дайджест\n/subscribe \\— получать его каждый день\n/unsubscribe \\— отменить подписку\n/settings \\— язык и статус подписки\n/language \\— изменить язык 🇬🇧 🇷🇺",
    onboardChooseLang: "Выберите язык для начала:",
    onboardSubscribeOffer: "🌿 SagewayAI — ежедневная мудрость\n\nКаждый день я присылаю:\n💬 Цитату великого мыслителя\n📖 Притчу которая с ней резонирует\n💡 Вывод — скрыт, открывается по нажатию\n❓ Вопрос для размышления\n\nХочешь получать это каждый день?",
    onboardSubscribeYes: "✅ Подписаться",
    onboardSubscribeLater: "Позже",
    onboardDone: "Готово\\! Первый дайджест уже здесь 👇\n\n📖 Дайджест дня — одинаковый для всех\\.\n🎯 *Под мою ситуацию* — подбирается под то, что происходит лично у тебя прямо сейчас\\.",
    onboardLater: "Хорошо 🌿 Нажми /digest чтобы получить сегодняшний дайджест\\.",
    settingsTitle: "⚙️ Настройки",
    settingsLang: "🌐 Язык: Русский 🇷🇺",
    settingsActive: "📬 Дайджест: подписан ✅",
    settingsInactive: "📬 Дайджест: не подписан",
    situationButton: "🎯 Под мою ситуацию",
    situationPrompt: "Опиши свою ситуацию — я подберу цитату, притчу и вывод именно для неё.\n\nНапример:\n· поссорился с близким человеком\n· не могу решиться на важный шаг\n· выгорел и не понимаю куда двигаться\n\nНапечатай и нажми Отправить.\n\n(1 запрос в день, до 800 символов)",
    situationLoading: "Ищу мудрость для твоей ситуации...",
    situationError: "Не удалось найти мудрость для твоей ситуации. Попробуй позже.",
    situationRateLimitPrefix: "⏳ Следующий запрос будет доступен через",
    situationTooShort: "Слишком коротко ({current} симв.). Напиши хотя бы {min} символов.",
    situationTooLong: "Слишком длинно ({current} симв.). Сократи до {max} символов.",
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
