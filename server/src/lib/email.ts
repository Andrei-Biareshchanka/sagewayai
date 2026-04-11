import { Resend } from 'resend';

import { buildDailyParableEmail } from './emailTemplate';

const CLIENT_URL = process.env['CLIENT_URL'] ?? 'http://localhost:5173';
const SERVER_URL = process.env['SERVER_URL'] ?? 'http://localhost:3001';
const FROM_EMAIL = process.env['FROM_EMAIL'] ?? 'onboarding@resend.dev';

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
}

export async function sendDailyParableEmail(params: SendDailyParableParams): Promise<void> {
  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set, skipping email send');
    return;
  }

  const resend = new Resend(apiKey);
  const { to, parable, categoryName, unsubscribeToken } = params;

  const parableUrl = `${CLIENT_URL}/parables/${parable.id}`;
  const unsubscribeUrl = `${SERVER_URL}/api/subscribe/unsubscribe/${unsubscribeToken}`;

  const html = buildDailyParableEmail({
    title: parable.title,
    content: parable.content,
    moral: parable.moral,
    categoryName,
    readTime: parable.readTime,
    parableUrl,
    unsubscribeUrl,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Today's parable: ${parable.title}`,
    html,
  });
}
