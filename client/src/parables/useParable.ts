import { useQuery } from '@tanstack/react-query';

import { fetchParableById } from './parablesApi';

export const useParable = (id: string) =>
  useQuery({
    queryKey: ['parables', id],
    queryFn: () => fetchParableById(id),
    enabled: Boolean(id),
  });
