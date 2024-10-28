import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatOwnUser } from "../../COMMUNITY/Type.d/Interfaces";

export const initialState: ChatOwnUser[] = [];

export const temporaryChatOwnUserSlice = createSlice({
    name: 'temporaryChatOwnUserSlice',
    initialState,
    reducers: {
        addInputToChat: (state, action: PayloadAction<ChatOwnUser>) => {
            state.push(action.payload);
        },
        removedInputChat: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1)
        },
        modifyValueInput: (state, action: PayloadAction<{ index: number, newValue: string }>) => {
            const { index, newValue } = action.payload;
            state[index].value = newValue;
        },
        emptyInputChat: (state, _action) => {
            state.splice(0)
        }
    }
})

export const { addInputToChat } = temporaryChatOwnUserSlice.actions;
export default temporaryChatOwnUserSlice.reducer;
