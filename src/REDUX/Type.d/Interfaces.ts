import { ChatOwnUser, Gender, Location, MagicClass, Specie } from "../../COMMUNITY/Type.d/Interfaces";

export interface Character {
    fullName: string;
    age: number;
    species: Specie['nameTranslated'];
    location: Location['natalName'];
    gender: Gender['natalName'];
    magicClass: MagicClass['nameTranslated'];
}

export interface User extends Character {
    id: string,
    displayName: string,
    description: string,
    dateOfUnion: string,
    profilePictureUrl: string
    online: boolean,
    password: string
}

export interface ListOfUsersWhoInteractedWithThisPost {
    user: User['displayName'],
    actionU: 'LIKE' | 'DISLIKE'
}

export interface Message {
    id: number,
    userIssuer: {
        name: User['displayName'],
        avatar: User['profilePictureUrl']
    },
    message: ChatOwnUser[],
    releaseDate: string,
    interactions: {
        listOfUsersWhoInteractedWithThisPost: ListOfUsersWhoInteractedWithThisPost[],
        likes: number,
        dislikes: number,
        comments: {
            amount: number,
            comments: {
                userIssuerAdditional: User,
                releaseDateAdditional: string,
                messageAdditional: ChatOwnUser,
            }[]
        }
    }
}