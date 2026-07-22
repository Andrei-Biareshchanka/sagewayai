'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';
import { useLocalizedParable, type BilingualParableContent } from '@/hooks/useLocalizedParable';

interface RelatedParable {
  slugRu: string;
  slugEn: string;
  titleRu: string;
  titleEn: string;
}

interface ParablePageContentProps {
  parable: BilingualParableContent;
  related: RelatedParable[];
}

export function ParablePageContent({ parable, related }: ParablePageContentProps) {
  const { lang } = useLanguage();
  const { title, content, imageAlt, conclusion, questions, quotes } = useLocalizedParable(parable, lang);

  return (
    <div className="space-y-8">
      <div className="space-y-6 border border-sage-pill rounded-2xl p-6 md:p-8 bg-amber-light">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink">{title}</h1>

        {parable.imageUrl && (
          <img
            src={parable.imageUrl}
            alt={imageAlt ?? title}
            loading="lazy"
            className="w-full h-auto rounded-xl object-cover"
          />
        )}

        <p className="font-serif text-base leading-[1.8] text-ink whitespace-pre-line">{content}</p>
      </div>

      {quotes.length > 0 && (
        <>
          <hr className="border-[var(--color-border)]" />
          <div className="space-y-8">
            {quotes.map((q, i) => (
              <figure key={i} className="relative pl-10">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 font-serif text-[5rem] text-sage opacity-20 leading-none select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif italic text-xl text-ink leading-relaxed">
                  {q.text}
                </blockquote>
                <figcaption className="font-sans text-sm text-muted text-right mt-3">
                  — {q.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      {conclusion && (
        <div className="bg-sage-light border-l-4 border-sage rounded-card p-4 space-y-2">
          <p className="font-sans text-sm font-medium text-sage">{t(lang, 'deepReflectionLabel')}</p>
          <p className="font-serif text-base text-ink whitespace-pre-line leading-[1.8]">{conclusion}</p>
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-semibold text-ink">{t(lang, 'questionsHeading')}</h2>
          <ol className="space-y-4">
            {questions.map((q, i) => (
              <li key={i} className="bg-amber-light rounded-card p-4 flex gap-3">
                <span className="font-sans text-sm font-semibold text-amber shrink-0">{i + 1}.</span>
                <span className="font-sans text-base text-ink">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">{t(lang, 'relatedParablesHeading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => {
              const slug = lang === 'ru' ? item.slugRu : item.slugEn;
              return (
                <Link
                  key={slug}
                  href={`/${lang}/pritcha/${slug}`}
                  className="block bg-white border border-[var(--color-border)] rounded-card p-4 hover:border-sage transition-colors"
                >
                  <p className="font-serif text-sm font-medium text-ink line-clamp-2">
                    {pickLocalized(item.titleRu, item.titleEn, lang)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
