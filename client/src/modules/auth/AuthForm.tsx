import { type FormEvent, useState } from 'react';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  isPending: boolean;
  error: string | null;
  submitLabel: string;
  pendingLabel: string;
  passwordHint?: string;
}

function AuthForm({ onSubmit, isPending, error, submitLabel, pendingLabel, passwordHint }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
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
          {passwordHint && (
            <span className="ml-1 font-normal text-muted">{passwordHint}</span>
          )}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={passwordHint ? 8 : undefined}
          className="rounded-lg border border-border-medium px-4 py-2.5 text-sm text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}

export { AuthForm };
