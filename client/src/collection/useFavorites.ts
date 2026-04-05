import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/auth/authStore';
import { addFavorite, fetchFavorites, removeFavorite } from './favoritesApi';

export const useFavorites = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
    enabled: Boolean(user),
  });
};

export const useToggleFavorite = (parableId: string, isFavorited: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => (isFavorited ? removeFavorite(parableId) : addFavorite(parableId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });
};
