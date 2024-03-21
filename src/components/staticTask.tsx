import {MouseEvent} from "react";
import {statusInClass} from "../features/helpers.ts";
import {ButtonStatus} from "./buttonStatus.tsx";
import {Task} from "../type/task.ts";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "../api/tasks-api.ts";
import {MiniSpinner} from "./spiner.tsx";
import {StatusNoteSvg} from "./svg/statusNoteSvg.tsx";
import {ChangeFieldSvg} from "./svg/changeFieldSvg.tsx";
import {TrashSvg} from "./svg/trashSvg.tsx";

interface StaticTaskProps {
    infoTask: Task,
    stateWideTask: boolean,
    onClickSwitchModify: () => void
}

export function StaticTask({infoTask, stateWideTask, onClickSwitchModify}: Readonly<StaticTaskProps>) {
    const {_id, task, status}: Task = infoTask;
    const statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClass(status)}`;
    const [updateTask, {isLoading: isLoadingUpdate}] = useUpdateTaskMutation();
    const [deleteTask, {isLoading: isLoadingDelete}] = useDeleteTaskMutation();

    const changeState = (ev: MouseEvent<HTMLButtonElement>): void => {
        const changeStateTask: Task = {
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
                        data-bs-toggle="dropdown" aria-expanded="false" disabled={isLoadingUpdate}>
                    {isLoadingUpdate ? <MiniSpinner/> : <StatusNoteSvg/>}

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
                    <ChangeFieldSvg />
                </button>
                <button type="button" className="btn btn-outline-danger mb-1 ms-1 btn-delete"
                        onClick={() => deleteTask([_id])}
                        disabled={isLoadingDelete}
                >
                    {isLoadingDelete ? <MiniSpinner/> : <TrashSvg/>}
                </button>
            </div>
        </div>
    </>);
}

