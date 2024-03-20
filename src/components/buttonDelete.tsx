export const ButtonDelete = ({text, callback}: { text: string, callback: () => void }) => {
    return (
        <li>
            <button className="dropdown-item text-black" onClick={callback}>
                <strong>{text}</strong>
            </button>
        </li>
    );
}