import { useQuery } from '@tanstack/react-query';

import { fetchDailyParable } from './parablesApi';

export const useDailyParable = () =>
  useQuery({
    queryKey: ['parables', 'daily'],
    queryFn: fetchDailyParable,
    staleTime: 1000 * 60 * 60,
  });
