import {Spinner} from "./spiner";
import {Deal} from "./deal.tsx";
import {Task} from "../type/task.ts";
import {useGetTasksQuery} from "../api/tasks-api.ts";
import {useMemo} from "react";
import {filterByStatus} from "../features/helpers.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

interface ToDoList {
    addSelectTask: (id: string, element: HTMLInputElement) => void
}

export const ToDoList = ({addSelectTask}: ToDoList) => {
    const {data: tasks, isLoading} = useGetTasksQuery();
    const {filter} = useSelector((state: RootState) => state.stateToDoList)

    const visibleTask = useMemo(
        () => filterByStatus(tasks, filter),
        [tasks, filter]
    );

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <ul className="list-group">
                {isLoading && <Spinner/>}
                {!isLoading && visibleTask.map((task: Task) => <Deal key={task._id.toString()} value={task}
                                                                     addSelectTask={addSelectTask}
                />)}
            </ul>
        </div>
    );
}