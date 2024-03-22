import React from 'react';
import styles from './SortTodosListButton.module.scss';
import { ButtonSortProps } from './SortTodosListButtonTypes';

const SortTodosListButton: React.FC<ButtonSortProps> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value;

    if (filter !== 'all' && filter !== 'complete' && filter !== 'incomplete') {
      console.error('Неверное значение filter');
      return;
    }
    if (filter === 'complete') {
      onSortChange('complete');
    } else if (filter === 'incomplete') {
      onSortChange('incomplete');
    } else {
      onSortChange('all');
    }
  };

  return (
    <button className={styles.button}>
      <select className={styles.select} onChange={handleSortChange}>
        <option value='all'>Все</option>
        <option value='complete'>Завершенные</option>
        <option value='incomplete'>Не завершенные</option>
      </select>
    </button>
  );
};

export default SortTodosListButton;
