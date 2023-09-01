import { createSlice } from '@reduxjs/toolkit';
import {IChat} from '../types';

const initialState: IChat ={
  chats: []
}
const chatSlice=createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushChat: ((state: IChat, action)=>{
      console.log(action)
      state.chats.push(action.payload)
    })
  }
})

export const {pushChat}= chatSlice.actions
export default chatSlice.reducer
