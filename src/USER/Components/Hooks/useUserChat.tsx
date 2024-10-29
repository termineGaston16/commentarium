import { PropsComment } from "../../../COMMUNITY/Components/Community"
import { ChatOwnUser } from "../../../COMMUNITY/Type.d/Interfaces"
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { UserOnline } from "../../../REDUX/slice/userOnline"
import { InteractionsMessage, Message } from "../../../REDUX/Type.d/Interfaces"

export const useUserChat = () => {

    const dispatch = useAppDispatch()

    // DISPATCH
    const doDispatch = (type: string, object?: object) => {
        dispatch({ type: type, payload: object })
    }

    // ENVIAR MENSAJE AL GRUPO GENERAL
    const sendMessageToTheGeneralGroup = (temporaryChatOwnUser: ChatOwnUser[],
        groupChat: Message[],
        ownUser: UserOnline,
        replyComment: PropsComment,
        setListsOfInteractions: React.Dispatch<React.SetStateAction<InteractionsMessage[]>>) => {

        if (temporaryChatOwnUser.length < 1) return

        dispatch({ type: 'temporaryChatOwnUserSlice/emptyInputChat' })

        dispatch({
            type: 'groupChat/sendMessageAccordingto', payload: {
                dataRepluComment: replyComment.state,
                message: {
                    id: groupChat.length + 1,
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
            setListsOfInteractions(prevList => [...prevList, {
                dislikes: 0,
                idLocal: groupChat.length + 1,
                likes: 0,
                listOfUsersWhoInteractedWithThisPost: []
            }])
        }

    }

    return { doDispatch, sendMessageToTheGeneralGroup }
}