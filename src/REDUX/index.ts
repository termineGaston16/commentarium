import { configureStore } from "@reduxjs/toolkit";
import userOnlineSlice from "./slice/userOnline";
import { searchProfileByDisplayNameMiddleware, loginUserMiddleware, uploadNewUserMiddleware } from './Middleware/middleware'
import ownUserSlice from "./slice/ownUser";

export const store = configureStore({
    reducer: {
        userOnline: userOnlineSlice,
        ownUser: ownUserSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        searchProfileByDisplayNameMiddleware, 
        loginUserMiddleware,
        uploadNewUserMiddleware)
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch