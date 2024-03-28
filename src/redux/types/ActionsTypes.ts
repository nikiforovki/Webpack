import {
  AddTaskAction,
  DeleteTaskAction,
  UpdateTaskAction,
} from '../Actions/actions';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export type TaskActionTypes =
  | AddTaskAction
  | DeleteTaskAction
  | UpdateTaskAction;
