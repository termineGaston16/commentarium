import { IoMdFemale, IoIosMale } from "react-icons/io";
import { FaGenderless } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FaUserLargeSlash } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../REDUX/Hook/useStore";
import { useOnlineUserProfile } from "../../COMMUNITY/Components/Hooks/useOnlineUserProfile";
import { EmptyUser } from "../../REDUX/slice/userOnline";

export default function OnlineUserProfile() {

    // VALIDAR DISPLAY NAME QUERY
    const { validateQueryDisplayName } = useOnlineUserProfile()
    const { displayName } = useParams()
    const [alertMessage, setAlertMessage] = useState<string | null>(null)

    useEffect(() => {
        if (displayName) return setAlertMessage(validateQueryDisplayName(displayName))
    }, [displayName])

    // USER ONLINE LOCAL
    const userOnline = useAppSelector(state => state.userOnline)
    // USUARIO PROPIO
    const ownUser = useAppSelector(state => state.ownUser)

    //DECLARAR GÉNERO
    const declareGender = (gender: string) => {
        switch (gender) {
            case 'Indefinido':
                return <FaGenderless />

            case 'Femenino':
                return <IoMdFemale />

            case 'Masculino':
                return <IoIosMale />
            default:
                break;
        }
    }

    //DESLOGUEAR USUARIO
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logOut = (): void => {
        dispatch({ type: 'ownUser/assignOwnProfile', payload: { user: EmptyUser, state: null } })
        navigate('/')
    }

    return (
        alertMessage ? <span>{alertMessage}</span> :
            userOnline.state ? <span>{userOnline.state}</span> :
                <main className="online-user-perfile">
                    <section className="online-user-perfile__data-profile">
                        <img className="online-user-perfile__data-profile__avatar"
                            src={userOnline.user.profilePictureUrl}
                            alt={`Foto de perfil del usuario ${userOnline.user.displayName}`} />
                        <div className="online-user-perfile__data-profile__names">
                            <span className="online-user-perfile__data-profile__names__display-name">@{userOnline.user.displayName}</span>
                            <span className="online-user-perfile__data-profile__names__full-name">{userOnline.user.fullName}</span>
                        </div>
                        <ul className="online-user-perfile__data-profile__characteristics">
                            <li className="online-user-perfile__data-profile__characteristics__item">
                                Edad: <span>{userOnline.user.age}</span></li>
                            <li className="online-user-perfile__data-profile__characteristics__item">
                                Género: <span>{declareGender(userOnline.user.gender)}</span></li>
                            <li className="online-user-perfile__data-profile__characteristics__item">
                                Especie: <span>{userOnline.user.species}</span></li>
                        </ul>
                    </section>
                    <section className="online-user-perfile__supplementary-data">
                        <header className="online-user-perfile__supplementary-data__options">
                            <Link className="online-user-perfile__supplementary-data__options__btn" to={'/'}><MdOutlineArrowBackIos /></Link>

                            {ownUser.user.online && <>
                                <button className="online-user-perfile__supplementary-data__options__btn" type="button" onClick={logOut}><FaUserLargeSlash /></button></>}

                            <span className="online-user-perfile__supplementary-data__options__date">Unido desde {userOnline.user.dateOfUnion}</span>
                        </header>
                        <main className="online-user-perfile__supplementary-data__main">
                            <p className="online-user-perfile__supplementary-data__main__description">{userOnline.user.description}</p>
                            <span className="online-user-perfile__supplementary-data__main__data">{userOnline.user.location}</span>
                            <span className="online-user-perfile__supplementary-data__main__data">{userOnline.user.magicClass}</span>
                        </main>
                    </section>
                </main>)
}