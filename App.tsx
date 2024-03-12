import React, { useState } from "react";
import styles from "./src/styles/index.module.scss";
import { Header } from "./src/components/Header/header";
import { TasksOutput } from "./src/components/TasksOutput/TasksOutput";

const App: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleNewTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsAlertOpen(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className={styles.App}>
      <Header />
      <TasksOutput />
    </div>
  );
};

export default App;
