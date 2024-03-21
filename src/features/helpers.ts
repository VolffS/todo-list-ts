import {FilterEnum} from "../assets/filter-enum.ts";
import {Task} from "../type/task.ts";

export function statusInClassTask(status: string) {
    switch (status) {

        case FilterEnum.noteWaiting:
            return  "bg-transparent";

        case FilterEnum.noteSuccess:
            return "text-bg-success";

        case FilterEnum.noteNotSuccess:
            return "text-bg-danger";

        default :
            return "bg-transparent";
    }
}
export function statusInText(status: string) {
    switch (status) {

        case FilterEnum.noteWaiting:
            return  "Ожидает";

        case FilterEnum.noteSuccess:
            return "Выполнено";

        case FilterEnum.noteNotSuccess:
            return "Не выполнено";

        default :
            return "Не найдено";
    }
}

export function checkInputFull(element: HTMLInputElement| HTMLTextAreaElement) {
    return  element.checkValidity()
}

export function filterByStatus(tasks: Array<Task>, filter: string) {

    if (filter !== "") {
        let sortToDoList = tasks.slice();
        sortToDoList = sortToDoList.filter((element)=>{
            return element.status === filter;
        });

        return sortToDoList
    }

    return tasks;
}
