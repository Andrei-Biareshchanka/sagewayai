'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { DigestBlock } from './DigestBlock';

interface BilingualDailyData {
  slug: string | null;
  titleRu: string;
  titleEn: string;
  quote: { textRu: string; authorRu: string; textEn: string; authorEn: string };
  parable: { titleRu: string; contentRu: string; titleEn: string; contentEn: string };
  conclusionRu: string;
  conclusionEn: string;
  questionRu: string;
  questionEn: string;
}

interface HomeDailyDigestProps {
  data: BilingualDailyData;
}

export function HomeDailyDigest({ data }: HomeDailyDigestProps) {
  const { lang } = useLanguage();
  const title = lang === 'ru' ? data.titleRu : data.titleEn;

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-ink">{title}</h1>
      <DigestBlock
        data={{
          quote: {
            text: lang === 'ru' ? data.quote.textRu : data.quote.textEn,
            author: lang === 'ru' ? data.quote.authorRu : data.quote.authorEn,
          },
          parable: {
            title: lang === 'ru' ? data.parable.titleRu : data.parable.titleEn,
            content: lang === 'ru' ? data.parable.contentRu : data.parable.contentEn,
          },
          conclusion: lang === 'ru' ? data.conclusionRu : data.conclusionEn,
          question: lang === 'ru' ? data.questionRu : data.questionEn,
        }}
        shareUrl={data.slug ? `${SITE_URL}/${lang}/d/${data.slug}?utm_source=share&utm_medium=social` : undefined}
        shareTitle={title}
      />
    </div>
  );
}
