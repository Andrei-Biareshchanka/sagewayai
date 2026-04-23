import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuthStore } from '@/modules/auth';
import { useLogout } from '@/modules/auth';
import { cn } from '@/lib/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('font-serif text-2xl font-semibold transition-colors', isActive ? 'text-sage' : 'text-ink hover:text-sage');

  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 flex h-full w-4/5 max-w-xs flex-col bg-canvas px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={onClose} className="font-serif text-xl font-semibold text-ink">
            Sage<span className="text-sage">way</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-6">
          <NavLink to="/explore" className={navLinkClass} onClick={onClose}>
            Explore
          </NavLink>
          <NavLink to="/collection" className={navLinkClass} onClick={onClose}>
            My collection
          </NavLink>
        </nav>

        <div className="mt-auto flex flex-col gap-3 pb-4">
          {user ? (
            <>
              <span className="text-sm text-muted">{user.email}</span>
              <button
                onClick={() => { logout(); onClose(); }}
                className="rounded-full border border-border-medium px-5 py-2.5 text-sm text-muted transition-colors hover:border-sage hover:text-sage"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="rounded-full border border-border-medium px-5 py-2.5 text-center text-sm text-muted transition-colors hover:border-sage hover:text-sage"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="rounded-full bg-sage px-5 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { MobileMenu };
