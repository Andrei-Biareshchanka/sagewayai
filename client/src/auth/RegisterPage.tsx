import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRegister } from './useRegister';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();

  const errorMessage =
    error instanceof Error ? error.message : error ? 'Registration failed' : null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ email, password }, { onSuccess: () => navigate('/') });
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">Create account</h1>
        <p className="mb-8 text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-sage hover:underline">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border border-border-medium px-4 py-2.5 text-sm text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
              <span className="ml-1 font-normal text-muted">(min 8 characters)</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-lg border border-border-medium px-4 py-2.5 text-sm text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </main>
  );
}

export { RegisterPage };
