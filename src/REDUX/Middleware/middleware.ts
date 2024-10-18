import { Middleware } from "@reduxjs/toolkit";
import { USERS } from "../../dataLocal";
import { EmptyUser } from "../slice/userOnline";

// BUSCAR PERFIL POR DISPLAY NAME
const searchProfileByDisplayNameMiddleware: Middleware = _store => next => (action: any) => {

    if (action.type === 'userOnline/searchProfileByDisplayName') {
        const perfil = USERS.find(perfile => perfile.displayName.toLocaleLowerCase() === action.payload)
        if (perfil) {
            next({ type: 'userOnline/assignProfile', payload: { user: perfil, state: null } })
        } else {
            next({ type: 'userOnline/assignProfile', payload: { user: EmptyUser, state: '*Perfil no encontrado.' } })
        }
    }

    next(action)
}

export default  searchProfileByDisplayNameMiddleware 