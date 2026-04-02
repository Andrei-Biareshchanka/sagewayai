import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="border-b border-[rgba(0,0,0,0.08)] bg-[#FAFAF8]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold text-[#1A1A1A]">
            Sage<span className="text-[#6B8F71]">way</span>
          </span>
        </Link>

        <nav className="flex items-center gap-8">
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
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `text-sm transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`
            }
          >
            Add story
          </NavLink>
        </nav>

        <button className="rounded-full bg-[#6B8F71] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
          Subscribe
        </button>
      </div>
    </header>
  );
}

export { Navbar };
