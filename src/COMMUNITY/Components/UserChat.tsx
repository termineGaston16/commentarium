import { IoTextOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";

import './Styles/userChat.css'
import { useAppSelector } from "../../REDUX/Hook/useStore";


export default function UserChat() {

    const ownUser = useAppSelector(state => state.ownUser)

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
                        <button type="button" className="user-chat__header__actions__btn"><IoTextOutline /></button>
                        <button type="button" className="user-chat__header__actions__btn"><RiSurveyLine /></button>
                        <button type="button" className="user-chat__header__actions__btn"><IoImageOutline /></button>
                        <button type="button" className="user-chat__header__actions__btn"><IoDocumentTextOutline /></button>
                        <button type="button" className="user-chat__header__actions__btn"><FaRegFileAudio /></button>
                        <button type="button" className="user-chat__header__actions__btn"><IoMdContact /></button>
                    </div>
                </header>

                <ul className="user-chat__list">
                    <li className="user-chat__item">
                        <p>
                            as
                        </p>
                    </li>
                </ul>

                <button className="user-chat__send" type="button">ENVIAR <span className="user-chat__range">0/5</span></button>
                <Link className="user-chat__to-home" to={`/perfil/${ownUser.user.displayName}`} >HOME</Link>
            </section>)
}