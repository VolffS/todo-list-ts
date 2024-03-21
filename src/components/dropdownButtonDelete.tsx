import {ButtonDelete} from "./buttonDelete.js";
import {MiniSpinner} from "./spiner.tsx";
import {useActions} from "../hooks/use-actions.ts";

export function DropdownButtonDelete({deleteAllTask, deleteTaskByStatus, isLoadedDelete}: {
    deleteAllTask: () => void,
    deleteTaskByStatus: (status: string) => void,
    isLoadedDelete: boolean
}) {
    const {toggleIsSelectingDelete} = useActions();

    return (<>
        <button type="button"
                className="btn btn-outline-danger dropdown-toggle rounded-bottom d-flex justify-content-center align-items-center"
                data-bs-toggle="dropdown" aria-expanded="false">
            {isLoadedDelete ? <MiniSpinner/> : "Удаление"}
        </button>
        <ul id="main-delete" className="dropdown-menu bg-secondary-subtle ">
            <ButtonDelete text={"Все"} onClickBtn={deleteAllTask}/>
            <ButtonDelete text={"Выбрать"} onClickBtn={() => toggleIsSelectingDelete()}/>
            <ButtonDelete text={"Все выполненные"} onClickBtn={() => deleteTaskByStatus("noteSuccess")}/>
            <ButtonDelete text={"Все не выполненные"} onClickBtn={() => deleteTaskByStatus("noteNotSuccess")}/>
        </ul>
    </>);
}