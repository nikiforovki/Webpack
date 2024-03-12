import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface InputProps {
  tasks?: Task[];
  onAddNewTask?: (taskText: string) => void;
  onSortChange?: (
    order: "asc" | "desc",
    filter?: "all" | "complete" | "incomplete"
  ) => void;
}

export const SearchInput: React.FC<InputProps> = ({ tasks, onSortChange }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]); // Изменено на string[]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleToggleIsCompletedTask = (taskId: string) => {
    setCompletedTasks((prevState) => {
      if (prevState.includes(taskId)) {
        return prevState.filter((item) => item !== taskId);
      } else {
        return [...prevState, taskId];
      }
    });
  };

  return (
    <div className={styles.inputButtonContainer}>
      <input
        className={styles.input}
        type="search"
        placeholder="Введите задачу..."
        value={inputValue}
        onChange={handleChange}
      />
      <div className={styles.buttonContainer}>
        <ToggleTheme />
      </div>
      <div className={styles.taskListContainer}>
        <ul>
          {Array.isArray(tasks) &&
            tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <li>{task.text}</li>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={completedTasks.includes(task.id)}
                  onChange={() => handleToggleIsCompletedTask(task.id)}
                />
                <span className={styles.taskText}>{task.text}</span>
                <hr className={styles.taskLine} />
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
