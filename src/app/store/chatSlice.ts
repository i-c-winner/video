import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../types';

const initialState: IRootState['chat'] =[]

const chatSlice=createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushChat: ((state, action)=>{
      state.unshift(action.payload)
    })
  }
})

export const {pushChat}= chatSlice.actions
export default chatSlice.reducer
