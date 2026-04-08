import { Resend } from 'resend';

import { buildDailyParableEmail } from './emailTemplate';

const resend = new Resend(process.env['RESEND_API_KEY']);

const CLIENT_URL = process.env['CLIENT_URL'] ?? 'http://localhost:5173';
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
  const { to, parable, categoryName, unsubscribeToken } = params;

  const parableUrl = `${CLIENT_URL}/parables/${parable.id}`;
  const unsubscribeUrl = `${CLIENT_URL.replace('5173', '3001')}/api/subscribe/unsubscribe/${unsubscribeToken}`;

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
