import { useAppDispatch } from "../../../REDUX/Hook/useStore";
import { File_ChatOwnUser } from "../../Type.d/Interfaces";

interface Props {
    index: number,
    value: File_ChatOwnUser['value']
}

const AudFileInput: React.FC<Props> = ({ index, value }) => {

    const dispatch = useAppDispatch()

    return (<li>
        <button
            type="button"
            onClick={() => {
                dispatch({
                    type: 'temporaryChatOwnUserSlice/removedInputChat',
                    payload: index
                });
            }}
        >
            X
        </button>
        <audio src={value} controls />
    </li>)
}

export default AudFileInput;