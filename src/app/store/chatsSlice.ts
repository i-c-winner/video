import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChats, TChat } from '../types';

const initialState: IChats = {
  chats: [ {
    author: 'start',
    id: 'ddd',
    text: 'start text'
  }
  ]
};
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<TChat>) => {
      state.chats.push(action.payload);
    }
  }
});

export const { addChat } = chatsSlice.actions;
export default chatsSlice.reducer;
