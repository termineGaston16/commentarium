import { useAppDispatch } from "../../../REDUX/Hook/useStore";
import { IconType } from "react-icons";

interface Props {
    t: string,
    Avatar: IconType,
    accept: string
}

const ButtonImgFileInput: React.FC<Props> = ({ t, Avatar, accept }) => {

    const dispatch = useAppDispatch()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dispatch({ type: 'temporaryChatOwnUserSlice/addInput', payload: { t: t, v: {
                    name: file.name,
                    size: (file.size/1024).toFixed(2),
                    type: file.type,
                    data: reader.result
                } } })
            }
            reader.onerror = () => {
                alert('Ocurrió un error al subir el archivo.')
            }
        }
    }

    return (<>
        <label htmlFor={`inputFile${t}`}
            className="user-chat__header__actions__btn">
            <Avatar />
        </label>
        <input type="file" id={`inputFile${t}`} accept={accept} hidden
            onChange={onChangeInput}
        />
    </>)
}

export default ButtonImgFileInput;