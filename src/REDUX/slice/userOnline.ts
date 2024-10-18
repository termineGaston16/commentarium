import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Type.d/Interfaces";

interface UserOnline {
    user: User,
    state: null | string
}

export const EmptyUser: User = {
    age: 0,
    dateOfUnion:'',
    description:'',
    displayName:'',
    fullName:'',
    gender:'Indefinido',
    id:'',
    location:'Centro de Indawo',
    magicClass:'Aegiscaster',
    profilePicture:'',
    species:'Human'
}

const initialState: UserOnline = {
    user: EmptyUser,
    state: null
}



export const userOnlineSlice = createSlice({
    name: 'userOnline',
    initialState,
    reducers: {
        assignProfile: (_state, action: PayloadAction<UserOnline>) => {
            const { user, state } = action.payload
            return { user: user, state: state }
        }
    }
})

export default userOnlineSlice.reducer