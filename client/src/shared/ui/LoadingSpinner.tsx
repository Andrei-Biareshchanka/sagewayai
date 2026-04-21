interface LoadingSpinnerProps {
  minHeight?: string;
}

function LoadingSpinner({ minHeight = 'min-h-[60vh]' }: LoadingSpinnerProps) {
  return (
    <div className={`flex ${minHeight} items-center justify-center text-muted`}>
      Loading...
    </div>
  );
}

export { LoadingSpinner };
