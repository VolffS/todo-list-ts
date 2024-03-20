import {statusInText} from "../features/helpers";
import {MouseEvent} from "react";

export const ButtonStatus = ({status, changeState}: {
    status: string,
    changeState: (ev: MouseEvent<HTMLButtonElement>) => void
}) => {
    return <button className="dropdown-item text-black" value={status}
                   onClick={changeState}>{statusInText(status)}</button>
}