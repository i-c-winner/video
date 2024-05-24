import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    chatsList: [],
};
const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.chatsList.push(action.payload);
        },
    },
});
export const { addChat } = chatsSlice.actions;
export default chatsSlice.reducer;
