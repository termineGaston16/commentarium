import GroupChat from './GroupChat'
import './Styles/community.css'
import UserChat from '../../USER/Components/UserChat'
import { useState } from 'react'

export interface PropsComment {
    state: boolean,
    idMessage: string,
    message: string
}

export default function Community() {

    // MENSAJE A QUIEN RESPONDER Y EVALUAR SI ES UN COMENTARIO DE RESPUESTA
    const [replyComment, setReplyComment] = useState<PropsComment>({
        idMessage: '',
        state: false,
        message: 'Escribe tu mensaje'
    });


    return (<main className="community">
        <GroupChat
            setReplyComment={setReplyComment}
        />

        <UserChat
            replyComment={replyComment}
            setReplyComment={setReplyComment}
        />
    </main>)
}