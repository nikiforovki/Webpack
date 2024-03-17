import React, { useEffect } from 'react';
import styles from './ToggleTheme.module.scss';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

const ToggleTheme: React.FC = () => {
  const setDarkMode = () => {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, 'dark');
  };
  const setLightMode = () => {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, 'light');
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (selectedTheme === 'dark') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={
          localStorage.getItem(THEME_LOCAL_STORAGE_KEY) === 'dark'
        }
      />
      <label className={styles.dark_mode_label} htmlFor="darkmode-toggle" />
    </div>
  );
};

export default ToggleTheme;
