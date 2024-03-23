import React, { useState } from 'react';
import styles from './DeleteAllTasksButton.module.scss';
import TaskDeletionIcon from '../../../public/Img/TaskDeletionIcon';
import BackArrowIcon from '../../../public/Img/BackArrowIcon';

interface ToggleDeleteProps {
  onDeleteTask: () => void;
  className?: string;
}

const DeleteAllTasksButton: React.FC<ToggleDeleteProps> = ({
  onDeleteTask,
  className,
}) => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const toggle = () =>
    setIsDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  const confirmDelete = () => {
    if (isDeleteConfirmationVisible) {
      onDeleteTask();
      toggle();
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${className}`}>
      <button className={styles.buttonDeleteAllTasks} onClick={toggle}>
        {isDeleteConfirmationVisible ? <BackArrowIcon /> : <TaskDeletionIcon />}
      </button>
      {isDeleteConfirmationVisible && (
        <button className={styles.confirmDeleteButton} onClick={confirmDelete}>
          Удалить
        </button>
      )}
    </div>
  );
};

export default DeleteAllTasksButton;
