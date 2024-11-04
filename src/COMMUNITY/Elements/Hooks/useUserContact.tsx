import { useState } from "react";
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { APIresponse, APIresponseDefault } from "../../Type.d/Interfaces"
import { debounce } from 'lodash';
import { getProfilesFirebase } from "../../../FIREBASE";

export const useUserContact = () => {

    const [usersContactsSearch, setUsersContactsSearch] = useState<APIresponse>(APIresponseDefault);
    const dispatch = useAppDispatch()


    // OBTENER RESULTADO DE LA API
    const handleSearchChange = debounce(async (query: string) => {
        setUsersContactsSearch((prev) => ({ ...prev, isLoading: true }));
        const result = await getProfilesFirebase(query);
        setUsersContactsSearch({
            data: result,
            isLoading: false,
        });
    }, 500);

    // AGREGAR INPUT
    const addInput = (type: string, object: object, click: React.Dispatch<React.SetStateAction<boolean>>) => {
        dispatch({ type: type, payload: object })
        click(false)
    }

    return { usersContactsSearch, addInput, handleSearchChange}
}
