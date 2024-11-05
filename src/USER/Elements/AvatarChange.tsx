import { useState } from "react"
import { GrGallery } from "react-icons/gr";
import { Prop } from "../Components/Register";

interface Props {
    setDataComplementy: React.Dispatch<React.SetStateAction<Prop>>
}

const AvatarChange: React.FC<Props> = ({ setDataComplementy }) => {

    const [avatarState, setAvatarState] = useState<string | null>(null)

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {

                setDataComplementy(prevState => ({ ...prevState, profilePictureUrl: reader.result as string}))
                setAvatarState(reader.result as string)
            }
            reader.onerror = () => {
                alert('Ocurrió un Error. Vuelvelo a intentar.')
                setAvatarState(null)
            }
        }
    }


    return (<>

        {avatarState && <img src={avatarState} alt="" style={{ width: '50%' }} />}
        <label htmlFor="inputProfilePhoto" className="register__form__complementary-face__label-img">
            <GrGallery />
            Elige una foto de perfil
        </label>
        <input
            type="file"
            accept='image/*'
            name="profilePictureLocal"
            id='inputProfilePhoto'
            hidden
            onChange={handleAvatarChange}
        />
    </>)
}

export default AvatarChange;