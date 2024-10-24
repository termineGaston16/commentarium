import { configureStore } from "@reduxjs/toolkit";
import userOnlineSlice from "./slice/userOnline";
import { searchProfileByDisplayNameMiddleware, loginUserMiddleware, uploadNewUserMiddleware, addInputMiddleware} from './Middleware/middleware'
import ownUserSlice from "./slice/ownUser";
import  temporaryChatOwnUserSlice  from "./slice/temporaryChatOwnUser";

export const store = configureStore({
    reducer: {
        userOnline: userOnlineSlice,
        ownUser: ownUserSlice,
        temporaryChatOwnUser: temporaryChatOwnUserSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        searchProfileByDisplayNameMiddleware, 
        loginUserMiddleware,
        uploadNewUserMiddleware,
        addInputMiddleware)
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch