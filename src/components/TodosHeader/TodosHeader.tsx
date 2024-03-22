import React from 'react';
import styles from './TodosHeader.module.scss';
import SearchInput from '../SearchInput/SearchInput';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

export const TodosHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>TODO LIST</h1>
      <SearchInput />
      <ToggleTheme />
    </div>
  );
};
