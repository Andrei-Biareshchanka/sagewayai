import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { fetchParableById } from './parablesApi';

export const useParable = (id: string) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ['parables', id, lang],
    queryFn: () => fetchParableById(id, lang),
    enabled: Boolean(id),
  });
};
