import { IoIosMale, IoMdFemale } from "react-icons/io";
import { Specie, MagicClass, Location, Gender } from "./COMMUNITY/Type.d/Interfaces";
import { User } from "./REDUX/Type.d/Interfaces";
import { FaGenderless } from "react-icons/fa6";

export const USERS: User[] = [
    {
        id: "001",
        displayName: "Aislyn_Faeryn",
        fullName: "Aislyn Faeryn",
        age: 25,
        species: "Faeril",
        location: "Sylvalora",
        gender: 'Femenino',
        magicClass: "Luminaris",
        description: "Una joven Faeril que domina la magia de la luz, conocida por su naturaleza empática y su búsqueda de la verdad.",
        dateOfUnion: "2023-10-17",
        profilePictureUrl: "https://example.com/faeril.jpg",
        profilePictureFile: null,
        online: false,
        password: 'abc'
    },
    {
        id: "002",
        displayName: "Kael_Thornezhar",
        fullName: "Kael Daegon",
        age: 30,
        species: "Daegon",
        location: "Thornez'har",
        gender: "Masculino",
        magicClass: "Aegiscaster",
        description: "Un guerrero Daegon del frío desierto de Thornez'har, conocido por su destreza con escudos mágicos y defensa impenetrable.",
        dateOfUnion: "2023-05-12",
        profilePictureUrl: "https://example.com/daegon.jpg",
        profilePictureFile: null,
        online: false,
        password: 'ABC'
    },
    {
        id: "003",
        displayName: "Lyria_Nyssara",
        fullName: "Lyria Felyrian",
        age: 22,
        species: "Felyrian",
        location: "Nyssara",
        gender: "Femenino",
        magicClass: "Arcanomancer",
        description: "Una Felyrian de Nyssara, hábil en el control de arcanos y con una mente curiosa que explora las energías místicas.",
        dateOfUnion: "2024-01-03",
        profilePictureUrl: "https://example.com/felyrian.jpg",
        profilePictureFile: null,
        online: false,
        password: '123'
    },
    {
        id: "004",
        displayName: "Torin_Abyssor",
        fullName: "Torin Jebale-c",
        age: 40,
        species: "Jebale-c",
        location: "Abyssor",
        gender: "Masculino",
        magicClass: "Valkyros",
        description: "Torin es un enigmático Jebale-c de Abyssor, maestro de las tormentas y los vientos furiosos que guarda secretos ancestrales.",
        dateOfUnion: "2022-11-20",
        profilePictureUrl: "https://example.com/jebale-c.jpg",
        profilePictureFile: null,
        online: false,
        password: 'aBC'
    }, {
        id: "005",
        displayName: "Eirik_Indawo",
        fullName: "Eirik Human",
        age: 35,
        species: "Human",
        location: "Centro de Indawo",
        gender: "Masculino",
        magicClass: "Arcanomancer",
        description: "Eirik, un humano del Centro de Indawo, es un hechicero con vasto conocimiento en las artes arcanas y estrategias mágicas.",
        dateOfUnion: "2021-08-15",
        profilePictureUrl: "https://example.com/human.jpg",
        profilePictureFile: null,
        online: false,
        password: 'asd'
    }
]

export const SPECIES: Specie[] = [
    { natalName: "Humans", nameTranslated: "Humanos" },
    { natalName: "Faerils", nameTranslated: "Hadas" },
    { natalName: "Daegons", nameTranslated: "Demonios" },
    { natalName: "Felyrians", nameTranslated: "Felinos" },
    { natalName: "Jebale-cs", nameTranslated: "Jebale-cs" }
];

export const LOCATIONS: Location[] = [
    {
        natalName: "Sylvalora",
        description: "Un vasto bosque encantado lleno de árboles brillantes y una atmósfera mágica, donde los Faerils viven en armonía con la naturaleza. Sus ciudades están en lo alto de los árboles, conectadas por puentes de luz.",
        speciesIncident: { natalName: "Faerils", nameTranslated: "Sylvalora" },
        img: "path_to_image_of_sylvalora"
    },
    {
        natalName: "Abyssor",
        description: "Una tierra oscura y volcánica, donde el fuego y la lava son omnipresentes. Abyssor es un reino subterráneo lleno de fortalezas y cavernas profundas, gobernado por un aura de poder y misterio.",
        speciesIncident: { natalName: "Daegons", nameTranslated: "Abyssor" },
        img: "path_to_image_of_abyssor"
    },
    {
        natalName: "Nyssara",
        description: "Un reino montañoso con vastas llanuras y densas selvas. Los Felyrians habitan en ciudades ocultas entre la vegetación y en cavernas naturales, reflejando su agilidad y habilidad para moverse en diversos terrenos.",
        speciesIncident: { natalName: "Felyrians", nameTranslated: "Nyssara" },
        img: "path_to_image_of_nyssara"
    },
    {
        natalName: "Thornez'har",
        description: "Un lugar árido, marcado por montañas escarpadas y desiertos inhóspitos. Los Jebale-cs habitan en grandes ciudades fortificadas, con una arquitectura impresionante hecha de piedra negra y cristal, reflejando su cultura resistente y antigua.",
        speciesIncident: { natalName: "Jebale-cs", nameTranslated: "Thornez'har" },
        img: "path_to_image_of_thornezhar"
    }
];

export const MAGIC_CLASSES: MagicClass[] = [
    {
        natalName: "Aegiscaster",
        nameTranslated: "Mago de Defensa",
        description: "Un mago especializado en protección y barreras mágicas. El nombre 'Aegis' proviene del escudo mitológico, lo que evoca poder defensivo.",
        img: "path_to_image_of_aegiscaster"
    },
    {
        natalName: "Lumairys",
        nameTranslated: "Mago de Apoyo",
        description: "Un mago centrado en curación y fortalecimiento de aliados. 'Luminaris' sugiere luz y apoyo, asociado a la idea de guiar y reforzar a otros.",
        img: "path_to_image_of_lumairys"
    },
    {
        natalName: "Valkyros",
        nameTranslated: "Mago Atacante",
        description: "Un mago cuya magia está diseñada para combate directo y ofensiva, tomando el nombre de las guerreras mitológicas Valkirias, representando poder y agresividad en batalla.",
        img: "path_to_image_of_valkyros"
    },
    {
        natalName: "Arcanomancer",
        nameTranslated: "Mago Elemental",
        description: "Un mago que manipula los elementos (fuego, agua, tierra, aire), sugiriendo un dominio profundo de las fuerzas elementales.",
        img: "path_to_image_of_arcanomancer"
    }
];

export const GENDER: Gender[] = [
    {
        natalName: 'Femenino',
        logo: IoMdFemale
    },
    {
        natalName: 'Masculino',
        logo: IoIosMale
    },
    {
        natalName: 'Indefenido',
        logo: FaGenderless
    }
]

