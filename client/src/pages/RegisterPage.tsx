import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/modules/auth';
import { useRegister } from '@/modules/auth';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();

  const errorMessage =
    error instanceof Error ? error.message : error ? 'Registration failed' : null;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">{t('auth.registerHeading')}</h1>
        <p className="mb-8 text-sm text-muted">
          {t('auth.registerHasAccount')}{' '}
          <Link to="/login" className="text-sage hover:underline">
            {t('auth.registerSignIn')}
          </Link>
        </p>

        <AuthForm
          onSubmit={(email, password) =>
            register({ email, password }, { onSuccess: () => navigate('/') })
          }
          isPending={isPending}
          error={errorMessage}
          submitLabel={t('auth.registerSubmit')}
          pendingLabel={t('auth.registerPending')}
          passwordHint={t('auth.passwordHint')}
        />
      </div>
    </main>
  );
}

export { RegisterPage };
