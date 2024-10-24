import React from "react";
import { File_ChatOwnUser } from "../../Type.d/Interfaces";
import { useAppDispatch } from "../../../REDUX/Hook/useStore";

interface Props {
    index: number,
    value: File_ChatOwnUser['linkUrl']
}

const ImgFileInput: React.FC<Props> = ({ index, value }) => {

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
        <img
            src={value}
            alt={`Imagen en la posición ${index} subida por el usuario.`}
            style={{ width: '100%' }}
        />
    </li>
    )
}


export default ImgFileInput;