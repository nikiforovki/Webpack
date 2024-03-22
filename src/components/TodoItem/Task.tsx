import React, { useState } from 'react';

interface Task {
  id: string;
  text: string;
}

type Props = {
  task: Task;
  onEditComplete: (newTaskText: string) => void;
};

export const Task: React.FC<Props> = ({ task, onEditComplete }) => {
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
          type='text'
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
