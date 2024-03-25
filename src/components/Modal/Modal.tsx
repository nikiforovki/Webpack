import React, { useState, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  closeModal: () => void;
  handleAddNewTask: (task: string) => void;
}

enum TaskErrorText {
  MAX_LENGTH = 'Текст задачи не может превышать 40 символов',
  EMPTY = 'Текст задачи не может быть пустым',
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
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
    if (!inputValue.trim().length) {
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
      <h1 className={styles.title}>Добавить задачу</h1>
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
