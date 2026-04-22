function DailyParableCardSkeleton() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6 sm:pb-12">
      <div className="rounded-card border border-border bg-sage-light p-6 sm:p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-6 w-32 animate-pulse rounded-full bg-gray-300" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
        </div>

        <div className="mb-4 h-9 w-2/3 animate-pulse rounded bg-gray-300" />

        <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-300" />
        <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-300" />
        <div className="mb-6 h-4 w-3/4 animate-pulse rounded bg-gray-300" />

        <div className="mb-8 h-4 w-1/2 animate-pulse rounded bg-gray-300" />

        <div className="flex items-center justify-between">
          <div className="h-3 w-20 animate-pulse rounded bg-gray-300" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

export { DailyParableCardSkeleton };
