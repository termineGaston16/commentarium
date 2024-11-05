// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { CommentsMessage, InteractionsMessage, Message, MessageResponse, User } from "../REDUX/Type.d/Interfaces";
import { APIdata, ChatOwnUser, Gender, Location, MagicClass, Specie } from "../COMMUNITY/Type.d/Interfaces";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7nFM8sPQYE5JG1ozTOnNn055tGr5tLhY",
    authDomain: "commentarium-26153.firebaseapp.com",
    projectId: "commentarium-26153",
    storageBucket: "commentarium-26153.firebasestorage.app",
    messagingSenderId: "763276066508",
    appId: "1:763276066508:web:93ddae3c2b327d44bbcc69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// OBTENER PERFILES
export async function getProfilesFirebase(query: string): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'USERS'))

        response.forEach(object => {
            const data = object.data() as User

            if (data.displayName.includes(query)) {
                result.result.push({
                    displayName: data.displayName,
                    avatar: data.profilePictureUrl
                })
            }
        })

    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result;

}

// BUSCAR PERFIL POR DISPLAY NAME
export async function getPerfileByDisplayNameFirebase(name: string): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: undefined
    }

    try {
        const response = await getDocs(collection(db, 'USERS'))

        for (const object of response.docs) {
            const data = object.data() as User
            if (data.displayName === name) {
                result.result = {
                    age: data.age,
                    dateOfUnion: data.dateOfUnion,
                    description: data.description,
                    displayName: data.displayName,
                    fullName: data.fullName,
                    gender: data.gender,
                    id: data.id,
                    location: data.location,
                    magicClass: data.magicClass,
                    online: data.online,
                    password: data.password,
                    profilePictureUrl: data.profilePictureUrl,
                    species: data.species
                }
                return result;
            }
        }
    } catch (error) {
        result.isError = true;
    }

    return result;
}

// LOGUEAR USUARIO
export async function getPerfileByLogin(name: string, password: string): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: undefined
    }

    try {
        const response = await getDocs(collection(db, 'USERS'))

        for (const object of response.docs) {
            const data = object.data() as User
            if (data.displayName === name && data.password === password) {
                result.result = {
                    age: data.age,
                    dateOfUnion: data.dateOfUnion,
                    description: data.description,
                    displayName: data.displayName,
                    fullName: data.fullName,
                    gender: data.gender,
                    id: data.id,
                    location: data.location,
                    magicClass: data.magicClass,
                    online: data.online,
                    password: data.password,
                    profilePictureUrl: data.profilePictureUrl,
                    species: data.species
                }
                return result;
            }
        }

    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result

}

// SUBIR USUARIO
export async function storeNewUser(newUser: User): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: false
    }

    try {
        const docRef = await addDoc(collection(db, 'USERS'), { ...newUser, id: '0' } as User)
        await updateDoc(docRef, { id: docRef.id });

        result.result = true;
    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result
}

// OBTENER CHAT USUARIO PROPIO
export async function getChatOwnFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'CHAT_USER'))
        response.forEach(object => {
            const data = object.data() as ChatOwnUser
            result.result.push(data)
        })

    } catch (error) {
        result.isError = true
        console.error(error)
    }

    return result
}

// AGREGAR INPUT
export async function uploadInput(input: ChatOwnUser): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: false
    }

    try {
        await addDoc(collection(db, 'CHAT_USER'), input)
        result.result = true;
    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result
}

// EVIAR MENSAJE
export async function sendMessage(message: Message): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: false
    }

    try {
        const docRef = await addDoc(collection(db, 'GROUP_CHAT'), { ...message, id: '0' })
        await updateDoc(docRef, { id: docRef.id })
        result.result = true;
    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result

}

// OBTENER MENSAJES DE CHAT GRUPAL
export async function getChatGrupalFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'GROUP_CHAT'))
        response.forEach(object => {
            const data = object.data() as Message
            result.result.push({
                id: data.id,
                message: data.message,
                releaseDate: data.releaseDate,
                userIssuer: data.userIssuer
            } as Message)
        })
    } catch (error) {
        result.isError = true
        console.error(error)
    }

    return result
}

// SUBIR NUEVA INTERACCIÓN
export async function uploadNewInteractionFirebase(newInteraction: InteractionsMessage, idMessage: string): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: false
    }

    try {
        await addDoc(collection(db, 'listOfInteractions'), { ...newInteraction, idLocal: idMessage })
        result.result = true;
    } catch (error) {
        result.isError = true;
        console.error(error)
    }

    return result

}

// ACTUALIZAR INTERACCIÓN
export async function updateInteractionFirebase(newInteraction: InteractionsMessage): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: false
    };

    const interactionRef = doc(collection(db, 'listOfInteractions'), newInteraction.idLocal);

    try {
        const docSnapshot = await getDoc(interactionRef);
        if (docSnapshot.exists()) {
            await updateDoc(interactionRef, { ...newInteraction });
        } else {
            // Usa setDoc para crear el documento si no existe
            await setDoc(interactionRef, { ...newInteraction });
        }
        result.result = true;
    } catch (error) {
        result.isError = true;
        console.error("Error al actualizar o crear el documento:", error);
    }

    return result;
}


