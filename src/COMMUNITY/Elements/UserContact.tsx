import './Styles/userContact.css'
import { useState } from 'react';
import { User } from '../../REDUX/Type.d/Interfaces';
import { useUserContact } from './Hooks/useUserContact';
import { useAppDispatch } from '../../REDUX/Hook/useStore';

interface Props {
    click: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserContact {
    displayName: User['displayName'],
    avatar: User['profilePictureUrl']
}

const UserContact: React.FC<Props> = ({ click }) => {

    const dispatch = useAppDispatch()

    // ARRAY DE USER CONTACT
    const { getProfiles } = useUserContact()
    const [usersContactsSearch, setUsersContactsSearch] = useState<UserContact[]>([])


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
                            onClick={() => {
                                dispatch({ type: 'temporaryChatOwnUserSlice/addInput', payload: { t: 'USER', v: user } })
                                click(false)
                            }}
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