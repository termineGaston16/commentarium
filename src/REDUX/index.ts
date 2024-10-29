import { configureStore } from "@reduxjs/toolkit";
import userOnlineSlice from "./slice/userOnline";
import { searchProfileByDisplayNameMiddleware, loginUserMiddleware, uploadNewUserMiddleware, addInputMiddleware, sendOrReplyMessage} from './Middleware/middleware'
import ownUserSlice from "./slice/ownUser";
import  temporaryChatOwnUserSlice  from "./slice/temporaryChatOwnUser";
import  groupChatSlice  from "./slice/groupChat";

export const store = configureStore({
    reducer: {
        userOnline: userOnlineSlice,
        ownUser: ownUserSlice,
        temporaryChatOwnUser: temporaryChatOwnUserSlice,
        groupChat: groupChatSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        searchProfileByDisplayNameMiddleware, 
        loginUserMiddleware,
        uploadNewUserMiddleware,
        addInputMiddleware,
        sendOrReplyMessage
    )
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch