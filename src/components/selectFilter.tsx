import {FilterEnum} from "../assets/filter-enum.ts";
import {useActions} from "../hooks/use-actions.ts";

export const SelectFilter = () => {
    const {changeFilter} = useActions();

    return (
        <select onChange={(ev) => {
            changeFilter(ev.target.value)
        }} className="form-select " id="sort-status">
            <option selected value="" disabled>Фильтр...</option>
            <option value={FilterEnum.none}>Без фильтра</option>
            <option value={FilterEnum.noteWaiting}>Ожидающие</option>
            <option value={FilterEnum.noteSuccess}>Все выполненные</option>
            <option value={FilterEnum.noteNotSuccess}>Все не выполненные</option>
        </select>
    )
}