import {MouseEvent} from "react";
import {statusInClassTask} from "../features/helpers";
import {ButtonStatus} from "./buttonStatus.js";
import {Task} from "../type/task.ts";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "../api/tasks-api.ts";
import {MiniSpinner} from "./spiner.tsx";

export function StaticTask({infoTask, stateWideTask, onClickSwitchModify}: {
    infoTask: Task,
    stateWideTask: boolean,
    onClickSwitchModify: () => void
}) {
    const {_id, task, status}: Task = infoTask;
    let statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClassTask(status)}`;
    const [updateTask, {isLoading: isSuccessUpdate}] = useUpdateTaskMutation();
    const [deleteTask, {isLoading: isSuccessDelete}] = useDeleteTaskMutation();

    const changeState = (ev: MouseEvent<HTMLButtonElement>): void => {
        let changeStateTask: Task = {
            _id: _id,
            task: task,
            status: ev.currentTarget.value,
        };
        updateTask(changeStateTask);
    }

    return (<>
        <div className="flex-grow-1">
            <p className={statusClass}>{task}</p>
        </div>
        <div className="ps-2 d-flex align-items-center">
            <div className="mb-1">
                <button type="button"
                        className="btn btn-primary dropdown-toggle rounded-bottom d-flex justify-content-center align-items-center"
                        value={status}
                        data-bs-toggle="dropdown" aria-expanded="false" disabled={isSuccessUpdate}>
                    {isSuccessUpdate ? <MiniSpinner/> : <StatusNote/>}

                </button>
                <ul className="dropdown-menu bg-secondary-subtle status-task position-fixed">
                    <ButtonStatus status={"noteWaiting"} changeState={changeState}/>
                    <ButtonStatus status={"noteSuccess"} changeState={changeState}/>
                    <ButtonStatus status={"noteNotSuccess"} changeState={changeState}/>
                </ul>
            </div>
            <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end"
                 style={stateWideTask ? {'flexWrap': "wrap"} : {}}>
                <button type="button" className="btn btn-primary mb-1 ms-1 btn-modify" onClick={onClickSwitchModify}>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#change-field"></use>
                    </svg>
                </button>
                <button type="button" className="btn btn-outline-danger mb-1 ms-1 btn-delete"
                        onClick={() => deleteTask([_id])}
                >
                    {isSuccessDelete ? <MiniSpinner/> : <TrashSvg/>}
                </button>
            </div>
        </div>
    </>);
}

const TrashSvg = () => {
    return (
        <svg viewBox="0 0 16 16" width="16" height="16">
            <use href="#delete-trash"></use>
        </svg>
    );
}
const StatusNote = () => {
    return (
        <svg viewBox="0 0 16 16" width="16" height="16" style={{"margin": "4px 0px"}}>
            <use href="#status-note"></use>
        </svg>
    );
}