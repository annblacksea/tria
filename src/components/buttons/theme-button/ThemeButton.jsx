import { useTheme } from '../../../contexts/ThemeContext';
import styles from './theme-button.module.css';

export const ThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.button}
      type="button"
      onClick={toggleTheme}
      aria-label={`Включить ${isDarkTheme ? 'светлую' : 'тёмную'} тему`}
      aria-pressed={isDarkTheme}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {isDarkTheme ? (
          <path
            d="M20.2 15.8A8.2 8.2 0 0 1 8.2 3.8 8.3 8.3 0 1 0 20.2 15.8Z"
            fill="currentColor"
          />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </>
        )}
      </svg>
    </button>
  );
};
