import { createSlice } from '@reduxjs/toolkit';
import {TChats} from '../types';

const initialState: TChats =[]

const chatSlice=createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushChat: ((state: TChats, action)=>{
      state.push(action.payload)
    })
  }
})

export const {pushChat}= chatSlice.actions
export default chatSlice.reducer
