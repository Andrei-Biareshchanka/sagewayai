import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/modules/auth/authStore';
import { fetchFavorites } from './favoritesApi';

export const useFavorites = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
    enabled: Boolean(user),
  });
};
