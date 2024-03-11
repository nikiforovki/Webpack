import React from 'react';
import styles from './header.module.scss';
import InputSearch from "../Input/InputSearch";
import ToggleDeleteAllTask from "../ToggleDeleteAllTask/ToggleDeleteAllTask";


// Определение типа для пропсов компонента Header
interface HeaderProps {
    onDeleteAllTasks?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDeleteAllTasks }) => {
    const handleDeleteAll = () => {
        if (onDeleteAllTasks) {
            onDeleteAllTasks();
        } else {
            // Обработка случая, когда onDeleteAllTasks не предоставлен
        }
    };

    return (
        <div className={styles.headerContainer}>
            <h1>TODO LIST</h1>
            <InputSearch />
            {/*<ToggleDeleteAllTask onDelete={handleDeleteAll} />*/}

        </div>
    );
};



