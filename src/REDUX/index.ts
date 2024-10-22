import { configureStore } from "@reduxjs/toolkit";
import userOnlineSlice from "./slice/userOnline";
import { searchProfileByDisplayNameMiddleware, loginUserMiddleware } from './Middleware/middleware'
import ownUserSlice from "./slice/ownUser";

export const store = configureStore({
    reducer: {
        userOnline: userOnlineSlice,
        ownUser: ownUserSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchProfileByDisplayNameMiddleware, loginUserMiddleware)
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch