import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmptyUser, UserOnline,  } from "./userOnline";

const initialState: UserOnline = {
    user: EmptyUser,
    state: null
}

export const ownUserSlice = createSlice({
    name: 'ownUser',
    initialState,
    reducers: {
        assignOwnProfile: (_state, action: PayloadAction<UserOnline>) => {
            const { state, user } = action.payload
            return { user: user, state: state }
        }
    }
})

export default ownUserSlice.reducer