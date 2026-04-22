function ParableCardSkeleton() {
  return (
    <div className="flex flex-col rounded-card border border-border bg-white p-6">
      <div className="mb-3 h-3 w-16 animate-pulse rounded bg-gray-200" />
      <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="mb-5 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-auto h-3 w-12 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

export { ParableCardSkeleton };
