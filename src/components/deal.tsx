import {ChangeEvent, MouseEvent, useState} from "react";
import {DeleteCheckBox} from "./deleteCheckBox.js";
import {ModifyTask} from "./modifyTask.js";
import {StaticTask} from "./staticTask.tsx";
import {Task} from "../type/task.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

interface Deal {
    value: Task,
    addSelectTask: (id: string, element: HTMLInputElement) => void
}

export const Deal = ({value, addSelectTask}: Deal) => {
    const {isSelectingTasks} = useSelector((state: RootState) => state.stateToDoList)
    const [isModifyTask, setIsModifyTask] = useState(false);
    const [isWideTask, setIsWideTask] = useState(false);
    const liClassName = `list-group-item list-group-item-action d-flex overflow-y-hidden justify-content-center ${isModifyTask ? "was-validated" : ""}`;

    function switchModify() {
        setIsModifyTask(!isModifyTask);
    }

    function toggleTaskWidth(event: MouseEvent<HTMLElement>) {
        const element = event.target;
        if (element instanceof Element) {
            if (element.nodeName !== "BUTTON" && element.nodeName !== "svg" && element.nodeName !== "use") {
                if (!isModifyTask) {
                    setIsWideTask(!isWideTask);
                }
            }
        }

    }

    return (
        <li id={value._id} className={liClassName} onClick={toggleTaskWidth}
                style={isModifyTask
                    ? {
                        "minHeight": "100px",
                        "maxHeight": " none"
                    }
                    : isWideTask ? {"maxHeight": "none"} : {}
                }
        >
            {isSelectingTasks && <DeleteCheckBox
                onToggleTask={(ev: ChangeEvent<HTMLInputElement>) => {
                    addSelectTask(value._id, ev.target)
                }}/>
            }
            {isModifyTask
                ? <ModifyTask value={value} switchModify={switchModify}/>
                : <StaticTask infoTask={value} onClickSwitchModify={switchModify} stateWideTask={isWideTask}/>
            }
        </li>
    );
}