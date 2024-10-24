import { Middleware } from "@reduxjs/toolkit";
import { USERS } from "../../dataLocal";
import { EmptyUser } from "../slice/userOnline";

// BUSCAR PERFIL POR DISPLAY NAME
const searchProfileByDisplayNameMiddleware: Middleware = _store => next => (action: any) => {

    if (action.type === 'userOnline/searchProfileByDisplayName') {
        const perfil = USERS.find(perfile => perfile.displayName === action.payload)
        if (perfil) {
            next({ type: 'userOnline/assignProfile', payload: { user: perfil, state: null } })
        } else {
            next({ type: 'userOnline/assignProfile', payload: { user: EmptyUser, state: '*Perfil no encontrado.' } })
        }
    }

    next(action)
}

// LOGUEAR USUARIO
const loginUserMiddleware: Middleware = _store => next => (action: any) => {

    if (action.type === 'ownUser/searchUserForLogin') {

        const perfil = USERS.find(perfile => perfile.displayName === action.payload.displayName &&
            perfile.password === action.payload.password)
        if (perfil) {
            next({ type: 'ownUser/assignOwnProfile', payload: { user: { ...perfil, online: true }, state: null } })
        } else {
            next({ type: 'ownUser/assignOwnProfile', payload: { user: EmptyUser, state: '*Algunos de los datos son incorrectos. Ingreselo nuevamente.' } })
        }
    }

    next(action)
}

// SUBIR USUARIO
const uploadNewUserMiddleware: Middleware = _store => next => (action: any) => {

    if (action.type === 'ownUser/uploadNewUser') {
        USERS.push(action.payload)
        next({ type: 'ownUser/assignOwnProfile', payload: { user: action.payload, state: null } })
    }

    next(action)
}

// AGREGAR INPUT
const addInputMiddleware: Middleware = store => next => (action: any) => {
    if (action.type === 'temporaryChatOwnUserSlice/addInput') {
        if (store.getState().temporaryChatOwnUser.length === 5) return

        switch (action.payload) {
            case 'TEXT':
                next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'TEXT', value: '' } })
                break;

            case 'SURVEY':
                next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'SURVEY', value: { title: '', options: ['', ''] } } })
                break;

            default:
                break;
        }
    }

    next(action)
}


export {
    searchProfileByDisplayNameMiddleware,
    loginUserMiddleware,
    uploadNewUserMiddleware,
    addInputMiddleware,
} 