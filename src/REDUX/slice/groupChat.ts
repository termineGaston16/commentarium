import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../Type.d/Interfaces";

const initialState: Message[] = [];

export const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload);
        }
    }
});

export default groupChatSlice.reducer;