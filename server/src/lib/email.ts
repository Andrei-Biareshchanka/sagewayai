import { Resend } from 'resend';

import { buildDailyParableEmail } from './emailTemplate';

const CLIENT_URL = process.env['CLIENT_URL'] ?? 'http://localhost:5173';
const FROM_EMAIL = process.env['FROM_EMAIL'] ?? 'onboarding@resend.dev';

type Lang = 'en' | 'ru';

interface SendDailyParableParams {
  to: string;
  parable: {
    id: string;
    title: string;
    content: string;
    moral: string;
    readTime: number;
  };
  categoryName: string;
  unsubscribeToken: string;
  lang: Lang;
}

const subjectByLang: Record<Lang, (title: string) => string> = {
  en: (title) => `Today's parable: ${title}`,
  ru: (title) => `Притча дня: ${title}`,
};

export async function sendDailyParableEmail(params: SendDailyParableParams): Promise<void> {
  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set, skipping email send');
    return;
  }

  const resend = new Resend(apiKey);
  const { to, parable, categoryName, unsubscribeToken, lang } = params;

  const parableUrl = `${CLIENT_URL}/parables/${parable.id}`;
  const manageUrl = `${CLIENT_URL}/subscription/manage?token=${unsubscribeToken}`;

  const html = buildDailyParableEmail({
    title: parable.title,
    content: parable.content,
    moral: parable.moral,
    categoryName,
    readTime: parable.readTime,
    parableUrl,
    manageUrl,
    lang,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: subjectByLang[lang](parable.title),
    html,
  });
}
