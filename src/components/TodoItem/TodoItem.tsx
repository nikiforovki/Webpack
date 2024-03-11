import React, { useState } from 'react';
import styles from './TodoItem.module.scss';

export const TaskItem = ({ task, onEditComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.toString());

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setEditValue(event.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        onEditComplete(editValue); // Предполагается, что onEditComplete передается в пропсах
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
                <div onClick={handleEditClick}>{task}</div>
            )}
        </div>
    );
};

