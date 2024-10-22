import { GrGallery } from "react-icons/gr";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsGenderMale } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import '../Styles/register.css'



export default function Register() {
    return (<main className="register">
        <form className="register__form">

            <section className="register__form__complementary-face">
                <label htmlFor="inputProfilePhoto" className="register__form__complementary-face__label-img">
                    <GrGallery />
                    Elige una foto de perfil
                </label>
                <input type="file" accept='image/*' name="inputProfilePhoto" id="inputProfilePhoto" hidden />

                <ul className="register__form__complementary-face__list">
                    <li className="register__form__complementary-face__list__item">
                        <button type="button" className="register__form__complementary-face__list__item__btn">
                            <GiPlantsAndAnimals />
                            Pertenezco a los...
                        </button>
                    </li>
                    <li className="register__form__complementary-face__list__item">
                        <button type="button" className="register__form__complementary-face__list__item__btn">
                            <CiLocationArrow1 />
                            Resido en...
                        </button>
                    </li>
                    <li className="register__form__complementary-face__list__item">
                        <button type="button" className="register__form__complementary-face__list__item__btn">
                            <BsGenderMale />
                            Soy...
                        </button>
                    </li>
                    <li className="register__form__complementary-face__list__item">
                        <button type="button" className="register__form__complementary-face__list__item__btn">
                            <GiMagicPalm />
                            Lucho como...
                        </button>
                    </li>
                </ul>
            </section>
            <section className="register__form__data-face">
                <h3 className="register__form__data-face__title">¡Registrate!</h3>
                <input className="register__form__data-face__input" type="text" name="fullNameRegister" placeholder="*Nombre completo" />
                <input className="register__form__data-face__input" type="text" placeholder="*Nombre de Usuario" />
                <input className="register__form__data-face__input" type="number" placeholder="*Edad" />
                <input className="register__form__data-face__input" type="password" placeholder="*Crea tu contraseña" />
                <input className="register__form__data-face__input" type="password" placeholder="*Confirma tu contraseña" />
                <textarea className="register__form__data-face__textarea" placeholder="*Añade tu descripción"></textarea>

                <button type="submit" className="register__form__data-face__finish">¡Hora de unirse!</button>
            </section>
        </form>
    </main>)
}