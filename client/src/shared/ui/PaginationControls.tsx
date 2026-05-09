import { useTranslation } from 'react-i18next';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

function PaginationControls({ page, totalPages, onPrev, onNext }: PaginationControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded-full border border-border px-5 py-2 text-sm text-muted transition-colors hover:border-sage hover:text-sage disabled:opacity-30"
      >
        {t('pagination.previous')}
      </button>
      <span className="text-sm text-muted">
        {page} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-full border border-border px-5 py-2 text-sm text-muted transition-colors hover:border-sage hover:text-sage disabled:opacity-30"
      >
        {t('pagination.next')}
      </button>
    </div>
  );
}

export { PaginationControls };
