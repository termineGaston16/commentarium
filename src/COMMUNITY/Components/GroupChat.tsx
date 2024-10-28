import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import './Styles/groupChat.css'
import { useAppDispatch, useAppSelector } from "../../REDUX/Hook/useStore";
import { ChatOwnUser } from "../Type.d/Interfaces";
import { ReactNode } from "react";
import UserFileInput from "../Elements/Inputs/UserFileInput";
import DocFileInput from "../Elements/Inputs/DocFileInput";

export default function GroupChat() {

    const groupChat = useAppSelector(state => state.groupChat)
    
    const ownUser = useAppSelector(state => state.ownUser)
    const dispatch = useAppDispatch()

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
                        <button className="group-chat__item__header__btn-reply" type="button">Responder</button>
                    </header>
                    <main className="group-chat__item__main">
                        {message.message.map((input, index) => (
                            showsInputs(input, index)
                        ))}
                    </main>
                    <footer className="group-chat__item__footer">

                        <button
                            onClick={() => dispatch({
                                type: 'groupChat/giveReaction', payload: {
                                    correspondingUser: ownUser.user,
                                    actionUser: 'LIKE',
                                    indexMessage: index
                                }
                            })}
                            className="group-chat__item__footer__btn"
                            type="button">
                            <AiOutlineLike />{message.interactions.likes}
                        </button>


                        <button
                            onClick={() => dispatch({
                                type: 'groupChat/giveReaction', payload: {
                                    correspondingUser: ownUser.user,
                                    actionUser: 'DISLIKE',
                                    indexMessage: index
                                }
                            })}
                            className="group-chat__item__footer__btn"
                            type="button">
                            <AiOutlineDislike /> {message.interactions.dislikes}</button>
                        <button className="group-chat__item__footer__btn" type="button">
                            <FaRegComments /> {message.interactions.comments.amount}</button>
                    </footer>
                </li>
            ))}
        </ul>
    )
}