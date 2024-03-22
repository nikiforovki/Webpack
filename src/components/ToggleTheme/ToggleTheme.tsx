import React, { useEffect } from 'react';
import styles from './ToggleTheme.module.scss';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const ToggleTheme: React.FC = () => {
  const handleDetDarkMode = () => {
    document.body.setAttribute('data-theme', Theme.DARK);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, Theme.DARK);
  };
  const handleDetLightMode = () => {
    document.body.setAttribute('data-theme', Theme.LIGHT);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, Theme.LIGHT);
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (selectedTheme === Theme.DARK) {
      handleDetDarkMode();
    } else {
      handleDetLightMode();
    }
  }, []);

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleDetDarkMode();
    } else {
      handleDetLightMode();
    }
  };

  const isDarkTheme =
    localStorage.getItem(THEME_LOCAL_STORAGE_KEY) === Theme.DARK;

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type='checkbox'
        id='darkmode-toggle'
        onChange={toggleTheme}
        defaultChecked={isDarkTheme}
      />
      <label className={styles.dark_mode_label} htmlFor='darkmode-toggle' />
    </div>
  );
};

export default ToggleTheme;
