import { Link, NavLink } from 'react-router-dom';

import { useAuthStore } from '@/auth/authStore';
import { useLogout } from '@/auth/useAuth';

function Navbar() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();

  return (
    <header className="border-b border-[rgba(0,0,0,0.08)] bg-[#FAFAF8]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold text-[#1A1A1A]">
            Sage<span className="text-[#6B8F71]">way</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `text-sm transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `text-sm transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`
            }
          >
            My collection
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-[#6B7280] sm:inline">{user.email}</span>
              <button
                onClick={() => logout()}
                className="rounded-full border border-[rgba(0,0,0,0.15)] px-4 py-1.5 text-sm text-[#6B7280] transition-colors hover:border-[#6B8F71] hover:text-[#6B8F71] sm:px-5 sm:py-2"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#6B8F71] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-5 sm:py-2"
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
