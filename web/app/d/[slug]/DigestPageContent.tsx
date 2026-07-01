'use client';

import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { colors } from '@/lib/brand';
import { CTABlock } from '@/components/CTABlock';

interface BilingualDigest {
  date: Date;
  quote: { textRu: string; textEn: string; authorRu: string; authorEn: string };
  parable: { titleRu: string; titleEn: string; contentRu: string; contentEn: string };
  conclusionRu: string;
  conclusionEn: string;
  questionRu: string;
  questionEn: string;
  category: { name: string; slug: string };
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
        <Link href="/" className="hover:text-ink transition-colors">
          {lang === 'ru' ? 'Главная' : 'Home'}
        </Link>
        <span>/</span>
        <span>{lang === 'ru' ? 'Дайджест дня' : 'Daily Digest'}</span>
      </nav>

      <div className="flex items-center gap-3">
        <p className="font-sans text-sm text-muted">
          {format(digest.date, 'd MMMM yyyy', { locale: dateLocale })}
        </p>
        <Link
          href={`/digests?category=${digest.category.slug}`}
          className="font-sans text-xs font-medium text-sage-dark bg-sage-pill hover:bg-sage-pill-hover rounded-full px-2 py-0.5 transition-colors"
        >
          {digest.category.name}
        </Link>
      </div>

      <figure className="relative pl-12">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 font-serif text-[6rem] text-sage opacity-20 leading-none select-none"
        >
          &ldquo;
        </span>
        <blockquote className="font-serif italic text-2xl text-ink leading-relaxed">
          {quoteText}
        </blockquote>
        <figcaption className="font-sans text-sm text-muted text-right mt-3">
          — {quoteAuthor}
        </figcaption>
      </figure>

      <hr className="border-[var(--color-border)]" />

      <h1 className="font-serif text-2xl font-semibold text-ink">{parableTitle}</h1>

      <p className="font-serif text-lg text-ink" style={{ lineHeight: '1.9' }}>
        {parableContent}
      </p>

      <div
        className="bg-sage-light rounded-card p-6 space-y-2 border-l-4"
        style={{ borderLeftColor: colors.sage }}
      >
        <p className="font-sans text-sm font-medium text-sage">
          {lang === 'ru' ? '💡 Размышление' : '💡 Reflection'}
        </p>
        <p className="font-serif text-base text-ink">{conclusion}</p>
      </div>

      <div className="bg-sage-pill rounded-card p-6 space-y-2">
        <p className="font-sans text-sm font-medium text-sage-dark">
          {lang === 'ru' ? '❓ Вопрос' : '❓ Question'}
        </p>
        <p className="font-sans text-lg text-ink">{question}</p>
      </div>

      {related.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {lang === 'ru' ? 'Другие дайджесты' : 'Other digests'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/d/${item.slug}`}
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

      <CTABlock />
    </div>
  );
}
