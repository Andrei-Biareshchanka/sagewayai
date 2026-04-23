import type { FetchParablesParams, ParablesResponse } from '@/modules/parables/types';
import { api } from '@/lib/api';

export const fetchFavorites = (params?: FetchParablesParams) =>
  api.get<ParablesResponse>('/me/favorites', { params }).then((r) => r.data);

export const addFavorite = (parableId: string) => api.post(`/me/favorites/${parableId}`);

export const removeFavorite = (parableId: string) => api.delete(`/me/favorites/${parableId}`);
