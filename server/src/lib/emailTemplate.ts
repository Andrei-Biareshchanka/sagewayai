interface EmailTemplateParams {
  title: string;
  content: string;
  moral: string;
  categoryName: string;
  readTime: number;
  parableUrl: string;
  unsubscribeUrl: string;
}

export function buildDailyParableEmail(params: EmailTemplateParams): string {
  const { title, content, moral, categoryName, readTime, parableUrl, unsubscribeUrl } = params;

  const excerpt = content.length > 300 ? content.slice(0, 300).trimEnd() + '…' : content;

  return `<!DOCTYPE html>
<html lang="en">
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
              <a href="${parableUrl}" style="text-decoration:none;">
                <span style="font-family:'Georgia',serif;font-size:20px;font-weight:600;color:#1A1A1A;">
                  Sage<span style="color:#6B8F71;">way</span>
                </span>
              </a>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding-bottom:16px;">
              <span style="display:inline-block;background-color:#6B8F71;color:#ffffff;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.5px;text-transform:uppercase;padding:4px 12px;border-radius:100px;">
                Parable of the day
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
                      ${readTime} min read
                    </span>
                  </td>
                  <td style="vertical-align:middle;">
                    <a href="${parableUrl}" style="display:inline-block;border:1px solid #6B8F71;color:#6B8F71;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;padding:8px 22px;border-radius:100px;text-decoration:none;">
                      Read full parable
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
                You're receiving this because you subscribed to Sageway daily parables.<br/>
                <a href="${unsubscribeUrl}" style="color:#6B7280;text-decoration:underline;">Unsubscribe</a>
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
