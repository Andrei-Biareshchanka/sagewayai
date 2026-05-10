type Lang = 'en' | 'ru';

interface EmailTemplateParams {
  title: string;
  content: string;
  moral: string;
  categoryName: string;
  readTime: number;
  parableUrl: string;
  manageUrl: string;
  lang: Lang;
}

const i18n = {
  en: {
    badge:       'Parable of the day',
    readTime:    (n: number) => `${n} min read`,
    readFull:    'Read full parable',
    footer:      "You're receiving this because you subscribed to Sageway daily parables.",
    manage:      'Manage subscription',
    unsubscribe: 'Unsubscribe',
  },
  ru: {
    badge:       'Притча дня',
    readTime:    (n: number) => `${n} мин чтения`,
    readFull:    'Читать полностью',
    footer:      'Вы получаете это письмо, потому что подписались на ежедневные притчи Sageway.',
    manage:      'Управление подпиской',
    unsubscribe: 'Отписаться',
  },
} as const;

export function buildDailyParableEmail(params: EmailTemplateParams): string {
  const { title, content, moral, categoryName, readTime, parableUrl, manageUrl, lang } = params;
  const t = i18n[lang];
  const excerpt = content.length > 300 ? content.slice(0, 300).trimEnd() + '…' : content;
  const unsubscribeUrl = `${manageUrl}&action=unsubscribe`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAFAF8;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <a href="${parableUrl}" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTIiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMjQgOEMyNCA4IDE0IDE2IDE0IDI2QzE0IDMxLjUgMTguNSAzNiAyNCAzNkMyOS41IDM2IDM0IDMxLjUgMzQgMjZDMzQgMTYgMjQgOCAyNCA4WiIgZmlsbD0iIzZCOEY3MSIvPjxwYXRoIGQ9Ik0yNCAyMEMyNCAyMCAxOSAyNCAxOSAyOEMxOSAzMC44IDIxLjIgMzMgMjQgMzNDMjYuOCAzMyAyOSAzMC44IDI5IDI4QzI5IDI0IDI0IDIwIDI0IDIwWiIgZmlsbD0iI0YwRjRGMCIvPjwvc3ZnPg=="
                  width="28"
                  height="28"
                  alt=""
                  style="display:inline-block;vertical-align:middle;"
                />
                <span style="font-family:'Georgia',serif;font-size:20px;font-weight:600;color:#1A1A1A;vertical-align:middle;">
                  Sage<span style="color:#6B8F71;">way</span>
                </span>
              </a>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding-bottom:16px;">
              <span style="display:inline-block;background-color:#6B8F71;color:#ffffff;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.5px;text-transform:uppercase;padding:4px 12px;border-radius:100px;">
                ${t.badge}
              </span>
              <span style="font-family:'Inter',sans-serif;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;margin-left:10px;">
                ${categoryName}
              </span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:600;line-height:1.3;color:#1A1A1A;">
                ${title}
              </h1>
            </td>
          </tr>

          <!-- Content excerpt -->
          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:16px;line-height:1.8;color:#3D3D3D;">
                ${excerpt}
              </p>
            </td>
          </tr>

          <!-- Moral -->
          <tr>
            <td style="padding-bottom:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-left:3px solid #6B8F71;background-color:#F0F4F0;padding:16px 20px;border-radius:0 6px 6px 0;">
                    <p style="margin:0;font-family:'Georgia',serif;font-size:15px;font-style:italic;color:#3D6142;">
                      «${moral}»
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Read time + CTA -->
          <tr>
            <td style="padding-bottom:40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:20px;vertical-align:middle;">
                    <span style="font-family:'Inter',sans-serif;font-size:13px;color:#6B7280;">
                      ${t.readTime(readTime)}
                    </span>
                  </td>
                  <td style="vertical-align:middle;">
                    <a href="${parableUrl}" style="display:inline-block;border:1px solid #6B8F71;color:#6B8F71;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;padding:8px 22px;border-radius:100px;text-decoration:none;">
                      ${t.readFull}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid rgba(0,0,0,0.08);padding-top:24px;padding-bottom:8px;">
              <p style="margin:0;font-family:'Inter',sans-serif;font-size:12px;color:#9CA3AF;line-height:1.6;">
                ${t.footer}<br/>
                <a href="${manageUrl}" style="color:#6B7280;text-decoration:underline;">${t.manage}</a>
                &nbsp;·&nbsp;
                <a href="${unsubscribeUrl}" style="color:#6B7280;text-decoration:underline;">${t.unsubscribe}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
