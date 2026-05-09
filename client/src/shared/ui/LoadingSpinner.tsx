import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';

interface LoadingSpinnerProps {
  minHeight?: string;
}

function LoadingSpinner({ minHeight = 'min-h-[60vh]' }: LoadingSpinnerProps) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center justify-center text-muted', minHeight)}>
      {t('loading')}
    </div>
  );
}

export { LoadingSpinner };
