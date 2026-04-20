import { useMutation } from '@tanstack/react-query';

import { register } from './authApi';
import { useAuthStore } from './authStore';

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      register(email, password),
    onSuccess: ({ user, accessToken }) => setAuth(user, accessToken),
  });
};
