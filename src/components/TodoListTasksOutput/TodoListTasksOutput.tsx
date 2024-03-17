import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import styles from './TodoListTasksOutput.module.scss';
import DeleteTaskImage from '../../../public/Img/DeleteTaskImage';
import { SuccessAddedTaskModal } from '../SuccessAddedTaskModal/SuccessAddedTaskModal';
import ToggleDelete from '../ToggleDeleteAllTask/ToggleDeleteAllTask';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store';
import { ADD_TASK, DELETE_TASK } from '../../redux/Actions/actions';
import { deleteTaskAction } from '../../redux/Actions/actions';
import SortTodosListButton from '../SortTodosListButton/SortTodosListButton';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export const TodoListTasksOutput: React.FC = () => {
  const [modalTasks, setModalTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [taskEditValue, setTaskEditValue] = useState('');
  const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
  const [isEditModalConfirmOpen, setIsEditConfirmOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setModalTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(modalTasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [modalTasks, deletedTasks]);

  useEffect(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      try {
        const parsedTasks = JSON.parse(savedCompletedTasks) as Task[];

        setModalTasks((prevTasks) => {
          return prevTasks.map((task) => {
            const completedTask = parsedTasks.find((t) => t.id === task.id);
            if (completedTask) {
              return { ...task, isCompleted: true };
            }
            return task;
          });
        });
      } catch (error) {
        console.error(
          'Ошибка при загрузке выполненных задач из localStorage:',
          error,
        );
      }
    }
  }, [dispatch]);

  const updateTaskDetails = (task: Task, newTask: string) => {
    const index = modalTasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      const updatedTasks = modalTasks.map((task, i) =>
        i === index ? { ...task, text: newTask } : task,
      );
      setModalTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const handleAddTask = (taskText: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text: taskText,
      isCompleted: false,
    };
    dispatch({ type: ADD_TASK, payload: newTask });

    setModalTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setAlertMessage(`Задача "${taskText}" добавлена`);
    setIsAlertOpen(true);
    setIsModalOpen(false);
  };

  const handleToggleVisiblityModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const saveCompletedTasksToLocalStorage = (completedTasks: Task[]) => {
    try {
      const serializedTasks = JSON.stringify(completedTasks);
      localStorage.setItem('completedTasks', serializedTasks);
    } catch (error) {
      console.error(
        'Ошибка при сохранении выполненных задач в localStorage:',
        error,
      );
    }
  };

  const handleCheckboxChange = (index: number, task: Task) => {
    setModalTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((t, i) =>
        i === index ? { ...t, isCompleted: !t.isCompleted } : t,
      );
      const completedTasks = updatedTasks.filter((task) => task.isCompleted);
      saveCompletedTasksToLocalStorage(completedTasks);
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskAction(taskId));

    setModalTasks((prevTasks) => {
      const taskToDelete = prevTasks.find((task) => task.id === taskId);
      if (taskToDelete) {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        setDeletedTasks((deletedTasks) => [...deletedTasks, taskToDelete]);
        localStorage.setItem(
          'deletedTasks',
          JSON.stringify([...deletedTasks, taskToDelete]),
        );
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  const deleteAllTasks = () => {
    setModalTasks([]);
    setDeletedTasks([]);
    localStorage.clear();
  };

  const allTasks = [...modalTasks, ...deletedTasks];

  const sortTasks = (
    order: 'asc' | 'desc',
    filter?: 'all' | 'complete' | 'incomplete',
  ) => {
    let sortedTasks = [...modalTasks];
    if (filter) {
      if (filter === 'complete') {
        sortedTasks = sortedTasks.filter((task) => task.isCompleted);
      } else if (filter === 'incomplete') {
        sortedTasks = sortedTasks.filter((task) => !task.isCompleted);
      }
    }
    sortedTasks.sort((a, b) => {
      if (order === 'asc') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
    setModalTasks(sortedTasks);
  };

  const handleOpenEditConfirmModal = () => {
    setIsEditConfirmOpen(true);
  };

  const handleConfirmModalEdit = () => {
    if (activeTaskIndex !== null && taskEditValue) {
      const taskToUpdate = modalTasks[activeTaskIndex];
      updateTaskDetails(taskToUpdate, taskEditValue);
      setActiveTaskIndex(null);
      setTaskEditValue('');
      setIsEditConfirmOpen(false);
    }
  };

  return (
    <div className={styles.content}>
      <SortTodosListButton onSortChange={sortTasks} />
      <div className={styles.alertContainer}>
        {isAlertOpen && (
          <SuccessAddedTaskModal
            message={alertMessage}
            isOpen={isAlertOpen}
            closeAlert={() => setIsAlertOpen(false)}
          />
        )}
      </div>
      {isModalOpen && (
        <Modal
          onNewTask={handleAddTask}
          closeModal={handleToggleVisiblityModal}
        />
      )}
      <button
        className={styles.toggleModal}
        onClick={handleToggleVisiblityModal}
      ></button>
      <div className={styles.wrapper}>
        <div className={styles.okno}>
          <div>
            {modalTasks.map((task, index) => (
              <div key={task.id} className={styles.taskItem}>
                <input
                  type='checkbox'
                  className={styles.inputCheckbox}
                  checked={task.isCompleted}
                  onChange={() => handleCheckboxChange(index, task)}
                />
                {activeTaskIndex === index ? (
                  <div className={styles.flexСonteiner}>
                    <input
                      className={styles.inputEditTasK}
                      type='text'
                      value={taskEditValue}
                      onChange={(e) => setTaskEditValue(e.target.value)}
                      onBlur={handleOpenEditConfirmModal}
                      autoFocus
                    />
                    <button
                      className={styles.confirmButton}
                      onClick={handleConfirmModalEdit}
                    >
                      Подтвердить
                    </button>
                  </div>
                ) : (
                  <div
                    className={`${styles.taskText} ${task.isCompleted ? styles.completedTask : ''}`}
                  >
                    {task.text}
                  </div>
                )}
                <div
                  className={styles.deleteTaskContainer}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <button
                    className={styles.editButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      setTaskEditValue(task.text);
                      setActiveTaskIndex(index);
                    }}
                  ></button>
                  <DeleteTaskImage className={styles.deleteTask} />
                </div>
              </div>
            ))}
          </div>
          <ToggleDelete onDelete={deleteAllTasks} className={styles.knopka} />
        </div>
      </div>
      <div className={styles.tabTaska}>
        <p className={styles.taskItem}>
          Общие колличество задач: {modalTasks.length}
        </p>
        <p className={styles.taskItem}>
          Активные задачи:{' '}
          {modalTasks.filter((task) => !task.isCompleted).length}
        </p>
        <p className={styles.taskItem}>
          Выполненые задачи:{' '}
          {modalTasks.filter((task) => task.isCompleted).length}
        </p>
      </div>
    </div>
  );
};
