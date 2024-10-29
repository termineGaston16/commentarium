import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { PropsComment } from "./Community";
import { useGroupChat } from "./Hooks/useGroupChat";

import './Styles/groupChat.css'
import { InteractionsMessage } from "../../REDUX/Type.d/Interfaces";

interface Props {
    setReplyComment: React.Dispatch<React.SetStateAction<PropsComment>>,
    listsOfInteractions: InteractionsMessage[],
    setListsOfInteractions: React.Dispatch<React.SetStateAction<InteractionsMessage[]>>
}

const GroupChat: React.FC<Props> = ({ setReplyComment, listsOfInteractions, setListsOfInteractions }) => {

    const groupChat = useAppSelector(state => state.groupChat)
    const ownUser = useAppSelector(state => state.ownUser)
    console.log(groupChat);
    console.log(listsOfInteractions);

    const { showsInputs, reactToAComment, updateLikes, updatedislikes } = useGroupChat()


    return (
        <ul className="group-chat">
            {groupChat.length < 1} <span>No hay mensajes</span>
            {groupChat.map((message, index) => (
                <li key={index} className="group-chat__item">
                    <header className="group-chat__item__header">
                        <img className="group-chat__item__header__avatar" src={message.userIssuer.avatar}
                            alt={``} />
                        <span className="group-chat__item__header__display-name">@{message.userIssuer.name}</span>
                        <span className="group-chat__item__header__date">{message.releaseDate}</span>
                        <button
                            onClick={() => {
                                if (ownUser.user.online) {
                                    setReplyComment({
                                        indexMessage: index,
                                        state: true,
                                        message: `Responder a ${message.userIssuer.name}`
                                    })
                                }
                            }}
                            className="group-chat__item__header__btn-reply"
                            type="button">Responder</button>
                    </header>
                    <main className="group-chat__item__main">
                        {message.message.map((input, index) => (
                            showsInputs(input, index)
                        ))}
                    </main>
                    <footer className="group-chat__item__footer">

                        <button
                            onClick={() => reactToAComment(ownUser,
                                'LIKE',
                                message.id,
                                listsOfInteractions,
                                setListsOfInteractions)}
                            className="group-chat__item__footer__btn"
                            type="button">
                            <AiOutlineLike />{updateLikes(message.id, listsOfInteractions)}
                        </button>

                        <button
                            onClick={() => reactToAComment(ownUser,
                                'DISLIKE',
                                message.id,
                                listsOfInteractions,
                                setListsOfInteractions)}

                            className="group-chat__item__footer__btn"
                            type="button">
                            <AiOutlineDislike /> {updatedislikes(message.id, listsOfInteractions)}
                        </button>

                        <button
                            className="group-chat__item__footer__btn" type="button">
                            <FaRegComments /> 0</button>
                    </footer>
                </li>))}
        </ul>
    )
}

export default GroupChat;