import React, { useState } from "react";
import styles from "./Task.module.scss";

interface Task {
  id: string;
  text: string;
}

type OnEditComplete = (newTaskText: string) => void;

export const Task: React.FC<{
  task: Task;
  onEditComplete: OnEditComplete;
}> = ({ task, onEditComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onEditComplete(editValue);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEditClick}>{task.text}</div>
      )}
    </div>
  );
};
