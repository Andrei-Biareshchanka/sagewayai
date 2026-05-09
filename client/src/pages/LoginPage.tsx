import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/modules/auth';
import { useLogin } from '@/modules/auth';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const errorMessage = error instanceof Error ? error.message : error ? 'Login failed' : null;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">{t('auth.loginHeading')}</h1>
        <p className="mb-8 text-sm text-muted">
          {t('auth.loginNoAccount')}{' '}
          <Link to="/register" className="text-sage hover:underline">
            {t('auth.loginSignUp')}
          </Link>
        </p>

        <AuthForm
          onSubmit={(email, password) =>
            login({ email, password }, { onSuccess: () => navigate('/') })
          }
          isPending={isPending}
          error={errorMessage}
          submitLabel={t('auth.loginSubmit')}
          pendingLabel={t('auth.loginPending')}
        />
      </div>
    </main>
  );
}

export { LoginPage };
