import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="font-serif text-lg font-semibold text-ink">
              Sage<span className="text-sage">way</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-muted">
              {t('footer.exploreSection')}
            </span>
            <NavLink
              to="/"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {t('footer.home')}
            </NavLink>
            <NavLink
              to="/explore"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {t('footer.allParables')}
            </NavLink>
            <NavLink
              to="/collection"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {t('footer.myCollection')}
            </NavLink>
          </nav>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-center text-xs text-muted">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}

export { Footer };
