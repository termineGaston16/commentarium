import { Middleware } from "@reduxjs/toolkit";
import { USERS } from "../../dataLocal";
import { EmptyUser } from "../slice/userOnline";
import { ListOfUsersWhoInteractedWithThisPost, User } from "../Type.d/Interfaces";

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

const giveLikeOrNoComment: Middleware = store => next => (action: any) => {
    if (action.type === 'groupChat/giveReaction') {
        const stateMessage = store.getState().groupChat[0];
        const { correspondingUser, actionUser, indexMessage } = action.payload;

        // EVALÚA SI EL USUARIO ESTÁ ACTIVO
        if (!correspondingUser.online) return;

        // VERIFICA SI EL USUARIO YA INTERACTUÓ CON EL MENSAJE
        const userInMessage = stateMessage.interactions.listOfUsersWhoInteractedWithThisPost.find(
            (user: ListOfUsersWhoInteractedWithThisPost) => user.user === correspondingUser.displayName
        );

        // DETERMINA SI AGREGAR, CAMBIAR O REMOVER REACCIÓN
        const isSameAction = userInMessage?.actionU === actionUser;
        const likeAdjustment = actionUser === 'LIKE' ? 1 : 0;
        const dislikeAdjustment = actionUser === 'DISLIKE' ? 1 : 0;

        // AGREGA O MODIFICA LA REACCIÓN SEGÚN LA CONDICIÓN
        if (!userInMessage) {
            // Si es la primera vez que reacciona
            next({
                type: 'groupChat/addUser',
                payload: { index: indexMessage, user: { user: correspondingUser.displayName, actionU: actionUser } }
            });
            next({
                type: 'groupChat/updateLikes',
                payload: {
                    indexMessage: indexMessage,
                    newLikes: stateMessage.interactions.likes + likeAdjustment,
                    newDislikes: stateMessage.interactions.dislikes + dislikeAdjustment
                }
            });
        } else if (!isSameAction) {
            //Si ya había reaccionado y cambia de orden:
            next({
                type: 'groupChat/updateLikes',
                payload: {
                    indexMessage: indexMessage,
                    newLikes: stateMessage.interactions.likes + likeAdjustment - (userInMessage.actionU === 'LIKE' ? 1 : 0),
                    newDislikes: stateMessage.interactions.dislikes + dislikeAdjustment - (userInMessage.actionU === 'DISLIKE' ? 1 : 0)
                }
            });

            next({
                type: 'groupChat/updateUser',
                payload: {
                    indexMessage: indexMessage,
                    indexUser: stateMessage.interactions.listOfUsersWhoInteractedWithThisPost.findIndex(
                        (u: ListOfUsersWhoInteractedWithThisPost) => u.user === correspondingUser.displayName
                    ),
                    newAction: actionUser
                }
            });

        } else {
            //Si es la misma acción
            next({
                type: 'groupChat/updateLikes',
                payload: {
                    indexMessage: indexMessage,
                    newLikes: stateMessage.interactions.likes - likeAdjustment,
                    newDislikes: stateMessage.interactions.dislikes - dislikeAdjustment
                }
            });

            next({
                type: 'groupChat/removeUser',
                payload: {
                    indexMessage: indexMessage,
                    indexUser: stateMessage.interactions.listOfUsersWhoInteractedWithThisPost.findIndex(
                        (u: ListOfUsersWhoInteractedWithThisPost) => u.user === correspondingUser.displayName
                    )
                }
            });
        }
    }
    next(action);
};





export {
    searchProfileByDisplayNameMiddleware,
    loginUserMiddleware,
    uploadNewUserMiddleware,
    addInputMiddleware,
    giveLikeOrNoComment
} 