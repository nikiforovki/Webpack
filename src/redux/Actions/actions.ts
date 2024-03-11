

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

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

export type TaskActionTypes = AddTaskAction | DeleteTaskAction | UpdateTaskAction;

export const deleteTaskAction = (taskId: string): DeleteTaskAction => ({
    type: 'DELETE_TASK',
    payload: taskId,
});



