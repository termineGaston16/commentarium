import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../REDUX/Hook/useStore";
import { UserContact } from "../UserContact";

interface Props {
    index: number,
    value: UserContact,
    canBeDeleted: boolean
}

const UserFileInput: React.FC<Props> = ({ index, value, canBeDeleted }) => {

    const dispatch = useAppDispatch()

    return (<div>
        {canBeDeleted && <button
            type="button"
            onClick={() => {
                dispatch({
                    type: 'temporaryChatOwnUserSlice/removedInputChat',
                    payload: index
                });
            }}
        >
            X
        </button>}
        <img src={(value.avatar as unknown as string) || ""} alt={`Avatar del usuario ${value.displayName}`} />
        <span>@{value.displayName}</span>
        <Link target="_blank" to={`/perfil/${value.displayName}`}>Visitar perfil</Link>
    </div>)
}

export default UserFileInput;