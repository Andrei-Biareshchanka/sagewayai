'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { useLocalizedDigest, type BilingualDigestContent } from '@/hooks/useLocalizedDigest';
import { DigestBlock, type DigestCategory } from './DigestBlock';

interface BilingualDailyData extends BilingualDigestContent {
  slug: string | null;
  date: Date;
  category: DigestCategory;
  parableCanonicalSlug: string | null;
}

interface HomeDailyDigestProps {
  data: BilingualDailyData;
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
      shareUrl={data.slug ? `${SITE_URL}/${lang}/d/${data.slug}?utm_source=share&utm_medium=social` : undefined}
      shareTitle={title}
      parableCanonicalSlug={data.parableCanonicalSlug}
    />
  );
}
