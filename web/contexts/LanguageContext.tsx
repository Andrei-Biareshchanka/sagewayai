'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Lang = 'ru' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ru',
  setLang: () => {},
});

function swapLocaleSegment(pathname: string, newLang: Lang): string {
  const segments = pathname.split('/');
  segments[1] = newLang;
  return segments.join('/') || '/';
}

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (newLang: Lang) => {
        const newPath = swapLocaleSegment(pathname, newLang);
        const query = searchParams.toString();
        router.push(query ? `${newPath}?${query}` : newPath);
      },
    }),
    [lang, pathname, router, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
