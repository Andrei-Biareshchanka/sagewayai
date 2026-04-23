import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '@/modules/auth';
import { useLogin } from '@/modules/auth';

function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const errorMessage = error instanceof Error ? error.message : error ? 'Login failed' : null;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">Welcome back</h1>
        <p className="mb-8 text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-sage hover:underline">
            Sign up
          </Link>
        </p>

        <AuthForm
          onSubmit={(email, password) =>
            login({ email, password }, { onSuccess: () => navigate('/') })
          }
          isPending={isPending}
          error={errorMessage}
          submitLabel="Sign in"
          pendingLabel="Signing in..."
        />
      </div>
    </main>
  );
}

export { LoginPage };
