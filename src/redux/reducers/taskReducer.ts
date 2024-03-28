import { TaskState } from './types';
import {
  TaskActionTypes,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from '../types/ActionsTypes';

const initialState: TaskState = {
  tasks: [],
  deletedTasks: [],
  completedTasks: [],
};

export const taskReducer = (
  state = initialState,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case DELETE_TASK:
      const taskToDelete = state.tasks.find(
        (task) => task.id === action.payload,
      );
      if (taskToDelete) {
        const updatedTasks = state.tasks.filter(
          (task) => task.id !== action.payload,
        );

        const newDeletedTasks = [...state.deletedTasks, taskToDelete];
        return {
          ...state,
          tasks: updatedTasks,
          deletedTasks: newDeletedTasks,
        };
      }
      return state;

    case UPDATE_TASK:
      const newTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
      return {
        ...state,
        tasks: newTasks,
      };

    default:
      return state;
  }
};
