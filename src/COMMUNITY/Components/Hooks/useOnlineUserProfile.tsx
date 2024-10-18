import { useAppDispatch } from "../../../REDUX/Hook/useStore"

export const useOnlineUserProfile = () => {

    const dispatch = useAppDispatch()

    // VALIDAR QUERY DISPLAY NAME
    const validateQueryDisplayName = (displayName: string): string | null => {
        const queryFilter = displayName
            .trim()
            .toLocaleLowerCase()
            .replace(/\W/g, '')

        if(queryFilter.length < 1) return '* Ingrese un nombre válido.' 
        dispatch({type: 'userOnline/searchProfileByDisplayName', payload: queryFilter})
        return null

    }

    return {validateQueryDisplayName}
}