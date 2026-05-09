import { render, screen, fireEvent } from '@testing-library/react';

import { i18n } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

beforeEach(() => {
  i18n.changeLanguage('en');
  localStorage.clear();
});

describe('LanguageSwitcher', () => {
  it('shows current language label on the toggle button', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button', { name: /en/i })).toBeInTheDocument();
  });

  it('opens dropdown on button click', () => {
    render(<LanguageSwitcher />);
    expect(screen.queryByText('Ru')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /en/i }));

    expect(screen.getByText('Ru')).toBeInTheDocument();
  });

  it('closes dropdown after selecting a language', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: /en/i }));
    fireEvent.click(screen.getByText('Ru'));

    expect(screen.queryByText('En')).not.toBeInTheDocument();
  });

  it('changes i18n language and saves to localStorage on selection', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: /en/i }));
    fireEvent.click(screen.getByText('Ru'));

    expect(i18n.language).toBe('ru');
    expect(localStorage.getItem('lang')).toBe('ru');
  });

  it('closes dropdown on click outside', () => {
    render(
      <div>
        <LanguageSwitcher />
        <div data-testid="outside">outside</div>
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: /en/i }));
    expect(screen.getByText('Ru')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Ru')).not.toBeInTheDocument();
  });
});
