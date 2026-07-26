'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Lang = 'ru' | 'en';

export interface AlternateSlugs {
  ru: string;
  en: string;
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  setAlternateSlugs: (slugs: AlternateSlugs | null) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ru',
  setLang: () => {},
  setAlternateSlugs: () => {},
});

function swapLocaleSegment(pathname: string, newLang: Lang): string {
  const segments = pathname.split('/');
  segments[1] = newLang;
  return segments.join('/') || '/';
}

function swapLastSegment(pathname: string, newSlug: string): string {
  const segments = pathname.split('/');
  segments[segments.length - 1] = newSlug;
  return segments.join('/') || '/';
}

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Registered by pages whose RU/EN slugs differ (e.g. a parable), so the
  // header toggle can jump to the correct sibling page instead of naively
  // swapping only the locale segment. A ref, not state — only setLang reads
  // it, at click time, and it must not cause the provider to re-render.
  const alternateSlugsRef = useRef<AlternateSlugs | null>(null);

  const setAlternateSlugs = useCallback((slugs: AlternateSlugs | null) => {
    alternateSlugsRef.current = slugs;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (newLang: Lang) => {
        let newPath = swapLocaleSegment(pathname, newLang);
        const alternate = alternateSlugsRef.current;
        if (alternate) {
          newPath = swapLastSegment(newPath, alternate[newLang]);
        }
        const query = searchParams.toString();
        router.push(query ? `${newPath}?${query}` : newPath);
      },
      setAlternateSlugs,
    }),
    [lang, pathname, router, searchParams, setAlternateSlugs],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
