import React, { useState, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

interface ModalProps {
  closeModal: () => void;
  handleAddNewTask: (task: string) => void;
}

enum TaskErrorText {
  MAX_LENGTH = 'Текст задачи не может превышать 40 символов',
  EMPTY = 'Текст задачи не может быть пустым',
}

export const Modal: React.FC<ModalProps> = ({
  closeModal,
  handleAddNewTask,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, closeModal);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (!inputValue.trim()) {
      setError(TaskErrorText.EMPTY);
    } else if (inputValue.trim().length > 40) {
      setError(TaskErrorText.MAX_LENGTH);
    } else {
      handleAddNewTask(inputValue);
      setInputValue('');
      setError(null);
    }
  };

  return (
    <div ref={modalRef} className={styles.modal_content}>
      <span className={styles.title}>Добавить задачу</span>
      <input
        className={styles.inputAddTask}
        placeholder='Введите текст...'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {error && <div className={styles.validationErrorMessage}>{error}</div>}
      <button className={styles.closeButton} onClick={closeModal}>
        Закрыть
      </button>
      <button className={styles.buttonAddingTask} onClick={handleAddTask}>
        Добавить
      </button>
    </div>
  );
};
