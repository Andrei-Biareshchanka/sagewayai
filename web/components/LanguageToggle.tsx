'use client';

import { useState, useRef, useEffect } from 'react';
import type { Lang } from '@/contexts/LanguageContext';

export type { Lang };

const LANGUAGES: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
];

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function select(value: Lang) {
    onChange(value);
    setOpen(false);
  }

  const current = LANGUAGES.find((l) => l.value === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 rounded-full border border-[var(--color-border)] bg-canvas px-3 py-1.5 text-xs font-medium text-muted outline-none transition-colors hover:border-sage hover:text-sage"
      >
        {current.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="2,3.5 5,6.5 8,3.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-canvas shadow-sm">
          {LANGUAGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => select(value)}
              className={`block w-full cursor-pointer px-4 py-2 text-left text-xs font-medium transition-colors ${
                value === lang
                  ? 'bg-sage text-white'
                  : 'text-muted hover:bg-sage-light hover:text-sage'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
