import { ADD_TASK } from '../types/ActionsTypes';
import { DELETE_TASK } from '../types/ActionsTypes';
import { UPDATE_TASK } from '../types/ActionsTypes';

export interface Task {
  id: string;
}

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: string;
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

export const deleteTaskAction = (taskId: string): DeleteTaskAction => ({
  type: typeof DELETE_TASK,
  payload: taskId,
});
