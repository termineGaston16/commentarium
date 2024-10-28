import { USERS } from "../../../dataLocal"

export const validateDisplayName = (displayNameData: string): boolean => {
    return USERS.some(user => user.displayName === displayNameData)
}