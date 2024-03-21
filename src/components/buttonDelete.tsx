export const ButtonDelete = ({text, onClickBtn}: { text: string, onClickBtn: () => void }) => {
    return (
        <li>
            <button className="dropdown-item text-black" onClick={onClickBtn}>
                <strong>{text}</strong>
            </button>
        </li>
    );
}