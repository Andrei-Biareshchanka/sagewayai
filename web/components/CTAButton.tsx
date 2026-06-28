const BOT_URL = process.env.NEXT_PUBLIC_BOT_URL ?? 'https://t.me/sagewayai_bot';

export function CTAButton() {
  return (
    <a
      href={BOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-sage hover:bg-sage-dark text-white font-sans font-medium rounded-card px-6 py-3.5 transition-colors"
    >
      <TelegramIcon />
      Получать каждый день в Telegram
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z" />
    </svg>
  );
}
