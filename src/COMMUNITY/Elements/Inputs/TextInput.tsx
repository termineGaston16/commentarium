import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { Text_ChatOwnUser } from "../../Type.d/Interfaces"

interface Props {
    index: number,
    value: Text_ChatOwnUser['value']
}

const TextInput: React.FC<Props> = ({ value, index }) => {

    const dispatch = useAppDispatch()

    return (<li className="user-chat__item">
        <input type="text" value={value} onChange={(e) => {
            dispatch({
                type: 'temporaryChatOwnUserSlice/modifyValueInput', payload:
                    { index: index, newValue: e.target.value}
            })
        }} />

        <button type="button" onClick={() => {
            dispatch({ type: 'temporaryChatOwnUserSlice/removedInputChat', payload: index })
        }}>X</button>
    </li>)
}

export default TextInput