import {Task} from "./task.ts";

export interface ToDoList {
    tasks: Array<Task>,
    filterTasks: Array<Task>,
    selectTasksId: Array<number>,
    filter: string
}