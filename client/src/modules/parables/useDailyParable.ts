import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { fetchDailyParable } from './parablesApi';

export const useDailyParable = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ['parables', 'daily', lang],
    queryFn: () => fetchDailyParable(lang),
    staleTime: 1000 * 60 * 60,
  });
};
