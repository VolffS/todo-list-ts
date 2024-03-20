import {ToDoList} from "../type/todo-list.ts";

export const initiationToDoList:ToDoList = {
    /**
     * @type {[{_id:"", task:"", status:"noteWaiting"}]}
     */
    tasks: [],
    filterTasks:[],
    selectTasksId: [],
    filter: ""
}