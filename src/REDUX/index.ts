import { configureStore } from "@reduxjs/toolkit";
import  userOnlineSlice  from "./slice/userOnline";
import searchProfileByDisplayNameMiddleware from './Middleware/middleware'

export const store = configureStore({
    reducer: {
        userOnline: userOnlineSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchProfileByDisplayNameMiddleware)
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch