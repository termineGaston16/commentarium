import { IoTextOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";

import './Styles/userChat.css'


export default function UserChat() {
    return (<section className="user-chat">
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quam repellat odio nostrum, magnam nulla atque ab doloribus! Maiores voluptas, est officia quo odio aliquam perspiciatis in accusantium repellat. Deserunt?
                    Quidem quisquam nemo ab vel veritatis est impedit, quas nesciunt at rem reiciendis minus eligendi voluptatibus nihil libero deserunt tenetur cum. Totam sed est aut porro corrupti eveniet? Atque, nemo?
                    Reprehenderit amet quibusdam sit, corporis dignissimos aut. Voluptatem necessitatibus, libero provident voluptates quibusdam neque, asperiores omnis, consequatur inventore tenetur sunt voluptate maiores? Numquam reprehenderit repellat qui et animi deleniti dolore.
                    Odio, iure! Voluptate qui quae reprehenderit ipsam recusandae hic ducimus beatae neque ratione corrupti, deleniti ea quasi amet ex commodi aliquam vitae nulla perspiciatis repudiandae assumenda vel? Est, repudiandae explicabo!
                    Voluptates numquam necessitatibus sunt quaerat quod asperiores ratione quibusdam. Nam veniam voluptatum aperiam? Qui ducimus praesentium voluptatibus fuga, minima, officiis laudantium eos soluta veritatis omnis vel nostrum reiciendis eum sit!
                    Corrupti expedita commodi similique ea nihil dolorem placeat, et repellendus temporibus itaque ipsa non ad vitae repudiandae reprehenderit asperiores neque quibusdam laboriosam molestias minima necessitatibus. Sit debitis possimus accusantium eos?
                    Voluptate minima adipisci omnis sunt. Non exercitationem neque voluptatem aliquid provident ratione mollitia soluta repellat id eum, alias saepe sunt! Cumque sunt suscipit nihil id? Eligendi quis neque iure qui!
                    Libero aperiam fugiat hic, sint culpa voluptatibus perferendis, vitae molestiae non repellat excepturi nemo laborum quos fuga voluptates voluptate sed quis inventore enim pariatur ratione? Excepturi distinctio nam totam voluptatibus.
                    Eaque ipsa natus eius numquam delectus, quos pariatur et autem ut. Ullam nam tempore explicabo ab culpa, dolorem dolorum velit quo consequatur minus accusantium tempora repellat mollitia sapiente sint odit.
                    Vero omnis molestiae illo qui sint optio necessitatibus iure eligendi reiciendis, eveniet nostrum. Nam maxime et repellat voluptatem? Quos voluptatibus voluptatem sapiente accusantium explicabo ad eaque animi deleniti nisi similique!</p>
            </li>
        </ul>

        <button className="user-chat__send" type="button">ENVIAR <span className="user-chat__range">0/5</span></button>
        <Link className="user-chat__to-home" to={'/'} >HOME</Link>
    </section>)
}