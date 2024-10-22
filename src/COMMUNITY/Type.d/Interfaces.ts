export interface Specie{
    natalName: string,
    nameTranslated: string
}

export interface Location {
    natalName: string,
    description: string,
    speciesIncident: Specie,
    img: string
}

export type Gender = string

export interface MagicClass {
    natalName: string,
    nameTranslated: string,
    description: string,
    img: string
}