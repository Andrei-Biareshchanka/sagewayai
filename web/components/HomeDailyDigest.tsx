'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { useLocalizedDigest, type BilingualDigestContent } from '@/hooks/useLocalizedDigest';
import { DigestBlock, type DigestCategory } from './DigestBlock';

interface BilingualDailyData extends BilingualDigestContent {
  date: Date;
  category: DigestCategory;
  parableCanonicalSlug: string | null;
}

interface HomeDailyDigestProps {
  data: BilingualDailyData;
}

// Shares the parable's canonical page rather than the digest's. Digests created after the
// archive was frozen carry no slug and so have no page of their own — keying the share URL
// on the digest slug (as this did) would silently drop the button on every new day.
function buildShareUrl(parableCanonicalSlug: string | null, lang: string): string | undefined {
  if (!parableCanonicalSlug) return undefined;
  return `${SITE_URL}/${lang}/pritcha/${parableCanonicalSlug}?utm_source=share&utm_medium=social`;
}

export function HomeDailyDigest({ data }: HomeDailyDigestProps) {
  const { lang } = useLanguage();
  const { title, imageAlt, data: digestData } = useLocalizedDigest(data, lang);

  return (
    <DigestBlock
      title={title}
      data={digestData}
      date={data.date}
      category={data.category}
      imageUrl={data.imageUrl ?? undefined}
      imageAlt={imageAlt}
      priority
      shareUrl={buildShareUrl(data.parableCanonicalSlug, lang)}
      shareTitle={title}
      parableCanonicalSlug={data.parableCanonicalSlug}
    />
  );
}
