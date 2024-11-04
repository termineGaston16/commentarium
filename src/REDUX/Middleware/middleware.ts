import { Middleware } from "@reduxjs/toolkit";
import { EmptyUser } from "../slice/userOnline";
import { getChatGrupalFirebase, getChatOwnFirebase, getPerfileByDisplayNameFirebase, getPerfileByLogin, sendMessage, storeNewUser, uploadInput } from "../../FIREBASE";

// BUSCAR PERFIL POR DISPLAY NAME
const searchProfileByDisplayNameMiddleware: Middleware = _store => next => async (action: any) => {

    if (action.type === 'userOnline/searchProfileByDisplayName') {
        next({ type: 'userOnline/assignProfile', payload: { user: EmptyUser, state: '*Cargando...' } })
        const result = await getPerfileByDisplayNameFirebase(action.payload)

        if (result.isError) {
            next({ type: 'userOnline/modifyState', payload: '*Ocurrió un error inesperado.' })
        } else if (result.result) {
            next({ type: 'userOnline/assignProfile', payload: { user: result.result, state: null } })
        } else {
            next({ type: 'userOnline/modifyState', payload: '*Perfil no encontrado' })
        }
        return;
    }

    next(action)
}

// LOGUEAR USUARIO
const loginUserMiddleware: Middleware = _store => next => async (action: any) => {

    if (action.type === 'ownUser/searchUserForLogin') {

        next({ type: 'ownUser/assignOwnProfile', payload: { user: EmptyUser, state: '*Cargando...' } })
        const result = await getPerfileByLogin(action.payload.displayName, action.payload.password)

        if (result.isError) {
            next({ type: 'ownUser/modifyState', payload: '*Ocurrió un error inesperado.' })
        } else if (result.result) {
            next({ type: 'ownUser/assignOwnProfile', payload: { user: { ...result.result, online: true }, state: null } })
        } else {
            next({ type: 'ownUser/modifyState', payload: '*Algunos de los datos son incorrectos. Ingreselo nuevamente.' })
        }

        return
    }

    next(action)
}

// SUBIR USUARIO
const uploadNewUserMiddleware: Middleware = _store => next => async (action: any) => {

    if (action.type === 'ownUser/uploadNewUser') {
        next({ type: 'ownUser/modifyState', payload: 'Validando datos...' })
        const result = await storeNewUser(action.payload)

        if (result.isError) {
            next({ type: 'ownUser/modifyState', payload: 'Ocurrió un error inesperado.' })
        } else if (result.result) {
            alert('¡Nuevo usuario agregado correctamente!')
            next({ type: 'ownUser/assignOwnProfile', payload: { user: action.payload, state: null } })
        } else {
            next({ type: 'ownUser/modifyState', payload: 'No se pudo registrar el usuario. ' })
        }
        return
    }

    next(action)
}

// AGREGAR INPUT
const addInputMiddleware: Middleware = store => next => async (action: any) => {
    if (action.type === 'temporaryChatOwnUserSlice/addInput') {
        if (store.getState().temporaryChatOwnUser.length === 5) return alert('No se puede subir más de 5 cosas')

        switch (action.payload.t) {
            case 'TEXT':
                const resultText = await uploadInput({ type: 'TEXT', value: '' })
                if (resultText.isError) alert('Ocurrió un error inesperado.')
                if (resultText.result) { next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'TEXT', value: '' } }) }
                break;

            case 'SURVEY':
                const resultSurvey = await uploadInput({ type: 'SURVEY', value: { title: '', options: ['', ''] } })
                if (resultSurvey.isError) alert('Ocurrió un error inesperado')
                if (resultSurvey.result) { next({ type: 'temporaryChatOwnUserSlice/addInputToChat', payload: { type: 'SURVEY', value: { title: '', options: ['', ''] } } }) }
                break;

            case 'IMG_FILE':
                const resultImgFile = await uploadInput({
                    type: 'IMG_FILE',
                    value: action.payload.v.data,
                    data: {
                        name: action.payload.v.name,
                        size: action.payload.v.size,
                        type: action.payload.v.type
                    }
                })
                if (resultImgFile.isError) alert('Ocurrió un error inesperado')
                if (resultImgFile.result) {
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
                }
                break;

            case 'DOC_FILE':
                const resultDocFile = await uploadInput({
                    type: 'DOC_FILE',
                    value: action.payload.v.data,
                    data: {
                        name: action.payload.v.name,
                        size: action.payload.v.size,
                        type: action.payload.v.type
                    }
                })
                if (resultDocFile.isError) alert('Ocurrió un error inesperado')
                if (resultDocFile.result) {
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
                }
                break;

            case 'AUD_FILE':
                const resultAudFile = await uploadInput({
                    type: 'AUD_FILE',
                    value: action.payload.v.data,
                    data: {
                        name: action.payload.v.name,
                        size: action.payload.v.size,
                        type: action.payload.v.type
                    }
                })
                if (resultAudFile.isError) alert('Ocurrió un error inesperado')
                if (resultAudFile.result) {
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
                }

                break;

            case 'USER':
                const resultUser = await uploadInput({ type: 'TEXT', value: '' })
                if (resultUser.isError) alert('Ocurrió un error inesperado')
                if (resultUser.result) { next({ type: 'TEXT', value: '' }) }
                break;

            default:
                break;
        }

        return
    }

    next(action)
}

// EVIAR O RESPONDER MENSAJE
const sendOrReplyMessage: Middleware = _store => next => async (action: any) => {

    if (action.type === 'groupChat/sendMessageAccordingto') {
        const { dataRepluComment, message } = action.payload
        if (!dataRepluComment) {
            const result = await sendMessage(message)
            if (result.isError) alert('Ocurrió un error inesperado')
            if (result.result) next({ type: 'groupChat/sendMessage', payload: message })
        }
    }
    next(action)
}

// OBTENER MENSAJES DEL CHAT GRUPAL
const getGroupChat: Middleware = _store => next => async (action: any) => {

    if (action.type === 'groupChat/getGroupChat') {

        next({ type: 'groupChat/modifyState', payload: '*Obteniendo mensajes...' })

        const result = await getChatGrupalFirebase()

        if (result.isError) {
            next({ type: 'groupChat/modifyState', payload: '*Ocurrió un error inesperado.' })
        } else if (result.result.length > 0) {
            next({
                type: 'groupChat/getMessagesGroupChat', payload: {
                    list: result.result,
                    state: null
                }
            })
        } else {
            next({ type: 'groupChat/modifyState', payload: '*Chat vacío.' })
        }

        return;
    }

    next(action)
}

// OBTENER CHAT PROPIO TEMPORAL 
const getChatOwn: Middleware = _store => next => async (action: any) => {
    if (action.type === 'temporaryChatOwnUserSlice/getChatOwn') {

        next({ type: 'temporaryChatOwnUserSlice/modifyState', payload: '*Cargando tu chat' })
        const result = await getChatOwnFirebase()

        if (result.isError) {
            next({ type: 'temporaryChatOwnUserSlice/modifyState', payload: '*Ocurrió un error inesperado.' })
        } else if (result.result > 0) {
            next({
                type: 'temporaryChatOwnUserSlice/modifyResult', payload: {
                    result: result.result,
                    state: null
                }
            })
        } else {
            next({ type: 'temporaryChatOwnUserSlice/modifyState', payload: '' })
        }

        return
    }

    next(action)
}


export {
    searchProfileByDisplayNameMiddleware,
    loginUserMiddleware,
    uploadNewUserMiddleware,
    addInputMiddleware,
    sendOrReplyMessage,
    getGroupChat,
    getChatOwn
} 