import React, { useState } from 'react';
import styles from './src/styles/index.module.scss';
import { TodosHeader } from './src/components/TodosHeader/TodosHeader';
import { TodoListTasksOutput } from './src/components/TodoListTasksOutput/TodoListTasksOutput';
import { Task } from './src/components/TodoListTasksOutput/TodoListTasksOutput';

const App: React.FC = () => {
  const [taskToUpdate, setTaskToUpdate] = useState<null | string>(null);
  const [isModalActive, setisModalActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAddNewTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsAlertOpen(true);
  };

  const handleCloseModa = () => {
    setisModalActive(false);
  };

  const hadleCloseAddTaskAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className={styles.App}>
      <TodosHeader />
      <TodoListTasksOutput />
    </div>
  );
};

export default App;
