import './Styles/register.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from './Hooks/useRegister';
import AvatarChange from '../Elements/AvatarChange';
import ComplementaryChange from '../Elements/ComplementaryChange';
import { useAppSelector } from '../../REDUX/Hook/useStore';

export interface Prop {
    speciesRegister: null | string,
    locationRegister: null | string,
    genderRegister: null | string,
    magicClassRegister: null | string,
    profilePictureUrl: null | string
}

export interface AlertSubmit {
    alert: string,
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
        profilePictureUrl: null
    })

    // USE REGISTER
    const { validateComplementaryData, validateFullNameDisplayName, validatePassword, uploadNewUser } = useRegister()


    // OBTENER LOS DATOS DEL SUBMIT Y VALIDARLOS
    const getSubmitData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const speciesRegister = dataComplementy.speciesRegister
        const locationRegister = dataComplementy.locationRegister
        const genderRegister = dataComplementy.genderRegister
        const magicClassRegister = dataComplementy.magicClassRegister
        const profilePictureUrl = dataComplementy.profilePictureUrl


        const fullNameRegister = new window.FormData(event.currentTarget).get('fullNameRegister')
        const ageRegister = new window.FormData(event.currentTarget).get('ageRegister')
        const displayNameRegister = new window.FormData(event.currentTarget).get('displayNameRegister')
        const descriptionRegister = new window.FormData(event.currentTarget).get('descriptionRegister')
        const passwordRegister = new window.FormData(event.currentTarget).get('passwordRegister')
        const passwordRegisterTwo = new window.FormData(event.currentTarget).get('passwordRegisterTwo')

        const result_a = validateComplementaryData(speciesRegister, locationRegister, genderRegister, magicClassRegister)
        if (result_a) return setComplementaryMessage(result_a)

        const result_b = await validateFullNameDisplayName(fullNameRegister as string, displayNameRegister as string);
        if (result_b.state) return setComplementaryMessage(result_b.alert);

        const result_c = validatePassword(passwordRegister as string, passwordRegisterTwo as string)
        if (result_c.state) return setComplementaryMessage(result_c.alert)

        if (!result_a && !result_b.state && !result_c.state) {
            
            uploadNewUser(speciesRegister as string,
                locationRegister as string,
                genderRegister as string,
                magicClassRegister as string,
                fullNameRegister as string,
                ageRegister as string,
                profilePictureUrl as string | null,
                result_b.alert as string,
                descriptionRegister as string | null,
                result_c.alert as string
            )
        }
    }

    const ownUser = useAppSelector(state => state.ownUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (ownUser.user.online) navigate('/')
        if(ownUser.state) setComplementaryMessage(ownUser.state)
    }, [ownUser])

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
                    maxLength={20}
                    className="register__form__data-face__input"
                    type="text"
                    name="fullNameRegister"
                    placeholder="*Nombre completo"
                    onFocus={() => setComplementaryMessage(`Introduce tu nombre completo. [Sólo permite 
                        caracter alfanumérico del alfabeto latino básico, incluido el caracter de subrayado. El máximo son 20
                        caracteres.]`)}
                />

                <input required
                    maxLength={20}
                    className="register__form__data-face__input"
                    type="text"
                    placeholder="*Nombre de Usuario"
                    name="displayNameRegister"
                    onFocus={() => setComplementaryMessage(`Introduce tu nombre de usuario. 
                    Los demás buscarán tu perfil por este nombre. [Sólo permite 
                    caracter alfanumérico del alfabeto latino básico, incluido el caracter de subrayado pero no los espacios.
                    El máximo son 20 caracteres.]`)}
                />

                <input required
                    className="register__form__data-face__input"
                    type="number"
                    placeholder="*Edad"
                    name="ageRegister"
                    onFocus={() => setComplementaryMessage(null)} />

                <input required
                    maxLength={30}
                    minLength={8}
                    className="register__form__data-face__input"
                    type="password"
                    placeholder="*Crea tu contraseña"
                    name="passwordRegister"
                    onFocus={() => setComplementaryMessage(`Crea una contraseña para acceder a tu cuenta a futuro. [Debe tener una
                        longitud entre 8 y 30 caracteres. Permite 
                    caracter alfanumérico del alfabeto latino básico y estos caracteres: 
                        ! @ # $ % ^ & * ( ) _ + - = { } : ; " ' < > , .
                    `)}
                />

                <input required
                    maxLength={30}
                    minLength={8}
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