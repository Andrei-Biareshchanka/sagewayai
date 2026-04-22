import type { FetchParablesParams, Parable, ParablesResponse } from './types';
import { api } from '@/lib/api';

export const fetchParables = (params?: FetchParablesParams) =>
  api.get<ParablesResponse>('/parables', { params }).then((r) => r.data);

export const fetchDailyParable = () =>
  api.get<Parable>('/parables/daily').then((r) => r.data);

export const fetchParableById = (id: string) =>
  api.get<Parable>(`/parables/${id}`).then((r) => r.data);
