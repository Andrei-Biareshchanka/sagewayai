import { useQuery } from '@tanstack/react-query';

import type { FetchParablesParams } from '@/types';
import { fetchDailyParable, fetchParableById, fetchParables } from './parablesApi';

export const useParables = (params?: FetchParablesParams) =>
  useQuery({
    queryKey: ['parables', params ?? {}],
    queryFn: () => fetchParables(params),
  });

export const useDailyParable = () =>
  useQuery({
    queryKey: ['parables', 'daily'],
    queryFn: fetchDailyParable,
    staleTime: 1000 * 60 * 60,
  });

export const useParable = (id: string) =>
  useQuery({
    queryKey: ['parables', id],
    queryFn: () => fetchParableById(id),
    enabled: Boolean(id),
  });
