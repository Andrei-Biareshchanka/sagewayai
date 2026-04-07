import { Link, NavLink } from 'react-router-dom';

import { useAuthStore } from '@/auth/authStore';
import { useLogout } from '@/auth/useAuth';

function Navbar() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();

  return (
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
              `text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
            }
          >
            My collection
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">{user.email}</span>
              <button
                onClick={() => logout()}
                className="rounded-full border border-border-medium px-4 py-1.5 text-sm text-muted transition-colors hover:border-sage hover:text-sage sm:px-5 sm:py-2"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-sage px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-5 sm:py-2"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { Navbar };
