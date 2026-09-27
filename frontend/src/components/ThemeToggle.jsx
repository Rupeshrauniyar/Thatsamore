import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      type="button"
    >
      <span className={`theme-toggle__thumb ${dark ? 'theme-toggle__thumb--dark' : ''}`}>
        {dark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
