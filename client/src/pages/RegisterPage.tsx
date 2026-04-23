import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '@/modules/auth';
import { useRegister } from '@/modules/auth';

function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();

  const errorMessage =
    error instanceof Error ? error.message : error ? 'Registration failed' : null;

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

        <AuthForm
          onSubmit={(email, password) =>
            register({ email, password }, { onSuccess: () => navigate('/') })
          }
          isPending={isPending}
          error={errorMessage}
          submitLabel="Create account"
          pendingLabel="Creating account..."
          passwordHint="(min 8 characters)"
        />
      </div>
    </main>
  );
}

export { RegisterPage };
