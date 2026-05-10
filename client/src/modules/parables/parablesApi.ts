import type { FetchParablesParams, Parable, ParablesResponse } from './types';
import { api } from '@/lib/api';

export const fetchParables = (params?: FetchParablesParams) =>
  api.get<ParablesResponse>('/parables', { params }).then((r) => r.data);

export const fetchDailyParable = (lang: string) =>
  api.get<Parable>('/parables/daily', { params: { lang } }).then((r) => r.data);

export const fetchParableById = (id: string, lang: string) =>
  api.get<Parable>(`/parables/${id}`, { params: { lang } }).then((r) => r.data);
