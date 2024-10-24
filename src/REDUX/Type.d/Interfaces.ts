import { Gender, Location, MagicClass, Specie } from "../../COMMUNITY/Type.d/Interfaces";

export interface Character {
    fullName: string;     
    age: number;       
    species: Specie['nameTranslated'];
    location: Location['natalName'];
    gender: Gender['natalName']; 
    magicClass: MagicClass['nameTranslated']; 
}

export interface User extends Character{
    id: string,
    displayName: string, 
    description: string,  
    dateOfUnion: string,
    profilePictureFile: File | null,
    profilePictureUrl: string
    online: boolean,
    password: string
}