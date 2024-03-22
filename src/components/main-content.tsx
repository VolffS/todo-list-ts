import {createRef, RefObject, useRef} from "react";
import {MiniSpinner} from "./spiner";
import {ChoiceToDelete} from './choiceToDelete';
import {SelectFilter} from "./selectFilter.tsx";
import {DropdownButtonDelete} from "./dropdownButtonDelete";
import {ToDoList} from "./toDoList";
import {useGetTasksQuery} from "../api/tasks-api.ts";
import {useAddTaskMutation, useDeleteTaskMutation} from "../api/tasks-api.ts";
import {Task} from "../type/task.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {useActions} from "../hooks/use-actions.ts";
import {toast} from "react-toastify";

export const MainContent = () => {
    const {data: tasks} = useGetTasksQuery();
    const {isSelectingTasks}  = useSelector((state: RootState) => state.stateToDoList)
    const {toggleIsSelectingDelete} = useActions();
    const [addTask, {isLoading: isLoadedAdd}] = useAddTaskMutation();
    const [deleteTask, {isLoading: isLoadedDelete}] = useDeleteTaskMutation();

    const selectedTasks = useRef<Array<string>>([]);
    const inputRef: RefObject<HTMLInputElement> = createRef();

    function addTaskHandler() {
        if (inputRef.current !== null) {
            const task = {
                _id: "",
                task: `${inputRef.current.value}`,
                status: "noteWaiting"
            }
            inputRef.current.value = "";

            addTask(task)
                .unwrap()
                .catch((error)=> (toast.error(`${error.status}`)));
        }
    }

    function deleteAllTasks() {
        deleteTask([])
            .unwrap()
            .catch((error)=> (toast.error(`${error.status}`)));;
    }
    function cancelDelete() {
        selectedTasks.current = [];
        toggleIsSelectingDelete();
    }

    function submitSelectedDelete() {
        if (selectedTasks.current.length !== 0) {
            deleteTask(selectedTasks.current)
                .unwrap()
                .catch((error)=> (toast.error(`${error.status}`)));
            cancelDelete()
        }
    }

    function deleteTasksByStatus(status: string) {
        const deletedTasks = tasks.filter((task: Task) => task.status === status).map((task: Task) => task._id);
        deletedTasks.length !== 0 && deleteTask(deletedTasks)
    }

    function addSelectTask(id: string, element: HTMLInputElement) {
        const ids = selectedTasks.current;

        if (element.checked) {
            ids.push(id);
        } else {
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === id) {
                    ids.splice(i, 1);
                }
            }
        }

        selectedTasks.current = ids;
    }

    return (
        <main className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <div className="mb-2  input-group">
                    <input type="text" ref={inputRef} className="form-control" id="recording-task" name="note"
                           placeholder="Запись"
                           required
                    />
                    <button type="submit" className="btn btn-success " id="btn-add-note"
                            onClick={addTaskHandler} disabled={isLoadedAdd}> {isLoadedAdd ? <MiniSpinner/> : "Добавить"}
                    </button>
                </div>
                <div className="mb-1  form-floating d-grid  d-md-flex justify-content-md-end">
                    <div className="col-md-3 me-2 rounded-start">
                        <SelectFilter />
                    </div>
                    <div className="btn-group ">
                        <DropdownButtonDelete deleteAllTasks={deleteAllTasks}
                                              isLoadedDelete={isLoadedDelete}
                                              deleteTasksByStatus={deleteTasksByStatus}/>
                    </div>
                </div>
                {isSelectingTasks && <ChoiceToDelete cancelDelete={cancelDelete} submitDelete={submitSelectedDelete}/>}
            </div>
            <ToDoList addSelectTask={addSelectTask} />
        </main>
    );
}