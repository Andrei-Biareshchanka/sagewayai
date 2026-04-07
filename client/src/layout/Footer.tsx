import { Link, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.08)] bg-[#FAFAF8]">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="font-serif text-lg font-semibold text-[#1A1A1A]">
              Sage<span className="text-[#6B8F71]">way</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6B7280]">
              A daily parable that resonates. Wisdom, delivered one story at a time.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
              Explore
            </span>
            <NavLink
              to="/"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            >
              All parables
            </NavLink>
            <NavLink
              to="/collection"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            >
              My collection
            </NavLink>
          </nav>
        </div>

        <div className="mt-10 border-t border-[rgba(0,0,0,0.06)] pt-6 text-center text-xs text-[#6B7280]">
          © {new Date().getFullYear()} Sageway. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export { Footer };
