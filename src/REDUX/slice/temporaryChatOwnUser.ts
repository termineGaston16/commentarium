import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatOwnUser } from "../../COMMUNITY/Type.d/Interfaces";

export interface UserChat {
    result: ChatOwnUser[],
    state: string | null
}

export const initialState: UserChat ={
    result: [],
    state : null
}

export const temporaryChatOwnUserSlice = createSlice({
    name: 'temporaryChatOwnUserSlice',
    initialState,
    reducers: {
        addInputToChat: (state, action: PayloadAction<ChatOwnUser>) => {
            state.result.push(action.payload);
        },
        removedInputChat: (state, action: PayloadAction<number>) => {
            state.result.splice(action.payload, 1)
        },
        modifyValueInput: (state, action: PayloadAction<{ index: number, newValue: string }>) => {
            const { index, newValue } = action.payload;
            state.result[index].value = newValue;
        },
        emptyInputChat: (state, _action) => {
            state.result.splice(0)
        },
        modifyState: (state, action:PayloadAction<string>) =>{
            state.state = action.payload
        },
        modifyResult: (_statE, action:PayloadAction<UserChat>) =>{
            const {result, state} = action.payload
            return {
                result: result,
                state: state
            }
        }
    }
})

export const { addInputToChat } = temporaryChatOwnUserSlice.actions;
export default temporaryChatOwnUserSlice.reducer;
