import { PropsComment } from "../../../COMMUNITY/Components/Community"
import { ChatOwnUser } from "../../../COMMUNITY/Type.d/Interfaces"
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { UserOnline } from "../../../REDUX/slice/userOnline"

export const useUserChat = () => {

    const dispatch = useAppDispatch()

    // DISPATCH
    const doDispatch = (type: string, object?: object) => {
        dispatch({ type: type, payload: object })
    }

    // ENVIAR MENSAJE AL GRUPO GENERAL
    const sendMessageToTheGeneralGroup = (temporaryChatOwnUser: ChatOwnUser[],
        ownUser: UserOnline,
        replyComment: PropsComment) => {

        if (temporaryChatOwnUser.length < 1) return

        dispatch({ type: 'temporaryChatOwnUserSlice/emptyInputChat' })

        const newId = crypto.randomUUID()

        dispatch({
            type: 'groupChat/sendMessageAccordingto', payload: {
                dataRepluComment: replyComment.state,
                message: {
                    id: newId,
                    userIssuer: {
                        name: ownUser.user.displayName,
                        avatar: ownUser.user.profilePictureUrl
                    },
                    message: temporaryChatOwnUser,
                    releaseDate: new Date().toLocaleTimeString(),
                }
            }
        })

        if (!replyComment.state) {

           /* uploadNewInteraction({
                dislikes: 0,
                idLocal: newId,
                likes: 0,
                listOfUsersWhoInteractedWithThisPost: []
            })

            uploadNewComment({
                idLocal: newId,
                comments: []
            })*/
        } else {
            /*addNewCommentToMainMessage(replyComment.idMessage, {
                userIssuerAdditionalUrl: ownUser.user.profilePictureUrl,
                userIssuerAdditionalName: ownUser.user.displayName,
                releaseDateAdditional: new Date().toLocaleTimeString(),
                messageAdditional: temporaryChatOwnUser,
            })*/
        }

    }

    return { doDispatch, sendMessageToTheGeneralGroup }
}