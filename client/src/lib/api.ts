import axios from 'axios';

import { useAuthStore } from '@/auth/authStore';
import type { AuthResponse } from '@/types';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error: unknown) => {
    const axiosError = error as { config?: { _retry?: boolean }; response?: { status: number } };
    const original = axiosError.config;

    if (axiosError.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post<AuthResponse>(
          'http://localhost:3001/api/auth/refresh',
          {},
          { withCredentials: true },
        );
        useAuthStore.getState().setAuth(data.user, data.accessToken);
        return api(original as Parameters<typeof api>[0]);
      } catch {
        useAuthStore.getState().clearAuth();
      }
    }
    return Promise.reject(error);
  },
);
