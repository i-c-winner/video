import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChats, TChat } from '../types';

const initialState: IChats = {
  chatsList: [
    {
      id: '56',
      author: 'MY',
      text: 'oooo'
    }
  ]
};
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<TChat>) => {
      state.chatsList.push(action.payload);
    }
  }
});

export const { addChat } = chatsSlice.actions;
export default chatsSlice.reducer;
