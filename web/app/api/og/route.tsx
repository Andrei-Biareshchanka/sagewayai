import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { buildOgImage } from '@/lib/og-image';

export const runtime = 'edge';

const ogParamsSchema = z.object({
  title: z.string().default('SagewayAI'),
  quote: z.string().default(''),
  author: z.string().default(''),
  lang: z.enum(['ru', 'en']).default('ru'),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = ogParamsSchema.safeParse(Object.fromEntries(searchParams));
  const params = parsed.success ? parsed.data : ogParamsSchema.parse({});

  const { element, fonts } = await buildOgImage(params);

  return new ImageResponse(element, { width: 1200, height: 630, fonts });
}
