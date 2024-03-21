import {ChangeEvent} from "react";

export function DeleteCheckBox({onToggleTask}: {onToggleTask:(ev: ChangeEvent<HTMLInputElement>)=>void}) {
    return (
        <input type="checkbox" className="me-2" onChange={(ev) => {
            onToggleTask(ev)
        }}/>
    );
}