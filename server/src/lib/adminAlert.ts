// Sends a plain-text alert to the admin's Telegram chat by calling the Bot API directly
// (no dependency on the telegram-bot process — server and telegram-bot are separate
// deployments). Reuses the same TELEGRAM_BOT_TOKEN and ADMIN_CHAT_ID values already
// configured for telegram-bot, not a second bot.
const TELEGRAM_BOT_TOKEN = process.env['TELEGRAM_BOT_TOKEN'];
const ADMIN_CHAT_ID = process.env['ADMIN_CHAT_ID'];

export async function notifyAdmin(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !ADMIN_CHAT_ID) return;

  // Best-effort — a failed alert should never take down the request that triggered it,
  // so a rejected fetch (network error, Telegram API outage) is swallowed rather than thrown.
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: message }),
    });
  } catch {
    // Intentionally silent — see comment above.
  }
}
