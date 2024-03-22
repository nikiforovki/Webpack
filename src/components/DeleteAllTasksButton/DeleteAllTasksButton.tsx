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
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled(!isToggled);
  const confirmDelete = () => {
    if (isToggled) {
      onDeleteTask();
      toggle();
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${className}`}>
      <button className={styles.buttonDeleteAllTasks} onClick={toggle}>
        {isToggled ? <BackArrowIcon /> : <TaskDeletionIcon />}
      </button>
      {isToggled && (
        <button className={styles.confirmDeleteButton} onClick={confirmDelete}>
          Удалить
        </button>
      )}
    </div>
  );
};

export default DeleteAllTasksButton;
