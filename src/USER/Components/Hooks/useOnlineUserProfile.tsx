import { FaGenderless } from "react-icons/fa6"
import { IoIosMale, IoMdFemale } from "react-icons/io"
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { useNavigate } from "react-router-dom"

export const useOnlineUserProfile = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    //DECLARAR GÉNERO
    const declareGender = (gender: string) => {
        switch (gender) {
            case 'Indefinido':
                return <FaGenderless />

            case 'Femenino':
                return <IoMdFemale />

            case 'Masculino':
                return <IoIosMale />
            default:
                break;
        }
    }

    //LOG OUT
    const logOut = (type: string, object: object): void => {
        dispatch({ type: type, payload: object })
        navigate('/')
    }

    // VALIDAR QUERY DISPLAY NAME
    const validateQueryDisplayName = (displayName: string): string | null => {
        const queryFilter = displayName
            .trim()
            .replace(/\W/g, '')

        if(queryFilter.length < 1) return '* Ingrese un nombre válido.' 
        dispatch({type: 'userOnline/searchProfileByDisplayName', payload: queryFilter})
        return null

    }


    return { declareGender, logOut,validateQueryDisplayName }
}