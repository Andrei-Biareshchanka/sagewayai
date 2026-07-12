'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { pickLocalized } from '@/lib/locale-content';
import { DigestBlock, type DigestCategory } from './DigestBlock';

interface BilingualDailyData {
  slug: string | null;
  date: Date;
  titleRu: string;
  titleEn: string;
  quote: { textRu: string; authorRu: string; textEn: string; authorEn: string };
  parable: { titleRu: string; contentRu: string; titleEn: string; contentEn: string };
  conclusionRu: string;
  conclusionEn: string;
  questionRu: string;
  questionEn: string;
  category: DigestCategory;
}

interface HomeDailyDigestProps {
  data: BilingualDailyData;
}

export function HomeDailyDigest({ data }: HomeDailyDigestProps) {
  const { lang } = useLanguage();
  const title = pickLocalized(data.titleRu, data.titleEn, lang);

  return (
    <DigestBlock
      title={title}
      data={{
        quote: {
          text: pickLocalized(data.quote.textRu, data.quote.textEn, lang),
          author: pickLocalized(data.quote.authorRu, data.quote.authorEn, lang),
        },
        parable: {
          title: pickLocalized(data.parable.titleRu, data.parable.titleEn, lang),
          content: pickLocalized(data.parable.contentRu, data.parable.contentEn, lang),
        },
        conclusion: pickLocalized(data.conclusionRu, data.conclusionEn, lang),
        question: pickLocalized(data.questionRu, data.questionEn, lang),
      }}
      date={data.date}
      category={data.category}
      shareUrl={data.slug ? `${SITE_URL}/${lang}/d/${data.slug}?utm_source=share&utm_medium=social` : undefined}
      shareTitle={title}
    />
  );
}
