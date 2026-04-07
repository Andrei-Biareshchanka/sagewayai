import { Link, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="font-serif text-lg font-semibold text-ink">
              Sage<span className="text-sage">way</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              A daily parable that resonates. Wisdom, delivered one story at a time.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-muted">
              Explore
            </span>
            <NavLink
              to="/"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              All parables
            </NavLink>
            <NavLink
              to="/collection"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              My collection
            </NavLink>
          </nav>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Sageway. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export { Footer };
