import "dotenv/config";
import { Bot } from "grammy";
import { handleDaily } from "./commands/daily";
import {
  handleLanguageCallback,
  handleLanguageCommand,
} from "./commands/language";
import { handleOnboardLang, handleOnboardSub } from "./commands/onboarding";
import { handleSettings } from "./commands/settings";
import { handleStart } from "./commands/start";
import { handleSubscribe, handleUnsubscribe } from "./commands/subscribe";
import { broadcastDailyParable } from "./lib/broadcast";
import { setBotUsername } from "./lib/botInfo";

const token = process.env["TELEGRAM_BOT_TOKEN"];
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables.");
}

const bot = new Bot(token);

bot.command("digest", handleDaily);
bot.command("start", handleStart);
bot.command("help", handleStart);
bot.command("settings", handleSettings);
bot.command("subscribe", handleSubscribe);
bot.command("unsubscribe", handleUnsubscribe);
bot.command("language", handleLanguageCommand);

bot.callbackQuery(/^lang:(en|ru)$/, handleLanguageCallback);
bot.callbackQuery(/^onboard_lang:(en|ru)$/, handleOnboardLang);
bot.callbackQuery(/^onboard_sub:(yes|skip)$/, handleOnboardSub);

bot.hears(/^📖/, handleDaily);

bot.catch((err) => {
  process.stderr.write(`Bot error: ${err}\n`);
});

scheduleDailyBroadcast(bot);

bot.api.setMyCommands([
  { command: "digest", description: "Daily digest: quote · parable · reflection" },
  { command: "settings", description: "Your settings" },
  { command: "language", description: "Change language 🇬🇧 🇷🇺" },
  { command: "subscribe", description: "Receive daily digest every day" },
  { command: "unsubscribe", description: "Stop daily digest" },
  { command: "help", description: "Show all commands" },
]);

bot.api.setMyCommands(
  [
    { command: "digest", description: "Дайджест дня: цитата · притча · вывод" },
    { command: "settings", description: "Настройки" },
    { command: "language", description: "Изменить язык 🇬🇧 🇷🇺" },
    { command: "subscribe", description: "Получать дайджест ежедневно" },
    { command: "unsubscribe", description: "Остановить ежедневный дайджест" },
    { command: "help", description: "Показать все команды" },
  ],
  { language_code: "ru" },
);

bot.init().then(() => {
  setBotUsername(bot.botInfo.username);
  bot.start();
  process.stdout.write("SagewayAI bot is running...\n");
});

function scheduleDailyBroadcast(bot: Bot): void {
  const now = new Date();
  const next8am = new Date();
  next8am.setHours(8, 0, 0, 0);
  if (now >= next8am) next8am.setDate(next8am.getDate() + 1);

  const msUntil8am = next8am.getTime() - now.getTime();

  setTimeout(() => {
    broadcastDailyParable(bot);
    setInterval(() => broadcastDailyParable(bot), 24 * 60 * 60 * 1000);
  }, msUntil8am);
}
