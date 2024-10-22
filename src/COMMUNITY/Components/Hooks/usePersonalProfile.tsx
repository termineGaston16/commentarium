import { useAppDispatch } from "../../../REDUX/Hook/useStore"

export const usePersonalProfile = () => {

    const dispatch = useAppDispatch()

    // VALIDAR DISPLAY NAME
    const validateDisplayName = (displayName: string): string | null => {
        const nameFiltered = displayName
            .trim()
            .replace(/\W/g, '')

        if (nameFiltered.length < 1) return '* Ingresa datos válidos.'
        return null;
    }

    // VALIDAR PASSWORLD
    const validatePassworld = (password: string): string | null => {
        const passwordFiltered = password
            .trim()
            .replace(/[^A-Za-z0-9! @ # $ % ^ & * ( ) _ + - = { } : ; " ' < > , .]/g, '')
        
        if (passwordFiltered.length < 1) return '* Ingresa datos válidos.'
        return null;
    }

    // VALIDAR DISPLAY NAME
    const validateLoginUser = (displayName: string, password: string) => {

        dispatch({
            type: 'ownUser/searchUserForLogin',
            payload: { displayName: displayName, password: password }
        })
    }

    return { validateDisplayName, validatePassworld, validateLoginUser }
}