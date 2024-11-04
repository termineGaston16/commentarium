import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../Type.d/Interfaces";

export interface GroupChat {
    list: Message[],
    state: null | string
}

const initialState: GroupChat = {
    list: [],
    state: null
}

export const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.list.push(action.payload);
        },
        getMessagesGroupChat: (_state, action: PayloadAction<GroupChat>) => {
            const { list, state } = action.payload
            return {
                list: list,
                state: state
            }
        },
        modifyState: (state, action: PayloadAction<string>) => {
            state.state = action.payload
        }

    }
});

export default groupChatSlice.reducer;