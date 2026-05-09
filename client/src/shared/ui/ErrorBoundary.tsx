import { Component, type ErrorInfo, type ReactNode } from 'react';

import { i18n } from '@/i18n';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
            <p className="font-serif text-xl text-ink">{i18n.t('error.heading')}</p>
            <p className="text-sm text-muted">{i18n.t('error.message')}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
