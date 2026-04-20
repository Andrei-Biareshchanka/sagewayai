import { useMutation } from '@tanstack/react-query';

import { login } from './authApi';
import { useAuthStore } from './authStore';

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: ({ user, accessToken }) => setAuth(user, accessToken),
  });
};
