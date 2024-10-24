import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../REDUX/Hook/useStore"
import { User } from "../../../REDUX/Type.d/Interfaces"
import { validateDisplayName } from "../Functions/validateDisplayName"
import { AlertSubmit } from "../User/Register"

export const useRegister = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // VALIDAR DATOS COMPLEMENTARIOS
    const validateComplementaryData = (speciesRegister: string | null,
        locationRegister: string | null,
        genderRegister: string | null,
        magicClassRegister: string | null): string | null => {

        if (speciesRegister === null) return 'Elige tu Especie.'
        if (locationRegister === null) return 'Elige tu Locación.'
        if (genderRegister === null) return 'Elige tu Género.'
        if (magicClassRegister === null) return 'Elige tu Clase Mágica.'
        return null
    }

    // VALIDAR NOMBRE COMPLETO Y DISPLAY NAME
    const validateFullNameDisplayName = (fullName: string, displayName: string): AlertSubmit => {
        const fullNameFiltered = fullName
            .trim()
            .replace(/\W/g, '')

        if (fullNameFiltered.length < 1) return { alert: 'Ingresa un nombre completo válido', state: true }

        const displayNameFiltered = displayName
            .trim()
            .replace(/\W/g, '')

        if (displayNameFiltered.length < 1) return { alert: 'Ingresa un nombre de usuario válido', state: true }
        if (validateDisplayName(displayNameFiltered)) return { alert: 'Ese nombre ya existe.', state: true }

        return { alert: displayNameFiltered, state: false };
    }

    //VALIDAR CONTRASEÑA
    const validatePassword = (passwordRegister: string, passwordRegisterTwo: string): AlertSubmit => {
        const passwordRegisterFiltered = passwordRegister
            .trim()
            .replace(/[^A-Za-z0-9 ! @ # $ % ^ & * ( ) _ + - = { } : ; " ' < > , .]/g, '')

        if (passwordRegisterFiltered.length < 1) return { alert: 'Ingresa una contraseña válida.', state: true }
        if (passwordRegisterFiltered !== passwordRegisterTwo) return { alert: 'Las contraseñas no coinciden.', state: true }
        return { alert: passwordRegisterFiltered, state: false };
    }

    // SUBIR NUEVO USUARIO
    const uploadNewUser = (speciesRegister: string,
        locationRegister: string,
        genderRegister: string,
        magicClassRegister: string,
        fullNameRegister: string,
        ageRegister: string,
        profilePictureFile: File | null,
        displayNameRegister: string,
        descriptionRegister: string | null,
        passwordRegister: string

    ): void => {

        const newUser: User = {
            age: parseInt(ageRegister),
            dateOfUnion: new Date().toLocaleDateString(),
            description: descriptionRegister ?? '',
            displayName: displayNameRegister,
            fullName: fullNameRegister,
            gender: genderRegister,
            id: '',
            location: locationRegister,
            magicClass: magicClassRegister,
            online: true,
            password: passwordRegister,
            profilePictureFile: profilePictureFile ?? null,
            profilePictureUrl: '',
            species: speciesRegister
        }

        dispatch({ type: 'ownUser/uploadNewUser', payload: newUser })
        navigate('/')

    }

    return { validateComplementaryData, validateFullNameDisplayName, validatePassword, uploadNewUser }
}