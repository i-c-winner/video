import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { config } from '../../shared/interface';
import { IInterface } from '../types';

const interfaceSlice = createSlice({
  name: 'interfacSlice',
  initialState: config as IInterface,
  reducers: {
    changeChatsBox: ((state, action: PayloadAction<boolean>) => {
        state.chatsBoxVisible = action.payload;
      }
    ),
    changeToolboxVisible: ((state, action: PayloadAction<boolean>)=>{
      state.toolboxVisible=action.payload
    })
  }
});

export const{changeChatsBox, changeToolboxVisible}=interfaceSlice.actions
export default interfaceSlice.reducer
