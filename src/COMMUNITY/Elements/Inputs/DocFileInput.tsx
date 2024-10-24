import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { File_ChatOwnUser } from "../../Type.d/Interfaces"

interface Props {
    index: number,
    value: File_ChatOwnUser
}

const DocFileInput: React.FC<Props> = ({ index, value }) => {

    const dispatch = useAppDispatch()

    return (
        <li>
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
            <object data={value.value} type={value.data.type} width="300" height="500">
                <p>Tu navegador no puede mostrar el ARCHIVO. <a href={value.value}>Descargar</a>.</p>
            </object>
        </li>
    )
}

export default DocFileInput;

