import { Gender, Location, MagicClass, Specie } from "../../COMMUNITY/Type.d/Interfaces";

export interface Character {
    fullName: string;     
    age: number;       
    species: Specie['natalName'];
    location: Location['natalName'];
    gender: Gender; 
    magicClass: MagicClass['natalName']; 
}

export interface User extends Character{
    id: string,
    displayName: string, 
    description: string,  
    dateOfUnion: string,
    profilePicture: string,
    online: boolean,
    password: string
}