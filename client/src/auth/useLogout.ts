import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from './authApi';
import { useAuthStore } from './authStore';

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};
