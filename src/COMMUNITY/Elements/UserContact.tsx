import './Styles/userContact.css';
import { User } from '../../REDUX/Type.d/Interfaces';
import { useUserContact } from './Hooks/useUserContact';
import ApiComplementary from './ApiComplementary';

interface Props {
    click: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserContact {
    displayName: User['displayName'],
    avatar: User['profilePictureUrl']
}

const UserContact: React.FC<Props> = ({ click }) => {

    const { usersContactsSearch, addInput, handleSearchChange } = useUserContact();

    return (
        <div className="user-contact">
            <div className="user-contact__form">
                <button
                    className="user-contact__form__cancel"
                    onClick={() => click(false)}
                    type="button">⨉</button>
                <input
                    type="search"
                    className="user-contact__form__input"
                    placeholder="*Busca al usuario"
                    onChange={(e) => handleSearchChange(e.target.value)}
                />

                <br className="user-contact__form__br" />

                {!usersContactsSearch.data.result ?
                    <span>Busca usuarios</span>
                    :
                    <ul className="user-contact__form__list">
                        {usersContactsSearch.isLoading || usersContactsSearch.data.isError ?

                            <ApiComplementary
                                isLoading={usersContactsSearch.isLoading}
                                isError={usersContactsSearch.data.isError} />
                            :
                            usersContactsSearch.data.result.map((user: { avatar: string, displayName: string }, index: number) => (
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
                            ))
                        }
                    </ul>}
            </div>
        </div>
    );
}

export default UserContact;
