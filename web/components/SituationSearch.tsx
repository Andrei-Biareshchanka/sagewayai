'use client';

import { useState } from 'react';
import { DigestBlock, type DigestData } from './DigestBlock';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'result'; data: DigestData }
  | { kind: 'error'; message: string };

export function SituationSearch() {
  const { lang } = useLanguage();
  const [situation, setSituation] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (situation.trim().length < 10) return;

    setState({ kind: 'loading' });

    try {
      const res = await fetch('/api/situation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: situation.trim(), lang, includeReflection: false }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string; message?: string };
        setState({
          kind: 'error',
          message: body.message ?? body.error ?? t(lang, 'situationErrorGeneric'),
        });
        return;
      }

      const data = (await res.json()) as DigestData;
      setState({ kind: 'result', data });
    } catch {
      setState({
        kind: 'error',
        message: t(lang, 'situationNetworkError'),
      });
    }
  }

  const placeholder = t(lang, 'situationPlaceholder');

  const isLoading = state.kind === 'loading';

  return (
    <section className="bg-white border border-[var(--color-border)] rounded-card p-6 sm:p-8">
      <div className="mb-4">
        <h2 className="font-serif text-2xl text-ink">
          {t(lang, 'situationHeading')}
        </h2>
        <p className="font-sans text-sm text-muted mt-1">
          {t(lang, 'situationSubheading')}
        </p>
      </div>

      {state.kind === 'idle' || state.kind === 'loading' || state.kind === 'error' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            rows={4}
            className="w-full min-h-[120px] border border-[var(--color-border-medium)] rounded-card p-4 font-sans text-sm text-ink placeholder:text-muted resize-none focus:outline-none focus:border-sage disabled:opacity-60 transition-colors"
          />
          {state.kind === 'error' && (
            <p className="font-sans text-sm text-red-500">{state.message}</p>
          )}
          <button
            type="submit"
            disabled={isLoading || situation.trim().length < 10}
            className="flex items-center gap-2 ml-auto bg-sage hover:bg-sage-dark text-white font-sans font-medium rounded-card px-5 py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && <Spinner />}
            {isLoading ? t(lang, 'situationLoadingButton') : t(lang, 'situationFindButton')}
          </button>
        </form>
      ) : state.kind === 'result' ? (
        <div className="space-y-6">
          <DigestBlock data={state.data} showDailyBadge={false} />
          <div className="flex justify-end">
            <button
              onClick={() => setState({ kind: 'idle' })}
              className="font-sans text-sm text-muted hover:text-ink transition-colors underline underline-offset-2 cursor-pointer"
            >
              {t(lang, 'situationNewSearch')}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}
