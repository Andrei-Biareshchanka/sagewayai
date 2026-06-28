import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { colors } from '@/lib/brand';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'SagewayAI';
  const lang = searchParams.get('lang') ?? 'ru';
  const subtitle = lang === 'ru' ? 'Мудрость дня' : 'Daily Wisdom';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          backgroundColor: colors.sageLight,
          position: 'relative',
          padding: '60px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: colors.sage,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: colors.ink,
              fontWeight: 600,
              lineHeight: 1.3,
              maxWidth: '1000px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '20px', color: colors.sage, fontWeight: 600 }}>
              SagewayAI
            </div>
            <div style={{ fontSize: '16px', color: colors.muted }}>{subtitle}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
