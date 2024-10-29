import './Styles/userContact.css'
import { useState } from 'react';
import { User } from '../../REDUX/Type.d/Interfaces';
import { useUserContact } from './Hooks/useUserContact';

interface Props {
    click: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserContact {
    displayName: User['displayName'],
    avatar: User['profilePictureUrl']
}

const UserContact: React.FC<Props> = ({ click }) => {

    // ARRAY DE USER CONTACT
    const [usersContactsSearch, setUsersContactsSearch] = useState<UserContact[]>([])

    const { getProfiles, addInput } = useUserContact()

    return (<div className="user-contact">
        <div className="user-contact__form">
            <button
                className="user-contact__form__cancel"
                onClick={() => click(false)}
                type="button">⨉</button>
            <input
                type="search"
                className="user-contact__form__input"
                placeholder="*Busca al usuario"
                onChange={(e) => {
                    setUsersContactsSearch(getProfiles(e.target.value))
                }}
            />

            <br className="user-contact__form__br" />
            <ul className="user-contact__form__list">
                {usersContactsSearch.length < 1 ? <span>*No hay usuarios</span> :
                    usersContactsSearch.map((user, index) => (
                        <li
                            onClick={() => addInput('temporaryChatOwnUserSlice/addInput', { t: 'USER', v: user }, click)}
                            key={index} className="user-contact__form__list__item">
                            <img
                                className="user-contact__form__list__item__avatar"
                                src={`/perfil/${user.avatar}`} alt="" style={{ width: '30vw' }} />
                            <span
                                className="user-contact__form__list__item__display-name"
                            >@{user.displayName}</span>
                        </li>
                    ))}
            </ul>
        </div>
    </div>)
}

export default UserContact;