import "dotenv/config";
import { Bot } from "grammy";
import { handleDaily } from "./commands/daily";
import {
  handleLanguageCallback,
  handleLanguageCommand,
} from "./commands/language";
import { handleStart } from "./commands/start";
import { handleSubscribe, handleUnsubscribe } from "./commands/subscribe";
import { broadcastDailyParable } from "./lib/broadcast";

const token = process.env["TELEGRAM_BOT_TOKEN"];
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables.");
}

const bot = new Bot(token);

bot.command("start", handleStart);
bot.command("help", handleStart);
bot.command("daily", handleDaily);
bot.command("subscribe", handleSubscribe);
bot.command("unsubscribe", handleUnsubscribe);
bot.command("language", handleLanguageCommand);

bot.callbackQuery(/^lang:(en|ru)$/, handleLanguageCallback);

bot.hears(/^📖/, handleDaily);
bot.hears(/^🔔/, handleSubscribe);
bot.hears(/^🔕/, handleUnsubscribe);

bot.catch((err) => {
  process.stderr.write(`Bot error: ${err}\n`);
});

scheduleDailyBroadcast(bot);

bot.api.setMyCommands([
  { command: "daily", description: "Today's parable" },
  {
    command: "subscribe",
    description: "Receive a parable every morning at 8:00",
  },
  { command: "unsubscribe", description: "Stop daily parables" },
  { command: "language", description: "Change language" },
  { command: "help", description: "Show all commands" },
]);

bot.api.setMyCommands(
  [
    { command: "daily", description: "Притча дня" },
    { command: "subscribe", description: "Получать притчу каждое утро в 8:00" },
    { command: "unsubscribe", description: "Остановить ежедневные притчи" },
    { command: "language", description: "Изменить язык" },
    { command: "help", description: "Показать все команды" },
  ],
  { language_code: "ru" },
);

bot.start();
process.stdout.write("SagewayAI bot is running...\n");

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
