export const ButtonDelete = ({text, onBtnClick}: { text: string, onBtnClick: () => void }) => {
    return (
        <li>
            <button className="dropdown-item text-black" onClick={onBtnClick}>
                <strong>{text}</strong>
            </button>
        </li>
    );
}