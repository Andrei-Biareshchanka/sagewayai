import { useQuery } from '@tanstack/react-query';

import type { FetchParablesParams } from '@/types';
import { fetchParables } from './parablesApi';

export const useParables = (params?: FetchParablesParams) =>
  useQuery({
    queryKey: ['parables', params ?? {}],
    queryFn: () => fetchParables(params),
    staleTime: 1000 * 60 * 5,
  });
