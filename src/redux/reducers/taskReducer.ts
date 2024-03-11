// reducers/taskReducer.ts
import { TaskActionTypes, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../Actions/actions';
// import { Task } from "../Actions/actions";

export interface Task {
    id: string;
    text: string;
    isCompleted: boolean;
}

export interface TaskState {
    tasks: Task[];
    deletedTasks: Task[]; // Убедитесь, что тип для deletedTasks корректно определен
    completedTasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
    deletedTasks: [],
    completedTasks: []
};

export const taskReducer = (state = initialState, action: TaskActionTypes): TaskState => {
    switch (action.type) {
        case ADD_TASK:
            // Убедитесь, что action.payload имеет тип Task
            return {
                ...state,
                tasks: [...state.tasks, action.payload as Task],
            };

        case DELETE_TASK:
            // Найти задачу для удаления
            const taskToDelete = state.tasks.find(task => task.id === action.payload);
            if (taskToDelete) {
                // Удалить задачу из основного списка задач
                const updatedTasks = state.tasks.filter(task => task.id !== action.payload);
                // Добавить удаленную задачу в список удаленных задач
                const updatedDeletedTasks = [...state.deletedTasks, taskToDelete];
                return {
                    ...state,
                    tasks: updatedTasks,
                    deletedTasks: updatedDeletedTasks,
                };
            }
            return state;
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        default:
            return state;
    }
};
