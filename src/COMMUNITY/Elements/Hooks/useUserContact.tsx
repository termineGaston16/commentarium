import { USERS } from "../../../dataLocal"
import { User } from "../../../REDUX/Type.d/Interfaces"

export const useUserContact = () => {

    // OBTENER PERFILES
    const getProfiles = (query: string): {
        displayName: User['displayName'],
        avatar: User['profilePictureFile']
    }[] => {
        if(query.length < 1) return []

        return USERS
            .filter(user => user.displayName.includes(query))
            .map(user => ({
                displayName: user.displayName,
                avatar: user.profilePictureFile
            }))
    }
    return { getProfiles }
}
