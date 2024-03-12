import React, { useState } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  closeModal: () => void;
  onNewTask: (task: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, onNewTask }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      onNewTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.modal_content} onClick={closeModal}>
      <h1 className={styles.h1}>Добавить задачу</h1>
      <input
        className={styles.input}
        placeholder="Введите текст..."
        value={inputValue}
        onChange={handleChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.closeButton} onClick={onCloseModal}>
        Закрыть
      </button>
      <button className={styles.appButton} onClick={handleAddTask}>
        Добавить
      </button>
    </div>
  );
};
