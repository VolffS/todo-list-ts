export function SelectFilter({onChangeFilter}: { onChangeFilter: (status: string) => void }) {
    return (
        <select onChange={(ev) => {
            onChangeFilter(ev.target.value)
        }} className="form-select " id="sort-status">
            <option selected value="" disabled>Фильтр...</option>
            <option value="">Без фильтра</option>
            <option value="noteWaiting">Ожидающие</option>
            <option value="noteSuccess">Все выполненные</option>
            <option value="noteNotSuccess">Все не выполненные</option>
        </select>
    )
}