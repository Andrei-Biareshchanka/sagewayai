import { type FormEvent, useState } from 'react';

import { api } from '@/lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/subscribe', { email });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-card border border-border bg-sage-light px-6 py-8 text-center">
        <p className="font-serif text-lg font-semibold text-ink">You're subscribed!</p>
        <p className="mt-1 text-sm text-muted">A new parable will arrive in your inbox every morning.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-sage-light px-6 py-8">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.5px] text-muted">
        Daily parable
      </p>
      <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
        Delivered to your inbox
      </h2>
      <p className="mb-6 text-sm text-muted">
        One parable every morning. No spam, unsubscribe anytime.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-full border border-border-medium bg-white px-5 py-2.5 text-sm text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}

export { SubscribeForm };
