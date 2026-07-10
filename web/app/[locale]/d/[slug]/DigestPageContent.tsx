'use client';

import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { CTABlock } from '@/components/CTABlock';
import { DigestBlock } from '@/components/DigestBlock';

interface BilingualDigest {
  slug: string;
  date: Date;
  imageUrl: string | null;
  titleRu: string;
  titleEn: string;
  quote: { textRu: string; textEn: string; authorRu: string; authorEn: string };
  parable: { titleRu: string; titleEn: string; contentRu: string; contentEn: string };
  conclusionRu: string;
  conclusionEn: string;
  questionRu: string;
  questionEn: string;
  category: { name: string; nameRu: string | null; slug: string };
}

interface RelatedDigest {
  date: Date;
  parableTitleRu: string;
  parableTitleEn: string;
  slug: string;
}

interface DigestPageContentProps {
  digest: BilingualDigest;
  related: RelatedDigest[];
}

export function DigestPageContent({ digest, related }: DigestPageContentProps) {
  const { lang } = useLanguage();

  const digestTitle = lang === 'ru' ? digest.titleRu : digest.titleEn;
  const quoteText = lang === 'ru' ? digest.quote.textRu : digest.quote.textEn;
  const quoteAuthor = lang === 'ru' ? digest.quote.authorRu : digest.quote.authorEn;
  const parableTitle = lang === 'ru' ? digest.parable.titleRu : digest.parable.titleEn;
  const parableContent = lang === 'ru' ? digest.parable.contentRu : digest.parable.contentEn;
  const conclusion = lang === 'ru' ? digest.conclusionRu : digest.conclusionEn;
  const question = lang === 'ru' ? digest.questionRu : digest.questionEn;
  const dateLocale = lang === 'ru' ? ru : enUS;

  return (
    <div className="space-y-8">
      <nav className="font-sans text-sm text-muted flex items-center gap-1.5">
        <Link href={`/${lang}`} className="hover:text-ink transition-colors">
          {lang === 'ru' ? 'Главная' : 'Home'}
        </Link>
        <span>/</span>
        <span>{lang === 'ru' ? 'Дайджест дня' : 'Daily Digest'}</span>
      </nav>

      <DigestBlock
        title={digestTitle}
        data={{
          quote: { text: quoteText, author: quoteAuthor },
          parable: { title: parableTitle, content: parableContent },
          conclusion,
          question,
        }}
        date={digest.date}
        category={digest.category}
        imageUrl={digest.imageUrl ?? undefined}
        shareUrl={`${SITE_URL}/${lang}/d/${digest.slug}?utm_source=share&utm_medium=social`}
        shareTitle={digestTitle}
      />

      {related.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {lang === 'ru' ? 'Другие дайджесты' : 'Other digests'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/d/${item.slug}`}
                className="block bg-white border border-[var(--color-border)] rounded-card p-4 hover:border-sage transition-colors space-y-1"
              >
                <p className="font-serif text-sm font-medium text-ink line-clamp-2">
                  {lang === 'ru' ? item.parableTitleRu : item.parableTitleEn}
                </p>
                <p className="font-sans text-xs text-muted">
                  {format(item.date, 'd MMM yyyy', { locale: dateLocale })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTABlock source="digest_cta" />
    </div>
  );
}
