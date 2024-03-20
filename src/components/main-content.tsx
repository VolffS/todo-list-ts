import {createRef, useEffect, useState} from "react";
import {initiationToDoList} from "../assets/initiation-todo-list.ts";
import {MiniSpinner} from "./spiner";
import {ChoiceToDelete} from './choiceToDelete';
import {SelectFilter} from "./selectFilter.tsx";
import {
    getToDoListToServer,
    requestToServerAdd,
    requestToServerDelete,
    requestToServerPut
} from "../features/interaction-with-server";
import {filterByStatus} from "../features/helpers"
import {changeStatusTask} from '../features/crud';
import {DropdownButtonDelete} from "./dropdownButtonDelete";
import {ToDoList} from "./toDoList";

export const MainContent = () => {
    const [stateToDoList, setToDoList] = useState(initiationToDoList);
    const [stateIsLoad, setIsLoad] = useState(true);
    const [stateIsAdd, setIsAdd] = useState(false);

    const [stateSelectingWhatDelete, setSelectingWhatDelete] = useState(false);
    const inputRef = createRef();

    function freshStateToDoList() {
        getToDoListToServer().then(tasks => {
            if (stateToDoList.filter !== "") {
                setToDoList(prevState => ({
                    ...prevState,
                    tasks: tasks,
                    filterTasks: filterByStatus(tasks, stateToDoList.filter)
                }))
            } else {
                setToDoList(prevState => ({
                    ...prevState,
                    tasks: tasks,
                    filterTasks: tasks
                }))
            }
        }).finally(() => setIsLoad(false));
    }

    useEffect(() => {
        freshStateToDoList()
    }, []);

    function addBtnTask() {
        setIsAdd(true);
        let task = {
            task: `${inputRef.current.value}`,
            status: "noteWaiting"
        }
        inputRef.current.value = "";

        requestToServerAdd(task).finally(() => {
            freshStateToDoList();
            setIsAdd(false)
        });
    }

    function deleteBtnTask(id) {
        let prevSelectTasksId = stateToDoList.selectTasksId;
        stateToDoList.selectTasksId = id;

        requestToServerDelete(id).finally(() => {
            stateToDoList.selectTasksId = prevSelectTasksId;
            freshStateToDoList()
        });
    }

    function modifyBtnTask(task) {
        requestToServerPut(task).finally(() => {
            freshStateToDoList()
        });
    }

    function changeStatus(status, id) {
        stateToDoList.tasks = changeStatusTask(stateToDoList.tasks, status, id)
        if (stateToDoList.filter !== "") {
            setToDoList(prevState => ({
                ...prevState,
                tasks: changeStatusTask(stateToDoList.tasks, status, id)
            }))
        }
    }

    function filterTask(status:string):void {
        setToDoList(prevState => ({
            ...prevState,
            filterTasks: filterByStatus(prevState.tasks, status),
            filter: status
        }));
    }

    function cancelDelete() {
        stateToDoList.selectTasksId = [];
        setSelectingWhatDelete(false);
    }

    function submitDelete() {
        if (stateToDoList.selectTasksId.length !== 0) {
            let temp = stateToDoList.selectTasksId
            stateToDoList.selectTasksId = []
            deleteBtnTask(temp)
        }
    }

    function deleteTaskByStatus(status) {
        let deletedTasks = stateToDoList.tasks.filter(task => task.status === status).map(task => task._id);

        if (deletedTasks.length !== 0) {
            requestToServerDelete(deletedTasks).finally(() => {
                freshStateToDoList()
            });
        }
    }

    function addSelectTask(id, element) {
        let ids = stateToDoList.selectTasksId;

        if (element.checked) {
            ids.push(id);
        } else {
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === id) {
                    ids.splice(i, 1);
                }
            }
        }

        stateToDoList.selectTasksId = ids;
    }


    return (
        <main className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <div className="mb-2  input-group">
                    <input type="text" ref={inputRef} className="form-control" id="recording-task" name="note"
                           placeholder="Запись"
                           required/>
                    <button type="submit" className="btn btn-success " id="btn-add-note"
                            onClick={addBtnTask}> {stateIsAdd ? <MiniSpinner/> : "Добавить"}
                    </button>
                </div>
                <div className="mb-1  form-floating d-grid  d-md-flex justify-content-md-end">
                    <div className="col-md-3 me-2 rounded-start">
                        <SelectFilter callback={filterTask}/>
                    </div>
                    <div className="btn-group ">
                        <DropdownButtonDelete deleteBtnTask={deleteBtnTask}
                                              setSelectingWhatDelete={setSelectingWhatDelete}
                                              deleteTaskByStatus={deleteTaskByStatus}/>
                    </div>
                </div>
                {stateSelectingWhatDelete && <ChoiceToDelete cancelDelete={cancelDelete} submitDelete={submitDelete}/>}
            </div>
            {<ToDoList tasks={stateToDoList.filterTasks} isLoaded={stateIsLoad}
                       stateSelectingWhatDelete={stateSelectingWhatDelete}
                       deleteBtnTask={deleteBtnTask}
                       changeStatus={changeStatus}
                       addSelectTask={addSelectTask}
                       modifyBtnTask={modifyBtnTask}
            />}
        </main>
    );
}