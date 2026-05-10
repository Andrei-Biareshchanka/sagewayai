import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubscribe } from './useSubscribe';

function SubscribeForm() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [lang, setLang]   = useState<'en' | 'ru'>(i18n.language === 'ru' ? 'ru' : 'en');
  const { mutate: subscribe, isPending, isSuccess, isError, reset } = useSubscribe();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    subscribe({ email, lang }, { onSuccess: () => setEmail('') });
  };

  if (isSuccess) {
    return (
      <div className="rounded-card border border-border bg-sage-light px-6 py-8 text-center">
        <p className="font-serif text-lg font-semibold text-ink">{t('subscribe.successHeading')}</p>
        <p className="mt-1 text-sm text-muted">{t('subscribe.successMessage')}</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-sage-light px-6 py-8">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.5px] text-muted">
        {t('subscribe.label')}
      </p>
      <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
        {t('subscribe.heading')}
      </h2>
      <p className="mb-6 text-sm text-muted">
        {t('subscribe.description')}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (isError) reset(); }}
            placeholder={t('subscribe.placeholder')}
            required
            className="flex-1 rounded-full border border-border-medium bg-white px-5 py-2.5 text-sm text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? t('subscribe.pending') : t('subscribe.button')}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">{t('subscribe.langLabel')}:</span>
          <div className="flex gap-2">
            {(['en', 'ru'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  lang === code
                    ? 'border-sage bg-sage text-white'
                    : 'border-border-medium bg-white text-muted hover:border-sage hover:text-sage'
                }`}
              >
                {t(`subscribe.lang${code === 'en' ? 'En' : 'Ru'}`)}
              </button>
            ))}
          </div>
        </div>
      </form>

      {isError && (
        <p className="mt-3 text-sm text-red-600">{t('subscribe.error')}</p>
      )}
    </div>
  );
}

export { SubscribeForm };
