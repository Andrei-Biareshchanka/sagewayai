import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from './useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const errorMessage =
    error instanceof Error ? error.message : error ? 'Login failed' : null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }, { onSuccess: () => navigate('/') });
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-[#1A1A1A]">Welcome back</h1>
        <p className="mb-8 text-sm text-[#6B7280]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6B8F71] hover:underline">
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border border-[rgba(0,0,0,0.15)] px-4 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border border-[rgba(0,0,0,0.15)] px-4 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 rounded-full bg-[#6B8F71] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}

export { LoginPage };
