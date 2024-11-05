import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../REDUX/Hook/useStore";
import { PropsComment } from "./Community";
import { APIresponse } from "../Type.d/Interfaces";
import { useGroupChat } from "./Hooks/useGroupChat";
import {  getCommentsFirebase, getInteractionFirebase } from "../../FIREBASE";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import './Styles/groupChat.css'
import ButtonsComments from "../Elements/ButtonComments";

interface Props {
    setReplyComment: React.Dispatch<React.SetStateAction<PropsComment>>,
    sendMenssage: boolean
}

const GroupChat: React.FC<Props> = ({ setReplyComment, sendMenssage }) => {
    const groupChat = useAppSelector(state => state.groupChat);
    const ownUser = useAppSelector(state => state.ownUser);
    const dispatch = useAppDispatch();

    const [_listOfCommentsLocal, setListOfCommentsLocal] = useState<APIresponse>({
        data: { isError: false, result: [] },
        isLoading: true
    });
    const [listOfInteractionsLocal, setListOfInteractionsLocal] = useState<APIresponse>({
        data: { isError: false, result: [] },
        isLoading: true
    });

    const { showsInputs, reactToAComment, updateLikes, updatedislikes } = useGroupChat();

    useEffect(() => {
        const fetchComments = async () => {
            const responseInteractions = await getInteractionFirebase();
            const responseComments = await getCommentsFirebase();
            setListOfCommentsLocal({ data: responseComments, isLoading: false });
            setListOfInteractionsLocal({ data: responseInteractions, isLoading: false });
        };

        fetchComments();
        dispatch({ type: 'groupChat/getGroupChat' });
    }, [sendMenssage]);


    return (
        <ul className="group-chat">
            {groupChat.state ? (
                <span>{groupChat.state}</span>
            ) : (
                groupChat.list.map((message, index) => (
                    <li key={index} className="group-chat__item">
                        <header className="group-chat__item__header">
                            <img className="group-chat__item__header__avatar" src={message.userIssuer.avatar} alt="" />
                            <span className="group-chat__item__header__display-name">@{message.userIssuer.name}</span>
                            <span className="group-chat__item__header__date">{message.releaseDate}</span>
                            <button
                                onClick={() => {
                                    if (ownUser.user.online) {
                                        setReplyComment({
                                            idMessage: message.id,
                                            state: true,
                                            message: `Responder a ${message.userIssuer.name}`
                                        });
                                    }
                                }}
                                className="group-chat__item__header__btn-reply"
                                type="button"
                            >
                                Responder
                            </button>
                        </header>
                        <main className="group-chat__item__main">
                            {message.message.map((input, idx) => showsInputs(input, idx))}
                        </main>
                        <footer className="group-chat__item__footer">
                            {listOfInteractionsLocal.isLoading ? (
                                <span>Cargando...</span>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            reactToAComment(
                                                ownUser,
                                                'LIKE',
                                                message.id,
                                                listOfInteractionsLocal,
                                                setListOfInteractionsLocal
                                            )
                                        }
                                        className="group-chat__item__footer__btn"
                                        type="button"
                                    >
                                        <AiOutlineLike /> {updateLikes(message.id, listOfInteractionsLocal.data.result)}
                                    </button>
                                    <button
                                        onClick={() =>
                                            reactToAComment(
                                                ownUser,
                                                'DISLIKE',
                                                message.id,
                                                listOfInteractionsLocal,
                                                setListOfInteractionsLocal
                                            )
                                        }
                                        className="group-chat__item__footer__btn"
                                        type="button"
                                    >
                                        <AiOutlineDislike /> {updatedislikes(message.id, listOfInteractionsLocal.data.result)}
                                    </button>

                                    <ButtonsComments className={"group-chat__item__footer__btn"}
                                        idMessage={message.id} />
                                </>
                            )}

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
                        </footer>
                    </li>
                ))
            )}
        </ul>
    );
};

export default GroupChat;

