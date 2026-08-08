'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { shimmerBlurDataUrl } from '@/lib/imagePlaceholder';
import {
  useLocalizedSituation,
  type BilingualSituationContent,
} from '@/hooks/useLocalizedSituation';

interface SituationPageContentProps {
  situation: BilingualSituationContent;
}

export function SituationPageContent({ situation }: SituationPageContentProps) {
  const { lang, setAlternateSlugs } = useLanguage();
  const { h1, intro, parables } = useLocalizedSituation(situation, lang);

  // RU and EN slugs differ per situation (the slug is the keyword being
  // targeted, same reasoning as ParablePageContent), so the header toggle
  // needs this page's sibling slug registered.
  useEffect(() => {
    setAlternateSlugs({ ru: situation.slugRu, en: situation.slugEn });
    return () => setAlternateSlugs(null);
  }, [situation.slugRu, situation.slugEn, setAlternateSlugs]);

  return (
    <div className="space-y-8">
      <div className="space-y-6 border border-sage-pill rounded-2xl p-6 md:p-8 bg-amber-light">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink">{h1}</h1>
        <p className="font-serif text-base leading-[1.8] text-ink whitespace-pre-line">{intro}</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-lg font-semibold text-ink">
          {t(lang, 'situaciiParablesHeading')}
        </h2>
        <div className="space-y-4">
          {parables.map((p) => (
            <Link
              key={p.slug}
              href={`/${lang}/pritcha/${p.slug}`}
              className="block bg-white border border-[var(--color-border)] rounded-card p-4 md:p-5 hover:border-sage transition-colors"
            >
              <div className="flex gap-4">
                {p.imageUrl && (
                  <Image
                    src={p.imageUrl}
                    alt={p.imageAlt ?? p.title}
                    width={80}
                    height={80}
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl(80, 80)}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="space-y-1.5">
                  <p className="font-serif text-base font-medium text-ink">{p.title}</p>
                  {p.note && <p className="font-sans text-sm text-muted leading-relaxed">{p.note}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
