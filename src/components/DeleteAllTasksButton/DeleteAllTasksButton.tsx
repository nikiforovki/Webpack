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

  const handleToggleDeleteAllButton = () =>
    setIsDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  const confirmDeleteAllTask = () => {
    if (isDeleteConfirmationVisible) {
      onDeleteTask();
      handleToggleDeleteAllButton();
    }
  };

  return (
    <div className={`${styles.buttonContainerDeleteAllTasks} ${className}`}>
      <button
        className={styles.buttonDeleteAllTasks}
        onClick={handleToggleDeleteAllButton}
      >
        {isDeleteConfirmationVisible ? <BackArrowIcon /> : <TaskDeletionIcon />}
      </button>
      {isDeleteConfirmationVisible && (
        <button
          className={styles.confirmDeleteButton}
          onClick={confirmDeleteAllTask}
        >
          Удалить
        </button>
      )}
    </div>
  );
};

export default DeleteAllTasksButton;
