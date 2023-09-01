import { createSlice } from '@reduxjs/toolkit';
import {IChats} from '../types';

const initialState: IChats ={
  chats: []
}
const chatSlice=createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushChat: ((state: IChats, action)=>{
      state.chats.push(action.payload)
    })
  }
})

export const {pushChat}= chatSlice.actions
export default chatSlice.reducer
