'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';

export interface ParableCatalogSummary {
  slugRu: string;
  slugEn: string;
  title: string;
  titleRu: string;
  imageUrl: string | null;
  imageAltRu: string | null;
  imageAltEn: string | null;
}

export function ParableCatalogCard({ parable }: { parable: ParableCatalogSummary }) {
  const { lang } = useLanguage();
  const slug = lang === 'ru' ? parable.slugRu : parable.slugEn;
  const title = pickLocalized(parable.titleRu, parable.title, lang);
  const imageAlt = (lang === 'ru' ? parable.imageAltRu : parable.imageAltEn) ?? title;

  return (
    <Link
      href={`/${lang}/pritcha/${slug}`}
      className="block bg-white border border-[var(--color-border)] rounded-card overflow-hidden hover:border-sage transition-colors"
    >
      {parable.imageUrl && (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={parable.imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <p className="font-serif text-sm font-medium text-ink p-3 line-clamp-2">{title}</p>
    </Link>
  );
}
