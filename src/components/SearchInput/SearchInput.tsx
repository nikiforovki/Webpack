import React, { useState, useCallback } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  handleAddNewTask?: (taskText: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  handleAddNewTask,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (handleAddNewTask) {
        handleAddNewTask(event.target.value);
      }
    },
    [handleAddNewTask],
  );

  return (
    <div className={styles.inputButtonContainer}>
      <input
        className={styles.inputSearchTask}
        type='search'
        placeholder='Введите задачу...'
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
