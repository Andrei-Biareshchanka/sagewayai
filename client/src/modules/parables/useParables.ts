import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import type { FetchParablesParams } from './types';
import { fetchParables } from './parablesApi';

export const useParables = (params?: Omit<FetchParablesParams, 'lang'>) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ['parables', params ?? {}, lang],
    queryFn: () => fetchParables({ ...params, lang }),
    staleTime: 1000 * 60 * 5,
  });
};
