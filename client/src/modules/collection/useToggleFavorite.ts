import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFavorite, removeFavorite } from './favoritesApi';

export const useToggleFavorite = (parableId: string, isFavorited: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => (isFavorited ? removeFavorite(parableId) : addFavorite(parableId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });
};
