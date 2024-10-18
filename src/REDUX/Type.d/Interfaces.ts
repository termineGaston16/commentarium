export interface Character {
    fullName: string;     
    age: number;       
    species: "Human" | "Faeril" | "Daegon" | "Felyrian" | "Jebale-c";
    location: "Centro de Indawo" | "Sylvalora" | "Abyssor" | "Nyssara" | "Thornez'har";
    gender: "Masculino" | "Femenino" | "Indefinido"; 
    magicClass: "Aegiscaster" | "Luminaris" | "Valkyros" | "Arcanomancer"; 
}

export interface User extends Character{
    id: string,
    displayName: string, 
    description: string,  
    dateOfUnion: string,
    profilePicture: string,
}