export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface TaskState {
  tasks: Task[];
  deletedTasks: Task[];
  completedTasks: Task[];
}
