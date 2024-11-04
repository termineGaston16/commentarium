import { IconType } from "react-icons";
import { UserContact } from "../Elements/UserContact";

export interface Specie {
    natalName: string;
    nameTranslated: string;
}

export interface Location {
    natalName: string;
    description: string;
    speciesIncident: Specie;
    img: string;
}

export interface MagicClass {
    natalName: string;
    nameTranslated: string;
    description: string;
    img: string;
}

export interface Gender {
    natalName: string;
    logo: IconType;
}

export interface Text_ChatOwnUser {
    type: 'TEXT',
    value: string
}

export interface Survey_ChatOwnUser {
    type: 'SURVEY',
    value: {
        title: string,
        options: string[]
    }
}

export interface File_ChatOwnUser {
    type: 'IMG_FILE' | 'DOC_FILE' | 'AUD_FILE',
    value: string
    data: {
        name: string,
        type: string,
        size: number
    }
}

export interface User_ChatOwnUser {
    type: 'USER',
    value: UserContact
}

export type ChatOwnUser = Text_ChatOwnUser | File_ChatOwnUser | Survey_ChatOwnUser | User_ChatOwnUser;

export interface APIdata {
    result: any,
    isError: boolean,
}

export interface APIresponse {
    data: APIdata,
    isLoading: boolean
}

export const APIresponseDefault = {
    data: {
        result: null,
        isError: false,
    },
    isLoading: false
}
