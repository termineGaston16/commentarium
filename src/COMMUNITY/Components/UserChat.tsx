import { IoImageOutline, IoTextOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../REDUX/Hook/useStore";
import UserChatOwn from "../Elements/UserChatOwn";
import ButtonFileInput from "../Elements/Inputs/ButtonFileInput";

import './Styles/userChat.css'


export default function UserChat() {

    const ownUser = useAppSelector(state => state.ownUser)

    const temporaryChatOwnUser = useAppSelector(state => state.temporaryChatOwnUser)
    const dispatch = useAppDispatch()
    console.log(temporaryChatOwnUser);


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
                    <span className="user-chat__header__action-message">RESPONDER A <br /> @12345678901234567890</span>
                    <div className="user-chat__header__actions">

                        <button type="button" className="user-chat__header__actions__btn"
                            onClick={() => dispatch({ type: 'temporaryChatOwnUserSlice/addInput', payload: { t: 'TEXT' } })}
                        ><IoTextOutline /></button>

                        <button type="button" className="user-chat__header__actions__btn"
                            onClick={() => dispatch({ type: 'temporaryChatOwnUserSlice/addInput', payload: { t: 'SURVEY' } })}
                        ><RiSurveyLine /></button>

                        <ButtonFileInput t={'IMG_FILE'} Avatar={IoImageOutline} accept={'image/*'} />
                        
                        <ButtonFileInput t={'DOC_FILE'} Avatar={IoDocumentTextOutline} accept={'.doc,.docx,.pdf,.xls,.xlsx,.txt'} />

                        <ButtonFileInput t={'AUD_FILE'} Avatar={FaRegFileAudio} accept={'audio/*'} />

                        <button type="button" className="user-chat__header__actions__btn"><IoMdContact /></button>
                    </div>
                </header>

                <UserChatOwn />

                <button className="user-chat__send" type="button">ENVIAR <span className="user-chat__range">
                    {temporaryChatOwnUser.length}/5</span></button>
                <Link className="user-chat__to-home" to={`/perfil/${ownUser.user.displayName}`} >HOME</Link>
            </section>)
}