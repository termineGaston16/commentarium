import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Type.d/Interfaces";

export interface UserOnline {
    user: User,
    state: null | string
}

export const EmptyUser: User = {
    age: 0,
    dateOfUnion:'',
    description:'',
    displayName:'',
    fullName:'',
    gender: '',
    id:'',
    location: '',
    magicClass:'',
    profilePictureUrl:'',
    species:'',
    online: false,
    password: ''
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