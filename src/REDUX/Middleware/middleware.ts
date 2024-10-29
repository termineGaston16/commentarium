import { Middleware } from "@reduxjs/toolkit";
import { USERS } from "../../dataLocal";
import { EmptyUser } from "../slice/userOnline";
import { ListOfUsersWhoInteractedWithThisPost } from "../Type.d/Interfaces";

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
        if (store.getState().temporaryChatOwnUser.length === 5) return alert('No se puede subir más de 5 cosas')

        switch (action.payload.t) {
            case 'TEXT':
                next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'TEXT', value: '' } })
                break;

            case 'SURVEY':
                next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'SURVEY', value: { title: '', options: ['', ''] } } })
                break;

            case 'IMG_FILE':
                next({
                    type: 'temporaryChatOwnUserSlice/addInputToChat', payload: {
                        type: 'IMG_FILE',
                        value: action.payload.v.data,
                        data: {
                            name: action.payload.v.name,
                            size: action.payload.v.size,
                            type: action.payload.v.type
                        }
                    }
                })
                break;

            case 'DOC_FILE':
                next({
                    type: 'temporaryChatOwnUserSlice/addInputToChat', payload: {
                        type: 'DOC_FILE',
                        value: action.payload.v.data,
                        data: {
                            name: action.payload.v.name,
                            size: action.payload.v.size,
                            type: action.payload.v.type
                        }
                    }
                })
                break;

            case 'AUD_FILE':
                next({
                    type: 'temporaryChatOwnUserSlice/addInputToChat', payload: {
                        type: 'AUD_FILE',
                        value: action.payload.v.data,
                        data: {
                            name: action.payload.v.name,
                            size: action.payload.v.size,
                            type: action.payload.v.type
                        }
                    }
                })
                break;

            case 'USER':
                next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'USER', value: action.payload.v } })
                break;

            default:
                break;
        }
    }

    next(action)
}


// EVIAR O RESPONDER MENSAJE
const sendOrReplyMessage: Middleware = _store => next => (action: any) => {

    if (action.type === 'groupChat/sendMessageAccordingto') {
        const { dataRepluComment, message } = action.payload
        if (!dataRepluComment) {
            console.log(1);
            
            next({ type: 'groupChat/sendMessage', payload: message })
        }
    }

    next(action)
}





export {
    searchProfileByDisplayNameMiddleware,
    loginUserMiddleware,
    uploadNewUserMiddleware,
    addInputMiddleware,
    sendOrReplyMessage
} 