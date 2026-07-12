import { useMemo } from 'react';
import type { Lang } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import type { DigestData } from '@/components/DigestBlock';

export interface BilingualDigestContent {
  imageUrl: string | null;
  imageAltRu: string | null;
  imageAltEn: string | null;
  titleRu: string;
  titleEn: string;
  quote: { textRu: string; textEn: string; authorRu: string; authorEn: string };
  parable: { titleRu: string; titleEn: string; contentRu: string; contentEn: string };
  conclusionRu: string;
  conclusionEn: string;
  questionRu: string;
  questionEn: string;
}

export interface LocalizedDigest {
  title: string;
  imageAlt: string | undefined;
  data: DigestData;
}

export function useLocalizedDigest(digest: BilingualDigestContent, lang: Lang): LocalizedDigest {
  return useMemo(
    () => ({
      title: pickLocalized(digest.titleRu, digest.titleEn, lang),
      imageAlt: (lang === 'ru' ? digest.imageAltRu : digest.imageAltEn) ?? undefined,
      data: {
        quote: {
          text: pickLocalized(digest.quote.textRu, digest.quote.textEn, lang),
          author: pickLocalized(digest.quote.authorRu, digest.quote.authorEn, lang),
        },
        parable: {
          title: pickLocalized(digest.parable.titleRu, digest.parable.titleEn, lang),
          content: pickLocalized(digest.parable.contentRu, digest.parable.contentEn, lang),
        },
        conclusion: pickLocalized(digest.conclusionRu, digest.conclusionEn, lang),
        question: pickLocalized(digest.questionRu, digest.questionEn, lang),
      },
    }),
    [digest, lang],
  );
}
