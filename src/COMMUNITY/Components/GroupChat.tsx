import { AiOutlineLike, AiOutlineDislike  } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";

import './Styles/groupChat.css'



export default function GroupChat(){
    return(
        <ul className="group-chat">
            <li className="group-chat__item">
                <header className="group-chat__item__header">
                    <img className="group-chat__item__header__avatar" src="" alt="" />
                    <span className="group-chat__item__header__display-name">@12345678901234567890</span>
                    <span className="group-chat__item__header__date">hace 3 días</span>
                    <button className="group-chat__item__header__btn-reply" type="button">Responder</button>
                </header>
                <main className="group-chat__item__main">
                    <p className="group-chat__item__main__text">lorem*10</p>
                </main>
                <footer className="group-chat__item__footer">
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineLike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineDislike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><FaRegComments /> 0</button>
                </footer>
            </li>
            <li className="group-chat__item">
                <header className="group-chat__item__header">
                    <img className="group-chat__item__header__avatar" src="" alt="" />
                    <span className="group-chat__item__header__display-name">@12345678901234567890</span>
                    <span className="group-chat__item__header__date">hace 3 días</span>
                    <button className="group-chat__item__header__btn-reply" type="button">Responder</button>
                </header>
                <main className="group-chat__item__main">
                    <p className="group-chat__item__main__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, recusandae. Dicta, provident laboriosam sint facere repellendus voluptatem quo quibusdam. Placeat recusandae minus velit, culpa esse aspernatur odio natus quibusdam. Molestiae!
                    Inventore, deserunt harum? Iste ducimus possimus, ullam voluptas quisquam alias eaque repellendus nostrum rerum impedit fugiat dolore, distinctio ipsam tenetur modi quod iure, ex officiis quasi ipsa sint dicta debitis!
                    Deserunt alias quae nihil quis id quam, repellat veniam. Maxime consectetur accusamus quam saepe odit earum. Ab ipsa, dolor labore accusamus pariatur culpa veniam cupiditate error, magni numquam quaerat amet!
                    Reprehenderit unde dolorum provident vel molestias odit laudantium magni, veritatis cupiditate accusantium architecto illum quis suscipit sequi blanditiis fuga esse labore debitis harum quo officia enim earum rerum aspernatur. Commodi.
                    Iure necessitatibus natus modi rem pariatur eligendi et quidem autem, commodi fugit voluptatem dolor deserunt ut ipsa quaerat aspernatur fugiat aliquid. Eum iusto aliquam ipsam id et soluta voluptate debitis.
                    Modi aut voluptate mollitia ipsum nulla eius dolores rem sunt autem. Accusantium ratione assumenda cumque unde culpa. Necessitatibus culpa voluptas quae, perspiciatis natus modi accusamus esse? Earum laboriosam non ducimus.
                    Qui recusandae, nostrum architecto laboriosam similique iure aut, voluptate tenetur mollitia ad, sapiente commodi culpa sunt beatae ex rerum vel repellat veniam quia ab! Nemo error doloribus deserunt consectetur reiciendis.
                    Non perferendis voluptate laboriosam accusamus vitae expedita ad illum qui dicta molestias dolores culpa consequatur, eos veniam aliquam libero nobis deleniti dolorem natus dolore voluptatibus quidem. Sed modi illum temporibus?
                    Ducimus, nisi ex! Molestiae, explicabo earum illo officiis commodi eius ad culpa non laborum provident exercitationem sequi adipisci, reiciendis nobis voluptatum quasi excepturi a incidunt quaerat fugit illum ipsum! Nemo.
                    Tenetur alias ullam modi voluptates quo maxime ut natus quos neque ipsum repellendus aliquam, reprehenderit dolor, quibusdam aperiam adipisci eum autem quod praesentium? Commodi repellat distinctio veniam laboriosam soluta quas.</p>
                </main>
                <footer className="group-chat__item__footer">
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineLike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineDislike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><FaRegComments /> 0</button>
                </footer>
            </li>
            <li className="group-chat__item">
                <header className="group-chat__item__header">
                    <img className="group-chat__item__header__avatar" src="" alt="" />
                    <span className="group-chat__item__header__display-name">@12345678901234567890</span>
                    <span className="group-chat__item__header__date">hace 3 días</span>
                    <button className="group-chat__item__header__btn-reply" type="button">Responder</button>
                </header>
                <main className="group-chat__item__main">
                    <p className="group-chat__item__main__text">lorem*10</p>
                </main>
                <footer className="group-chat__item__footer">
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineLike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineDislike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><FaRegComments /> 0</button>
                </footer>
            </li>
            <li className="group-chat__item">
                <header className="group-chat__item__header">
                    <img className="group-chat__item__header__avatar" src="" alt="" />
                    <span className="group-chat__item__header__display-name">@12345678901234567890</span>
                    <span className="group-chat__item__header__date">hace 3 días</span>
                    <button className="group-chat__item__header__btn-reply" type="button">Responder</button>
                </header>
                <main className="group-chat__item__main">
                    <p className="group-chat__item__main__text">lorem*10</p>
                </main>
                <footer className="group-chat__item__footer">
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineLike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><AiOutlineDislike /> 0</button>
                    <button className="group-chat__item__footer__btn" type="button"><FaRegComments /> 0</button>
                </footer>
            </li>
        </ul>
    )
}