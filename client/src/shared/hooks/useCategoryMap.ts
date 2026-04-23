import { useMemo } from 'react';

import { useCategories } from '@/modules/categories/useCategories';

export const useCategoryMap = (): Record<string, string> => {
  const { data: categories } = useCategories();
  return useMemo(
    () => Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
    [categories],
  );
};
