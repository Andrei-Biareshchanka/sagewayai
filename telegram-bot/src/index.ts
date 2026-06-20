import 'dotenv/config';
import { Bot } from 'grammy';
import { handleStart } from './commands/start';
import { handleDaily } from './commands/daily';

const token = process.env['TELEGRAM_BOT_TOKEN'];
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables.');
}

const bot = new Bot(token);

bot.command('start', handleStart);
bot.command('help', handleStart);
bot.command('daily', handleDaily);

bot.catch((err) => {
  process.stderr.write(`Bot error: ${err}\n`);
});

bot.start();
process.stdout.write('SagewayAI bot is running...\n');
