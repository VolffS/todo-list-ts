import {ButtonDelete} from "./buttonDelete.js";
import {MiniSpinner} from "./spiner.tsx";
import {useActions} from "../hooks/use-actions.ts";

interface DropdownButtonDelete {
    deleteAllTasks: () => void,
    deleteTasksByStatus: (status: string) => void,
    isLoadedDelete: boolean
}

export function DropdownButtonDelete({deleteAllTasks, deleteTasksByStatus, isLoadedDelete}: DropdownButtonDelete) {
    const {toggleIsSelectingDelete} = useActions();

    return (<>
        <button type="button"
                className="btn btn-outline-danger dropdown-toggle rounded-bottom d-flex justify-content-center align-items-center"
                data-bs-toggle="dropdown" aria-expanded="false" disabled={isLoadedDelete}>
            {isLoadedDelete ? <MiniSpinner/> : "Удаление"}
        </button>
        <ul id="main-delete" className="dropdown-menu bg-secondary-subtle ">
            <ButtonDelete text={"Все"} onBtnClick={deleteAllTasks}/>
            <ButtonDelete text={"Выбрать"} onBtnClick={() => toggleIsSelectingDelete()}/>
            <ButtonDelete text={"Все выполненные"} onBtnClick={() => deleteTasksByStatus("noteSuccess")}/>
            <ButtonDelete text={"Все не выполненные"} onBtnClick={() => deleteTasksByStatus("noteNotSuccess")}/>
        </ul>
    </>);
}