// OBTENER INTERACIONES
export async function getInteractionFirebase(): Promise<APIdata> {

    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const reponse = await getDocs(collection(db, 'listOfInteractions'))
        reponse.forEach(item => {
            const data = item.data() as InteractionsMessage
            result.result.push({
                dislikes: data.dislikes,
                idLocal: data.idLocal,
                likes: data.likes,
                listOfUsersWhoInteractedWithThisPost: data.listOfUsersWhoInteractedWithThisPost
            }) as InteractionsMessage
        })
    } catch (error) {
        result.isError = true
        console.error(error)
    }

    return result
}

// SUBIR UN NUEVO COMENTARIO
export async function uploadNewCommentFirebase(newComment: CommentsMessage, idMessage: string): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: false
    }

    try {
        await addDoc(collection(db, 'listOfComments'), { ...newComment, idLocal: idMessage })
        result.result = true
    } catch (error) {
        console.error(error)
        result.isError = false;
    }

    return result;
}

//AGREGAR RESPUESTA A UN COMENTARIO
export async function addNewCommentToMainMessageFirebase(
    idComment: string,
    messageResponse: MessageResponse
): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: false
    };

    try {
        const docRef = doc(collection(db, "listOfComments"), idComment);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Si el documento existe, actualizamos los comentarios
            await updateDoc(docRef, { comments: arrayUnion(messageResponse) });
            result.result = true;
        } else {
            // Si el documento no existe, lo creamos con el primer comentario
            await setDoc(docRef, { idLocal: idComment, comments: [messageResponse] });
            result.result = true;
        }
    } catch (error) {
        result.isError = true;
    }

    return result;
}


// OBTENER COMENTARIOS
export async function getCommentsFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'listOfComments'))
        response.forEach((object) => {
            const data = object.data() as CommentsMessage
            result.result = {
                comments: data.comments,
                idLocal: data.idLocal
            } as CommentsMessage
        })
    } catch (error) {
        result.isError = true
        console.error(error)
    }

    return result
}

//OBTENER LA CANTIDAD DE COMENTARIOS SEGUN UN MENSAJE
export async function getCommentLength(idMessage: string): Promise<number> {
    try {
        const docRef = doc(collection(db, 'listOfComments'), idMessage);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as CommentsMessage;
            return data.comments.length;
        } else {
            console.warn(`Documento con ID ${idMessage} no encontrado.`);
            return 0; // Retorna 0 si el documento no existe
        }
    } catch (error) {
        console.error("Error al obtener el conteo de comentarios:", error);
        return 0; // Retorna 0 en caso de error
    }
}

//OBTENER GENEROS
export async function getGenderFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'GENDER'))
        response.forEach(object => {
            const data = object.data() as Gender
            result.result.push({
                logo: data.logo,
                natalName: data.natalName
            } as Gender)
        })
    } catch (error) {
        result.result = true
        console.error(error)
    }

    return result
}

//OBTENER LOCACIONES
export async function getLocationsFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'LOCATIONS'))
        response.forEach(object => {
            const data = object.data() as Location
            result.result.push({
                description: data.description,
                img: data.img,
                natalName: data.natalName,
                speciesIncident: data.speciesIncident
            } as Location)
        })
    } catch (error) {
        result.result = true
        console.error(error)
    }

    return result
}

//OBTENER CLASES MAGICAS
export async function getMagicClassFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'MAGIC_CLASSES'))
        response.forEach(object => {
            const data = object.data() as MagicClass
            result.result.push({
                description: data.description,
                img: data.img,
                nameTranslated: data.nameTranslated,
                natalName: data.natalName
            } as MagicClass)
        })
    } catch (error) {
        result.result = true
        console.error(error)
    }

    return result
}

//OBTENER ESPECIES
export async function getSpeciesFirebase(): Promise<APIdata> {
    const result: APIdata = {
        isError: false,
        result: []
    }

    try {
        const response = await getDocs(collection(db, 'SPECIES'))
        response.forEach(object => {
            const data = object.data() as Specie
            result.result.push({
                nameTranslated: data.nameTranslated,
                natalName: data.natalName
            } as Specie)
        })
    } catch (error) {
        result.result = true
        console.error(error)
    }

    return result
}

//VALIDAR DISPLAY NAME GENERAL
export async function validateDisplayNameFirebase(displayNameData: string): Promise<APIdata> {
    let result: APIdata = {
        isError: false,
        result: false
    }

    try {
        const response = await getDocs(collection(db, 'USERS'))
        for (const object of response.docs) {
            const data = object.data() as User
            if (data.displayName === displayNameData) return result = {
                isError: false,
                result: true
            }
        }
    } catch (error) {
        console.error(error)

        return result = {
            isError: true,
            result: false
        }
    }

    return result
}

