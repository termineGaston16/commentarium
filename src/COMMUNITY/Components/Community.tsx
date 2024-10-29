import GroupChat from './GroupChat'
import './Styles/community.css'
import UserChat from '../../USER/Components/UserChat'
import { useState } from 'react'
import { InteractionsMessage } from '../../REDUX/Type.d/Interfaces'


export interface PropsComment {
    state: boolean,
    indexMessage: number,
    message: string
}

export default function Community() {

    // MENSAJE A QUIEN RESPONDER Y EVALUAR SI ES UN COMENTARIO DE RESPUESTA
    const [replyComment, setReplyComment] = useState<PropsComment>({
        indexMessage: 0,
        state: false,
        message: 'Escribe tu mensaje'
    });

    const [listsOfInteractions, setListsOfInteractions] = useState<InteractionsMessage[]>([])

    return (<main className="community">
        <GroupChat
            setReplyComment={setReplyComment}
            listsOfInteractions={listsOfInteractions}
            setListsOfInteractions={setListsOfInteractions}
        />

        <UserChat
            setListsOfInteractions={setListsOfInteractions}
            replyComment={replyComment}
            setReplyComment={setReplyComment} />
    </main>)
}