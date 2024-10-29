import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { usePersonalProfile } from "./Hooks/usePersonalProfile";
import { useLogin } from "./Hooks/useLogin";


export default function Login() {

    const ownUser = useAppSelector(state => state.ownUser)

    const [alertMessageOne, setAlertMessageOne] = useState<string | null>(null)
    const [alertMessageTwo, setAlertMessageTwo] = useState<string | null>(null)
    const [alertMessageThree, setAlertMessageThree] = useState<string | null>(null)

    const { validateDisplayName, validateLoginUser, validatePassworld } = usePersonalProfile()
    const { handleSubmitLogin } = useLogin()
    const navigate = useNavigate()


    useEffect(() => {
        if (ownUser.state) return setAlertMessageThree(ownUser.state)
        if (!ownUser.state && ownUser.user.online) navigate('/')
    }, [ownUser])

    return (
        <main>
            <form onSubmit={(event) => handleSubmitLogin(event,validateDisplayName, 
                validateLoginUser, validatePassworld, setAlertMessageOne, setAlertMessageTwo)}>

                <label> Ingresa los datos de tu cuenta</label>
                {alertMessageThree && <span>{alertMessageThree}</span>}

                <input type="text" name='displayName' placeholder="* Nombre de usuario." required />
                {alertMessageOne && <span style={{ color: 'red' }}>{alertMessageOne}</span>}

                <input type="password" name='password' placeholder="* Contraseña." required />
                {alertMessageTwo && <span style={{ color: 'red' }}>{alertMessageTwo}</span>}

                <button type="submit">Loguearse</button>
                <Link to={'/registrarse'}>¿No tienes una cuenta? ¡Registrate!</Link>
            </form>
        </main>
    )
}