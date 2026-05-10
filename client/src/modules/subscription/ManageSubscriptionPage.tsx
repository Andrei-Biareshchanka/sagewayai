import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import {
  useSubscriberInfo,
  useUpdateSubscriberLang,
  useUnsubscribe,
} from './useManageSubscription';

function ManageSubscriptionPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('manageSubscription.documentTitle'));

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { data: subscriber, isLoading, isError } = useSubscriberInfo(token);
  const { mutate: saveLang, isPending: isSaving, isSuccess: isSaved } = useUpdateSubscriberLang(token);
  const { mutate: doUnsubscribe, isPending: isUnsubscribing, isSuccess: isUnsubscribed } = useUnsubscribe(token);

  const [selectedLang, setSelectedLang] = useState<'en' | 'ru' | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentLang = selectedLang ?? subscriber?.lang ?? 'en';

  if (!token || isError) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-muted">{t('manageSubscription.invalidLink')}</p>
          <a href="/" className="mt-4 inline-block text-sm text-sage hover:underline">
            {t('manageSubscription.backHome')}
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-muted">{t('loading')}</p>
      </div>
    );
  }

  if (isUnsubscribed) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="font-serif text-xl font-semibold text-ink">
            {t('manageSubscription.unsubscribed')}
          </p>
          <p className="mt-2 text-sm text-muted">
            {t('manageSubscription.unsubscribedMessage')}
          </p>
          <a href="/" className="mt-6 inline-block text-sm text-sage hover:underline">
            {t('manageSubscription.backHome')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-2 font-serif text-2xl font-semibold text-ink">
        {t('manageSubscription.heading')}
      </h1>

      <p className="mb-6 text-sm text-muted">{subscriber?.email}</p>

        <div className="mt-6 rounded-card border border-border bg-sage-light px-6 py-6">
          <p className="mb-3 text-sm font-medium text-ink">
            {t('manageSubscription.langLabel')}
          </p>
          <div className="flex gap-2">
            {(['en', 'ru'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedLang(code)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  currentLang === code
                    ? 'border-sage bg-sage text-white'
                    : 'border-border-medium bg-white text-muted hover:border-sage hover:text-sage'
                }`}
              >
                {t(`manageSubscription.lang${code === 'en' ? 'En' : 'Ru'}`)}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={isSaving || selectedLang === null || selectedLang === subscriber?.lang}
            onClick={() => selectedLang && saveLang(selectedLang)}
            className="mt-4 rounded-full bg-sage px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isSaving ? t('manageSubscription.saving') : isSaved ? t('manageSubscription.saved') : t('manageSubscription.saveButton')}
          </button>
        </div>

        <div className="mt-6">
          {!showConfirm ? (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="text-sm text-muted underline-offset-2 hover:text-red-500 hover:underline"
            >
              {t('manageSubscription.unsubscribeButton')}
            </button>
          ) : (
            <div className="rounded-card border border-red-200 bg-red-50 px-4 py-4">
              <p className="mb-3 text-sm text-red-700">
                {t('manageSubscription.unsubscribeConfirm')}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={isUnsubscribing}
                  onClick={() => doUnsubscribe()}
                  className="rounded-full bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60"
                >
                  {t('manageSubscription.unsubscribeButton')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="text-sm text-muted hover:text-ink"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

export { ManageSubscriptionPage };
