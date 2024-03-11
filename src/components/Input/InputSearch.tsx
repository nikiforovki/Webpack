import React, { useState } from 'react';
import styles from './InputSearch.module.scss';
import DarkMode from "../DarkMode/DarkMode";

interface Task {
    id: string;
    text: string;
    isCompleted: boolean;
}

interface InputProps {
    tasks: Task[];
    modalTasks: Task[];
    onNewTask: (task: string) => void;
    onSortChange: (order: 'asc' | 'desc', filter?: 'all' | 'complete' | 'incomplete') => void;
}


export const InputSearch: React.FC<InputProps> = ({ tasks, modalTasks, onNewTask, onSortChange }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (taskId: number) => {
        setCompletedTasks(prevState => {
            if (prevState.includes(taskId)) {
                return prevState.filter(item => item !== taskId);
            } else {
                return [...prevState, taskId];
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newTask = inputValue;
            setInputValue('');
            if (onNewTask) {
                onNewTask(newTask);
            }
        }
    };

    return (
        <div className={styles.inputButtonContainer}>
            <input
                className={styles.input}
                type="search"
                placeholder="Введите задачу..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <div className={styles.buttonContainer}>
                {/*<ButtonSort onSortChange={onSortChange} />*/}
                {/*<ButtonBgcolor/>*/}
                <DarkMode />
            </div>
            <div className={styles.taskListContainer}>
                <ul>
                    {Array.isArray(tasks) && tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <li>{task.text}</li>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={completedTasks.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <span className={styles.taskText}>{task.text}</span>
                            <hr className={styles.taskLine}/>
                        </React.Fragment>
                    ))}
                </ul>
                <ul>
                    {Array.isArray(modalTasks) && modalTasks.map((task, index) => (
                        <li key={index}>{task.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InputSearch;


