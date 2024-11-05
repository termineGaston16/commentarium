import { IoImageOutline, IoTextOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import UserChatOwn from "../Elements/UserChatOwn";
import ButtonFileInput from "../../COMMUNITY/Elements/Inputs/ButtonFileInput";
import { lazy, Suspense, useState } from "react";
import { PropsComment } from "../../COMMUNITY/Components/Community";
import { useUserChat } from "./Hooks/useUserChat";
import './Styles/userChat.css'

const UserContact = lazy(() => import('../../COMMUNITY/Elements/UserContact'))


interface Props {
    replyComment: PropsComment,
    setReplyComment: React.Dispatch<React.SetStateAction<PropsComment>>,
    setSendMensaje: React.Dispatch<React.SetStateAction<boolean>>
}

const UserChat: React.FC<Props> = ({ replyComment, setReplyComment, setSendMensaje }) => {

    const ownUser = useAppSelector(state => state.ownUser)
    const temporaryChatOwnUser = useAppSelector(state => state.temporaryChatOwnUser)

    const [showComponentUserContact, setShowComponentUserContact] = useState<boolean>(false)
    const { doDispatch, sendMessageToTheGeneralGroup } = useUserChat()

    return (
        !ownUser.user.online ?
            <div>
                <span>¡Logueate para Chatear!</span>
                <Link to={'/login'}>¡LOGUIN!</Link>
                <Link to={'/registrarse'}>Registrarse</Link>
            </div>
            :
            <section className="user-chat">
                <header className="user-chat__header">
                    <span className="user-chat__header__action-message">{replyComment.message}</span>

                    {replyComment.state &&
                        <button
                            onClick={() => {
                                setReplyComment({
                                    idMessage: '',
                                    state: false,
                                    message: 'Escribe tu mensaje'
                                })
                            }}
                            type="button">⨉</button>}

                    <div className="user-chat__header__actions">
                        <button type="button" className="user-chat__header__actions__btn"
                            onClick={() => doDispatch('temporaryChatOwnUserSlice/addInput', { t: 'TEXT' })}
                        ><IoTextOutline /></button>

                        {/*<button type="button" className="user-chat__header__actions__btn"
                            onClick={() => doDispatch('temporaryChatOwnUserSlice/addInput', { t: 'SURVEY' })}
                        ><RiSurveyLine /></button>*/}

                        <ButtonFileInput t={'IMG_FILE'} Avatar={IoImageOutline} accept={'image/*'} />

                        <ButtonFileInput t={'DOC_FILE'} Avatar={IoDocumentTextOutline} accept={'.doc,.docx,.pdf,.xls,.xlsx,.txt'} />

                        <ButtonFileInput t={'AUD_FILE'} Avatar={FaRegFileAudio} accept={'audio/*'} />

                        <button
                            type="button"
                            className="user-chat__header__actions__btn"
                            onClick={() => setShowComponentUserContact(true)}
                        ><IoMdContact /></button>
                    </div>
                </header>

                <UserChatOwn />

                <button
                    onClick={() => {
                        sendMessageToTheGeneralGroup(temporaryChatOwnUser.result,
                            ownUser,
                            replyComment
                        ),
                            setReplyComment({
                                idMessage: '',
                                message: 'Escribe tu mensaje',
                                state: false
                            }),

                            setSendMensaje(prevState => !prevState)

                    }}
                    className="user-chat__send" type="button">ENVIAR <span className="user-chat__range">
                        {temporaryChatOwnUser.result.length}/5</span></button>
                <Link className="user-chat__to-home" to={`/perfil/${ownUser.user.displayName}`} >HOME</Link>

                {showComponentUserContact &&
                    <Suspense fallback='Cargando Componente: UserContact'>
                        <UserContact click={setShowComponentUserContact} />
                    </Suspense>}
            </section>)
}

export default UserChat;