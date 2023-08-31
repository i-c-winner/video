import { createSlice } from "@reduxjs/toolkit";
import { config } from '../../shared/config/config';

const configSlice = createSlice({
  name: "config",
  initialState: config,
  reducers: {
changeChatVisible: ((state: any, action)=>{
  state.UI.chatBox=action.payload
})
  }
})
export const{changeChatVisible}=configSlice.actions
export default configSlice.reducer
