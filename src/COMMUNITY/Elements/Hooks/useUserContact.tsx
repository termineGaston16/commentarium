import { USERS } from "../../../dataLocal"
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { User } from "../../../REDUX/Type.d/Interfaces"

export const useUserContact = () => {

    const dispatch = useAppDispatch()

    // OBTENER PERFILES
    const getProfiles = (query: string): {
        displayName: User['displayName'],
        avatar: User['profilePictureUrl']
    }[] => {
        if (query.length < 1) return []

        return USERS
            .filter(user => user.displayName.includes(query))
            .map(user => ({
                displayName: user.displayName,
                avatar: user.profilePictureUrl
            }))
    }

    // AGREGAR INPUT
    const addInput = (type: string, object: object, click: React.Dispatch<React.SetStateAction<boolean>>) => {
        dispatch({ type: type, payload: object })
        click(false)
    }

    return { getProfiles, addInput }
}
