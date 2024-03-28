import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import styles from './TodoList.module.scss';
import TaskDeletionIcon from '../../../public/Img/TaskDeletionIcon';
import { SuccessAddedTaskModal } from '../SuccessAddedTaskModal/SuccessAddedTaskModal';
import DeleteAllTasksButton from '../DeleteAllTasksButton/DeleteAllTasksButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store';
import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from '../../redux/types/ActionsTypes';
import { deleteTaskAction } from '../../redux/Actions/actions';
import SortTodosListButton from '../SortTodosListButton/SortTodosListButton';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './TaskTypes';
import { useLocalStorage } from '../../local-storage/useLocalStorage';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const TASKS_KEY = 'tasks';
  const COMPLETED_TASKS_KEY = 'completedTasks';
  const DELETED_TASKS_KEY = 'deletedTasks';

  const [modalTasks, setModalTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);
  const [completedTasks, setCompletedTasks] = useLocalStorage<Task[]>(
    COMPLETED_TASKS_KEY,
    [],
  );
  const [deletedTasks, setDeletedTasks] = useLocalStorage<Task[]>(
    DELETED_TASKS_KEY,
    [],
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [taskEditValue, setTaskEditValue] = useState('');
  const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
  const [isEditModalConfirmOpen, setIsEditConfirmOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_KEY);
    if (savedTasks) {
      setModalTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(modalTasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [modalTasks, deletedTasks]);

  useEffect(() => {
    const savedCompletedTasks = localStorage.getItem(COMPLETED_TASKS_KEY);
    if (savedCompletedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedCompletedTasks);

        setModalTasks((prevTasks: Task[]) => {
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
    const index = modalTasks.findIndex((t: Task) => t.id === task.id);
    if (index > -1) {
      const updatedTasks = modalTasks.map((task: Task, i: number) =>
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

    setModalTasks((prevTasks: Task[]) => {
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

  const handleTaskIsCompleted = (index: number, task: Task) => {
    setModalTasks((prevTasks: Task[]) => {
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

    setModalTasks((prevTasks: Task[]) => {
      const taskToDelete = prevTasks.find((task) => task.id === taskId);
      if (taskToDelete) {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        setDeletedTasks((deletedTasks: Task[]) => [
          ...deletedTasks,
          taskToDelete,
        ]);
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
    localStorage.removeItem('tasks');
    localStorage.removeItem(DELETED_TASKS_KEY);
    localStorage.removeItem(COMPLETED_TASKS_KEY);
  };

  const allTasks = [...modalTasks, ...deletedTasks];

  const sortTasksCompletedFirst = () => {
    const sortedTasks = [...modalTasks].sort((a, b) => {
      return Number(b.isCompleted) - Number(a.isCompleted);
    });

    setModalTasks(sortedTasks);
  };

  const sortTasksNotCompletedFirst = () => {
    const sortedTasks = [...modalTasks].sort((a, b) => {
      return Number(a.isCompleted) - Number(b.isCompleted);
    });

    setModalTasks(sortedTasks);
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
      <SortTodosListButton onSortChange={sortTasksCompletedFirst} />
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
          handleAddNewTask={handleAddTask}
          closeModal={handleToggleVisiblityModal}
        />
      )}
      <button
        className={styles.toggleModal}
        onClick={handleToggleVisiblityModal}
      ></button>
      <div className={styles.wrapper}>
        <div className={styles.taskList}>
          <div>
            {modalTasks.map((task: Task, index: number) => (
              <div key={task.id} className={styles.taskDisplays}>
                <input
                  type='checkbox'
                  className={styles.completeTaskCheckbox}
                  checked={task.isCompleted}
                  onChange={() => handleTaskIsCompleted(index, task)}
                />
                {activeTaskIndex === index ? (
                  <div className={styles.flexСonteiner}>
                    <input
                      className={styles.inputEditTask}
                      type='text'
                      value={taskEditValue}
                      onChange={(e) => setTaskEditValue(e.target.value)}
                      onBlur={sortTasksCompletedFirst}
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
                    className={classNames(styles.taskText, {
                      [styles.completedTaskMarkedWithLine]: task.isCompleted,
                    })}
                  >
                    {task.text}
                  </div>
                )}
                <div
                  className={styles.deleteTaskContainer}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <button
                    className={styles.editTaskButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      setTaskEditValue(task.text);
                      setActiveTaskIndex(index);
                    }}
                  ></button>
                  <TaskDeletionIcon className={styles.deleteTask} />
                </div>
              </div>
            ))}
          </div>
          <DeleteAllTasksButton
            onDeleteTask={deleteAllTasks}
            className={styles.deleteTaskButton}
          />
        </div>
      </div>
      <div className={styles.taskCounter}>
        <p className={styles.taskStatus}>
          Общие колличество задач: {modalTasks.length}
        </p>
        <p className={styles.taskStatus}>
          Активные задачи:{' '}
          {modalTasks.filter((task: Task) => !task.isCompleted).length}
        </p>
        <p className={styles.taskStatus}>
          Выполненые задачи:{' '}
          {modalTasks.filter((task: Task) => task.isCompleted).length}
        </p>
      </div>
    </div>
  );
};
