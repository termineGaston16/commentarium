import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListOfUsersWhoInteractedWithThisPost, Message } from "../Type.d/Interfaces";

const initialState: Message[] = [];

export const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload);
        },
        addUser: (state, action: PayloadAction<{ index: number, user: ListOfUsersWhoInteractedWithThisPost }>) => {
            const { index, user } = action.payload;
            state[index].interactions.listOfUsersWhoInteractedWithThisPost.push(user);
        },
        removeUser: (state, action: PayloadAction<{ indexMessage: number, indexUser: number }>) => {
            const { indexMessage, indexUser } = action.payload;
            state[indexMessage].interactions.listOfUsersWhoInteractedWithThisPost.splice(indexUser, 1);
        },
        updateUser: (state, action: PayloadAction<{ indexMessage: number, indexUser: number, newAction: 'LIKE' | 'DISLIKE' }>) => {
            const { indexMessage, indexUser, newAction } = action.payload;
            state[indexMessage].interactions.listOfUsersWhoInteractedWithThisPost[indexUser].actionU = newAction
        },
        updateLikes: (state, action: PayloadAction<{ indexMessage: number, newLikes: number, newDislikes: number }>) => {
            const { indexMessage, newLikes, newDislikes } = action.payload;
            state[indexMessage].interactions.likes = newLikes;
            state[indexMessage].interactions.dislikes = newDislikes;
        }
    }
});

export default groupChatSlice.reducer;