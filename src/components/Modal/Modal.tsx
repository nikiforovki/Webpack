import React, { useState } from 'react';
import styles from './Modal.module.scss';

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
  const [isOpen, setisOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onOpenModal = () => {
    setisOpen(true);
  };

  const onCloseModal = () => {
    setisOpen(false);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

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
    <div className={styles.modal_content} onClick={closeModal}>
      <h1 className={styles.title}>Добавить задачу</h1>
      <input
        className={styles.input}
        placeholder='Введите текст...'
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button className={styles.closeButton} onClick={onCloseModal}>
        Закрыть
      </button>
      <button className={styles.appButton} onClick={handleAddTask}>
        Добавить
      </button>
    </div>
  );
};
