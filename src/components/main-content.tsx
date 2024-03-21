import {createRef, RefObject, useRef} from "react";
import {MiniSpinner} from "./spiner";
import {ChoiceToDelete} from './choiceToDelete';
import {SelectFilter} from "./selectFilter.tsx";
import {DropdownButtonDelete} from "./dropdownButtonDelete";
import {ToDoList} from "./toDoList";
import {useGetTasksQuery} from "../api/api.ts";
import {useAddTaskMutation, useDeleteTaskMutation} from "../api/tasks-api.ts";
import {Task} from "../type/task.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {useActions} from "../hooks/use-actions.ts";
export const MainContent = () => {
    const {data: tasks} = useGetTasksQuery();
    const {isSelectingDelete}  = useSelector((state: RootState) => state.stateToDoList)
    const {toggleIsSelectingDelete} = useActions();
    const [addTask, {isLoading: isSuccessAdd}] = useAddTaskMutation();
    const [deleteTask, {isLoading: isLoadedDelete}] = useDeleteTaskMutation();

    const selectedTask = useRef<Array<string>>([]);
    const inputRef: RefObject<HTMLInputElement> = createRef();

    function addBtnTask() {
        if (inputRef.current !== null) {
            let task = {
                _id: "",
                task: `${inputRef.current.value}`,
                status: "noteWaiting"
            }
            inputRef.current.value = "";

            addTask(task)
        }
    }

    function deleteAllTask() {
        deleteTask([]);
    }
    function cancelDelete() {
        selectedTask.current = [];
        toggleIsSelectingDelete();
    }

    function submitSelectedDelete() {
        if (selectedTask.current.length !== 0) {
            deleteTask(selectedTask.current)
            cancelDelete()
        }
    }

    function deleteTaskByStatus(status: string) {
        let deletedTasks = tasks.filter((task: Task) => task.status === status).map((task: Task) => task._id);
        deletedTasks.length !== 0 && deleteTask(deletedTasks)
    }

    function addSelectTask(id: string, element: HTMLInputElement) {
        let ids = selectedTask.current;

        if (element.checked) {
            ids.push(id);
        } else {
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === id) {
                    ids.splice(i, 1);
                }
            }
        }

        selectedTask.current = ids;
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
                            onClick={addBtnTask}> {isSuccessAdd ? <MiniSpinner/> : "Добавить"}
                    </button>
                </div>
                <div className="mb-1  form-floating d-grid  d-md-flex justify-content-md-end">
                    <div className="col-md-3 me-2 rounded-start">
                        <SelectFilter />
                    </div>
                    <div className="btn-group ">
                        <DropdownButtonDelete deleteAllTask={deleteAllTask}
                                              isLoadedDelete={isLoadedDelete}
                                              deleteTaskByStatus={deleteTaskByStatus}/>
                    </div>
                </div>
                {isSelectingDelete && <ChoiceToDelete cancelDelete={cancelDelete} submitDelete={submitSelectedDelete}/>}
            </div>
            <ToDoList addSelectTask={addSelectTask} />
        </main>
    );
}