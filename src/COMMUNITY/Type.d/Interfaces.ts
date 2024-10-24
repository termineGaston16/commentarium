import { IconType } from "react-icons";
import { User } from "../../REDUX/Type.d/Interfaces";

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

export interface Text_ChatOwnUser{
    type: 'TEXT',
    value:string
}

export interface Survey_ChatOwnUser{
    type: 'SURVEY',
    value: {
        title: string,
        options: string[]
    }
}

export interface File_ChatOwnUser{
    type: 'FILE',
    value: File
}

export interface User_ChatOwnUser{
    type: 'USER',
    value: User
}

export type ChatOwnUser = Text_ChatOwnUser | File_ChatOwnUser | Survey_ChatOwnUser | User_ChatOwnUser;
