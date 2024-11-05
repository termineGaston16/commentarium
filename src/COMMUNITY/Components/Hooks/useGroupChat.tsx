import { ReactNode } from "react"
import { APIresponse, ChatOwnUser } from "../../Type.d/Interfaces"
import DocFileInput from "../../Elements/Inputs/DocFileInput"
import UserFileInput from "../../Elements/Inputs/UserFileInput"
import { UserOnline } from "../../../REDUX/slice/userOnline"
import { InteractionsMessage } from "../../../REDUX/Type.d/Interfaces"
import { updateInteractionFirebase } from "../../../FIREBASE"

export const useGroupChat = () => {

    // MOSTRAR DISTINTOS INPUTS
    const showsInputs = (inputs: ChatOwnUser, index: number): ReactNode => {
        switch (inputs.type) {
            case "TEXT":
                return <p key={index}>{inputs.value}</p>
            case "IMG_FILE":
                return <img key={index} src={inputs.value} alt="" />
            case "DOC_FILE":
                return <DocFileInput key={index} canBeDeleted={false} index={index} value={inputs} />
            case "AUD_FILE":
                return <audio key={index} src={inputs.value} controls></audio>
            case "SURVEY":

                break;
            case "USER":
                <UserFileInput key={index} canBeDeleted={false} index={index} value={inputs.value} />
                break;
        }
    }

    // REACCIONAR A UN COMENTARIO
    const reactToAComment = (
        ownUser: UserOnline,
        actionByUser: 'LIKE' | 'DISLIKE',
        idMessageMain: string,
        listOfInteractionsLocal: APIresponse,
        setListOfInteractionsLocal: React.Dispatch<React.SetStateAction<APIresponse>>
    ): void => {

        if (!ownUser.user.online) return alert('¡Logueate para interactuar con el chat!');

        let interactionActual = listOfInteractionsLocal.data.result.find((list: { idLocal: string }) => list.idLocal === idMessageMain) as InteractionsMessage;

        if (!interactionActual) {
            // Crear una nueva interacción si no existe
            interactionActual = {
                idLocal: idMessageMain,
                likes: 0,
                dislikes: 0,
                listOfUsersWhoInteractedWithThisPost: []
            };
            listOfInteractionsLocal.data.result.push(interactionActual);
        }

        const userAlreadyReacted = interactionActual.listOfUsersWhoInteractedWithThisPost.find(
            user => user.user === ownUser.user.displayName
        );

        const isSameAction = userAlreadyReacted?.actionU === actionByUser;
        const likeAdjustment = actionByUser === 'LIKE' ? 1 : 0;
        const dislikeAdjustment = actionByUser === 'DISLIKE' ? 1 : 0;

        const newInteraction = { ...interactionActual };

        if (!userAlreadyReacted) {
            newInteraction.dislikes += dislikeAdjustment;
            newInteraction.likes += likeAdjustment;
            newInteraction.listOfUsersWhoInteractedWithThisPost = [
                ...interactionActual.listOfUsersWhoInteractedWithThisPost,
                {
                    user: ownUser.user.displayName,
                    actionU: actionByUser
                }
            ];

            updateInteractionFirebase(newInteraction)
        } else if (!isSameAction) {
            newInteraction.dislikes += dislikeAdjustment - (userAlreadyReacted.actionU === 'DISLIKE' ? 1 : 0);
            newInteraction.likes += likeAdjustment - (userAlreadyReacted.actionU === 'LIKE' ? 1 : 0);
            newInteraction.listOfUsersWhoInteractedWithThisPost = interactionActual.listOfUsersWhoInteractedWithThisPost.map(user =>
                user.user === ownUser.user.displayName ? { ...user, actionU: actionByUser } : user
            );

            updateInteractionFirebase(newInteraction)
        } else {
            newInteraction.dislikes -= dislikeAdjustment;
            newInteraction.likes -= likeAdjustment;
            newInteraction.listOfUsersWhoInteractedWithThisPost = interactionActual.listOfUsersWhoInteractedWithThisPost.filter(
                user => user.user !== ownUser.user.displayName
            );
            updateInteractionFirebase(newInteraction)
        }

        const index = listOfInteractionsLocal.data.result.findIndex((i: { idLocal: string }) => i.idLocal === newInteraction.idLocal);
        const newListsOfInteractions = structuredClone(listOfInteractionsLocal.data.result);
        newListsOfInteractions[index] = newInteraction;
        setListOfInteractionsLocal({
            data: {
                result: newListsOfInteractions,
                isError: false
            },
            isLoading: false
        });
    };


    // ACTUALIZAR LOS VALORES DE UN COMENTARIO
    const updateLikes = (idMessageMain: string, listsOfInteractions: InteractionsMessage[]): number => {
        return (listsOfInteractions.find(i => i.idLocal === idMessageMain))?.likes ?? 0
    }

    const updatedislikes = (idMessageMain: string, listsOfInteractions: InteractionsMessage[]): number => {
        return (listsOfInteractions.find(i => i.idLocal === idMessageMain))?.dislikes ?? 0
    }

    return { showsInputs, reactToAComment, updateLikes, updatedislikes }
}