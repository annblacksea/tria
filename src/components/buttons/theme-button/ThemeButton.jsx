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
      <i
        className={`fa ${isDarkTheme ? 'fa-sun-o' : 'fa-moon-o'} ${styles.icon}`}
        aria-hidden="true"
      />
    </button>
  );
};
