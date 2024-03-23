import {createRef, RefObject} from "react";
import {checkInputValidity, getClassByStatus} from "../features/helpers";
import {useUpdateTaskMutation} from "../api/tasks-api.ts";
import {Spinner} from "./spiner.tsx";
import {Task} from "../type/task.ts";
import {PopUpMessage} from "./popup-message/popUpMessage.tsx";
import {toast} from "react-toastify";

interface ModifyTaskProps {
    value: Task,
    switchModify: () => void
}

export const ModifyTask = ({value, switchModify}: ModifyTaskProps) => {
    const {_id, task, status} = value;
    const statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${getClassByStatus(status)}`
    const textareaRef: RefObject<HTMLTextAreaElement> = createRef();

    const [updateTask, {isLoading: isLoadingUpdate, error}] = useUpdateTaskMutation();
    function successModify() {
        if (textareaRef.current !== null) {
            if (checkInputValidity(textareaRef.current)) {
                const task = {
                    _id: `${_id}`,
                    task: `${textareaRef.current.value}`,
                    status: `${status}`,
                }
                updateTask(task)
                    .unwrap()
                    .then(() => switchModify())
                    .catch((error)=> (toast.error(`${error.status}`)))
            }
        }
    }
    return (
        <>
            <div className="flex-grow-1">
                {isLoadingUpdate && <Spinner/>}
                {!isLoadingUpdate &&
                    <textarea className={statusClass} placeholder="Напиши своё дело"
                              ref={textareaRef}
                              required
                    >
                        {task}
                    </textarea>
                }
            </div>
            <div className="ps-2 d-flex align-items-center">
                <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end flex-wrap">
                    <div className="btn-group-vertical">
                        <button type="button" className="btn btn-success btn-modify-success"
                                onClick={successModify}>
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <use href="#change-field-success"></use>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-modify-cancel"
                                onClick={switchModify}>
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <use href="#change-field-cansel"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

