import { MdOutlineArrowBackIos } from "react-icons/md";
import { FaUserLargeSlash } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { EmptyUser } from "../../REDUX/slice/userOnline";
import { useOnlineUserProfile } from "./Hooks/useOnlineUserProfile";

import '../../COMMUNITY/Components/Styles/onlineUserProfile.css'

export default function OnlineUserProfile() {

    const userOnline = useAppSelector(state => state.userOnline)
    const ownUser = useAppSelector(state => state.ownUser)

    const [alertMessage, setAlertMessage] = useState<string | null>(null)
    const { declareGender, logOut, validateQueryDisplayName } = useOnlineUserProfile()
    const { displayName } = useParams()


    useEffect(() => {
        if (displayName) return setAlertMessage(validateQueryDisplayName(displayName))
    }, [displayName])


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
                                <button className="online-user-perfile__supplementary-data__options__btn" type="button" onClick={() =>
                                    logOut('ownUser/assignOwnProfile', { user: EmptyUser, state: null })
                                }><FaUserLargeSlash /></button></>}

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