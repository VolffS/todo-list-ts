import {FilterEnum} from "../assets/filter-enum.ts";
import {Task} from "../type/task.ts";

export function getClassByStatus(status: string):string {
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
export function getRusTextByStatus(status: string):string {
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

export function checkInputValidity(element: HTMLInputElement| HTMLTextAreaElement) {
    return  element.checkValidity()
}

export function filterByStatus(tasks: Array<Task>, filter: string): Task[] {

    if (filter !== "") {
        let filterToDoList = tasks.slice();
        filterToDoList = filterToDoList.filter((element) => element.status === filter);

        return filterToDoList
    }

    return tasks;
}
