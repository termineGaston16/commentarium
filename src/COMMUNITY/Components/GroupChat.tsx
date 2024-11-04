import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
//import { FaRegComments } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../REDUX/Hook/useStore";
import { PropsComment } from "./Community";
import { useGroupChat } from "./Hooks/useGroupChat";

import './Styles/groupChat.css'
import { useEffect, useState } from "react";
import { APIresponse } from "../Type.d/Interfaces";
import { getCommentsFirebase, getInteractionFirebase } from "../../FIREBASE";

interface Props {
    setReplyComment: React.Dispatch<React.SetStateAction<PropsComment>>,
}

const GroupChat: React.FC<Props> = ({ setReplyComment }) => {

    const groupChat = useAppSelector(state => state.groupChat)
    const ownUser = useAppSelector(state => state.ownUser)
    const dispatch = useAppDispatch()

    //const [show, setShow] = useState<boolean>(false)
    const [_listOfCommentsLocal, setListOfCommentsLocal] = useState<APIresponse>({
        data: {
            isError: false,
            result: []
        },
        isLoading: true
    });
    const [listOfInteractionsLocal, setListOfInteractionsLocal] = useState<APIresponse>({
        data: {
            isError: false,
            result: []
        },
        isLoading: true
    });
    const { showsInputs, reactToAComment, updateLikes, updatedislikes } = useGroupChat()

    useEffect(() => {
        const fetchComments = async () => {
            const responseInteractions = await getInteractionFirebase();
            const responseComments = await getCommentsFirebase();
            setListOfCommentsLocal({
                data: responseComments,
                isLoading: true
            });

            setListOfInteractionsLocal({
                data: responseInteractions,
                isLoading: true
            })
        };

        fetchComments();
        dispatch({ type: 'groupChat/getGroupChat' })
    }, []);


    return (
        <ul className="group-chat">
            {groupChat.state ? <span>{groupChat.state}</span> :
                groupChat.list.map((message, index) => (
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
                                            idMessage: message.id,
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

                            {listOfInteractionsLocal.isLoading ? <span>Cargando...</span> : <>

                                <button
                                    onClick={() => reactToAComment(ownUser,
                                        'LIKE',
                                        message.id,
                                        listOfInteractionsLocal,
                                        setListOfInteractionsLocal)}
                                    className="group-chat__item__footer__btn"
                                    type="button">
                                    <AiOutlineLike />{updateLikes(message.id, listOfInteractionsLocal.data.result)}
                                </button>

                                <button
                                    onClick={() => reactToAComment(ownUser,
                                        'DISLIKE',
                                        message.id,
                                        listOfInteractionsLocal,
                                        setListOfInteractionsLocal)}

                                    className="group-chat__item__footer__btn"
                                    type="button">
                                    <AiOutlineDislike /> {updatedislikes(message.id, listOfInteractionsLocal.data.result)}
                                </button>

                                {/*<button
                                onClick={() => setShow(prevState => !prevState)}
                                className="group-chat__item__footer__btn" type="button">
                                <FaRegComments /> {getCommentLength(message.id)}</button>*/}
                            </>}
                        </footer>

                        {/*show && <ul>
                        {showComments(message.id).map((comment, index) => (
                            <li key={index}>
                                <header className="group-chat__item__header">
                                    <img className="group-chat__item__header__avatar" src={comment.userIssuerAdditionalUrl}
                                        alt={``} />
                                    <span className="group-chat__item__header__display-name">@{comment.userIssuerAdditionalName}</span>
                                    <span className="group-chat__item__header__date">{comment.releaseDateAdditional}</span>
                                </header>
                                <main className="group-chat__item__main">
                                    {comment.messageAdditional.map((input, index) => (
                                        showsInputs(input, index)
                                    ))}
                                </main>
                            </li>
                        ))}
                    </ul>*/}
                    </li>))}
        </ul>
    )
}

export default GroupChat;