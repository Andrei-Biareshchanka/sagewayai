import { cn } from '@/lib/cn';

interface LoadingSpinnerProps {
  minHeight?: string;
}

function LoadingSpinner({ minHeight = 'min-h-[60vh]' }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center text-muted', minHeight)}>
      Loading...
    </div>
  );
}

export { LoadingSpinner };
