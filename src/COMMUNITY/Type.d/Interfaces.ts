import { IconType } from "react-icons";

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
