import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuthStore } from '@/modules/auth/authStore';
import { useLogout } from '@/modules/auth/useLogout';
import { cn } from '@/lib/cn';
import { MobileMenu } from './MobileMenu';

function Navbar() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-canvas">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-ink">
              Sage<span className="text-sage">way</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                cn('text-sm transition-colors', isActive ? 'text-ink' : 'text-muted hover:text-ink')
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                cn('text-sm transition-colors', isActive ? 'text-ink' : 'text-muted hover:text-ink')
              }
            >
              My collection
            </NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              {user ? (
                <>
                  <span className="text-sm text-muted">{user.email}</span>
                  <button
                    onClick={() => logout()}
                    className="rounded-full border border-border-medium px-5 py-2 text-sm text-muted transition-colors hover:border-sage hover:text-sage"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-muted transition-colors hover:text-ink">
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-sage px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink sm:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export { Navbar };
