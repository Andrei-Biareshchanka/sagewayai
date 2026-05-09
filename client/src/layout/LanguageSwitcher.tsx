import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { i18n } from "@/i18n";
import { cn } from "@/lib/cn";

const LANGUAGES = [
  { code: "en", label: "En" },
  { code: "ru", label: "Ru" },
] as const;

function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const select = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  const currentLabel = LANGUAGES.find((l) => l.code === current)?.label ?? "En";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 rounded-full border border-border-medium bg-canvas px-3 py-1.5 text-xs font-medium text-muted outline-none transition-colors hover:border-sage hover:text-sage"
      >
        {currentLabel}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform", open && "rotate-180")}
        >
          <polyline points="2,3.5 5,6.5 8,3.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-lg border border-border bg-canvas shadow-sm">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => select(code)}
              className={cn(
                "block w-full cursor-pointer px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-sage-light hover:text-sage",
                current === code ? "text-sage" : "text-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { LanguageSwitcher };
