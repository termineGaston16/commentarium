import '../Styles/register.css'
import ComplementaryChange from '../../Elements/ComplementaryChange';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarChange from '../../Elements/AvatarChange';
import { useRegister } from '../Hooks/useRegister';

export interface Prop {
    speciesRegister: null | string,
    locationRegister: null | string,
    genderRegister: null | string,
    magicClassRegister: null | string,
    profilePicture: null | File
}

export interface AlertSubmit{
    alert:string,
    state: boolean
}

export default function Register() {

    // MENSAJE COMPLEMENTARIO
    const [complementaryMessage, setComplementaryMessage] = useState<string | null>(null)
    const [dataComplementy, setDataComplementy] = useState<Prop>({
        speciesRegister: null,
        locationRegister: null,
        genderRegister: null,
        magicClassRegister: null,
        profilePicture: null
    })

    // USE REGISTER
    const { validateComplementaryData, validateFullNameDisplayName, validatePassword, uploadNewUser } = useRegister()


    // OBTENER LOS DATOS DEL SUBMIT Y VALIDARLOS
    const getSubmitData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const speciesRegister = dataComplementy.speciesRegister
        const locationRegister = dataComplementy.locationRegister
        const genderRegister = dataComplementy.genderRegister
        const magicClassRegister = dataComplementy.magicClassRegister
        const profilePictureFile = dataComplementy.profilePicture

        const fullNameRegister = new window.FormData(event.currentTarget).get('fullNameRegister')
        const ageRegister = new window.FormData(event.currentTarget).get('ageRegister')
        const displayNameRegister = new window.FormData(event.currentTarget).get('displayNameRegister')
        const descriptionRegister = new window.FormData(event.currentTarget).get('descriptionRegister')
        const passwordRegister = new window.FormData(event.currentTarget).get('passwordRegister')
        const passwordRegisterTwo = new window.FormData(event.currentTarget).get('passwordRegisterTwo')

        const result_a = validateComplementaryData(speciesRegister, locationRegister, genderRegister, magicClassRegister)
        if (result_a) return setComplementaryMessage(result_a)

        const result_b = validateFullNameDisplayName(fullNameRegister as string, displayNameRegister as string)
        if (result_b.state) return setComplementaryMessage(result_b.alert)

        const result_c = validatePassword(passwordRegister as string, passwordRegisterTwo as string)
        if (result_c.state) return setComplementaryMessage(result_c.alert)

        if (!result_a && !result_b.state && !result_c.state) {
            uploadNewUser(speciesRegister as string,
                locationRegister as string,
                genderRegister as string,
                magicClassRegister as string,
                fullNameRegister as string,
                ageRegister as string,
                profilePictureFile as File | null,
                result_b.alert as string,
                descriptionRegister as string | null,
                result_c.alert as string
            )
        }
    }


    return (<main className="register">
        <form className="register__form" onSubmit={getSubmitData}>

            <section className="register__form__complementary-face">
                <AvatarChange setDataComplementy={setDataComplementy} />
                <ComplementaryChange setDataComplementy={setDataComplementy} />
            </section>
            <section className="register__form__data-face">
                <h3 className="register__form__data-face__title">¡Registrate!</h3>
                {complementaryMessage && <span>{complementaryMessage}</span>}

                <input required

                    className="register__form__data-face__input"
                    type="text"
                    name="fullNameRegister"
                    placeholder="*Nombre completo"
                    onFocus={() => setComplementaryMessage(`Introduce tu nombre completo. [Sólo permite 
                        caracter alfanumérico del alfabeto latino básico, incluido el caracter de subrayado.]`)}
                />

                <input required
                    className="register__form__data-face__input"
                    type="text"
                    placeholder="*Nombre de Usuario"
                    name="displayNameRegister"
                    onFocus={() => setComplementaryMessage(`Introduce tu nombre de usuario. 
                    Los demás buscarán tu perfil por este nombre. [Sólo permite 
                    caracter alfanumérico del alfabeto latino básico, incluido el caracter de subrayado pero no los espacios.]`)}
                />

                <input required
                    className="register__form__data-face__input"
                    type="number"
                    placeholder="*Edad"
                    name="ageRegister"
                    onFocus={() => setComplementaryMessage(null)} />

                <input required
                    className="register__form__data-face__input"
                    type="password"
                    placeholder="*Crea tu contraseña"
                    name="passwordRegister"
                    onFocus={() => setComplementaryMessage(`Crea una contraseña para acceder a tu cuenta a futuro. [Permite 
                    caracter alfanumérico del alfabeto latino básico y estos caracteres: 
                        ! @ # $ % ^ & * ( ) _ + - = { } : ; " ' < > , .
                    `)}
                />

                <input required
                    className="register__form__data-face__input"
                    type="password"
                    placeholder="*Confirma tu contraseña"
                    name="passwordRegisterTwo"
                    onFocus={() => setComplementaryMessage(`Vuelve a introducir la misma contraseña para validarla.`)}
                />

                <textarea
                    className="register__form__data-face__textarea"
                    placeholder="*Añade tu descripción"
                    name="descriptionRegister"
                    onFocus={() => setComplementaryMessage(`Puedes añadir una descripción que te defina. 
                    Es opcional y los demás podrán ver detalles atravez de tí.`)}></textarea>

                <button type="submit" className="register__form__data-face__finish">¡Hora de unirse!</button>
                <Link to={'/'}>Volver</Link>
            </section>
        </form>
    </main>)
}